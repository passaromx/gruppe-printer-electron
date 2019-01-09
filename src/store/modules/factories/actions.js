import axios from '@/plugins/axios';

export default {
  storeFactory({ commit }, data) {
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      axios.post('factories', data)
        .then(res => {
          resolve(res);
          commit('storeFactory', res);
          console.log(res);
        })
        .catch(err => {
          reject();
          console.log(err);
        })
        .finally(() => { commit('setLoading', false); });
    });
  },
  updateFactory({ commit }, data) {
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      axios.put(`factories/${data._id}`, data)
        .then(res => {
          resolve(res);
          commit('updateFactory', res);
          console.log(res);
        })
        .catch(err => {
          reject();
          console.log(err);
        })
        .finally(() => { commit('setLoading', false); });
    });
  },
  deleteFactory({ commit }, items) {
    const id = items[0];
    return new Promise((resolve, reject) => {
      axios.delete(`factories/${id}`)
        .then(res => {
          commit('deleteFactory', id);
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
