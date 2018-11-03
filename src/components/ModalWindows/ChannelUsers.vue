<template>
  <div>
    <header class="form-group">
      <label for="user">Поиск по пользователям канала</label>
      <input id="user" class="form-control" type="text" @input="findUser">
    </header>

    <div class="add-user">
      <label for="add-user" style="margin-right: 10px">Добавить пользователя</label>

      <div class="input-wrap">
        <input id="add-user" class="form-control add-user__input" type="text" v-model="add_user">

        <button type="button" class="btn" :class="disableButton" @click="addUser">
          <v-icon scale="1" class="icon" name="plus-square"/>
        </button>
      </div>
    </div>

    <ul class="users-list">
      <UserPreview v-for="(user, index) in users"
                   :username="user.username"
                   :id="user.user_id"
                   :avatar="user.avatar ? user.avatar.small : false"/>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import UserPreview from './UserPreview';

  export default {
    name: "ChannelUsers",
    components: {UserPreview},
    computed: {
      ...mapGetters({
        currentChannelUsers: 'channels/currentChannelUsers'
      }),
      disableButton() {
        return this.add_user.length > 0 ? 'btn-primary' : 'btn-default disable';
      }
    },
    data() {
      return {
        users: [],
        add_user: ''
      }
    },
    methods: {
      ...mapActions({
        addUser: 'channels/ADD_USER',
      }),
      addUser() {
        this.addUser(this.add_user);
      },
      findUser(e) {
        const value = e.target.value;

        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].username.indexOf(value) !== 0) {
            // this.users.push(this.users[i]);
          } else {
            this.users.findIndex(user => {
              console.log(value);
              console.log(user.username);
              console.log(user.username.indexOf(value));
              if (user.username.indexOf(value) !== 0) {
                console.log(user.username);
              }
            })
          }
        }
      }
    },
    created() {
      this.users = this.currentChannelUsers;
    }
  }
</script>

<style scoped>
  header,
  .add-user {
    display: flex;
    flex-direction: column;
  }

  .users-list {
    max-height: 300px;
    margin: 0;
    padding: 0;
    overflow: auto;
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
</style>