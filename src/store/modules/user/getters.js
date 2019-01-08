export default {
  userData: state => state.userData,
  refreshTokenBody: state => state.refreshTokenBody,
  currentUserInfo: state => state.currentUserInfo,
  isUserLoading: state => state.isUserLoading,
  imageUploadPersentage: state => state.imageUploadPersentage,
  userPosition: state => state.userPosition,
  searchResultsUsers: state => state.searchResults.users.filter(user => user.user_id !== state.userData.user_id),
  searchResultsPages: state => state.searchResults.pages,
  searchResultsCurrentPage: state => state.searchResults.currentPage,
  userContacts: state => state.userContacts,
  userContactsSearch: state => state.userContactsSearch,
  friendshipRequests: state => state.friendshipRequests,
};
