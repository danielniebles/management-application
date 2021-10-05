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
        <v-col cols="12" md="3">
          <FiltersPanel
            :topSearch="topSearch"
            @searchFromFiltersPanel="searchFromFiltersPanel"
          ></FiltersPanel>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="12" class="mt-5" md="9">
          <v-row justify="end">
            <v-pagination
              v-model="page"
              :length="candidatesPagsLength"
              :total-visible="5"
            ></v-pagination>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h3 v-show="candidatesPagsLength === 0 && loadingData === false">
                Lo sentimos, tu búsqueda no arrojó resultados
              </h3>
            </v-col>
            <v-row v-if="!loadingData" class="col-12">
              <v-col
                v-for="(candidate, index) in shownCandidates"
                :key="index"
                cols="12"
                md="6"
              >
                <CandidateCard
                  :candidatesInfo="candidate"
                  @selectedCandidate="showCandidateInfo"
                />
              </v-col>
            </v-row>
            <v-row v-if="loadingData" class="col-12">
              <v-col v-for="n in 12" :key="n" cols="12" md="6" class="pa-2">
                <v-skeleton-loader
                  type="card-heading, list-item-three-line"
                ></v-skeleton-loader>
              </v-col>
            </v-row>
          </v-row>
        </v-col>
      </v-row>
      <v-btn fab fixed bottom right @click="openUploadFileDialog">
        <v-icon>mdi-file-upload-outline</v-icon>
      </v-btn>
    </v-container>
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="pa-5">
        <v-card-title>Cargar hojas de vida</v-card-title>
        <v-file-input label="Archivo" ref="file" v-model="file"></v-file-input>
        <v-card-actions>
          <v-row justify="end">
          <v-btn @click="submitFile">Aceptar</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import FiltersPanel from "./components/FiltersPanel.vue";
import CandidateCard from "./components/CandidateCard.vue";
import MainSearchPanel from "./components/MainSearchPanel.vue";
import Snackbar from "../shared/components/Snackbar/Snackbar.vue";
import Vuetify from "vuetify";
import Vue from "vue";
import { DashboardService } from "@/modules/Dashboard/DashboardService";
import { eventBus } from "../../main";
import { mapGetters, mapState } from "vuex";
import { Candidate } from "../Candidate/models/Candidate";

Vue.use(Vuetify);
@Component({
  name: "Dashboard",
  components: {
    FiltersPanel,
    CandidateCard,
    MainSearchPanel,
  },
  computed: mapState(["currentSearch"]),
})
export default class Dashboard extends Vue {
  public currentSearch!: [];
  @Inject() dashboardService!: DashboardService;
  candidates: Candidate[] = [];

  page = 1;
  perPage = 12;
  length = 0;
  topSearch = "";
  loadingData = true;
  dialog = false;
  file: File = {} as unknown as File

  async mounted() {
    this.loadingData = true;
    if (this.currentSearch.length > 0) this.candidates = this.currentSearch;
    this.loadingData = false;
  }

  get shownCandidates() {
    const { page, perPage, candidates } = this;
    return candidates.slice((page - 1) * perPage, page * perPage);
  }

  async onSearchEnter(searchPattern: string) {
    this.loadingData = true;
    this.candidates = await this.dashboardService.getFiltersResult({
      ["DetailResume"]: searchPattern,
    });
    this.topSearch = searchPattern;
    this.page = 1;
    this.$store.dispatch("updateSearch", this.candidates);
    this.loadingData = false;
  }

  searchFromFiltersPanel(candidates: Candidate[]) {
    if (candidates) {
      this.candidates.length = 0;
      this.candidates = candidates;
      this.$store.dispatch("updateSearch", this.candidates);
      this.page = 1;
      this.loadingData = false;
    } else {
      this.loadingData = true;
    }
  }

  showCandidateInfo(id: string, fileUrl: string) {
    this.$router.push({
      name: "Candidate",
      params: { id, fileUrl },
    });
  }

  openUploadFileDialog() {
    this.dialog = true;
  }

  async submitFile(){
    let formData = new FormData();
    formData.append("zip", this.file);
    try {
      const response = await this.dashboardService.uploadCandidatesCVs(formData);
       if (response.status === 200) {
        Snackbar.popSuccess("Carga exitosa");
      } else {
        Snackbar.popWarning("Ha ocurrido un error al cargar");
      }
    } catch (error) {
      Snackbar.popError("Ha ocurrido un error")
    }
  }

  get candidatesPagsLength() {
    return Math.ceil(this.candidates.length / this.perPage);
  }
}
</script>

<style>
.candidates {
  display: flex;
  justify-content: center;
}
</style>
