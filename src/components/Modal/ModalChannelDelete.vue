<template>
  <div class="modal-inside">
    <h3>Вы уверены, что хотите удалить данный канал</h3>
    <button type="button" class="btn btn-primary" style="margin-right: 15px" @click="deleteChannel">Да</button>
    <button type="button" class="btn btn-primary" @click="closeModal">Нет</button>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';

  export default {
    name: "ModalDeleteChannel",
    methods: {
      ...mapMutations({
        deleteModal: 'modal/DELETE_MODAL',
      }),
      ...mapActions({
        deleteChannel: 'channels/DELETE_CHANNEL',
      }),
      closeModal() {
        this.deleteModal();
      },
    },
  }
</script>

<style scoped>
</style>