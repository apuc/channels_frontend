<template>
  <div>
    <h3>Вы уверены, что хотите удалить {{}}</h3>
    <button type="button" @click="">Да</button>
    <button type="button" @click="closeModal">Нет</button>
  </div>
</template>

<script>
  export default {
    name: "DeleteChannelOrGroup",
    methods: {
      closeModal
    }
  }
</script>

<style scoped>

</style>