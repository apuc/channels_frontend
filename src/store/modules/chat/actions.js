import Vue from "vue";

export default {
  'GET_MESSAGES': async ({commit, dispatch, rootGetters}, payload) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/messages`)
        .then(
          res => {
            commit('SET_MESSAGES', res.body);
          },
          err => {
            console.log('err login', err);
          }
        )
        .catch(err => console.log('GET_MESSAGES catch err: ', err))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('GET_MESSAGES', payload);
          })
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
};
