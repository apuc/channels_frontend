<template>
  <aside class="p-3 bg-light">
    <div v-if="userPosition === 'channel'">
      <img :src="currentChannelData.avatar ? currentChannelData.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e9022/hu0wa149Jn0.jpg?ava=1'" alt="">

      <p>{{currentChannelData.title}}</p>
      <p>{{currentChannelData.status}}</p>
      <p>{{currentChannelData.type}}</p>
      <p>{{currentChannelData.private}}</p>
    </div>

    <div v-if="userPosition === 'currentGroupData'">
      <img :src="currentGroupData.avatar ? currentGroupData.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e9022/hu0wa149Jn0.jpg?ava=1'" alt="">

      <p>{{currentGroupData.title}}</p>
      <p>{{currentGroupData.status}}</p>
    </div>
  </aside>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "NotAuthorizedSidebarInfo",

    computed: {
      ...mapGetters({
        currentChannelData: 'channels/currentChannelData',
        currentGroupData: 'groups/currentGroupData',
        userPosition: 'user/userPosition',
      }),
    },
  }
</script>

<style scoped>
  aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 100vh;
    padding: 30px;

    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .info {
    width: 80%;
    min-height: 300px;
  }

  .info__img {
    width: 100%;
    height: calc(100% - 40px);
  }

  img {
    width: 100%;
    height: auto;
  }
</style>