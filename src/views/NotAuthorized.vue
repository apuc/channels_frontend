<template>
  <div class="page-wrapper">
    <div class="container home">
      <NotAuthorizedSidebarAuth/>

      <main class="main">
        <component :is="`NotAuthorizedChat${chooseChat}`" v-if="currentChannelData._id"></component>
        <router-view v-else></router-view>
      </main>
    </div>


    <!--<NotAuthorizedSidebarInfo/>-->
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
        currentChannelData: 'channels/currentChannelData',
      }),
      chooseChat() {
        return this.currentChannelData.private ? 'Private' : '';
      }
    },
  }
</script>

<style scoped>

</style>