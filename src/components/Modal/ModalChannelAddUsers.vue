<template>
  <div class="modal-inside">

    <h4 class="modal__title mb-3 ml-0">Добавить пользователя в канал</h4>
    
    <div class="add-user mb-3">
      <label for="add-user" style="margin-right: 10px">Пригласить по email</label>

      <div class="input-wrap">
        <input id="add-user"
               class="form-control add-user__input"
               type="text"
               placeholder="Введите email"
               v-model="invite_email"
        >

        <button type="button"
                class="btn"
                @click="inviteByEmail"
        >
          <v-icon scale="1" class="icon" name="plus-square"/>
        </button>
      </div>
    </div>
    
    <header class="form-group">
      <label for="user">Поиск по контактам</label>
      <input
        id="user"
        class="form-control"
        type="text"
        ref="searchInput"
        :value="searchValue"
        @input="searchUser($event.target.value)"
        placeholder="Введите логин пользователя или email"
      >
    </header>

    <p v-if="noUsers || contactsToAdd.searchUsers.length < 1">
      <span v-if="noUsers">
        У вас в контактах нет пользователя с таким именем. Вы можете поискать с помощью глобального поиска перейдя по
      <router-link to="/contacts/search" @click.native="DELETE_MODAL">ссылке.</router-link>
      </span>
      <span v-else> Список контактов пуст или все контакты уже состоят в этом канале</span>
    </p>
    
    <div class="users-list__wrap" v-else>
      <ul class="users-list">
        <li class="user" v-for="user in contactsToAdd.searchUsers" :key="user.email">
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

          <button
            type="button"
            class="btn btn-sm btn-primary"
            title="Добавить"
            @click="addUserToChannel(user.user_id)"
          >
            <v-icon scale="1" class="icon" name="user-plus"/>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from "vuex";
  import Vue from "vue";

  export default {
    name: "ModalChannelAddUsers",
    data() {
      return {
        invite_email:"",
        searchValue: "",
        isUserInChannel: false,
        noUsers: false
      };
    },
    computed: {
      ...mapGetters({
        userContacts: 'user/userContacts',
      }),
      ...mapGetters('channels', ['contactsToAdd', 'channelData','currentChannelData'])
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
      },
        
      setContactsFreeToAdd() {
        this.SET_CONTACTS_FREE_TO_ADD(this.userContacts);
        this.SET_CONTACTS_FREE_TO_ADD_SEARCH(this.contactsToAdd.users);
      },
      
      inviteByEmail(){
        Vue.http.post(`${process.env.VUE_APP_API_URL}/channels/${this.currentChannelData.id}/invite`,{email:this.invite_email})
            .then(res=>{
                this.REMOVE_USER_FROM_CONTACTS_TO_ADD(res.body.data.user_id);
                this.SET_CONTACTS_FREE_TO_ADD_SEARCH(this.contactsToAdd.users);

                this.$swal({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 4000,
                    type: 'success',
                    title: 'Пользователь приглашен в канал!',
                    text: data.body.message,
                });
            },err=>{
                console.log(err)
            })
      }
    },
      
    created() {
      if (this.contactsToAdd.channelId) {
        this.GET_CHANNEL_USERS(this.contactsToAdd.channelId)
          .then(data => this.SET_CHANNEL_USERS(data))
          .then(async () => {
            this.setContactsFreeToAdd();
          });
      }
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
  .users-list__wrap {
    position: relative;
  }

  .users-list {
    display: flex;
    flex-direction: column;
    max-height: 300px;
    margin: 0;
    margin-top: 10px;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  .img {
    display: block;
    border-radius: 50%;
  }

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