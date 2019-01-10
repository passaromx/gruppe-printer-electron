import axios from '@/plugins/axios';
import { set, handleError, showSuccessAlert } from '@/utils';
import factoryActions from './factories/actions';
import factoryMutations from './factories/mutations';
import userActions from './users/actions';
import userMutations from './users/mutations';

const actions = {
  ...factoryActions,
  ...userActions,
  fetch({ commit }) {
    commit('setFetching', true);
    axios.get('clients')
      .then(res => {
        commit('setClients', res.data);
        if (res.data.length > 0) commit('setSelectedClient', res.data[0]);
      })
      .catch(err => {
        handleError(err, commit);
      })
      .finally(() => { commit('setFetching', false); });
  },
  store({ commit }, data) {
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      axios.post('clients', data)
        .then(res => {
          resolve(res);
          commit('storeItem', res);
          showSuccessAlert('Cliente creado exitosamente', commit);
        })
        .catch(err => {
          reject();
          handleError(err, commit);
        })
        .finally(() => { commit('setLoading', false); });
    });
  },
  update({ commit }, data) {
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      axios.put(`clients/${data._id}`, data)
        .then(res => {
          resolve(res);
          commit('updateItem', res);
          showSuccessAlert('Cliente actualizado exitosamente', commit);
        })
        .catch(err => {
          reject();
          handleError(err, commit);
        })
        .finally(() => { commit('setLoading', false); });
    });
  },
  delete({ commit }, items) {
    const id = items[0];
    return new Promise((resolve, reject) => {
      axios.delete(`clients/${id}`)
        .then(res => {
          commit('deleteItem', id);
          resolve(res);
          showSuccessAlert('Cliente eliminado exitosamente', commit);
        })
        .catch(err => {
          reject(err);
          handleError(err, commit);
        });
    });
  }
};

const mutations = {
  setClients: set('clients'),
  setFetching: set('fetching'),
  setLoading: set('loading'),
  setSelectedClient: set('selectedClient'),
  ...factoryMutations,
  ...userMutations,
  storeItem: (state, { data }) => {
    state.clients.push(data);
  },
  updateItem: (state, { data }) => {
    const index = state.clients.findIndex(client => client._id === data._id);
    if (index > -1) Object.assign(state.clients[index], data);
  },
  deleteItem: (state, id) => {
    const index = state.clients.findIndex(client => client._id === id);
    if (index > -1) state.clients.splice(index, 1);
  }
};

const getters = {
  factories: state => state.selectedClient.factories,
  users: state => state.selectedClient.users
};

const state = {
  clients: [],
  fetching: false,
  loading: false,
  selectedClient: {
    name: null,
    factories: [],
    users: []
  }
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
};
