import Vue from 'vue';
import router from '../../../routers/router';
import {
  joinChannel,
  joinChannels
} from '../../../services/socket/channels.service';

import {
  ioAddTochannel
} from '../../../services/socket/channels.service';

export default {
  /**
   * Get logined user channels
   */
  'GET_USER_CHANNELS': async ({
                                commit,
                                dispatch,
                                rootGetters
                              }) => {
                                
    commit('SET_CHANNELS_LOADING_FLAG');

      await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel`)
        .then(
          res => {
            const channels = res.body.data;
            commit('USER_CHANNELS', channels);
            commit('SET_ALL_CHANNELS', channels);
            commit('SET_CHANNELS_LOADING_FLAG');
          },
          err => console.log('get channels', err)
        )
        .catch(error => console.log('GET_CHANNELS: ', error))
  
  },
  
  
  
  /**
   * Get concrete channel data
   *
   * @param channelId {String || Number} - search id or slug
   */
  'GET_CHANNEL_DATA': async ({}, channelId) => {
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel/${channelId}`)
      .then(
        async res => {
          return res.body.data;
        },
        err => {
          if (err.bodyText.includes('No query results for model')) {
            router.push({
              path: '/not-found'
            })
          }
          console.log('get channels', err)
        }
      )
      .catch(error => console.log('GET_CHANNELS: ', error))
  },
  
  
  /**
   * Get current channel users
   *
   * @param channelId {String || Number} - channel id
   */
  'GET_CHANNEL_USERS': async ({commit}, channelId) => {
    commit('SET_CHANNEL_USERS_LOADING');
    
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel/${channelId}/users`)
      .then(
        async res => {
          commit('SET_CHANNEL_USERS_LOADED');
          return res.body.data
        },
        err => console.log(err)
      )
      .catch(error => console.log(error));
  },
  
  
  /**
   * Задать свойста стейта currentChannelUsers.
   * @param commit
   * @param users {Array}
   * @constructor
   */
  'SET_CURRENT_CHANNEL_USERS': ({commit}, users) => {
    commit('SET_CURRENT_CHANNEL_USER_SEARCH_RESULTS', users);
    commit('SET_CURRENT_CHANNEL_USERS', users);
  },
  
  
  'SET_CONTACTS_FREE_TO_ADD': ({commit}, users) => {

  },
  
  
  /**
   * Create channel and reload channels
   */
  'CREATE_CHANNEL': async ({commit,dispatch}, {type,channelData}) => {

    return new Promise((resolve,reject)=>{
      Vue.http.post(`${process.env.VUE_APP_API_URL}/${type}`, channelData)
        .then(
          res => {
            const createdChannelData = res.body.data;

            if(type != 'dialog'){
              commit('modal/SET_MODAL', {name: 'ModalChannelAddUsers'}, {
                root: true
              });
            }
            
            commit('SET_CONTACTS_TO_ADD_CHANNEL_ID', createdChannelData.id);
            commit('ADD_CREATED_CHANNEL', createdChannelData);
            
            dispatch('SET_CURRENT_CHANNEL_DATA',createdChannelData.id)

            joinChannel(createdChannelData.id)
            
            router.push({
              path: `/${createdChannelData.slug}`
            });
            
            resolve(res);
          },
          err => reject(err)
        )
        .catch(error => console.log(error))
    })
  },
  
  
  /**
   * Add avatar to the channel and write avatar_id to the store
   *
   * @param img - image form data
   */
  'CREATE_CHANNEL_AVATAR': async ({commit}, img) => {
    return await Vue.http.post(`${process.env.VUE_APP_API_URL}/channel/avatar`, img, {
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
          commit('SET_CHANNEL_AVATAR_ID', res.body.data.id);
          commit('SET_AVATAR_UPLOAD_PROGRESS', 0);
          return res.body.data.id;
        },
        err => console.log(err)
      )
      .catch(error => console.log(error))
  },
  
  
  /**
   * Set current channel data to the store and get this channel users
   *
   * @param channelId {String || Number} - current channel id
   */
  'SET_CURRENT_CHANNEL_DATA': async ({
                                       getters,
                                       commit,
                                       dispatch,
                                       rootGetters
                                     }, channelId) => {

      commit('messages/OFF_TYPING',null,{root:true});
      
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel/${channelId}/full`)
        .then(
          async res => {
            
            let channelData = Object.assign({}, res.body.data);
            delete channelData.users
            delete channelData.integrations
            
            commit('SET_CURRENT_CHANNEL_DATA', res.body.data)

            commit('SET_CHANNEL_USERS_LOADED');
            dispatch('SET_CURRENT_CHANNEL_USERS', res.body.data.users);

            if (rootGetters['user/userData'].user_id) {
              commit('SET_CONTACTS_FREE_TO_ADD', rootGetters['user/userContacts']);
              commit('SET_CONTACTS_FREE_TO_ADD_SEARCH', getters['contactsToAddUsers']);
            }

            commit('channels/SET_CHANNEL_INTEGRATIONS',res.body.data.integrations,{root:true})
            commit('channels/SET_CHANNEL_MEETINGS',res.body.data.meetings,{root:true})

            await dispatch('messages/GET_MESSAGES', null, {root: true});
          },
          err => {
            if(err.status === 403){
               router.push('/not-found')
            }
          }
        )
        .catch(error => console.log('catch',error))
  },
  
  
  /**
   * Set data of editing channel to the store
   *
   * @param channelId {String || Number} - chosen channel id
   */
  'SET_EDITED_CHANNEL_DATA': async ({
                                      getters,
                                      commit
                                    }, channelId) => {
    const editingChannel = await getters.channels.find(channel => channel.id === channelId);
    await commit('SET_CHANNEL_DATA', editingChannel);
  },
  
  
  /**
   * Edit chosen channel
   */
  'EDIT_CHANNEL': async ({getters,commit}) => {
    return new Promise((resolve,reject)=>{
      Vue.http.put(`${process.env.VUE_APP_API_URL}/channel/${getters.channelData.id}`, {
        title: getters.channelData.title,
        slug: getters.channelData.slug,
        status: getters.channelData.status,
        user_ids: getters.channelData.user_ids,
        type: getters.channelData.type,
        private: getters.channelData.private,
        avatar: getters.channelData.avatar.id,
        owner_id: getters.channelData.owner_id,
      })
        .then(
          res => {
            const newChannelData = res.body.data;
            commit('SET_CURRENT_CHANNEL_DATA', newChannelData);
            commit('SET_EDITED_CHANNEL_DATA', newChannelData);
            commit('modal/DELETE_MODAL', null, {
              root: true
            });
           
            resolve(res);
          },
          err => reject(err)
        )
        .catch(error => console.log(error))
    });
  },
  
  
  
  /**
   * Delete chosen channel
   */
  'DELETE_CHANNEL': async ({
                             getters,
                             commit,
                             dispatch
                           }) => {
    const id = getters.channelToDelete;

      return await Vue.http.delete(`${process.env.VUE_APP_API_URL}/channel/${id}`)
        .then(
          res => {
            commit('REMOVE_DELETED_CHANNEL_FROM_STORE', id);
            commit('modal/DELETE_MODAL', null, {
              root: true
            });

            if (id === getters.currentChannelData.id) router.push('/');
            return res;
          },
          err => console.log(err)
        )
        .catch(error => console.log('DELETE_CHANNEL: ', error))
    
  },
  
  
  /**
   * Remove user from channel
   *
   * @param userId {String || Number} - user id  to remove
   */
  'DELETE_USER_FROM_CHANNEL': async ({
                                       getters,
                                       commit,
                                       dispatch,
                                       rootGetters
                                     }, userId) => {

      new Promise((resolve, reject) => {
        Vue.http.delete(`${process.env.VUE_APP_API_URL}/channel/delete-user?channel_id=${getters.currentChannelData.id}&user_id=${userId}`)
          .then(
            res => resolve(res),
            err => reject(err)
          )
          .catch(error => console.log('DELETE_USER_FROM_CHANNEL: ', error))
      });
  
  },
  
  
  /**
   * Add user to the channel
   *
   * @param data {Object}
   * @param data.user_id {Number} - user id to add
   * @param data.channel_id {Number} - channel id to add
   */
  'ADD_USER': async ({
                       getters,
                       commit,
                       dispatch,
                       rootGetters
                     }, data) => {

      await Vue.http.post(`${process.env.VUE_APP_API_URL}/channel/add-user`, {
        user_id: data.user_id,
        channel_id: data.channel_id
      })
        .then(
          res => {
            ioAddTochannel(data.user_id,data.channel_id);

            dispatch('GET_CHANNEL_USERS', data.channel_id)
              .then(users => {
                if (data.channel_id === getters.currentChannelData.id) {
                  dispatch('SET_CURRENT_CHANNEL_USERS', users);
                  commit('INCREASE_CURRENT_CHANNEL_USER_COUNT');
                }
              });
          },
          err => console.log(err)
        )
        .catch(error => console.log('ADD_USER_TO_CHANNEL: ', error))

  },
  
  
  
  'GET_USER_NAV_BAR': async ({
                               commit,
                               dispatch,
                               rootGetters
                             }) => {
                               
    commit('SET_CHANNELS_LOADING_FLAG');

    
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel/service/left-side-bar`)
        .then(
          res => {
            const data = res.body.data;
            
            commit('USER_CHANNELS', data.channels.filter((el)=> el.group_id === null));
            commit('SET_ALL_CHANNELS', data.channels);
            commit('groups/USER_GROUPS', data.groups, {root: true});
            commit('SET_CHANNELS_LOADING_FLAG');
          },
          err => console.log('get channels', err)
        )
        .catch(error => console.log('GET_CHANNELS: ', error))
  },

  'CHANNEL_ADD_MEETING':({commit},payload) => {
    return new Promise((resolve,reject)=>{
      Vue.http.post(`${process.env.VUE_APP_API_URL}/meeting`,payload)
        .then(
          res => {
            commit('channels/ADD_CHANNEL_MEETING',res.body.data,{root:true})
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
    });
  },

  'SORT_CHANNELS':({commit},payload) => {
    
  },
}