<template>
  <div class="nav d-flex flex-column">
    <NavSection title="Собеседники" :isOpen=false :itemsList="usersSlugs" id="collapse1" />
    <NavSection title="Каналы" :isOpen=false :itemsList="channelsSlugs" id="collapse2" />
    <GroupNavSection title="Группы" :isOpen=true :itemsList="groupsSlugs" id="collapse3" />
  </div>
</template>

<script>
  import NavSection from './NavSection';
  import {usersSlugs} from '../users-slugs';
  import {channelsSlugs} from '../channels-slugs';
  import {groupsSlugs} from '../groups-slugs';
  import store from "../store/store";
  import GroupNavSection from "./GroupNavSection";

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
      GroupNavSection,
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