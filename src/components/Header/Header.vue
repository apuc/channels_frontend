<template>
  <header class="header" :class="{header_auth: isAuthLayout, header_main: isMainLayout}">
    <div class="container d-flex align-items-center" :class="{'justify-content-center': isAuthLayout, 'flex-column': isAuthLayout}">
      <router-link to="/" class="d-flex align-items-center" :class="{'py-3': isAuthLayout}">
        <img src="../../assets/img/logo.png"
             alt=""
             class="header__logo"
             :class="{header__logo_auth: isAuthLayout, header__logo_main: isMainLayout}"
        >
        <p class="header__name"  :class="{header__name_auth: isAuthLayout, header__name_main: isMainLayout}">CHANNELS</p>
      </router-link>

      <div class="d-flex">
          <slot />
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: "Header",
    computed: {
      isAuthLayout() {
        return this.$route.meta.layout === 'auth';
      },
      isMainLayout() {
        return this.$route.meta.layout === 'main';
      },
    },
  }
</script>

<style scoped>
  .header {
    padding: 30px 0;
    background-color: #125092;
  }

  .header_main {
    padding: 15px 0;
  }

  .header__logo {
    padding-right: 10px;
  }

  .header__logo_main {
    width: 47px;
    height: 37px;
  }

  .header__name {
    margin: 0;
    padding-left: 10px;

    line-height: 1;
    color: white;

    border-left: 2px solid white;
  }

  .header__name_auth {
    font-size: 32px;
    line-height: 24px;
  }

  .header__name_main {
    font-size: 22px;
    line-height: 16px;
  }
</style>