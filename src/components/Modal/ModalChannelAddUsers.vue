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
      <router-link to="/contacts/search" @click.native="deleteModal">ссылке.</router-link>
    </p>

    <ul class="users-list" v-else>
      <li class="user" v-for="user in contactsToAddSearch" :key="user.email">
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
              >{{user.username}}</router-link>
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
import { mapGetters, mapMutations, mapActions } from "vuex";

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
      contactsToAdd: "channels/contactsToAdd",
      contactsToAddSearch: "channels/contactsToAddSearch",
      currentChannelData: "channels/currentChannelData"
    })
  },
  methods: {
    ...mapMutations({
      removeUserFromContactsToAdd: "channels/REMOVE_USER_FROM_CONTACTS_TO_ADD",
      setContactsFreeToAddSearch: "channels/SET_CONTACTS_FREE_TO_ADD_SEARCH",
      deleteModal: 'modal/DELETE_MODAL',
    }),
    ...mapActions({
      addUser: "channels/ADD_USER"
    }),
    findUser(value) {
      let currentUserName = "";
      let searchValue = value.toLowerCase();
      let searchResult = [];
      for (let i = 0; i < this.contactsToAdd.length; i++) {
        currentUserName = this.contactsToAdd[i].username.toLowerCase();
        if (currentUserName.includes(searchValue)) {
          searchResult.push(this.contactsToAdd[i]);
        }
      }
      return searchResult;
    },
    searchUser(value) {
      this.searchValue = value;
      const searchResult = this.findUser(value);
      this.noUsers = searchResult.length === 0;

      if (value) {
        this.setContactsFreeToAddSearch(searchResult);
      } else {
        this.setContactsFreeToAddSearch(this.contactsToAdd);
      }
    },
    addUserToChannel(user_id) {
      this.addUser(user_id).then( async () => {
        await this.removeUserFromContactsToAdd(user_id);
        this.setContactsFreeToAddSearch(this.contactsToAdd);
      });
    }
  },
  mounted() {
    this.$refs.searchInput.focus();
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