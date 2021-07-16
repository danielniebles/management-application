<template>
  <div>
    <v-snackbar
      id="snackbar"
      v-model="snackbar"
      min-width="0 !important"
      max-width="70vw"
      top
      :color="snackbarColor"
    >
      <v-icon class="mx-2">{{ icon }}</v-icon>
      <span class="snackbar-msg">
        <b>{{ message }}</b>
      </span>
      <template v-slot:action="{ attrs }">
        <v-btn
          id="snackbarCloseBtn"
          icon
          @click.native="close()"
          v-bind="attrs"
        >
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">

import { Component } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";
import EventBus from "@/EventBus";

Vue.use(Vuetify);
@Component({
  name: "Snackbar"
})
export default class Snackbar extends Vue {
  snackbar = false;
  message = "";
  icon = "";
  snackbarColor = "";

  mounted() {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    console.log('snack');
    
    EventBus.$on('SnackData', (payload: any) => {
      this.message = payload.msg;
      this.icon = payload.icon;
      this.snackbarColor = payload.color;
      this.snackbar = true;
    });
  }

  static popSuccess(msg: string) {
    EventBus.$emit('SnackData', {
      msg,
      icon: 'mdi-check',
      color: '#69d1c5'
    });
  }

  static popWarning(msg: string) {
    EventBus.$emit('SnackData', {
      msg,
      icon: 'mdi-alert',
      color: '#f7a072'
    });
  }

  static popError(msg: string) {
    EventBus.$emit('SnackData', {
      msg,
      icon: 'mdi-close-circle',
      color: '#f39a9d'
    });
  }

  static popInfo(msg: string) {
    EventBus.$emit('SnackData', {
      msg,
      icon: 'mdi-information',
      color: '#9cc4d5'
    });
  }

  close() {
    this.snackbar = false;
  }
}
</script>