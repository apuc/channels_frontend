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
          v-for="user in userContactsSearch"
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
  import 'vue-awesome/icons/user-minus';

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
      ...mapGetters('user', [
        'userData',
        'userContacts',
        'userContactsSearch',
        'searchResultsUsers',
      ]),
    },
      
    methods: {
      ...mapMutations('user', ['REMOVE_USER_REQUEST_FROM_STORE', 'SET_USER_CONTACTS_SEARCH','REMOVE_USER_FROM_CONTACTS']),
        
      ...mapMutations({
        DELETE_MODAL: 'modal/DELETE_MODAL',
      }),
        
      ...mapActions('user', ['REJECT_FRIENDSHIP_REQUEST', 'GET_USER_DATA']),
        
      /**
       * Перейти к профилю
       */ 
      goToProfile(id) {
        this.GET_USER_DATA(id);
        this.DELETE_MODAL();
      },
        
       /**
        * Удалить юзера из контактов
        */  
      removeUserFromContacts(id) {
        this.REJECT_FRIENDSHIP_REQUEST({
          user_id: this.userData.user_id,
          contact_id: id
        })
          .then(() => {
              this.REMOVE_USER_REQUEST_FROM_STORE(id)
              this.REMOVE_USER_FROM_CONTACTS(id);

              this.$swal({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 4000,
                  type: 'success',
                  title: 'Пользователь удален из контактов!'
              })
          });
      },

        /**
         * Поиск по контактам
          * @param value
         * @returns {[]}
         */ 
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
          this.SET_USER_CONTACTS_SEARCH(searchResult);
        } else {
          this.SET_USER_CONTACTS_SEARCH(this.userContacts);
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
    height: calc(100vh - 238px);
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
  
  .img {
    display: block;
  }
</style>