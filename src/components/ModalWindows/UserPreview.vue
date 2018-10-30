<template>
  <li>
    <div>
      <div class="user-info">
        <div class="image-wrap">
          <img :src="avatar" width="30" height="30" alt="">
        </div>

        <div>
          <span>{{username}}</span>
        </div>
      </div>
    </div>

    <button type="button" class="btn btn-sm btn-danger" @click="removeUser(id)">
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
    },
    methods: {
      removeUser(id) {
        this.$store.dispatch('channels/DELETE_USER', id);
      }
    }
  }
</script>

<style scoped>
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 3px;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  .image-wrap {
    width: 30px;
    height: 30px;
    margin-right: 10px;

    background-color: #cccccc;
    border-radius: 50%;
  }

  img {
    display: block;
  }
</style>