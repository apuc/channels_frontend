<template>
  <section class="messages" ref="messagesList" v-scroll>
    <ChatMessage v-for="(message, index) in messages"
                 :messageData="message"
                 :key="index"/>
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
      }),
    },
    data() {
      return {
        // messages: [
        //   {
        //     "message_id": 1001,
        //     "channel": "108",
        //     "to": null,
        //     "from": 1,
        //     "read": 0,
        //     "created_at": "26-10-2018 14:44:45",
        //     "text": "Привет"
        //   },
        //   {
        //     "message_id": 1002,
        //     "channel": "108",
        //     "to": null,
        //     "from": 3,
        //     "read": 0,
        //     "created_at": "26-10-2018 14:44:46",
        //     "text": "Привет"
        //   },
        //   {
        //     "message_id": 1003,
        //     "channel": "108",
        //     "to": null,
        //     "from": 1,
        //     "read": 0,
        //     "created_at": "26-10-2018 14:44:47",
        //     "text": "Привет"
        //   },
        // ]
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