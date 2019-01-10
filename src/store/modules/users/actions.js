import axios from '@/plugins/axios';

export default {
  storeUser({ commit }, data) {
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      axios.post('auth/local/register', data)
        .then(res => {
          resolve(res);
          commit('storeUser', res);
          console.log(res);
        })
        .catch(err => {
          reject();
          console.log(err);
        })
        .finally(() => { commit('setLoading', false); });
    });
  },
  updateUser({ commit }, data) {
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      axios.put(`users/${data._id}`, data)
        .then(res => {
          resolve(res);
          commit('updateUser', res);
          console.log(res);
        })
        .catch(err => {
          reject();
          console.log(err);
        })
        .finally(() => { commit('setLoading', false); });
    });
  },
  deleteUser({ commit }, items) {
    const id = items[0];
    return new Promise((resolve, reject) => {
      axios.delete(`users/${id}`)
        .then(res => {
          commit('deleteUser', id);
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
