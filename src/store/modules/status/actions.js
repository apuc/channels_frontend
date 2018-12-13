export default {
    'GET_USER_STATUS': async ({commit, dispatch, rootGetters}, userStatus) => {
        commit('SET_STATUS', userStatus)
    }
};
