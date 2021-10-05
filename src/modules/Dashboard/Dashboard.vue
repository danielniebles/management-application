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
          <v-row
            :justify="displayCheckbox ? 'space-between' : 'end'"
            class="pagination"
          >
            <v-checkbox
              v-if="displayCheckbox"
              label="Seleccionar todos"
              :indeterminate="someCandidateSelected"
            ></v-checkbox>
            <v-pagination
              v-model="page"
              :length="candidatesPagsLength"
              :total-visible="5"
            ></v-pagination>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              v-if="candidatesPagsLength === 0 && loadingData === false"
            >
              <h3>Lo sentimos, tu búsqueda no arrojó resultados</h3>
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
                  :displayCheckbox="displayCheckbox"
                  @showCandidate="showCandidateInfo"
                  @selectCandidate="selectCandidate(index)"
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
      <v-speed-dial
        v-model="fab"
        fab
        bottom
        fixed
        right
        direction="left"
        transition="slide-x-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" fab class="ml-4" small>
            <v-icon v-if="!fab">mdi-account-circle</v-icon>
            <v-icon v-else>mdi-close</v-icon>
          </v-btn>
        </template>
        <v-btn small fab @click="openUploadFileDialog">
          <v-icon>mdi-file-upload-outline</v-icon>
        </v-btn>
        <v-btn small fab @click="enableExportToFile">
          <v-icon>mdi-file-download</v-icon>
        </v-btn>
      </v-speed-dial>
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
  file: File = {} as unknown as File;
  displayCheckbox = false;
  fab = false;

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
      this.candidates.forEach((candidate) => (candidate.selected = false));
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

  selectCandidate(index: number) {
    this.candidates[index].selected = !this.candidates[index].selected;
    console.log(this.candidates.some((candidate) => candidate.selected))
    //console.log(this.candidates[index]);
  }

  get someCandidateSelected(){
    return this.candidates.some((candidate) => candidate.selected)
  }

  openUploadFileDialog() {
    this.dialog = true;
  }

  async submitFile() {
    let formData = new FormData();
    formData.append("zip", this.file);
    try {
      const response = await this.dashboardService.uploadCandidatesCVs(
        formData
      );
      if (response.status === 200) {
        Snackbar.popSuccess("Carga exitosa");
      } else {
        Snackbar.popWarning("Ha ocurrido un error al cargar");
      }
    } catch (error) {
      Snackbar.popError("Ha ocurrido un error");
    }
  }

  get candidatesPagsLength() {
    return Math.ceil(this.candidates.length / this.perPage);
  }

  enableExportToFile() {
    this.displayCheckbox = !this.displayCheckbox;
  }
}
</script>

<style>
.candidates {
  display: flex;
  justify-content: center;
}
.pagination {
  height: 4rem;
  padding-left: 1.5rem;
}
</style>
