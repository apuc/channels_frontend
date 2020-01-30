<template>
  <div class="bot_create">
    <header>
      <h5 class="bot_create_title">Изменить бота</h5>
      <!--С эстетической точки зрения кнопка смотрится не очень,
        однако её наличие где-нибудь на странице обязательно.-->
      <router-link to="/bots" class="btn btn-primary mr-2">Назад</router-link>
    </header>
    
    <div class="add-bot mb-3">

      <label for="add-bot_name" style="margin-right: 10px">Новое имя бота</label>
      <div class="input-wrap">
        <input id="add-bot_name"
               class="form-control add-bot__input"
               type="text"
               placeholder="Введите имя бота"
               :value="currentBotData.username"
               @input="SET_CURRENT_BOT_NAME($event.target.value)"
        >
      </div>
      <p
        v-if="errors.hasOwnProperty('username')"
        v-for="error in errors['username']"
        style="color: red">
        {{error}}
      </p>

      <label for="add-bot_webhook" style="margin-right: 10px; margin-top: 10px;">Webhook url</label>
      <div class="input-wrap">
        <input id="add-bot_webhook"
               class="form-control add-bot__input"
               type="text"
               placeholder="Введите webhook url"
               :value="currentBotData.webhook"
               @input="SET_CURRENT_BOT_WEBHOOK($event.target.value)"
               readonly 
        >
      </div>
      <p
        v-if="errors.hasOwnProperty('webhook')"
        v-for="error in errors['webhook']"
        style="color: red">
        {{error}}
      </p>


    </div>
    <b-button variant="primary" @click="saveBotEdit">Сохранить изменения</b-button>
  </div>
</template>

<script>
  import {mapActions,mapGetters,mapMutations} from 'vuex';
  export default {
    name: "BotEdit",

    data(){
      return{
        errors: {}
      }
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
            SET_CURRENT_BOT_ID: "bots/SET_CURRENT_BOT_ID"
      }),

    async saveBotEdit(){
      this.errors={};
        this.MAKE_REQUEST({name:'bots/UPDATE_BOT',params:null
        }).then((res) => {
          this.SET_CURRENT_BOT({
            name: "",
            hook_url: "",
            index: "",
            bot_id: ""
          });
          this.$router.push({path: "/bots"});
          this.$swal({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 4000,
            type: 'success',
            title: 'Бот обновлён'
          });
        }).catch((err)=>{
          if(err.status == 422){
            this.errors = err.body.errors;
          } 
        });
      }
    },
  }
</script>

<style scoped lang="scss">
.bot_create{
  padding-top: 10px;

  header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    h5{
      margin: auto 0;
    }
    .btn{
      margin: auto 0;
    }
  }
  .add-bot{
    text-align: left;
  }
}
</style>