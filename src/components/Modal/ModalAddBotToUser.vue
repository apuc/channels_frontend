<template>
  <div class="modal-inside">
    <h4 class="modal_title">Добавить бота к профилю</h4>

    <div class="add-bot mb-3">

      <label for="add-bot_name" style="margin-right: 10px">Введите имя бота</label>
      <div class="input-wrap" :class="{invalid:!validName}">
        <input id="add-bot_name"
               class="form-control add-bot__input"
               type="text"
               placeholder="Введите имя бота"
               :value="createdBotData.name"
               @input="SET_CREATED_BOT_NAME($event.target.value)"
        >
      </div>

      <label for="add-bot_webhook" style="margin-right: 10px; margin-top: 10px;">Введите webhook url</label>
      <div class="input-wrap" :class="{invalid:!validHook}">
        <input id="add-bot_webhook"
               class="form-control add-bot__input"
               type="text"
               placeholder="Введите webhook url"
               :value="createdBotData.hook_url"
               @input="SET_CREATED_BOT_HOOK($event.target.value)"
        >
      </div>

    </div>
    <div v-if="!valid">
      <p style="color:#750101">Поля должны содержать минимум {{validLength}} символа</p>
    </div>
    <b-button variant="primary" @click="addBotToUser">Добавить</b-button>
  </div>
</template>

<script>
  import {mapActions,mapGetters,mapMutations} from 'vuex';
  export default {
    name: "ModalAddBotToUser",
    data(){
      return{
        valid: true,
        validName: true,
        validHook: true,
        validLength: 3,
        errors: {}
      }
    },

    computed:{
      ...mapGetters('bots', ['createdBotData']),
      ...mapGetters('user', ['userData']),
    },

    methods: {
      ...mapActions('common',['MAKE_REQUEST',]),
      ...mapActions('bots',['CREATE_BOT',]),
      ...mapMutations({
        SET_CREATED_BOT: "bots/SET_CREATED_BOT",
        SET_CREATED_BOT_NAME: "bots/SET_CREATED_BOT_NAME",
        SET_CREATED_BOT_HOOK: "bots/SET_CREATED_BOT_HOOK",
        SET_CREATED_BOT_OWNER: "bots/SET_CREATED_BOT_OWNER",
        ADD_USER_BOT: "bots/ADD_USER_BOT",
        DELETE_MODAL: 'modal/DELETE_MODAL'
      }),

     async addBotToUser(){
        //Да, мне тоже это не нравится. Будут требования по валидации - перепишу, а пока пусть так
        this.valid = true;
        this.validHook = true;
        this.validName = true;
        if(this.createdBotData.name.length<this.validLength){
          this.valid = false;
          this.validName = false;
        }
        if(this.createdBotData.hook_url.length<this.validLength){
          this.valid = false;
          this.validHook = false;
        }
          
        if(this.valid){
          this.SET_CREATED_BOT_OWNER(this.userData.user_id);
          this.MAKE_REQUEST({name:'bots/CREATE_BOT',params:null
          }).then((res) => {
            this.$swal({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 4000,
              type: 'success',
              title: 'Бот создан'
            })
          }).catch((err)=>{
            if(err.status == 422){
                this.errors = err.body.errors;
            }
          })
        }
      }
    },

    beforeDestroy() {
      this.SET_CREATED_BOT({
        owner_id: "",
        name: "",
        hook_url: ""
      });
    },
  }
</script>

<style scoped lang="scss">
  .invalid{
    border: 2px solid #750101;
  }
</style>