<template>
  <div class="modal-inside">
    <h4 class="modal__title ml-0 mb-3">Вы уверены, что хотите удалить бота?</h4>
    <button type="button" class="btn btn-primary" style="margin-right: 15px" @click="deleteBot">Да</button>
    <button type="button" class="btn btn-primary" @click="DELETE_MODAL">Нет</button>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';

  export default {
    name: "ModalBotDelete",
    methods: {
      ...mapMutations({
        DELETE_MODAL: 'modal/DELETE_MODAL',
      }),
      ...mapActions('common',['MAKE_REQUEST',]),
      deleteBot() {
        this.MAKE_REQUEST({name:'bots/DELETE_BOT',params:null
          }).then((res) => {
            this.$swal({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 4000,
              type: 'success',
              title: 'Бот удалён'
            })
          }).catch((err)=>{
            if(err.status == 422){
              this.errors = err.body.errors;
            } 
          })
      }
    },
  }
</script>

<style scoped>
</style>