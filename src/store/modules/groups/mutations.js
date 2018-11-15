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
  }
};
