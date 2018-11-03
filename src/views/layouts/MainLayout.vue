<template>
  <div class="home">
    <Nav/>
    <main>
      <slot/>
    </main>
    <Advertisings/>
  </div>
</template>

<script>
  import Nav from '../../components/nav/Nav';
  import Advertisings from '../../components/ads/Advertisings';
  import {connectSocket} from '../../services/socket/socket.service';
  import {sendUserInfo} from '../../services/socket/user.service';
  import {mapGetters, mapActions} from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        token: 'auth/token',
        userInfo: 'user/info'
      })
    },
    data() {
      return {}
    },
    components: {
      Advertisings,
      Nav
    },
    methods: {
      ...mapActions({
        getUser: 'user/GET_USER',
      }),
    },
    beforeMount() {
      // connectSocket(this.token)
      //     .then(() => console.log('Socket connected!'))
      //     .catch(err => console.error(err));
      this.getUser().then(() => {
        // sendUserInfo({
        //     username: this.userInfo.username,
        //     id: this.userInfo.user_id
        // })
      });
    }
  }
</script>


<style scoped>
  .home {
    display: flex;
    width: 100%;
    overflow: hidden;
    min-height: 600px;
    height: 100vh;
  }

  main {
    height: 100%;
    flex-grow: 1;
  }
</style>