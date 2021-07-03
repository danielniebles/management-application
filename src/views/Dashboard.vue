<template>
  <v-container class="col-12">
    <v-row justify="center">
      <v-container>
        <MainSearchPanel />
      </v-container>
    </v-row>
    <v-divider></v-divider>
    <v-container fill-heigth fluid>
      <v-row>
        <v-col cols="3">
          <FiltersPanel :topSearch="topSearch" />
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="9" class="mt-5">
          <v-row justify="end">
            <v-pagination
              v-model="page"
              :length="length"
              :total-visible="5"
            ></v-pagination>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h3 v-show="length === 0">
                Lo sentimos, tu búsqueda no arrojó resultados
              </h3>
              <CandidateCard
                v-for="candidate in shownCandidates"
                :key="candidate.key"
                :candidatesInfo="candidate"
              />
              <!-- <v-skeleton-loader
                v-bind="attrs"
                type="card-heading, list-item-three-line"
              ></v-skeleton-loader> -->
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts" >
import { Component, Inject } from "vue-property-decorator";
import FiltersPanel from "../components/FiltersPanel.vue";
import CandidateCard from "../components/CandidateCard.vue";
import MainSearchPanel from "../components/MainSearchPanel.vue";
import Vuetify from "vuetify";
import Vue from "vue";
import { DashboardService } from "@/modules/Dashboard/DashboardService";
import { eventBus } from "../main";

Vue.use(Vuetify);
@Component({
  name: "Dashboard",
  components: {
    FiltersPanel,
    CandidateCard,
    MainSearchPanel,
  },
})
export default class Dashboard extends Vue {
  @Inject() dashboardService!: DashboardService;
  candidates = [];
  page = 1;
  perPage = 4;
  length = 0;
  topSearch = "";

  async mounted() {
    this.candidates = await this.dashboardService.getFiltersResult({
      JobProfile: "Ingeniero",
      // SegregatedQualification: [
      //   {
      //     Degree: {
      //       DegreeName: "Bachiller",
      //     },
      //   },
      // ],
    });
    this.length = Math.ceil(this.candidates.length / this.perPage);

    eventBus.$on("onSearchEnter", async (searchPattern: string) => {
      this.candidates = await this.dashboardService.getFiltersResult({
        ["JobProfile"]: searchPattern,
        //   SegregatedQualification: [
        //   {
        //     Degree: {
        //       DegreeName: "Bachiller",
        //     },
        //   },
        // ],
      });
      this.topSearch = searchPattern;
      this.page = 1;
      this.length = Math.ceil(this.candidates.length / this.perPage);
    });

    eventBus.$on("searchFromFilters", (candidates: any) => {
      this.candidates.length = 0;
      this.candidates = candidates;
      this.length = Math.ceil(this.candidates.length / this.perPage);
    });
  }

  get shownCandidates() {
    const { page, perPage, candidates } = this;
    const number = Math.ceil(candidates.length / length);
    return candidates.slice((page - 1) * perPage, page * perPage);
  }
}
</script>

<style>
</style>