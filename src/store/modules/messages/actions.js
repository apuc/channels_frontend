import Vue from "vue";
import {ioSendMessage} from '../../../services/socket/message.service';

export default {
  /**
   * Get channel messages
   */
  'GET_MESSAGES': async ({commit, dispatch, rootGetters}) => {
    const currentDateInSeconds = Math.round(Date.now() / 1000);
    const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
    const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

    if (currentDateInSeconds < tokenExpiresIn) {
      const channelId = rootGetters['channels/currentChannelData'].channel_id;
      await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel/${channelId}/messages`)
        .then(
          res => {
            // console.log(res.body.data);
            commit('SET_MESSAGES', res.body.data);
          },
          err => console.log(err)
        )
    } else {
      if (currentDateInSeconds < refreshTokenExpiresIn) {
        await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
          .then(() => {
            dispatch('GET_MESSAGES');
          })
      } else {
        commit('modal/SET_MODAL', 'logout', {root: true});
      }
    }
  },
  'SEND_MESSAGE': async ({commit, dispatch, rootGetters}, payload) => {
    const {user_id, username, avatar} = rootGetters['user/info'];
    const messageData = {
      user: {
        username,
        avatar,
        slug: ''
      },
      channel_id: payload.channelId,
      from: user_id,
      text: payload.text,
      user_id
    };
    console.log('messages/action')
    await ioSendMessage(messageData);
  },
  'ON_MESSAGE': async ({commit, dispatch, rootGetters}, message) => commit('SET_MESSAGE', message)
};