<template>
  <aside class="nav d-flex flex-column col-md-3 p-0 bg-light">
    <NavSection title="Собеседники" :isOpen=false :itemsList="usersSlugs" id="collapse1" />
    <NavSection title="Каналы" :isOpen=false :itemsList="channelsSlugs" id="collapse2" />
    <NavSection title="Группы" :addButton="true" :isOpen=true :itemsList="groupsSlugs" id="collapse3" />
  </aside>
</template>

<script>
  import NavSection from './NavSection';
  import {usersSlugs} from '../../users-slugs';

  export default {
    computed: {},
    data() {
      return {
        groupsSlugs: [],
        channelsSlugs: [],
        usersSlugs
      }
    },
    components: {
      NavSection
    },
    methods: {
    }
  }

</script>

<style scoped>
  .nav {
    height: 100%;
    flex-wrap: nowrap!important;
  }
</style>