<template>
  <b-card class="mb-3" :class="user.id === myId ? 'dirRtl' : '' ">
    <b-media>
      <b-img slot="aside" :src="user.avatar" blank-color="#ccc" width="64" alt="placeholder" />
      <h5 class="mt-0">{{user.name}}</h5>
      <p>{{message}}</p>
    </b-media>
  </b-card>
</template>

<script>
  export default {
    data() {
      return {
        myId: 111
      }
    },
    props: {
      user: {
        name: String,
        avatar: String,
        id: String
      },
      message: String
    }
  }
</script>

<style scoped>
  .dirRtl {
    direction: rtl;
    text-align: right;
  }
</style>