<template>
  <section class="groups">
    <router-link :to="channel.slug" v-for="(channel, index) in channelsSlugs" :key="channel.id">
      {{ channel.name }}
    </router-link>
  </section>
</template>

<script>
  import {channelsSlugs} from '../../channels-slugs';

  export default {
    name: "GroupsList",
    data() {
      return {
        channelsSlugs
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