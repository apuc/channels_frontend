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
  'REGISTRATION': ({commit,}, userData) => {
    commit('LOADING');
    return new Promise((resolve,reject)=>{
      Vue.http.post(`${process.env.VUE_APP_API_URL}/registration`, userData)
        .then(
          res => {
            commit('SUCCESS_REGISTRATION');
            resolve(res)
          },
          err => {
            commit('ERROR', err.body);
            reject(err)
          }
        )
        // .catch(err => {
        //   return new Promise((resolve,reject) => reject(err));
        // });
    });
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
  'GET_TOKEN': async ({
    commit,
  }, userData) => {
    commit('LOADING');
    await Vue.http.post(`${process.env.VUE_APP_API_URL}/oauth/token`, userData)
      .then(
        async res => {
            const currentDateInSeconds = Math.round(Date.now() / 1000);
            const tokenExpiresIn = Number(currentDateInSeconds) + Number(res.body.expires_in) - 300;
            const refreshTokenExpiresIn = Number(currentDateInSeconds) + Number(res.body.expires_in) * 2 - 300;

            await localStorage.setItem('access_token', res.body.access_token);
            await localStorage.setItem('refresh_token', res.body.refresh_token);
            await localStorage.setItem('T_expires_at', `${tokenExpiresIn}`);
            await localStorage.setItem('RT_expires_at', `${refreshTokenExpiresIn}`);

            commit('SET_IS_AUTH_DATA_RIGHT', false);
            commit('SET_TOKEN', res.body.access_token);
            commit('SET_REFRESH_TOKEN', res.body.refresh_token);
            Vue.http.headers.common['Authorization'] = `Bearer ${res.body.access_token}`;
          },
          async err => {
            console.log('err from vue resource', err);
            if (err.body.error === 'invalid_credentials') {
              commit('SET_IS_AUTH_DATA_RIGHT', true);
            }
            commit('ERROR', err.body);
          }
      )
      .catch(err => console.log('GET_TOKEN catch err: ', err));
  },
  /**
   * Delete token from storage
   */
  'LOGOUT': ({
    commit
  }) => {
    commit('user/SET_DEFAULT_USER_STATE', null, {
      root: true
    });
    commit('modal/SET_DEFAULT_MODAL_STATE', null, {
      root: true
    });
    commit('groups/SET_DEFAULT_GROUPS_STATE', null, {
      root: true
    });
    commit('channels/SET_DEFAULT_CHANNELS_STATE', null, {
      root: true
    });
    commit('messages/SET_MESSAGES', [], {
      root: true
    });
    commit('chat/SET_CHAT_DEFAULT_STATE', null, {
      root: true
    });
    commit('LOGOUT');
    localStorage.clear();
    commit('SET_TOKEN', '');
    commit('SET_REFRESH_TOKEN', '');
    router.push('/login');
  },
};