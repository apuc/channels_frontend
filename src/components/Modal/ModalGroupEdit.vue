<template>
  <div class="modal-inside">
    <header class="modal__header">
      <img src="../../assets/img/management.png"
           alt=""
           class="modal__header-img"
      >
      <h4 class="modal__title">Редактировать группу</h4>
    </header>

    <form class="modal__content" @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="title">Group name</label>

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
            <label for="slug">Group slug</label>

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

        <div class="col-6">
          <div class="form-group add">
            <p>Добавить каналы</p>

            <button
              type="button"
              class="btn btn-primary"
              @click="openChannelsAdding(groupData.id)"
            >Добавить каналы
            </button>
          </div>
        </div>
      </div>

      <AvatarUploader :avatar="avatar" v-model="avatar"/>

      <div>
        <progress v-if="upLoadStarted" max="100" :value="imageUploadPercentage"></progress>
      </div>


      <footer class="modal__footer">
        <button type="submit" class="btn btn-primary mb-1">Сохранить</button>
        <span class="edit-notice">Изменения вступят в силу после сохранения</span>
      </footer>
    </form>
  </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from "vuex";
    import vSelect from "vue-select";
    import AvatarUploader from "../Controls/AvatarUploader";

    export default {
        name: "ModalGroupEdit",

        components: {
            vSelect,
            AvatarUploader
        },

        computed: {
            ...mapGetters('groups', ['groupData', 'imageUploadPercentage']),
            ...mapGetters({
                channels: 'channels/channels',
                userData: "user/userData",
                addingChannelsData:"groups/addingChannelsData"
            })
        },

        created() {
            this.GET_GROUP_DATA(this.groupData.id).then(response => {
                let groupData = Object.assign({},response);
                
                if(groupData.avatar)
                  groupData.avatar = response.avatar.id;
                
                this.SET_GROUP_DATA(groupData);

                if (response.avatar) {
                    this.avatar = response.avatar;
                }
            });

        },

        beforeDestroy() {
            this.SET_GROUP_DATA({
                id: "",
                title: "",
                slug: "",
                status: "",
                user_ids: [],
                owner_id: "",
                avatar: undefined
            });
        },

        data() {
            return {
                errors: {},
                avatar: null,
                upLoadStarted: false
            };
        },

        methods: {
            ...mapMutations('groups', [
                'SET_GROUP_DATA',
                'SET_GROUP_TITLE',
                'SET_GROUP_SLUG',
                'SET_GROUP_OWNER_ID',
                'SET_GROUP_STATUS',
                'SET_GROUP_AVATAR',
                'SET_GROUP_ID_FOR_ADDING_CHANNEL',
                'SET_AVAILABLE_CHANNELS_TO_ADD',
                'SET_CHANNELS_TO_SEARCH'
            ]),

            ...mapActions('common', [
                'MAKE_REQUEST',
            ]),

            ...mapMutations({
                SET_MODAL: "modal/SET_MODAL"
            }),

            ...mapActions('groups', ['GET_GROUP_DATA', 'EDIT_GROUP', 'CREATE_GROUP_AVATAR']),

            /**
             * Сабмит
             * @returns {Promise<void>}
             */
            async onSubmit() {
                this.SET_GROUP_OWNER_ID(this.userData.user_id);
                this.errors = {};

                if (this.avatar instanceof FormData) {
                    this.upLoadStarted = true;

                    await this.MAKE_REQUEST({name: 'groups/CREATE_GROUP_AVATAR', params: this.avatar})
                        .then(() => this.upLoadStarted = false);
                }
                
                if(this.avatar == null){
                    this.SET_GROUP_AVATAR({id:null});
                }
                
                this.MAKE_REQUEST({name: 'groups/EDIT_GROUP', params: null})
                    .then(() => this.$swal({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000,
                        type: 'success',
                        title: 'Данные группы изменены'
                    }))
                    .catch((err) => {
                        if (err.status == 422) {
                            this.errors = err.body.errors;
                        }
                    });
            },

            async openChannelsAdding(group_id) {
                this.SET_MODAL({name: 'ModalGroupAddChannels'});
                await this.SET_AVAILABLE_CHANNELS_TO_ADD({group_id:group_id, channels: this.channels});
                this.SET_GROUP_ID_FOR_ADDING_CHANNEL(group_id);
                this.SET_CHANNELS_TO_SEARCH(this.addingChannelsData.availableChannels);
            },
        },
    };
</script>

<style scoped lang="scss">
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
  @media(max-width: 420px){
    .row{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .col-6{
      margin: 0 auto;
      padding: 0;
      flex: 0 0 100%;
      width: 80%;
      max-width: 80%;
    }
    .form-group.add{
      text-align: center;
      margin-bottom: 5px;
      p{
        display: none;
      }
    }
  }
  
</style>
