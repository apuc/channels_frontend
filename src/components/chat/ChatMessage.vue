<template>
  <b-card class="message mb-3">
    <b-media>
      <div class="flex">
        <a :href="'/user/'" @click="openUserProfile($event, messageData.user)">
          <img :src="noavatar" width="64" alt="placeholder"/>
        </a>

        <h5 class="mt-0 message-title" >
          <a :href="'/user/'" @click="openUserProfile($event, messageData.user)">{{messageData.from.username}}</a>
          <span class="message-time">{{ messageData['created_at'] }}</span>
        </h5>

      </div>
      <pre class="text">{{messageData.text}}</pre>
    </b-media>

  </b-card>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

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
        noavatar: 'data:image/gif;base64,R0lGODdhMAAwAPAAAAAAAP///ywAAAAAMAAwAAAC8IyPqcvt3wCcDkiLc7C0qwyGHhSWpjQu5yqmCYsapyuvUUlvONmOZtfzgFzByTB10QgxOR0TqBQejhRNzOfkVJ+5YiUqrXF5Y5lKh/DeuNcP5yLWGsEbtLiOSpa/TPg7JpJHxyendzWTBfX0cxOnKPjgBzi4diinWGdkF8kjdfnycQZXZeYGejmJlZeGl9i2icVqaNVailT6F5iJ90m6mvuTS4OK05M0vDk0Q4XUtwvKOzrcd3iq9uisF81M1OIcR7lEewwcLp7tuNNkM3uNna3F2JQFo97Vriy/Xl4/f1cf5VWzXyym7PHhhx4dbgYKAAA7'
      }
    },
    props: {
      messageData: Object
    },
    methods: {
      ...mapMutations({
        setModal: 'modal/SET_MODAL',
      }),
      ...mapActions({
        setCurrentUserInfo: 'modal/SET_CURRENT_USER_INFO',
      }),
      openUserProfile(e) {
        e.preventDefault();
        this.setModal('userProfile');
        this.setCurrentUserInfo({
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

  .flex {
    display: flex;
    align-items: center;
  }

  .text {
    font-family: cursive;
    width: 100%;
    padding: 10px;
    margin: 0;
  }
  .message-title {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .message-time {
    font-size: 12px;
  }
</style>