export default {
  'USER_CHANNELS': (state, channels) => {
    state.channels = channels;
  },
  'SET_NEW_CHANNEL_DATA': (state, data) => {
    state.newChannelData = data;
  },
  'SET_CHANNEL_AVATAR_ID': (state, avatar_id) => {
    state.newChannelData.avatar = avatar_id;
  },
  'ADD_CHANNEL': (state, newChannel) => {
    state.channels.push(newChannel);
  },
  'EDITING_CHANNEL': (state, editingChannel) => {
    state.editingChannel = editingChannel;
  },

};
