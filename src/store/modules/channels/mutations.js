export default {
  'USER_CHANNELS': (state, channels) => {
    state.channels = channels;
  },
  'SET_CHANNEL_DATA': (state, data) => {
    state.channelData = data;
  },
  'SET_CURRENT_CHANNEL_DATA': (state, data) => {
    state.currentChannelData = data;
  },
  'SET_CHANNEL_AVATAR_ID': (state, avatar_id) => {
    state.channelData.avatar = avatar_id;
  },
  'SET_CHANNEL_ID_TO_DELETE': (state, id) => {
    state.channelToDelete = id;
  },
  'SET_CHANNEL_USERS': (state, users) => {
    state.currentChannelUsers = users;
  }
};
