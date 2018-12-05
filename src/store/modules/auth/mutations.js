export default {
  'LOADING': state => {
    state.status = 'loading';
  },
  'GETTING_TOKEN_AND_DATA': state => {
    state.gettingTokenAndData = !state.gettingTokenAndData;
  },
  'SET_TOKEN': (state, token) => {
    state.status = 'success getting token';
    state.token = token;
  },
  'SET_REFRESH_TOKEN': (state, refreshToken) => {
    state.refreshTokenBody.refresh_token = refreshToken;
  },
  'SUCCESS_REGISTRATION': state => {
    state.status = 'success registration';
  },
  'SUCCESS_LOGIN': (state, user) => {
    state.status = 'success login';
    state.user = user;
  },
  /**
   * @param isWrongData
   */
  'SET_IS_AUTH_DATA_RIGHT': (state, isWrongData) => {
    state.isWrongData = isWrongData;
  },
  'ERROR': (state, error) => {
    state.status = error;
    console.log(error);
  },
  'LOGOUT': state => {
    state.status = '';
    state.token = ''
  },
};
