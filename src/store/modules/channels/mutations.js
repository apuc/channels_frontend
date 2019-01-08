export default {
  'USER_CHANNELS': (state, channels) => {
    state.channels = channels;
  },
  'SET_CHANNEL_DATA': (state, data) => {
    state.channelData = data;
  },
  'SET_CHANNEL_ID': (state, id) => {
    state.channelData.id = id;
  },
  'SET_CHANNEL_TITLE': (state, title) => {
    state.channelData.title = title;
  },
  'SET_CHANNEL_SLUG': (state, slug) => {
    state.channelData.slug = slug;
  },
  'SET_CHANNEL_STATUS': (state, status) => {
    state.channelData.status = status;
  },
  'SET_CHANNEL_USER_SEARCH_RESULTS': (status, users) => {
    status.currentChannelUsers.searchUsers = users;
  },
  /**
   * Добавление id'шников пользователей для создания/редактирования канала
   *
   * @param state
   * @param users {Array}
   */
  'SET_CHANNEL_USER_IDS': (state, users) => {
    let usersArr = [];
    for (let i = 0; i < users.length; i++) {
      usersArr.push(users[i].user_id);
    }
    state.channelData.user_ids = usersArr;
  },
  'SET_CHANNEL_OWNER_ID': (state, owner_id) => {
    state.channelData.owner_id = owner_id;
  },
  'SET_CHANNEL_TYPE': (state, type) => {
    state.channelData.type = type;
  },
  'SET_CHANNEL_PRIVATE': (state, isPrivate) => {
    state.channelData.private = isPrivate;
  },
  'SET_CURRENT_CHANNEL_DATA': (state, data) => {
    state.currentChannelData = data;
  },
  'SET_CHANNEL_ID_TO_EDIT': (state, id) => {
    state.currentChannelData.id = id;
  },
  'SET_CHANNEL_AVATAR_ID': (state, avatar_id) => {
    state.channelData.avatar = avatar_id;
  },
  'SET_CHANNEL_USERS': (state, users) => {
    state.channelUsers = users;
  },
  'SET_CONTACTS_FREE_TO_ADD': (state, contacts) => {
    state.contactsToAdd.users = contacts.filter(contact => {
      return !state.channelUsers.some(user => {
        return contact.user_id === user.user_id;
      });
    });
  },
  'SET_CONTACTS_FREE_TO_ADD_SEARCH': (state, contacts) => {
    state.contactsToAdd.searchUsers = contacts;
  },
  'REMOVE_USER_FROM_CONTACTS_TO_ADD': (state, user_id) => {
    state.contactsToAdd.users = state.contactsToAdd.users.filter(user => user.user_id !== user_id);
    console.log(state.contactsToAdd.users);
  },
  'SET_CHANNEL_ID_TO_DELETE': (state, id) => {
    state.channelToDelete = id;
  },
  'SET_CURRENT_CHANNEL_USERS': (state, users) => {
    state.currentChannelUsers.users = users;
  },
  'REMOVE_CURRENT_CHANNEL_USERS_FROM_STORE': state => {
    state.currentChannelUsers.users = []
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
    const channel = state.channels.find(channel => channel.id === id);
    const groupIndex = channels.indexOf(channel);
    channels.splice(groupIndex, 1);
  },
  'SET_EDITED_CHANNEL_DATA': (state, data) => {
    for (let i = 0; i < state.channels.length; i++) {
      if (state.channels[i].id === data.id) {
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
      id: '',
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
      id: '',
      title: '',
      slug: '',
      status: '',
      user_ids: [],
      owner_id: '',
      type: '',
      private: '',
      avatar: undefined,
    };
    state.channelToDelete = '';
    state.isChannelsLoading = false;
    state.isChannelUsersLoading = true;
    state.imageUploadPersentage = 0;
  }
};
