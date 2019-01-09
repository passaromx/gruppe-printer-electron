import axios from '@/plugins/axios';

const set = property => (state, payload) => { state[property] = payload; };

const actions = {
  fetch({ commit }) {
    commit('setFetching', true);
    axios.get('clients')
      .then(res => {
        commit('setClients', res.data);
        if (res.data.length > 0) commit('setSelectedClient', res.data[0]);
      })
      .catch(err => {
        console.log(err);
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
          console.log(res);
        })
        .catch(err => {
          reject();
          console.log(err);
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
          console.log(res);
        })
        .catch(err => {
          reject();
          console.log(err);
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
  setClients: set('clients'),
  setFetching: set('fetching'),
  setLoading: set('loading'),
  setSelectedClient: set('selectedClient'),
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

const state = {
  clients: [],
  fetching: false,
  loading: false,
  selectedClient: { name: 'Selecciona un cliente' }
};

export default {
  namespaced: true,
  actions,
  mutations,
  state
};
