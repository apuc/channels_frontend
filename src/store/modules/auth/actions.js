import Vue from 'vue'
import router from '../../../routers/router';

export default {
  'REGISTRATION': ({commit, dispatch}, userData) => {
    commit('LOADING');
    Vue.http.post(`${process.env.VUE_APP_API_URL}/registration`, userData)
      .then(
        res => {
          commit('SUCCESS_REGISTRATION');
          router.push('/login');
          console.log(res)
        },
        err => {
          commit('ERROR', err.body);
        }
      )
      .catch(err => console.log('REGISTRATION catch err: ', err));
  },

  /**
   * Получает токен с сервера, и диспатчит логин
   * @param userData {Object}
   * @constructor
   */
  'GET_TOKEN': ({commit, dispatch}, userData) => {
    commit('LOADING');
    console.log(userData);
    Vue.http.post(`${process.env.VUE_APP_API_URL}/oauth/token`, userData)
      .then(
        res => {
          console.log('res from vue resource', res.body);
          localStorage.setItem('access_token', res.body.access_token);
          localStorage.setItem('refresh_token', res.body.refresh_token);
          commit('SUCCESS_TOKEN', res.body.access_token);
          dispatch('GET_USER', res.body.access_token);
        },
        err => {
          console.log('err from vue resource', err);
          commit('ERROR', err.body);
        }
      )
      .catch(err => console.log('GET_TOKEN catch err: ', err));
  },
  /**
   * Логинит с помощью токена
   * @param tokenData {Object}
   * @param tokenData.token_type {string} - Тип токена
   * @param tokenData.access_token {string} - Токен для авторизации
   * @constructor
   */
  'GET_USER': ({commit, dispatch}, token) => {
    commit('LOADING');
    Vue.http.headers.common['Authorization'] = `Bearer ${token}`;
    Vue.http.get(`${process.env.VUE_APP_API_URL}/user`)
      .then(
        res => {
          console.log('res login', res);
          commit('SUCCESS_LOGIN', res.body);
          router.push('/')
        },
        err => {
          console.log('err login', err);
          commit('ERROR', err.body);
        }
      )
      .catch(err => console.log('GET_USER catch err: ', err));
  },

  /**
   *
   * @param commit
   * @constructor
   */
  'LOGOUT': ({commit}) => {
    commit('LOGOUT');
    localStorage.removeItem('access_token'); // clear your user's token from localstorage
    localStorage.removeItem('refresh_token');
  },
};
