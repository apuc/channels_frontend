<template>
  <div class="modal-inside">
    <h4 class="modal__title mb-3 ml-0">Список пользователей канала</h4>
    
    <header class="form-group">
      <label for="user">Поиск по пользователям канала</label>
      <input id="user"
             class="form-control"
             type="text"
             ref="searchInput"
             :value="searchValue"
             @input="searchUser($event.target.value)"
             placeholder="Введите логин пользователя или email"
      >
    </header>
    
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

        /**
         * Поиск по юзерам канала
          * @param value
         */  
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