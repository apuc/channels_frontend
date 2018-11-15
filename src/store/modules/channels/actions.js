import Vue from 'vue';
import router from '../../../routers/router';

export default {
  /**
   * Get user channels
   */
  'GET_USER_CHANNELS': async ({commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel`)
        .then(
          res => {
            const channels = res.body.data;
            const slug = location.pathname;
            const channelObj = channels.find(channel => channel.slug === slug.slice(1));

            commit('USER_CHANNELS', channels);

            if (channelObj) {
              dispatch('SET_CURRENT_CHANNEL_DATA', channelObj.channel_id);
            }
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
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel/${channelId}/users`)
        .then(
          async res => {
            await commit('SET_CHANNEL_USERS', res.body.data);
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
            dispatch('GET_USER_CHANNELS');
            dispatch('GET_USERS', createdChannelData.user_count);
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
        }
      })
        .then(
          async res => {
            commit('SET_CHANNEL_AVATAR_ID', res.body.data.avatar_id);
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
      })
        .then(
          res => {
            dispatch('GET_USER_CHANNELS');
            commit('SET_CURRENT_CHANNEL_DATA', res.body.data);
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
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.delete(`${process.env.VUE_APP_API_URL}/channel/${getters.channelToDelete}`)
        .then(
          res => {
            dispatch('GET_USER_CHANNELS');
            commit('modal/DELETE_MODAL', 'deleteChannel', {root: true});
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
  }
};
