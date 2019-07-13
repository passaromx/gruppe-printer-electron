import axios from '@/plugins/axios';
import { set, handleError, showSuccessAlert } from '@/utils';

const actions = {
  async fetch({ commit }, client) {
    commit('setFetching', true);

    // const authorizations = await dispatch('authorizations/fetch', client, { root: true });
    return new Promise((resolve, reject) => {
      axios.get(`labels?client=${client}`)
        .then(res => {
          const labels = res.data.map(label => ({
            ...label,
            description: `${label.sku} ${label.name}`
          }));
          // console.log(labels.filter(label => label.sku === 'test'));
          resolve(labels);
          commit('setLabels', labels);
        })
        .catch(err => {
          reject();
          handleError(err, commit);
          // get offline data
        })
        .finally(() => {
          commit('setFetching', false);
        });
    });
  },
  store({ commit }, data) {
    const formData = new FormData();
    const {
      name, sku, label, authorization, client, settings
    } = data;
    formData.append('name', name);
    formData.append('sku', sku);
    formData.append('label', label);
    formData.append('client', client);
    formData.append('settings', JSON.stringify(settings));
    formData.append('authorization', authorization);
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      axios.post('labels', formData, {
        onUploadProgress: progressEvent => {
          const progress = Math.round(progressEvent.loaded / progressEvent.total * 100);
          commit('setProgress', progress);
        }
      })
        .then(res => {
          commit('storeItem', res);
          resolve(res);
          showSuccessAlert('Etiqueta creada exitosamente', commit);
        })
        .catch(err => {
          reject(err);
          handleError(err, commit);
        })
        .finally(() => {
          commit('setProgress', 0);
          commit('setLoading', false);
        });
    });
  },
  update({ commit }, data) {
    const formData = new FormData();
    const {
      name, sku, label, authorization, settings
    } = data;
    formData.append('name', name);
    formData.append('sku', sku);
    formData.append('authorization', authorization);
    formData.append('settings', JSON.stringify(settings));
    if (label) formData.append('label', label);
    // if (auth) formData.append('authorization', auth);
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      axios.put(`labels/${data.id}`, formData, {
        onUploadProgress: progressEvent => {
          const progress = Math.round(progressEvent.loaded / progressEvent.total * 100);
          commit('setProgress', progress);
        }
      })
        .then(res => {
          commit('updateItem', res);
          showSuccessAlert('Etiqueta actualizada exitosamente', commit);
          resolve(res);
        })
        .catch(err => {
          reject(err);
          handleError(err, commit);
        })
        .finally(() => {
          commit('setProgress', 0);
          commit('setLoading', false);
        });
    });
  },
  delete({ commit }, items) {
    const ids = items.join(',');
    return new Promise((resolve, reject) => {
      axios.delete(`labels/deleteMany?ids=${ids}`)
        .then(res => {
          commit('deleteItems', items);
          resolve(res);
          showSuccessAlert('Etiqueta eliminada exitosamente', commit);
        })
        .catch(err => {
          reject(err);
          handleError(err, commit);
        });
    });
  }
};

const mutations = {
  setLabels: set('labels'),
  setFetching: set('fetching'),
  setLoading: set('loading'),
  setProgress: set('uploadProgress'),
  setClient: set('fromClient'),
  storeItem: (state, { data }) => {
    state.labels.push(data);
  },
  updateItem: (state, { data }) => {
    const index = state.labels.findIndex(label => label._id === data._id);
    if (index > -1) Object.assign(state.labels[index], data);
  },
  deleteItems: (state, ids) => {
    ids.forEach(id => {
      const index = state.labels.findIndex(label => label.id === id);
      if (index > -1) state.labels.splice(index, 1);
    });
  }
};

const getters = { fromClient: state => state.fromClient };

const state = {
  labels: [],
  fromClient: null,
  fetching: false,
  loading: false,
  uploadProgress: 0
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
