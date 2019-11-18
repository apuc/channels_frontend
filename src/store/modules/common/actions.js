import Vue from 'vue'
import router from '../../../routers/router';

export default {

  /**
   * Получить типы интеграций
   * @param commit
   * @returns {Promise<unknown>}
   * @constructor
   */
  'MAKE_REQUEST':async ({dispatch,rootGetters},{name,params}) => {
    
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    //если токен не истек то делаем запрос
    if (currentDateInSeconds < tokenExpiresIn) {
      return new Promise((resolve,reject)=>{
        dispatch(name,params,{root:true}).then(res =>{
          resolve(res)
        }).catch(err =>{
          reject(err)
        });
      });
    }

    //если токен истек,но не истек рефреш токен то обновить токен и сделать запрос
    if (currentDateInSeconds < refreshTokenExpiresIn) {
      await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {
        root: true
      })
        .then(() => {
          return new Promise((resolve,reject)=>{
            dispatch(name,params,{root:true}).then(res =>{
              resolve(res)
            }).catch(err =>{
              reject(err)
            });
          });
        })
    }

    //тут по идее должен быть разлогин если оба токена закончились
  },
  
};