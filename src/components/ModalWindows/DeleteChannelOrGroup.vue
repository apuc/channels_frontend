<template>
  <div>
    <h3>Вы уверены, что хотите удалить {{currentModal === 'deleteChannel' ? 'данный канал?' : 'данную группу?'}}</h3>
    <button type="button" @click="remove">Да</button>
    <button type="button" @click="closeModal">Нет</button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "DeleteChannelOrGroup",
    computed: {
      currentModal: 'modal/currentModal'
    },
    methods: {
      closeModal() {
        this.$store.dispatch('modal/deleteModal', this.currentModal);
      },
      remove(e) {
        this.currentModal === 'channel' ?
          this.$store.dispatch('channels/DELETE_CHANNEL')
          :
          this.$store.dispatch('groups/DELETE_GROUP')
      }
    }
  }
</script>

<style scoped>

</style>