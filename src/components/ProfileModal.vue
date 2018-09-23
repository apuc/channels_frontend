<template>
  <div class="profile">
    <div class="backdrop" @click="closeModal"></div>

    <div class="profile__container container">
      <button
        type="button"
        class="close"
        @click="closeModal"
      >Close</button>

      <header class="container__header">
        <img :src="user.avatar"
             alt=""
             class="portrait"
        >

        <h4>{{ user.name }}</h4>
      </header>

      <div class="container__content">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileModal",
    computed: {
      getUserInfo() {
        return this.$store.getters.userProfileInfo;
      }
    },
    data() {
      return {
        user: {}
      }
    },
    methods: {
      closeModal() {
        this.$store.commit('deleteCurrentUserInfo');
        this.$store.commit('deleteUserModal');
        this.$router.go(-1);
      }
    },
    created() {
      this.$store.watch(state => {
        console.log(this.$store.getters.userProfileInfo);
        return this.$store.userProfileInfo
      })
    }
  }
</script>

<style scoped>
  .profile {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    
    width: 100%;
    height: 100%;
  }
  
  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    
    width: 100%;
    height: 100%;

    background-color: rgba(0,0,0, 0.4);
  }
  
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    
    width: 500px;
    height: 300px;
    padding: 30px;

    background-color: #fff;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;

    cursor: pointer;
  }

  .container__header {
    display: flex;
    align-items: center;
  }

  .portrait {
    width: 50px;
    height: 50px;
    margin-right: 20px;

    object-fit: cover;
    border-radius: 50%;
  }
</style>