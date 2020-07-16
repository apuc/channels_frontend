import Vue from 'vue'
import router from '../../../routers/router';

export default {

  /**
   * Получить типы интеграций
   * @param commit
   * @returns {Promise<unknown>}
   * @constructor
   */
  'MAKE_REQUEST': async ({dispatch, rootGetters}, {name, params}) => {

    //если токен не истек то делаем запрос
      return await new Promise((resolve, reject) => {
         dispatch(name, params, {root: true})
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          });
      });
    

    

    //тут по идее должен быть разлогин если оба токена закончились
  },

};