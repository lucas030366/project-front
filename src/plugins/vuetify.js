import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pt from 'vuetify/es5/locale/pt';
import colors from "vuetify/es5/util/colors"

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt',
  },
  icons: {
    iconfont: 'fa',
  },
  theme: {
    themes: {
      light: {
        primary: colors.teal.darken1,
        success: colors.teal.lighten1,
        error: colors.red.darken4
      }
    }

  }
});
