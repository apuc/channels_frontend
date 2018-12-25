<template>
  <div class="profile">
    <header class="profile__header">
      <div class="profile__pic">
        <img
          :src="this.currentUserInfo.avatar ? this.currentUserInfo.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e9022/hu0wa149Jn0.jpg?ava=1'"
          alt="">
      </div>

      <div class="profile__name">
        <span>{{currentUserInfo.username}}</span>
        <a :href="currentUserInfo.email">{{currentUserInfo.email}}</a>
        <span :class="status.status">{{ status.status }}</span>
      </div>
    </header>

    <div class="controls">
      <button type="button" class="btn btn-primary" @click="">Start chat with this user</button>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';


  export default {
    name: "UserProfile",
    computed: {
      ...mapGetters({
        status: 'status/status',
        currentUserInfo: 'user/currentUserInfo',
        currentChannelUsers: 'channels/currentChannelUsers',
        isUserLoading: 'user/isUserLoading',
      })
    },
    methods: {
      ...mapMutations({
        setCurrentUserData: 'user/SET_CURRENT_USER_DATA',
        setModal: 'modal/SET_MODAL',
        setUserPosition: 'user/SET_USER_POSITION',
      }),
      openModal(e, modalType) {
        e.preventDefault();
        this.setModal(modalType);
      },
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.setUserPosition('user')
      })
    },
    beforeRouteLeave(to, from, next) {
      this.setCurrentUserData({
        avatar: undefined,
        email: '',
        user_id: null,
        username: '',
      });

      next();
    }
  }
</script>

<style scoped>
  .profile {
    padding: 30px;
  }

  .profile__header {
    display: flex;
    align-items: center;
  }

  .profile__pic {
    width: 75px;
    height: 75px;
    margin-right: 15px;
  }

  .profile__pic img {
    height: 100%;
    width: 100%;

    object-fit: cover;
    border-radius: 5px;
  }

  .profile__name {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .online {
    color: green;
  }

  .offline {
    color: crimson;
  }

  .controls {
    margin-top: 20px;
  }
</style>