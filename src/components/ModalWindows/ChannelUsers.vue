<template>
  <div>
    <header class="form-group">
      <label for="user">Поиск по пользователям канала</label>
      <input id="user" class="form-control" type="text" v-model="user">
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
                   :id="user.id"
                   :avatar="user.avatar.small"/>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import UserPreview from './UserPreview';

  export default {
    name: "ChannelUsers",
    components: {UserPreview},
    computed: {
      ...mapGetters({
        users: 'channels/users'
      }),
      disableButton() {
        return this.add_user.length > 0 ? 'btn-primary' : 'btn-default disable';
      }
    },
    data() {
      return {
        user: '',
        add_user: ''
      }
    },
    methods: {
      addUser() {
        this.$store.dispatch('channels/ADD_USER', this.add_user);
      }
    },
    created() {
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