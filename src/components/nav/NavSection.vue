<template>
  <section class="list-group">
    <router-link
      v-for="(item, index) in itemsList"
      :to="item.slug"
      :key="index + item.slug"
      class="list-group-item d-flex align-items-center list-group-item-action">
      <img :src="item.avatar.small"
           alt=""
           class="avatar"
           width="30"
           height="30"
           v-if="item.avatar">
      <span>{{ item.title }}</span>
    </router-link>
  </section>
</template>

<script>
  export default {
    props: {
      id: String,
      title: String,
      itemsList: Array,
      addButton: {
        type: Boolean,
        required: false
      },
      type: String,
    },
    data() {
      return {}
    },
    methods: {
      testEdit() {
        this.$store.dispatch('channels/EDIT_CHANNEL');
      }
    },
  }
</script>

<style scoped>
  .list-group {
    max-height: calc(100% - 100px);
  }

  .list-group__header {
    display: flex;
    align-items: center;
  }

  .list-group-item:first-child {
    flex-grow: 1;
    border-radius: 0;
  }

  h2 {
    font-size: 24px;
  }

  .avatar {
    margin-right: 15px;
    border-radius: 50%;
  }

  .button {
    margin-right: 5px;
    padding: 5px;

    background-color: transparent;
    border: none;
  }

  .button_ml {
    margin-left: auto;
  }
</style>