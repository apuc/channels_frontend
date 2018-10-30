<template>
  <section class="groups">
    <router-link :to="channel.slug" v-for="(channel, index) in channels" :key="channel.id">
      {{ channel.title }}
    </router-link>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "GroupsList",
    computed: {
      ...mapGetters({
        channels: 'channels/channels'
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