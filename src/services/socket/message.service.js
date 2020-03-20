import { io } from './socket.service';
import store from '../../store/store';
import { notificationAudio } from '../../helpers/notifications';

export function ioTyping({user, channelId, isTyping}) {
    io.emit('typing', { user, channelId, isTyping});
}

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

    io.on('userMessage', function (data) {
        console.log('Сообщение пришло',data);
        store.dispatch('messages/ON_MESSAGE', data);
    });

    io.on('typing', function ({user, isTyping,channelId}) {
      if(store.getters['channels/currentChannelData'].id === channelId){
        store.dispatch('messages/ON_TYPING', {user, isTyping})
      }
    });

    io.on('messageNotification', function (data) {
        if(store.getters['user/userData'].user_id !== data.from){
          
          if(store.getters['channels/currentChannelData'].id != data.channel_id){
            store.dispatch('messages/SET_CHANNEL_NOTIFICATION', data);
          }
          
          notificationAudio.play();
        }
    })
}