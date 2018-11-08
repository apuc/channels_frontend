<template>
  <div class="modal-inside">
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
      })
    },
    data() {
      return {
        groupOrChannel: '',
    }
    },
    methods: {
      ...mapMutations({
        toggleEditMode: 'modal/TOGGLE_EDIT_MODE',
        deleteModal: 'modal/DELETE_MODAL',
      }),
      ...mapActions({
        deleteChannel: 'channels/DELETE_CHANNEL',
        deleteGroup: 'groups/DELETE_GROUP',
      }),
      closeModal() {
        this.deleteModal(this.currentModal);
        this.toggleEditMode();
      },
      remove() {
        this.currentModal === 'deleteChannel' ?
          this.deleteChannel()
        :
          this.deleteGroup()
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
.modal-inside {
  max-height: 90%;
  padding: 30px;
  overflow: auto;
}
</style>