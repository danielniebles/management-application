<template>
  <v-expansion-panels multiple tile accordion>
    <v-expansion-panel v-for="(operation, index) in operations" :key="index">
      <v-expansion-panel-header
        class="justify-self-start expansion-panel-header"
        expand-icon=""
        @click="toggleIcon(index)"
        disable-icon-rotate
      >
        <template v-slot:actions>
          <v-icon class="icon" large >{{ icon[index] }}</v-icon>
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
import { Component, Prop, Watch } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";
import { eventBus } from "../../../main";

Vue.use(Vuetify);
@Component({
  name: "Filters",
})
export default class Filters extends Vue {
  @Prop() private cleanFlag!: boolean;

  emitObject = {};
  operations = [
    {
      rchilliKey: "SegregatedQualification",
      displayName: "Formación",
      rchilliType: "arrayObject",
      options: [
        {
          rchilliKey: "Degree_DegreeName",
          displayName: "Nivel educativo",
          value: "",
        },
        {
          rchilliKey: "Institution_Name",
          displayName: "Universidad",
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
          value: "",
        }
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
          value: "",
        }
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
          value: "",
        },
        {
          rchilliKey: "email",
          displayName: "Correo",
          value: "",
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

    eventBus.$emit("filterAdded", this.emitObject);
  }

  @Watch('cleanFlag')
  cleanFields(){
    this.operations.forEach( (operation) => {
      operation.options.forEach( (option) => {
        option.value = ""
      })
    })
    eventBus.$emit('cleanedFields')
  }
}
</script>

<style>


</style>