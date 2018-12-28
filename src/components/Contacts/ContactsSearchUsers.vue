<template>
  <div class="mt-4">
    <ContactsSearchUsersForm />
    <ContactsSearchUsersResult v-if="searchResultsUsers.length"/>
  </div>
</template>

<script>
  import ContactsSearchUsersForm from './ContactsSearchUsersForm';
  import ContactsSearchUsersResult from "./ContactsSearchUsersResult";
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "ContactsSearchUsers",
    components: {ContactsSearchUsersResult, ContactsSearchUsersForm},
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