import Vue from 'vue';
import router from '../../../routers/router';

export default {
  /**
   * Get user channels
   */
  'GET_USER_CHANNELS': async ({ dispatch, commit, rootGetters }) => {
    await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel`)
      .then(
        res => {
          commit('USER_CHANNELS', res.body.data);

        },
        async err => {
          console.log(err);
          if (err.status === 401) {
            await dispatch('auth/GET_TOKEN', rootGetters['user/refreshTokenBody'], { root: true });
            dispatch('GET_USER_CHANNELS');
          }
        }
      )
  },
  'GET_USERS': ({ commit, getters, rootGetters }, channelId) => {
    Vue.http.get(`${process.env.VUE_APP_API_URL}/channel/${channelId}/users`)
      .then(
        res => console.log(res),
        err => console.log(err)
      )
  },
  'CREATE_CHANNEL': ({dispatch, commit, getters, rootGetters}) => {
    Vue.http.post(`${process.env.VUE_APP_API_URL}/channel`, getters.channelInfo)
      .then(
        res => {
          router.go(-1);
          commit('ADD_CHANNEL', res);
          commit('modal/deleteModal', 'channel', {root: true});
          dispatch('GET_USER_CHANNELS');
        },
        async err => {
          console.log(err);
          if (err.status === 401) {
            await dispatch('auth/GET_TOKEN', rootGetters['user/refreshTokenBody'], { root: true });
            dispatch('CREATE_CHANNEL');
          }
        })
      .catch(error => console.log(error))
  },
  'CREATE_CHANNEL_AVATAR': async ({dispatch, commit, rootGetters}, img) => {
    await Vue.http.post(`${process.env.VUE_APP_API_URL}/channel/avatar`, img, {
      headers: {
        "Content-Type": "multipart/form-data;"
      }
    })
      .then(
        async res => {
          await commit('SET_CHANNEL_AVATAR_ID', res.data.data.avatar_id)
        },
        async err => {
          console.log(err);
          if (err.status === 401) {
            await dispatch('auth/GET_TOKEN', rootGetters['user/refreshTokenBody'], { root: true });
            dispatch('CREATE_GROUP_AVATAR', img);
          }
        }
      )
      .catch(error => console.log(error))
  },
  'SET_CHANNEL_EDITING': async ({commit, dispatch, getters, rootGetters}, channelId) => {
    await dispatch('GET_CHANNEL_DATA', channelId);
    commit('SET_CHANNEL_ID', channelId);
    commit('modal/toggleEditMode', null, { root: true });
    commit('modal/setModal', 'channel', { root: true });
    commit('modal/currentModal', 'channel', { root: true });
  },
  'GET_CHANNEL_DATA': async ({commit, getters, rootGetters}, channelId) => {
    const editingChannel = await getters.channels.find(channel => channel.channel_id === channelId);
    await commit('SET_CHANNEL_DATA', editingChannel);
  },
  'EDIT_CHANNEL': ({context, dispatch, commit, getters, rootGetters}, channelData) => {
    Vue.http.put(`${process.env.VUE_APP_API_URL}/channel/${getters.channelId}`, {
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
          dispatch('GET_USER_CHANNELS');
          commit('SET_CHANNEL_DATA', {});
          commit('modal/deleteModal', 'channel', {root: true});
        },
        async err => {
          console.log(err);
          if (err.status === 401) {
            await dispatch('auth/GET_TOKEN', rootGetters['user/refreshTokenBody'], { root: true });
            dispatch('EDIT_CHANNEL');
          }
        }
      )
      .catch(error => console.log(error))
  },
  'DELETE_CHANNEL': (channelId) => {
    Vue.http.delete(`${process.env.VUE_APP_API_URL}`, channelId)
      .then(
        res => {
          console.log(res);
          commit('modal/deleteModal', 'channel', {root: true});
        },
        err => {
          console.log(err)
        }
      )
  }
};
