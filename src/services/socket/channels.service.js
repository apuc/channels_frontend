import { io } from './socket.service';

export function joinChannels(channels) {
    const channelsIds = channels.map(channel => channel.id);
    io.emit('joinChannels', channelsIds);
}
export function joinChannel(channelId) {
    io.emit('joinChannel', channelId);
}


export function channelsEventListenerInit() {

}