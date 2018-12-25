<template>
  <section class="messages" ref="messagesList" v-scroll>
    <ChatMessage v-for="(message, index) in messages"
                 :messageData="message"
                 :key="index" />
  </section>
</template>

<script>
  import ChatMessage from './ChatMessage';
  import {scroll} from '../../directives/scroll';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return { }
    },
    directives: {
      scroll
    },
    methods: {
      ...mapActions({
        offTyping: 'messages/OFF_TYPING',
      }),
    },
    components: {
      ChatMessage
    },
    computed: {
        ...mapGetters({
            messages: 'messages/messages'
        })
    },
    beforeDestroy() {
      this.offTyping();
    }
  }
</script>

<style scoped>
  .messages {
    padding: 20px;
    flex-grow: 1;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
  }
</style>