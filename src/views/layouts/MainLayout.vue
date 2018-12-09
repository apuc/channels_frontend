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
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import authGettingData from '../../authGettingData';

  export default {
    computed: {
      ...mapGetters({
        token: 'auth/token',
        userInfo: 'user/info',
        authStatus: 'auth/gettingTokenAndData',
        channels: 'channels/channels',
        groups: 'groups/groups',
        isAuthenticated: 'auth/isAuthenticated',
      }),
    },
    mixins: [authGettingData],
    data() {
      return {
        currentDateInSeconds: Math.round(Date.now() / 1000),
        tokenExpiresIn: Number(localStorage.getItem('T_expires_at')),
        refreshTokenExpiresIn: Number(localStorage.getItem('RT_expires_at')),
      }
    },
    components: {Advertisings, Nav},
    methods: {
      ...mapMutations({
        gettingUserData: 'auth/GETTING_TOKEN_AND_DATA',
        setModal: 'modal/SET_MODAL',
      }),
      ...mapActions({
        getUserMe: 'user/GET_USER_ME',
        getNav: 'user/GET_NAV',
      }),
    },
    beforeMount() {
      connectSocket(this.token)
        .then(() => {
          console.log('Socket connected!')
        })
        .catch(err => console.error(err));
    },
    mounted() {
      if (!this.authStatus) {
        this.gettingUserData();
        this.getUserMe()
          .then(async () => {
            if (this.authStatus) {
              if (this.currentDateInSeconds < this.refreshTokenExpiresIn) {
                await this.getNav();
                this.gettingUserData();
                this.$_authGettingData_gettingData();
              }
            }
          })
          .catch(error => console.log(error));
      }
      if (!this.isAuthenticated) {
        this.$_authGettingData_gettingData();
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
    flex-grow: 1;
    height: 100%;
  }
</style>