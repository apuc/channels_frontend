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
        getNav: 'user/GET_NAV',
      }),
    },
    beforeMount() {
      console.log(321);
      // connectSocket(this.token)
      //     .then(() => console.log('Socket connected!'))
      //     .catch(err => console.error(err));
      if (!this.userInfo.user_id) {
        this.getUser().then(() => {
          console.log(123);
          this.getNav();
          // sendUserInfo({
          //     username: this.userInfo.username,
          //     id: this.userInfo.user_id
          // })
        });
      }
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