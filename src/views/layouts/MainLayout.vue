<template>
  <component :is="chooseView"></component>
</template>

<script>
  import {connectSocket} from '../../services/socket/socket.service';
  import {ioStatusOnline} from '../../services/socket/status.service';
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import authGettingData from '../../mixins/authGettingData';
  import {ioGetUserStatus} from '../../services/socket/status.service';
  import Authorized from '../Authorized';
  import NotAuthorized from '../NotAuthorized';

  export default {
    name: 'MainLayout',
    components: {Authorized, NotAuthorized},
    mixins: [authGettingData],
    computed: {
      ...mapGetters('auth', ['token', 'isAuthenticated', 'gettingTokenAndData']),
      ...mapGetters({
        userData: 'user/userData',
        channels: 'channels/channels',
        groups: 'groups/groups',
      }),
      chooseView() {
        return this.isAuthenticated ? 'Authorized' : 'NotAuthorized'
      }
    },
    data() {
      return {
        currentDateInSeconds: Math.round(Date.now() / 1000),
        tokenExpiresIn: Number(localStorage.getItem('T_expires_at')),
        refreshTokenExpiresIn: Number(localStorage.getItem('RT_expires_at')),
      }
    },
    methods: {
      ...mapMutations({
        GETTING_TOKEN_AND_DATA: 'auth/GETTING_TOKEN_AND_DATA',
      }),
      ...mapActions('user', ['GET_USER_ME', 'GET_NAV', 'GET_USER_CONTACTS', 'GET_USER_FRIENDSHIP_REQUESTS', 'FIND_USERS']),
    },
    created() {
      if (!this.gettingTokenAndData) {
        this.GETTING_TOKEN_AND_DATA();
        this.GET_USER_ME()
          .then(async () => {
            if (this.gettingTokenAndData) {
              if (this.currentDateInSeconds < this.refreshTokenExpiresIn) {
                this.GET_USER_FRIENDSHIP_REQUESTS();
                this.GET_USER_CONTACTS()
                  .then(contacts => {
                    if (this.$route.name === 'contacts' && !contacts.length) {
                      this.FIND_USERS(1);
                    }
                  });
                this.GET_NAV().then(() => this.$_authGettingData_gettingData());
                this.GETTING_TOKEN_AND_DATA();
              }
            }

            // await connectSocket(this.token, this.userData.user_id)
            //   .then(() => {
            //     console.log('Socket connected!');
            //     ioStatusOnline(this.userData.user_id); // Сообщаем ноду, что пользователь онлайн
            //   });
            // ioGetUserStatus(this.userData.user_id);
          })
          .catch(error => console.log(error));
      }
      if (!this.isAuthenticated) {
        this.$_authGettingData_gettingData();
      }
    },
  }
</script>


<style scoped>
</style>