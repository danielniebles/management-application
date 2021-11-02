<template>
  <v-app>
    <v-app-bar color="white" app elevate-on-scroll v-if="this.$router.currentRoute.name !== 'Login'">
      <img src="../src/assets/main_atome.svg" alt="Logo Atome">
      <v-spacer></v-spacer>
      <v-btn fab small elevation="0" color="white"
              >
              <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab small elevation="0" color="white" v-bind="attrs"
              v-on="on">
              <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
       <v-avatar size="32" class="ml-1">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
    </v-app-bar>
    <v-main>

      <ServiceProvider>
        <router-view />
      </ServiceProvider>
      <Snackbar></Snackbar>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ServiceProvider from "./providers/ServiceProvider.vue";
import Snackbar from "./modules/shared/components/Snackbar/Snackbar.vue"

@Component({
  name: "App",
  components: {
    ServiceProvider,
    Snackbar
  },
})
export default class App extends Vue {

  drawer = false;

  logout(){
    this.$store.dispatch('logout')
  }

  toggleDrawer(){
    this.drawer = true;
  }
}
</script>

<style lang="scss">
@import "./styles/styles.scss";
</style>
