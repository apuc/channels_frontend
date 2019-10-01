<template>
  <div class="modal-inside">
    <h4 class="modal__title ml-0 mb-3">Вы уверены, что хотите удалить данный канал?</h4>
    <button type="button" class="btn btn-primary" style="margin-right: 15px" @click="deleteChannel">Да</button>
    <button type="button" class="btn btn-primary" @click="DELETE_MODAL">Нет</button>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';

  export default {
    name: "ModalChannelDelete",
    methods: {
      ...mapMutations({
        DELETE_MODAL: 'modal/DELETE_MODAL',
      }),
      ...mapActions({
        DELETE_CHANNEL: 'channels/DELETE_CHANNEL',
      }),
      deleteChannel() {
        this.DELETE_CHANNEL().then(() => this.$swal({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 4000,
          type: 'success',
          title: 'Канал удалён'
        }))
      }
    },
  }
</script>

<style scoped>
</style>