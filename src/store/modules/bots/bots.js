import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  botsList: [],

  currentBotData: {
    username: "",
    webhook:"",
    id:""
  },

  createdBotData: {
    owner_id: "",
    name: "",
    webhook: ""
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};