<template>
    <v-card tile>
      <v-card-title>
        <v-list-item style="padding: 0px">
          <h3 class="header">FILTROS</h3>
          <v-row align="center" justify="end" class="mr-1">
            <v-icon large color="#294661">mdi-close</v-icon>
            <h3 class="header">Limpiar</h3>
          </v-row>
        </v-list-item>
      </v-card-title>
      <Filters />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="search">
          Buscar
        </v-btn>
      </v-card-actions>
    </v-card>

    
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Filters from "./Filters.vue";
import Vuetify from "vuetify";
import Vue from "vue";
import { eventBus } from "../main"

Vue.use(Vuetify);
@Component({
  name: "FiltersPanel",
  components: {
    Filters,
  },
})
export default class FiltersPanel extends Vue {
  searchEmits : any[] = [];
  filterKeys: string[] = [];
  formattedSearch: any = [];
  mergedSearch: any = [];

  mounted(){
    eventBus.$on("filterAdded", (emitObject: any) => {
      this.searchEmits.push(emitObject)
    })
  }

  search(){
    const dummy: any[] = []
    this.searchEmits.forEach( (item) => dummy.push(item.key))
    this.filterKeys = [...new Set(dummy)];
    this.formattedSearch.length = 0;
    this.mergedSearch.length = 0;

    const finalSearch: any[] = []
    this.filterKeys.forEach( (filter) => {
      const temp = this.searchEmits.filter((item) => item.key === filter)
      finalSearch.push(temp[temp.length-1])
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

      if(item.key !== "") this.formattedSearch.push(test);

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

      let keysObject :any = {};
      searchKeys.forEach( (item:any) => {
        const key = Object.keys(item);
        if(item[key[0]] !== "") Object.assign(keysObject,item)
      })

      const mergedObject = {
        [key]: keysObject
      }

      this.mergedSearch.push(mergedObject)
    })

    console.log(this.mergedSearch);
    

  }
}
</script>

<style>
</style>