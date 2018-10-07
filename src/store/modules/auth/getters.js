export default {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    token: state => state.token,
    userGroups: state => state.groups,
    userChannels: state => state.channels,
};
