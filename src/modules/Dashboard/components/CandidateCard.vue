<template>
  <v-card class="mx-auto main-card card" tile>
    <v-card-title>
      <v-list-item>
      <v-list-item-content class="list-title-content">
        <v-list-item-title>{{ candidatesInfo['Name'][0]['FormattedName'] }}</v-list-item-title>
        <v-list-item-subtitle>{{ candidatesInfo.currentJobProfile }}</v-list-item-subtitle>
      </v-list-item-content>
      </v-list-item>
    </v-card-title>
    <v-card-text class="card-content">
      <v-list class="main-card-list">
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
.card-content{
  padding: 0px 0px 0px 16px;

}
.list-title-content{
  padding: 0;
}
.card{
  min-height: 130px;
  min-width: 400px;
  max-width: 500px;
}
</style>