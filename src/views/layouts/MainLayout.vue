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
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        token: 'auth/token',
        userInfo: 'user/info',
        authStatus: 'auth/gettingTokenAndData',
      })
    },
    data() {
      return {
        currentDateInSeconds: Math.round(Date.now() / 1000),
        tokenExpiresIn: Number(localStorage.getItem('T_expires_at')),
        refreshTokenExpiresIn: Number(localStorage.getItem('RT_expires_at')),
      }
    },
    components: {
      Advertisings,
      Nav
    },
    methods: {
      ...mapMutations({
        gettingUserData: 'auth/GETTING_TOKEN_AND_DATA',
      }),
      ...mapActions({
        getUser: 'user/GET_USER',
        getNav: 'user/GET_NAV',
      }),
    },
    beforeMount() {
      connectSocket(this.token)
          .then(() => console.log('Socket connected!'))
          .catch(err => console.error(err));
      // console.log(this.authStatus);
      if (!this.authStatus) {
        // if (this.refreshTokenExpiresIn < this.currentDateInSeconds) {
        //   this.$route.push('/login');
        // } else {
        this.gettingUserData();
        console.log('LAYOUT', this.authStatus);
        this.getUser()
          .then(() => {
            if (this.authStatus) {
              if (this.currentDateInSeconds < this.refreshTokenExpiresIn) {
                this.getNav();
              } else {
                localStorage.clear();
                this.$router.push({path: '/login'});
                this.$router.push({name: 'login'});
              }
            }
          });
        // }
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