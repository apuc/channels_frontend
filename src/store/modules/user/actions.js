import Vue from "vue";
import router from "../../../routers/router";

export default {
  /**
   * Get user data
   */
  'GET_USER_ME': async ({commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      commit('SET_USER_DATA_LOADING_FLAG');
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/me`)
        .then(
          async res => {
            commit('SET_USER_DATA_LOADING_FLAG');
            await commit('SET_USER_INFO', res.body.data);
          },
          err => console.log('err login', err)
        )
        .catch(error => console.log('GET_USER: ', error));
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('GET_USER_ME');
          })
      }
    }
  },
  /**
   * Get channels and groups
   */
  'GET_NAV': async ({dispatch}) => {
    dispatch('groups/GET_USER_GROUPS', null, {root: true});
    dispatch('channels/GET_USER_CHANNELS', null, {root: true});
  },
  /**
   * Change general user data - avatar, username
   */
  'EDIT_GENERAL_USER_DATA': async ({getters, commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.put(`${process.env.VUE_APP_API_URL}/user/profile/${getters.info.user_id}`, {
        username: getters.info.username,
        avatar_id: getters.info.avatar,
      })
        .then(
          res => {
            commit('modal/DELETE_MODAL', null, {root: true});
          },
          err => console.log(err)
        )
        .catch(error => console.log('EDIT_GENERAL_USER_DATA: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('EDIT_GENERAL_USER_DATA');
          })
      }
    }
  },
  /**
   * Change private user data - password, email
   */
  'EDIT_PRIVATE_USER_DATA': async ({getters, commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.put(`${process.env.VUE_APP_API_URL}/user/profile/${getters.info.user_id}`, {
        email: getters.info.email,
        password: getters.info.password,
        password_confirmation: getters.info.passwordRepeat,
      })
        .then(
          res => {
            commit('modal/DELETE_MODAL', null, {root: true});
          },
          err => console.log(err)
        )
        .catch(error => console.log('EDIT_PRIVATE_USER_DATA: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('EDIT_PRIVATE_USER_DATA');
          })
      }
    }
  },
  /**
   * Delete user
   */
  'DELETE_USER': async ({getters, commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.delete(`${process.env.VUE_APP_API_URL}/user/${getters.info.user_id}`)
        .then(
          res => {
            commit('modal/SET_MODAL', 'ModalEditProfile', {root: true});
          },
          err => console.log(err)
        )
        .catch(error => console.log('DELETE_USER: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('DELETE_USER');
          })
      }
    }
  },
  /**
   * Get specific user data and save it to store
   *
   * @param user_id {String || Number}
   */
  'GET_USER_DATA': async ({commit, dispatch, rootGetters}, user_id) => {
    commit('SET_USER_DATA_LOADING_FLAG');
    await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/${user_id}`)
      .then(
        res => {
          commit('SET_CURRENT_USER_DATA', res.body.data);
          commit('SET_USER_DATA_LOADING_FLAG');
        },
        err => {
          if (err.status === 404) {
            router.push({path: '/not-found'})
          }
        }
      )
      .catch(error => console.log('GET_USER_DATA: ', error))

  },
  /**
   * Add avatar to the user profile and write avatar_id to the store
   *
   * @param img - image form data
   */
  'CREATE_USER_AVATAR': async ({commit, dispatch, rootGetters}, img) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      await Vue.http.post(`${process.env.VUE_APP_API_URL}/user/avatar`, img, {
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
            commit('SET_USER_AVATAR_ID', res.body.data.avatar_id);
            commit('SET_AVATAR_UPLOAD_PROGRESS', 0);
          },
          err => console.log(err)
        )
        .catch(error => console.log('CREATE_GROUP_AVATAR: ', error))
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('CREATE_USER_AVATAR', img);
          })
      }
    }
  },
  /**
   * Global user search
   */
  'FIND_USERS': async ({commit}, {search_request, page}) => {
    await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/search_request=${search_request}&page=${page}`)
      .then(
        async res => {
          console.log(res.body.data);
          commit('SET_SEARCH_RESULTS', res.body.data);
        },
        err => console.log('err login', err)
      )
      .catch(error => console.log('FIND_USERS: ', error));
  },
  /**
   * Send friendship request
   *
   * @param data {Object}
   * @param data.user_id {Number} - user which sending request
   * @param data.contact_id {Number} - user that will receive request
   */
  'SEND_FRIENDSHIP_REQUEST': async ({commit}, data) => {
    await Vue.http.post(`${process.env.VUE_APP_API_URL}/user/add-contact`, {
      user_id: data.user_id,
      contact_id: data.contact_id
    })
      .then(
        async res => {
          console.log(res);
        },
        err => console.log('err login', err)
      )
      .catch(error => console.log('GET_USER: ', error));
  },
  /**
   * Accept friendship request
   *
   * @param data {Object}
   * @param data.user_id {Number} - user which sending request
   * @param data.contact_id {Number} - user that will receive request
   */
  'ACCEPT_FRIENDSHIP_REQUEST': async ({commit}, data) => {
    await Vue.http.put(`${process.env.VUE_APP_API_URL}/user/confirm-contact`, {
      user_id: data.user_id,
      contact_id: data.contact_id
    })
      .then(
        async res => {
          console.log(res);
        },
        err => console.log('err login', err)
      )
      .catch(error => console.log('GET_USER: ', error));
  },
  /**
   * Reject friendship request
   *
   * @param data {Object}
   * @param data.user_id {Number} - user which sending request
   * @param data.contact_id {Number} - user that will receive request
   */
  'REJECT_FRIENDSHIP_REQUEST': async ({commit}, data) => {
    await Vue.http.delete(`${process.env.VUE_APP_API_URL}/user/reject-contact`, {
      user_id: data.user_id,
      contact_id: data.contact_id
    })
      .then(
        async res => {
          console.log(res);
        },
        err => console.log('err login', err)
      )
      .catch(error => console.log('GET_USER: ', error));
  },
  /**
   * Get user contacts
   */
  'GET_USER_CONTACTS': async ({commit}) => {
    await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/contacts`)
      .then(
        async res => {
          console.log(res.body.data);
          commit('SET_USER_CONTACTS', res.body.data);
        },
        err => console.log('err login', err)
      )
      .catch(error => console.log('FIND_USERS: ', error));
  },
  /**
   * Get user friendship requests
   */
  'GET_USER_FRIENDSHIP_REQUESTS': async ({commit}) => {
    await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/senders`)
      .then(
        async res => {
          console.log(res.body.data);
          commit('SET_USER_FRIENDSHIP_REQUESTS', res.body.data);
        },
        err => console.log('err login', err)
      )
      .catch(error => console.log('FIND_USERS: ', error));
  },
};
