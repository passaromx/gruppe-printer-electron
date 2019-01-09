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
  updateFactory() {},
  deleteFactory() {}
};
