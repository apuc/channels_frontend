export default {
  'USER_INFO': (state, info) => {
    state.info = info;
  },
  'USER_GROUPS': (state, groups) => {
    state.groups = groups;
  },
  'USER_CHANNELS': (state, channels) => {
    state.channels = channels;
  }
};
