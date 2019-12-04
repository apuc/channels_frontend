import { io } from './socket.service';
import store from '../../store/store';
import { notificationAudio } from '../../helpers/notifications';

export function joinChannels(channels) {
    const channelsIds = channels.map(channel => channel.id);
    io.emit('joinChannels', channelsIds);
}

export function joinChannel(channelId) {
    io.emit('joinChannel', channelId);
}

export function ioAddTochannel(user_id,channel_id) {

  const data = {
    user_id:user_id,
    channel:store.getters['channels/channels'].find(el=> el.id == channel_id)
  }
  
  io.emit('addToChannel', data);
}

export function channelsEventListenerInit() {
  io.on('addToChannel', function (channel) {
     store.commit('channels/ADD_CREATED_CHANNEL',channel)
     notificationAudio.play();
  });
}