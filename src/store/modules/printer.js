import { set } from '@/utils';

const actions = {};

const mutations = {
  setLabels: set('labels'),
  setIsSyncing: set('isSyncing'),
  setLabel: set('label')
};

const state = {
  labels: [],
  syncing: false,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
