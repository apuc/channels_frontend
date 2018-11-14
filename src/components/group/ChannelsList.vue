<template>
  <section class="groups">
    <router-link :to="`/${channel.slug}`" v-for="(channel, index) in currentGroupData.channels" :key="channel.id">
      {{ channel.title }}
    </router-link>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "ChannelsList",
    computed: {
      ...mapGetters({
        currentGroupData: 'groups/currentGroupData'
      })
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .groups {
    padding: 30px;
    display: flex;
    flex-direction: column;
  }
</style>