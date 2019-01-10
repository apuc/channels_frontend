export default {
  'SET_MESSAGES': (state, messages) => state.messages = messages,
  'SET_MESSAGE': (state, message) => state.messages.push(message),
  'PUSH_TYPING_USER': (state, user) => {
    for (let i = 0; i < state.usersTyping.length; i++) {
      if (state.usersTyping[i].id === user.id) return
    }
    state.usersTyping.push(user)
  },
  'SLICE_TYPING_USER': (state, userObj) => state.usersTyping = state.usersTyping.filter(user => user.id !== userObj.id),
  'OFF_TYPING': (state) => state.usersTyping = [],
  'ADD_ATTACHMENT': (state, attachment) => state.attachments.push(attachment),
  'CLEAR_ATTACHMENTS': (state) => state.attachments = [],
  'REMOVE_ATTACHMENT': (state, id) => state.attachments = state.attachments.filter(attachment => attachment.data.id !== id),
};
