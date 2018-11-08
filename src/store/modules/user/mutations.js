export default {
  'SET_USER_INFO': (state, info) => {
    state.info = info;
  },
  'SET_CURRENT_USER_DATA': (state, data) => {
    state.currentUserInfo = data;
  }
};
