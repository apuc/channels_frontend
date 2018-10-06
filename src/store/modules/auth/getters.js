export default {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  userGroups: state => state.groups,
  userChannels: state => state.channels,
};
