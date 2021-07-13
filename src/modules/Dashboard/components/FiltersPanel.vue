<template>
    <v-card tile>
      <v-card-title>
        <v-list-item style="padding: 0px">
          <h3 class="header">FILTROS</h3>
          <v-row align="center" justify="end" class="mr-1">
              <v-icon large color="#294661" @click="cleanFields">mdi-close</v-icon>
            <h3 class="header">Limpiar</h3>
          </v-row>
        </v-list-item>
      </v-card-title>
      <Filters :cleanFlag="cleanFlag"/>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="search">
          Buscar
        </v-btn>
      </v-card-actions>
    </v-card>

    
</template>

<script lang="ts">
import { Component, Prop, Inject } from "vue-property-decorator";
import Filters from "./Filters.vue";
import Vuetify from "vuetify";
import Vue from "vue";
import { eventBus } from "../../../main"
import { DashboardService } from "@/modules/Dashboard/DashboardService";

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
  
  searchEmits : any[] = [];
  filterKeys: string[] = [];
  formattedSearch: any = [];
  mergedSearch: any = [];
  cleanFlag = false;

  mounted(){
    eventBus.$on("filterAdded", (emitObject: any) => {
      this.searchEmits.push(emitObject)
    })

    eventBus.$on("cleanedFields", () => {
      this.cleanFlag = false;
      this.formattedSearch.length = 0;
      this.mergedSearch.length = 0;
      this.searchEmits.length = 0;      
    })
  }

  async search(){
    const dummy: any[] = []
    this.searchEmits.forEach( (item) => dummy.push(item.key))
    this.filterKeys = [...new Set(dummy)];
    this.formattedSearch.length = 0;
    this.mergedSearch.length = 0;

    const finalSearch: any[] = []
    this.filterKeys.forEach( (filter) => {
      const temp = this.searchEmits.filter((item) => item.key === filter)      
      if(temp[temp.length-1].value !== "") finalSearch.push(temp[temp.length-1])
    });

    finalSearch.forEach( (item) => {
      const splitKey: string[] = item.key.split('_');
      
      const test: any = splitKey.length > 1 ? {
        [item.parentKey] : {
          [splitKey[0]]: {
            [splitKey[1]]: item.value
          }
        }
      } : {
        [item.parentKey] : {
          [splitKey[0]]: item.value
        }
      };

      this.formattedSearch.push(test);

    });    

    const parentKeys = this.formattedSearch.map( (item: any) => Object.keys(item))
    const parentKeysArray = [...new Set(parentKeys.map((element: string) => element[0]))];

    parentKeysArray.forEach( (key: any) => {
      const matchingSearchProperty = this.formattedSearch.filter( (item: any) => {
        if(key in item) return item
      });

      const searchKeys: any = []
      matchingSearchProperty.forEach( (item:any) => {
        searchKeys.push(item[key])
      })

      let keysObject: any = [];
      searchKeys.forEach( (item:any) => {
        const key = Object.keys(item);
        if(item[key[0]] !== "") keysObject.push(item)
      })

      const mergedObject = {
        [key]: keysObject
      }

      this.mergedSearch.push(mergedObject)
      this.mergedSearch.push({
        ['JobProfile']: this.topSearch
      })
    });

    const dataObject = this.createObjectFromArray(this.mergedSearch)

    // this.mergedSearch.forEach( (key: any) => {
    //   Object.assign(dataObject, key)
    // })    

    if (Object.keys(dataObject).length !== 0){ 
      const response = await this.dashboardService.getFiltersResult(dataObject);
      eventBus.$emit("searchFromFilters", response);
    }
  }

  cleanFields(){
    this.cleanFlag = !this.cleanFlag
  }

  createObjectFromArray(inputArray: any[]){
    const dataObject: any = {};
    inputArray.forEach( (item: any) => {
      Object.assign(dataObject, item)
    })
    return dataObject;
  }
}
</script>

<style>
</style>