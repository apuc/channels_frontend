import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  botsList: [],

  currentBotData: {
    username: "",
    webhook:"",
    index:"",
    id:""
  },

  createdBotData: {
    owner_id: "",
    name: "",
    hook_url: ""
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};