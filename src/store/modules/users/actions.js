import axios from '@/plugins/axios';
import { handleError, showSuccessAlert } from '@/utils';

export default {
  storeUser({ commit }, data) {
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      axios.post('auth/local/register', data)
        .then(res => {
          resolve(res);
          commit('storeUser', res);
          showSuccessAlert('Usuario creado exitosamente', commit);
        })
        .catch(err => {
          reject();
          handleError(err, commit);
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
          showSuccessAlert('Usuario actualizado exitosamente', commit);
        })
        .catch(err => {
          reject();
          handleError(err, commit);
        })
        .finally(() => { commit('setLoading', false); });
    });
  },
  deleteUser({ commit }, items) {
    const id = items[0];
    return new Promise((resolve, reject) => {
      axios.delete(`users/${id}`)
        .then(res => {
          // console.log(res);
          commit('deleteUser', id);
          resolve(res);
          showSuccessAlert('Usuario eliminado exitosamente', commit);
        })
        .catch(err => {
          reject(err);
          handleError(err, commit);
        });
    });
  }
};
