<template>
  <div class="not-found">
    <div class="not-found-message">
      <h1>404</h1>
      <p>Канал не найден!</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NotFoundComponent"
  }
</script>

<style scoped>
  h1 {
    text-align: center;
  }
  
  .not-found-message{
    text-align: center;
    margin-top: 16px;
  }
</style>