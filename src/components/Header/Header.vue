<template>
  <header class="header" :class="{header_auth: isAuthLayout, header_main: isMainLayout}">
    <div class="container d-flex align-items-center" :class="{'justify-content-center': isAuthLayout, 'flex-column': isAuthLayout}">
      <div v-if="isMainLayout"
           class="burger" :class="{'active': value}"
           @click="$emit('input', !value)">
        <hr>
        <hr>
        <hr>
      </div>
      <router-link to="/" class="d-flex align-items-center" :class="{'py-3': isAuthLayout}">
        <img src="../../assets/img/logo.png"
             alt=""
             class="header__logo"
             :class="{header__logo_auth: isAuthLayout, header__logo_main: isMainLayout}"
        >
        <p class="header__name"  :class="{header__name_auth: isAuthLayout, header__name_main: isMainLayout}">CHANNELS</p>
      </router-link>

      <!--Необходимость в выводе данного сообщения крайне сомнительна-->
      <div class="d-flex">
          <slot />
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: "Header",
    props: {
      //isSidebarVisible
      value: {
        type: Boolean
      }
    },
    computed: {
      isAuthLayout() {
        return this.$route.meta.layout === 'auth';
      },
      
      isMainLayout() {
        return true;
        //return this.$route.meta.layout === 'main';
      },
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
    padding: 30px 0;
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

      border-left: 2px solid white;
      &_auth{
        font-size: 24px;
        line-height: 20px;
      }
      &_main{
        font-size: 22px;
        line-height: 16px;
      }
    }
  }
</style>