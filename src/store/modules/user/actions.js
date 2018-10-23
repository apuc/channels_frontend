import Vue from "vue";

export default {
  /**
   * Логинит с помощью токена
   * @param commit {Object}
   * @constructor
   */
  'GET_USER': async ({commit, dispatch, getters}) => {
    await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/me`)
      .then(
        res => {
          commit('USER_INFO', res.body);
          return res.body
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
  'GET_NAV': async (context, dispatch) => {
    await context.dispatch('groups/GET_USER_GROUPS', null, { root: true });
    await context.dispatch('channels/GET_USER_CHANNELS', null, { root: true });
  },
};
