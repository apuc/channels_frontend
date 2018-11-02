<template>
  <div>
    <h3>Вы уверены, что хотите удалить {{currentModal === 'deleteChannel' ? 'данный канал?' : 'данную группу?'}}</h3>
    <button type="button" class="btn btn-primary" style="margin-right: 15px" @click="remove">Да</button>
    <button type="button" class="btn btn-primary" @click="closeModal">Нет</button>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "DeleteChannelOrGroup",
    computed: {
      ...mapGetters({
        currentModal: 'modal/currentModal',
        groupId: 'groups/groupId',
      })
    },
    data() {
      return {
        groupOrChannel: '',
    }
    },
    methods: {
      ...mapMutations({
        toggleEditMode: 'modal/toggleEditMode',
        deleteModal: 'modal/deleteModal',
      }),
      ...mapActions({
        deleteChannel: 'channels/DELETE_CHANNEL',
        deleteGroup: 'groups/DELETE_GROUP',
      }),
      closeModal() {
        this.deleteModal(this.currentModal);
        this.toggleEditMode();
      },
      remove(e) {
        this.currentModal === 'deleteChannel' ?
          this.deleteChannel()
        :
          this.deleteGroup(this.groupId)
      }
    },
    created() {
      this.currentModal === 'deleteChannel' ?
        this.groupOrChannel = 'данный канал?'
      :
        this.groupOrChannel = 'данную группу?'
    }
  }
</script>

<style scoped>

</style>