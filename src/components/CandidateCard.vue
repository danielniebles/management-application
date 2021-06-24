<template>
  <v-card class="mx-auto" tile>
    <v-card-title>
      <v-list-item style="padding: 0px">
        <span class="text-h6 font-weight-light">{{ candidatesInfo.name }}</span>

        <v-row align="center" justify="end" class="mr-1">
          <span class="subheading">Precisión: 10%</span>
        </v-row>
      </v-list-item>
    </v-card-title>

    <v-card-text class="text-h6 font-weight-light">
      <v-list dense>
        <v-list-item style="padding: 0px">
          <span class="subheading">{{ candidatesInfo.country }}</span>
        </v-list-item>
        <v-list-item style="padding: 0px">
          <span class="subheading">{{ candidatesInfo.position }}</span>
        </v-list-item>
        <v-list-item style="padding: 0px">
          <span class="subheading">{{ candidatesInfo.time }}</span>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";

Vue.use(Vuetify);
@Component({
  name: "CandidatesCard",
})
export default class CanditateCard extends Vue {
  @Prop() private candidatesInfo!: string;
}
</script>

<style>
</style>