import Vue from "vue";
import {ioSendMessage} from '../../../services/socket/message.service'

export default {
  'GET_MESSAGES': async ({commit, dispatch, rootGetters}) => {
    const channelId = rootGetters['channels/channelId'];
    await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel/${channelId}/messages`)
      .then(
        res => {
          commit('SET_MESSAGES', res.body.data);
        },
        err => console.log(err)
      )
  },
  'SEND_MESSAGE': async ({commit, dispatch, rootGetters}, payload) => {
    const {user_id, username, avatar} = rootGetters['user/info'];
    const message = {
      user: {
        username,
        avatar,
        slug: ''
      },
      channel_id: payload.channelId,
      from: user_id,
      text: payload.text
    };
    await ioSendMessage(message, payload.channelId);
    commit('SET_MESSAGE', message)
  },
  'ON_MESSAGE': async ({commit, dispatch, rootGetters}, message) => commit('SET_MESSAGE', message)
};