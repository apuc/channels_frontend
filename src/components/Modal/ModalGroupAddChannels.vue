<template>
  <div class="modal-inside">
    <form @submit.prevent="addChannels" class="form-group">
      <!--<label for="ids"></label>-->
      <!--<input class="form-control" id="ids" type="text" v-model="channel_ids">-->
        <v-select label="slug"
                  :options="grChannels"
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
  import {mapActions} from 'vuex';
  import vSelect from "vue-select";

  export default {
    name: "ModalGroupAddChannels",
    components: {vSelect},
    data() {
      return {
        grChannels: [],
        groupChannels: [],
        groupChannelsId: []
      }
    },
    methods: {
      ...mapActions({
        addChannelsToGroup: 'groups/ADD_CHANNELS',
      }),
      addId(val) {
        this.groupChannels = val;
      },
      addChannels() {
        for (let i = 0; this.groupChannels.length; i++) {
          this.groupChannelsId.push(this.groupChannels[i].channel_id);
        }
        this.addChannelsToGroup(this.groupChannelsId);
      }
    },
    created() {
      this.grChannels = this.$store.state.channels.channels;
      // this.groupChannels = this.groupData.channels;
    }
  }
</script>

<style scoped>
  form {
    display: flex;
    align-items: center;
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