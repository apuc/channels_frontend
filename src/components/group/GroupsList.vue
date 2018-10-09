<template>
  <section class="groups">
    <router-link :to="channel.slug" v-for="(channel, index) in channelsSlugs" :key="channel.id">
      {{ channel.name }}
    </router-link>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "GroupsList",
    computed: {
      ...mapGetters({
        channelsSlug: 'user/channels'
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