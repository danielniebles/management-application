<template>
  <div :class="classType">
    <div class="google-icon-wrapper">
      <img
        class="google-icon"
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
      />
    </div>
    <button @click="outlookEvent">sefaseses</button>
  </div>
</template>

<script lang="ts">
import Vuetify from "vuetify";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Snackbar from "../../shared/components/Snackbar/Snackbar.vue"

Vue.use(Vuetify);
@Component({
  name: "OutlookButton",
})
export default class OutlookButton extends Vue {
    outlookEvent(){
        this.$emit('loginOutlook');
    }
//   GoogleSignInButton = require('vue-google-signin-button-directive')
  
//   @Prop() private actionType!: string;
//   classType =
//     this.actionType === "login" ? "google-btn" : "google-btn-register";
//   displayText =
//     this.actionType === "login"
//       ? "Inicia sesión con Outlook"
//       : "Regístrate con Outlook";

//   clientId =
//     "674205569173-a3th7fuh9mueb0rmjdod509al8fgl29o.apps.googleusercontent.com";

//   OnGoogleAuthSuccess(idToken: string) {
//     console.log(this.actionType)
//     this.$emit(this.actionType, idToken);
//   }
//   OnGoogleAuthFail(error: string) {
//     Snackbar.popError('Error de autenticación de Google');
//   }

}
</script>

<style lang="scss">
$white: #fff;
$button-active-white: rgb(187, 211, 211);
$google-blue: #4285f4;
$button-active-blue: #1669f2;

.google-btn {
  width: 215px;
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
  width: 200px;
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
    background: $button-active-white;
  }
}
</style>