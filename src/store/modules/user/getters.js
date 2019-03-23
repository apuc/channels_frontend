export default {
  userData: state => state.userData,
  refreshTokenBody: state => state.refreshTokenBody,
  currentUserInfo: state => state.currentUserInfo,
  isUserLoading: state => state.isUserLoading,
  imageUploadPercentage: state => state.imageUploadPercentage,
  userPosition: state => state.userPosition,
  searchResultsUsers: state => state.searchResults.users.filter(user => user.user_id !== state.userData.user_id),
  searchResultsPages: state => state.searchResults.pages,
  searchResultsCurrentPage: state => state.searchResults.currentPage,
  searchResultsIsLoading: state => state.searchResults.isLoading,
  userContacts: state => state.userContacts,
  findUserContact: state => id => state.userContacts.find(contact => contact.user_id === id),
  userContactsSearch: state => state.userContactsSearch,
  friendshipRequests: state => state.friendshipRequests,
  searchRequest: state => state.searchRequest,
};
