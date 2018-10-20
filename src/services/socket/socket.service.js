import socketIo from 'socket.io-client';
import {channelsEventListenerInit} from './channels.service'
import {messageEventListenerInit} from './message.service'
import {userEventListenerInit} from './user.service'

export let io = null;

export function connectSocket(token) {
    return new Promise((resolve, reject) => {

        io = socketIo(process.env.VUE_APP_SOCKET_URL, {query: {token: token}}); // пробуем подключится к ноду

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
    userEventListenerInit();
}

