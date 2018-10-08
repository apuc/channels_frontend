import Vue from "vue";

export default {
  /**
   * Get user groups
   */
  'GET_USER_GROUPS': (context) => {
    Vue.http.get(`${process.env.VUE_APP_API_URL}/group`)
      .then(
        res => {
          console.log('GET_USER_GROUPS', res)
        },
        err => {
          console.log(err);
        }
      )
  },
  /**
   * Get user channels
   */
  'GET_USER_CHANNELS': (context) => {
    Vue.http.get(`${process.env.VUE_APP_API_URL}/channel`)
      .then(
        res => {
          console.log('GET_USER_CHANNELS', res)
        },
        err => {
          console.log(err);
        }
      )
  },
};
