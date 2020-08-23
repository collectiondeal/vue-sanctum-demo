<template>
  <form action="#" @submit.prevent>
    <div>
      <label for="email">Email address</label>
      <input type="text" name="email" id="email" v-model="form.email">
    </div>
    <div>
      <label for="password">Password</label>
      <input type="text" name="password" id="password" v-model="form.password">
    </div>
    <div>
      <button @click="login()">
        Sign in
      </button>
    </div>
  </form>
  {{ errorMessage }}
</template>

<script>
    import useAuthentication from "../functions/useAuthentication";

    export default {
        name: 'Login',
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                },
                errorMessage: '',
            }
        },
        setup() {
            const {authenticate} = useAuthentication()

            return {
                authenticate
            }
        },
        methods: {
            async login() {
                await this.authenticate(this.form)
                    .then(() => {
                        this.$router.push({name: 'Protected'})
                    })
                    .catch(error => {
                        const key = Object.keys(error.response.data.errors)[0]
                        this.errorMessage = error.response.data.errors[key][0]
                    })
            }
        }
    }
</script>
