import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    currentSearch: []
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.accessToken}`;
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    },
    SET_CURRENT_SEARCH(state, candidates){
      state.currentSearch = candidates;
    }
  },
  actions: {
    login({ commit }, googleToken) {
      return axios
        .post(`${process.env.VUE_APP_VERIFIKAR_API}/auth/signIn`, {
          idToken: googleToken,
        })
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
        });
    },
    register({ commit }, googleToken) {
      return axios
        .post(`${process.env.VUE_APP_VERIFIKAR_API}/auth/signUp`, {
          idToken: googleToken,
        })
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
        });
    },
    logout({ commit }, payload) {
      commit("CLEAR_USER_DATA");
    },
    updateSearch({ commit }, candidates){
      commit("SET_CURRENT_SEARCH", candidates)
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
  },
  modules: {},
});
