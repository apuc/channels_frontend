<template>
  <div class="modal-inside">
    <h4 class="modal_title">Добавить бота в канал</h4>
    <p>Ввиду отсутствия корректного API кнопка "Добавить" просто закроет модалку</p>
    <b-form-group label="Выберите бота">
      <b-form-select :options="botsList"
                     text-field="username"
                     value-field="id"
                     v-model="bot_id"/>
    </b-form-group>
    <b-button variant="primary" @click="addBot">Добавить</b-button>
    
  </div>
</template>

<script>
    import {mapActions,mapGetters,mapMutations} from 'vuex';

    export default {
        name: "ModalAddBotToChannel",

        created(){
            this.GET_USER_BOTS();
        },
        data(){
            return {
               errors:{},
               bot_id:"",
               data:[]
            }
        },

        computed:{
            ...mapGetters('bots', ['botsList']),
            ...mapGetters('channels',['currentChannelData'])
        },

        methods: {
            ...mapActions('bots',[
                'GET_USER_BOTS',
                'CHANNEL_ADD_BOT'
            ]),
          ...mapActions('channels', ['ADD_USER']),
            ...mapMutations({
                DELETE_MODAL: 'modal/DELETE_MODAL',
            }),

            addBot(){
               this.ADD_USER({
                    channel_id:this.currentChannelData.id,
                    user_id:this.bot_id,
                }).then(res =>{
                    this.$swal({
                        toast: true,
                        position: 'top',
                        showConfirmButton: false,
                        timer: 4000,
                        type: 'success',
                        title: 'Бот добавлен в канал'
                    });
                    this.DELETE_MODAL();
                },err=>{
                    this.errors = err.data.errors;
                })
            }
        },
    }
</script>

<style scoped>

</style>