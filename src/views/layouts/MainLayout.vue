<template>
  <component :is="chooseView"></component>
</template>

<script>
  import {connectSocket} from '../../services/socket/socket.service';
  import {ioStatusOnline} from '../../services/socket/status.service';
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import authGettingData from '../../authGettingData';
  import {ioGetUserStatus} from '../../services/socket/status.service';
  import Authorized from '../Authorized';
  import NotAuthorized from '../NotAuthorized';

  export default {
    name: 'MainLayout',
    components: {Authorized, NotAuthorized},
    mixins: [authGettingData],
    computed: {
      ...mapGetters({
        token: 'auth/token',
        userInfo: 'user/info',
        authStatus: 'auth/gettingTokenAndData',
        channels: 'channels/channels',
        groups: 'groups/groups',
        isAuthenticated: 'auth/isAuthenticated',
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
        gettingUserData: 'auth/GETTING_TOKEN_AND_DATA',
        setModal: 'modal/SET_MODAL',
      }),
      ...mapActions({
        getUserMe: 'user/GET_USER_ME',
        getNav: 'user/GET_NAV',
        getUserContacts: 'user/GET_USER_CONTACTS',
        getUserFriendshipRequests: 'user/GET_USER_FRIENDSHIP_REQUESTS',
      }),
    },
    created() {
      if (!this.authStatus) {
        this.gettingUserData();
        this.getUserMe()
          .then(async () => {
            if (this.authStatus) {
              if (this.currentDateInSeconds < this.refreshTokenExpiresIn) {
                this.getUserContacts();
                this.getUserFriendshipRequests();
                await this.getNav().then(() => this.$_authGettingData_gettingData());
                this.gettingUserData();
              }
            }

            await connectSocket(this.token, this.userInfo.user_id)
              .then(() => {
                console.log('Socket connected!');
                ioStatusOnline(this.userInfo.user_id); // Сообщаем ноду, что пользователь онлайн
              });
            ioGetUserStatus(this.userInfo.user_id);
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