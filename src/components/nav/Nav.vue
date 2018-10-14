<template>
  <aside class="nav d-flex flex-column col-md-3 p-0 bg-light">
    <NavSection title="Собеседники" :isOpen=false :itemsList="usersSlugs" id="collapse1" />
    <NavSection title="Каналы" :addButton="true" :info="channelInfo" :isOpen=false :itemsList="channelsSlugs" id="collapse2" />
    <NavSection title="Группы" :addButton="true" :info="groupInfo" :isOpen=true :itemsList="groupsSlugs" id="collapse3" />
  </aside>
</template>

<script>
  import NavSection from './NavSection';
  import {usersSlugs} from '../../users-slugs';
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        groupsSlugs: 'groups/groups',
        channelsSlugs: 'channels/channels',
      }),
    },
    data() {
      return {
        usersSlugs,
        channelInfo: {
          link: '/create-channel',
          modalTrigger: 'channel'
        },
        groupInfo: {
          link: '/create-group',
          modalTrigger: 'group'
        },
      }
    },
    components: {
      NavSection
    },
    methods: {
    },
    async created() {
      await this.$store.dispatch('user/GET_NAV');
    },

  }

</script>

<style scoped>
  .nav {
    height: 100%;
    flex-wrap: nowrap!important;
  }
</style>