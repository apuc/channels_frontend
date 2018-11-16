import Vue from "vue";

export default {
  /**
   * Get user data
   */
  'GET_USER': async ({commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      commit('SET_USER_DATA_LOADING_FLAG');
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/me`)
        .then(
          async res => {
            commit('SET_USER_DATA_LOADING_FLAG');
            await commit('SET_USER_INFO', res.body.data);
          },
          err => console.log('err login', err)
        )
        .catch(error => console.log('GET_USER: ', error));
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('GET_USER');
          })
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
  /**
   * Get channels and groups
   */
  'GET_NAV': async ({dispatch}) => {
    await dispatch('groups/GET_USER_GROUPS', null, {root: true});
    await dispatch('channels/GET_USER_CHANNELS', null, {root: true});
  },
  /**
   * Change user data
   */
  'EDIT_PROFILE': async ({getters, commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.put(`${process.env.VUE_APP_API_URL}/user/${getters.info.user_id}`, {
        email: getters.info.email,
        password: getters.info.password,
        password_confirmation: getters.info.passwordRepeat,
        username: getters.info.username,
        avatar: getters.info.avatar,
      })
        .then(
          res => {
            commit('modal/DELETE_MODAL', null, {root: true});
          },
          err => console.log(err)
        )
        .catch(error => console.log('EDIT_PROFILE: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('EDIT_PROFILE');
          })
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
  /**
   * Delete user
   */
  'DELETE_USER': async ({getters, commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.delete(`${process.env.VUE_APP_API_URL}/user/${getters.info.user_id}`)
        .then(
          res => {
            commit('modal/SET_MODAL', 'editProfile', {root: true});
          },
          err => console.log(err)
        )
        .catch(error => console.log('DELETE_USER: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('DELETE_USER');
          })
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
  /**
   * Get specific user data and save it to store
   *
   * @param user_id {String || Number}
   */
  'GET_USER_DATA': async ({commit, dispatch, rootGetters}, user_id) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/${user_id}`)
        .then(
          res => {
            commit('SET_CURRENT_USER_DATA', res.body.data);
          },
          err => {
            console.log(err);
          }
        )
        .catch(error => console.log('GET_USER_DATA: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('GET_USER_DATA');
          })
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
  /**
   * Add avatar to the user profile and write avatar_id to the store
   *
   * @param img - image form data
   */
  'CREATE_USER_AVATAR': async ({commit, dispatch, rootGetters}, img) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.post(`${process.env.VUE_APP_API_URL}/user/avatar`, img, {
        headers: {
          "Content-Type": "multipart/form-data;"
        }
      })
        .then(
          async res => {
            commit('SET_USER_AVATAR_ID', res.body.data.avatar_id);
          },
          err => console.log(err)
        )
        .catch(error => console.log('CREATE_GROUP_AVATAR: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('CREATE_USER_AVATAR', img);
          })
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
};
