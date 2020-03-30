import socketIo from 'socket.io-client';
import {channelsEventListenerInit} from './channels.service'
import {messageEventListenerInit} from './message.service'
import {statusEventListenerInit} from './status.service'
import {usersEventListenerInit} from './users.service'

export let io = null;

export function connectSocket(token, user_id) {
    return new Promise((resolve, reject) => {

        io = socketIo(process.env.VUE_APP_SOCKET_URL, {query: {token, user_id}}); // пробуем подключится к ноду

        io.on('connect', () => {
            console.log('event_connect')
            socketEventListenerInit();
            resolve(io)
        });

        io.on('connect_error', (error) => {
          console.log('connect_error',error)
          reject(error)
        });

        io.on('connect_timeout', (timeout) => {
          console.log('connect_timeout',timeout)
          reject(timeout)
        });

        io.on('disconnect', (reason) => {
          
          console.log('disconnect',reason)
          
          if (reason === 'io server disconnect') {
            console.log('disconnect_serv',reason)
          }
         
          reject(reason)
        });

        io.on('reconnect', (attemptNumber) => {
          console.log('reconnect',attemptNumber)
          reject(attemptNumber)
        });
        
        io.on('reconnect_attempt', (attemptNumber) => {
          console.log('reconnect_attempt',attemptNumber)
          reject(attemptNumber)
        });
        
        io.on('reconnecting', (attemptNumber) => {
          console.log('reconnecting',attemptNumber)
          reject(attemptNumber)
        });
        
        io.on('reconnect_error', (error) => {
          console.log('reconnect_error',error)
          reject(error)
        });
        
        io.on('reconnect_failed', () => {
          console.log('reconnect_failed')
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

