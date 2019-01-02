<template>
  <div class="home">
    <NotAuthorizedSidebarAuth/>

    <main class="main">
      <component :is="`NotAuthorizedChat${chooseChat}`" v-if="currentChannel.channel_id"></component>
      <router-view v-else></router-view>
    </main>


    <NotAuthorizedSidebarInfo/>
  </div>
</template>

<script>
  import NotAuthorizedSidebarAuth from '../components/NotAuthorized/NotAuthorizedSidebarAuth';
  import authGettingData from '../authGettingData';
  import NotAuthorizedSidebarInfo from "../components/NotAuthorized/NotAuthorizedSidebarInfo";
  import NotAuthorizedChat from '../components/NotAuthorized/NotAuthorizedChat';
  import NotAuthorizedChatPrivate from '../components/NotAuthorized/NotAuthorizedChatPrivate';
  import {mapGetters} from 'vuex';

  export default {
    name: "NotAuthorized",
    components: {NotAuthorizedSidebarInfo, NotAuthorizedSidebarAuth,NotAuthorizedChat, NotAuthorizedChatPrivate},
    mixins: [authGettingData],
    computed: {
      ...mapGetters({
        currentChannel: 'channels/currentChannelData',
      }),
      chooseChat() {
        return this.currentChannel.private ? 'Private' : '';
      }
    },
  }
</script>

<style scoped>
  .home {
    display: grid;
    grid-template-columns: 16.7% auto 16.7%;
    width: 100%;
    min-height: 100vh;
  }

  .main {
    display: grid;
    height: 100vh;
    overflow-y: auto;
  }
</style>