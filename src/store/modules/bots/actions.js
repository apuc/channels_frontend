import Vue from 'vue';
import router from '../../../routers/router';

export default {

  'GET_USER_BOTS': async ({commit}) => {
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}/bot`)
      .then(
        async res => {
          const data = res.body.data;
          commit('SET_USER_BOTS', data);
          return data;
        },
        err => console.log('err login', err)
      )
      .catch(error => console.log('GET_BOTS: ', error));
  },

  'CREATE_BOT': async ({commit, getters}) => {
    return new Promise(((resolve, reject) => {
      Vue.http.post(`${process.env.VUE_APP_API_URL}/bot`, {
        owner_id: getters.createdBotData.owner_id,
        name: getters.createdBotData.name,
        webhook: getters.createdBotData.webhook
      })
        .then(
          async res => {
            const botData = res.body.data;
            commit('ADD_USER_BOT', botData);
            commit('modal/DELETE_MODAL', null, {root: true});
            resolve(botData);
          },
          err => reject(err)
        )
        .catch(error => console.log('CREATE_BOT', error))
    }));
  },
  
  'UPDATE_BOT': async ({commit, getters}) => {
    return new Promise(((resolve, reject) => {
      Vue.http.put(`${process.env.VUE_APP_API_URL}/bot/${getters.currentBotData.id}`,{
        username: getters.currentBotData.username,
      })
        .then(
          async res => {
            commit('UPDATE_USER_BOT', {
              username: res.body.data.username,
              webhook: getters.currentBotData.webhook,//res.body.data.webhook
              index: getters.currentBotData.index
            });
            resolve(res);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => console.log('UPDATE_BOT', error))
    }));
  },


  'DELETE_BOT': async ({commit,getters}) => {
     return await Vue.http.delete(`${process.env.VUE_APP_API_URL}/bot/${getters.currentBotData.id}`)
        .then(
          res => {
            commit('DELETE_USER_BOT', getters.currentBotData.id);
            commit('modal/DELETE_MODAL', null, {root: true});
            return res;
          },
          err => console.log(err)
        )
        .catch(error => console.log('DELETE_BOT: ', error))
  },
}