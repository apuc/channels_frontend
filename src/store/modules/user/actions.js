import Vue from "vue";
import router from "../../../routers/router";

export default {
  /**
   * Логинит с помощью токена
   *
   */
  'GET_USER': async ({commit, dispatch, getters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    console.log(currentDateInSeconds - tokenExpiresIn);
    // console.log(currentDateInSeconds - refreshTokenExpiresIn);

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/me`)
        .then(
          async res => {
            console.log('user info', res);
            await commit('USER_INFO', res.body.data);
          },
          err => {
            console.log('err login', err);
          }
        )
        .catch(err => console.log('GET_USER catch err: ', err));
    } else {
      // console.log('currentDateInSeconds', currentDateInSeconds);
      // console.log('refreshTokenExpiresIn', refreshTokenExpiresIn);
      // console.log('tokenExpiresIn',tokenExpiresIn);

      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', getters.refreshTokenBody, {root: true})
      }
    }
  },
  'GET_NAV': async ({dispatch}) => {
    await dispatch('groups/GET_USER_GROUPS', null, {root: true});
    await dispatch('channels/GET_USER_CHANNELS', null, {root: true});
  },
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
          // if (err.status === 401) {
          //   dispatch('EDIT_PROFILE', userData);
          //   commit('modal/SET_MODAL', 'editProfile', {root: true});
          // }
        }
      )
  },
  'DELETE_USER': ({getters, commit, dispatch}) => {
    Vue.http.delete(`${process.env.VUE_APP_API_URL}/user/${getters.info.user_id}`)
      .then(
        res => {
          commit('modal/SET_MODAL', 'editProfile', {root: true});
        },
        err => {
          // if (err.status === 401) {
          //   dispatch('DELETE_USER');
          //   commit('modal/SET_MODAL', 'editProfile', {root: true});
          // }
        }
      )
  }
};
