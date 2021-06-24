<template>
  <v-container>
      <v-row>
      <v-col cols="3">
        <FiltersPanel />
      </v-col>
      <v-col cols="9">
        <CandidateCard
          v-for="candidate in candidates"
          :key="candidate.key"
          :candidatesInfo="candidate"
        />
      </v-col>
    </v-row>

  </v-container>
    
</template>

<script lang="ts" >
import { Component } from "vue-property-decorator";
import FiltersPanel from "../components/FiltersPanel.vue";
import CandidateCard from "../components/CandidateCard.vue";
import Vuetify from "vuetify";
import Vue from "vue";

Vue.use(Vuetify);
@Component({
  name: "Dashboard",
  components: {
    FiltersPanel,
    CandidateCard,
  },
})
export default class Dashboard extends Vue {
  candidates = [
    {
      name: "Daniel Niebles",
      country: "Colombia",
      position: "Ingeniero electrónico",
      time: "2 años",
      key: "123",
    },
    {
      name: "Maria Niebles",
      country: "Colombia",
      position: "Biongeniera",
      time: "2 años",
      key: "1234",
    },
  ];
}
</script>

<style>
</style>