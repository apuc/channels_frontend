<template>
  <div>
    <Header>
      <p class="header__desc" v-if="isRegistration">Вам необходимо зарегистрироваться для работы с клиентом</p>
      <p class="header__desc" v-else-if="isLogin">Для начала работы введите ваш e-mail и пароль</p>
    </Header>
    <slot/>
    <p class="info-message text-uppercase mt-4">Добро пожаловать на официальный клиент веб-клиента channels</p>
  </div>
</template>

<script>
  import Header from "../../components/Header/Header";

  export default {
    name: "AuthLayout",
    components: {Header},
    computed: {
      isLogin() {
        return this.$route.name === 'login'
      },
      isRegistration() {
        return this.$route.name === 'registration'
      },
    },
  }
</script>

<style scoped lang="scss">
  .header__desc {
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
    padding: 0;
    @media (max-width: 450px){
      display: none;
    }
  }
</style>