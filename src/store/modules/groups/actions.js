import Vue from 'vue';
import router from '../../../routers/router';

export default {
  /**
   * Get user groups
   */
  'GET_USER_GROUPS': async ({commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/group`)
        .then(
          res => {
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
      Vue.http.post(`${process.env.VUE_APP_API_URL}/group`, getters.groupData)
        .then(
          res => {
            router.go(-1);
            commit('modal/DELETE_MODAL', 'group', {root: true});
            dispatch('GET_USER_GROUPS');
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
        }
      })
        .then(
          async res => {
            commit('SET_GROUP_AVATAR_ID', res.body.data.avatar_id);
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
};