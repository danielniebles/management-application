<template>
  <v-container class="col-12">
    <v-card class="mx-auto my-12" max-width="374">
      <v-img
        src="https://uploads-ssl.webflow.com/5ea8c50bafc9df682df20c64/5fd1e22ce86c3bb12b333a2f_addon-logo.png"
      ></v-img>
      <v-img
        src="https://uploads-ssl.webflow.com/5ea8c50bafc9df682df20c64/605b51072dc3d843cbf78424_Para-consultora-.png"
      ></v-img>
      <v-row class="justify-center mt-5">
        <span class="login-card-title">Ingresa a tu cuenta</span>
      </v-row>
      <v-row class="justify-center mt-5">
        <p>Recluta de manera inteligente</p>
      </v-row>
      <v-divider></v-divider>
     
        <v-row class="justify-center mt-1">
             <v-card-actions>
          <div class="google-btn">
            <div class="google-icon-wrapper">
              <img
                class="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p class="btn-text"><b>Sign in with google</b></p>
          </div>
          </v-card-actions>
        </v-row>
      
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss">
$white: #fff;
$google-blue: #4285f4;
$button-active-blue: #1669f2;

.google-btn {
  width: 184px;
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