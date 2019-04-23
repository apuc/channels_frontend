import Vue from 'vue';
import router from '../../../routers/router';

export default {
  /**
   * Get user groups
   */
  'GET_USER_GROUPS': async ({
    commit,
    dispatch,
    rootGetters
  }) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));
    commit('SET_GROUPS_LOADING_FLAG');

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/group`)
        .then(
          res => {
            const groups = res.body.data;
            commit('USER_GROUPS', groups);
            commit('SET_GROUPS_LOADING_FLAG');
          },
          err => console.log('get groups', err)
        )
        .catch(error => console.log('GET_GROUPS: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {
            root: true
          })
          .then(() => {
            dispatch('GET_USER_GROUPS');
          })
      }
    }
  },
  /**
   * Get one group data
   *
   * @param groupId {String || Number} - search by id or slug
   */
  'GET_GROUP_DATA': async ({}, groupId) => {
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}/group/${groupId}`)
      .then(
        res => {
          return res.body.data;
        },
        err => console.log('get groups', err)
      )
      .catch(error => console.log('GET_GROUPS: ', error))
  },
  /**
   * Create group and reload groups
   */
  'CREATE_GROUP': async ({
    getters,
    commit,
    dispatch,
    rootGetters
  }) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.post(`${process.env.VUE_APP_API_URL}/group`, getters.groupData)
        .then(
          async res => {
              const createdGroupData = res.body.data;
              router.push({
                path: `/group/${createdGroupData.slug}`
              });
              commit('modal/SET_MODAL', 'ModalGroupAddChannels', {
                root: true
              });
              commit('ADD_CREATED_GROUP', createdGroupData);
            },
            err => console.log(err))
        .catch(error => console.log('CREATE_GROUP', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {
            root: true
          })
          .then(() => {
            dispatch('CREATE_GROUP');
          })
      }
    }
  },
  /**
   * Add avatar to the group and write avatar_id to the store
   *
   * @param img - image form data
   */
  'CREATE_GROUP_AVATAR': async ({
    commit,
    dispatch,
    rootGetters
  }, img) => {
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
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {
            root: true
          })
          .then(() => {
            dispatch('CREATE_GROUP_AVATAR', img);
          })
      }
    }
  },
  /**
   * Set data of editing group to the store
   *
   * @param groupId {String || Number} - chosen group id
   */
  'SET_EDITED_GROUP_DATA': async ({
    getters,
    commit
  }, groupId) => {
    const editingGroup = await getters.groups.find(group => group.id === groupId);
    await commit('SET_GROUP_DATA', editingGroup);
  },
  /**
   * Edit chosen group
   */
  'EDIT_GROUP': async ({
    getters,
    commit,
    dispatch,
    rootGetters
  }) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.put(`${process.env.VUE_APP_API_URL}/group/${getters.groupData.id}`, {
          title: getters.groupData.title,
          slug: getters.groupData.slug,
          status: getters.groupData.status,
          user_ids: [rootGetters['user/userData'].user_id],
          avatar: getters.groupData.avatar,
          owner_id: getters.groupData.owner_id,
        })
        .then(
          async res => {
              const newGroupData = res.body.data;
              commit('SET_EDITED_GROUP_DATA', newGroupData);
              if (newGroupData.id === getters.currentGroupData.id) {
                commit('SET_CURRENT_GROUP_DATA', newGroupData);
                commit('SET_CURRENT_GROUP_CHANNELS_TO_SEARCH', newGroupData.channels);
              }
              commit('modal/DELETE_MODAL', null, {root: true});
            },
            err => console.log(err)
        )
        .catch(error => console.log('EDIT_GROUP: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {
            root: true
          })
          .then(() => {
            dispatch('EDIT_GROUP');
          })
      }
    }
  },
  /**
   * Delete chosen group
   */
  'DELETE_GROUP': async ({
    getters,
    commit,
    dispatch,
    rootGetters
  }) => {
    const id = getters.groupToDelete;
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.delete(`${process.env.VUE_APP_API_URL}/group/${id}`)
        .then(
          res => {
            commit('REMOVE_DELETED_GROUP_FROM_STORE', id);
            dispatch('modal/DELETE_MODAL', null, {
              root: true
            });

            if (id === getters.currentGroupData.id) {
              router.push('/');
            }
          },
          err => {
            console.log(err);
          }
        )
        .catch(error => console.log('DELETE_GROUP: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {
            root: true
          })
          .then(() => {
            dispatch('DELETE_GROUP');
          })
      }
    }
  },
  /**
   * Add channels to group
   *
   * @param channel_ids {String || Number} - channels id's
   */
  'ADD_CHANNELS_TO_GROUP': async ({
    getters,
    commit,
    dispatch,
    rootGetters
  }) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.post(`${process.env.VUE_APP_API_URL}/group/${getters.addingChannelsData.id}/channels`, {
          channel_ids: getters.addingChannelsData.channelsToAdd
        })
        .then(
          res => {
            const newGroupData = res.body.data;
            for (let i = 0; i < getters.addingChannelsData.channelsToAdd.length; i++) {
              commit('channels/REMOVE_DELETED_CHANNEL_FROM_STORE', getters.addingChannelsData.channelsToAdd[i], {
                root: true
              });
            }
            if (getters.currentGroupData.id === newGroupData.id) {
              commit('SET_CURRENT_GROUP_DATA', newGroupData);
              commit('SET_CURRENT_GROUP_CHANNELS_TO_SEARCH', newGroupData.channels);
            }
            commit('SET_EDITED_GROUP_DATA', newGroupData);
            commit('modal/DELETE_MODAL', null, {
              root: true
            });
          },
          err => {
            console.log(err);
          }
        )
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {
            root: true
          })
          .then(() => {
            dispatch('ADD_CHANNELS_TO_GROUP');
          })
      }
    }
  },
  /**
   * Delete channel from group
   */
  'DELETE_CHANNEL_FROM_GROUP': async ({
    getters,
    commit,
    dispatch,
    rootGetters
  }) => {
    const group_id = getters.currentGroupData.id;
    const channel_id = getters.channelToDelete.id;
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.delete(`${process.env.VUE_APP_API_URL}/group/${group_id}/delete-channel?channel_id=${channel_id}`)
        .then(
          res => {
            commit('REMOVE_DELETED_CHANNEL', channel_id);
          },
          err => console.log('get groups', err)
        )
        .catch(error => console.log('GET_GROUPS: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {
            root: true
          })
          .then(() => {
            dispatch('REMOVE_CHANNEL_FROM_GROUP');
          })
      }
    }
  },
};