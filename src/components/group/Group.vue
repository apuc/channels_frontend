<template>
  <main class="col-md-6 p-0">
    <GroupsHeader/>
    <GroupsList/>
  </main>
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