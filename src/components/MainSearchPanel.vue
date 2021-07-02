<template>
  <div>
    <v-row>
      <!-- <v-col cols="4">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Profesión
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col> -->
      <v-col cols="12" justify="end">
        <v-text-field solo outlined @keyup.enter="onEnter" v-model="searchPattern" prefix="Profesión | "></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";
import { eventBus } from "../main"

Vue.use(Vuetify);
@Component({
  name: "MainSearchPanel",
})

export default class MainSearchPanel extends Vue {
  
  searchPattern = "";
  items = ["Profesión", "Nombre"];
  
  onEnter(){
    eventBus.$emit('onSearchEnter', this.searchPattern)
  }

};
</script>

<style>
</style>