<template>
  <div class="placeholder"
       v-if="isChannelUsersLoading"
       :style="calculatePlaceholders"
  ></div>
  <ul class="users-list" v-else>
    <li v-for="(user, index) in currentChannelUsers" :key="index">
      <div>
        <div class="user-info">
          <div class="image-wrap">
            <img
              :src="user.avatar ? user.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e901b/c09P-QuYY18.jpg'"
              width="30" height="30" alt="">
          </div>

          <div>
            <router-link :to="`/user/${user.user_id}`" @click.native="goToUserProfile(user.user_id)">{{user.username}}
            </router-link>
          </div>
        </div>
      </div>

      <button type="button" class="btn btn-sm btn-danger" @click="removeUser(user.user_id)">
        <v-icon scale="1" class="icon" name="user-minus"/>
      </button>
    </li>
  </ul>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "UsersPreview",
    computed: {
      ...mapGetters({
        currentChannelUsers: 'channels/currentChannelUsers',
        isChannelUsersLoading: 'channels/isChannelUsersLoading',
        currentChannelData: 'channels/currentChannelData',
      }),
      calculatePlaceholders() {
        const height = 45;
        if (this.currentChannelData.user_count < 5 && this.currentChannelData.user_count > 0) {
          return `height: ${height * this.currentChannelData.user_count}px`
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
        setCurrentUserData: 'user/SET_CURRENT_USER_DATA',
      }),
      ...mapActions({
        deleteUser: 'channels/DELETE_USER',
        closeModal: 'modal/CLOSE_MODAL_EDIT_MODE'
      }),
      removeUser(id) {
        this.deleteUser(id);
      },
      setUserData(id) {
        const getUser = this.currentChannelUsers.find(user => user.user_id === id);
        this.setCurrentUserData(getUser);
      },
      goToUserProfile(id) {
        this.setUserData(id);
        this.closeModal('channelUsers');
      }
    }
  }
</script>

<style scoped>
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 3px;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  .image-wrap {
    width: 30px;
    height: 30px;
    margin-right: 10px;

    background-color: #cccccc;
    border-radius: 50%;
  }

  img {
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