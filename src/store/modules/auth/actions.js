import Vue from 'vue'
import router from '../../../routers/router';

export default {
  /**
   * Register user
   *
   * @param userData {Object}
   * @param userData.email* {String} - Email который пользователь указал при регистрации.
   * @param userData.password* {String} - пароль пользователя.
   * @param userData.password_confirmation* {String} - подтверждение пароля пользователя.
   * @param userData.username {String} - имя, которое будет отображаться на сайте.
   * @return status 201 - пользователь добавлен.
   * @return status 500 - ошибка добавления пользователя.
   */
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
   * Get token and log in user
   *
   * @param userData {Object}
   * @param userData.grant_type*{String} - "password".
   * @param userData.client_id*{String} - идинтификатор клиента, генерируется по запросу.
   * @param userData.client_secret*{String} - ключ клиента, генерируется по запросу.
   * @param userData.username*{String} - email пользователя.
   * @return status 401 - Unauthorized
   * @return status 200 - OK
   */
  'GET_TOKEN': ({commit, dispatch}, userData) => {
    commit('LOADING');
    Vue.http.post(`${process.env.VUE_APP_API_URL}/oauth/token`, userData)
      .then(
        res => {
          const currentDateInSeconds = Math.round(Date.now());
          const tokenExpiresIn = Number(currentDateInSeconds )+ Number(res.body.expires_in);

          localStorage.setItem('access_token', res.body.access_token);
          localStorage.setItem('refresh_token', res.body.refresh_token);
          // time when token expires in seconds minus 5 mins. in local storage should be a string
          localStorage.setItem('expires_in', Number(tokenExpiresIn) - 300 + '');
          commit('SUCCESS_TOKEN', res.body.access_token);
          Vue.http.headers.common['Authorization'] = `Bearer ${res.body.access_token}`;
          dispatch('user/GET_USER', res.body.access_token, {root: true})
            .then(() => router.push('/'));
        },
        err => {
          console.log('err from vue resource', err);
          commit('ERROR', err.body);
        }
      )
      .catch(err => console.log('GET_TOKEN catch err: ', err));
  },

  /**
   * Delete token from storage
   */
  'LOGOUT': ({commit}) => {
    commit('LOGOUT');
    localStorage.removeItem('access_token'); // clear your user's token from local storage
    localStorage.removeItem('refresh_token');
  },
};
