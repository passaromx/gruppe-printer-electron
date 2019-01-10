import axios from '@/plugins/axios';
import { handleError, showSuccessAlert } from '@/utils';

export default {
  storeFactory({ commit }, data) {
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      axios.post('factories', data)
        .then(res => {
          resolve(res);
          commit('storeFactory', res);
          showSuccessAlert('Planta creada exitosamente', commit);
        })
        .catch(err => {
          reject();
          handleError(err, commit);
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
          showSuccessAlert('Planta actualizada exitosamente', commit);
        })
        .catch(err => {
          reject();
          handleError(err, commit);
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
          showSuccessAlert('Planta eliminada exitosamente', commit);
        })
        .catch(err => {
          reject(err);
          handleError(err, commit);
        });
    });
  }
};
