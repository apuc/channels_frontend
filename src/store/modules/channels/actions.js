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
  'SET_CHANNEL_EDITING': async ({commit, dispatch, getters}, channelId) => {
    await dispatch('GET_EDITING_CHANNEL', channelId);
    commit('modal/toggleEditMode', null, { root: true });
    commit('modal/setModal', 'channel', { root: true });
  },
  'GET_EDITING_CHANNEL': ({commit, getters}, id) => {
    const editingChannel = getters.channels.find(channel => channel.channel_id === id);
    commit('EDITING_CHANNEL', editingChannel);
  },
  'EDIT_CHANNEL': ({context, dispatch, commit, getters}, channel) => {
    Vue.http.put(`${process.env.VUE_APP_API_URL}/channel/${channel.channel_id}`, {
      title: channel.title,
      slug: channel.slug,
      status: channel.status,
      user_ids: channel.user_ids,
      avatar: channel.avatar,
      type: channel.type,
      private: channel.private,
    })
      .then(
        res => {
          console.log(res);
          commit('EDITING_CHANNEL', {});
        },
        err => {
          console.log(err)
        })
      .catch(error => console.log(error))
  },
};
