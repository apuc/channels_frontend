import channelState from '../channels/channels'
import Vue from "vue";

export default {
  'SET_MESSAGES': (state, {paginationData,channelId}) => {
    
    state.nextPage = paginationData.links.next
    state.currentPage = paginationData.meta.current_page
    state.lastPage = paginationData.meta.last_page
   
    if(state.messages.length < 1 || channelId != state.messages[0].channel){
      state.messages = channelState.state.currentChannelData.type == 'wall' 
        ? paginationData.data 
        : paginationData.data.reverse();
      
      return;
    }

    if(channelState.state.currentChannelData.type == 'wall'){
      state.messages = state.messages.concat(paginationData.data);
      return;
    }
    
    state.messages = paginationData.data.reverse().concat(state.messages);
  },
  
  'CLEAR_MESSAGES':(state) => state.messages = [],
  
  'SET_MESSAGE': (state, message) => {
    if(message.channel === state.messages[0].channel){
      let channel = channelState.state.currentChannelData;
      
      if(channel.type == 'wall'){
        state.messages.unshift(message);
      }else{
        state.messages.push(message);
      }
    }
  },
  
  'PUSH_TYPING_USER': (state, user) => {
    for (let i = 0; i < state.usersTyping.length; i++) {
      if (state.usersTyping[i].id === user.id) return
    }
    state.usersTyping.push(user)
  },
  
  'SLICE_TYPING_USER': (state, userObj) => state.usersTyping = state.usersTyping.filter(user => user.id !== userObj.id),
  
  'OFF_TYPING': (state) => state.usersTyping = [],
  
  'SET_CHANNEL_NOTIFICATION': (state, data) => {
    
    if(state.notifications[data.channel_id]){
      state.notifications[data.channel_id]+= 1;
      return;
    }

    Vue.set(state.notifications,data.channel_id,data.unread ? data.unread : 1);
  },
  
  'ADD_ATTACHMENT': (state, attachment) => state.attachments.push(attachment),
  
  'CLEAR_ATTACHMENTS': (state) => state.attachments = [],
  
  'REMOVE_ATTACHMENT': (state, url) => state.attachments = state.attachments.filter(attachment => attachment.options.url !== url),
  
  'READ_CHANNEL_MESSAGES': (state, channelId) => Vue.delete(state.notifications,channelId),
};
