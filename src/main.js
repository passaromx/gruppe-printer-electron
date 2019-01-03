import Vue from 'vue';
import './plugins/vuetify';
import './plugins/veeValidate';
import './components/Shared';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
