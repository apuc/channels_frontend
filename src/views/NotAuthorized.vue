<template>
  <div class="page-wrapper notAuth">
    <Header v-model="sidebarIsOpened"/>

    <div class="container home"
         v-touch:swipe.right="swipeSidebar('open')"
         v-touch:swipe.left="swipeSidebar('close')"
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
  import Chat from "../components/Chat/Chat";

  export default {
    name: "NotAuthorized",
    
    components: {
      Chat,
      ChatMessages,
      Header, NotAuthorizedSidebarInfo, NotAuthorizedSidebarAuth,NotAuthorizedChat, NotAuthorizedChatPrivate
    },
    
    mixins: [authGettingData],
    
    computed: {
      ...mapGetters({currentChannelData: 'channels/currentChannelData',}),
      ...mapGetters({sidebarIsOpened: 'nav/sidebarIsOpened',}),
      ...mapGetters({deviceIsMobile: 'common/deviceIsMobile'}),
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
        OPEN_SIDEBAR: 'nav/OPEN_SIDEBAR',
        CLOSE_SIDEBAR: 'nav/CLOSE_SIDEBAR',
      }),
      swipeSidebar(mode) {
        if(!this.deviceIsMobile) {
          return;
        }
        switch(mode) {
          case 'open': 
            this.OPEN_SIDEBAR();
            break;
          case 'close':
            this.CLOSE_SIDEBAR();
            break;
          default: return;
        }
      },
    }
  }
</script>

<style scoped>

</style>