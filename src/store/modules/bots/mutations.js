 export default {

  'SET_USER_BOTS': (state, bots) => {
    state.botsList = bots;
  },
  
  'SET_CURRENT_BOT': (state, data) =>{
    state.currentBotData.username = data.username;
    state.currentBotData.webhook = data.webhook;
    state.currentBotData.id = data.id;
    state.currentBotData.index = data.index;
  },
  'SET_CURRENT_BOT_NAME': (state, username) =>{
    state.currentBotData.username = username;
  },
  'SET_CURRENT_BOT_WEBHOOK': (state, webhook) =>{
    state.currentBotData.webhook = webhook;
  },
  'SET_CURRENT_BOT_ID': (state, id) =>{
    state.currentBotData.id = id;
  },


  'SET_CREATED_BOT': (state, data) =>{
    state.createdBotData.owner_id = data.owner_id;
    state.createdBotData.name = data.name;
    state.createdBotData.webhook = data.webhook;
  },
   
  'SET_CREATED_BOT_OWNER': (state, owner_id) =>{
    state.createdBotData.owner_id = owner_id;
  },
   
  'SET_CREATED_BOT_NAME': (state, name) =>{
    state.createdBotData.name = name;
  },
   
  'SET_CREATED_BOT_HOOK': (state, hook_url) =>{
    state.createdBotData.webhook = hook_url;
  },

  'ADD_USER_BOT': (state, data) =>{
    state.botsList.push({
      username: data.username,
      webhook: data.webhook,
      id: data.id
    });
  },

  'UPDATE_USER_BOT': (state, data) =>{
    state.botsList[data.index].username = data.username;
    state.botsList[data.index].webhook = data.webhook;
  },

  'DELETE_USER_BOT': (state, bot_id) =>{
    state.botsList = state.botsList.filter(el => el.id != bot_id);
  }
};
