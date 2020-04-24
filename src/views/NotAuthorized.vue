<template>
  <div class="page-wrapper notAuth">
    <Header v-model="isSidebarVisible"/>

    <div class="container home"
         v-touch:swipe.right="$_sidebarSlide_showSidebar"
         v-touch:swipe.left="$_sidebarSlide_hideSidebar"
    >
      <transition name="slide" mode="out-in">
        <NotAuthorizedSidebarAuth />
      </transition>

      <main class="main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
  import NotAuthorizedSidebarAuth from '../components/NotAuthorized/NotAuthorizedSidebarAuth';
  import authGettingData from '../mixins/authGettingData';
  import NotAuthorizedSidebarInfo from "../components/NotAuthorized/NotAuthorizedSidebarInfo";
  import NotAuthorizedChat from '../components/NotAuthorized/NotAuthorizedChat';
  import NotAuthorizedChatPrivate from '../components/NotAuthorized/NotAuthorizedChatPrivate';
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import Header from "../components/Header/Header";
  import ChatMessages from "../components/Chat/ChatMessages";
  import sideBarSlide from "../mixins/sideBarSlide";
  import Chat from "../components/Chat/Chat";

  export default {
    name: "NotAuthorized",
    
    components: {
      Chat,
      ChatMessages,
      Header, NotAuthorizedSidebarInfo, NotAuthorizedSidebarAuth,NotAuthorizedChat, NotAuthorizedChatPrivate
    },
    
    mixins: [authGettingData, sideBarSlide],
    
    computed: {
      ...mapGetters({
        currentChannelData: 'channels/currentChannelData',
      }),
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
      this.SET_CURRENT_CHANNEL_USERS([]);
      this.CLEAR_MESSAGES();
    },
    
    methods: {
      ...mapMutations('channels', ['SET_CURRENT_CHANNEL_DATA', 'SET_CURRENT_CHANNEL_USERS']),
      ...mapMutations({
        SET_MESSAGES: 'messages/SET_MESSAGES',
        CLEAR_MESSAGES: 'messages/CLEAR_MESSAGES',
      }),
      ...mapActions({
        ADD_ATTACHMENTS: 'messages/ADD_ATTACHMENTS'
      }),
    }
  }
</script>

<style scoped>

</style>