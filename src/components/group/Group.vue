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
        setCurrentGroupData: 'groups/SET_CURRENT_GROUP_DATA',
      })
    },
    beforeRouteLeave(to, from, next) {
      this.setCurrentGroupData({
        group_id: '',
        title: '',
        slug: '',
        status: '',
        owner_id: '',
        avatar: undefined,
      });
      next();
    }
  }
</script>

<style scoped>

</style>