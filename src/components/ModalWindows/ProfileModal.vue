<template>
  <div>
    <header class="container__header">
      <img :src="user.avatar"
           alt=""
           class="portrait">

      <h4>{{ user.name }}</h4>
    </header>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "ProfileModal",
    computed: {
    },
    props: {
      user: {
        name: String,
        avatar: String,
        slug: String,
        id: String
      },
    },
    data() {
      return {}
    },
    methods: {

    },
  }
</script>

<style scoped>
  .container__header {
    display: flex;
    align-items: center;
  }

  .portrait {
    width: 50px;
    height: 50px;
    margin-right: 20px;

    object-fit: cover;
    border-radius: 50%;
  }
</style>