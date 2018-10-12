import Vue from "vue";

export default {
    /**
     * Логинит с помощью токена
     * @param commit {Object}
     * @constructor
     */
    'GET_USER': async ({commit, dispatch}) => {
        await Vue.http.get(`${process.env.VUE_APP_API_URL}/user`)
            .then(
                res => {
                    commit('USER_INFO', res.body);
                },
                err => {
                    console.log('err login', err);
                }
            )
            .catch(err => console.log('GET_USER catch err: ', err));
    },
    'GET_NAV': (context) => {
        context.dispatch('GET_USER_GROUPS');
        context.dispatch('GET_USER_CHANNELS');
    },
    /**
     * Get user groups
     */
    'GET_USER_GROUPS': async (context) => {
        await Vue.http.get(`${process.env.VUE_APP_API_URL}/group`)
            .then(
                res => {
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
                    context.commit('USER_CHANNELS', res.body.data);
                },
                err => {
                    console.log(err);
                }
            )
    },
};
