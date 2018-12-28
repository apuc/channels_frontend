<template>
  <div class="modal-inside">
    <ModalSearchUsersForm />
    <ModalSearchUsersResult v-if="searchResultsUsers.length"/>
  </div>
</template>

<script>
  import ModalSearchUsersForm from './ModalSearchUsersForm';
  import ModalSearchUsersResult from "./ModalSearchUsersResult";
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "ModalSearchUsers",
    components: {ModalSearchUsersResult, ModalSearchUsersForm},
    computed: {
      ...mapGetters({
        searchResultsUsers: 'user/searchResultsUsers'
      }),
    },
    methods: {
      ...mapActions({
        findUsers: 'user/FIND_USERS',
      }),
    },
    created() {
      this.findUsers({search_request: '', page: 0});
    }
  }
</script>

<style scoped>

</style>