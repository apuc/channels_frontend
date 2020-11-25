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
      ...mapGetters('auth', ['token', 'isAuthenticated', 'gettingTokenAndData', 'refreshTokenBody']),
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
        OPEN_SIDEBAR: 'nav/OPEN_SIDEBAR',
        SET_MOBILE: 'common/SET_MOBILE',
        SET_MOBILE_FALSE: 'common/SET_MOBILE_FALSE',
      }),
        
      ...mapActions('user', ['GET_USER_ME', 'GET_NAV', 'GET_USER_CONTACTS', 'GET_USER_FRIENDSHIP_REQUESTS', 'FIND_USERS']),
      ...mapActions('auth', ['GET_TOKEN']),
        ...mapActions({
            GET_INTEGRATION_TYPES: 'integrations/GET_INTEGRATION_TYPES',
        }),

        async checkTokenRefresh() {
          const currentDateInSeconds = Math.round(Date.now() / 1000);
          const tokenExpiresIn = Number(localStorage.getItem('T_expires_at'));
          const refreshTokenExpiresIn = Number(localStorage.getItem('RT_expires_at'));
          if (currentDateInSeconds >= tokenExpiresIn) {
            await this.GET_TOKEN( this.refreshTokenBody );
          }
        }
        
    },
      
    async created() {

      if( window.innerWidth < 600 ) {
        this.SET_MOBILE();
      } else {
        this.SET_MOBILE_FALSE();
      }

      if (!this.isAuthenticated) {
        this.$_authGettingData_gettingData();
        return;
      }

      await this.checkTokenRefresh();
      
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
                
                await this.GET_NAV().then(() => this.$_authGettingData_gettingData());
                this.GET_INTEGRATION_TYPES()
                this.GETTING_TOKEN_AND_DATA();
              }
            }

            //подключение к сокетам
            await connectSocket(this.token, this.userData.user_id)
              .then(() => {
                console.log('Socket connected!');
                ioStatusOnline(this.userData.user_id); // Сообщаем ноду, что пользователь онлайн
              });
            
              ioGetUserStatus(this.userData.user_id);
              if(window.innerWidth>768)
                this.OPEN_SIDEBAR();
          })
          .catch(error => console.log(error));
      }
    },
  }
</script>


<style scoped>
</style>