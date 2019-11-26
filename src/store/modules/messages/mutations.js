import channelState from '../channels/channels'
import Vue from "vue";

export default {
  /**
   * Добавить несколько сообщений
   * @param state
   * @param paginationData
   * @param channelId
   * @constructor
   */
  'SET_MESSAGES': (state, {paginationData,channelId}) => {
    
    state.nextPage = paginationData.links.next
    state.currentPage = paginationData.meta.current_page
    state.lastPage = paginationData.meta.last_page
   
    if(state.messages.length < 1 || channelId != state.messages[0].channel){
      state.messages = channelState.state.currentChannelData.type == 'wall' 
        ? paginationData.data 
        : paginationData.data.reverse();
      
      return;
    }

    if(channelState.state.currentChannelData.type == 'wall'){
      state.messages = state.messages.concat(paginationData.data);
      return;
    }
    
    state.messages = paginationData.data.reverse().concat(state.messages);
  },

  /**
   * Сбросить сообщения
   * @param state
   * @returns {Array}
   * @constructor
   */
  'CLEAR_MESSAGES':(state) => state.messages = [],

  /**
   * Добавить 1 сообщение(когда написал или пришло от нода)
   * @param state
   * @param message
   * @constructor
   */
  'SET_MESSAGE': (state, message) => {
    if(message.channel === state.messages[0].channel){
      let channel = channelState.state.currentChannelData;
      
      if(channel.type == 'wall'){
        state.messages.unshift(message);
      }else{
        state.messages.push(message);
      }
    }
  },

  /**
   * Добавить печатающего юзера
   * @param state
   * @param user
   * @constructor
   */
  'PUSH_TYPING_USER': (state, user) => {
    for (let i = 0; i < state.usersTyping.length; i++) {
      if (state.usersTyping[i].id === user.id) return
    }
    state.usersTyping.push(user)
  },

  /**
   * Убрать печатающего юзера
   * @param state
   * @param userObj
   * @returns {*}
   * @constructor
   */
  'SLICE_TYPING_USER': (state, userObj) => state.usersTyping = state.usersTyping.filter(user => user.id !== userObj.id),

  /**
   * Очистить печатающих юзеров
   * @param state
   * @returns {Array}
   * @constructor
   */
  'OFF_TYPING': (state) => state.usersTyping = [],

  /**
   * Добавить уведомление
   * @param state
   * @param data
   * @constructor
   */
  'SET_CHANNEL_NOTIFICATION': (state, data) => {
    
    if(state.notifications[data.channel_id]){
      state.notifications[data.channel_id]+= 1;
      return;
    }

    Vue.set(state.notifications,data.channel_id,data.unread ? data.unread : 1);
  },

  /**
   * Добавить атачмент
   * @param state
   * @param attachment
   * @returns {number}
   * @constructor
   */
  'ADD_ATTACHMENT': (state, attachment) => state.attachments.push(attachment),

  /**
   * Сбросить атачменты
   * @param state
   * @returns {Array}
   * @constructor
   */
  'CLEAR_ATTACHMENTS': (state) => state.attachments = [],

  /**
   * Удалить 1 атачмент
   * @param state
   * @param url
   * @returns {*}
   * @constructor
   */
  'REMOVE_ATTACHMENT': (state, url) => state.attachments = state.attachments.filter(attachment => attachment.options.url !== url),

  /**
   * Убрать уведомления из канала
   * @param state
   * @param channelId
   * @constructor
   */
  'READ_CHANNEL_MESSAGES': (state, channelId) => Vue.delete(state.notifications,channelId),

  /**
   * Удаляет сообщение
   * @param state
   * @param message_id
   * @returns {*}
   * @constructor
   */
  'REMOVE_MESSAGE': (state, message_id) => state.messages = state.messages.filter(el => el.id != message_id),

  /**
   * Изменить сообщение
   * @param state
   * @param message_id
   * @returns {*}
   * @constructor
   */
  'UPDATE_MESSAGE': (state, message) => {
    let index = state.messages.findIndex(el => el.id == message.id) 
    state.messages[index].text = message.text;
  },

  /**
   * Установить сообщение на редактирование
   * @param state
   * @param message
   * @constructor
   */
  'SET_MESSAGE_TO_EDIT': (state, message) => {
    state.message_edit = message;
  },
};
