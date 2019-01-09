<template>
  <div class="chat" @dragenter.prevent="dragSwitcher" @dragleave.prevent="dragSwitcher">
    <ChatHeader/>
    <ChatMessages/>
    <ChatFooter/>
    <div class="chat__drag-zone" v-if="over" @dragover.prevent @drop.prevent.stop="onDrop">
      <p class="chat__drag-tip">Drop area</p>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex'
  import ChatHeader from './ChatHeader';
  import ChatMessages from './ChatMessages';
  import ChatFooter from '../chat/ChatFooter';
  import Attachment from '../attachment/Attachment';

  export default {
    components: {
      Attachment,
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
      ...mapMutations('channels', ['SET_CURRENT_CHANNEL_DATA', 'SET_CURRENT_CHANNEL_USERS']),
      ...mapMutations({
        SET_MESSAGES: 'messages/SET_MESSAGES',
      }),
      ...mapActions({
        ADD_ATTACHMENTS: 'messages/ADD_ATTACHMENTS'
      }),
      dragSwitcher() {
        this.over = !this.over;
      },
      onDrop(e) {
        this.dragSwitcher();
        this.ADD_ATTACHMENTS(e.dataTransfer.files);
      }
    },
    beforeDestroy() {
      this.SET_CURRENT_CHANNEL_DATA({
        id: '',
        title: '',
        slug: '',
        status: '',
        count: '',
        owner_id: '',
        type: '',
        private: '',
        avatar: undefined,
      });
      this.SET_CURRENT_CHANNEL_USERS({
        id: '',
        title: '',
        slug: '',
        status: '',
        owner_id: '',
        avatar: undefined,
      });
      this.SET_MESSAGES([]);
    }
  }

</script>

<style scoped>
  .chat {
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    overflow-y: auto;
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