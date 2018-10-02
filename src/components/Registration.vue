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
                   :class="isPassValid"
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
    },
    computed: {
      isRepeatPassValid() {
        if (this.isRepPassActive) {
          return this.password.value === this.repeatPassword ? 'is-valid' : 'is-invalid'
        }
      },
      isPassValid() {
        const pattern = this.password.pattern;
        const value = this.password.value;
        if (this.isPassActive) {
          return value.match(pattern)  ?  'is-valid' : 'is-invalid';
        }
      }
    },
    data() {
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
        isPassActive: false,
        isRepPassActive: false
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
          this.password.value = target.value;
          this.isPassActive = true;
        }

        if (target.id === 'repeat-password') {
          this.repeatPassword = target.value;
          this.isRepPassActive = true;
        }
      }
    },
  }
</script>

<style scoped>

</style>