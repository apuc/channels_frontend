<template>
  <div class="modal-inside">

    <form class="form-group" @submit.prevent="onSubmit">
      <label for="user-search">Поиск пользователей</label>
      <input class="form-control"
             id="user-search"
             type="text"
             v-model="search_request"
      >

      <button type="submit" class="btn btn-primary">Поиск</button>
    </form>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "ModalSearchUsers",
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
        console.log(123);
        this.findUsers({search_request: this.search_request, page: this.page})
      }
    }
  }
</script>

<style scoped>

</style>