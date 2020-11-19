<template>
  <header class="header" :class="{header_auth: isAuthLayout, header_main: isMainLayout}">
    <div class="container d-flex align-items-center" :class="{'justify-content-center': isAuthLayout, 'flex-column': isAuthLayout}">
      <div v-if="isMainLayout"
           class="burger" :class="{'active': sidebarIsOpened}"
           @click="sidebarIsOpened ? CLOSE_SIDEBAR() : OPEN_SIDEBAR()">
        <hr>
        <hr>
        <hr>
      </div>
      <div class="header__info">
        <router-link to="/" class="d-flex align-items-center" :class="{'py-3': isAuthLayout}">
          <img src="../../assets/img/logo.png"
              alt=""
              class="header__logo"
              :class="{header__logo_auth: isAuthLayout, header__logo_main: isMainLayout}"
          >
          <p class="header__name"  :class="{header__name_auth: isAuthLayout, header__name_main: isMainLayout}">DUCT</p>
        </router-link>
        <div 
          v-if="headerInfoType" 
          class="header__current-channel" 
          @click="headerInfoType.status?headerInfoType.close():headerInfoType.open()"
        >
          <span v-if="!deviceIsMobile" class="header__channel-title">{{headerInfoType.data.title}}</span>
          <img 
            v-if="headerInfoType.data.avatar" 
            class="avatar avatar__header"  
            :src="headerInfoType.data.avatar.small" 
          />
        </div>
      </div>
      <!--Необходимость в выводе данного сообщения крайне сомнительна-->
      <div class="d-flex">
          <slot />
      </div>
    </div>
  </header>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  export default {
    name: "Header"
    ,data() {
      return{
      };
    },
    computed: {
      ...mapGetters('nav', ['sidebarIsOpened']),
      ...mapGetters('common', ['deviceIsMobile']),
      ...mapGetters('channels', ['currentChannelData', 'channelInfoIsOpened']),
      ...mapGetters('groups', ['currentGroupData', 'groupInfoIsOpened']),
      ...mapGetters('user', ['userPosition']),

      headerInfoType() {
        switch(this.userPosition) {
          case 'group':
            return {
              data: this.currentGroupData,
              status: this.groupInfoIsOpened,
              open: this.OPEN_GROUP_INFO,
              close: this.CLOSE_GROUP_INFO
            };
          case 'channel':
            return {
              data: this.currentChannelData,
              status: this.channelInfoIsOpened,
              open: this.OPEN_CHANNEL_INFO,
              close: this.CLOSE_CHANNEL_INFO
            };
          default: return;
        }
      },

      isAuthLayout() {
        return this.$route.meta.layout === 'auth';
      },
      
      
      isMainLayout() {
        //return true;
        return this.$route.meta.layout === 'main';
      },
    },
    methods: {
      ...mapMutations({
        OPEN_SIDEBAR: 'nav/OPEN_SIDEBAR',
        CLOSE_SIDEBAR: 'nav/CLOSE_SIDEBAR',

        OPEN_CHANNEL_INFO: 'channels/OPEN_CHANNEL_INFO',
        CLOSE_CHANNEL_INFO: 'channels/CLOSE_CHANNEL_INFO',

        OPEN_GROUP_INFO: 'groups/OPEN_GROUP_INFO',
        CLOSE_GROUP_INFO: 'groups/CLOSE_GROUP_INFO',
      }),
      
    },
  }
</script>

<style scoped lang="scss">

  .burger{
    position: relative;
    display: none;
    width: 40px;
    height: 40px;
    hr{
      position: absolute;
      left: 50%;
      width: 26px;
      height: 4px;
      border: none;
      background-color: #FFF;
      transform: translate(-50%, 50%);
      transition-duration: 0.5s;
      &:first-child{
        transform: translate(-50%, calc(50% + 10px));
      }
      &:last-child{
        transform: translate(-50%, calc(50% - 10px));
      }
    }
    &.active{
      hr{
        &:first-child{
          transform: translate(calc(-50% + 4px), calc(50% + 10px));
        }
        &:last-child{
          transform: translate(calc(-50% + 4px), calc(50% - 10px));
        }
      }
    }
    @media(max-width: 768px){
      display: block;
    }
  }

  .header {
    padding: 10px 0 !important;
    background-color: #125092;
    &_auth{
      padding: 5px 0;
    }
    &_main{
      padding: 15px 0;
    }
    &__logo{
      padding-right: 10px;
      &_auth{
        width: 37px;
        height: 30px;
      }
      &_main{
        width: 47px;
        height: 37px;
      }
    }
    &__name{
      margin: 0;
      padding-left: 10px;

      line-height: 1;
      color: white;

      &_auth{
        font-size: 24px;
        line-height: 20px;
      }
      &_main{
        font-size: 22px;
        line-height: 16px;
      }
    }
    &__info {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .avatar {
      &__header {
        display: block;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        flex: initial;
      }
    }
    &__current-channel {
      display: flex;
      cursor: pointer;
    }
    &__channel-title {
      color: #fff;
      align-self: center;
      padding: .5rem;
    }
  }
</style>