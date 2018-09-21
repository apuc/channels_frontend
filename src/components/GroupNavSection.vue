<template>
  <div class="list-group">
    <b-list-group-item variant="warning" v-b-toggle="id" class="text-center nav-items-header">
      {{ title }}
    </b-list-group-item>

    <b-collapse :visible="isOpen" :id="id" class="nav-items">
      <b-list-group-item type="button"
                         class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                         v-for="(item, index) in itemsList"
                         :title="item.name"
                         :isOpen=true
                         :key="item.slug + index"
                         :id="item.slug + index"
                         v-b-toggle="item.slug + index"
      >
        {{ item.name }}
      </b-list-group-item>

      <!--<b-collapse :id="channelsSlugs.slug" class="nav-items">-->
        <!--<router-link-->
          <!--v-for="(item, index) in channelsSlugs"-->
          <!--:to="item.slug"-->
          <!--:key="index + item.slug"-->
          <!--class="list-group-item d-flex justify-content-between align-items-center list-group-item-action">-->
          <!--{{ item.name }}-->
        <!--</router-link>-->
      <!--</b-collapse>-->
    </b-collapse>
  </div>
</template>

<script>
  import NavSection from "./NavSection";
  import {channelsSlugs} from '../channels-slugs';

  export default {
    data() {
      return {

      }
    },
    components: {
      NavSection
    },
    props: {
      id: String,
      title: String,
      itemsList: Array,
      isOpen: Boolean
    },
    mounted() {
      console.log(channelsSlugs.name);
    }
  }
</script>

<style scoped>

</style>