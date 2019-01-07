import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import colors from 'vuetify/es5/util/colors';
import i18n from './i18n';

Vue.use(Vuetify, {
  lang: { t: (key, ...params) => i18n.t(key, params) },
  theme: { primary: colors.amber },
  iconfont: 'md',
});
