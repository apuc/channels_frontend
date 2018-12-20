import Vue from 'vue';
import router from '../../../routers/router';
import {joinChannels} from '../../../services/socket/channels.service'

export default {
  /**
   * Get logined user channels
   */
  'GET_USER_CHANNELS': async ({getters, commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));
    commit('SET_CHANNELS_LOADING_FLAG');

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel`)
        .then(
          res => {
            const channels = res.body.data;
            commit('USER_CHANNELS', channels);
            commit('SET_CHANNELS_LOADING_FLAG');
            // joinChannels(channels);
          },
          err => console.log('get channels', err)
        )
        .catch(error => console.log('GET_CHANNELS: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('GET_USER_CHANNELS');
          })
      }
    }
  },
  /**
   * Get concrete channel data
   *
   * @param channelId {String || Number} - search id or slug
   */
  'GET_CHANNEL_DATA': async ({commit, dispatch, rootGetters}, channelId) => {
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel/${channelId}`)
        .then(
          async res => {
            const channel = res.body.data;
            await commit('SET_CURRENT_CHANNEL_DATA', channel);
          },
          err => {
            if (err.body.includes('No query results for model')) {
              router.push({path: '/not-found'})
            }
            console.log('get channels', err)
          }
        )
        .catch(error => console.log('GET_CHANNELS: ', error))
  },
  /**
   * Get current channel users
   *
   * @param channelId {String || Number} - channel id
   */
  'GET_USERS': async ({getters, commit, dispatch, rootGetters}, channelId) => {
      commit('SET_CHANNEL_USERS_LOADING');
      commit('SET_CURRENT_CHANNEL_USERS', []);
      return await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel/${channelId}/users`)
        .then(
          async res => {
            commit('SET_CHANNEL_USERS_LOADED');
            return res.body.data
          },
          err => console.log(err)
        )
        .catch(error => console.log(error));
  },
  /**
   * Create channel and reload channels
   */
  'CREATE_CHANNEL': async ({getters, commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.post(`${process.env.VUE_APP_API_URL}/channel`, getters.channelData)
        .then(
          res => {
            const createdChannelData = res.body.data;
            router.push({path: `/${createdChannelData.slug}`});
            commit('modal/DELETE_MODAL', 'channel', {root: true});
            commit('ADD_CREATED_CHANNEL', createdChannelData);
            dispatch('SET_CURRENT_CHANNEL_DATA', createdChannelData.channel_id);
          },
          err => console.log(err)
        )
        .catch(error => console.log(error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('CREATE_CHANNEL');
          })
      }
    }
  },
  /**
   * Add avatar to the channel and write avatar_id to the store
   *
   * @param img - image form data
   */
  'CREATE_CHANNEL_AVATAR': async ({commit, dispatch, rootGetters}, img) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.post(`${process.env.VUE_APP_API_URL}/channel/avatar`, img, {
        headers: {
          "Content-Type": "multipart/form-data;"
        },
        progress(e) {
          if (e.lengthComputable) {
            commit('SET_AVATAR_UPLOAD_PROGRESS', e.loaded / e.total * 100);
          }
        }
      })
        .then(
          async res => {
            commit('SET_CHANNEL_AVATAR_ID', res.body.data.avatar_id);
            commit('SET_AVATAR_UPLOAD_PROGRESS', 0);
          },
          err => console.log(err)
        )
        .catch(error => console.log(error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('CREATE_CHANNEL_AVATAR', img);
          })
      }
    }
  },
  /**
   * Set current channel data to the store and get this channel users
   *
   * @param channelId {String || Number} - current channel id
   */
  'SET_CURRENT_CHANNEL_DATA': async ({getters, commit, dispatch}, channelId) => {
    const editingChannel = await getters.channels.find(channel => channel.channel_id === channelId);
      await commit('SET_CURRENT_CHANNEL_DATA', editingChannel);
      dispatch('GET_USERS', channelId).then(data => commit('SET_CURRENT_CHANNEL_USERS', data));
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
  'EDIT_CHANNEL': async ({getters, commit, dispatch, rootGetters}, data) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.put(`${process.env.VUE_APP_API_URL}/channel/${getters.channelData.channel_id}`, {
        title: data.title,
        slug: data.slug,
        status: data.status,
        user_ids: data.user_ids,
        type: data.type,
        private: data.private,
        avatar: data.avatar,
        owner_id: data.owner_id,
      })
        .then(
          res => {
            const newChannelData = res.body.data;
            commit('SET_CURRENT_CHANNEL_DATA', newChannelData);
            commit('SET_EDITED_CHANNEL_DATA', newChannelData);
            dispatch('modal/CLOSE_MODAL_EDIT_MODE', 'channel', {root: true})
          },
          err => console.log(err)
        )
        .catch(error => console.log(error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('EDIT_CHANNEL');
          })
      }
    }
  },
  /**
   * Delete chosen channel
   */
  'DELETE_CHANNEL': async ({getters, commit, dispatch}) => {
    const id = getters.channelToDelete;
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.delete(`${process.env.VUE_APP_API_URL}/channel/${id}`)
        .then(
          res => {
            commit('REMOVE_DELETED_CHANNEL_FROM_STORE', id);
            commit('modal/DELETE_MODAL', null, {root: true});

            if (id === getters.currentChannelData.channel_id) {
              router.push('/');
            }
          },
          err => console.log(err)
        )
        .catch(error => console.log('DELETE_CHANNEL: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('DELETE_CHANNEL');
          })
      }
    }
  },
  /**
   * Remove user from channel
   *
   * @param userId {String || Number} - user id  to remove
   */
  'DELETE_USER': async ({getters, commit, dispatch, rootGetters}, userId) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.delete(`${process.env.VUE_APP_API_URL}/channel/delete-user?channel_id=${getters.currentChannelData.channel_id}&user_id=${userId}`)
        .then(
          res => {
            dispatch('GET_USERS', getters.currentChannelData.channel_id);
          },
          err => console.log(err)
        )
        .catch(error => console.log('DELETE_USER_FROM_CHANNEL: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('DELETE_USER', userId);
          })
      }
    }
  },
  /**
   * Add user to the channel
   *
   * @param userId {String || Number} - user id to add
   */
  'ADD_USER': async ({getters, commit, dispatch, rootGetters}, userId) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.post(`${process.env.VUE_APP_API_URL}/channel/add-user`, {
        user_id: userId,
        channel_id: getters.currentChannelData.channel_id
      })
        .then(
          res => {
            dispatch('GET_USERS', getters.currentChannelData.channel_id);
          },
          err => console.log(err)
        )
        .catch(error => console.log('ADD_USER_TO_CHANNEL: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('ADD_USER', userId);
          })
      }
    }
  },
};
