export default {
  'LOADING': (state) => {
    state.status = 'loading';
  },
  'SUCCESS_REGISTRATION': (state) => {
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
  'LOGOUT': (state) => {
    state.status = '';
    state.token = ''
  },
};
