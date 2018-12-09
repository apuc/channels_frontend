<template>
  <section class="messages" ref="messagesList">
    <ChatMessage v-for="(message, index) in messages"
                 :messageData="message"
                 :key="index" />
  </section>
</template>

<script>
  import ChatMessage from './ChatMessage';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return { }
    },
    methods: {
      scrollToBottom() {
        this.$refs['messagesList'].scrollTo(0, this.$refs['messagesList'].scrollHeight);
      },
      ...mapActions({
        offTyping: 'messages/OFF_TYPING',
      }),
    },
    mounted() {
      this.scrollToBottom();
    },
    updated() {
      this.scrollToBottom();
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