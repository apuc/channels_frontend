<template>
  <section class="messages" ref="messagesList">
    <ChatMessage v-for="(message, index) in messages"
                 :messageData="message"
                 :key="index" />
  </section>
</template>

<script>
  import ChatMessage from './ChatMessage';
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return { }
    },
    methods:{

    },
    mounted() {
      this.$refs['messagesList'].scrollTo(0, this.$refs['messagesList'].scrollHeight);
    },
    components: {
      ChatMessage
    },
    computed: {
        ...mapGetters({
            messages: 'messages/messages'
        })
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