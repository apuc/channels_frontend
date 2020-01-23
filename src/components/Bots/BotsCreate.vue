<template>
  <div class="bot_create">
    <header>
      <h5 class="bot_create_title">Добавить бота к профилю</h5>
      <!--С эстетической точки зрения кнопка смотрится не очень,
        однако её наличие где-нибудь на странице обязательно.-->
      <router-link to="/bots" class="btn btn-primary mr-2">Назад</router-link>
    </header>
    
    <div class="add-bot mb-3">

      <label for="add-bot_name" style="margin-right: 10px">Введите имя бота</label>
      <div class="input-wrap">
        <input id="add-bot_name"
               class="form-control add-bot__input"
               type="text"
               placeholder="Введите имя бота"
               :value="createdBotData.name"
               @input="SET_CREATED_BOT_NAME($event.target.value)"
        >
      </div>
      <p
        v-if="errors.hasOwnProperty('name')"
        v-for="error in errors['name']"
        style="color: red">
        {{error}}
      </p>

      <label for="add-bot_webhook" style="margin-right: 10px; margin-top: 10px;">Введите webhook url</label>
      <div class="input-wrap">
        <input id="add-bot_webhook"
               class="form-control add-bot__input"
               type="text"
               placeholder="Введите webhook url"
               :value="createdBotData.hook_url"
               @input="SET_CREATED_BOT_HOOK($event.target.value)"
        >
      </div>
      <p
        v-if="errors.hasOwnProperty('webhook')"
        v-for="error in errors['webhook']"
        style="color: red">
        {{error}}
      </p>

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
        errors: {}
      }
    },

    computed:{
      ...mapGetters('bots', ['createdBotData']),
      ...mapGetters('user', ['userData']),
    },

    methods: {
      ...mapActions('common',['MAKE_REQUEST',]),
      ...mapMutations({
        SET_CREATED_BOT: "bots/SET_CREATED_BOT",
        SET_CREATED_BOT_NAME: "bots/SET_CREATED_BOT_NAME",
        SET_CREATED_BOT_HOOK: "bots/SET_CREATED_BOT_HOOK",
        SET_CREATED_BOT_OWNER: "bots/SET_CREATED_BOT_OWNER",
        ADD_USER_BOT: "bots/ADD_USER_BOT",
      }),

      async addBotToUser(){
        this.errors={};
        this.SET_CREATED_BOT_OWNER(this.userData.user_id);
        this.MAKE_REQUEST({name:'bots/CREATE_BOT',params:null
        }).then((res) => {
          this.$router.push({path: "/bots"});
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