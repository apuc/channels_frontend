import Vue from "vue";
import {
    ioSendMessage
} from '../../../services/socket/message.service';
import { formatBytes } from '../../../services/common.service'

export default {
    /**
     * Get channel messages
     */
    'GET_MESSAGES': async ({
        commit,
        dispatch,
        rootGetters
    }) => {
        const currentDateInSeconds = Math.round(Date.now() / 1000);
        const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
        const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));

        if (currentDateInSeconds < tokenExpiresIn) {
            const channelId = rootGetters['channels/currentChannelData'].id;
            await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel/${channelId}/messages`)
                .then(
                    res => {
                        commit('SET_MESSAGES', res.body.data);
                    },
                    err => console.log(err)
                )
        } else {
            if (currentDateInSeconds < refreshTokenExpiresIn) {
                await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {
                        root: true
                    })
                    .then(() => {
                        dispatch('GET_MESSAGES');
                    })
            } else {
                commit('modal/SET_MODAL', {name: 'ModalSessionExpired'}, {
                    root: true
                });
            }
        }
    },
    'SEND_MESSAGE': async ({
        rootGetters
    }, payload) => {
        const { user_id } = rootGetters['user/userData'];
        const attachments = rootGetters['messages/attachments'];

        const messageData = {
            channel_id: payload.channelId,
            from: user_id,
            text: payload.text,
            user_id,
            attachments
        };
        await ioSendMessage(messageData);
    },
    'ON_MESSAGE': async ({
        commit,
    }, message) => {
        commit('SET_MESSAGE', message);
    },
    'ON_TYPING': async ({
        commit,
    }, {
        user,
        isTyping
    }) => {
        if (isTyping) {
            commit('PUSH_TYPING_USER', user);
        } else {
            commit('SLICE_TYPING_USER', user);
        }
    },
    'OFF_TYPING': async ({
        commit,
    }) => {
        commit('OFF_TYPING');
    },
    'SET_CHANNEL_NOTIFICATION': async ({
        commit,
    }, channel_id) => {
        commit('SET_CHANNEL_NOTIFICATION', channel_id);
    },

    // Attachments
    'ADD_ATTACHMENTS': async ({
        commit,
    }, attachments) => {
        console.log('Message action ADD_ATTACHMENTS: ', attachments);
        for (let i = 0; i < attachments.length; i++) {
            const data = new FormData;
            data.append(`attachment`, attachments[i]);
            Vue.http.post(`${process.env.VUE_APP_API_URL}/attachment/upload`, data)
                .then(
                    res => {
                        const {type, ...other} = res.body;
                        console.log(type)
                        const attachment = {
                            type: type,
                            options: {
                                name: attachments[i].name,
                                size: formatBytes(attachments[i].size),
                                ...other
                            }
                        };
                        commit('ADD_ATTACHMENT', attachment);
                    },
                    err => console.log(err)
                )
        }

    },
    'CLEAR_ATTACHMENTS': async ({
        commit
    }) => {
        commit('CLEAR_ATTACHMENTS');
    }
};
