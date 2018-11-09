export default {
  'LOADING': state => {
    state.status = 'loading';
  },
  'GETTING_TOKEN_AND_DATA': state => {
    state.gettingTokenAndData = !state.gettingTokenAndData;
  },
  'SUCCESS_REGISTRATION': state => {
    state.status = 'success registration';
  },
  'SUCCESS_TOKEN': (state, token) => {
    state.status = 'success getting token';
    state.token = token;
  },
  'SUCCESS_LOGIN': (state, user) => {
    state.status = 'success login';
    state.user = user;
  },
  'ERROR': (state, error) => {
    state.status = 'error';
    console.log(error);
  },
  'LOGOUT': state => {
    state.status = '';
    state.token = ''
  },
};
