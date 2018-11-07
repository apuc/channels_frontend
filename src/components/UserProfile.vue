<template>
  <div class="profile">
    <header class="profile__header">
      <div class="profile__pic">
        <img :src="this.currentUserInfo.avatar ? this.currentUserInfo.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e9022/hu0wa149Jn0.jpg?ava=1'" alt="">
      </div>

      <div class="profile__name">
        <span>{{currentUserInfo.username}}</span>
        <a :href="currentUserInfo.email">{{currentUserInfo.email}}</a>
        <span class="online">Online</span>
      </div>
    </header>

    <div class="controls">
      <a :href="'/create-channel'" class="btn btn-primary" @click="openModal($event, 'dialog','/create-channel')">Start chat with this user</a>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex';

  export default {
    name: "UserProfile",
    computed: {
      ...mapState('user', ['currentUserInfo']),
      ...mapState('channels', ['currentChannelUsers'])
    },
    methods: {
      ...mapMutations({
        setCurrentUserData: 'user/SET_CURRENT_USER_DATA',
        setModal: 'modal/SET_MODAL',
      }),
      ...mapActions({
        getUserData: 'user/GET_USER_DATA',
      }),
      openModal(e, modalType, modalLink) {
        e.preventDefault();
        this.setModal(modalType);
        history.pushState('', 'Title of page', modalLink);
      },
    },
    created() {
      if (!this.currentUserInfo.id) {
        window.onload = () => {
          const pathArray = location.pathname.split('/');
          const user_id = pathArray[pathArray.length - 1];
          this.getUserData(user_id);
        }
      }
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