<template>
  <div class="chat" @dragenter.prevent="dragSwitcher" @dragleave.prevent="dragSwitcher">
    <ChatHeader/>
    <ChatMessages/>
    <ChatFooter/>
    <div class="chat__drag-zone" v-if="over">
      <p class="chat__drag-tip">Drop area</p>
    </div>
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
    },
    data() {
      return {
        over: false
      }
    },
    methods: {
      dragSwitcher() {
        this.over = !this.over;
      }
    }
  }

</script>

<style scoped>
  .chat {
    position: relative;
    z-index: 1;

    height: 100%;
    display: flex;
    flex-direction: column;
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