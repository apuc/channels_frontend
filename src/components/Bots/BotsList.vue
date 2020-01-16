<template>
  <div v-if="botsList.length === 0">
    <p>Ваш список ботов пуст.</p>
  </div>

  <div v-else>
    <ul class="bots_list">
      <li class="bots_list_header">
        <span class="bots_list_header_name">Имя бота</span>
        <span class="bots_list_header_webhook">Webhook url</span>
      </li>
      

      <li class="bots_list_elem"
          v-for="(bot, index) in botsList"
          :key="bot.name">
        
        <div class="bots_list_elem_info">
          <p class="bots_list_elem_info_name">{{bot.username}}</p>
          <p class="bots_list_elem_info_webhook">{{bot.webhook}}</p>
        </div>
        
        <div class="bots_list_elem_controls">
          <button @click="setBotEditModal(bot, index)">
             <v-icon class="icon" name="pen-nib"/>
          </button>
          <button @click="delBot(bot, index)">
            <v-icon class="icon" name="minus-circle"/>
          </button>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import Bots from "./Bots";

  export default {
    name: "BotsList",
    
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
        
      setBotEditModal(data, index) {
        this.SET_CURRENT_BOT({
          username: data.username,
          webhook: data.webhook,
          index: index,
          id: data.id,
        });
        this.SET_MODAL({name: "ModalBotEdit"});
      },
      delBot(data, index){
        this.SET_CURRENT_BOT({
          id:data.id,
          index:index
        });
        this.SET_MODAL({name: "ModalBotDelete"});
      }
    }
  }
</script>

<style scoped lang="scss">
  $name-width:40%;
  $webhook-width:60%;
  $controls-width:70px;
  .bots_list{
    margin: 0;
    margin-top: 10px;
    padding: 0;
    position: relative;
    background-color: #fff;
    li{
      list-style-type: none;
    }
    &_header{
      padding-right:$controls-width;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      text-align: center;
      font-size: 20px;
      color: #fff;
      background-color: rgba(18, 80, 146, 1);
      &_name{
        width: $name-width;
        border-right: solid 1px rgba(0,0,0,0.11);
      }
      &_webhook{
        width: $webhook-width;
      }
    }
    &_elem{
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 30px;
      &_info{
        position: relative;
        display: flex;
        flex-direction: row;
        width: calc(100% - #{$controls-width});
        text-align: left;
        &_name{
          width: $name-width;
          border-right: solid 1px rgba(0,0,0,0.11);
        }
        &_webhook{
          width: $webhook-width;
          text-decoration: underline;
          border-right: solid 1px rgba(0,0,0,0.11);
        }
        p{
          //Если не проходит валидацию - виноват text-overflow
          text-overflow: ellipsis;
          //Насчет данного пункта есть сомнения, возможно будет лучше hidden
          overflow: auto;
          padding-left: 5px;
          margin: auto 0;
          
          
        }
      }
      &_controls{
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-around;
        width: $controls-width;
        button{
          position: relative;
          margin: auto 0;
          width: 26px;
          height: 26px;
          color: #fff;
          border: none;
          border-radius: 5px;
          background-color: rgba(18, 80, 146, 1);
          svg{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      &:nth-child(odd){
        background-color: rgba(18, 80, 146, 0.2);
      }
    }
  }

  
</style>