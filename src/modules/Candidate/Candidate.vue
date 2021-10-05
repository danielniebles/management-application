<template>
  <v-container class="col-12 fill-height">
    <v-row>
      <v-col cols="12" md="6">
        <v-tabs>
          <div class="tabs-header">
            <v-tab v-for="section in candidateInfo" :key="section.sectionName">
              {{ section.displayName }}
            </v-tab>
          </div>

          <v-tab-item
            v-for="(section, levelOneIndex) in candidateInfo"
            :key="levelOneIndex"
            class="scroll"
          >
            <v-expansion-panels multiple tile v-model="panel">
              <v-expansion-panel
                v-for="(variable, levelTwoIndex) in section.variables"
                :key="levelTwoIndex"
              >
                <v-expansion-panel-header
                  class="justify-self-start expansion-panel-header"
                >
                  <span class="header">{{ variable.displayName }}</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div
                    v-for="(value, levelThreeIndex) in variable.variables"
                    :key="value.rchilliKey"
                  >
                    <fieldset class="dotted-wrap">
                      <legend>
                        {{ variable.displayName }} {{ levelThreeIndex }}
                      </legend>
                      <v-row>
                        <v-col
                          :cols="
                            candidateInfo[levelOneIndex].variables[
                              levelTwoIndex
                            ].variables[levelThreeIndex][Object.keys(value)[0]][
                              levelFourIndex
                            ].value.length > 10
                              ? 12
                              : 6
                          "
                          v-for="(item, levelFourIndex) in value[
                            Object.keys(value)[0]
                          ]"
                          :key="item.rchilliKey"
                        >
                          <v-text-field
                            v-if="
                              item.type === 'string' || item.type === 'date'
                            "
                            :label="item.displayName"
                            outlined
                            v-model="
                              candidateInfo[levelOneIndex].variables[
                                levelTwoIndex
                              ].variables[levelThreeIndex][
                                Object.keys(value)[0]
                              ][levelFourIndex].value
                            "
                            class="main-text-field mr-2 ml-2"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </fieldset>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-tab-item>
        </v-tabs>
      </v-col>
      <v-col cols="12" md="6">
        <vue-pdf-app style="height: 100vh" :pdf="fileUrl"></vue-pdf-app>
      </v-col>
      <v-speed-dial
        v-model="fab"
        fab
        bottom
        fixed
        direction="right"
        transition="slide-x-transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" fab class="ml-4" small>
            <v-icon v-if="!fab">mdi-account-circle</v-icon>
            <v-icon v-else>mdi-close</v-icon>
          </v-btn>
        </template>
        <v-btn small fab @click="updateCandidate">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn small fab @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import VuePdfApp from "vue-pdf-app";
import { Component, Inject, Prop } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";
import "vue-pdf-app/dist/icons/main.css";
import { Operation } from "./models/Operation";
import { DashboardService } from "../Dashboard/DashboardService";
import Snackbar from "../shared/components/Snackbar/Snackbar.vue";

Vue.use(Vuetify);
@Component({
  components: {
    VuePdfApp,
  },
})
export default class Candidate extends Vue {
  @Prop() fileUrl!: string;
  @Inject() dashboardService!: DashboardService;

  page = 2;
  perPage = 2;
  length = 0;
  candidateInfo: any[] = [];
  fab = false;
  panel = [0, 1, 2, 3];

  async updateCandidate() {
    try {
      const response = await this.dashboardService.updateCandidateInfo(
        this.$route.params.id,
        this.candidateInfo
      );
      if (response.status === 200) {
        Snackbar.popSuccess("Se ha actualizado correctamente");
      } else {
        Snackbar.popWarning("Ha ocurrido un error al guardar");
      }
    } catch (error) {
      Snackbar.popError("Ha ocurrido un error intente más tarde");
    }
  }

  async mounted() {
    try {
      const response = await this.dashboardService.getCandidateInfo(
        this.$route.params.id
      );
      if (response.status === 200 && response.data) {
        this.candidateInfo = response.data;
      } else {
        Snackbar.popInfo("No se encontró la información del candidato");
      }
    } catch (error) {
      Snackbar.popError("Error al obtener los datos del candidato");
    }
  }

  back() {
    this.$router.push({ name: "Dashboard" });
  }
}
</script>

<style lang="scss" scoped>
.tabs-header {
  display: flex;
}

.dotted-wrap {
  border-radius: 15px;
  border-style: solid;
  border-width: thin;
  padding: 10px 10px 10px 10px;
  margin-top: 10px;
}

.scroll {
  overflow: auto;
  height: 100vh;
}
</style>
