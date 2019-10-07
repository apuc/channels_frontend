import Vue from 'vue'
import router from '../../../routers/router';

export default {

  /**
   * Получить типы интеграций
   * @param commit
   * @returns {Promise<unknown>}
   * @constructor
   */
  'GET_INTEGRATION_TYPES':({commit,}) => {
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
  'CREATE_INTEGRATION':({commit,},payload) => {
    return new Promise((resolve,reject)=>{
      Vue.http.post(`${process.env.VUE_APP_API_URL}/integrations`,payload)
        .then(
          res => {
            resolve(res.body.data)
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
  'CHANNEL_ADD_INTEGRATION':({commit,},payload) => {
    return new Promise((resolve,reject)=>{
      Vue.http.post(`${process.env.VUE_APP_API_URL}/channels/${payload.channel_id}/integrations`,payload)
        .then(
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