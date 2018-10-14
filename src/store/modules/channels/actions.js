import Vue from 'vue';
import router from '../../../routers/router';

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

  'CREATE_CHANNEL': ({context, dispatch, commit, getters}) => {
    Vue.http.post(`${process.env.VUE_APP_API_URL}/channel`, getters.newChannelData)
      .then(
        res => {
          console.log(res);
          router.go(-1);
          commit('ADD_CHANNEL', res);
          commit('modal/deleteModal', null, {root: true});
          dispatch('GET_USER_CHANNELS');
        },
        err => {
          console.log(err)
        })
      .catch(error => console.log(error))
  },
  'CREATE_CHANNEL_AVATAR': async ({context, dispatch, commit}, img) => {
    console.log(img);
    await Vue.http.post(`${process.env.VUE_APP_API_URL}/channel/avatar`, img, {
      headers: {
        "Content-Type": "multipart/form-data;"
      }
    })
      .then(
        async res => {
          console.log(res.data.data.avatar_id);
          await commit('SET_CHANNEL_AVATAR_ID', res.data.data.avatar_id)
        },
        err => {
          console.log(err)
        }
      )
      .catch(error => console.log(error))
  }
};
