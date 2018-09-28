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
  import {channelsSlugs} from '../../channels-slugs';
  import {groupsSlugs} from '../../groups-slugs';
  import store from "../../store/store";

  export default {
    computed: {

    },
    data() {
      return {
        usersSlugs,
        channelsSlugs,
        groupsSlugs
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