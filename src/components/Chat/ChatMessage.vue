<template>
  <b-card class="message mb-3">
    <b-media>
      <div class="flex">
        <router-link :to="'/user/'+messageData.from.user_id" @click.native="GET_USER_DATA(messageData.from.user_id)">
          <img :src="messageData.from.avatar || noavatar" width="64" alt="placeholder"/>
        </router-link>

        <h5 class="mt-0 message-title" >
          <router-link :to="'/user/'+messageData.from.user_id" @click.native="GET_USER_DATA(messageData.from.user_id)">{{messageData.from.username}}</router-link>
          <span class="message-time">{{ messageData['created_at'] }}</span>
        </h5>

      </div>
      <pre class="text">{{messageData.text}}</pre>
      <Attachment v-for="(attachment, index) in messageData.attachments" :attachment="attachment" :key="index" />
    </b-media>
  </b-card>
</template>

<script>
  import {mapActions} from 'vuex';
  import Attachment from '../Attachment/Attachment';

  export default {
    components: {Attachment},
    props: {
      messageData: Object
    },
    data() {
      return {
        noavatar: 'data:image/gif;base64,R0lGODdhMAAwAPAAAAAAAP///ywAAAAAMAAwAAAC8IyPqcvt3wCcDkiLc7C0qwyGHhSWpjQu5yqmCYsapyuvUUlvONmOZtfzgFzByTB10QgxOR0TqBQejhRNzOfkVJ+5YiUqrXF5Y5lKh/DeuNcP5yLWGsEbtLiOSpa/TPg7JpJHxyendzWTBfX0cxOnKPjgBzi4diinWGdkF8kjdfnycQZXZeYGejmJlZeGl9i2icVqaNVailT6F5iJ90m6mvuTS4OK05M0vDk0Q4XUtwvKOzrcd3iq9uisF81M1OIcR7lEewwcLp7tuNNkM3uNna3F2JQFo97Vriy/Xl4/f1cf5VWzXyym7PHhhx4dbgYKAAA7'
      }
    },
    methods: {
      ...mapActions({
        GET_USER_DATA: 'user/GET_USER_DATA',
      }),
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