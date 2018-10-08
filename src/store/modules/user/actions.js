import Vue from "vue";

export default {
  /**
   * Get user groups
   */
  'GET_USER_GROUPS': ({commit}) => {
    commit('LOADING');
    Vue.http.get(`${process.env.VUE_APP_API_URL}/group`)
      .then(
        res => {
          commit('USER_GROUPS', JSON.parse(res.bodyText).data);
        },
        err => {
          console.log(err);
          commit('ERROR', err.body);
        }
      )
  },
  /**
   * Get user channels
   */
  'GET_USER_CHANNELS': ({commit}) => {
    commit('LOADING');
    Vue.http.get(`${process.env.VUE_APP_API_URL}/channel`)
      .then(
        res => {
          commit('USER_CHANNELS', JSON.parse(res.bodyText).data);
        },
        err => {
          console.log(err);
          commit('ERROR', err.body)
        }
      )
  },
};
