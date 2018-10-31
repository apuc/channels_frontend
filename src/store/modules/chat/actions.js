import Vue from "vue";

export default {
    'GET_MESSAGES': async ({commit, dispatch}, payload) => {
        await Vue.http.get(`${process.env.VUE_APP_API_URL}/messages`)
            .then(
                res => {
                    commit('SET_MESSAGES', res.body);
                },
                err => {
                    console.log('err login', err);
                }
            )
            .catch(err => console.log('GET_MESSAGES catch err: ', err));
    },
};
