import Vue from "vue";
import {
    ioSendMessage
} from '../../../services/socket/message.service';
import { formatBytes } from '../../../services/common.service'

export default {
    /**
     * Get channel messages
     */
    'GET_MESSAGES': async ({
        commit,
        dispatch,
        state,
        rootGetters
    },paginate = false) => {
        const currentDateInSeconds = Math.round(Date.now() / 1000);
        const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
        const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));
        
        if (currentDateInSeconds < tokenExpiresIn) {
            const channelId = rootGetters['channels/currentChannelData'].id;
            let url = (paginate === true) ? state.nextPage : `${process.env.VUE_APP_API_URL}/channel/${channelId}/messages`;

            return new Promise((resolve,reject) => {
                Vue.http.get(url)
                .then(
                    res => {
                      commit('SET_MESSAGES',{paginationData:res.body,channelId:channelId});
                       resolve(res) 
                    },
                    err => console.log(err)
                )
            });
            
        } else {
            if (currentDateInSeconds < refreshTokenExpiresIn) {
                await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {
                        root: true
                    })
                    .then(() => {
                        dispatch('GET_MESSAGES');
                    })
            } else {
                commit('modal/SET_MODAL', {name: 'ModalSessionExpired'}, {
                    root: true
                });
            }
        }
    },
  
  /**
   * Отправить сообщение
   * @param rootGetters
   * @param payload
   * @returns {Promise<void>}
   * @constructor
   */
    'SEND_MESSAGE': async ({
        rootGetters
    }, payload) => {
        const { user_id } = rootGetters['user/userData'];
        const attachments = rootGetters['messages/attachments'];
        
        const messageData = {
            channel_id: payload.channelId,
            from: user_id,
            text: payload.text,
            user_id,
            attachments
        };
        
        await ioSendMessage(messageData);
    },

  /**
   * Сообщение пришло
   * @param commit
   * @param message
   * @returns {Promise<void>}
   * @constructor
   */
    'ON_MESSAGE': async ({
        commit,
    }, message) => {
        commit('SET_MESSAGE', message);
    },

  /**
   * Пользователь печатает
   * @param commit
   * @param user
   * @param isTyping
   * @returns {Promise<void>}
   * @constructor
   */
    'ON_TYPING': async ({
        commit
    }, {
        user,
        isTyping,
    }) => {
      if (isTyping) {
        commit('PUSH_TYPING_USER', user);
      } else {
        commit('SLICE_TYPING_USER', user);
      }
  },

  /**
   * 
   * @param commit
   * @returns {Promise<void>}
   * @constructor
   */
    'OFF_TYPING': async ({
        commit,
    }) => {
        commit('OFF_TYPING');
    },

  /**
   * Уведомление
   * @param commit
   * @param channel_id
   * @returns {Promise<void>}
   * @constructor
   */
    'SET_CHANNEL_NOTIFICATION': async ({
        commit,
    }, channel_id) => {
        commit('SET_CHANNEL_NOTIFICATION', channel_id);
    },

  /**
   * Добавление атачмента
   * @param commit
   * @param attachments
   * @returns {Promise<void>}
   * @constructor
   */
    'ADD_ATTACHMENTS': async ({
        commit,
    }, attachments) => {
        for (let i = 0; i < attachments.length; i++) {
          
            const data = new FormData;
            data.append(`attachment`, attachments[i]);
            
            Vue.http.post(`${process.env.VUE_APP_API_URL}/attachment/upload`, data)
                .then(
                    res => {
                      
                        const attachment = {
                            type:res.body.type,
                            options: {
                                name: attachments[i].name,
                                size: formatBytes(attachments[i].size),
                                ...res.body
                            }
                        };
                        
                        commit('ADD_ATTACHMENT', attachment);
                    },
                    err => console.log(err)
                )
        }

    },
  /**
   * Сброс атачментов
   * @param commit
   * @returns {Promise<void>}
   * @constructor
   */
    'CLEAR_ATTACHMENTS': async ({
        commit
    }) => {
        commit('CLEAR_ATTACHMENTS');
    },

  /**
   * Отметить прочитанные
   * @param state
   * @param commit
   * @param rootState
   * @param channelId
   * @returns {Promise<void>}
   * @constructor
   */
    'MARK_READ': async ({state,commit,rootState},channelId) => {
      
      Vue.http.post(`${process.env.VUE_APP_API_URL}/messages/read`,{channel_id:channelId})
        .then(
          res => {
             commit('READ_CHANNEL_MESSAGES',channelId);
             return res;
          },
          err => console.log(err)
        )
    },

  /**
   * Отметить прочитанные в чате
   * @param state
   * @param commit
   * @param rootState
   * @param channelId
   * @returns {Promise<void>}
   * @constructor
   */
  'MARK_READ_CHAT': async ({state,commit,rootState},channelId) => {

    Vue.http.post(`${process.env.VUE_APP_API_URL}/messages/read/chat`,{channel_id:channelId})
      .then(
        res => {
          commit('READ_CHANNEL_MESSAGES',channelId);
          return res;
        },
        err => console.log(err)
      )
  },

  /**
   * Удаление сообщения
   * @param commit
   * @param message_id
   * @returns {Promise<void>}
   * @constructor
   */
  'DELETE_MESSAGE': async ({commit},message_id) => {
      
    Vue.http.delete(`${process.env.VUE_APP_API_URL}/message/${message_id}`)
      .then(
        res => {
          commit('REMOVE_MESSAGE',message_id);
          return res;
        },
        err => console.log(err)
      )
  },

  /**
   * Редактирование сообщения
   * @param commit
   * @param message_id
   * @returns {Promise<void>}
   * @constructor
   */
  'EDIT_MESSAGE': async ({commit,getters},text) => {

    let message = Object.assign({},getters.editMessage);
    message.from = message.from.id;
    message.channel_id = message.channel;
    message.text = text;
    
    Vue.http.put(`${process.env.VUE_APP_API_URL}/message/${message.id}`,message)
      .then(
        res => {
          //console.log(res);
          commit('SET_MESSAGE_TO_EDIT',null);
          commit('UPDATE_MESSAGE',res.body.data);
          return res;
        },
        err => {
          console.log(err)
          commit('SET_MESSAGE_TO_EDIT',null);
        }
      )
  },

  /**
   * Получить мета данные ссылки для превью
   * @param commit
   * @param getters
   * @param text
   * @returns {Promise<void>}
   * @constructor
   */
  'PARSE_LINK': async ({commit,getters},text) => {
    Vue.http.post(`${process.env.VUE_APP_API_URL}/text-link`,{link:text})
      .then(
        res => {
          
          if(!res.body.data){
            return res;
          }
          
          for(let link of res.body.data){
            
            const attachment = {
              type:'link',
              options: {...link}
            };
            
            let exists = getters.attachments.find(el =>el.options.url && el.options.url == attachment.options.url);
            
            if(exists === undefined){
              commit('ADD_ATTACHMENT', attachment);
            }
            
          }
          
          return res;
        },
        err => {
          commit('SET_MESSAGE_TO_EDIT',null);
        }
      )
  }
  
  
};
