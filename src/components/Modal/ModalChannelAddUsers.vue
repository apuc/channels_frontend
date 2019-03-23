<template>
  <div class="modal-inside">
    <header class="form-group">
      <label for="user">Добавить пользователя</label>
      <input
        id="user"
        class="form-control"
        type="text"
        ref="searchInput"
        :value="searchValue"
        @input="searchUser($event.target.value)"
      >
    </header>

    <p
      v-if="noUsers"
    >У вас в контактах нет пользователя с таким именем. Вы можете поискать с помощью глобального поиска перейдя по
      <router-link to="/contacts/search" @click.native="DELETE_MODAL">ссылке.</router-link>
    </p>

    <ul class="users-list" v-else>
      <li class="user" v-for="user in contactsToAdd.searchUsers" :key="user.email">
        <div>
          <div class="user-info">
            <div class="image-wrap">
              <img
                class="img"
                :src="user.avatar ? user.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e901b/c09P-QuYY18.jpg'"
                width="30"
                height="30"
                alt
              >
            </div>

            <div>
              <router-link
                :to="`/user/${user.user_id}`"
                @click.native="goToProfile(user.user_id)"
              >{{user.username}}
              </router-link>
            </div>
          </div>
        </div>

        <div>
          <button
            type="button"
            class="btn btn-sm btn-primary mr10"
            @click="addUserToChannel(user.user_id)"
          >
            <v-icon scale="1" class="icon" name="user-plus"/>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from "vuex";

  export default {
    name: "ModalChannelAddUsers",
    data() {
      return {
        searchValue: "",
        isUserInChannel: false,
        noUsers: false
      };
    },
    computed: {
      ...mapGetters({
        userContacts: 'user/userContacts',
      }),
      ...mapGetters('channels', ['contactsToAdd', 'channelData'])
    },
    methods: {
      ...mapMutations('channels', [
        'REMOVE_USER_FROM_CONTACTS_TO_ADD',
        'SET_CONTACTS_FREE_TO_ADD_SEARCH',
        'SET_CONTACTS_FREE_TO_ADD',
        'CLEAR_CONTACTS_TO_ADD',
        'SET_CHANNEL_USERS',
      ]),
      ...mapMutations({
        DELETE_MODAL: 'modal/DELETE_MODAL',
      }),
      ...mapActions('channels', ['ADD_USER', 'GET_CHANNEL_USERS']),
      findUser(value) {
        let currentUserName = "";
        let searchValue = value.toLowerCase();
        let searchResult = [];
        for (let i = 0; i < this.contactsToAdd.users.length; i++) {
          currentUserName = this.contactsToAdd.users[i].username.toLowerCase();
          if (currentUserName.includes(searchValue)) {
            searchResult.push(this.contactsToAdd.users[i]);
          }
        }
        return searchResult;
      },
      searchUser(value) {
        this.searchValue = value;
        const searchResult = this.findUser(value);
        this.noUsers = searchResult.length === 0;

        if (value) {
          this.SET_CONTACTS_FREE_TO_ADD_SEARCH(searchResult);
        } else {
          this.SET_CONTACTS_FREE_TO_ADD_SEARCH(this.contactsToAdd.users);
        }
      },
      addUserToChannel(user_id) {
        this.ADD_USER({user_id, channel_id: this.contactsToAdd.channelId})
          .then(async () => {
            this.REMOVE_USER_FROM_CONTACTS_TO_ADD(user_id);
            this.SET_CONTACTS_FREE_TO_ADD_SEARCH(this.contactsToAdd.users);
          });
      }
    },
    created() {
      this.GET_CHANNEL_USERS(this.contactsToAdd.channelId)
        .then(data => this.SET_CHANNEL_USERS(data))
        .then(async () => {
          await this.SET_CONTACTS_FREE_TO_ADD(this.userContacts);
          this.SET_CONTACTS_FREE_TO_ADD_SEARCH(this.contactsToAdd.users);
        });
    },
    mounted() {
      this.$refs.searchInput.focus();
    },
    beforeDestroy() {
      this.SET_CHANNEL_USERS([]);
      this.CLEAR_CONTACTS_TO_ADD();
    }
  };
</script>

<style scoped>
  .users-list {
    max-height: 300px;
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