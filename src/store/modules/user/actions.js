import Vue from "vue";
import router from "../../../routers/router";
import store from "../../../store/store";

export default {
    /**
     * Логинит с помощью токена
     * @param commit {Object}
     * @constructor
     */
    'GET_USER': async ({commit, dispatch}) => {
        await Vue.http.get(`${process.env.VUE_APP_API_URL}/user`)
            .then(
                async res => {
                    await commit('USER_INFO', res.body);
                    console.log('res GET_USER', res);
                    console.log('store', store.state);
                    return res
                },
                err => {
                    console.log('err login', err);
                }
            )
            .catch(err => console.log('GET_USER catch err: ', err));
    },
    'GET_NAV': async (context) => {
        await context.dispatch('GET_USER_GROUPS');
        await context.dispatch('GET_USER_CHANNELS');
    },
    /**
     * Get user groups
     */
    'GET_USER_GROUPS': async (context) => {
        await Vue.http.get(`${process.env.VUE_APP_API_URL}/group`)
            .then(
                res => {
                    console.log('GET_USER_GROUPS', res);
                    context.commit('USER_GROUPS', res.body.data);
                },
                err => {
                    console.log(err);
                }
            )
    },
    /**
     * Get user channels
     */
    'GET_USER_CHANNELS': async (context) => {
        await Vue.http.get(`${process.env.VUE_APP_API_URL}/channel`)
            .then(
                res => {
                    console.log('GET_USER_CHANNELS', res);
                    context.commit('USER_CHANNELS', res.body.data);
                },
                err => {
                    console.log(err);
                }
            )
    },
};
