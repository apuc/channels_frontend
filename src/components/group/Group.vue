<template>
  <div>
    <GroupsHeader/>
    <ChannelsList/>
  </div>
</template>

<script>
  import ChannelsList from './ChannelsList';
  import GroupsHeader from './GroupsHeader';

  export default {
    name: "Group",
    components: {
      ChannelsList,
      GroupsHeader
    }
  }
</script>

<style scoped>

</style>