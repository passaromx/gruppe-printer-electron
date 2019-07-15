import Vue from 'vue';
import Vuex from 'vuex';
import { set, handleError } from '@/utils';

import auth from './modules/auth';
import authorizations from './modules/authorizations';
import clients from './modules/clients';
import printer from './modules/printer';
import labels from './modules/labels';

Vue.use(Vuex);

const store = new Vuex.Store({
  getters: { deleteConfirmDialog: state => state.toDelete !== null },
  state: {
    fontDialog: false,
    isLoading: false,
    isReady: false,
    isOnline: true,
    toDelete: null,
    snackbar: {}
  },
  actions: {
    sendError: ({ commit }, data) => {
      handleError(data.error, commit, data.type);
    }
  },
  mutations: {
    setIsReady: set('isReady'),
    setIsLoading: set('isLoading'),
    setFontDialog: set('fontDialog'),
    setIsOnline: set('isOnline'),
    setToDelete: set('toDelete'),
    setSnackbar: set('snackbar')
  },
  modules: {
    authorizations,
    labels,
    clients,
    printer,
    auth
  }
});

store.dispatch('auth/fetchSession')
  .then(() => {
    store.commit('setIsReady', true);
  })
  .catch(() => {
    console.log('err fetchsession');
    if (localStorage) {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('USER'));
      if (user && token) store.commit('setIsReady', true);
    }
  });

export default store;
