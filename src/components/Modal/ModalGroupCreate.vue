<template>
  <div class="modal-inside">
    <header class="modal__header">
      <img src="../../assets/img/management.png" 
           alt=""
           class="modal__header-img"
      >
      <h4 class="modal__title">Создать группу</h4>
    </header>

    <form class="modal__content" @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="title">Название группы</label>
            
            <input
              type="text"
              id="title"
              class="form-control"
              :value="groupData.title"
              @input="SET_GROUP_TITLE($event.target.value)"
            >

            <p
              v-if="errors.hasOwnProperty('title')"
              v-for="error in errors['title']"
              style="color:red">{{error}}
            </p>
          </div>

          <div class="form-group">
            <label for="slug">Слаг группы</label>
            
            <input
              type="text"
              id="slug"
              class="form-control"
              :value="groupData.slug"
              @input="SET_GROUP_SLUG($event.target.value)"
            >

            <p
              v-if="errors.hasOwnProperty('slug')"
              v-for="error in errors['slug']"
              style="color:red">{{error}}
            </p>
          </div>
        </div>
        
      </div>

      <AvatarUploader :avatar="avatar" v-model="avatar"/>

      <div>
        <progress v-if="upLoadStarted" max="100" :value="imageUploadPercentage"></progress>
      </div>

      <button type="submit" class="btn btn-primary">Создать</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import vSelect from "vue-select";
import AvatarUploader from "../Controls/AvatarUploader";

export default {
  name: "ModalGroupCreate",
    
  components: { vSelect,AvatarUploader },
    
  computed: {
    ...mapGetters('groups', ['groupData', 'imageUploadPercentage']),
    ...mapGetters({
        channels: 'channels/channels',
        userData: "user/userData",
        addingChannelsData:"groups/addingChannelsData"
    })
  },
    
  data() {
    return {
      avatar:null,
      errors:{},  
      upLoadStarted: false
    };
  },
    
  methods: {
    ...mapMutations('groups', [
      'SET_GROUP_DATA',
      'SET_CHANNELS_TO_ADD',
      'SET_GROUP_TITLE',
      'SET_GROUP_SLUG',
      'SET_GROUP_STATUS',
      'SET_GROUP_OWNER_ID',
      'SET_GROUP_USER_IDS',
      'SET_GROUP_ID_FOR_ADDING_CHANNEL',
      'SET_AVAILABLE_CHANNELS_TO_ADD',
      'SET_CHANNELS_TO_SEARCH'  
    ]),
      
    ...mapActions('groups', ['CREATE_GROUP', 'CREATE_GROUP_AVATAR']),

      ...mapActions('common',[
          'MAKE_REQUEST',
      ]),

      ...mapMutations({
          SET_MODAL: "modal/SET_MODAL"
      }),
      
    async onSubmit() {
      this.SET_GROUP_OWNER_ID(this.userData.user_id);
      this.errors = {};

      if (this.avatar) {
        this.upLoadStarted = true;
        
        await this.MAKE_REQUEST({name:'groups/CREATE_GROUP_AVATAR',params:this.avatar})
            .then(() => this.upLoadStarted = false);
      }

      this.MAKE_REQUEST({name:'groups/CREATE_GROUP',params:null}).then((res) => {
          this.$swal({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              type: 'success',
              title: 'Группа создана'
          })
          
          this.openChannelsAdding(res.id);
      }).catch((err)=>{
          if(err.status == 422){
              this.errors = err.body.errors;
          }
      });
    },

      async openChannelsAdding(group_id) {
          this.SET_MODAL({name: 'ModalGroupAddChannels'});
          this.SET_GROUP_ID_FOR_ADDING_CHANNEL(group_id);
          await this.SET_AVAILABLE_CHANNELS_TO_ADD({group_id:group_id, channels: this.channels});
          this.SET_GROUP_ID_FOR_ADDING_CHANNEL(group_id);
          this.SET_CHANNELS_TO_SEARCH(this.addingChannelsData.availableChannels);
      },  
  }
};
</script>

<style scoped>
textarea {
  resize: none;
}

.button {
  position: relative;
  padding: 15px 35px;

  font-weight: bold;
  color: #fff;

  background-color: #d3394c;
  border: 0;
  cursor: pointer;
}

.button:hover {
  background-color: #722040;
}
</style>