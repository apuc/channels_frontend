import { io } from './socket.service';
import store from '../../store/store';


export function ioStatusOnline(userId) {
    io.emit('user_online', userId)
}

export function ioGetUserStatus(userId) {
    console.log(123);
    io.emit('get_user_status', userId);
}

export function statusEventListenerInit() {
    io.on('get_user_status', function (userStatus) {
        store.dispatch('status/GET_USER_STATUS', userStatus);
    })
}