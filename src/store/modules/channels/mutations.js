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
  },
  'REMOVE_USERS_FROM_STORE': state => {
    state.currentChannelUsers = []
  },
  'SET_CHANNELS_LOADING_FLAG': state => {
    state.isChannelsLoading = !state.isChannelsLoading;
  },
  'SET_CHANNEL_USERS_LOADING': state => {
    state.isChannelUsersLoading = true;
  },
  'SET_CHANNEL_USERS_LOADED': state => {
    state.isChannelUsersLoading = false;
  },
  'SET_DEFAULT_CHANNELS_STATE': state => {
    state.channels = [];
    state.currentChannelData = {
      channel_id: '',
      title: '',
      slug: '',
      status: '',
      user_count: '',
      type: '',
      private: '',
      avatar: undefined,
    };
    state.channelData = {
      channel_id: '',
      title: '',
      slug: '',
      status: '',
      user_ids: [],
      type: '',
      private: '',
      avatar: undefined,
    };
    state.currentChannelUsers = [];
    state.channelToDelete = '';
    state.isChannelsLoading = false;
    state.isChannelUsersLoading = true;
  }
};
