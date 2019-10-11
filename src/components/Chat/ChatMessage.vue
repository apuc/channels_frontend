<template>
  <div class="message mb-1"
       :class="styleMessageAnother"
  >
    <div class="d-flex align-items-center">
      <router-link :to="`/user/${messageData.from.id}`" @click.native="GET_USER_DATA(messageData.from.id)">
        <img :src="userAvatar || noavatar"
             width="64"
             alt=""
             class="user-avatar"
        />
      </router-link>

      <h5 class="m-0 message-title">
        <router-link :to="`/user/${messageData.from.id}`" 
                     class="user-name"
                     @click.native="GET_USER_DATA(messageData.from.id)"
        >
          {{userName}}
        </router-link>
        <span class="message-time">{{ messageData['created_at'] }}</span>
      </h5>
    </div>
    
    <p class="text">{{messageData.text}}</p>
    <Attachment v-for="(attachment, index) in messageData.attachments"
                :key="index"
                :attachment="attachment"
                v-if="attachment"
                class="mb-1"
                :big="true"
    />
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import Attachment from '../Attachment/Attachment';

  export default {
    components: {Attachment},
    props: {
      messageData: {
        from: {
          avatar: String,
          id: Number,
          username: Number
        },
        channel: Number,
        attachments: Array,
        created_at: String,
        id: Number,
        read: Number,
        text: String,
        to: String
      }
    },
    computed: {
      ...mapGetters({
        currentChannelUsers: 'channels/currentChannelUsers',
        userData: 'user/userData',
      }),
      user() {
        if (this.currentChannelUsers) {
          return this.currentChannelUsers.find(user => user.user_id === this.messageData.from.id);
        }
      },
      userName() {
        if (this.user) {
          return this.user.username;
        }
      },
      userAvatar() {
        if (this.user) {
          return this.user.avatar ? this.user.avatar.small : this.noavatar;
        }
      },
      styleMessageAnother() {
        if (this.messageData) {
          return this.messageData.from.id !== this.userData.user_id ? 'message_another align-self-end' : '';
        }
      },
    },
    data() {
      return {
        noavatar: 'data:image/gif;base64,R0lGODdhMAAwAPAAAAAAAP///ywAAAAAMAAwAAAC8IyPqcvt3wCcDkiLc7C0qwyGHhSWpjQu5yqmCYsapyuvUUlvONmOZtfzgFzByTB10QgxOR0TqBQejhRNzOfkVJ+5YiUqrXF5Y5lKh/DeuNcP5yLWGsEbtLiOSpa/TPg7JpJHxyendzWTBfX0cxOnKPjgBzi4diinWGdkF8kjdfnycQZXZeYGejmJlZeGl9i2icVqaNVailT6F5iJ90m6mvuTS4OK05M0vDk0Q4XUtwvKOzrcd3iq9uisF81M1OIcR7lEewwcLp7tuNNkM3uNna3F2JQFo97Vriy/Xl4/f1cf5VWzXyym7PHhhx4dbgYKAAA7'
      }
    },
    mounted() {

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
    max-width: 80%;
    padding: 7px;

    background-color: rgba(18, 80, 146, 0.1);
    border-radius: 10px;
  }
  
  .message_another {
    background-color: rgba(4, 35, 69, 0.15);
  }

  .text {
    font-family: sans-serif;
    width: 100%;
    padding: 7px;
    padding-left: 0;
    margin: 0;
  }

  .message-title {
    display: flex;
    align-items: flex-end;
    width: 100%;
  }

  .message-time {
    flex: 1 0 auto;
    font-size: 12px;
    line-height: 1;
  }

  .user-avatar {
    width: 30px;
    height: 30px;
    margin-right: 10px;

    border-radius: 50%;
  }
  
  .user-name {
    margin-right: 10px;
    
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
    color: rgba(16, 52, 146, 0.75);
  }

  @media (max-width: 768px) {
    .message {
      width: 80%;
    }
    
    .message-title {
      display: flex;
      justify-content: space-between;
    }
  }

  @media (max-width: 576px) {
    .message {
      width: 100%;
      max-width: 100%;
    }
  }
</style>
