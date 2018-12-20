<template>
  <ModalChannelCreateEdit
    :title="currentChannelData.title"
  />
</template>

<script>
  import {mapGetters} from 'vuex';
  import ModalChannelCreateEdit from "./ModalChannelCreateEdit";

  export default {
    name: "ModalChannelEdit",
    components: {ModalChannelCreateEdit},
    computed: {
      ...mapGetters({
        currentChannelData: 'channels/currentChannelData',
      })
    }
  }
</script>

<style scoped>

</style>