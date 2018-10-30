<template>
  <div>
    <header>
      <label for="user">Поиск по пользователям канала</label>
      <input id="user" type="text" v-model="user">
    </header>

    <ul>
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
      })
    },
    data() {
      return {
        user: ''
      }
    },
    created() {
    }
  }
</script>

<style scoped>

</style>