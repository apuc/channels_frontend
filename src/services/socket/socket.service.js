import socketIo from 'socket.io-client';

export let io = null;

export function connectSocket(token) {
    return new Promise((resolve, reject) => {

        io = socketIo(process.env.VUE_APP_SOCKET_URL, {query: {token: token}}); // пробуем подключится к ноду

        io.on('connect', () => {
            resolve(io)
        });
        io.on('error', (error) => {
            reject(error)
        });
    });
}

