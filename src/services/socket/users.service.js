import { io } from './socket.service';
import store from '../../store/store';
import { notificationAudio } from '../../helpers/notifications';

export function ioFriendRequest(request) {
  io.emit('friendRequest', request)
}

export function usersEventListenerInit() {
  io.on('friendRequest', function (requestUser) {
      store.commit('user/ADD_USER_FRIENDSHIP_REQUEST',requestUser);
      notificationAudio.play();
  })
}