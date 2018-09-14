<template>
  <div class="nav d-flex flex-column">

    <ChatSection title="Собеседники" :isOpen=true :itemsList="users" id="collapse1" />
    <div class="list-group">
      <b-list-group-item variant="warning" v-b-toggle.collapse2 class="text-center nav-items-header">Каналы</b-list-group-item>
      <b-collapse id="collapse2" class="nav-items">
        <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">Андрей</b-list-group-item>
        <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">Андрей</b-list-group-item>
        <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">Андрей</b-list-group-item>
        <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">Андрей</b-list-group-item>
      </b-collapse>
    </div>
    <div class="list-group">
      <b-list-group-item variant="warning" v-b-toggle.collapse3 class="text-center nav-items-header">Группы</b-list-group-item>
      <b-collapse id="collapse3" class="nav-items">
        <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">Андрей</b-list-group-item>
        <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">Андрей</b-list-group-item>
        <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">Андрей</b-list-group-item>
        <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">Андрей</b-list-group-item>
        <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">Андрей</b-list-group-item>
        <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">Андрей</b-list-group-item>
      </b-collapse>
    </div>
  </div>

</template>

<script>
  import ChatSection from './ChatSection'

  export default {
    data() {
      return {
        users: [
          {name: 'Вася', link: 'vasya_link'},
          {name: 'Петя', link: 'petay_link'},
          {name: 'Андрей', link: 'andrey_link'},
          {name: 'Дима', link: 'dima_link'}
        ]
      }
    },
    components: {
      ChatSection
    }
  }

</script>

<style>
  .nav {
    height: 100%;
    flex-wrap: nowrap!important;
  }
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