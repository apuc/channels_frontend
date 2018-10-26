<template>
  <b-card class="message mb-3" :class="user.id === myId ? 'dirRtl' : '' ">
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
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        userInfo: 'modal/userProfileInfo',
        modal: 'modal/setUserProfile'
      }),
    },
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
      openUserProfile(e) {
        e.preventDefault();
        this.$store.commit('modal/setModal', 'userProfile');
        this.$store.commit('modal/currentModal', 'userProfile');
        this.$store.dispatch('modal/setCurrentUserInfo', {
          name: this.user.name,
          id: this.user.id,
          avatar: this.user.avatar,
          slug: this.user.slug
        });
        history.pushState('', 'Title of page', `/user/${this.user.slug}`);
      },
    }
  }
</script>

<style scoped>
  .message {
    flex-shrink: 0;
  }
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