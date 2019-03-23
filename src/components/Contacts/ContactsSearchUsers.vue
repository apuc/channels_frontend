<template>
  <div class="mt-4">
    <ContactsSearchUsersForm />
    <ContactsSearchUsersResult v-if="searchResultsUsers.length"/>
  </div>
</template>

<script>
  import ContactsSearchUsersForm from './ContactsSearchUsersForm';
  import ContactsSearchUsersResult from "./ContactsSearchUsersResult";
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "ContactsSearchUsers",
    components: {ContactsSearchUsersResult, ContactsSearchUsersForm},
    computed: {
      ...mapGetters({
        searchResultsUsers: 'user/searchResultsUsers',
      }),
    },
    methods: {
      ...mapMutations('user', ['CLEAR_SEARCH_RESULTS', 'SET_SEARCH_REQUEST']),
    },
    beforeDestroy() {
      this.CLEAR_SEARCH_RESULTS();
      this.SET_SEARCH_REQUEST('');
    },
  }
</script>

<style scoped>
</style>