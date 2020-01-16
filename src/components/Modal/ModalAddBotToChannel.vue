<template>
  <div class="modal-inside">
    <h4 class="modal_title">Добавить бота в канал</h4>

    <b-form-group label="Выберите бота">
      <b-form-select :options="botsList" text-field="username" value-field="id" v-model="id"/>
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
               errors:{}
            }
        },

        computed:{
            ...mapGetters('bots', ['botsList']),
        },

        methods: {
            ...mapActions('bots',[
                'GET_USER_BOTS',
            ]),
            ...mapMutations({
                DELETE_MODAL: 'modal/DELETE_MODAL',
            }),

            addBot(){
                this.DELETE_MODAL();
            }
        },
    }
</script>

<style scoped>

</style>