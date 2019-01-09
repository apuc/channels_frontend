<template>
  <div>
    <GroupsHeader/>
    <ChannelsList/>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import ChannelsList from './ChannelsList';
  import GroupsHeader from './GroupsHeader';

  export default {
    name: "Group",
    components: {
      ChannelsList,
      GroupsHeader
    },
    methods: {
      ...mapMutations({
        SET_CURRENT_GROUP_DATA: 'groups/SET_CURRENT_GROUP_DATA',
      })
    },
    beforeDestroy() {
      this.SET_CURRENT_GROUP_DATA({
        id: '',
        channels: [],
        channelsToSearch: [],
        title: '',
        slug: '',
        status: '',
        owner_id: '',
        avatar: undefined,
      });
    }
  }
</script>

<style scoped>

</style>