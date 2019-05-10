<template>
  <div class="placeholder" 
       v-if="isChannelUsersLoading"
       :style="calculatePlaceholders"
  ></div>

  <ul class="users-list" v-else>
    <li class="user" v-for="user in currentChannelSearchUsers" :key="user.email">
      <div class="mr-1">
        <div class="user-info">
          <div class="image-wrap">
            <img class="img"
                 :src="user.avatar ? user.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e901b/c09P-QuYY18.jpg'"
                 width="30" height="30" alt="">
          </div>

          <div>
            <router-link :to="`/user/${user.user_id}`"
                         @click.native="goToProfile(user.user_id)"
            >
              {{user.username}}
            </router-link>
          </div>
        </div>
      </div>

      <div>
        <button type="button"
                class="btn btn-sm btn-primary mr10"
                title="Добавить в друзья"
                @click="makeFriendshipRequest($event.target, {user_id: userData.user_id, contact_id: user.user_id})"
                v-if="userData.user_id !== user.user_id && !findUserContact(user.user_id)"
        >
          <v-icon scale="1" class="icon" name="user-plus"/>
        </button>

        <button v-if="userData.user_id === currentChannelData.owner_id"
                type="button"
                class="btn btn-sm btn-danger"
                title="Удалить из канала"
                @click="DELETE_USER_FROM_CHANNEL(user.user_id)"
        >
          <v-icon scale="1" class="icon" name="user-minus"/>
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex';

  export default {
    name: "ModalChannelUsersPreview",
    computed: {
      ...mapGetters('channels', ['isChannelUsersLoading', 'currentChannelData', 'currentChannelSearchUsers']),
      ...mapGetters('user', ['userData', 'findUserContact']),
      calculatePlaceholders() {
        const height = 45;
        if (this.currentChannelData.count < 5 && this.currentChannelData.count > 0) {
          return `height: ${height * this.currentChannelData.count}px`
        } else {
          return 'height: 135px'
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      ...mapMutations({
        DELETE_MODAL: 'modal/DELETE_MODAL',
      }),
      ...mapActions('user', ['SEND_FRIENDSHIP_REQUEST', 'GET_USER_DATA']),
      ...mapActions({
        DELETE_USER_FROM_CHANNEL: 'channels/DELETE_USER_FROM_CHANNEL',
      }),
      goToProfile(id) {
        this.GET_USER_DATA(id);
        this.DELETE_MODAL();
      },
      makeFriendshipRequest(target, data) {
        this.SEND_FRIENDSHIP_REQUEST({
          user_id: data.user_id,
          contact_id: data.contact_id
        });
        target.remove();
      }
    }
  }
</script>

<style scoped>
  .users-list {
    max-height: 300px;
    margin: 0;
    margin-top: 10px;
    padding: 0;
    overflow: auto;
  }

  .user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 3px;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  .img {
    display: block;
  }

  .placeholder {
    width: 100%;
    height: 180px;

    background-image: radial-gradient(circle 15px at 20px, lightgray 99%, transparent 0),
    linear-gradient(lightgray 12px, transparent 0);
    background-size: 40px 45px, 80% 45px;
    background-position: 0 5px, 50px 21.5px;
    background-repeat: repeat-y;

    animation: shine 1.5s infinite;
  }

  @keyframes shine {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.6;
    }

    100% {
      opacity: 1;
    }
  }
</style>
