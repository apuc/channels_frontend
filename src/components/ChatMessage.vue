<template>
    <b-card class="mb-3 chat-message-card" :class="user.id === myId ? 'right-side-message' : '' ">
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
  .chat-message-card {
    min-width: 290px;
    max-width: 90%;
    flex-shrink: 0;
  }
  .right-side-message {
    margin-left: auto;
  }
</style>