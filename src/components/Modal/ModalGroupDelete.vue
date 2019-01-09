<template>
  <div class="modal-inside">
    <h3>Вы уверены, что хотите удалить данную группу?</h3>
    <button type="button" class="btn btn-primary" style="margin-right: 15px" @click="DELETE_GROUP">Да</button>
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
    },
  }
</script>

<style scoped>
</style>