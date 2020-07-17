import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  
  //каналы которые без группы
  channels: [],
  
  //все каналы юзера
  allChannels:[],
  
  currentChannelData: {
    id: '',
    title: '',
    slug: '',
    status: '',
    count: '',
    owner_id: '',
    type: '',
    private: '',
    avatar: undefined,
  },
  
  channelData: {
    id: undefined,
    title: '',
    slug: '',
    status: '',
    user_ids: [],
    owner_id: '',
    type: '',
    private: '',
    avatar: undefined,
  },
  
  currentChannelUsers: {
    users: [],
    searchUsers: [],
  },
  
  channelIntegrations:[],
  channelMeetings: [],
  channelBots:[],
  
  contactsToAdd: {
    users: [],
    searchUsers: [],
    channelId: null
  },
  
  channelUsers: [],
  channelToDelete: '',
  isChannelLoading:false,
  isChannelsLoading: false,
  isChannelUsersLoading: true,
  imageUploadPercentage: 0,

  channelInfoIsOpened: false,
};

export default {
  state,
  getters,
  actions,
  mutations,
};