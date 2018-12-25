<template>
  <div class="modal-inside">
    <form @submit.prevent="addChannelsToGroup" class="form-group">
      <!--<label for="ids"></label>-->
      <!--<input class="form-control" id="ids" type="text" v-model="channel_ids">-->
        <v-select label="title"
                  :options="channels"
                  @input="addId"
                  :value="groupChannels"
                  multiple
        >
        </v-select>
      <button type="submit" class="btn btn-primary">Add</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import vSelect from "vue-select";

  export default {
    name: "ModalGroupAddChannels",
    components: {vSelect},
    data() {
      return {
        groupChannels: [],
      }
    },
    computed: {
      ...mapGetters({
        channels: 'channels/channels',
      }),
    },
    methods: {
      ...mapMutations({
        setChannelsToAdd: 'groups/SET_CHANNELS_TO_ADD'
      }),
      ...mapActions({
        addChannelsToGroup: 'groups/ADD_CHANNELS',
      }),
      addId(val) {
        this.groupChannels = val;
        this.setChannelsToAdd(val);
      },
    },
  }
</script>

<style scoped>
  form {
    display: flex;
    align-items: flex-start;
    min-height: 200px;
  }


  .v-select {
    flex: 1 1 auto;
    margin-right: 10px;
  }

  /*.v-select .dropdown-menu {*/
    /*position: static !important;*/
    /*height: 300px;*/
  /*}*/
</style>