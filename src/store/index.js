import Vue from 'vue';
import Vuex from 'vuex';
import attachCognitoModule from '@vuetify/vuex-cognito-module';
import labels from './modules/labels';
import clients from './modules/clients';

Vue.use(Vuex);

const set = property => (store, payload) => { store[property] = payload; };

const store = new Vuex.Store({
  getters: { deleteConfirmDialog: state => state.toDelete !== null },
  state: {
    isLoading: false,
    isReady: false,
    toDelete: null,
    snackbar: {}
  },
  mutations: {
    setIsReady: set('isReady'),
    setIsLoading: set('isLoading'),
    setUser: set('user'),
    setToDelete: set('toDelete'),
    setSnackbar: set('snackbar')
  },
  modules: {
    labels,
    clients
  }
});

attachCognitoModule(store, {
  userPoolId: process.env.VUE_APP_USER_POOL_ID,
  identityPoolId: process.env.VUE_APP_IDENTITY_POOL_ID,
  userPoolWebClientId: process.env.VUE_APP_CLIENT_ID,
  region: process.env.VUE_APP_REGION
}, 'cognito');

store.dispatch('cognito/fetchSession')
  .finally(() => store.commit('setIsReady', true));

export default store;
