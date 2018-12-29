<template>
  <div class="mt-4" v-if="userContacts.length === 0">
    <p>Ваш список контактов пуст, вы можете найти своих друзей:</p>

    <ContactsSearchUsers />
  </div>

  <div class="mt-4" v-else>
    <div class="form-group">
      <label for="user">Поиск по контактам</label>
      <input id="user"
             class="form-control"
             type="text"
             ref="searchInput"
             :value="searchValue"
             @input="searchUser($event.target.value)"
      >
    </div>

    <ul class="users-list">
      <li class="user"
          v-for="(user, index) in userContactsSearch"
          :key="user.email">
        <div>
          <div class="user-info">
            <div class="image-wrap">
              <img class="img"
                   :src="user.avatar ? user.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e901b/c09P-QuYY18.jpg'"
                   width="30" height="30" alt="">
            </div>

            <div>
              <router-link :to="`/user/${user.user_id}`"
                           @click.native="goToProfile(user.user_id)"
              >
                {{user.username}}
              </router-link>
            </div>
          </div>
        </div>

        <button type="button"
                class="btn btn-sm btn-danger"
                @click="removeUserFromContacts(user.user_id)"
        >
          <v-icon scale="1" class="icon" name="user-minus"/>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import ContactsSearchUsersForm from "./ContactsSearchUsersForm";
  import ContactsSearchUsersResult from "./ContactsSearchUsersResult";
  import ContactsSearchUsers from "./ContactsSearchUsers";
  import Contacts from "./Contacts";

  export default {
    name: "ContactsList",
    components: {Contacts, ContactsSearchUsersResult, ContactsSearchUsersForm, ContactsSearchUsers},
    data() {
      return {
        searchValue: '',
        noUsers: false,
      }
    },
    computed: {
      ...mapGetters({
        userData: 'user/info',
        userContacts: 'user/userContacts',
        userContactsSearch: 'user/userContactsSearch',
        searchResultsUsers: 'user/searchResultsUsers',
      }),
    },
    methods: {
      ...mapMutations({
        setCurrentUserData: 'user/SET_CURRENT_USER_DATA',
        removeUserRequestFromStore: 'user/REMOVE_USER_REQUEST_FROM_STORE',
        setUsersContactsSearch: 'user/SET_USER_CONTACTS_SEARCH',
        deleteModal: 'modal/DELETE_MODAL',
      }),
      ...mapActions({
        rejectFriendshipRequest: 'user/REJECT_FRIENDSHIP_REQUEST',
        getCurrentUserData: 'user/GET_USER_DATA',
      }),
      goToProfile(id) {
        this.getCurrentUserData(id);
        this.deleteModal();
      },
      removeUserFromContacts(id) {
        this.rejectFriendshipRequest({
          user_id: this.userData.user_id,
          contact_id: id
        })
          .then(() => this.removeUserRequestFromStore(id));
      },
      findUser(value) {
        let currentUserName = '';
        let searchValue = value.toLowerCase();
        let searchResult = [];
        for (let i = 0; i < this.userContacts.length; i++) {
          currentUserName = this.userContacts[i].username.toLowerCase();
          if (currentUserName.includes(searchValue)) {
            searchResult.push(this.userContacts[i]);
          }
        }
        return searchResult;
      },
      searchUser(value) {
        this.searchValue = value;
        const searchResult = this.findUser(value);
        this.noUsers = searchResult.length === 0;

        if (value) {
          this.setUsersContactsSearch(searchResult);
        } else {
          this.setUsersContactsSearch(this.userContacts);
        }
      }
    },
  }
</script>

<style scoped>
  .users-list {
    margin: 0;
    margin-top: 10px;
    padding: 0;
    overflow: auto;
  }

  .user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 3px;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  .image-wrap {
    width: 30px;
    height: 30px;
    margin-right: 10px;

    background-color: #cccccc;
    border-radius: 50%;
  }

  .img {
    display: block;
  }
</style>