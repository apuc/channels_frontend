export default {
  'USER_CHANNELS': (state, channels) => {
    state.channels = channels;
  },
  'SET_CHANNEL_DATA': (state, data) => {
    state.channelInfo = data;
  },
  'SET_CHANNEL_AVATAR_ID': (state, avatar_id) => {
    state.channelInfo.avatar = avatar_id;
  },
  'ADD_CHANNEL': (state, newChannel) => {
    state.channels.push(newChannel);
  },
  'SET_CHANNEL_ID': (state, id) => {
    state.channelId = id;
  }
};
