<template>
  <v-card class="mx-auto main-card" tile min-height="170px">
    <v-row>
      <v-col cols="6">
        <v-card-title>
          <v-list-item two-line>
            <v-list-item-content class="list-title-content">
              <v-list-item-title>{{
                candidatesInfo["Name"][0]["FormattedName"]
              }}</v-list-item-title>
              <v-list-item-subtitle class="text-wrap">{{
                candidatesInfo.currentJobProfile
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-title>
        <v-card-text class="card-content">
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
                Años de experiencia</span
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
      <v-col cols="6">
        <v-row justify="end" class="pa-5">
          <v-btn @click="selectedCandidate"> Ver detalle </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
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

  get Country() {
    return this.candidatesInfo["ResumeCountry"][0]["Country"] || "Colombia";
  }

  selectedCandidate() {
    this.$emit("selectedCandidate", this.candidatesInfo._id, this.candidatesInfo.fileUrl);
  }
}
</script>

<style>
.card-content {
  padding: 0px 0px 0px 16px;
}

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