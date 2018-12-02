import { io } from './socket.service';
import store from '../../store/store';


export function ioTyping(username, channelId) {
    io.emit('typing', {username, channelId});
}

export function ioSendMessage(messageData) {
    io.emit('userMessage', messageData)
}

export function messageEventListenerInit() {

    io.on('systemMessage', function (message) {
        console.log('systemMessage', message)
    });

    io.on('userMessage', function (data) {
        store.dispatch('messages/ON_MESSAGE', data);
    });

    io.on('typing', function (username) {
        store.dispatch('messages/TYPING', username)
    })
}