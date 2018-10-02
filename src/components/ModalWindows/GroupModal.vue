<template>
  <div>
    <header class="modal__header">
      <h4>Создать группу</h4>
    </header>

    <form class="modal__content">
      <CustomInput v-for="(item, index) in info"
                   :name="item.name"
                   :value.sync="item.value"
                   :key="index"
                   :id="item.id"
                   :inputType="item.type"
                   :pattern="item.pattern"
                   class=""
                   @changeStatus="onChangeData(index, $event)"/>

      <div class="form-group">
        <label :for="textarea.id"> {{ textarea.name }}</label>
        <textarea v-model="textarea.value"
                  :id="textarea.id"
                  class="form-control">
        </textarea>
      </div>

      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
  import CustomInput from '../form/CustomInput';

  export default {
    name: "GroupModal",
    components: {
      CustomInput
    },
    computed: {},
    data() {
      return {
        info: [
          {
            name: 'Group Name',
            id: 'group-name',
            value: '',
            type: 'text',
            pattern: /^[a-zA-Z0-9]+$/
          },
          {
            name: 'Group slug',
            id: 'group-slug',
            value: '',
            type: 'text',
            pattern: /^[a-zA-Z0-9]+$/
          }
        ],
        textarea: {
          name: 'Group describe',
          id: 'group-desc',
          value: '',
          type: 'textarea'
        },
        controls: [],
        formSubmited: false
      }
    },
    methods: {
      onChangeData(index, status) {
        this.controls[index] = status;
      }
    },
    created() {
      for (let i = 0; i < this.info.length; i++) {
        this.controls.push(false);
      }
    }
  }
</script>

<style scoped>
  .modal__header {
    display: flex;
    align-items: center;
  }
  textarea {
    resize: none;
  }
</style>