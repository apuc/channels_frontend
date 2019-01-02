<template>
  <aside class="p-3 bg-light">
    <div v-if="userPosition === 'channel'">
      <img :src="channel.avatar ? channel.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e9022/hu0wa149Jn0.jpg?ava=1'" alt="">

      <p>{{channel.title}}</p>
      <p>{{channel.status}}</p>
      <p>{{channel.type}}</p>
      <p>{{channel.private}}</p>
    </div>

    <div v-if="userPosition === 'group'">
      <img :src="group.avatar ? group.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e9022/hu0wa149Jn0.jpg?ava=1'" alt="">

      <p>{{group.title}}</p>
      <p>{{group.status}}</p>
    </div>
  </aside>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "NotAuthorizedSidebarInfo",

    computed: {
      ...mapGetters({
        channel: 'channels/currentChannelData',
        group: 'groups/currentGroupData',
        userPosition: 'user/userPosition',
      }),
    },
    data() {
      return {

      }
    }
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