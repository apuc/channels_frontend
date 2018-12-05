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
            const pathnameArray = location.pathname.split('/');
            const slug = pathnameArray[pathnameArray.length - 1];
            const currentChannel = channels.find(channel => channel.slug === slug);
            commit('SET_CHANNELS_LOADING_FLAG');
            commit('USER_CHANNELS', channels);
            console.log(slug);

            if (currentChannel) {
              commit('SET_CURRENT_CHANNEL_DATA', currentChannel);
              dispatch('GET_USERS', currentChannel.channel_id);
              dispatch('messages/GET_MESSAGES', {}, {root: true});
            }

            if (channels.length === 0) {
              commit('modal/SET_MODAL', 'channel', {root: true});
            }

            joinChannels(channels);
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
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
  /**
   * Get concrete channel data
   *
   * @param channelId {String || Number}
   */
  'GET_CHANNEL_DATA': async ({commit, dispatch, rootGetters}, channelId) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel/${channelId}`)
        .then(
          res => {
            const channels = res.body.data;
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
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
  /**
   * Get current channel users
   *
   * @param channelId {String || Number} - channel id
   */
  'GET_USERS': async ({getters, commit, dispatch, rootGetters}, channelId) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      commit('SET_CHANNEL_USERS_LOADING');
      commit('SET_CHANNEL_USERS', []);
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel/${channelId}/users`)
        .then(
          async res => {
            await commit('SET_CHANNEL_USERS', res.body.data);
            commit('SET_CHANNEL_USERS_LOADED');
          },
          err => console.log(err)
        )
        .catch(error => console.log(error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('GET_USERS', channelId);
          })
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
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
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
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
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
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
  'EDIT_CHANNEL': async ({getters, commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.put(`${process.env.VUE_APP_API_URL}/channel/${getters.channelData.channel_id}`, {
        title: getters.channelData.title,
        slug: getters.channelData.slug,
        status: getters.channelData.status,
        user_ids: getters.channelData.user_ids,
        type: getters.channelData.type,
        private: getters.channelData.private,
        avatar: getters.channelData.avatar,
        owner_id: getters.channelData.owner_id,
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
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
  /**
   * Set delete mode
   *
   * @param channelId - channel to edit
   */
  'SET_CHANNEL_DELETING': async ({commit, dispatch, rootGetters}, channelId) => {
    commit('SET_CHANNEL_ID_TO_DELETE', channelId);
    dispatch('modal/OPEN_MODAL_EDIT_MODE', 'deleteChannel', {root: true});
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
            commit('REMOVE_DELETED_CHANNEL', id);
            commit('modal/DELETE_MODAL', 'deleteChannel', {root: true});

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
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
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
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
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
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
};
