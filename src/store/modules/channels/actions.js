import Vue from 'vue';

export default {
  /**
   * Get user channels
   */
  'GET_USER_CHANNELS': async (context) => {
    await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel`)
      .then(
        res => {
          context.commit('USER_CHANNELS', res.body.data);
        },
        err => {
          console.log(err);
        }
      )
  },
};
