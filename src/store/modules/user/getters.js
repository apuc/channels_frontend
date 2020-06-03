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
  currentUserId: (_, getters) => getters.currentUserInfo.user_id || userData.user_id,

  /**
   * Проверяет что у рользователя нет запросов к переданому пользователю
   * @param state
   * @returns {function(*): number}
   */
  findFriendshipRequest: state => id => {
    let allRequests = state.friendshipRequests.toMeRequests.concat(state.friendshipRequests.myRequests)
    return allRequests.find(contact => contact.user_id === id)
  },
  
  userContactsSearch: state => state.userContactsSearch,
  
  /**
   * Запросы в друзья к пользователю
   * @param state
   * @returns {default.friendshipRequests|(function(*))|[]|string}
   */
  friendshipRequests: state => state.friendshipRequests.toMeRequests,
  
  searchRequest: state => state.searchRequest,
};
