<template>
  <v-card  :min-height="cardHeight">
    <v-container fluid class="pa-7">
      <v-row>
        <v-col cols="1" md="auto" align-self="start" v-if="displayCheckbox">
          <v-checkbox
            @click="selectedCandidate"
            v-model="candidateInfo.selected"
            :color="primaryColor"
          ></v-checkbox>
        </v-col>
        <v-col cols="auto" align-self="center">
          <v-avatar size="140">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </v-col>
        <v-col cols="11" :md="displayCheckbox ? '5' : '6'" align-self="auto">
          <div class="candidate__header">
            <p :class="subheaderHeavy + ' candidate__title'">
              {{ candidateInfo.name }}
            </p>
            <p class="text-subtitle-1">{{ candidateInfo.jobProfile }}</p>
          </div>

          <div class="candidate__info">
            <v-icon>mdi-email-outline</v-icon>
            <p :class="bodyLight">{{ candidateInfo.email }}</p>
          </div>
          <div class="candidate__info">
            <v-icon>mdi-phone-outline</v-icon>
            <p :class="bodyLight">+57 316 442 4509</p>
          </div>
          <div class="candidate__info">
            <v-icon>mdi-map-marker-outline</v-icon>
            <p :class="bodyLight">Bogotá, Colombia</p>
          </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="auto" align-self="center">
          <v-row justify="end">
            <v-col cols="auto" class="pr-0">
              <v-btn
                outlined
                plain
                :class="outlinedBtn"
                :href="candidateInfo.fileUrl"
                target="_blank"
              >
                <v-icon>mdi-tray-arrow-down</v-icon>Descargar</v-btn
              >
            </v-col>
            <v-col cols="auto">
              <v-btn :class="primaryBtnClass" @click="showCandidate"
                >Ver Curriculum</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";
import { Candidate } from "@/modules/Candidate/models/Candidate";
import { COLORS, STYLE_CLASSES, TEXT_CLASSES } from "@/shared/StyleConstants";

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

  primaryColor = COLORS.PRIMARY_COLOR;
  secondaryColor = COLORS.SECONDARY_COLOR;
  primaryBtnClass = STYLE_CLASSES.PRIMARY_BTN;
  secondaryBtnClass = STYLE_CLASSES.SECONDARY_BTN;
  outlinedBtn = STYLE_CLASSES.OUTLINED_BTN;
  subheaderHeavy = TEXT_CLASSES.SUBHEADER_HEAVY;
  bodyLight = TEXT_CLASSES.BODY_LIGHT;

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
      selected: this.candidatesInfo.selected,
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

<style lang="scss" scoped>
$atome-orange-500: #ff5a34;
p {
  margin-bottom: 0 !important;
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

.candidate__title {
  color: $atome-orange-500;
}

.candidate__header {
  margin-bottom: 24px;
}

.candidate__info {
  display: flex;
  margin-bottom: 2px;
  color: #7f8082;
  i {
    margin-right: 12px !important;
  }
}

img {
  border-radius: 50%;
  box-shadow: 0 0 15px #999;
  width: 100%;
}

.test {
  border-radius: 50%;
}
</style>