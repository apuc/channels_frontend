<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="user-search">Поиск пользователей</label>
      <input class="form-control"
             id="user-search"
             type="text"
             ref="searchInput"
             v-model="search_request"
      >
    </div>

    <button type="submit" class="btn btn-primary">Поиск</button>
  </form>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "ModalSearchUsersForm",
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
      onSubmit() {
        this.findUsers({search_request: this.search_request, page: this.page})
      }
    },
    mounted() {
      this.$refs.searchInput.focus();
    }
  }
</script>

<style scoped>

</style>