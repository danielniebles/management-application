import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import GoogleSvg from "../modules/shared/components/GoogleSvg.vue";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      googleSvg: { component: GoogleSvg },
    },
  },
});
