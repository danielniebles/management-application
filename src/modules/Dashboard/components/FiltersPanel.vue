<template>
  <div class="filters__container">
    <h6 class="text-h6 pb-6">Filtros</h6>
    <v-text-field
        outlined
        v-model="jobProfile"
        label="Cargo actual"
        color="black"
        single-line
        background-color="white"
      ></v-text-field>
    <Filters :cleanFlag="cleanFlag" />
    <v-row justify="end">
      <v-btn :class="primaryBtnClass" @click="search"> Buscar </v-btn>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Inject } from "vue-property-decorator";
import Filters from "./Filters.vue";
import Vuetify from "vuetify";
import Vue from "vue";
import { eventBus } from "../../../main";
import { DashboardService } from "@/modules/Dashboard/DashboardService";
import { STYLE_CLASSES } from "@/shared/StyleConstants";

Vue.use(Vuetify);
@Component({
  name: "FiltersPanel",
  components: {
    Filters,
  },
})
export default class FiltersPanel extends Vue {
  @Prop() private topSearch!: string;
  @Inject() dashboardService!: DashboardService;

  primaryBtnClass = STYLE_CLASSES.PRIMARY_BTN;

  searchEmits: any[] = [];
  filterKeys: string[] = [];
  formattedSearch: any = [];
  mergedSearch: any = [];
  cleanFlag = false;
  jobProfile = "";

  mounted() {
    eventBus.$on("filterAdded", (emitObject: any) => {
      this.searchEmits.push(emitObject);
    });

    eventBus.$on("cleanedFields", () => {
      this.cleanFlag = false;
      this.formattedSearch.length = 0;
      this.mergedSearch.length = 0;
      this.searchEmits.length = 0;
    });
  }

  async search() {
    const dummy: any[] = [];
    this.searchEmits.forEach((item) => dummy.push(item.key));
    this.filterKeys = [...new Set(dummy)];
    const searchItemsArray: any[] = [];

    const validFiltersArray: any[] = this.getValidFiltersArrayFromKeys(
      this.filterKeys,
      this.searchEmits
    );
    const filtersObjectArray = this.buildFiltersObjectArray(validFiltersArray);

    const parentKeys = filtersObjectArray.map((item: any) => Object.keys(item));
    const parentKeysArray = [
      ...new Set(parentKeys.map((element: any) => element[0])),
    ];

    parentKeysArray.forEach((key: string) => {
      const matchingSearchItems = filtersObjectArray.filter((item: any) => {
        if (key in item) return item;
      });

      const searchItemKeys: any = [];
      matchingSearchItems.forEach((item: any) => {
        searchItemKeys.push(item[key]);
      });

      const formattedSearchItem = {
        [key]: searchItemKeys,
      };

      searchItemsArray.push(formattedSearchItem);
    });

    if (this.topSearch !== "")
      searchItemsArray.push({ ["DetailResume"]: this.topSearch });
    if (this.jobProfile !== "")
      searchItemsArray.push({ ["JobProfile"]: this.jobProfile });

    const searchObject = this.createObjectFromArray(searchItemsArray);

    if (Object.keys(searchObject).length !== 0) {
      this.$emit("searchFromFiltersPanel");
      const response = await this.dashboardService.getFiltersResult(
        searchObject
      );
      this.$emit("searchFromFiltersPanel", response);
    }
  }

  cleanFields() {
    this.jobProfile = "";
    this.cleanFlag = !this.cleanFlag;
  }

  getValidFiltersArrayFromKeys(keys: string[], filters: any[]) {
    const validKeys: any[] = [];
    keys.forEach((key) => {
      const matchingFilters = filters.filter((item) => item.key === key);
      if (matchingFilters[matchingFilters.length - 1].value !== "")
        validKeys.push(matchingFilters[matchingFilters.length - 1]);
    });
    return validKeys;
  }

  buildFiltersObjectArray(filtersArray: any) {
    const filtersObjectArray: any[] = [];
    filtersArray.forEach((item: any) => {
      const splitKey: string[] = item.key.split("_");
      const filterObject: any =
        splitKey.length > 1
          ? {
              [item.parentKey]: {
                [splitKey[0]]: {
                  [splitKey[1]]: item.value,
                },
              },
            }
          : {
              [item.parentKey]: {
                [splitKey[0]]: item.value,
              },
            };

      filtersObjectArray.push(filterObject);
    });
    return filtersObjectArray;
  }

  createObjectFromArray(inputArray: any[]) {
    const dataObject: any = {};
    inputArray.forEach((item: any) => {
      Object.assign(dataObject, item);
    });
    return dataObject;
  }
}
</script>

<style lang="scss" scoped>
.filters__container {
  padding: 18px;
  height: 100%;
}
</style>

