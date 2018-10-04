<template>
  <div>
    <GroupsHeader/>
    <GroupsList/>
  </div>
</template>

<script>
  import GroupsList from './GroupsList';
  import GroupsHeader from './GroupsHeader';

  export default {
    name: "Group",
    components: {
      GroupsList,
      GroupsHeader
    }
  }
</script>

<style scoped>

</style>