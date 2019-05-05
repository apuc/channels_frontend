<template>
  <div class="chat">
    <NotAuthorizedChatChatHeader/>
    <NotAuthorizedChatChatMessages/>
  </div>
</template>

<script>
  import NotAuthorizedChatChatHeader from './NotAuthorizedChatHeader';
  import NotAuthorizedChatChatMessages from './NotAuthorizedChatMessages';

  export default {
    components: {
      NotAuthorizedChatChatHeader,
      NotAuthorizedChatChatMessages,
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