<template>
  <section class="messages" ref="messagesList" v-scroll="scrollData" @scroll="onScroll">
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
        messages: 'messages/messages'
      })
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
            this.scrollData.bottom = false;
            this.scrollData.top = target.scrollHeight;
            
            if (target.scrollTop == 0 && this.$store.state.messages.currentPage != this.$store.state.messages.lastPage) {
                this.GET_MESSAGES(true).then(res => {
                    this.scrollData.bottom = true;
                    this.$nextTick(()=>{
                        target.scrollTo(0,this.getScrollHeight())
                    })
                });
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
          scrollData:{
              top:0,
              bottom:true,
          }
      }
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
  }
  
  @media (max-width: 768px) {
    .messages {
      padding: 10px;
    }
  }
</style>