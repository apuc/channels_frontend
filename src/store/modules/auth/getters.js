export default {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  token: state => state.token,
  refreshTokenBody: state => state.refreshTokenBody,
  gettingTokenAndData: state => state.gettingTokenAndData,
  isWrongData: state => state.isWrongData,
};
