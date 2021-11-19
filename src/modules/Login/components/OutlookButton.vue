<template>
  <div class="outlook-btn">
    <div class="google-icon-wrapper">
      <img
        class="google-icon"
        src="https://upload.wikimedia.org/wikipedia/commons/9/90/Outlook.com_icon_%282012-2019%29.svg"
      />
    </div>
    <button class="btn-text" @click="outlookEvent"><b>Inicia sesión con Outlook</b></button>
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
}
</script>

<style lang="scss">
$white: #fff;
$button-active-white: rgb(187, 211, 211);
$google-blue: #4285f4;
$button-active-blue: #1669f2;

.outlook-btn {
  width: 240px;
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


</style>