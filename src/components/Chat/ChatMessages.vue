<template>
  <section class="messages" ref="messagesList" @scroll="onScroll">
    <ChatMessage v-for="(message, index) in messages"
                 :messageData="message"
                 :key="index"
                 ref="single-message"
    />
  </section>
</template>

<script>
  import ChatMessage from './ChatMessage';
  import {scroll} from '../../directives/scroll';
  import {mapGetters, mapActions} from 'vuex';

  export default {
    components: {ChatMessage},
    directives: {
      scroll
    },
      
    computed: {
      ...mapGetters({
        messages: 'messages/messages',
        currentChannel: 'channels/currentChannelData',
      }),
        
      lastPage(){
         return this.$store.state.messages.currentPage == this.$store.state.messages.lastPage; 
      },  
    },
      
    methods: {
      ...mapActions({
        OFF_TYPING: 'messages/OFF_TYPING',
        GET_MESSAGES: 'messages/GET_MESSAGES',
      }),
        
       /**
        *Подгрузка новых сообщений при скроле чата 
        */ 
      onScroll ({ target }) {
            if (target.scrollTop == 0 && !this.lastPage && this.currentChannel.type !== 'wall') {
                this.isScroll = true;
                this.GET_MESSAGES(true).then(res => {});
            }
            
            let isBottom = target.scrollTop + target.clientHeight >= target.scrollHeight;
            
            if(isBottom && !this.lastPage && this.currentChannel.type === 'wall'){
                this.GET_MESSAGES(true).then(res => {});
            }
      },

        /**
         * Высота новых сообщений
         * @returns {number}
         */
      getScrollHeight(){
          let messages = this.$refs['single-message'].slice(0,19);
          let height = 0;
          
          for(let message of messages){
              height+= message.$el.offsetHeight;
          }
          
          return height
      }  
    },
      
    data() {
      return {
          isScroll:false,
      }
    },

      /**
       * Скролл при открытии чата
        */
      updated(){
        if(this.isScroll){
            this.$el.scrollTo(0,this.getScrollHeight());
            this.isScroll = false;
            return;
        }
        
        if(this.currentChannel.type == 'wall'){
            return;
        }
        
        this.$el.scrollTo(0,this.$el.scrollHeight);
    },  
      
    beforeDestroy() {
      this.OFF_TYPING();
    }
  }
</script>

<style scoped>
  .messages {
    flex-grow: 1;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    max-height: calc(100vh - 292px);
  }
  
  @media (max-width: 768px) {
    .messages {
      padding: 10px;
    }
  }
</style>