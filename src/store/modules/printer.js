import axios from '@/plugins/axios';
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
  setCopies: set('copies'),
  setVariableValue: setValue()
};

const actions = {
  updateSysInfo(ctx, info) {
    // console.log('updating sys info', info);
    const { mac } = info;
    axios.put(`licenses/${mac}`, info)
      .then(res => {
        console.log('api call', res);
      })
      .catch(err => {
        console.log(err.response);
      });
  }
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
  variables: {},
  copies: 1
};

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
};
