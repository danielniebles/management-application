<template>
  <v-expansion-panels multiple tile>
    <v-expansion-panel v-for="(operation, index) in operations" :key="index">
      <v-expansion-panel-header
        class="justify-self-start expansion-panel-header"
        expand-icon=""
        @click="toggleIcon(index)"
        disable-icon-rotate
      >
        <template v-slot:actions>
          <v-icon class="icon" large color="#294661">{{ icon[index] }}</v-icon>
        </template>
        <span class="header">{{ operation.displayName }}</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div v-for="(option, subIndex) in operation.options" :key="subIndex">
          <v-text-field
            :label="option.displayName"
            outlined
            v-model="operation.options[subIndex].value"
            @change="onMouseUp(subIndex, index)"
            class="main-text-field"
          >
          </v-text-field>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";
import { eventBus } from "../main";

Vue.use(Vuetify);
@Component({
  name: "Filters",
})
export default class Filters extends Vue {
  emitObject = {};
  operations = [
    {
      rchilliKey: "PersonalInformation",
      displayName: "Información Personal",
      rchilliType: "string",
      options: [
        {
          rchilliKey: "FirstName",
          displayName: "Primer Nombre",
          value: "",
        },
        {
          rchilliKey: "LastName",
          displayName: "Apellido",
        },
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
        },
        {
          rchilliKey: "Profession",
          displayName: "Profesión",
        },
      ],
    },
    {
      rchilliKey: "SegregatedExperience",
      displayName: "Experiencia",
      rchilliType: "arrayObject",
      options: [
        {
          rchilliKey: "Employer_EmployerName",
          displayName: "Empresa",
        },
        {
          rchilliKey: "JobProfile_Title",
          displayName: "Cargo",
        },
        {
          rchilliKey: "YearsOfExperience",
          displayName: "Años de experiencia",
        },
      ],
    },
  ];
  headerIcon: boolean[] = Array(this.operations.length).fill(false);
  icon: string[] = Array(this.operations.length).fill("mdi-chevron-right");

  toggleIcon(index: number) {
    this.headerIcon[index] = !this.headerIcon[index];
    this.icon[index] =
      this.headerIcon[index] === false
        ? "mdi-chevron-right"
        : "mdi-chevron-down";
  }

  onMouseUp(subIndex: number, index: number) {
    this.emitObject = {
      parentKey: this.operations[index].rchilliKey,
      value: this.operations[index].options[subIndex].value,
      key: this.operations[index].options[subIndex].rchilliKey,
    };
    console.log(
      subIndex,
      index,
      this.operations[index].options[subIndex].value
    );
    eventBus.$emit("filterAdded", this.emitObject);
  }
}
</script>

<style>


</style>