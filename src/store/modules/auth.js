import axios, { authAxios } from '@/plugins/axios';
import { apiURL, roles } from '@/api/constants';
import { set, handleError } from '@/utils';
import router from '@/router';

const getters = {
  isLoggedIn: store => store.session && store.session.jwt,
  isAdmin: store => {
    if (store.user && store.user.role) {
      return store.user.role._id === roles.admin;
    }
    return false;
  }
};

const actions = {
  fetchSession({ commit }) {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    return new Promise((resolve, reject) => {
      axios.get('users/me')
        .then(res => {
          resolve(res);
          const user = res.data;
          commit('setUser', user);
          commit('setSession', { jwt: token });
          // console.log(res.data);
        })
        .catch(err => {
          reject(err);
          if (localStorage) localStorage.removeItem('token');
          router.push({ name: 'Login' });
          // console.log(err.response);
        });
    });
  },
  signInUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      delete authAxios.defaults.headers.common.Authorization;
      authAxios.post(`${apiURL}auth/local`, data)
        .then(res => {
          resolve(res);
          const { user, jwt } = res.data;
          axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
          commit('setUser', user);
          commit('setSession', { jwt });

          if (localStorage) {
            localStorage.setItem('token', jwt);
            localStorage.setItem('USER', JSON.stringify(res.data.user));
          }
        })
        .catch(err => {
          reject();
          handleError(err, commit);
        });
    });
  },
  signOut({ commit }) {
    return new Promise((resolve, reject) => {
      if (!getters.isLoggedIn) {
        reject(new Error('User not logged in.'));
      }
      commit('setUser', null);
      commit('setSession', null);
      resolve();
      if (localStorage) localStorage.removeItem('token');
    });
  }

};

const mutations = {
  setUser: set('user'),
  setSession: set('session')
};

const state = {
  user: null,
  session: null // { token, expiresAt }
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
};
