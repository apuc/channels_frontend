<template>
  <b-card class="mb-3" :class="user.id === myId ? 'dirRtl' : '' ">
    <b-media>
      <div class="flex">
        <a :href="'/user/' + user.slug" @click="openUserProfile($event, user)">
          <img :src="user.avatar" width="64" alt="placeholder"/>
        </a>

        <h5 class="mt-0">
          <a :href="'/user/' + user.slug" @click="openUserProfile($event, user)">{{user.name}}</a>
        </h5>
        <p class="text">{{message}}</p>
      </div>
    </b-media>
  </b-card>
</template>

<script>

  export default {
    components: {},
    data() {
      return {
        myId: 111,
      }
    },
    props: {
      user: {
        name: String,
        avatar: String,
        slug: String,
        id: String
      },
      message: String
    },
    methods: {
      openUserProfile(e, user) {
        e.preventDefault();
        // this.$store.commit({
        //   type: 'user/setCurrentUserInfo',
        //   user: {
        //     name: user.name,
        //     id: user.id,
        //     avatar: user.avatar,
        //     slug: user.slug
        //   }
        // });
        this.$store.dispatch('user/setCurrentUserInfo', {
          name: user.name,
          id: user.id,
          avatar: user.avatar,
          slug: user.slug
        });
        this.$store.commit('user/setUserModal');
        history.pushState('', 'Title of page', `/user/${this.user.slug}`);
      },
    }
  }
</script>

<style scoped>
  .dirRtl {
    direction: rtl;
    text-align: right;
  }

  .flex {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .text {
    width: 100%;
  }
</style>