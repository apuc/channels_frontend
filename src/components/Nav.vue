<template>
  <div class="nav d-flex flex-column">
    <ChatSection title="Собеседники" :isOpen=true :itemsList="users" id="collapse1" />
    <ChatSection title="Группы" :isOpen=false :itemsList="users" id="collapse2" />
    <ChatSection title="Каналы" :isOpen=false :itemsList="users" id="collapse3" />
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

<style scoped>
  .nav {
    height: 100%;
    flex-wrap: nowrap!important;
  }
</style>