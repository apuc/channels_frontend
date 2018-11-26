import { io } from './socket.service';
import store from '../../store/store';


export function ioTyping(user, channelId) {
    io.emit('typing', {user, channelId});
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
}