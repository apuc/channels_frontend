<template>
  <form @submit.prevent="onSubmit" class="form-group">
    <label for="user-search">Поиск пользователей</label>
    <input class="form-control"
           id="user-search"
           type="text"
           ref="searchInput"
           :value="search_request"
           @input="search($event.target.value)"
    >
  </form>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';
  import _ from 'lodash';

  export default {
    name: "ContactsSearchUsersForm",
    data() {
      return {
        search_request: '',
      }
    },
    methods: {
      ...mapMutations({
        SET_SEARCH_REQUEST: 'user/SET_SEARCH_REQUEST',
      }),
      ...mapActions({
        FIND_USERS: 'user/FIND_USERS',
      }),
      search:
        _.debounce(async function (value) {
          this.search_request = value;
          await this.SET_SEARCH_REQUEST(value);
          this.FIND_USERS(1).then(data => console.log(data))
        }, 300)
    },
    mounted() {
      this.$refs.searchInput.focus();
    }
  }
</script>

<style scoped>

</style>