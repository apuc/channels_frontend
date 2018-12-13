export default {
    'SET_STATUS': (state, userStatus) => {
        state.status = userStatus.status;
        state.connections = userStatus.connections;
    },
};
