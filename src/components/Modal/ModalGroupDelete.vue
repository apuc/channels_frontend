<template>
  <div class="modal-inside">
    <h4 class="modal__title ml-0 mb-3">Вы уверены, что хотите удалить данную группу?</h4>
    <button type="button" class="btn btn-primary" style="margin-right: 15px" @click="deleteGroup">Да</button>
    <button type="button" class="btn btn-primary" @click="DELETE_MODAL">Нет</button>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';

  export default {
    name: "ModalDeleteGroup",
    methods: {
      ...mapMutations({
        DELETE_MODAL: 'modal/DELETE_MODAL',
      }),
      ...mapActions({
        DELETE_GROUP: 'groups/DELETE_GROUP',
      }),
      deleteGroup() {
        this.DELETE_GROUP().then(() => this.$swal({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          type: 'success',
          title: 'Группа удалёна'
        }))
      }
    },
  }
</script>

<style scoped>
</style>