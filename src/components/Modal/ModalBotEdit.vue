<template>
  <div class="modal-inside">
    <h4 class="modal_title">Изменить бота</h4>

    <div class="add-bot mb-3">

      <label for="add-bot_name" style="margin-right: 10px">Имя бота</label>
      <div class="input-wrap">
        <input id="add-bot_name"
               class="form-control add-bot__input"
               type="text"
               placeholder="Введите имя бота"
               :value="currentBotData.username"
               @input="SET_CURRENT_BOT_NAME($event.target.value)"
        >
      </div>

      <label for="add-bot_webhook" style="margin-right: 10px; margin-top: 10px;">Webhook url</label>
      <div class="input-wrap">
        <input readonly
               id="add-bot_webhook"
               class="form-control add-bot__input"
               type="text"
               placeholder="Введите webhook url"
               :value="currentBotData.webhook"
               @input="SET_CURRENT_BOT_WEBHOOK($event.target.value)"
        >
      </div>

    </div>

    <b-button variant="primary" @click="saveBotEdit">Сохранить изменения</b-button>
  </div>
</template>

<script>
    import {mapActions,mapGetters,mapMutations} from 'vuex';

    export default {
        name: "ModalBotEdit",

        beforeDestroy() {
          this.SET_CURRENT_BOT({
            name: "",
            hook_url: "",
            index: "",
            bot_id: ""
          });
        },

        computed:{
          ...mapGetters('bots', ['currentBotData']),
        },

        methods: {
          ...mapActions('common',['MAKE_REQUEST',]),

          ...mapMutations({
            SET_CURRENT_BOT: "bots/SET_CURRENT_BOT",
            SET_CURRENT_BOT_NAME: "bots/SET_CURRENT_BOT_NAME",
            SET_CURRENT_BOT_WEBHOOK: "bots/SET_CURRENT_BOT_WEBHOOK",
            SET_CURRENT_BOT_ID: "bots/SET_CURRENT_BOT_ID",
            DELETE_MODAL: 'modal/DELETE_MODAL'
          }),

          saveBotEdit(){
            this.MAKE_REQUEST({name:'bots/UPDATE_BOT',params:null
            }).then((res) => {
              this.$swal({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 4000,
                type: 'success',
                title: 'Бот обновлён'
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

<style scoped lang="scss">
</style>