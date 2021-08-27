<template>
  <v-container class="col-12">
    <v-row>
      <v-col cols="6">
        <v-tabs vertical>
          <v-tab v-for="section in operations" :key="section.sectionName">
            {{ section.displayName }}
          </v-tab>

          <v-tab-item
            v-for="(section, levelOneIndex) in operations"
            :key="levelOneIndex"
            class="ma-5"
          >
            <v-expansion-panels multiple tile>
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
                      <div
                        v-for="(item, levelFourIndex) in value[
                          Object.keys(value)[0]
                        ]"
                        :key="item.rchilliKey"
                      >
                        <v-text-field
                          v-if="item.type === 'string'"
                          :label="item.displayName"
                          outlined
                          v-model="
                            operations[levelOneIndex].variables[levelTwoIndex]
                              .variables[levelThreeIndex][
                              Object.keys(value)[0]
                            ][levelFourIndex].value
                          "
                          class="main-text-field mr-2 ml-2"
                        >
                        </v-text-field>
                        <v-select
                          v-if="value.type === 'list'"
                          :label="value.name"
                          :items="value.list"
                          outlined
                          class="main-text-field"
                        >
                        </v-select>
                      </div>
                    </fieldset>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <!-- <div
              v-for="(variable, levelTwoIndex) in section.variables"
              :key="variable.rchilliKey"
            >
              <div
                v-for="(value, levelThreeIndex) in variable.variables"
                :key="value.rchilliKey"
              >
              
                <fieldset class="dotted-wrap">
                  <legend>
                    {{ variable.displayName }} {{ levelThreeIndex }}
                  </legend>
                  <div
                    v-for="(item, levelFourIndex) in value[
                      Object.keys(value)[0]
                    ]"
                    :key="item.rchilliKey"
                  >
                    <v-text-field
                      v-if="item.type === 'string'"
                      :label="item.displayName"
                      outlined
                      v-model="
                        operations[levelOneIndex].variables[levelTwoIndex]
                          .variables[levelThreeIndex][Object.keys(value)[0]][
                          levelFourIndex
                        ].value
                      "
                      class="main-text-field mr-2 ml-2"
                    >
                    </v-text-field>
                    <v-select
                      v-if="value.type === 'list'"
                      :label="value.name"
                      :items="value.list"
                      outlined
                      class="main-text-field"
                    >
                    </v-select>
                  </div>
                </fieldset>
              </div>
            </div> -->
          </v-tab-item>
        </v-tabs>
      </v-col>
      <v-col cols="6">
        <vue-pdf-app
          style="height: 100vh"
          pdf="https://verifikar-resumes-bucket.storage.googleapis.com/payc/%2802%20HV%20%20RAFAEL%20BELLO%29.pdf"
        ></vue-pdf-app>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import VuePdfApp from "vue-pdf-app";
import { Component, Prop } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";
import "vue-pdf-app/dist/icons/main.css";
import { Operation } from "./models/Operation";

Vue.use(Vuetify);
@Component({
  components: {
    VuePdfApp,
  },
})
export default class Candidate extends Vue {
  @Prop() fileUrl!: string;

  page = 2;
  perPage = 2;
  length = 0;

