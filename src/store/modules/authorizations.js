import axios from '@/plugins/axios';
import { set, handleError, showSuccessAlert } from '@/utils';

const actions = {
  fetch({ commit }, client) {
    commit('setFetching', true);
    return new Promise((resolve, reject) => {
      axios.get(`authorizations?client=${client}`)
      // axios.get('authorizations')
        .then(res => {
          resolve(res.data);
          commit('setAuthorizations', res.data);
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
    const { name, authPdf, client } = data;
    formData.append('name', name);
    formData.append('client', client);
    formData.append('authPdf', authPdf);
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      axios.post('authorizations', formData, {
        onUploadProgress: progressEvent => {
          const progress = Math.round(progressEvent.loaded / progressEvent.total * 100);
          commit('setProgress', progress);
        }
      })
        .then(res => {
          commit('storeItem', res);
          resolve(res);
          showSuccessAlert('Autorización subida exitosamente', commit);
        })
        .catch(err => {
          reject(err);
          handleError(err, commit);
        })
        .finally(() => {
          commit('setLoading', false);
        });
    });
  },
  update({ commit }, data) {
    const formData = new FormData();
    const { name, auth } = data;
    formData.append('name', name);
    if (auth) formData.append('authPdf', auth);
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      axios.put(`authorizations/${data.id}`, formData, {
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
          commit('setLoading', false);
        });
    });
  },
  delete({ commit }, items) {
    const ids = items.join(',');
    return new Promise((resolve, reject) => {
      axios.delete(`authorizations/deleteMany?ids=${ids}`)
        .then(res => {
          commit('deleteItems', items);
          console.log(res);
          resolve(res);
          showSuccessAlert('Operación exitosa', commit);
        })
        .catch(err => {
          reject(err);
          handleError(err, commit);
        });
    });
  }
};

const mutations = {
  setAuthorizations: set('authorizations'),
  setFetching: set('fetching'),
  setLoading: set('loading'),
  setClient: set('fromClient'),
  setProgress: set('uploadProgress'),
  storeItem: (state, { data }) => {
    state.authorizations.push(data);
  },
  updateItem: (state, { data }) => {
    const index = state.authorizations.findIndex(label => label._id === data._id);
    if (index > -1) Object.assign(state.authorizations[index], data);
  },
  deleteItems: (state, ids) => {
    ids.forEach(id => {
      const index = state.authorizations.findIndex(label => label.id === id);
      if (index > -1) state.authorizations.splice(index, 1);
    });
  }
};

const getters = { authorizations: state => state.authorizations };

const state = {
  authorizations: [],
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
