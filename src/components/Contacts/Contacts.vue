<template>
  <div class="contacts">
    <header>
      <nav>
        <router-link to="/contacts" class="btn btn-primary mr-2">Контакты</router-link>
        <router-link to="/contacts/search" class="btn btn-primary mr-2">Поиск</router-link>
        <router-link to="/contacts/requests" class="btn btn-primary mr-2" v-if="friendshipRequests.length">Заявки в контакты</router-link>
      </nav>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "Contacts",
    computed: {
      ...mapGetters({
        friendshipRequests: 'user/friendshipRequests',
      })
    }
  }
</script>

<style scoped>
  .contacts {
    padding: 30px;
  }
</style>