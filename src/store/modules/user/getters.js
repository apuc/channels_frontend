export default {
  info: state => state.info,
  refreshTokenBody: state => state.refreshTokenBody,
  currentUserInfo: state => state.currentUserInfo,
  isUserLoading: state => state.isUserLoading,
  imageUploadPersentage: state => state.imageUploadPersentage,
  userPosition: state => state.userPosition,
  searchResults: state => state.searchResults.filter(user => user.user_id !== state.info.user_id),
  userContacts: state => state.userContacts,
  friendshipRequests: state => state.friendshipRequests,
};
