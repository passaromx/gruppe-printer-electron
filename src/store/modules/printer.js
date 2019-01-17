import { set } from '@/utils';

const setValue = () => (state, payload) => { state.variables[payload.name].value = payload.value; };

const mutations = {
  setLabels: set('labels'),
  setConfig: set('config'),
  setSelectedLabel: set('selectedLabel'),
  setIsSyncing: set('isSyncing'),
  setLabel: set('label'),
  setPreviewLoader: set('previewLoader'),
  setVariables: set('variables'),
  setVariableValue: setValue()
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
  previewLoader: false,
  variables: {}
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
