<template>
  <div class="chat">
    <NotAuthorizedChatChatHeader/>

    <section>
      <h2 class="title">Это приватный канал.</h2>
      <p class="desc">Вы можете подать заявку после регистрации.</p>
    </section>
  </div>
</template>

<script>
  import NotAuthorizedChatChatHeader from './NotAuthorizedChatHeader';

  export default {
    name: "NotAuthorizedChatPrivate",
    components: {NotAuthorizedChatChatHeader},
  }
</script>

<style scoped>
 .title,
 .desc {
   text-align: center;
 }
</style>