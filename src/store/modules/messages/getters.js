export default {
    messages: state => state.messages,
    usersTyping: state => state.usersTyping,
    attachments: state => state.attachments,
    notifications: state => state.notifications,
    editMessage: state => state.message_edit,
    groupNotifications: state => channels_ids => {
      let count = 0;
      
      for (let id of channels_ids){
        if(state.notifications[id]){
          count+=state.notifications[id];
        }
      }
      
      return count;
    }
};
