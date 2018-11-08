import Vue from "vue";

export default {
  /**
   * Get user data
   */
  'GET_USER': async ({commit, dispatch, getters}) => {
    await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/me`)
      .then(
        res => {
          commit('SET_USER_INFO', res.body.data);
        },
        err => {
          if (err.status === 401) {
            dispatch('auth/GET_TOKEN', getters.refreshTokenBody, { root: true });
            dispatch('GET_USER');
          }
          console.log('err login', err);
        }
      )
      .catch(err => console.log('GET_USER catch err: ', err));
  },
  /**
   * Get channels and groups
   */
  'GET_NAV': async ({dispatch}) => {
    await dispatch('groups/GET_USER_GROUPS', null, { root: true });
    await dispatch('channels/GET_USER_CHANNELS', null, { root: true });
  },
  /**
   * Change user data
   *
   * @param userData {Object} - new user data
   */
  'EDIT_PROFILE': ({getters, commit, dispatch}, userData) => {
    Vue.http.put(`${process.env.VUE_APP_API_URL}/user/${getters.info.user_id}`, {
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.passwordRepeat,
      username: userData.username,
    })
      .then(
        res => {
          commit('modal/SET_MODAL', 'editProfile', {root: true});
        },
        err => {
          if (err.status === 401) {
            dispatch('EDIT_PROFILE', userData);
            commit('modal/SET_MODAL', 'editProfile', {root: true});
          }
        }
      )
  },
  /**
   * Delete user
   */
  'DELETE_USER': ({getters, commit, dispatch}) => {
    Vue.http.delete(`${process.env.VUE_APP_API_URL}/user/${getters.info.user_id}`)
      .then(
        res => {
          commit('modal/SET_MODAL', 'editProfile', {root: true});
        },
        err => {
          if (err.status === 401) {
            dispatch('DELETE_USER');
            commit('modal/SET_MODAL', 'editProfile', {root: true});
          }
        }
      )
  },
  /**
   * Get specific user data and save it to store
   *
   * @param user_id {String || Number}
   */
  'GET_USER_DATA': ({commit},user_id) => {
    Vue.http.get(`${process.env.VUE_APP_API_URL}/user/${user_id}`)
      .then(
        res => {
          commit('SET_CURRENT_USER_DATA', res.body.data);
        },
        err => {
          console.log(err);
        }
      )
  }
};
