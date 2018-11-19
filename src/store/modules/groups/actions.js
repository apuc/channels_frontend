import Vue from 'vue';
import router from '../../../routers/router';

export default {
  /**
   * Get user groups
   */
  'GET_USER_GROUPS': async ({getters, commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));
    commit('SET_GROUPS_LOADING_FLAG');

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/group`)
        .then(
          res => {
            commit('SET_GROUPS_LOADING_FLAG');
            commit('USER_GROUPS', res.body.data);
          },
          err => console.log('get groups', err)
        )
        .catch(error => console.log('GET_GROUPS: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('GET_USER_GROUPS');
          })
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
  /**
   * Create group and reload groups
   */
  'CREATE_GROUP': async ({getters, commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.post(`${process.env.VUE_APP_API_URL}/group`, getters.groupData)
        .then(
          async res => {
            const createdGroupData = res.body.data;
            commit('modal/DELETE_MODAL', 'group', {root: true});
            router.push({path: `/group/${createdGroupData.slug}`});

            if (getters.channelsToAdd.length > 0) {
              await commit('SET_GROUP_ID_FOR_ADDING_CHANNEL', getters.groupData.group_id);
              await dispatch('ADD_CHANNELS', getters.channelsToAdd);
            }

            commit('ADD_CREATED_GROUP', createdGroupData);
          },
          err => console.log(err))
        .catch(error => console.log('CREATE_GROUP', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('CREATE_GROUP');
          })
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
  /**
   * Add avatar to the group and write avatar_id to the store
   *
   * @param img - image form data
   */
  'CREATE_GROUP_AVATAR': async ({commit, dispatch, rootGetters}, img) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.post(`${process.env.VUE_APP_API_URL}/group/avatar`, img, {
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
            commit('SET_GROUP_AVATAR_ID', res.body.data.avatar_id);
            commit('SET_AVATAR_UPLOAD_PROGRESS', 0);
          },
          err => console.log(err)
        )
        .catch(error => console.log('CREATE_GROUP_AVATAR: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('CREATE_GROUP_AVATAR', img);
          })
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
  /**
   * Set current group data to the store and get this group users
   *
   * @param groupId {String || Number} - current group id
   */
  'SET_CURRENT_GROUP_DATA':
    async ({getters, commit, dispatch}, groupId) => {
      const editingGroup = await getters.groups.find(group => group.group_id === groupId);
      await commit('SET_CURRENT_GROUP_DATA', editingGroup);
    },
  /**
   * Set edit mode
   *
   * @param groupId - editing group id
   */
  'SET_GROUP_EDITING':
    async ({commit, dispatch}, groupId) => {
      dispatch('SET_EDITED_GROUP_DATA', groupId);
      dispatch('modal/OPEN_MODAL_EDIT_MODE', 'group', {root: true});
    },
  /**
   * Set data of editing group to the store
   *
   * @param groupId {String || Number} - chosen group id
   */
  'SET_EDITED_GROUP_DATA':
    async ({getters, commit}, groupId) => {
      const editingGroup = await getters.groups.find(group => group.group_id === groupId);
      await commit('SET_GROUP_DATA', editingGroup);
    },
  /**
   * Edit chosen group
   */
  'EDIT_GROUP': async ({getters, commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.put(`${process.env.VUE_APP_API_URL}/group/${getters.groupData.group_id}`, {
        title: getters.groupData.title,
        slug: getters.groupData.slug,
        status: getters.groupData.status,
        user_ids: getters.groupData.user_ids,
        avatar: getters.groupData.avatar,
      })
        .then(
          async res => {
            const newGroupData = res.body.data;
            if (getters.channelsToAdd.length > 0) {
              await commit('SET_GROUP_ID_FOR_ADDING_CHANNEL', getters.groupData.group_id);
              await dispatch('ADD_CHANNELS', getters.channelsToAdd);
            }
            commit('SET_EDITED_GROUP_DATA', newGroupData);
            commit('SET_CURRENT_GROUP_DATA', newGroupData);
            dispatch('modal/CLOSE_MODAL_EDIT_MODE', 'group', {root: true});
          },
          err => console.log(err)
        )
        .catch(error => console.log('EDIT_GROUP: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('EDIT_GROUP');
          })
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
  /**
   * Set delete mode
   *
   * @param groupId - group to edit
   */
  'SET_GROUP_DELETING':
    async ({commit, dispatch}, groupId) => {
      commit('SET_GROUP_ID_TO_DELETE', groupId);
      dispatch('modal/OPEN_MODAL_EDIT_MODE', 'deleteGroup', {root: true});
    },
  /**
   * Delete chosen group
   */
  'DELETE_GROUP': async ({getters, commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.delete(`${process.env.VUE_APP_API_URL}/group/${getters.groupToDelete}`)
        .then(
          res => {
            dispatch('GET_USER_GROUPS');
            dispatch('modal/CLOSE_MODAL_EDIT_MODE', 'deleteGroup', {root: true});
          },
          err => {
            console.log(err);
          }
        )
        .catch(error => console.log('DELETE_GROUP: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('DELETE_GROUP');
          })
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
  'SET_ADDING_CHANNELS_TO_GROUP': ({commit, dispatch}, groupId) => {
    commit('SET_GROUP_ID_FOR_ADDING_CHANNEL', groupId);
    dispatch('modal/OPEN_MODAL_EDIT_MODE', 'addChannelsToGroup', {root: true});
  },
  /**
   * Add channels to group
   *
   * @param channel_ids {String || Number} - channels id's
   * @constructor
   */
  'ADD_CHANNELS': async ({getters, commit, dispatch, rootGetters}, channel_ids) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.post(`${process.env.VUE_APP_API_URL}/group/${getters.groupForAddingChannels}/channels`, {channel_ids})
        .then(
          res => {
            dispatch('modal/CLOSE_MODAL_EDIT_MODE', 'addChannelsToGroup', {root: true});
          },
          err => {
            console.log(err);
          }
        )
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('ADD_CHANNELS', channel_ids);
          })
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  }
};