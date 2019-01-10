import Vue from 'vue';
import Vuex from 'vuex';
import { set } from '@/utils';
import auth from './modules/auth';
import clients from './modules/clients';
import labels from './modules/labels';

Vue.use(Vuex);

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
    // setUser: set('user'),
    setToDelete: set('toDelete'),
    setSnackbar: set('snackbar')
  },
  modules: {
    labels,
    clients,
    auth
  }
});

store.dispatch('auth/fetchSession')
  .finally(() => store.commit('setIsReady', true));

export default store;
