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
  'SET_CURRENT_CHANNEL_USERS': (state, users) => {
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
  'ADD_CREATED_CHANNEL': (state, data) => {
    state.channels.push(data);
  },
  'REMOVE_DELETED_CHANNEL_FROM_STORE': (state, id) => {
    const channels = state.channels;
    const channel = state.channels.find(channel => channel.channel_id === id);
    const groupIndex = channels.indexOf(channel);
    channels.splice(groupIndex, 1);
  },
  'SET_CHANNEL_USER_IDS': (state, user_ids) => {
    state.channelData.user_ids = user_ids;
  },
  'SET_EDITED_CHANNEL_DATA': (state, data) => {
    for (let i = 0; i < state.channels.length; i++) {
      if (state.channels[i].channel_id === data.channel_id) {
        state.channels[i].title = data.title;
        state.channels[i].slug = data.slug;
        state.channels[i].status = data.status;
        state.channels[i].user_ids = data.user_ids;
        state.channels[i].type = data.type;
        state.channels[i].private = data.private;
        state.channels[i].avatar = data.avatar;
        state.channels[i].owner_id = data.owner_id;
      }
    }
  },
  'SET_AVATAR_UPLOAD_PROGRESS': (state, percentage) => {
    state.imageUploadPersentage = percentage;
  },
  'SET_DEFAULT_CHANNELS_STATE': state => {
    state.channels = [];
    state.currentChannelData = {
      channel_id: '',
      title: '',
      slug: '',
      status: '',
      user_count: '',
      owner_id: '',
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
      owner_id: '',
      type: '',
      private: '',
      avatar: undefined,
    };
    state.currentChannelUsers = [];
    state.channelToDelete = '';
    state.isChannelsLoading = false;
    state.isChannelUsersLoading = true;
    state.imageUploadPersentage = 0;
  }
};
