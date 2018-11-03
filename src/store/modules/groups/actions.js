import Vue from 'vue';
import router from '../../../routers/router';

export default {
  /**
   * Get user groups
   *
   * @param commit
   * @param dispatch
   * @param rootGetters
   * @returns {Promise<void>}
   * @constructor
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
   *
   * @param dispatch
   * @param commit
   * @param getters
   * @param rootGetters
   * @constructor
   */
  'CREATE_GROUP': ({getters, commit, dispatch, rootGetters}) => {
    Vue.http.post(`${process.env.VUE_APP_API_URL}/group`, getters.groupData)
      .then(
        res => {
          router.go(-1);
          commit('modal/deleteModal', 'group', {root: true});
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
   * @param dispatch
   * @param commit
   * @param rootGetters
   * @param img - image form data
   * @returns {Promise<void>}
   * @constructor
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
   * @param getters
   * @param commit
   * @param dispatch
   * @param groupId {String || Number} - current group id
   * @returns {Promise<void>}
   * @constructor
   */
  'SET_CURRENT_GROUP_DATA': async ({getters, commit, dispatch}, groupId) => {
    const editingGroup = await getters.groups.find(group => group.group_id === groupId);
    await commit('SET_CURRENT_GROUP_DATA', editingGroup);
  },
  /**
   * Set edit mode
   *
   * @param commit
   * @param dispatch
   * @param groupId - editing group id
   * @returns {Promise<void>}
   * @constructor
   */
  'SET_GROUP_EDITING': async ({commit, dispatch}, groupId) => {
    dispatch('SET_EDITED_GROUP_DATA', groupId);
    commit('modal/toggleEditMode', null, {root: true});
    commit('modal/setModal', 'group', {root: true});
    commit('modal/currentModal', 'group', {root: true});
  },
  /**
   * Set data of editing group to the store
   *
   * @param getters
   * @param commit
   * @param groupId {String || Number} - chosen group id
   * @returns {Promise<void>}
   * @constructor
   */
  'SET_EDITED_GROUP_DATA': async ({getters, commit}, groupId) => {
    const editingGroup = await getters.groups.find(group => group.group_id === groupId);
    await commit('SET_GROUP_DATA', editingGroup);
  },
  /**
   * Edit chosen group
   *
   * @param getters
   * @param commit
   * @param dispatch
   * @param rootGetters
   * @constructor
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
          commit('modal/deleteModal', 'group', {root: true});
          commit('modal/toggleEditMode', null, {root: true});
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
   * @param commit
   * @param dispatch
   * @param groupId - group to edit
   * @returns {Promise<void>}
   * @constructor
   */
  'SET_GROUP_DELETING': async ({commit, dispatch}, groupId) => {
    commit('SET_GROUP_ID_TO_DELETE', groupId);
    commit('modal/toggleEditMode', null, {root: true});
    await commit('modal/currentModal', 'deleteGroup', {root: true});
    commit('modal/setModal', 'deleteGroup', {root: true});
  },
  /**
   * Delete chosen group
   *
   * @param getters
   * @param commit
   * @param dispatch
   * @constructor
   */
  'DELETE_GROUP': ({getters, commit, dispatch}) => {
    Vue.http.delete(`${process.env.VUE_APP_API_URL}/group/${getters.groupToDelete}`)
      .then(
        res => {
          console.log(res);
          dispatch('GET_USER_GROUPS');
          commit('modal/deleteModal', 'deleteGroup', {root: true});
          commit('modal/toggleEditMode', null, {root: true});
        },
        err => {
          console.log(err);
          console.log(err.body);
        }
      )
  },
};
