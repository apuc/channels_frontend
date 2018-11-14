import Vue from "vue";
import router from "../../../routers/router";

export default {
  /**
   * Логинит с помощью токена
   *
   */
  'GET_USER': async ({commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    console.log(currentDateInSeconds - tokenExpiresIn);
    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/me`)
        .then(
          async res => await commit('USER_INFO', res.body.data),
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
  'GET_NAV': async ({dispatch}) => {
    await dispatch('groups/GET_USER_GROUPS', null, {root: true});
    await dispatch('channels/GET_USER_CHANNELS', null, {root: true});
  },
  'EDIT_PROFILE': async ({getters, commit, dispatch, rootGetters}, userData) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.put(`${process.env.VUE_APP_API_URL}/user/${getters.info.user_id}`, {
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.passwordRepeat,
        username: userData.username,
      })
        .then(
          res => {
            commit('modal/SET_MODAL', 'editProfile', {root: true});
          },
          err => console.log(err)
        )
        .catch(error => console.log('EDIT_PROFILE: ',error))
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
  }
};
