<template>
  <div class="chat" 
       @dragenter.prevent="dragSwitcher"
       @dragleave.prevent="dragSwitcher"
  >
    <ChatHeader/>
    
    <ChatMessages/>
    
    <ChatFooter v-if="showFooterWall && userInCurrentChannel(userData.user_id)"/>
    
    <div v-else class="not-in-channel">
      {{footerText}}
    </div>
    
    <div 
      v-if="showFooterWall && userInCurrentChannel(userData.user_id) && over" 
      class="chat__drag-zone"
      @dragover.prevent 
      @drop.prevent.stop="onDrop"
    >
      <p class="chat__drag-tip">Drop area</p>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters } from 'vuex'
  import ChatHeader from './ChatHeader';
  import ChatMessages from './ChatMessages';
  import ChatFooter from '../Chat/ChatFooter';
  import Attachment from '../Attachment/Attachment';

  export default {
      
    components: {
      Attachment,
      ChatHeader,
      ChatMessages,
      ChatFooter
    },
      
    data() {
      return {
        over: false
      }
    },
      
    computed:{
        ...mapGetters({
            userInCurrentChannel: 'channels/userInCurrentChannel',
            currentChannelData: 'channels/currentChannelData',
            userData:'user/userData',
            currentChannelUsers:'channels/currentChannelUsers',
        }),

        /**
         * Показывать ли футер для канала типа стена
         * @returns {boolean}
         */
        showFooterWall(){
           let channel = this.$store.getters['channels/currentChannelData'];
           let currentUser = this.$store.getters['user/userData'].user_id;
           
           if(channel.type == 'wall' && currentUser != channel.owner_id){
               return false;
           }
           
           return true;
        },

        /**
         * Текст если отправка сообщений не доступна
         * @returns {string}
         */
        footerText(){
            let channelType = this.$store.getters['channels/currentChannelData'].type;
            
            if(channelType == 'chat'){
                return 'Чтобы отправлять сообщения вступите в канал!'
            }
            
            return '';
        }
    },  
      
    methods: {
      ...mapMutations('channels', ['SET_CURRENT_CHANNEL_DATA', 'SET_CURRENT_CHANNEL_USERS']),
      ...mapMutations({
        SET_MESSAGES: 'messages/SET_MESSAGES',
        CLEAR_MESSAGES: 'messages/CLEAR_MESSAGES',
      }),
      ...mapActions({
        ADD_ATTACHMENTS: 'messages/ADD_ATTACHMENTS',
      }),
        
      dragSwitcher() {
        this.over = !this.over;
      },
        
      onDrop(e) {
        this.dragSwitcher();
        this.ADD_ATTACHMENTS(e.dataTransfer.files);
      }
    },
      
    beforeDestroy() {
      this.SET_CURRENT_CHANNEL_DATA({
        id: '',
        title: '',
        slug: '',
        status: '',
        count: '',
        owner_id: '',
        type: '',
        private: '',
        avatar: undefined,
      });
      
      this.SET_CURRENT_CHANNEL_USERS([]);
      this.CLEAR_MESSAGES();
    }
  }

</script>

<style scoped>
  .chat {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  .chat__drag-zone {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    background: rgba(255,255,255, 0.6);
    border: 2px dashed #ccc;
    border-radius: 5px;
  }
  
  .chat__drag-tip {
    font-size: 24px;
    color: #ccc;
  }
  
  .not-in-channel{
    padding: 30px;
    text-align: center;
  }
</style>