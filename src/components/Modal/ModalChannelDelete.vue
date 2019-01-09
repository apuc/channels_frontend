<template>
  <div class="modal-inside">
    <h3>Вы уверены, что хотите удалить данный канал</h3>
    <button type="button" class="btn btn-primary" style="margin-right: 15px" @click="DELETE_CHANNEL">Да</button>
    <button type="button" class="btn btn-primary" @click="DELETE_MODAL">Нет</button>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';

  export default {
    name: "ModalDeleteChannel",
    methods: {
      ...mapMutations({
        DELETE_MODAL: 'modal/DELETE_MODAL',
      }),
      ...mapActions({
        DELETE_CHANNEL: 'channels/DELETE_CHANNEL',
      }),
    },
  }
</script>

<style scoped>
</style>