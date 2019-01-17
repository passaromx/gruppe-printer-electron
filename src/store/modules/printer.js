import { set } from '@/utils';

const mutations = {
  setLabels: set('labels'),
  setConfig: set('config'),
  setSelectedLabel: set('selectedLabel'),
  setIsSyncing: set('isSyncing'),
  setLabel: set('label'),
  setPreviewLoader: set('previewLoader')
};

const getters = {
  formattedLabels: state => state.labels.map(label => {
    const limit = 60;
    const description = `${label.sku} - ${label.name}`;
    label.description = description.length > limit
      ? `${description.slice(0, limit)}...`
      : description;
    return label;
  })
};

const state = {
  labels: [],
  config: {},
  selectedLabel: null,
  syncing: false,
  previewLoader: false
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
