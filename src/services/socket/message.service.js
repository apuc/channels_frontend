import { io } from './socket.service';

export function typing(user, channelId) {
    io.emit('typing', {user, channelId});
}

export function sendMessage(message, channelId) {
    console.log(message)
    console.log(channelId)
    io.emit('message', {message, channelId})
}