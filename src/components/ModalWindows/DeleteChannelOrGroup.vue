<template>
  <div>
    <h3>Вы уверены, что хотите удалить {{currentModal === 'deleteChannel' ? 'данный канал?' : 'данную группу?'}}</h3>
    <button type="button" class="btn btn-primary" style="margin-right: 15px" @click="remove">Да</button>
    <button type="button" class="btn btn-primary" @click="closeModal">Нет</button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "DeleteChannelOrGroup",
    computed: {
      ...mapGetters({
        currentModal: 'modal/currentModal',
        channelId: 'channels/channelId',
      })
    },
    data() {
      return {
        groupOrChannel: '',
    }
    },
    methods: {
      closeModal() {
        this.currentModal === 'deleteChannel' ?
          this.$store.commit('channels/SET_CHANNEL_ID', '')
          :
          this.$store.commit('groups/SET_GROUP_ID', '');

        this.$store.commit('modal/deleteModal', this.currentModal);
        this.$store.commit('modal/toggleEditMode');
      },
      remove(e) {
        console.log(this.channelId);
        this.currentModal === 'deleteChannel' ?
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