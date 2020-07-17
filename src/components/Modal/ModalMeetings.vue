<template>
  <div class="modal-inside">

    <h4 class="modal__title mb-3 ml-0">Конференции</h4>
    
    <div class="create-meeting mb-3">
      <label for="create-meeting" style="margin-right: 10px">Создать конференцию</label>

      <div class="input-wrap">
        <input id="create-meeting"
               class="form-control"
               type="text"
               placeholder="Введите название конференции"
               v-model="meeting_title"
        >

        <b-button type="button"
          class="btn btn-success create-meeting__button"
          @click="addMeeting()"
        >
          Добавить
          <v-icon scale="1" class="icon" name="plus-square"/>
        </b-button>
      </div>
      <div class="meeting">
        <div v-for="(meeting, index) in channelMeetings" 
          :key="meeting.token" class="meeting__item"
          @click="addMeetingAttachment(index)"
        >
          <span>{{meeting.name}}</span>
          <v-icon scale="1" class="icon" name="chevron-right"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from "vuex";
    import { BButton } from 'bootstrap-vue';
    import 'vue-awesome/icons/plus-square';
    import 'vue-awesome/icons/chevron-right';
    import AvatarUploader from "../Controls/AvatarUploader";
    import vSelect from "vue-select";

    export default {
      name: "ModalMeetings",

      components: {vSelect, BButton},

      computed: {
        ...mapGetters({
          channelMeetings: 'channels/channelMeetings',
          currentChannelData: 'channels/currentChannelData',
          userData: 'user/userData',
        }),
      },

      data() {
          return {
              meeting_title: ''
          };
      },

      methods: {
          ...mapActions('channels',['CHANNEL_ADD_MEETING']),
          ...mapActions('messages',['PARSE_LINK']),
          ...mapMutations({
              SET_MODAL: 'modal/SET_MODAL',
          }),
          addMeeting(){
                this.errors = [];
              
                this.CHANNEL_ADD_MEETING({
                    channel:this.currentChannelData.id,
                    name:this.meeting_title
                }).then(res =>{
                    this.$swal({
                        toast: true,
                        position: 'top',
                        showConfirmButton: false,
                        timer: 4000,
                        type: 'success',
                        title: 'Конференция создана'
                    });

                    this.meeting_title = ''
                },err=>{
                    this.errors = err.data.errors;
                })
          },

          addMeetingAttachment(index){
            const meeting = this.channelMeetings[index];
            this.PARSE_LINK({ text: `https://meet.duct.su/${meeting.token}`, meetingTitle: meeting.name });
          },
      },
    };
</script>

<style scoped lang='scss'>
  .input-wrap {
    display: flex;
    justify-content: space-between;
  }

  #create-meeting {
    width: 70%
  }

  .create-meeting {
    &__button {
      width: 25%;
      margin-left: 1rem;
    }
  }

  .meeting {
    margin-top: 2rem;

    &__item {
      margin-top: .2rem;
      padding-top: .2rem;
      padding-bottom: .2rem;

      &:hover {
        cursor: pointer;
      }
      
      span {
        font-size: 16px;
      }

      .icon {
        margin-top: -.2rem;
        margin-left: .5rem;
      }
    }
  }

</style>