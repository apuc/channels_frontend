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
    import {mapGetters} from 'vuex';

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
        beforeMount() {
            connectSocket(this.token)
                .then(() => console.log('Socket connected!'))
                .catch(err => console.error(err));
            if (!this.userInfo) { // Если пользователь залогиненый (при перезагрузке страницы)
                this.$store.dispatch('user/GET_USER').then(() => {
                    sendUserInfo({
                        username: this.userInfo.data.username,
                        id: this.userInfo.data.user_id
                    })
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