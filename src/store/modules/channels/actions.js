import Vue from 'vue';
import router from '../../../routers/router';

export default {
  /**
   * Get user channels
   */
  'GET_USER_CHANNELS': async ({ commit }) => {
    await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel`)
      .then(
        res => {
          commit('USER_CHANNELS', res.body.data);
        },
        err => {
          console.log(err);
        }
      )
  },
  'GET_USERS': ({ commit, getters }) => {
    const channelId = getter
    Vue.http.get(`${process.env.VUE_APP_API_URL}/channel/${channelId}/users`)
      .then(
        res => console.log(res),
        err => console.log(err)
      )
  },
  'CREATE_CHANNEL': ({dispatch, commit, getters}) => {
    Vue.http.post(`${process.env.VUE_APP_API_URL}/channel`, getters.channelInfo)
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
  'GET_EDITING_CHANNEL': async ({commit, getters}, channelId) => {
    const editingChannel = await getters.channels.find(channel => channel.channel_id === channelId);
    await commit('SET_CHANNEL_DATA', editingChannel);
  },
  'EDIT_CHANNEL': ({context, dispatch, commit, getters}, channelData) => {
    Vue.http.put(`${process.env.VUE_APP_API_URL}/channel/${channelData.channel_id}`, {
      title: channelData.title,
      slug: channelData.slug,
      status: channelData.status,
      user_ids: channelData.user_ids,
      avatar: channelData.avatar,
      type: channelData.type,
      private: channelData.private,
    })
      .then(
        res => {
          console.log(res);
          commit('SET_CHANNEL_DATA', {});
        },
        err => console.log(err)
      )
      .catch(error => console.log(error))
  },
};
