<template>
  <header class="header" :class="{header_auth: isAuthLayout, header_main: isMainLayout}">
    <div class="container d-flex flex-column align-items-center" :class="{'justify-content-center': isAuthLayout}">
      <div class="d-flex align-items-center py-3">
        <img src="../../assets/img/logo.png"
             alt=""
             class="header__logo"
             :class="{header__logo_auth: isAuthLayout, header__logo_main: isMainLayout}"
        >
        <p class="header__name"  :class="{header__name_auth: isAuthLayout, header__name_main: isMainLayout}">CHANNELS</p>
      </div>

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

  .header__logo {
    padding-right: 10px;
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