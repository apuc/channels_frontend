import { io } from './socket.service';
import store from '../../store/store';


export function ioTyping(user, channelId) {
    io.emit('typing', {user, channelId});
}

export function ioSendMessage(message, channelId) {
    io.emit('userMessage', {message, channelId})
}

export function messageEventListenerInit() {

    io.on('systemMessage', function (message) {
        console.log('systemMessage', message)
    });

    io.on('userMessage', function (data) {
        console.log('new message', data)
        // store.dispatch('messages/ON_MESSAGE', data)
    });
}