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
    Vue.http.post(`${process.env.VUE_APP_API_URL}/group`, getters.newGroupData)
      .then(
        res => {
          console.log(res);
          router.go(-1);
          commit('ADD_GROUP', res);
          commit('modal/deleteModal', null, {root: true});
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

  'EDIT_GROUP': ({dispatch, commit, getters, rootGetters}, groupData) => {
    Vue.http.put(`${process.env.VUE_APP_API_URL}/group/${groupData.group_id}`, {
      title: groupData.title,
      slug: groupData.slug,
      status: groupData.status,
      avatar: groupData.avatar,
    })
      .then(
        res => {
          console.log(res);
        },
        err => {
          console.log(err)
        })
      .catch(error => console.log(error))
  },
};
