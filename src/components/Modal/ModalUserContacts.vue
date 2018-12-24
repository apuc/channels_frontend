<template>
  <div class="modal-inside">
    <header>
      <button class="btn btn-group mr10"
              type="button"
              v-if="userContacts.length > 0"
              @click="changeContactsList('ModalUserContactsList')"
      >
        Контакты
      </button>

      <button class="btn btn-group"
              type="button"
              v-if="friendshipRequests.length > 0"
              @click="changeContactsList('ModalUserContactsFriendshipRequests')"
      >
        Заявки
      </button>
    </header>

    <component :is="currentModal"></component>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import ModalUserContactsFriendshipRequests from './ModalUserContactsFriendshipRequests';
  import ModalUserContactsList from './ModalUserContactsList';

  export default {
    name: "ModalUserContacts",
    components: {ModalUserContactsFriendshipRequests, ModalUserContactsList},
    data() {
      return {
        currentModal: 'ModalUserContactsList'
      }
    },
    computed: {
      ...mapGetters({
        friendshipRequests: 'user/friendshipRequests',
        userContacts: 'user/userContacts',
      }),
    },
    methods: {
      changeContactsList(listName) {
        this.currentModal = listName;
      }
    },
  }
</script>

<style scoped>

</style>