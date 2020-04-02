import { io } from './socket.service';
import store from '../../store/store';
import { notificationAudio } from '../../helpers/notifications';

/**
 * Подключиться к нескольким каналам
 * @param channels
 */
export function joinChannels(channels) {
    const channelsIds = channels.map(channel => channel.id);
    
    if(channelsIds.length < 1){
      console.error('No channels to join!')
      return;
    }
    
    io.emit('joinChannels', channelsIds);
}

export function leaveChannels(channels) {
  const channelsIds = channels.map(channel => channel.id);

  if(channelsIds.length < 1){
    console.error('No channels to leave!')
    return;
  }
  
  for(let channel of channelsIds){
    io.emit('leaveChannel', channel);
  }
}

/**
 * Подключиться к 1 каналу
 * @param channelId
 */
export function joinChannel(channelId) {
    io.emit('joinChannel', channelId);
}

/**
 * Отправить событие добавление в кнал
 * @param user_id
 * @param channel_id
 */
export function ioAddTochannel(user_id,channel_id) {

  const data = {
    user_id:user_id,
    channel:store.getters['channels/channels'].find(el=> el.id == channel_id)
  }
  
  io.emit('addToChannel', data);
}

/**
 *Обработать событие добавление в кнал
 */
export function channelsEventListenerInit() {
  io.on('addToChannel', function (channel) {
     joinChannel(channel.id)
     store.commit('channels/ADD_CREATED_CHANNEL',channel)
     notificationAudio.play();
  });
}