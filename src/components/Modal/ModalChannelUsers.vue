<template>
  <div class="modal-inside">
    <header class="form-group">
      <label for="user">Поиск по пользователям канала</label>
      <input id="user"
             class="form-control"
             type="text"
             ref="searchInput"
             :value="searchValue"
             @input="searchUser($event.target.value)"
      >
    </header>

    <div class="add-user">
      <label for="add-user" style="margin-right: 10px">Добавить пользователя</label>

      <div class="input-wrap">
        <input id="add-user"
               class="form-control add-user__input"
               type="text"
               :value="add_user"
               @input="findUserToAdd($event.target.value)"
        >

        <button type="button"
                class="btn"
                :class="disableButton"
                @click="ADD_USER({user_id: add_user, channel_id: currentChannelData.id})"
        >
          <v-icon scale="1" class="icon" name="plus-square"/>
        </button>
      </div>

      <p class="user-exist" v-if="isUserInChannel">This user exist.</p>
    </div>
    
    <p v-if="noUsers">В данном канале нет пользователя с таким именем.</p>
    <ModalChannelUsersPreview v-else/>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import ModalChannelUsersPreview from './ModalChannelUsersPreview';

  export default {
    name: "ModalChannelUsers",
    components: {ModalChannelUsersPreview},
    computed: {
      ...mapGetters({
        currentChannelUsers: 'channels/currentChannelUsers',
        currentChannelData: 'channels/currentChannelData',
      }),
      disableButton() {
        return this.add_user > 0 && !this.isUserInChannel ? 'btn-primary' : 'btn-default disable';
      },
    },
    data() {
      return {
        add_user: null,
        searchValue: '',
        isUserInChannel: false,
        noUsers: false,
      }
    },
    methods: {
      ...mapMutations({
        SET_CURRENT_CHANNEL_USER_SEARCH_RESULTS:'channels/SET_CURRENT_CHANNEL_USER_SEARCH_RESULTS',
      }),
      ...mapActions({
        ADD_USER: 'channels/ADD_USER',
      }),
      findUserToAdd(value) {
        this.add_user = Number(value);
        this.isUserInChannel = this.currentChannelUsers.some(user => user.user_id === this.add_user);

      },
      findUser(value) {
        let currentUserName = '';
        let searchValue = value.toLowerCase();
        let searchResult = [];
        for (let i = 0; i < this.currentChannelUsers.length; i++) {
          currentUserName = this.currentChannelUsers[i].username.toLowerCase();
          if (currentUserName.includes(searchValue)) {
            searchResult.push(this.currentChannelUsers[i]);
          }
        }
        return searchResult;
      },
      searchUser(value) {
        this.searchValue = value;
        const searchResult = this.findUser(value);
        this.noUsers = searchResult.length === 0;

        if (value) {
          this.SET_CURRENT_CHANNEL_USER_SEARCH_RESULTS(searchResult);
        } else {
          this.SET_CURRENT_CHANNEL_USER_SEARCH_RESULTS(this.currentChannelUsers);
        }
      }
    },
    mounted() {
      this.$refs.searchInput.focus();
    }
  }
</script>

<style scoped>
  header,
  .add-user {
    display: flex;
    flex-direction: column;
  }

  .add-user,
  .input-wrap {
    display: flex;
  }

  .add-user__input {
    margin-right: 20px;
  }

  .disable {
    pointer-events: none;
  }

  .user-exist {
    color: rgba(255, 0, 0, 0.64);
  }
</style>