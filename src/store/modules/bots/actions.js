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
        /*Как же, не нужна вторая строка.
        В ответе от сервера никакого hook_url и в помине нет,
        но для создания бота он обязателен. То есть,
        если убрать webhook - ответ будет пустым, убрать hook_url - сервер тупо пошлёт. 
        А прописывать каждый раз https для тестирования мне было просто влом 
        */
        //hook_url: "https://"+getters.createdBotData.hook_url,
        /*Есть подозрения, что поменялись настройки сервера - начал принимать пустой hook_url*/
        webhook: getters.createdBotData.hook_url
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


  /*Изменение бота*/
  /*По ТЗ должно быть два изменяемых поля: имя и webhook,
  но изменение webhook запрещено со стороны сервера*/
  'UPDATE_BOT': async ({commit, getters}) => {
    return new Promise(((resolve, reject) => {
      Vue.http.put(`${process.env.VUE_APP_API_URL}/bot/${getters.currentBotData.id}`,{
        username: getters.currentBotData.username,
        /*hook_url: getters.currentBotData.webhook,
        webhook: getters.currentBotData.webhook*/
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

//Сделано как в интеграциях, но сильно сомневаюсь, что заработает - API не выдали, взято наугад.
//Геттер и мутации в каналы добавил
  'CHANNEL_ADD_BOT':({commit},payload) => {
    return new Promise((resolve,reject)=>{
      Vue.http.post(`${process.env.VUE_APP_API_URL}/channels/${payload.channel_id}/bots`, payload)
        .then(
          res => {
            commit('channels/ADD_CHANNEL_BOT',res.body.data,{root:true})
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
    });
  },

 
}