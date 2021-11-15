<template>
  <v-container class="col-12 container">
    <v-card class="mx-auto my-12" max-width="374">
      <v-img src="../../assets/logo_atome.png"></v-img>
      <v-row class="justify-center mt-1">
        <span class="login-card-title">Ingresa a tu cuenta</span>
      </v-row>
      <v-row class="justify-center mt-5">
        <p>Recluta de manera inteligente</p>
      </v-row>
      <v-divider></v-divider>
      <div class="ma-4">
        <v-row class="justify-center ma-0">
          <v-card-actions>
            <LoginButton :actionType="LOGIN" @login="login" />
          </v-card-actions>
        </v-row>
        <v-row class="justify-center ma-0">
          <p class="ma-0">ó</p>
        </v-row>

        <v-row class="justify-center ma-0">
          <v-card-actions>
            <LoginButton :actionType="REGISTER" @register="register" />
          </v-card-actions>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vuetify from "vuetify";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import LoginButton from "../Login/components/LoginButton.vue";
import Snackbar from "../shared/components/Snackbar/Snackbar.vue";
import { eventBus } from "@/main";

Vue.use(Vuetify);
@Component({
  name: "Login",
  components: {
    LoginButton,
  },
})
export default class Login extends Vue {
  LOGIN = "login";
  REGISTER = "register";

  login(idToken: string) {
    this.$store
      .dispatch("login", idToken)
      .then(() => this.$router.push({ name: "Dashboard" }))
      .catch((error) => {
        Snackbar.popError("Regístrate para poder continuar");
      });
  }
  register(idToken: string) {
    this.$store
      .dispatch("register", idToken)
      .then(() => this.$router.push({ name: "Dashboard" }))
      .catch((error) => {
        Snackbar.popError("Ya estás registrado, por favor inicia sesión");
      });
  }
  created() {
    eventBus.$on("unauthorized", () => {
      Snackbar.popError("Sesión expirada");
    });
  }
}
</script>

<style lang="scss" scoped>
$white: #fff;
$google-blue: #4285f4;
$button-active-blue: #1669f2;

.container {
  height: 100vh;
  display: flex;
  align-items: center;
}
.google-btn {
  width: 235px;
  height: 42px;
  background-color: $google-blue;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  .google-icon-wrapper {
    position: absolute;
    margin-top: 1px;
    margin-left: 1px;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: $white;
  }
  .google-icon {
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
    width: 18px;
    height: 18px;
  }
  .btn-text {
    float: right;
    margin: 11px 11px 0 0;
    color: $white;
    font-size: 14px;
    letter-spacing: 0.2px;
  }
  &:hover {
    box-shadow: 0 0 6px $google-blue;
  }
  &:active {
    background: $button-active-blue;
  }
}

.google-btn-register {
  width: 235px;
  height: 42px;
  background-color: $white;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  border: 1px $google-blue;
  .google-icon-wrapper {
    position: absolute;
    margin-top: 1px;
    margin-left: 1px;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: $white;
  }
  .google-icon {
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
    width: 18px;
    height: 18px;
  }
  .btn-text {
    float: right;
    margin: 11px 11px 0 0;
    color: $google-blue;
    font-size: 14px;
    letter-spacing: 0.2px;
  }
  &:hover {
    box-shadow: 0 0 6px $google-blue;
  }
  &:active {
    background: $button-active-blue;
  }

  .logo__container {
    padding: 30px;
  }
}
</style>
