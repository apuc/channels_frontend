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

  'CREATE_CHANNEL': ({dispatch, commit, getters}) => {
    Vue.http.post(`${process.env.VUE_APP_API_URL}/channel`, getters.newChannelData)
      .then(
        res => {
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
  'CREATE_CHANNEL_AVATAR': async ({dispatch, commit}, img) => {
    await Vue.http.post(`${process.env.VUE_APP_API_URL}/channel/avatar`, img, {
      headers: {
        "Content-Type": "multipart/form-data;"
      }
    })
      .then(
        async res => {
          await commit('SET_CHANNEL_AVATAR_ID', res.data.data.avatar_id)
        },
        err => {
          console.log(err)
        }
      )
      .catch(error => console.log(error))
  },
  'EDIT_CHANNEL': ({context, dispatch, commit, getters}) => {
    Vue.http.put(`${process.env.VUE_APP_API_URL}/channel/120`, {
      title: 'Mew',
      slug: 'mew',
      status: 'active',
      user_ids: [1, 21],
      avatar: 5,
      type: 'chat',
      private: '0',
    })
      .then(
        res => {
          console.log(res);
        },
        err => {
          console.log(err)
        })
      .catch(error => console.log(error))
  },
};
