import { io } from './socket.service';

export function sendUserInfo(data) {
    io.emit('userInfo', data);
}