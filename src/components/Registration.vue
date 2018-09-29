<template>
  <main>
    <div class="container">
      <div class="row">
        <form @submit.prevent="formSubmited = true" class="col-lg-6 col-12 offset-3 pt-lg-3">
          <CustomInput v-for="(item, index) in info"
                       :name="item.name"
                       :value.sync="item.value"
                       :pattern="item.pattern"
                       :key="index"
                       :id="item.id"
                       :inputType="item.type"
                       class=""
                       @changeStatus="onChangeData(index, $event)"
          >
          </CustomInput>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password"
                   class="form-control"
                   :class="isRepeatPassValid"
                   id="password"
                   @input="onInput"
            />
          </div>

          <div class="form-group">
            <label for="repeat-password">Repeat Password</label>

            <input type="password"
                   class="form-control"
                   :class="isRepeatPassValid"
                   id="repeat-password"
                   @input="onInput"
            >
          </div>
          <p>
            {{ password }}
            {{ repeatPassword }}
          </p>
          <button class="btn btn-primary">
            Send Data
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
  import CustomInput from './form/CustomInput';

  export default {
    name: "Registration",
    components: {
      CustomInput,
      // VueIsYourPasswordSafe
    },
    computed: {
      isRepeatPassValid() {
        if (this.isActive) {
          return (this.password === this.repeatPassword) ? 'is-valid' : 'is-invalid'
        }
      }
    },
    data(){
      return {
        info: [
          {
            name: 'Name',
            id: 'name',
            type: 'text',
            value: '',
            pattern: /^[a-zA-Z][a-zA-Z0-9-_\.]{2,20}$/
          },
          {
            name: 'Email',
            id: 'email',
            type: 'email',
            value: '',
            pattern: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
          },
        ],
        controls: [],
        formSubmited: false,
        isPassSafe: null,
        password: {
          value: '',
          pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g // цифра, заглавная буква, строчная и спец. символ
        },
        repeatPassword: '',
        isActive: false
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
      },
      onInput(e) {
        let target = e.target;

        if (target.id === 'password') {
          this.password = target.value;
        }
        if (target.id === 'repeat-password') {
          this.repeatPassword = target.value;
        }
        this.isActive = true;
      }
    },
  }
</script>

<style scoped>

</style>