  operations: any[] = [
    {
      sectionName: "general_information",
      displayName: "Información general",
      variables: [
        {
          rchilliKey: "ResumeCountry",
          type: "array",
          displayName: "País",
          variables: [
            {
              ResumeCountry_0: [
                {
                  rchilliKey: "Country",
                  displayName: "País",
                  type: "string",
                  value: "Colombia",
                },
              ],
            },
          ],
        },
        {
          rchilliKey: "Name",
          type: "array",
          displayName: "Nombre",
          variables: [
            {
              Name_0: [
                {
                  rchilliKey: "FirstName",
                  displayName: "Primer nombre",
                  type: "string",
                  value: "Rafael ",
                },
                {
                  rchilliKey: "MiddleName",
                  displayName: "Segundo nombre",
                  type: "string",
                  value: "Eduardo ",
                },
                {
                  rchilliKey: "LastName",
                  displayName: "Apellidos",
                  type: "string",
                  value: "Bello Páez",
                },
              ],
            },
          ],
        },
        {
          rchilliKey: "Address",
          type: "array",
          displayName: "Dirección",
          variables: [
            {
              Address_0: [
                {
                  rchilliKey: "Street",
                  displayName: "Dirección",
                  type: "string",
                  value: "rafael Eduardo Bello Páez 74188. 567",
                },
                {
                  rchilliKey: "Country",
                  displayName: "País",
                  type: "string",
                  value: "Colombia",
                },
                {
                  rchilliKey: "State",
                  displayName: "Ciudad",
                  type: "string",
                  value: "Boyacá",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      sectionName: "experiencie",
      displayName: "Experiencia",
      variables: [
        {
          rchilliKey: "WorkedPeriod",
          type: "array",
          displayName: "Periodo trabajado",
          variables: [
            {
              WorkedPeriod_0: [
                {
                  rchilliKey: "TotalExperienceInMonths",
                  displayName: "Experiencia total en meses",
                  type: "string",
                  value: "25",
                },
                {
                  rchilliKey: "TotalExperienceInYear",
                  displayName: "Experiencia total en años",
                  type: "string",
                  value: "2.1",
                },
                {
                  rchilliKey: "TotalExperienceRange",
                  displayName: "Rango",
                  type: "string",
                  value: "1-3 YEAR",
                },
              ],
            },
          ],
        },
        {
          rchilliKey: "SegregatedExperience",
          displayName: "Detalle de experiencia",
          type: "array",
          variables: [
            {
              SegregatedExperience_0: [
                {
                  rchilliKey: "Employer.EmployerName",
                  displayName: "Empleador",
                  type: "string",
                  value: "Alcaldía de Sogamoso",
                },
                {
                  rchilliKey: "JobProfile.Title",
                  displayName: "Cargo",
                  type: "string",
                  value: "Diseñador y residente",
                },
                {
                  rchilliKey: "Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "JobPeriod",
                  displayName: "Periodo trabajado",
                  type: "string",
                  value: "01/03/08 al 31/12/08",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "01/03/2008",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "31/12/2008",
                },
                {
                  rchilliKey: "JobDescription",
                  displayName: "Resumen",
                  type: "string",
                  value: "Oficina Asesora de Planeación",
                },
              ],
            },
            {
              SegregatedExperience_1: [
                {
                  rchilliKey: "Employer.EmployerName",
                  displayName: "Empleador",
                  type: "string",
                  value: "Alcaldía de Beteitiva",
                },
                {
                  rchilliKey: "JobProfile.Title",
                  displayName: "Cargo",
                  type: "string",
                  value: "Control Urbano Control de Obra",
                },
                {
                  rchilliKey: "Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "JobPeriod",
                  displayName: "Periodo trabajado",
                  type: "string",
                  value: "01/02/09 al 31/12/09",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "01/02/2009",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "31/12/2009",
                },
                {
                  rchilliKey: "JobDescription",
                  displayName: "Resumen",
                  type: "string",
                  value:
                    "Oficina de Planeación \n .Cargo : Contratista-Consultoría para diseño urbano y \n \t Arquitectónico del Parque principal del municipio",
                },
              ],
            },
            {
              SegregatedExperience_2: [
                {
                  rchilliKey: "Employer.EmployerName",
                  displayName: "Empleador",
                  type: "string",
                  value: "Compiles LTDA",
                },
                {
                  rchilliKey: "JobProfile.Title",
                  displayName: "Cargo",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "JobPeriod",
                  displayName: "Periodo trabajado",
                  type: "string",
                  value: "10/08/09 al 16/12/09",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "10/08/2009",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "16/12/2009",
                },
                {
                  rchilliKey: "JobDescription",
                  displayName: "Resumen",
                  type: "string",
                  value:
                    ".Cargo : Arq Residente de pilotaje \n \t Residente de obra en cimentaciones profundas",
                },
              ],
            },
            {
              SegregatedExperience_3: [
                {
                  rchilliKey: "Employer.EmployerName",
                  displayName: "Empleador",
                  type: "string",
                  value: "TASSCO S.A.S",
                },
                {
                  rchilliKey: "JobProfile.Title",
                  displayName: "Cargo",
                  value: "",
                },
                {
                  rchilliKey: "Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "Boyacá",
                },
                {
                  rchilliKey: "JobPeriod",
                  displayName: "Periodo trabajado",
                  value: "19/03/10 al 26/06/10",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "19/03/2010",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "26/06/2010",
                },
                {
                  rchilliKey: "JobDescription",
                  displayName: "Resumen",
                  type: "string",
                  value:
                    "Residente de interventoría en la intervención \n \t urbana al parque municipal de Beteitiva Boyacá \n Cargo : Arq residente de Interventoría \n \t Sogamoso 01-08-10 al 31-01-11 \n \n Empresa : PROYECTOS Y DESARROLOS I S.A \n \t Residente de acabados en Proyectos Centro \n \t Empresarial gran estación. \n Cargo : Arq. Residente de Obra \n \t Bogotá 01-04-11 al 01-7-11 \n \n Empresa : APAMI S.A.S \n \t Residente de Interventoría en Proyecto Bodega - \n \t Almacén Muebles y Accesorios \n Cargo : Arq. Residente de Interventoría \n \t Bogotá 01-10-11al 15-07-13 \n \n Empresa : CONSORCIO CYB INGTEC \n \t Residente de obra en Proyecto Restaurante \n \t escolar Colegio Ramón Ignacio \n Cargo : Arq. Residente de Obra \n \t Sogamoso 12-11-13 al 12-06-14 \n \n Empresa : INGEOBRAS S.A.S \n \t Residente de Interventoría \n Cargo : Arq. Residente de Interventoría \n \t Bogotá 01-09-15 al 31-03-2017 \n \n Empresa : EPYPSA S.A.S \n \t Arq Diseño \n Cargo : Arq. Apoyo y diseño \n \t Bogotá 01-12-17 al 31-12-2017",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      sectionName: "qualification",
      displayName: "Educación y aptitudes",
      variables: [
        {
          rchilliKey: "SegregatedSkill",
          type: "array",
          displayName: "Habilidades",
          variables: [
            {
              SegregatedSkill_0: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "BehaviorSkills",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Consciente De",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value: "",
                },
              ],
            },
            {
              SegregatedSkill_1: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "BehaviorSkills",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Apoyo",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value: "",
                },
              ],
            },
            {
              SegregatedSkill_2: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "SoftSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Competencias",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value: "",
                },
              ],
            },
            {
              SegregatedSkill_3: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "SoftSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Comunidad",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value: "",
                },
              ],
            },
            {
              SegregatedSkill_4: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Diseño Arquitectónico",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value: "Arts, Entertainment, and Recreation>Designers>Diseño",
                },
              ],
            },
            {
              SegregatedSkill_5: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Soluciones Orientadas",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value:
                    "Management of Companies and Enterprises>Management Occupations>soluciones Orientadas",
                },
              ],
            },
            {
              SegregatedSkill_6: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Especificaciones",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value:
                    "Information>All Other Information Services>Especificacion",
                },
              ],
            },
            {
              SegregatedSkill_7: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Diseño Urbano",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value:
                    "Arts, Entertainment, and Recreation>Urban and Regional Planners>Diseño urbano",
                },
              ],
            },
            {
              SegregatedSkill_8: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Arquitectura",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value:
                    "Construction>Architecture and Engineering Occupations>arquitectura",
                },
              ],
            },
            {
              SegregatedSkill_9: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Autoservicio",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value:
                    "Management of Companies and Enterprises>Purchasing Managers>Autoservicio",
                },
              ],
            },
            {
              SegregatedSkill_10: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Mejoramiento",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value:
                    "Information>Mathematical Science Occupations>optimizacion",
                },
              ],
            },
            {
              SegregatedSkill_11: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Rentabilidad",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value:
                    "Finance and Insurance>Accountants and Auditors>Rentabilidad",
                },
              ],
            },
            {
              SegregatedSkill_12: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Silvicultura",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value:
                    "Arts, Entertainment, and Recreation>Conservation Scientists and Foresters>Silvicultura",
                },
              ],
            },
            {
              SegregatedSkill_13: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Desarrollo",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value:
                    "Management of Companies and Enterprises>Management Occupations>Desarrollo",
                },
              ],
            },
            {
              SegregatedSkill_14: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Ingeniería",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value: "",
                },
              ],
            },
            {
              SegregatedSkill_15: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Construir",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value: "",
                },
              ],
            },
            {
              SegregatedSkill_16: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Estética",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value: "",
                },
              ],
            },
            {
              SegregatedSkill_17: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Diseño",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value: "Arts, Entertainment, and Recreation>Designers>Diseño",
                },
              ],
            },
            {
              SegregatedSkill_18: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "Ética",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value: "",
                },
              ],
            },
            {
              SegregatedSkill_19: [
                {
                  rchilliKey: "Type",
                  displayName: "Tipo",
                  type: "string",
                  value: "OperationalSkill",
                },
                {
                  rchilliKey: "Skill",
                  displayName: "Habilidad",
                  type: "string",
                  value: "C",
                },
                {
                  rchilliKey: "Ontology",
                  displayName: "Ontología",
                  type: "string",
                  value:
                    "Information>Software Developers and Programmers>C Language",
                },
              ],
            },
          ],
        },
        {
          rchilliKey: "SegregatedQualification",
          type: "array",
          displayName: "Otra cosa",
          variables: [
            {
              SegregatedQualification_0: [
                {
                  rchilliKey: "Institution.Name",
                  displayName: "Institución",
                  type: "string",
                  value: "Departamento técnico de vivienda",
                },
                {
                  rchilliKey: "Degree.DegreeName",
                  displayName: "Título",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "Institution.Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "28/02/2023",
                },
              ],
            },
            {
              SegregatedQualification_1: [
                {
                  rchilliKey: "Institution.Name",
                  displayName: "Institución",
                  type: "string",
                  value: "CENTRO DE EXPOSICIONES PERMANENTES",
                },
                {
                  rchilliKey: "Degree.DegreeName",
                  displayName: "Título",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "Institution.Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "Bogotá",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "01/10/2012",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "31/12/2019",
                },
              ],
            },
            {
              SegregatedQualification_2: [
                {
                  rchilliKey: "Institution.Name",
                  displayName: "Institución",
                  type: "string",
                  value: "NASKA DIGITAL",
                },
                {
                  rchilliKey: "Degree.DegreeName",
                  displayName: "Título",
                  type: "string",
                  value: "ADVANCED DIGITAL ARCHITECTURAL",
                },
                {
                  rchilliKey: "Institution.Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "24/11/2012",
                },
              ],
            },
            {
              SegregatedQualification_3: [
                {
                  rchilliKey: "Institution.Name",
                  displayName: "Institución",
                  type: "string",
                  value: "Universidad de la Salle",
                },
                {
                  rchilliKey: "Degree.DegreeName",
                  displayName: "Título",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "Institution.Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "24/11/2012",
                },
              ],
            },
            {
              SegregatedQualification_4: [
                {
                  rchilliKey: "Institution.Name",
                  displayName: "Institución",
                  type: "string",
                  value: "NASKA DIGITAL",
                },
                {
                  rchilliKey: "Degree.DegreeName",
                  displayName: "Título",
                  type: "string",
                  value: "ESSENTIAL DIGITAL ARCHITECTURAL",
                },
                {
                  rchilliKey: "Institution.Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "26/10/2007",
                },
              ],
            },
            {
              SegregatedQualification_5: [
                {
                  rchilliKey: "Institution.Name",
                  displayName: "Institución",
                  type: "string",
                  value: "Universidad de la Salle",
                },
                {
                  rchilliKey: "Degree.DegreeName",
                  displayName: "Título",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "Institution.Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "Bogotá",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "31/12/2007",
                },
              ],
            },
            {
              SegregatedQualification_6: [
                {
                  rchilliKey: "Institution.Name",
                  displayName: "Institución",
                  type: "string",
                  value: "Universidad de la Sallé",
                },
                {
                  rchilliKey: "Degree.DegreeName",
                  displayName: "Título",
                  type: "string",
                  value: "Marginalidad Urbana",
                },
                {
                  rchilliKey: "Institution.Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "16/04/2003",
                },
              ],
            },
            {
              SegregatedQualification_7: [
                {
                  rchilliKey: "Institution.Name",
                  displayName: "Institución",
                  type: "string",
                  value: "Universidad de la Salle",
                },
                {
                  rchilliKey: "Degree.DegreeName",
                  displayName: "Título",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "Institution.Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "30/08/2002",
                },
              ],
            },
            {
              SegregatedQualification_8: [
                {
                  rchilliKey: "Institution.Name",
                  displayName: "Institución",
                  type: "string",
                  value: "Instituto Fondo de vivienda de Interés Social",
                },
                {
                  rchilliKey: "Degree.DegreeName",
                  displayName: "Título",
                  type: "string",
                  value: "Urbana Del Municipio De",
                },
                {
                  rchilliKey: "Institution.Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "Sogamoso",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "21/05/2002",
                },
              ],
            },
            {
              SegregatedQualification_9: [
                {
                  rchilliKey: "Institution.Name",
                  displayName: "Institución",
                  type: "string",
                  value: "Colegio Nacional de Bachillerato Técnico",
                },
                {
                  rchilliKey: "Degree.DegreeName",
                  displayName: "Título",
                  type: "string",
                  value: "Maestría",
                },
                {
                  rchilliKey: "Institution.Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "",
                },
              ],
            },
            {
              SegregatedQualification_10: [
                {
                  rchilliKey: "Institution.Name",
                  displayName: "Institución",
                  type: "string",
                  value: "Universidad de la Salle",
                },
                {
                  rchilliKey: "Degree.DegreeName",
                  displayName: "Título",
                  type: "string",
                  value: "Bachiller Técnico Industrial",
                },
                {
                  rchilliKey: "Institution.Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "",
                },
              ],
            },
            {
              SegregatedQualification_11: [
                {
                  rchilliKey: "Institution.Name",
                  displayName: "Institución",
                  type: "string",
                  value: "Universidad Nacional de Colombia",
                },
                {
                  rchilliKey: "Degree.DegreeName",
                  displayName: "Título",
                  type: "string",
                  value: "Maestría en Diseño Urbano",
                },
                {
                  rchilliKey: "Institution.Location.City",
                  displayName: "Ciudad",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "StartDate",
                  displayName: "Fecha de inicio",
                  type: "string",
                  value: "",
                },
                {
                  rchilliKey: "EndDate",
                  displayName: "Fecha de finalización",
                  type: "string",
                  value: "",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  // get splitVariables() {
  //   const { page, perPage } = this;
  //   //this.length = Math.ceil(variables.length / this.perPage);
  //   //console.log(variables.slice((page - 1) * perPage, page * perPage));
  //   return (variables: any[]) => variables.slice((page - 1) * perPage, page * perPage);
  // }
}
</script>

<style lang="scss" scoped>
.stepper {
  display: flex;
  flex-direction: row;
}

.dotted-wrap {
  border-radius: 15px;
  border-style: solid;
  border-width: thin;
  padding: 10px 10px 10px 10px;
  margin-top: 10px;
}
</style>
