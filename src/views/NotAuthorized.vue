<template>
  <div class="home">
    <NotAuthorizedSidebarAuth/>

    <main class="main">
      <component :is="`NotAuthorizedChat${chooseChat}`"></component>
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
    created() {
      this.$_authGettingData_gettingData();
    }
  }
</script>

<style scoped>
  .home {
    display: flex;
    width: 100%;
    overflow: hidden;
    min-height: 600px;
    height: 100vh;
  }

  .main {
    flex-grow: 1;
    height: 100%;
  }
</style>