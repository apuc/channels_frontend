<template>
    <main>
        <div class="container">
            <div class="row">
                <form @submit.prevent="login" class="col-lg-6 col-12 offset-3 pt-lg-3">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" class="form-control" id="email" v-model="username" />
                    </div>
                    <div class="form-group">
                        <label for="password">Пароль</label>
                        <input type="password" class="form-control" id="password" v-model="password" />
                    </div>
                    <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-primary flex-fill mr-3">Войти</button>
                        <router-link class="btn btn-warning" to="registration">Регистрация</router-link>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<script>

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                const { username, password } = this;
                this.$store.dispatch('auth/GET_TOKEN', {
                    grant_type: 'password',
                    client_id: '1',
                    client_secret: 'h9oisXmiMSJVGdy9ExoKVxNhtAg2jvm6rpza8KOk',
                    username,
                    password
                });
            }
        }
    }
</script>

<style scoped>

</style>