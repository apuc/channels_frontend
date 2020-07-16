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
        >
          Добавить
          <v-icon scale="1" class="icon" name="plus-square"/>
        </b-button>
      </div>
    </div>

  </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from "vuex";
    import { BButton } from 'bootstrap-vue';
    import 'vue-awesome/icons/plus-square';
    import AvatarUploader from "../Controls/AvatarUploader";
    import vSelect from "vue-select";

    export default {
      name: "ModalMeetings",

      components: {vSelect, BButton},

      computed: {
          ...mapGetters('channels',['currentChannelData']),
        ...mapGetters({
          userData: 'user/userData',
        }),
      },

      data() {
          return {
              meeting_title: ''
          };
      },

      methods: {
          ...mapMutations({
              SET_MODAL: 'modal/SET_MODAL',
          }),
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

</style>