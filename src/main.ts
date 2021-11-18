import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import firebase from 'firebase/compat/app'

export const eventBus = new Vue()

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.directive('blur', {
  inserted: function (el) {
    el.onfocus = (ev) => (ev.target as unknown as HTMLElement).blur()
  }
})

const config = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  // databaseURL: process.env.VUE_APP_databaseUrl,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId
}
firebase.initializeApp(config)

new Vue({
  router,
  store,
  created() {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
          eventBus.$emit('unauthorized')
        }
        return Promise.reject(error)
      }
    )
  },
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
