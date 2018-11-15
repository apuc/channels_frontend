import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  groups: [],
  currentGroupData: {
    group_id: '',
    title: '',
    slug: '',
    status: '',
    avatar: undefined,
  },
  groupData: {
    group_id: '',
    title: '',
    slug: '',
    status: '',
    user_ids: [],
    avatar: undefined,
  },
  addingChannelsData: {
    group_id: '',
    channels: [],
  },
  groupToDelete: '',
};

export default {
  state,
  getters,
  actions,
  mutations
};
