<template>
  <nav class="list-group">
    <section class="list-group__item" v-for="(item, index) in itemsList" @click="setData(type === 'channel' ? item.channel_id : item.group_id)">
      <router-link
        :to="type === 'channel' ? `/${item.slug}` : `/group/${item.slug}`"
        :key="index + item.slug"
        class="list-group__link">
        <img :src="item.avatar.small"
             alt=""
             class="avatar"
             width="30"
             height="30"
             v-if="item.avatar">
        <span>{{ item.title }}</span>

        <v-icon scale="1.6" class="icon icon_mla" name="folder" v-if="type === 'group'"/>
      </router-link>

      <div class="control">
        <button type="button"
                class="button"
                @click="editThis">
          <v-icon scale="1.6" class="icon" name="pen"/>
        </button>

        <button type="button"
                class="button"
                @click="deleteThis">
          <v-icon scale="1.6" class="icon" name="trash-alt"/>
        </button>
      </div>
    </section>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        channelId: 'channels/channelId',
        groupId: 'groups/groupId',
      })
    },
    props: {
      id: String,
      title: String,
      itemsList: Array,
      addButton: {
        type: Boolean,
        required: false
      },
      type: String,
    },
    data() {
      return {

      }
    },
    methods: {
      setData(id) {
        this.type === 'channel' ?
          this.$store.dispatch('channels/SET_CHANNEL_DATA', Number(id))
        :
          this.$store.dispatch('groups/SET_GROUP_DATA', Number(id))
      },
      editThis(e) {
        this.type === 'channel' ?
          this.$store.dispatch('channels/SET_CHANNEL_EDITING', this.channelId)
        :
          this.$store.dispatch('groups/SET_GROUP_EDITING', this.groupId)
      },
      deleteThis(e) {
        this.type === 'channel' ?
          this.$store.dispatch('channels/SET_CHANNEL_DELETING', this.channelId)
        :
          this.$store.dispatch('groups/SET_GROUP_DELETING', this.groupId)
      },
    },
  }
</script>

<style scoped>
  .list-group {
    max-height: calc(100% - 100px);
  }

  .list-group__item,
  .control {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .list-group__item {
    padding: 3px 7px;

    background-color: #fff;
    border-bottom: 1px solid #ccc;
  }

  .list-group__item:hover {
    background-color: #f8f9fa;
  }

  .list-group__link {
    display: flex;
    align-items: center;

    width: 100%;
    color: #495057;
  }

  .list-group__link:hover,
  .list-group__link:active,
  .list-group__link:focus {
    text-decoration: none;
  }

  h2 {
    font-size: 24px;
  }

  .avatar {
    margin-right: 15px;
    border-radius: 50%;
  }

  .button {
    margin-right: 5px;
    padding: 5px;

    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .icon {
    width: 20px;
    height: 20px;
    color: #495057;
  }

  .icon_mla {
    margin-left: auto;
  }
</style>