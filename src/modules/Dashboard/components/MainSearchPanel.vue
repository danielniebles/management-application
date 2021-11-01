<template>
  <div>
    <v-row>
      <v-col cols="12" justify="end">
        <v-text-field outlined color="black" @keyup.enter="onEnter" v-model="searchPattern" prefix="Buscar | " class="main-text-field"></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";
import Snackbar from "@/modules/shared/components/Snackbar/Snackbar.vue";

Vue.use(Vuetify);
@Component({
  name: "MainSearchPanel",
})

export default class MainSearchPanel extends Vue {

  searchPattern = "";
  items = ["Profesión", "Nombre"];

  onEnter(){
    this.$emit('onSearchEnter', this.searchPattern);
  }

};
</script>

<style>
</style>