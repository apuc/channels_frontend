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
  import {mapActions} from 'vuex';
  import _ from 'lodash';

  export default {
    name: "ContactsSearchUsersForm",
    data() {
      return {
        search_request: '',
        page: 0
      }
    },
    methods: {
      ...mapActions({
        findUsers: 'user/FIND_USERS',
      }),
      search:
        _.debounce(function (value) {
          this.findUsers({search_request: value, page: this.page})
        }, 300)
    },
    mounted() {
      this.$refs.searchInput.focus();
    }
  }
</script>

<style scoped>

</style>