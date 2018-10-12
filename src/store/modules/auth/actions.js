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
    Vue.http.post(`${process.env.VUE_APP_API_URL}/oauth/token`, userData)
      .then(
        res => {
          localStorage.setItem('access_token', res.body.access_token);
          localStorage.setItem('refresh_token', res.body.refresh_token);
          commit('SUCCESS_TOKEN', res.body.access_token);
          Vue.http.headers.common['Authorization'] = `Bearer ${res.body.access_token}`;
          dispatch('user/GET_USER', res.body.access_token, {root: true}).then(() => {
            router.push('/')
          });
        },
        err => {
          console.log('err from vue resource', err);
          commit('ERROR', err.body);
        }
      )
      .catch(err => console.log('GET_TOKEN catch err: ', err));
  },

  /**
   * Delete token
   * @param commit
   * @constructor
   */
  'LOGOUT': ({commit}) => {
    commit('LOGOUT');
    localStorage.removeItem('access_token'); // clear your user's token from localstorage
    localStorage.removeItem('refresh_token');
  },
};
