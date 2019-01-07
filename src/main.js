import Vue from 'vue';
import './plugins/vuetify';
import './plugins/veeValidate';
import i18n from './plugins/i18n';
import './components/Shared';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
