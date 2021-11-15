<template>
  <div>
    <v-row class="mt-1">
      <v-col cols="12" justify="end">
        <!-- <v-text-field
          outlined
          single-line
          color="black"
          @keyup.enter="onEnter"
          v-model="searchPattern"
          label="Buscar..."
        >
        <template v-slot:prepend-inner>
            <v-icon>mdi-magnify</v-icon>
          </template>
          <template v-slot:append>
            <v-icon>mdi-tune</v-icon>
          </template>
        </v-text-field> -->
        <pre>currentFilters{{ currentFilters}}</pre>
        <pre>model{{ model }}</pre>
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
            <v-chip class="ma-2" close color="black" text-color="white" @click:close="removeFilter(index)">
              {{ item.name }}{{ item.name ? ":" : "" }}{{ item.value }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";
import Snackbar from "@/modules/shared/components/Snackbar/Snackbar.vue";
import { mapGetters } from "vuex";
import store from "@/store"

Vue.use(Vuetify);
@Component({
  name: "MainSearchPanel",
  computed: {
    ...mapGetters({
      currentFilters: "getCurrentFilters"
    })
  }
})
export default class MainSearchPanel extends Vue {
  searchPattern = "";
  items = ["Profesión", "Nombre"];
  filtersList = [];
  model: {key: string, parentKey: string, value: string}[] = []
  currentFilter = null;
  currentFilters!: {key: string, parentKey: string, value: string}[]

  mounted(){
    this.model = this.currentFilters
  }

  @Watch("model")
  addFilterFromBar(val:any, prev:any){
    if (val.length === prev.length) return

    this.model = val.map((item:any) => {
      if(typeof item === 'string'){
        item = this.buildFilter(item)
      }
      return item
    })
  }

  @Watch("currentFilters")
  addCustomFilter(){
    const newFilters: { key: string, parentKey: string, value: string }[] = []
    this.currentFilters.forEach(filter => {
      const index = this.model.findIndex((currentFilter) => currentFilter.key === filter.key)
      if(index === -1) {
        newFilters.push(filter)
      } else {
        this.model[index].value = filter.value
      }
    })
    this.model = [ ...this.model, ...newFilters]
    this.search()
  }

  getFilterKeys(key:string){
    const keys: { [key: string]: () => { key: string, parentKey: string } } = {
      "nivel-educativo": () =>  ({ key: "Degree_DegreeName", parentKey: "SegregatedQualification"}),
      "universidad": () => ({ key: "Degree_DegreeName", parentKey: "SegregatedQualification"}),
      "cargo": () => ({ key: "JobProfile_Title", parentKey: "SegregatedExperience"}),
      "skill": () => ({ key:"Skill", parentKey: "SegregatedSkill"}),
      "nombre": () => ({ key:"nombre", parentKey: "PersonalInformation"}),
      "email": () => ({ key:"email", parentKey: "PersonalInformation"}),
      "default": () => ({ key:"DetailResume", parentKey: "DetailResume"}),
    }

    return (keys[key] || keys["default"])()
  }

  buildFilter(filter: string){
    //TODO: Add logic to handle duplicated filter
    const [ parameter, value ] = filter.split(":")
    const { key, parentKey } = this.getFilterKeys(parameter)
    const name = value ? parameter : ""

    const result = {
      key,
      parentKey,
      name,
      value: value || filter
    }

    store.dispatch("updateFilters", result)
    return result
  }

  removeFilter(index: number){
    this.model.splice(index, 1)
    store.commit("REMOVE_FILTER", index)
  }

  clearFilters(){
    this.model.splice(0)
    store.commit("CLEAR_FILTERS")
  }

  search() {
    const searchItemsArray: any[] = [];
    const filtersObjectArray = this.buildFiltersObjectArray(this.model)
    const parentKeys = filtersObjectArray.map((item: any) => Object.keys(item));
    const parentKeysArray = [
      ...new Set(parentKeys.map((element: any) => element[0])),
    ];

    parentKeysArray.forEach((key: string) => {
      const matchingSearchItems = filtersObjectArray.filter((item: any) => key in item);
      const searchItemKeys = matchingSearchItems.map((item: any) => item[key]);
      const formattedSearchItem = {
        [key]: searchItemKeys,
      };

      searchItemsArray.push(formattedSearchItem);
    });

    console.log(searchItemsArray)

  }

  buildFiltersObjectArray(filtersArray: any) {
    const filtersObjectArray: any[] = [];
    filtersArray.forEach((item: any) => {
      const [key, subKey] = item.key.split("_");
      const filterObject: any =
        subKey
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
    });
    return filtersObjectArray;
  }


}
</script>

<style>
</style>