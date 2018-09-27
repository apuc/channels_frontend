<template>
  <div class="chat col-md-6 p-0">
    <ChatHeader/>
    <ChatMessages/>
    <ChatFooter/>
  </div>
</template>

<script>
  import ChatHeader from './ChatHeader';
  import ChatMessages from './ChatMessages';
  import ChatFooter from './ChatFooter';

  export default {
    components: {
      ChatHeader,
      ChatMessages,
      ChatFooter
    }
  }

</script>

<style scoped>
  .chat {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>