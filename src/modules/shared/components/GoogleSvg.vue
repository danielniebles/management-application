<template>
  <v-img src="../../../assets/google_logo.svg"></v-img>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";

Vue.use(Vuetify);
@Component({
  name: "GoogleSvg",
})
export default class GoogleSvg extends Vue {}
</script>
