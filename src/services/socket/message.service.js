import { io } from './socket.service';
import store from '../../store/store';
import { notificationAudio } from '../../helpers/notifications';

/**
 * Отправить что кто-то печатает
 * @param user
 * @param channelId
 * @param isTyping
 */
export function ioTyping({user, channelId, isTyping}) {
    io.emit('typing', { user, channelId, isTyping});
}

/**
 * Отправить сообщение
 * @param messageData
 */
export function ioSendMessage(messageData) {
    io.emit('userMessage', messageData);
    io.emit('messageNotification', {
      channel_id:messageData.channel_id,
      from:messageData.from,
      notification_data:{
        body:messageData.text,
        title:store.getters['channels/currentChannelData'].title 
      }
    });
}

export function messageEventListenerInit() {

    io.on('systemMessage', function (message) {
        console.log('systemMessage', message)
    });

  /**
   * Сообщение пришло
   */
    io.on('userMessage', function (data) {
          store.dispatch('messages/ON_MESSAGE', data);
    });

  /**
   * Пришло что кто-то печатает
   */
    io.on('typing', function ({user, isTyping,channelId}) {
      if(store.getters['channels/currentChannelData'].id === channelId){
        store.dispatch('messages/ON_TYPING', {user, isTyping})
      }
    });

  /**
   * Уведомление пришло
   */
  io.on('messageNotification', function (data) {
        if(store.getters['user/userData'].user_id !== data.from){
          
          if(store.getters['channels/currentChannelData'].id != data.channel_id){
            store.dispatch('messages/SET_CHANNEL_NOTIFICATION', data);
          }
          
          notificationAudio.play();
        }
    })
}