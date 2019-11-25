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
        console.log('Message action ADD_ATTACHMENTS: ', attachments);
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

    'MARK_READ': async ({state,commit,rootState},channelId) => {
      
      let ids = state.messages.filter(m => {
       return m.read == 0 && m.from.id != rootState.user.userData.user_id; 
      }).map(el => el.id)

      commit('READ_CHANNEL_MESSAGES',channelId);
      
      if(ids.length<1){
        return; 
      }
      
      Vue.http.post(`${process.env.VUE_APP_API_URL}/messages/read`,{message_ids:ids})
        .then(
          res => {
             return res;
          },
          err => console.log(err)
        )
  }
};
