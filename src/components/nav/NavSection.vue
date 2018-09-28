<template>
  <section class="list-group">
    <b-list-group-item variant="warning" v-b-toggle="id" class="text-center nav-items-header">
      <h2>{{ title }}</h2>
      <a :href="'/create-group'" class="addButton" v-if="addButton" @click="openUserProfile">+</a>
    </b-list-group-item>

    <b-collapse :visible="isOpen" :id="id" class="nav-items">
      <router-link
        v-for="(item, index) in itemsList"
        :to="item.slug"
        :key="index + item.slug"
        class="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
        {{ item.name }}
      </router-link>
    </b-collapse>
  </section>
</template>

<script>
  export default {
    props: {
      id: String,
      title: String,
      itemsList: Array,
      isOpen: Boolean,
      addButton: {
        type: Boolean,
        required: false
      }
    },
    methods: {
      openUserProfile(e) {
        e.preventDefault();
        this.$store.commit('modal/setModal');
        history.pushState('', 'Title of page', `/create-group`);
      },
    },
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
    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;
  }

  .addButton {
    width: 36px;
    height: 36px;

    font-size: 23px;
    font-weight: 700;
    line-height: 1;
    color: #856404;

    background-color: #E5D7A5;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
</style>