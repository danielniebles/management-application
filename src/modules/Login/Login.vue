<template>
  <div class="login__container">
    <div class="content">
      <div class="logo__container">
        <v-img src="../../assets/main_atome.svg" max-width="290"></v-img>
      </div>
      <div class="form__container">
        <p class="text-subtitle-1 bar__title">Correo registrado</p>
        <v-text-field
          label="Ingresa aquí tu correo"
          outlined
          color="black"
          single-line
          background-color="white"
          height="48px"
        >
        </v-text-field>
        <p class="text-subtitle-1 bar__title">Contraseña</p>
        <v-text-field
          label="Escribe tu contraseña"
          outlined
          color="black"
          single-line
          background-color="white"
        >
        </v-text-field>
        <v-btn :class="ghostBtnClass + ' ma-4'" text
          >¿Olvidaste tu contraseña?</v-btn
        >
        <v-btn :class="primaryBtnClass" block>Iniciar sesión</v-btn>
        <v-divider class="my-5"></v-divider>
        <v-btn
          outlined
          plain
          :class="outlinedBtn"
          block
          v-google-signin-button="clientId"
          @click="setLogin"
        >
          <v-icon class="mr-4">$googleSvg</v-icon>
          Inicia sesión con Google
        </v-btn>
      </div>
    </div>
    <div class="svg__container">
      <v-img src="../../assets/login_background.svg"></v-img>
    </div>
    <div class="register__container">
      <p class="mt-2">¿No tienes una cuenta?</p>
      <v-btn
        :class="ghostBtnClass"
        text
        @click="setRegister"
        v-google-signin-button="clientId"
        >Regístrate</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vuetify from "vuetify";
import Vue from "vue";
import { Component, Inject } from "vue-property-decorator";
import Snackbar from "../shared/components/Snackbar/Snackbar.vue";
import { eventBus } from "@/main";
import { SegmentService } from "../shared/services/SegmentService";
import { STYLE_CLASSES } from "@/shared/StyleConstants";

Vue.use(Vuetify);
@Component({
  name: "Login",
})
export default class Login extends Vue {
  GoogleSignInButton = require("vue-google-signin-button-directive");

  LOGIN = "login";
  REGISTER = "register";
  primaryBtnClass = STYLE_CLASSES.PRIMARY_BTN;
  ghostBtnClass = STYLE_CLASSES.GHOST_BTN;
  outlinedBtn = STYLE_CLASSES.OUTLINED_BTN;
  clientId =
    "674205569173-a3th7fuh9mueb0rmjdod509al8fgl29o.apps.googleusercontent.com";
  currentAction = "";

  @Inject() segmentService!: SegmentService;

  OnGoogleAuthSuccess(idToken: string) {
    this.currentAction === "login"
      ? this.login(idToken)
      : this.register(idToken);
  }
  OnGoogleAuthFail(error: string) {
    Snackbar.popError("Error de autenticación de Google");
  }

  login(idToken: string) {
    this.$store
      .dispatch("login", idToken)
      .then(() => this.$router.push({ name: "Home" }))
      .catch((error) => {
        Snackbar.popError("Regístrate para poder continuar");
      });
  }
  register(idToken: string) {
    this.$store
      .dispatch("register", idToken)
      .then(() => this.$router.push({ name: "Home" }))
      .catch((error) => {
        Snackbar.popError("Ya estás registrado, por favor inicia sesión");
      });
  }
  created() {
    eventBus.$on("unauthorized", () => {
      Snackbar.popError("Sesión expirada");
    });
  }

  setRegister() {
    this.currentAction = "register";
  }

  setLogin() {
    this.currentAction = "login";
  }
}
</script>

<style lang="scss" scoped>
$white: #fff;
$google-blue: #4285f4;
$button-active-blue: #1669f2;

.svg__container {
  position: fixed;
  bottom: 0;
  right: 0;
}

.actions__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login__container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 25%;
}

.register__container {
  display: flex;
  position: fixed;
  top: 10px;
  right: 10px;
}

.content {
  width: 30%;
}

@media screen and (min-width: 568px) {
  .content {
    width: 90%;
  }
}

@media screen and (max-width: 567px) {
  .content {
    width: 90%;
  }
}

@media screen and (min-width: 768px) {
  .content {
    width: 70%;
  }
}

@media screen and (min-width: 1024px) {
  .content {
    width: 30%;
  }
}

.logo__container {
  display: flex;
  justify-content: center;
  margin-bottom: 90px;
}

.container {
  height: 100vh;
  display: flex;
  align-items: center;
}

.bar__title {
  position: relative;
  top: 10px;
}

.form__container {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
}
</style>
