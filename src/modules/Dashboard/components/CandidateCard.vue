<template>
  <v-container>
    <v-card class="mx-auto main-card ma-1" tile :min-height="cardHeight">
      <v-container>
        <v-row>
          <v-col cols="1" md="1" align-self="start" v-if="displayCheckbox">
            <v-checkbox @click="selectCandidate"></v-checkbox>
          </v-col>
          <v-col cols="11" md="8" >
            <v-card-title class="pa-0">
              <v-list-item two-line>
                <v-list-item-content class="list-title-content">
                  <v-list-item-title>{{
                    candidatesInfo["Name"][0]["FormattedName"]
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="text-wrap">{{
                    candidatesInfo.currentJobProfile
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="text-wrap">{{
                    candidatesInfo.email
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-list class="main-card-list">
                <v-list-item
                  v-show="
                    candidatesInfo['WorkedPeriod'][0]['TotalExperienceInYear']
                  "
                >
                  <span class="subheading"
                    >{{
                      candidatesInfo["WorkedPeriod"][0]["TotalExperienceInYear"]
                    }}
                    Años de exp.</span
                  >
                </v-list-item>
                <v-list-item>
                  <a
                    :href="candidatesInfo['fileUrl']"
                    class="subheading"
                    target="_blank"
                    >Hoja de vida</a
                  >
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-col>
          <v-col cols="12" md="3">
            <v-row justify="end" class="pa-5">
              <v-btn @click="showCandidate">Ver</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";

Vue.use(Vuetify);
@Component({
  name: "CandidatesCard",
  filters: {
    trimString(value: string) {
      return value.substr(0, 100);
    },
  },
})

export default class CanditateCard extends Vue {
  @Prop() private candidatesInfo!: any;
  @Prop() private displayCheckbox!: boolean;

  get Country() {
    return this.candidatesInfo["ResumeCountry"][0]["Country"] || "Colombia";
  }

  showCandidate() {
    this.$emit("showCandidate", this.candidatesInfo._id, this.candidatesInfo.fileUrl);
  }

  selectCandidate(){
    this.$emit("selectCandidate")
  }

  get cardHeight(){
    switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '200px'
          case 'sm': return '100px'
          case 'md': return '170px'
          case 'lg': return '170px'
          case 'xl': return '170px'
          default: return '170px'
    }
  }
}
</script>

<style>

.card-actions {
  position: absolute;
  bottom: 0;
  justify-content: end;
}
.list-title-content {
  padding: 0;
}
.card {
  min-height: 130px;
  min-width: 400px;
  max-width: 500px;
}
</style>