<template>
  <div class="page-wrapper">
    <Header />

    <div class="container home">
      <NotAuthorizedSidebarAuth/>

      <main class="main">
        <component :is="`NotAuthorizedChat${chooseChat}`" v-if="currentChannelData.id"></component>
        <ChatMessages />
        <!--<router-view v-else></router-view>-->
      </main>
    </div>


    <!--<NotAuthorizedSidebarInfo/>-->
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

  export default {
    name: "NotAuthorized",
    components: {
      ChatMessages,
      Header, NotAuthorizedSidebarInfo, NotAuthorizedSidebarAuth,NotAuthorizedChat, NotAuthorizedChatPrivate},
    mixins: [authGettingData],
    computed: {
      ...mapGetters({
        currentChannelData: 'channels/currentChannelData',
      }),
      chooseChat() {
        return this.currentChannelData.private ? 'Private' : '';
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
    },
    methods: {
      ...mapMutations('channels', ['SET_CURRENT_CHANNEL_DATA', 'SET_CURRENT_CHANNEL_USERS']),
      ...mapMutations({
        SET_MESSAGES: 'messages/SET_MESSAGES',
      }),
      ...mapActions({
        ADD_ATTACHMENTS: 'messages/ADD_ATTACHMENTS'
      }),
    }
  }
</script>

<style scoped>

</style>