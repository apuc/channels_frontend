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
    beforeDestroy() {
      this.OFF_TYPING();
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