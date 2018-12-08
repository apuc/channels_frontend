import { io } from './socket.service';


export function ioStatusOnline(userId) {
    io.emit('user_online', userId)
}

export function statusEventListenerInit() {
    io.on('get_user_status', function (userStatus) {
        console.log(userStatus);
    })
}