import axios from '@/plugins/axios';

const set = property => (state, payload) => { state[property] = payload; };

const state = {
  labels: [],
  fetching: false,
  loading: false
};

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
    axios.post('labels', formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => { commit('setLoading', false); });
  }
};

const mutations = {
  setLabels: set('labels'),
  setFetching: set('fetching'),
  setLoading: set('loading')
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
