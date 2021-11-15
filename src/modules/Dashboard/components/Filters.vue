<template>
  <div class="filters__container">
    <h6 class="text-h6 pb-6">Filtros</h6>
    <div v-for="(operation, index) in operations" :key="index">
      <p class="text-subtitle-1">{{ operation.displayName }}</p>
      <div v-for="(option, subIndex) in operation.options" :key="subIndex" class="filter__container">
        <v-text-field
          :label="option.displayName"
          outlined
          v-model="operation.options[subIndex].value"
          color="black"
          single-line
          background-color="white"
          @keyup.enter="addFilter(subIndex, index)"
        >
        </v-text-field>
        <v-btn fab small class="ma-2" v-blur :color="primaryColor" @click="addFilter(subIndex, index)">
          <v-icon color="white">mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";
import { eventBus } from "../../../main";
import { COLORS } from "@/shared/StyleConstants";
import store from "@/store"

Vue.use(Vuetify);
@Component({
  name: "Filters",
})
export default class Filters extends Vue {

  primaryColor = COLORS.PRIMARY_COLOR

  emitObject = {};
  operations = [
    {
      rchilliKey: "JobProfile",
      displayName: "Cargo actual",
      rchilliType: "arrayObject",
      options: [
        {
          rchilliKey: "JobProfile",
          displayName: "Cargo actual",
          name: "cargo-actual",
          value: "",
        }
      ],
    },
    {
      rchilliKey: "SegregatedQualification",
      displayName: "Formación",
      rchilliType: "arrayObject",
      options: [
        {
          rchilliKey: "Degree_DegreeName",
          displayName: "Nivel educativo",
          name: "nivel-educativo",
          value: "",
        },
        {
          rchilliKey: "Institution_Name",
          displayName: "Universidad",
          name: "universidad",
          value: "",
        },
      ],
    },
    {
      rchilliKey: "SegregatedExperience",
      displayName: "Experiencia",
      rchilliType: "arrayObject",
      options: [
        {
          rchilliKey: "JobProfile_Title",
          displayName: "Cargo",
          name: "cargo",
          value: "",
        },
      ],
    },
    {
      rchilliKey: "SegregatedSkill",
      displayName: "Aptitudes",
      rchilliType: "arrayObject",
      options: [
        {
          rchilliKey: "Skill",
          displayName: "Aptitud",
          name: "skill",
          value: "",
        },
      ],
    },
    {
      rchilliKey: "PersonalInformation",
      displayName: "Información Personal",
      rchilliType: "string",
      options: [
        {
          rchilliKey: "FullName",
          displayName: "Nombre",
          name: "nombre",
          value: "",
        },
        {
          rchilliKey: "email",
          displayName: "Correo",
          name: "email",
          value: "",
        },
      ],
    },
  ];

  addFilter(subIndex: number, index: number) {
    this.emitObject = {
      parentKey: this.operations[index].rchilliKey,
      value: this.operations[index].options[subIndex].value,
      key: this.operations[index].options[subIndex].rchilliKey,
      name: this.operations[index].options[subIndex].name
    };

    this.operations[index].options[subIndex].value = ""

    eventBus.$emit("filterAdded", this.emitObject);
    store.dispatch("updateFilters", this.emitObject)
  }
}
</script>

<style lang="scss" scoped>
.filter__container{
  display: flex;
}

.filters__container {
  padding: 18px;
  height: 100%;
}

</style>
