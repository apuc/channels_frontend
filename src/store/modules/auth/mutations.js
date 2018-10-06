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
    console.log(state)
  },
  'ERROR': (state, error) => {
    state.status = 'error';
    console.log(error);
  },
  'LOGOUT': (state) => {
    state.status = '';
    state.token = ''
  },
  'USER_GROUPS': (state, groups) => {
    state.userGroups = groups;
  },
  'USER_CHANNELS': (state, channels) => {
    state.userChannels= channels;
  }
};
