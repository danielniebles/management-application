import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    currentSearch: [],
    currentFilters: [] as {
      key: string;
      parentKey: string;
      value: string;
      name: string;
    }[],
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
    SET_CURRENT_SEARCH(state, candidates) {
      state.currentSearch = candidates;
    },
    ADD_FILTER(state, filter) {
      state.currentFilters.push(filter);
    },
    UPDATE_FILTER(state, payload) {
      const { index, newFilter } = payload;
      state.currentFilters.splice(index, 1, newFilter);
    },
    REMOVE_FILTER(state, index) {
      state.currentFilters.splice(index, 1);
    },
    CLEAR_FILTERS(state) {
      state.currentFilters.splice(0);
    },
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
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    },
    updateSearch({ commit }, candidates) {
      commit("SET_CURRENT_SEARCH", candidates);
    },
    updateFilters({ state, commit }, newFilter) {
      const index = state.currentFilters.findIndex(
        (filter) => filter.key === newFilter.key
      );
      index === -1
        ? commit("ADD_FILTER", newFilter)
        : commit("UPDATE_FILTER", { index, newFilter });
    },
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
    getCurrentFilters: (state) => state.currentFilters,
  },
  modules: {},
});
