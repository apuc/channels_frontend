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
            ...mapMutations({
                DELETE_MODAL: 'modal/DELETE_MODAL',
            }),

            addBot(){
                this.data = this.botsList.filter(el => el.id == this.bot_id);
                this.DELETE_MODAL();
                //Метод потенциально рабочий, однако не обрабатывается со стороны сервера, возвращает ошибку 404. Закономерно - API под него не выдали
                /*this.CHANNEL_ADD_BOT({
                    channel_id:this.currentChannelData.id,
                    bot_id:this.integration_id,
                    data: this.data[0],
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
                })*/
            }
        },
    }
</script>

<style scoped>

</style>