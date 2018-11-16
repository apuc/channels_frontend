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
  'SET_DEFAULT_GROUPS_STATE': (state, data) => {
    state.groups = [];
    state.currentGroupData = {
      group_id: '',
      title: '',
      slug: '',
      status: '',
      avatar: undefined,
    };
    state.groupData = {
      group_id: '',
      title: '',
      slug: '',
      status: '',
      user_ids: [],
      avatar: undefined,
    };
    state.addingChannelsData = {
      group_id: '',
      channels: [],
    };
    state.groupToDelete = '';
    state.isGroupsLoading = false;
  }
};
