<template>
  <section class="messages" ref="messagesList">
    <ChatMessage v-for="(message, index) in messages"
                 :messageData="message"
                 :key="index" />
  </section>
</template>

<script>
  import ChatMessage from './NotAuthorizedChatMessage';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'NotAuthorizedChatMessages',
    components: {ChatMessage},
    computed: {
      ...mapGetters('messages', ['messages'])
    },
    methods: {
      scrollToBottom() {
        this.$refs['messagesList'].scrollTo(0, this.$refs['messagesList'].scrollHeight);
      },
      ...mapActions('messages', ['OFF_TYPING']),
    },
    mounted() {
      this.scrollToBottom();
    },
    updated() {
      this.scrollToBottom();
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