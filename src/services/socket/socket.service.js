import socketIo from 'socket.io-client';
import {channelsEventListenerInit, joinChannels, leaveChannels} from './channels.service'
import {messageEventListenerInit} from './message.service'
import {statusEventListenerInit} from './status.service'
import {usersEventListenerInit} from './users.service'
import store from "../../store/store";

export let io = null;

export function connectSocket(token, user_id) {
    return new Promise((resolve, reject) => {

        io = socketIo(process.env.VUE_APP_SOCKET_URL, {query: {token, user_id}}); // пробуем подключится к ноду

        io.on('connect', () => {
            console.log('event_connect')
          
            let channels = store.getters['channels/allChannels'];

            leaveChannels(channels);
            joinChannels(channels);
            socketEventListenerInit();
            resolve(io)
        });

        io.on('connect_error', (error) => {
          console.log('event_connect_error',error)
          reject(error)
        });

        io.on('connect_timeout', (timeout) => {
          console.log('event_connect_timeout',timeout)
          reject(timeout)
        });

        io.on('disconnect', (reason) => {
          console.log('event_disconnect',reason)
          reject(reason)
        });

        io.on('reconnect', (attemptNumber) => {
          console.log('event_reconnect',attemptNumber)
          reject(attemptNumber)
        });
        
        io.on('reconnect_attempt', (attemptNumber) => {
          console.log('event_reconnect_attempt',attemptNumber)
          reject(attemptNumber)
        });
        
        io.on('reconnecting', (attemptNumber) => {
          console.log('event_reconnecting',attemptNumber)
          reject(attemptNumber)
        });
        
        io.on('reconnect_error', (error) => {
          console.log('event_reconnect_error',error)
          reject(error)
        });
        
        io.on('reconnect_failed', () => {
          console.log('event_reconnect_failed')
          reject()
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
    usersEventListenerInit();
}

