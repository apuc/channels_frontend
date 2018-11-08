import Vue from 'vue';
import router from '../../../routers/router';

export default {
  /**
   * Get user groups
   */
  'GET_USER_GROUPS': async ({commit, dispatch, rootGetters}) => {
    await Vue.http.get(`${process.env.VUE_APP_API_URL}/group`)
      .then(
        res => {
          commit('USER_GROUPS', res.body.data);
        },
        async err => {
          console.log(err);
          if (err.status === 401) {
            await dispatch('auth/GET_TOKEN', rootGetters['user/refreshTokenBody'], { root: true });
            dispatch('GET_USER_GROUPS');
          }
        }
      )
      .catch(error => console.log(error))
  },
  /**
   * Create group and reload groups
   */
  'CREATE_GROUP': ({getters, commit, dispatch, rootGetters}) => {
    Vue.http.post(`${process.env.VUE_APP_API_URL}/group`, getters.groupData)
      .then(
        res => {
          const createdGroupData = res.body.data;
          commit('modal/DELETE_MODAL', 'group', {root: true});
          router.push({path: `/group/${createdGroupData.slug}`});
          dispatch('GET_USER_GROUPS');
        },
        async err => {
          console.log(err);
          if (err.status === 401) {
            await dispatch('auth/GET_TOKEN', rootGetters['user/refreshTokenBody'], {root: true});
            dispatch('CREATE_GROUP');
          }
        })
      .catch(error => console.log(error))
  },
  /**
   * Add avatar to the group and write avatar_id to the store
   *
   * @param img - image form data
   */
  'CREATE_GROUP_AVATAR': async ({commit, dispatch, rootGetters}, img) => {
    await Vue.http.post(`${process.env.VUE_APP_API_URL}/group/avatar`, img, {
      headers: {
        "Content-Type": "multipart/form-data;"
      }
    })
      .then(
        async res => {
          commit('SET_GROUP_AVATAR_ID', res.body.data.avatar_id);
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
   * Set current group data to the store and get this group users
   *
   * @param groupId {String || Number} - current group id
   */
  'SET_CURRENT_GROUP_DATA': async ({getters, commit, dispatch}, groupId) => {
    const editingGroup = await getters.groups.find(group => group.group_id === groupId);
    await commit('SET_CURRENT_GROUP_DATA', editingGroup);
  },
  /**
   * Set edit mode
   *
   * @param groupId - editing group id
   */
  'SET_GROUP_EDITING': async ({commit, dispatch}, groupId) => {
    dispatch('SET_EDITED_GROUP_DATA', groupId);
    dispatch('modal/OPEN_MODAL_EDIT_MODE', 'group', {root: true});
  },
  /**
   * Set data of editing group to the store
   *
   * @param groupId {String || Number} - chosen group id
   */
  'SET_EDITED_GROUP_DATA': async ({getters, commit}, groupId) => {
    const editingGroup = await getters.groups.find(group => group.group_id === groupId);
    await commit('SET_GROUP_DATA', editingGroup);
  },
  /**
   * Edit chosen group
   */
  'EDIT_GROUP': ({getters, commit, dispatch, rootGetters}) => {
    Vue.http.put(`${process.env.VUE_APP_API_URL}/group/${getters.groupData.group_id}`, {
      title: getters.groupData.title,
      slug: getters.groupData.slug,
      status: getters.groupData.status,
      user_ids: getters.groupData.user_ids,
      avatar: getters.groupData.avatar,
    })
      .then(
        res => {
          dispatch('GET_USER_GROUPS');
          commit('SET_CURRENT_GROUP_DATA', res.body.data);
          dispatch('modal/CLOSE_MODAL_EDIT_MODE', 'group', {root: true});
        },
        async err => {
          console.log(err);
          if (err.status === 401) {
            await dispatch('auth/GET_TOKEN', rootGetters['user/refreshTokenBody'], {root: true});
            dispatch('EDIT_GROUP');
          }
        }
      )
      .catch(error => console.log(error))
  },
  /**
   * Set delete mode
   *
   * @param groupId - group to edit
   */
  'SET_GROUP_DELETING': async ({commit, dispatch}, groupId) => {
    commit('SET_GROUP_ID_TO_DELETE', groupId);
    dispatch('modal/OPEN_MODAL_EDIT_MODE', 'deleteGroup', {root: true});
  },
  /**
   * Delete chosen group
   */
  'DELETE_GROUP': ({getters, commit, dispatch}) => {
    Vue.http.delete(`${process.env.VUE_APP_API_URL}/group/${getters.groupToDelete}`)
      .then(
        res => {
          dispatch('GET_USER_GROUPS');
          dispatch('modal/CLOSE_MODAL_EDIT_MODE', 'deleteGroup', {root: true});
        },
        err => {
          console.log(err);
        }
      )
  },
  'SET_ADDING_CHANNELS_TO_GROUP': ({commit, dispatch}, groupId) => {
    commit('SET_GROUP_ID_FOR_ADDING_CHANNEL', groupId);
    dispatch('modal/OPEN_MODAL_EDIT_MODE', 'addChannelsToGroup', {root: true});
  },
  'ADD_CHANNELS': ({getters, dispatch}, channel_ids) => {
    Vue.http.post(`${process.env.VUE_APP_API_URL}/group/${getters.groupForAddingChannels}/channels`, {channel_ids})
      .then(
        res => {
          dispatch('modal/CLOSE_MODAL_EDIT_MODE', 'addChannelsToGroup', {root: true});
        },
        err => {
          console.log(err);
        }
      )
  }
};
