<template>
  <div class="list-group">
    <b-list-group-item variant="warning" {{bam()}} v-collapse class="text-center nav-items-header">{{ title }}</b-list-group-item>
    <b-collapse :visible="isOpen" :id="id" class="nav-items">
      <b-list-group-item
          v-for="(item, index) in itemsList"
          :href="item.link"
          :key="index + item.link"
          class="d-flex justify-content-between align-items-center"
      >{{ item.name }}
      </b-list-group-item>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    props: {
      id: String,
      title: String,
      itemsList: Array,
      isOpen: Boolean
    },
    methods: {
      bam(el) {
        console.log(this.$el.querySelector());
      }
    },
    mounted() {
      this.bam()
    },
    directives: {
      collapse: {
        bind: function (el, qw) {
          console.log(el);
          el.setAttribute(`v-b-toggle.${props.id}`);
        }
      }
    }
  }
</script>