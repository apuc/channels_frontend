import { io } from './socket.service';

export function sendUserInfo(data) {
    console.log(data)
    io.emit('userInfo', data);
}


export function userEventListenerInit() {

}