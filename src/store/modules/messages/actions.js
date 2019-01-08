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
                await dispatch('auth/GET_TOKEN', rootGetters['auth/refreshTokenBody'], {root: true})
                    .then(() => {
                        dispatch('GET_MESSAGES');
                    })
            } else {
                commit('modal/SET_MODAL', 'ModalSessionExpired', {root: true});
            }
        }
    },
    'SEND_MESSAGE': async ({commit, dispatch, rootGetters}, payload) => {
        const {user_id, username, avatar} = rootGetters['user/userData'];
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
        await ioSendMessage(messageData);
    },
    'ON_MESSAGE': async ({commit, dispatch, rootGetters}, message) => {
        commit('SET_MESSAGE', message);
    },
    'ON_TYPING': async ({commit, dispatch, rootGetters}, {user, isTyping}) => {
        if (isTyping) {
            commit('PUSH_TYPING_USER', user);
        } else {
            commit('SLICE_TYPING_USER', user);
        }
    },
    'OFF_TYPING': async ({commit, dispatch, rootGetters})  => {
        commit('OFF_TYPING');
    },

    // Attachments
    'ADD_ATTACHMENTS': async ({commit, dispatch, rootGetters}, attachments) => {
        console.log('Message action ADD_ATTACHMENTS: ', attachments);
        // for (let i = 0; i < attachments.length; i++) {
        //     const data = new FormData;
        //     data.append('attachment', attachments[i]);
        //     // Vue.http.post(`${process.env.VUE_APP_API_URL}`, data)
        //     //     .then(
        //     //         res => {
        //     //             commit('ADD_ATTACHMENT', res.body.data);
        //     //         },
        //     //         err => console.log(err)
        //     //     )
        // }

    },
    'CLEAR_ATTACHMENTS': async ({commit}) => {
        commit('CLEAR_ATTACHMENTS');
    }
};