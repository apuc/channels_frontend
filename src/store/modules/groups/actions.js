import Vue from 'vue';

export default {
  /**
   * Get user groups
   */
  'GET_USER_GROUPS': async (context) => {
    await Vue.http.get(`${process.env.VUE_APP_API_URL}/group`)
      .then(
        res => {
          context.commit('USER_GROUPS', res.body.data);
        },
        err => {
          console.log(err);
        }
      )
  },
};
