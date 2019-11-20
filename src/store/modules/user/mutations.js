export default {
  'SET_USER_INFO': (state, userData) => {
    state.userData = userData;
  },
  
  'SET_CURRENT_USER_DATA': (state, data) => {
    state.currentUserInfo = data;
  },
  
  'SET_USER_DATA_LOADING_FLAG': state => {
    state.isUserLoading = !state.isUserLoading;
  },
  
  'SET_AVATAR_UPLOAD_PROGRESS': (state, percentage) => {
    state.imageUploadPercentage = percentage;
  },
  
  /**
   * User position on site (channel/group/user profile/contacts)
   * @param position {String}
   */
  'SET_USER_POSITION': (state, position) => {
    state.userPosition = position;
  },
  
  'SET_SEARCH_REQUEST': (state, search_request) => {
    state.searchRequest = search_request;
  },

  /**
   * Задает результаты поиска пользователей
   * @param state
   * @constructor
   */
  'SET_SEARCH_RESULTS_USERS': (state, results) => {
    state.searchResults.users = results;
  },

  /**
   * Добавляет к результатам поиска пользователей
   * @param state
   * @constructor
   */
  'ADD_SEARCH_RESULTS_USERS': (state, results) => {
    for (let i = 0; i < results.length; i++) {
      state.searchResults.users.push(results[i]);
    }
  },
  
  'SET_SEARCH_RESULTS_PAGES': (state, results) => {
    state.searchResults.pages = results.last_page;
  },
  
  'SET_SEARCH_RESULTS_CURRENT_PAGE': (state, results) => {
    state.searchResults.currentPage = results.current_page;
  },
  
  'SET_CONTACTS_LOADING_FLAG': state => {
    state.searchResults.isLoading = !state.searchResults.isLoading;
  },

  /**
   * Очищает результаты поиска пользователей
   * @param state
   * @constructor
   */
  'CLEAR_SEARCH_RESULTS': state => {
    state.searchResults = {
        users: [],
        currentPage: 1,
        pages: 1,
        isLoading: false,
    }
  },
  
  'SET_USER_CONTACTS': (state, contacts) => {
    state.userContacts = contacts;
  },
  
  'SET_USER_FRIENDSHIP_REQUESTS': (state, requests) => {
    state.friendshipRequests = requests;
  },
  
  'REMOVE_USER_REQUEST_FROM_STORE': (state, user_id) => {
    const requests = state.friendshipRequests;
    for (let i = 0; i < requests.length; i++) {
      if (requests[i] === user_id) {
        requests.splice(i, 1);
      }
    }
  },

  /**
   * Добавить в список контактов
   * @param state
   * @constructor
   */
  'ADD_USER_TO_CONTACTS': (state, user) => {
    state.userContacts.push(user);
  },

  /**
   * Удалить из списка контактов
   * @param state
   * @constructor
   */
  'REMOVE_USER_FROM_CONTACTS': (state, user_id) => {
    let index = state.userContacts.findIndex(el => el.user_id == user_id);
    state.userContacts.splice(index,1);
  },
  
  'SET_USER_CONTACTS_SEARCH': (state, users) => {
    state.userContactsSearch = users;
  },

  /**
   * Сброс стейта
   * @param state
   * @constructor
   */
  'SET_DEFAULT_USER_STATE': state => {
    state.userData = {
      avatar: undefined,
      email: '',
      user_id: null,
      username: '',
    };
    state.currentUserInfo = {
      avatar: undefined,
      email: '',
      user_id: '',
      username: '',
    };
    state.isUserLoading = false;
    state.imageUploadPercentage = 0;
    state.searchResults = {
      users: [],
      pages: 0,
    };
  },
};