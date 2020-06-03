import Vue from 'vue'
import router from '../../../routers/router';

export default {

  'GET_USER_INTEGRATIONS': async ({commit, rootGetters}) => {
    const userData = rootGetters['user/userData'];
    const currentUser = rootGetters['user/currentUserInfo'];
    const user_id = userData.user_id || currentUser.user_id;
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}/user/${user_id}/integrations`)
      .then(
        async res => {
          const data = res.body.data;
          console.log('data', data)
          commit('SET_USER_INTEGRATIONS', data);
          return data;
        },
        err => console.log('err login', err)
      )
      .catch(error => console.log('GET_INTEGRATIONS: ', error));
  },

  /**
   * Получить типы интеграций
   * @param commit
   * @returns {Promise<unknown>}
   * @constructor
   */
  'GET_INTEGRATION_TYPES':({commit}) => {
    return new Promise((resolve,reject)=>{
      Vue.http.get(`${process.env.VUE_APP_API_URL}/integrations`)
        .then(
          res => {
            commit('SET_INTEGRATION_TYPES',res.data.data)
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
    });  
  },

  /**
   * Создать интеграцию
   * @param commit
   * @param payload
   * @returns {Promise<unknown>}
   * @constructor
   */
  'CREATE_INTEGRATION':({commit},payload) => {
    return new Promise((resolve,reject)=>{
      Vue.http.post(`${process.env.VUE_APP_API_URL}/integrations`,payload)
        .then(
          res => {
            commit('ADD_INTEGRATION_TO_TYPE',res.body.data);
            resolve(res.body.data);
          },
          err => {
            reject(err)
          }
        )
    });
  },

  

  /**
   * Добавить интеграцию в канал
   * @param commit
   * @param payload
   * @returns {Promise<unknown>}
   * @constructor
   */
  'CHANNEL_ADD_INTEGRATION':({commit},payload) => {
    return new Promise((resolve,reject)=>{
      Vue.http.post(`${process.env.VUE_APP_API_URL}/channels/${payload.channel_id}/integrations`,payload)
        .then(
          res => {
            commit('channels/ADD_CHANNEL_INTEGRATION',res.body.data,{root:true})
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
    });
  },

  /**
   * Удалить интеграцию из канала
   * 
   * @param commit
   * @param payload
   * @returns {Promise<unknown>}
   * @constructor
   */
  'CHANNEL_DELETE_INTEGRATION':({commit},payload) => {
    return new Promise((resolve,reject)=>{
      console.log(payload);
      Vue.http.delete(`${process.env.VUE_APP_API_URL}/channels/${payload.channel_id}/integrations/${payload.integration_id}`,payload)
        .then(
          res => {
            commit('channels/REMOVE_CHANNEL_INTEGRATION',payload.integration_id,{root:true})
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
    });
  },


  /**
   * Получить список интеграций канала
   * @param commit
   * @param payload
   * @returns {Promise<unknown>}
   * @constructor
   */
  'GET_CHANNEL_INTEGRATIONS':({commit},channel_id) => {
    return new Promise((resolve,reject)=>{
      Vue.http.get(`${process.env.VUE_APP_API_URL}/channels/${channel_id}/integrations`)
        .then(
          res => {
            commit('channels/SET_CHANNEL_INTEGRATIONS',res.body.data,{root:true})
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
    });
  },
  
};