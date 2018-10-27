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
  'CREATE_GROUP': ({dispatch, commit, getters, rootGetters}) => {
    Vue.http.post(`${process.env.VUE_APP_API_URL}/group`, getters.groupInfo)
      .then(
        res => {
          console.log(res);
          router.go(-1);
          commit('modal/deleteModal', 'group', {root: true});
          dispatch('GET_USER_GROUPS');
        },
       async err => {
          console.log(err);
          if (err.status === 401) {
            await dispatch('auth/GET_TOKEN', rootGetters['user/refreshTokenBody'], { root: true });
            dispatch('CREATE_GROUP');
          }
        })
      .catch(error => console.log(error))
  },
  'CREATE_GROUP_AVATAR': async ({dispatch, commit, rootGetters}, img) => {
    await Vue.http.post(`${process.env.VUE_APP_API_URL}/group/avatar`, img, {
      headers: {
        "Content-Type": "multipart/form-data;"
      }
    })
      .then(
        async res => {
          console.log(res.data.data.avatar_id);
          await commit('SET_GROUP_AVATAR_ID', res.data.data.avatar_id)
        },
        async err => {
          console.log(err);
          if (err.status === 401) {
            await dispatch('auth/GET_TOKEN', rootGetters['user/refreshTokenBody'], { root: true });
            dispatch('CREATE_GROUP_AVATAR', img);
          }
        }
      )
      .catch(error => console.log(error))
  },

  'SET_GROUP_EDITING': async ({commit, dispatch, getters, rootGetters}, groupId) => {
    commit('modal/toggleEditMode', null, { root: true });
    commit('modal/setModal', 'group', { root: true });
    commit('modal/currentModal', 'group', { root: true });
  },
  'SET_GROUP_DATA': async ({commit, getters, rootGetters}, groupId) => {
    const editingGroup = await getters.groups.find(group => group.group_id === groupId);
    await commit('SET_GROUP_DATA', editingGroup);
    await commit('SET_GROUP_ID', groupId);
  },
  'EDIT_GROUP': ({context, dispatch, commit, getters, rootGetters}, groupData) => {
    Vue.http.put(`${process.env.VUE_APP_API_URL}/group/${getters.groupId}`, {
      title: groupData.title,
      slug: groupData.slug,
      status: groupData.status,
      user_ids: groupData.user_ids,
      avatar: groupData.avatar,
    })
      .then(
        res => {
          dispatch('GET_USER_GROUPS');
          //устанавливаем поля пустыми, чтобы геттер не ругался на пустое поле у аватара при открытии создания канала
          commit('SET_GROUP_DATA', {
            group_id: '',
            title: '',
            slug: '',
            status: '',
            user_ids: [],
            type: '',
            private: '',
            avatar: '',
          });
          commit('modal/deleteModal', 'group', {root: true});
          commit('SET_GROUP_ID', '');
          commit('modal/toggleEditMode', null, {root: true});
        },
        async err => {
          console.log(err);
          if (err.status === 401) {
            await dispatch('auth/GET_TOKEN', rootGetters['user/refreshTokenBody'], { root: true });
            dispatch('EDIT_GROUP');
          }
        }
      )
      .catch(error => console.log(error))
  },
  'SET_GROUP_DELETING': async ({commit, dispatch}, groupId) => {
    commit('modal/toggleEditMode', null, {root: true});
    await commit('modal/currentModal', 'deleteGroup', {root: true});
    commit('modal/setModal', 'deleteGroup', {root: true});
  },
  'DELETE_GROUP': ({commit, dispatch}, groupId) => {
    console.log(groupId);
    Vue.http.delete(`${process.env.VUE_APP_API_URL}/group/${groupId}`)
      .then(
        res => {
          console.log(res);
          dispatch('GET_USER_GROUPS');
          commit('modal/deleteModal', 'deleteGroup', {root: true});
          commit('SET_GROUP_ID', '');
          commit('modal/toggleEditMode', null, {root: true});
        },
        err => {
          console.log(err)
        }
      )
  }
};
