<template>
  <div>
    <v-row class="mt-1">
      <v-col cols="12" justify="end">
        <v-text-field
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
        </v-text-field>
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

  onEnter() {
    this.$emit("onSearchEnter", this.searchPattern);
  }
}
</script>

<style>
</style>