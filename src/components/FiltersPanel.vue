<template>
    <v-card tile>
      <v-card-title>
        <v-list-item style="padding: 0px">
          <h3>Filtros</h3>

          <v-row align="center" justify="end" class="mr-1">
            <v-icon>mdi-close</v-icon>
            <h3>Limpiar</h3>
          </v-row>
        </v-list-item>
      </v-card-title>
      <Filters />
    </v-card>

    
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Filters from "./Filters.vue";
import Vuetify from "vuetify";
import Vue from "vue";

Vue.use(Vuetify);
@Component({
  name: "FiltersPanel",
  components: {
    Filters,
  },
})
export default class FiltersPanel extends Vue {}
</script>

<style>
</style>