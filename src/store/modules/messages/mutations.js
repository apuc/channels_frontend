export default {
  'SET_MESSAGES': (state, messages) => state.messages = messages,
  'SET_MESSAGE': (state, message) => message.channel === state.messages[0].channel && state.messages.push(message),
  'PUSH_TYPING_USER': (state, user) => {
    for (let i = 0; i < state.usersTyping.length; i++) {
      if (state.usersTyping[i].id === user.id) return
    }
    state.usersTyping.push(user)
  },
  'SLICE_TYPING_USER': (state, userObj) => state.usersTyping = state.usersTyping.filter(user => user.id !== userObj.id),
  'OFF_TYPING': (state) => state.usersTyping = [],
  'SET_CHANNEL_NOTIFICATION': (state, channel_id) => state.notifications.push(channel_id),
  'ADD_ATTACHMENT': (state, attachment) => state.attachments.push(attachment),
  'CLEAR_ATTACHMENTS': (state) => state.attachments = [],
  'REMOVE_ATTACHMENT': (state, url) => state.attachments = state.attachments.filter(attachment => attachment.options.url !== url),
  'READ_CHANNEL_MESSAGES': (state, channelId) => state.notifications = state.notifications.filter(id => channelId !== id),
};
