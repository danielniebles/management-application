<template>
  <v-container class="col-12">
    <v-row justify="center">
      <v-container>
        <MainSearchPanel @onSearchEnter="onSearchEnter"></MainSearchPanel>
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
              <h3 v-show="length === 0 && loadingData === false">
                Lo sentimos, tu búsqueda no arrojó resultados
              </h3>
              <div v-if="!loadingData">
                <CandidateCard
                  v-for="candidate in shownCandidates"
                  :key="candidate.key"
                  :candidatesInfo="candidate"
                />
              </div>
              <v-skeleton-loader
                type="card-heading, list-item-three-line"
                v-if="loadingData"
              ></v-skeleton-loader>
              <v-divider v-if="loadingData"></v-divider>
              <v-skeleton-loader
                type="card-heading, list-item-three-line"
                v-if="loadingData"
              ></v-skeleton-loader>
              <v-divider v-if="loadingData"></v-divider>
              <v-skeleton-loader
                type="card-heading, list-item-three-line"
                v-if="loadingData"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts" >
import { Component, Inject } from "vue-property-decorator";
import FiltersPanel from "./components/FiltersPanel.vue";
import CandidateCard from "./components/CandidateCard.vue";
import MainSearchPanel from "./components/MainSearchPanel.vue";
import Snackbar from "../shared/components/Snackbar/Snackbar.vue";
import Vuetify from "vuetify";
import Vue from "vue";
import { DashboardService } from "@/modules/Dashboard/DashboardService";
import { eventBus } from "../../main";
import { mapGetters } from "vuex";

Vue.use(Vuetify);
@Component({
  name: "Dashboard",
  components: {
    FiltersPanel,
    CandidateCard,
    MainSearchPanel,
  },
  computed: mapGetters(["loggedIn"]),
})
export default class Dashboard extends Vue {
  @Inject() dashboardService!: DashboardService;
  candidates = [];

  page = 1;
  perPage = 4;
  length = 0;
  topSearch = "";
  loadingData = true;

  async mounted() {
    this.loadingData = true;
    // this.candidates = await this.dashboardService.getFiltersResult({
    //   JobProfile: "Ingeniero",
    // });
    this.length = Math.ceil(this.candidates.length / this.perPage);
    this.loadingData = false;

    eventBus.$on("searchFromFilters", (candidates: any) => {
      if (candidates) {
        this.candidates.length = 0;
        this.candidates = candidates;
        this.length = Math.ceil(this.candidates.length / this.perPage);
        this.page = 1;
        this.loadingData = false;
        
      } else {
        this.loadingData = true;
      }
    });
  }

  get shownCandidates() {
    const { page, perPage, candidates } = this;
    const number = Math.ceil(candidates.length / length);
    return candidates.slice((page - 1) * perPage, page * perPage);
  }

  async onSearchEnter(searchPattern: string) {
    this.loadingData = true;
    this.candidates = await this.dashboardService.getFiltersResult({
      ["DetailResume"]: searchPattern,
    });    
    this.topSearch = searchPattern;
    this.page = 1;
    this.length = Math.ceil(this.candidates.length / this.perPage);
    this.loadingData = false;
  }
}
</script>

<style>
</style>