import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  messages: [],
  usersTyping: [],
  attachments: [],
  notifications: {},
  
  nextPage:null,
  currentPage:1,
  lastPage:2,
  
  message_edit:null,
};

export default {
  state,
  getters,
  actions,
  mutations
};
