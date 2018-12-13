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
  import {ioStatusOnline} from '../../services/socket/status.service';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        token: 'auth/token',
        userInfo: 'user/info',
        authStatus: 'auth/gettingTokenAndData',
      }),
      ...mapState('channels', ['channels']),
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
        setModal: 'modal/SET_MODAL',
      }),
      ...mapActions({
        getUser: 'user/GET_USER',
        getNav: 'user/GET_NAV',
      }),
    },
    created() {
      if (!this.authStatus) {
        this.gettingUserData();
        this.getUser()
          .then(async () => {
            if (this.authStatus) {
              if (this.currentDateInSeconds < this.refreshTokenExpiresIn) {
                await this.getNav();
                this.gettingUserData();
              }
            }
            connectSocket(this.token, this.userInfo.user_id)
              .then(() => {
                console.log('Socket connected!');
                ioStatusOnline(this.userInfo.user_id); // Сообщаем ноду, что пользователь онлайн
              })
              .catch(err => console.error(err));
          });
      }
    },
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
    flex-grow: 1;
    height: 100%;
  }
</style>