import { set } from '@/utils';

const actions = {
  fetchLabels({ commit }) {
    commit('setLoadingLabels', true);
    const labels = require('../../data/labels.json');
    commit('setLabels', labels);
    commit('setLoadingLabels', true);
  },

  sync({ commit }, labels) {
    commit('setLabels', labels);
  }
};

const mutations = {
  setLabels: set('labels'),
  setLoadingLabels: set('loadingLabels'),
  setIsSyncing: set('isSyncing')
};

const state = {
  labels: [],
  syncing: false,
  loadingLabels: false
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
