<template>
  <div class="list-group">
    <b-list-group-item variant="warning" v-b-toggle="id" class="text-center nav-items-header">{{ title }}
    </b-list-group-item>

    <b-collapse :visible="isOpen" :id="id" class="nav-items">
      <router-link
        v-for="(item, index) in itemsList"
        :to="item.slug"
        :key="index + item.slug"
        class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
      >{{ item.name }}
      </router-link>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    props: {
      id: String,
      title: String,
      itemsList: Array,
      isOpen: Boolean
    },
    watch: {
      '$route'(to, from) {
        console.log(to);
        console.log(from);
      }
    },
    beforeRouteUpdate(to, from, next) {
      console.log(to);
      console.log(from);
      console.log(next);
    }
  }
</script>

<style scoped>
  .list-group {
    max-height: calc(100% - 100px);
  }

  .nav-items {
    height: 100%;
    overflow-x: hidden;
  }

  .nav-items-header {
    cursor: pointer;
  }
</style>