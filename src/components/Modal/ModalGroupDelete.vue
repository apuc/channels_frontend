<template>
  <div class="modal-inside">
    <h3>Вы уверены, что хотите удалить данную группу?</h3>
    <button type="button" class="btn btn-primary" style="margin-right: 15px" @click="deleteGroup">Да</button>
    <button type="button" class="btn btn-primary" @click="closeModal">Нет</button>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';

  export default {
    name: "ModalDeleteGroup",
    methods: {
      ...mapMutations({
        deleteModal: 'modal/DELETE_MODAL',
      }),
      ...mapActions({
        deleteGroup: 'groups/DELETE_GROUP',
      }),
      closeModal() {
        this.deleteModal();
      },
    },
  }
</script>

<style scoped>
  .modal-inside {
    max-height: 90%;
    padding: 30px;
    overflow: auto;
  }
</style>