<template>
  <div class="chat">
    <div class="chat-preloader" v-if="$store.state['channels'].isChannelLoading">
      <b-spinner label="Spinning" variant="primary"></b-spinner>
    </div>

    <ChatHeader/>

    <ChatMessages/>
  </div>
</template>

<script>
  import { BSpinner } from 'bootstrap-vue';
  import NotAuthorizedChatChatHeader from './NotAuthorizedChatHeader';
  import NotAuthorizedChatChatMessages from './NotAuthorizedChatMessages';
  import ChatHeader from '../Chat/ChatHeader';
  import ChatMessages from '../Chat/ChatMessages';

  export default {
    components: {
      BSpinner,
      NotAuthorizedChatChatHeader,
      NotAuthorizedChatChatMessages,
      ChatHeader,
      ChatMessages,
    },
    data() {
      return {
        over: false
      }
    },
    methods: {
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
</style>