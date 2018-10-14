<template>
  <section class="list-group">
    <header class="list-group__header">
      <b-list-group-item variant="warning" v-b-toggle="id" class="text-center nav-items-header">
        <h2>{{ title }}</h2>
      </b-list-group-item>

      <div class="addButton-wrapper" v-if="addButton">
        <a :href="info.link" class="addButton" @click="openModal($event, info.modalTrigger, info.link)">+</a>
      </div>
    </header>

    <b-collapse :visible="isOpen" :id="id" class="nav-items">
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
    </b-collapse>
  </section>
</template>

<script>
  export default {
    props: {
      id: String,
      title: String,
      itemsList: Array,
      info: {
        type: Object,
        required: false
      },
      isOpen: Boolean,
      addButton: {
        type: Boolean,
        required: false
      }
    },
    data() {
      return {

      }
    },
    methods: {
      openModal(e, modalType, modalLink) {
        e.preventDefault();
        this.$store.commit('modal/setModal', modalType);
        history.pushState('', 'Title of page', modalLink);
      },
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

  .addButton-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 10px;

    background-color: #ffeeba;
    border: 1px solid rgba(0, 0, 0, 0.125);
  }

  .addButton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;

    font-size: 22px;
    font-weight: 700;
    line-height: 1;
    color: #856404;

    background-color: #E5D7A5;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }

  .addButton:hover {
    text-decoration: none;
  }

  .avatar {
    margin-right: 15px;
    border-radius: 50%;
  }
</style>