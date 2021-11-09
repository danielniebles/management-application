<template>
  <div>
    <v-snackbar
      id="snackbar"
      v-model="snackbar"
      elevation="0"
      bottom
      :color="snackbarColor"
    >
    <div class="snackbar__wrapper">
      <v-icon class="mr-4">{{ icon }}</v-icon>
      <span>
       {{ message }}
      </span>
    </div>
      <template v-slot:action="{ attrs }">
        <v-btn
          id="snackbarCloseBtn"
          icon
          @click.native="close()"
          v-bind="attrs"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">

import { Component } from "vue-property-decorator";
import Vuetify from "vuetify";
import Vue from "vue";
import { eventBus } from "../../../../main"
import { COLORS } from "@/shared/StyleConstants";

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
    eventBus.$on('SnackData', (payload: any) => {
      this.message = payload.msg;
      this.icon = payload.icon;
      this.snackbarColor = payload.color;
      this.snackbar = true;
    });
  }

  static popSuccess(msg: string) {
    eventBus.$emit('SnackData', {
      msg,
      icon: 'mdi-check',
      color: COLORS.SUCCESS
    });
  }

  static popWarning(msg: string) {
    eventBus.$emit('SnackData', {
      msg,
      icon: 'mdi-alert',
      color: COLORS.WARNING
    });
  }

  static popError(msg: string) {
    eventBus.$emit('SnackData', {
      msg,
      icon: 'mdi-close-circle',
      color: COLORS.ERROR
    });
  }

  static popInfo(msg: string) {
    eventBus.$emit('SnackData', {
      msg,
      icon: 'mdi-information',
      color: COLORS.INFO
    });
  }

  close() {
    this.snackbar = false;
  }
}
</script>

<style lang="scss" scoped>
.snackbar__wrapper {
  display: flex;
  max-width: 270px;
  font-weight: 400;
}
</style>