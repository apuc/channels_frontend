export default {
  'USER_GROUPS': (state, groups) => {
    state.groups = groups;
  },
  'SET_GROUP_DATA': (state, data) => {
    state.groupData = data;
  },
  'SET_CURRENT_GROUP_DATA': (state, data) => {
    state.currentGroupData = data;
  },
  'SET_GROUP_AVATAR_ID': (state, avatar_id) => {
    state.groupData.avatar = avatar_id;
  },
  'SET_GROUP_ID_TO_DELETE': (state, id) => {
    state.groupToDelete = id;
  },
  'SET_GROUP_ID_FOR_ADDING_CHANNEL': (state, group_id) => {
    state.addingChannelsData.group_id = group_id;
  },
  'SET_CHANNELS_TO_ADD': (state, channels) => {
    state.addingChannelsData.channels = channels;
  },
  'SET_GROUPS_LOADING_FLAG': state => {
    state.isGroupsLoading = !state.isGroupsLoading;
  },
  'ADD_CREATED_GROUP': (state, data) => {
    state.groups.push(data);
  },
  'REMOVE_DELETED_GROUP': (state, id) => {
    const groups = state.groups;
    const group = groups.find(group => group.group_id === id);
    const groupIndex = groups.indexOf(group);
    groups.splice(groupIndex, 1);
  },
  'REMOVE_DELETED_CHANNEL': (state, id) => {
    const groups = state.groups;
    const currentGroup = state.currentGroupData;
    const groupChannels = currentGroup.channels;
    const groupInStore = groups.find(group => group.group_id === currentGroup.group_id);
    const groupIndex = groups.indexOf(groupInStore);
    const channel = groupChannels.find(channel => channel.channel_id === id);
    const channelIndex = groupChannels.indexOf(channel);
    groupChannels.splice(channelIndex, 1);
    groups[groupIndex] = currentGroup;
  },
  'SET_CHANNEL_TO_DELETE': (state, id) => {
    state.channelToDelete = id;
  },
  'SET_EDITED_GROUP_DATA': (state, data) => {
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].group_id === data.group_id) {
        state.groups[i].title = data.title;
        state.groups[i].slug = data.slug;
        state.groups[i].status = data.status;
        state.groups[i].type = data.type;
        state.groups[i].private = data.private;
        state.groups[i].owner_id = data.owner_id;
        state.groups[i].avatar = data.avatar;
        state.groups[i].channels = data.channels;
      }
    }
  },
  'SET_AVATAR_UPLOAD_PROGRESS': (state, percentage) => {
    state.imageUploadPersentage = percentage;
  },
  'SET_DEFAULT_GROUPS_STATE': state => {
    state.groups = [];
    state.currentGroupData = {
      group_id: '',
      title: '',
      slug: '',
      status: '',
      owner_id: '',
      avatar: undefined,
    };
    state.groupData = {
      group_id: '',
      title: '',
      slug: '',
      status: '',
      user_ids: [],
      owner_id: '',
      avatar: undefined,
    };
    state.addingChannelsData = {
      group_id: '',
      channels: [],
    };
    state.groupToDelete = '';
    state.isGroupsLoading = false;
    state.imageUploadPersentage = 0;
  }
};
