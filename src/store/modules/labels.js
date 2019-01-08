import axios from '@/plugins/axios';

const set = property => (state, payload) => { state[property] = payload; };

const actions = {
  fetch({ commit }) {
    commit('setFetching', true);
    axios.get('labels')
      .then(res => {
        commit('setLabels', res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        commit('setFetching', false);
      });
  },
  store({ commit }, data) {
    const formData = new FormData();
    const { name, sku, label, auth } = data;
    formData.append('name', name);
    formData.append('sku', sku);
    formData.append('label', label);
    formData.append('authorization', auth);
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
          console.log(res);
        })
        .catch(err => {
          reject(err);
          console.log(err);
        })
        .finally(() => {
          commit('setProgress', 0);
          commit('setLoading', false);
        });
    });
  },
  update({ commit }, data) {
    console.log(data);
    const formData = new FormData();
    const { name, sku, label, auth } = data;
    formData.append('name', name);
    formData.append('sku', sku);
    if (label) formData.append('label', label);
    if (auth) formData.append('authorization', auth);
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
          console.log(res);
          resolve(res);
        })
        .catch(err => {
          reject(err);
          console.log(err);
        })
        .finally(() => {
          commit('setProgress', 0);
          commit('setLoading', false);
        });
    });
  },
  delete({ commit }, items) {
    console.log(items);
    const ids = items.join(',');
    return new Promise((resolve, reject) => {
      axios.delete(`labels/deleteMany?ids=${ids}`)
        .then(res => {
          commit('deleteItems', items);
          resolve(res);
          console.log(res);
        })
        .catch(err => {
          reject(err);
          console.log(err);
        });
    });
  }
};

const mutations = {
  setLabels: set('labels'),
  setFetching: set('fetching'),
  setLoading: set('loading'),
  setProgress: set('uploadProgress'),
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

const state = {
  labels: [],
  fetching: false,
  loading: false,
  uploadProgress: 0
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
