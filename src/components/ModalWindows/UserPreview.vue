<template>
  <li class="">
    <div>
      <img :src="avatar" alt="">
    </div>

    <div>
      <span>{{username}}</span>
    </div>

    <button type="button" class="btn btn-sm btn-danger">
      <v-icon scale="1" class="icon" name="user-minus"/>
    </button>
  </li>
</template>

<script>
  export default {
    name: "UserPreview",
    props: {
      username: String,
      id: String || Number,
      avatar: String
    }
  }
</script>

<style scoped>

</style>