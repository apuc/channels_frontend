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
      currentModal: 'modal/currentModal',
      channelId: 'channel/channelId',
    },
    data() {
      return {
        groupOrChannel: '',
    }
    },
    methods: {
      closeModal() {
        this.$store.commit('modal/deleteModal', this.currentModal);
        this.$store.commit('modal/toggleEditModal');
        this.currentModal === 'channel' ?
          this.$store.commit('channels/SET_CHANNEL_ID', '')
          :
          this.$store.commit('channels/SET_GROUP_ID', '');
      },
      remove(e) {
        this.currentModal === 'channel' ?
          this.$store.dispatch('channels/DELETE_CHANNEL', this.channelId)
          :
          this.$store.dispatch('groups/DELETE_GROUP')
      }
    },
    created() {
      this.$store.getters['modal/currentModal'] === 'deleteChannel' ? this.groupOrChannel = 'данный канал?' : this.groupOrChannel = 'данную группу?'
    }
  }
</script>

<style scoped>

</style>