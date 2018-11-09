import Vue from 'vue';
import router from '../../../routers/router';

export default {
  /**
   * Get user channels
   */
  'GET_USER_CHANNELS': async ({commit, dispatch, rootGetters}) => {
    await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel`)
      .then(
        res => {
          commit('USER_CHANNELS', res.body.data);
        },
        async err => {
          console.log(err);
          if (err.status === 401) {
            await dispatch('auth/GET_TOKEN', rootGetters['user/refreshTokenBody'], {root: true});
            dispatch('GET_USER_CHANNELS');
          }
        }
      )
  },
  /**
   * Get current channel users
   *
   * @param channelId {String || Number} - channel id
   */
  'GET_USERS': ({getters, commit, rootGetters}, channelId) => {
    Vue.http.get(`${process.env.VUE_APP_API_URL}/channel/${channelId}/users`)
      .then(
        async res => {
          await commit('SET_CHANNEL_USERS', res.body.data);
        },
        err => {
          console.log(err)
        }
      )
      .catch(error => console.log(error))
  },
  /**
   * Create channel and reload channels
   */
  'CREATE_CHANNEL': ({getters, commit, dispatch, rootGetters}) => {

    Vue.http.post(`${process.env.VUE_APP_API_URL}/channel`, getters.channelData)
      .then(
        async res => {
          const createdChannelData = res.body.data;
            router.push({path: `/${createdChannelData.slug}`});
            commit('modal/DELETE_MODAL', 'channel', {root: true});
            dispatch('GET_USER_CHANNELS');
            dispatch('GET_USERS', createdChannelData.user_count);
        },
        async err => {
          console.log(err);
          if (err.status === 401) {
            await dispatch('auth/GET_TOKEN', rootGetters['user/refreshTokenBody'], {root: true});
            dispatch('CREATE_CHANNEL');
          }
        })
      .catch(error => console.log(error))
  },
  /**
   * Add avatar to the channel and write avatar_id to the store
   *
   * @param img - image form data
   */
  'CREATE_CHANNEL_AVATAR': async ({commit, dispatch, rootGetters}, img) => {
    await Vue.http.post(`${process.env.VUE_APP_API_URL}/channel/avatar`, img, {
      headers: {
        "Content-Type": "multipart/form-data;"
      }
    })
      .then(
        async res => {
          commit('SET_CHANNEL_AVATAR_ID', res.body.data.avatar_id);
        },
        async err => {
          console.log(err);
          if (err.status === 401) {
            await dispatch('auth/GET_TOKEN', rootGetters['user/refreshTokenBody'], {root: true});
            dispatch('CREATE_GROUP_AVATAR', img);
          }
        }
      )
      .catch(error => console.log(error))
  },
  /**
   * Set current channel data to the store and get this channel users
   *
   * @param channelId {String || Number} - current channel id
   */
  'SET_CURRENT_CHANNEL_DATA': async ({getters, commit, dispatch}, channelId) => {
    const editingChannel = await getters.channels.find(channel => channel.channel_id === channelId);
    await commit('SET_CURRENT_CHANNEL_DATA', editingChannel);
    dispatch('GET_USERS', channelId);
  },
  /**
   * Set edit mode
   *
   * @param channelId - editing channel id
   */
  'SET_CHANNEL_EDITING': async ({commit, dispatch}, channelId) => {
    dispatch('SET_EDITED_CHANNEL_DATA', channelId);
    dispatch('modal/OPEN_MODAL_EDIT_MODE', 'channel', {root: true});
  },
  /**
   * Set data of editing channel to the store
   *
   * @param channelId {String || Number} - chosen channel id
   */
  'SET_EDITED_CHANNEL_DATA': async ({getters, commit}, channelId) => {
    const editingChannel = await getters.channels.find(channel => channel.channel_id === channelId);
    await commit('SET_CHANNEL_DATA', editingChannel);
  },
  /**
   * Edit chosen channel
   */
  'EDIT_CHANNEL': ({getters, commit, dispatch, rootGetters}) => {
    Vue.http.put(`${process.env.VUE_APP_API_URL}/channel/${getters.channelData.channel_id}`, {
      title: getters.channelData.title,
      slug: getters.channelData.slug,
      status: getters.channelData.status,
      user_ids: getters.channelData.user_ids,
      type: getters.channelData.type,
      private: getters.channelData.private,
      avatar: getters.channelData.avatar,
    })
      .then(
        res => {
          dispatch('GET_USER_CHANNELS');
          commit('SET_CURRENT_CHANNEL_DATA', res.body.data);
          dispatch('modal/CLOSE_MODAL_EDIT_MODE', 'channel', {root: true})
        },
        async err => {
          console.log(err);
          if (err.status === 401) {
            await dispatch('auth/GET_TOKEN', rootGetters['user/refreshTokenBody'], {root: true});
            dispatch('EDIT_CHANNEL');
          }
        }
      )
      .catch(error => console.log(error))
  },
  /**
   * Set delete mode
   *
   * @param channelId - channel to edit
   */
  'SET_CHANNEL_DELETING': async ({commit, dispatch}, channelId) => {
    console.log(123);
    commit('SET_CHANNEL_ID_TO_DELETE', channelId);
    dispatch('modal/OPEN_MODAL_EDIT_MODE', 'deleteChannel', {root: true});
  },
  /**
   * Delete chosen channel
   */
  'DELETE_CHANNEL': ({getters, commit, dispatch}) => {
    Vue.http.delete(`${process.env.VUE_APP_API_URL}/channel/${getters.channelToDelete}`)
      .then(
        res => {
          dispatch('GET_USER_CHANNELS');
          commit('modal/DELETE_MODAL', 'deleteChannel', {root: true});
        },
        err => {
          console.log(err);
          console.log(err.body);
        }
      )
  },
  /**
   * Remove user from channel
   *
   * @param userId {String || Number} - user id  to remove
   */
  'DELETE_USER': ({getters, commit, dispatch}, userId) => {
    Vue.http.delete(`${process.env.VUE_APP_API_URL}/channel/delete-user`, {
      user_id: userId,
      channel_id: getters.currentChannelData.channel_id
    })
      .then(
        res => {
          dispatch('GET_USERS', getters.currentChannelData.channel_id);
        },
        err => console.log(err)
      )
  },
  /**
   * Add user to the channel
   *
   * @param userId {String || Number} - user id to add
   */
  'ADD_USER': ({getters, commit, dispatch}, userId) => {
    Vue.http.post(`${process.env.VUE_APP_API_URL}/channel/add-user`, {
      user_id: userId,
      channel_id: getters.currentChannelData.channel_id
    })
      .then(
        res => {
          dispatch('GET_USERS', getters.currentChannelData.channel_id);
        },
        err => console.log(err)
      )
  }
};
