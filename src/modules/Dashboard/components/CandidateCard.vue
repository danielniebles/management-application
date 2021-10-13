<template>
  <v-container>
    <v-card class="mx-auto main-card ma-1" tile :min-height="cardHeight">
      <v-container>
        <v-row>
          <v-col cols="1" md="1" align-self="start" v-if="displayCheckbox">
            <v-checkbox @click="selectedCandidate" v-model="candidateInfo.selected"></v-checkbox>
          </v-col>
          <v-col cols="11" :md="displayCheckbox ? '8' : '9'">
            <v-card-title class="pa-0">
              <v-list-item two-line>
                <v-list-item-content class="list-title-content">
                  <v-list-item-title>{{
                    candidateInfo.name
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="text-wrap">{{
                    candidateInfo.jobProfile
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="text-wrap">{{
                    candidateInfo.email
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-list class="main-card-list">
                <v-list-item
                  v-show="
                    candidateInfo.experience
                  "
                >
                  <span class="subheading"
                    >{{
                      candidateInfo.experience
                    }}
                    Años de exp.</span
                  >
                </v-list-item>
                <v-list-item>
                  <a
                    :href="candidateInfo.fileUrl"
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
import { Candidate } from "@/modules/Candidate/models/Candidate";

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
  @Prop() private candidatesInfo!: Candidate;
  @Prop() private displayCheckbox!: boolean;

  get Country() {
    return this.candidatesInfo["ResumeCountry"][0]["Country"] || "Colombia";
  }

  get candidateInfo() {
    const [name] = this.candidatesInfo.Name;
    const [country] = this.candidatesInfo.ResumeCountry;
    const [experience] = this.candidatesInfo.WorkedPeriod;
    return {
      name: name.FormattedName ?? "",
      country: country.Country ?? "Colombia",
      experience: experience.TotalExperienceInYear ?? "",
      email: this.candidatesInfo.email,
      jobProfile: this.candidatesInfo.currentJobProfile,
      id: this.candidatesInfo._id,
      fileUrl: this.candidatesInfo.fileUrl,
      selected: this.candidatesInfo.selected
    };
  }

  showCandidate() {
    this.$emit(
      "showCandidate",
      this.candidateInfo.id,
      this.candidateInfo.fileUrl
    );
  }

  get cardHeight() {
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
        return "200px";
      case "sm":
        return "100px";
      case "md":
        return "170px";
      case "lg":
        return "170px";
      case "xl":
        return "170px";
      default:
        return "170px";
    }
  }

  selectedCandidate() {
    this.$emit("selectCandidate");
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