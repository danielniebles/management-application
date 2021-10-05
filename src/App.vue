<template>
  <v-app>
    <v-main>
      <!-- <v-btn v-if="this.$router.currentRoute.name !== 'Login'" fab fixed top left small @click="toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->

      <ServiceProvider>
        <router-view />
      </ServiceProvider>
      <Snackbar></Snackbar>
    </v-main>
    <v-navigation-drawer permanent expand-on-hover app width="200" v-if="this.$router.currentRoute.name !== 'Login'" v-model="drawer">
      <v-list>
        <v-list-item class="px-2">
          <v-img
            src="./assets/logo_atome.png"
          ></v-img>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Buscar</v-list-item-title>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-help-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ayuda</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cuenta</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
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
