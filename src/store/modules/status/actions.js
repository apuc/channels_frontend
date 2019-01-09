export default {
    'GET_USER_STATUS': async ({
        commit,
    }, userStatus) => {
        commit('SET_STATUS', userStatus)
    }
};