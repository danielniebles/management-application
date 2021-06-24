<template>
  <v-expansion-panels multiple tile>
    <v-expansion-panel v-for="(operation, i) in operations" :key="i">
      <v-expansion-panel-header
        class="justify-self-start"
        expand-icon=""
        @click="toggleIcon(i)"
        disable-icon-rotate
      >
        <template v-slot:actions>
          <v-icon class="icon">{{ icon[i] }}</v-icon>
        </template>
        <span class="header">{{ operation.displayName }}</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-text-field
          v-for="(option, i) in operation.options"
          :key="i"
          :label="option.displayName"
          solo
          outlined
        >
        </v-text-field>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";

Vue.use(Vuetify);
@Component({
  name: "Filters",
})
export default class Filters extends Vue {
  operations = [
    {
      rchilliKey: "PersonalInformation",
      displayName: "Información Personal",
      rchilliType: "string",
      options: [
        {
          rchilliKey: "FirstName",
          displayName: "Primer Nombre",
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
          rchilliKey: "University",
          displayName: "Universidad",
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
      this.headerIcon[index] === false ? "mdi-chevron-right" : "mdi-chevron-down";
  }
}
</script>

<style>
.icon {
  order: 0;
}
.header {
  order: 1;
}
</style>