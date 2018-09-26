<template>
  <main>
    <div class="container">
      <div class="row">
        <form @submit.prevent="formSubmited = true" class="col-lg-6 col-12 offset-3 pt-lg-3">
          <CustomInput v-for="(item, index) in  info"
                       :name="item.name"
                       :value.sync="item.value"
                       :key="index"
                       :id="item.name"
                       class=""
                       @changeStatus="onChangeData(index, $event)"
          >
          </CustomInput>

          <button class="btn btn-primary">
            Enter
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
  import CustomInput from './form/CustomInput'

  export default {
    name: "Authorization",
    components: {
      CustomInput
    },
    data(){
      return {
        info: [
          {
            name: 'Name',
            value: '',
            pattern: /^[a-zA-Z ]{2,30}$/
          },
          {
            name: 'Password',
            value: '',
            pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g // цифра, заглавная буква, строчная и спец. символ
          },
        ],
        controls: [],
        formSubmited: false
      }
    },
    created() {
      for (let i = 0; i < this.info.length; i++) {
        this.controls.push(false);
      }
    },
    methods: {
      onChangeData(index, status) {
        this.controls[index] = status;
      }
    },
  }
</script>

<style scoped>

</style>