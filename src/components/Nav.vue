<template>
  <div class="nav d-flex flex-column" v-if="!isGroup">
    <NavSection title="Собеседники" :isOpen=true :itemsList="usersSlugs" id="collapse1" />
    <NavSection title="Группы" :isOpen=false :itemsList="groupsSlugs" id="collapse2" />
    <NavSection title="Каналы" :isOpen=false :itemsList="channelsSlugs" id="collapse3" />
  </div>
  <div class="nav d-flex flex-column" v-else>
    <NavSection title="Группы" :isOpen=false :itemsList="channelsSlugs" id="collapse2" />
  </div>
</template>

<script>
  import NavSection from './NavSection';
  import {usersSlugs} from '../users-slugs';
  import {channelsSlugs} from '../channels-slugs';
  import {groupsSlugs} from '../groups-slugs';

  export default {
    props: {
      isGroup: Boolean
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
    mounted() {

    }
  }

</script>

<style scoped>
  .nav {
    height: 100%;
    flex-wrap: nowrap!important;
  }
</style>