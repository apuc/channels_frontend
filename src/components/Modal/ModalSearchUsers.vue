<template>
  <div class="modal-inside">
    <ModalSearchUsersForm />
    <ModalSearchUsersResult v-if="searchResults.length"/>
  </div>
</template>

<script>
  import ModalSearchUsersForm from './ModalSearchUsersForm';
  import ModalSearchUsersResult from "./ModalSearchUsersResult";
  import {mapGetters} from 'vuex';

  export default {
    name: "ModalSearchUsers",
    components: {ModalSearchUsersResult, ModalSearchUsersForm},
    computed: {
      ...mapGetters({
        searchResults: 'user/searchResults'
      })
    }
  }
</script>

<style scoped>

</style>