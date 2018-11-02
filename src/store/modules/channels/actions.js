import Vue from 'vue';
import router from '../../../routers/router';

export default {
  /**
   * Get user channels
   *
   * @param dispatch
   * @param commit
   * @param rootGetters
   * @returns {Promise<void>}
   * @constructor
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
   * @param getters
   * @param commit
   * @param rootGetters
   * @param channelId {String || Number} - channel id
   * @constructor
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
   *
   * @param dispatch
   * @param commit
   * @param getters
   * @param rootGetters
   * @constructor
   */
  'CREATE_CHANNEL': ({getters, commit, dispatch, rootGetters}) => {
    Vue.http.post(`${process.env.VUE_APP_API_URL}/channel`, getters.channelData)
      .then(
        res => {
          router.go(-1);
          commit('modal/deleteModal', 'channel', {root: true});
          dispatch('GET_USER_CHANNELS');
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
   * @param dispatch
   * @param commit
   * @param rootGetters
   * @param img - image form data
   * @returns {Promise<void>}
   * @constructor
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
   * @param getters
   * @param commit
   * @param dispatch
   * @param channelId {String || Number} - current channel id
   * @returns {Promise<void>}
   * @constructor
   */
  'SET_CURRENT_CHANNEL_DATA': async ({getters, commit, dispatch}, channelId) => {
    const editingChannel = await getters.channels.find(channel => channel.channel_id === channelId);
    await commit('SET_CURRENT_CHANNEL_DATA', editingChannel);
    dispatch('GET_USERS', channelId);
  },
  /**
   * Set edit mode
   *
   * @param commit
   * @param dispatch
   * @param channelId - editing channel id
   * @returns {Promise<void>}
   * @constructor
   */
  'SET_CHANNEL_EDITING': async ({commit, dispatch}, channelId) => {
    dispatch('SET_EDITED_CHANNEL_DATA', channelId);
    commit('modal/toggleEditMode', null, {root: true});
    commit('modal/setModal', 'channel', {root: true});
    commit('modal/currentModal', 'channel', {root: true});
  },
  /**
   * Set data of editing channel to the store
   *
   * @param getters
   * @param commit
   * @param channelId {String || Number} - chosen channel id
   * @returns {Promise<void>}
   * @constructor
   */
  'SET_EDITED_CHANNEL_DATA': async ({getters, commit}, channelId) => {
    const editingChannel = await getters.channels.find(channel => channel.channel_id === channelId);
    await commit('SET_CHANNEL_DATA', editingChannel);
  },
  /**
   * Edit chosen channel
   *
   * @param getters
   * @param commit
   * @param dispatch
   * @param rootGetters
   * @constructor
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
          commit('modal/deleteModal', 'channel', {root: true});
          commit('modal/toggleEditMode', null, {root: true});
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
   * @param commit
   * @param dispatch
   * @param channelId - channel to edit
   * @returns {Promise<void>}
   * @constructor
   */
  'SET_CHANNEL_DELETING': async ({commit, dispatch}, channelId) => {
    commit('SET_CHANNEL_ID_TO_DELETE', channelId);
    commit('modal/toggleEditMode', null, {root: true});
    await commit('modal/currentModal', 'deleteChannel', {root: true});
    commit('modal/setModal', 'deleteChannel', {root: true});
  },
  /**
   * Delete chosen channel
   *
   * @param getters
   * @param commit
   * @param dispatch
   * @constructor
   */
  'DELETE_CHANNEL': ({getters, commit, dispatch}) => {
    Vue.http.delete(`${process.env.VUE_APP_API_URL}/channel/${getters.channelToDelete}`)
      .then(
        res => {
          console.log(res);
          dispatch('GET_USER_CHANNELS');
          commit('modal/deleteModal', 'deleteChannel', {root: true});
          commit('modal/toggleEditMode', null, {root: true});
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
   * @param getters
   * @param commit
   * @param dispatch
   * @param userId {String || Number} - user id  to remove
   * @constructor
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
   * @param getters
   * @param commit
   * @param dispatch
   * @param userId {String || Number} - user id to add
   * @constructor
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
