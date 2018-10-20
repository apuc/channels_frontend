import { io } from './socket.service';

export function typing(user, channelId) {
    io.emit('typing', {user, channelId});
}

export function sendMessage(message, channelId) {
    io.emit('userMessage', {message, channelId})
}

export function messageEventListenerInit() {
    io.on('systemMessage', function (message) {
        console.log('systemMessage', message)
    });

    io.on('userMessage', function (data) {
        console.log('userMessage', data)
    })
}