<template>
  <v-card class="mx-auto main-card" tile>
    <v-card-title>
      <v-list-item>
        <span class="card-title">{{ candidatesInfo['Name'][0]['FormattedName'] }}</span>
        <v-row align="center" justify="end" class="mr-1">
          <span class="subheading">Precisión: 10%</span>
        </v-row>
      </v-list-item>
    </v-card-title>

    <v-card-text class="card-content">
      <v-list class="main-card-list">
        <v-list-item>
          <span class="subheading">{{ Country }}</span>
        </v-list-item>
        <v-list-item>
          <span class="subheading">{{ candidatesInfo.currentJobProfile }}</span>
        </v-list-item>
        <v-list-item v-show="candidatesInfo['WorkedPeriod'][0]['TotalExperienceInYear']">
          <span class="subheading">{{ candidatesInfo['WorkedPeriod'][0]['TotalExperienceInYear'] }} Años de experiencia</span>
        </v-list-item>
        <v-list-item>
          <a :href="candidatesInfo['fileUrl']" class="subheading" target="_blank">Hoja de vida</a>
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
  @Prop() private candidatesInfo!: any;

  get Country(){
    return this.candidatesInfo['ResumeCountry'][0]['Country'] || 'Colombia'
  }
}
</script>

<style>
</style>