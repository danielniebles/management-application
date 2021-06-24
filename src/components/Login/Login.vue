<template>
    <button v-google-signin-button='clientId' class="google-signin-button">Continue with google</button>
</template>
<script>
import GoogleSignInButton from 'vue-google-signin-button-directive'

export default {
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    clientId: '674205569173-a3th7fuh9mueb0rmjdod509al8fgl29o.apps.googleusercontent.com'
  }),
  methods: {
    OnGoogleAuthSuccess (idToken) {
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
}

</script>
<style>

</style>