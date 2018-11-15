export default {
  'SET_USER_INFO': (state, info) => {
    state.info = info;
  },
  'SET_CURRENT_USER_DATA': (state, data) => {
    state.currentUserInfo = data;
  },
  'SET_USER_AVATAR_ID': (state, avatar_id) => {
    state.info.avatar = avatar_id;
  },
};
