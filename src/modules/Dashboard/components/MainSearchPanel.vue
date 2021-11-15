<template>
  <div>
    <v-row class="mt-1">
      <v-col cols="12" justify="end">
        <v-combobox
          outlined
          color="black"
          prepend-inner-icon="mdi-magnify"
          chips
          multiple
          v-model="model"
          @keyup.enter="search"
          height="2.4rem"
          clearable
          append-icon=""
          @click:clear="clearFilters"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip
              class="ma-2"
              close
              color="black"
              text-color="white"
              @click:close="removeFilter(index)"
              close-icon="mdi-close"
            >
              {{ item.name }}{{ item.name ? ":" : "" }}{{ item.value }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Watch } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";
import Snackbar from "@/modules/shared/components/Snackbar/Snackbar.vue";
import { mapGetters } from "vuex";
import store from "@/store";
import { DashboardService } from "../DashboardService";
import { Filter } from "../models/Filter";
import { FilterInfo } from "../models/FilterInfo";
import { ComposedFilter } from "../models/ComposedFilter";

Vue.use(Vuetify);
@Component({
  name: "MainSearchPanel",
  computed: {
    ...mapGetters({
      currentFilters: "getCurrentFilters",
    }),
  },
})
export default class MainSearchPanel extends Vue {
  @Inject() dashboardService!: DashboardService;

  model: FilterInfo[] = [];
  currentFilters!: FilterInfo[];

  mounted() {
    this.model = this.currentFilters;
  }

  @Watch("model")
  addFilterFromBar(val: FilterInfo[], prev: FilterInfo[]) {
    if (val.length === prev.length) return;

    this.model = val.map((item: string | FilterInfo) => {
      if (typeof item === "string") {
        item = this.buildFilter(item);
      }
      return item;
    });
  }

  @Watch("currentFilters")
  addCustomFilter() {
    const newFilters: FilterInfo[] = [];
    this.currentFilters.forEach((filter) => {
      const index = this.model.findIndex(
        (currentFilter) => currentFilter.key === filter.key
      );
      if (index === -1) {
        newFilters.push(filter);
      } else {
        this.model[index].value = filter.value;
      }
    });
    this.model = [...this.model, ...newFilters];
    this.search();
  }

  getFilterKeys(key: string) {
    const keys: { [key: string]: () => { key: string; parentKey: string } } = {
      "nivel-educativo": () => ({
        key: "Degree_DegreeName",
        parentKey: "SegregatedQualification",
      }),
      universidad: () => ({
        key: "Institution_Name",
        parentKey: "SegregatedQualification",
      }),
      cargo: () => ({
        key: "JobProfile_Title",
        parentKey: "SegregatedExperience",
      }),
      "cargo-actual": () => ({ key: "JobProfile", parentKey: "JobProfile" }),
      skill: () => ({ key: "Skill", parentKey: "SegregatedSkill" }),
      nombre: () => ({ key: "nombre", parentKey: "PersonalInformation" }),
      email: () => ({ key: "email", parentKey: "PersonalInformation" }),
      default: () => ({ key: "DetailResume", parentKey: "DetailResume" }),
    };

    return (keys[key] || keys["default"])();
  }

  buildFilter(filter: string) {
    //TODO: Add logic to handle duplicated filter
    const [parameter, value] = filter.split(":");
    const { key, parentKey } = this.getFilterKeys(parameter);
    const name = value ? parameter : "";

    const result = {
      key,
      parentKey,
      name,
      value: value || filter,
    };

    store.dispatch("updateFilters", result);
    return result;
  }

  removeFilter(index: number) {
    this.model.splice(index, 1);
    store.commit("REMOVE_FILTER", index);
  }

  clearFilters() {
    this.model.splice(0);
    store.commit("CLEAR_FILTERS");
  }

  async search() {
    const searchObject = this.buildSearchObject();

    try {
      if (Object.keys(searchObject).length !== 0) {
        this.$emit("searchFromBar");
        const response = await this.dashboardService.getFiltersResult(
          searchObject
        );
        if (response.status === 200 && response.data) {
          this.$emit("searchFromBar", response.data);
        } else {
          Snackbar.popError("Error en la consulta");
        }
      }
    } catch (error) {
      Snackbar.popError("Error en la consulta");
    }
  }

  buildSearchObject() {
    const searchItemsArray: ComposedFilter[] = [];
    const filtersObjectArray = this.buildFiltersObjectArray(this.model);
    const parentKeys = filtersObjectArray.map((item) => Object.keys(item)[0]);
    const uniqueParentKeys = [...new Set(parentKeys)];

    uniqueParentKeys.forEach((key: string) => {
      const matchingSearchItems = filtersObjectArray.filter(
        (item) => key in item
      );
      const searchItemKeys = matchingSearchItems.map((item) => item[key]);
      const formattedSearchItem = {
        [key]: ["DetailResume", "JobProfile"].includes(key)
          ? searchItemKeys[0]
          : searchItemKeys,
      };

      searchItemsArray.push(formattedSearchItem as ComposedFilter);
    });

    return this.createObjectFromArray(searchItemsArray);
  }

  buildFiltersObjectArray(filtersArray: FilterInfo[]) {
    const filtersObjectArray: Filter[] = [];
    filtersArray.forEach((item) => {
      if (item.parentKey === item.key) {
        filtersObjectArray.push({ [item.key]: item.value });
      } else {
        const [key, subKey] = item.key.split("_");
        const filterObject: Filter = subKey
          ? {
              [item.parentKey]: {
                [key]: {
                  [subKey]: item.value,
                },
              },
            }
          : {
              [item.parentKey]: {
                [key]: item.value,
              },
            };
        filtersObjectArray.push(filterObject);
      }
    });
    return filtersObjectArray;
  }

  createObjectFromArray(inputArray: unknown[]) {
    const dataObject = {};
    inputArray.forEach((item: unknown) => {
      Object.assign(dataObject, item);
    });
    return dataObject;
  }
}
</script>

<style></style>
