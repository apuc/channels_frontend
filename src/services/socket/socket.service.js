import socketIo from 'socket.io-client';
import {channelsEventListenerInit} from './channels.service'
import {messageEventListenerInit} from './message.service'
import {statusEventListenerInit} from './status.service'

export let io = null;

export function connectSocket(token, user_id) {
    return new Promise((resolve, reject) => {

        io = socketIo('/', {query: {token, user_id}}); // пробуем подключится к ноду

        io.on('connect', () => {
            socketEventListenerInit();
            resolve(io)
        });
        io.on('error', (error) => {
            reject(error)
        });
    });
}

function socketEventListenerInit() {
    channelsEventListenerInit();
    messageEventListenerInit();
    statusEventListenerInit();
}

