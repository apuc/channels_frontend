export default {
  info: state => state.info,
  refreshTokenBody: state => state.refreshTokenBody,
  currentUserInfo: state => state.currentUserInfo,
  isUserLoading: state => state.isUserLoading,
  imageUploadPersentage: state => state.imageUploadPersentage,
  userPosition: state => state.userPosition,
  searchResultsUsers: state => state.searchResults.users.filter(user => user.user_id !== state.info.user_id),
  searchResultsPages: state => state.searchResults.pages,
  searchResultsCurrentPage: state => state.searchResults.currentPage,
  userContacts: state => state.userContacts,
  friendshipRequests: state => state.friendshipRequests,
};
