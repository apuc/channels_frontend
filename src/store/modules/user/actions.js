import Vue from "vue";
import router from "../../../routers/router";

import {
  ioFriendRequest
} from '../../../services/socket/users.service';

export default {
  /**
   * Get user data
   */
  'GET_USER_ME': async ({
                          commit,
                          dispatch,
                          rootGetters
                        }) => {
    
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      commit('SET_USER_DATA_LOADING_FLAG');
      return await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/me`)
        .then(
          async res => {
            commit('SET_USER_DATA_LOADING_FLAG');
            await commit('SET_USER_INFO', res.body.data);
            return res.body.data
          },
          err => console.log('err login', err)
        )
        .catch(error => console.log('GET_USER: ', error));
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {
          root: true
        })
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
    await dispatch('channels/GET_USER_NAV_BAR', null, {
      root: true
    });
  },
  
  
  /**
   * Get user contacts
   */
  'GET_USER_CONTACTS': async ({
                                commit
                              }) => {
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/contacts`)
      .then(
        async res => {
          const data = res.body.data;
          commit('SET_USER_CONTACTS', data);
          commit('SET_USER_CONTACTS_SEARCH', data);
          return data;
        },
        err => console.log('err login', err)
      )
      .catch(error => console.log('FIND_USERS: ', error));
  },
  
  
  
  /**
   * Get user friendship requests
   */
  'GET_USER_FRIENDSHIP_REQUESTS': async ({
                                           commit
                                         }) => {
    await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/senders`)
      .then(
        async res => {
          commit('SET_USER_FRIENDSHIP_REQUESTS', res.body.data);
        },
        err => console.log('err login', err)
      )
      .catch(error => console.log('FIND_USERS: ', error));
  },
  
  /**
   * Get specific user data and save it to store
   *
   * @param user_id {String || Number}
   */
  'GET_USER_DATA': async ({commit}, user_id) => {
    commit('SET_USER_DATA_LOADING_FLAG');
    
    await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/${user_id}`)
      .then(
        res => {
          commit('SET_CURRENT_USER_DATA', res.body.data);
          commit('SET_USER_DATA_LOADING_FLAG');
        },
        err => {
          if (err.status === 404) {
            router.push({
              path: '/not-found'
            })
          }
        }
      )
      .catch(error => console.log('GET_USER_DATA: ', error))
  },
  
  
  /**
   * Change general user data - avatar, username
   */
  'EDIT_GENERAL_USER_DATA': async ({commit,getters},data) => {
    return await Vue.http.put(`${process.env.VUE_APP_API_URL}/user/profile/${getters.userData.user_id}`, {
      username: data.username,
      avatar_id: data.id
    })
      .then(
        res => {
          commit('modal/DELETE_MODAL', null, {
            root: true
          });
          return res.body.data
        },
        err => console.log(err)
      )
      .catch(error => console.log('EDIT_GENERAL_USER_DATA: ', error))
  },
  
  
  /**
   * Change private user data - password, email
   */
  'EDIT_PRIVATE_USER_DATA': async ({commit,dispatch,},user) => {
    return new Promise((resolve,reject)=>{
      Vue.http.put(`${process.env.VUE_APP_API_URL}/user/${user.user_id}`,user)
        .then(
          res => {
            commit('modal/DELETE_MODAL', null, {
              root: true
            });
            resolve(res);
          },
          err => {
            console.log('123456');
            reject(err)
          }
        )
    });
  },
  
  /**
   * Delete user
   */
  'DELETE_USER': async ({getters,commit}) => {
    await Vue.http.delete(`${process.env.VUE_APP_API_URL}/user/${getters.userData.user_id}`)
      .then(
        res => {
          commit('modal/SET_MODAL', {name: 'ModalEditProfile'}, {
            root: true
          });
        },
        err => console.log(err)
      )
      .catch(error => console.log('DELETE_USER: ', error))
  },
  
  
  /**
   * Add avatar to the user profile and write avatar_id to the store
   *
   * @param img - image form data
   */
  'CREATE_USER_AVATAR': async ({commit},img) => {
    return await Vue.http.post(`${process.env.VUE_APP_API_URL}/user/avatar`, img, {
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

          commit('SET_AVATAR_UPLOAD_PROGRESS', 0);
          return res.body.data.id
        },
        err => console.log(err)
      )
      .catch(error => console.log('CREATE_GROUP_AVATAR: ', error))
  },
  
  
  /**
   * Global user search
   *
   * @param page {Number} - page number of page
   */
  'FIND_USERS': async ({
                         getters,
                         commit
                       }, page) => {
    commit('SET_CONTACTS_LOADING_FLAG');

    if (getters.searchResultsIsLoading) {
      return await Vue.http.get(`${process.env.VUE_APP_API_URL}/user?search_request=${getters.searchRequest}&page=${page}`)
        .then(
          async res => {
            commit('SET_CONTACTS_LOADING_FLAG');

            const data = res.body.data;
            const meta = res.body.meta;

            if (page < 2) {
              commit('SET_SEARCH_RESULTS_USERS', data);
            } else {
              commit('ADD_SEARCH_RESULTS_USERS', data);
            }
            commit('SET_SEARCH_RESULTS_PAGES', meta);
            commit('SET_SEARCH_RESULTS_CURRENT_PAGE', meta);
          },
          err => console.log('err login', err)
        )
        .catch(error => console.log('FIND_USERS: ', error));
    }
  },
  
  
  /**
   * Send friendship request
   *
   * @param data {Object}
   * @param data.user_id {Number} - user which sending request
   * @param data.contact_id {Number} - user that will receive request
   */
  'SEND_FRIENDSHIP_REQUEST': async ({getters}, data) => {
    await Vue.http.post(`${process.env.VUE_APP_API_URL}/user/add-contact`, {
      user_id: data.user_id,
      contact_id: data.contact_id
    })
      .then(
        res => {
          ioFriendRequest({to:data.contact_id,from:getters.userData});
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
  'ACCEPT_FRIENDSHIP_REQUEST': async ({}, data) => {
    await Vue.http.put(`${process.env.VUE_APP_API_URL}/user/confirm-contact`, {
      user_id: data.user_id,
      contact_id: data.contact_id
    })
      .then(
        async res => {
          // console.log(res);
        },
        err => console.log('err accept friendship', err)
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
  'REJECT_FRIENDSHIP_REQUEST': async ({}, data) => {
    await Vue.http.delete(`${process.env.VUE_APP_API_URL}/user/reject-contact?user_id=${data.user_id}&contact_id=${data.contact_id}`)
      .then(
        async res => {
          console.log(res);
        },
        err => console.log('err reject friendship ', err)
      )
      .catch(error => console.log('GET_USER: ', error));
  },


  /**
   * Подписка/отписка на пуш уведомления
   * @param commit
   * @param subscription
   * @returns {Promise<unknown>}
   * @constructor
   */
  'PUSH_SUBSCRIPTION':({commit,getters},{subscription,action}) => {
    return new Promise((resolve,reject)=>{
      Vue.http.post(`${process.env.VUE_APP_API_URL}/user/${getters.userData.user_id}/push-${action}`,{
        endpoint:JSON.stringify(subscription)
      }).then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
    });
  },
  
  
};