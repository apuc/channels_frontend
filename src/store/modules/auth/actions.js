import Vue from 'vue'
import router from '../../../routers/router';

export default {
  'REGISTRATION': ({commit, dispatch}, userData) => {
    commit('LOADING');
    fetch(`${process.env.VUE_APP_API_URL}/registration`, {
      contentType: 'JSON',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'post',
      body: JSON.stringify(userData)
    }).then(res => {
      console.log(res);
      commit('SUCCESS_REGISTRATION');
      return res
    }).catch(err => {
      console.log(err);
      commit('ERROR', err);
    });
  },

  /**
   * Получает токен с сервера, и диспатчит логин
   * @param userData {Object}
   * @constructor
   */
  'GET_TOKEN': ({commit, dispatch}, userData) => {
    commit('LOADING');
    Vue.http.post(`${process.env.VUE_APP_API_URL}/oauth/token`, userData)
      .then(
        res => {
          console.log('res from vue resource', res.body);
          localStorage.setItem('access_token', res.body.access_token);
          localStorage.setItem('refresh_token', res.body.refresh_token);
          commit('SUCCESS_TOKEN', res.body.access_token);
          dispatch('LOGIN', res.body);
        },
        err => {
          console.log('err from vue resource', err);
          commit('ERROR', err.body);
        }
      );
  },
  /**
   * Логинит с помощью токена
   * @param tokenData {Object}
   * @param tokenData.token_type {string} - Тип токена
   * @param tokenData.access_token {string} - Токен для авторизации
   * @constructor
   */
  'LOGIN': ({commit, dispatch}, tokenData) => {
    console.log('tokenData in login', tokenData);
    commit('LOADING');
    Vue.http.headers.common['Authorization'] = `${tokenData.token_type} ${tokenData.access_token}`;
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
      );
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
  /**
   * Get user groups
   */
  'GET_USER_GROUPS': ({commit}) => {
    commit('LOADING');
    Vue.http.get(`${process.env.VUE_APP_API_URL}/group`)
      .then(
        res => {
          commit('USER_GROUPS', JSON.parse(res.bodyText).data);
        },
        err => {
          console.log(err);
          commit('ERROR', err.body);
        }
      )
  },
  /**
   * Get user channels
   */
  'GET_USER_CHANNELS': ({commit}) => {
    commit('LOADING');
    Vue.http.get(`${process.env.VUE_APP_API_URL}/channel`)
      .then(
        res => {
          commit('USER_CHANNELS', JSON.parse(res.bodyText).data);
        },
        err => {
          console.log(err);
          commit('ERROR', err.body)
        }
      )
  },
};
