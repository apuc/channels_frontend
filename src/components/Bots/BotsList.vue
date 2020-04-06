<template>
  <div class="bots_list">
    <header>
      <p>Ваши боты</p>
      <router-link to="/bots/create" class="btn btn-primary mr-2">Добавить бота</router-link>
    </header>

    <div v-if="botsList.length === 0">
      <p>Ваш список ботов пуст.</p>
    </div>

    <div v-else class="bots_table">
      <b-table responsive :items="botsList" :fields="fields">

        <template v-slot:cell(username)="row">
          {{row.value}}<br>
          <span style="font-size: 15px"><b>ID {{row.item.id}}</b></span>
        </template>
        
        <template v-slot:cell(actions)="row">
          <b-button-group>

            <b-button variant="light" size="sm" @click="setBotEdit(row.item,row.index)">
              <img src="../../assets/img/pencil.png" alt="edit">
            </b-button>

            <b-button variant="light" size="sm" @click="delBot(row.item)" >
              <img src="../../assets/img/bin.png" alt="del">
            </b-button>

          </b-button-group>
        </template>

      </b-table>

    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import Bots from "./Bots";

  export default {
    name: "BotsList",
    
    data(){
      return{
        fields:[
          {
            key:"username",
            label: "Имя бота"
          },
          {
            key: "webhook",
            label: "Webhook url"
          },
          {
            key: "actions",
            label: ""
          }
        ]
      }
    },

    created(){
      this.GET_USER_BOTS();
    },

    components: {Bots},
      
    computed: {
      ...mapGetters('bots', ['botsList', 'currentBotData']),
    },
      
    methods: {
      ...mapActions('bots',[
                'GET_USER_BOTS',
            ]),
      ...mapMutations({
        SET_CURRENT_BOT: "bots/SET_CURRENT_BOT",
        SET_MODAL: "modal/SET_MODAL"
      }),
        
      setBotEdit(data,index) {
        this.SET_CURRENT_BOT({
          username: data.username,
          webhook: data.webhook,
          id: data.id,
          index:index,
        });
        this.$router.push({path: "bots/edit"});
      },
      delBot(data){
        this.SET_CURRENT_BOT({
          id:data.id
        });
        this.SET_MODAL({name: "ModalBotDelete"});
      }
    }
  }
</script>

<style scoped lang="scss">
.bots_list{
   header{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 10px;
      p{
        margin: auto 0;
        font-size: 24px;
        text-align: center;
      }
    }
}
  .bots_table{
    text-align: left;
    //Я честно пытался исправить косяки данной таблицы, а именно ломка вёрстки при слишком длинном имени бота/вебхука и отображения на узких дисплеях, но плевать эта бутстраповская гадина хотела на стили. Почему обязательно её юзать? Прошлая была красивше и ГОРАЗДО проще настраивалась
    table{
      max-width: 100% !important;
      /*Она это даже не видит, а не переопределяет, в правилах элементов пусто. Хз почему.
      Однако на table действует
      td{
        background-color: aqua;
      }*/
    }
  }
</style>