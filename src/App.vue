<template>
  <span v-if="!isAuthenticated"><router-link to="/login">Log in</router-link> | </span>
  <router-link to="/protected">Protected</router-link>
  <span v-if="isAuthenticated"> | <a href="#" @click="logOut()">Log out</a></span>
  <div>
    <router-view/>
  </div>
</template>

<script>
    import useAuthentication from "./functions/useAuthentication";

    export default {
        name: 'App',
        setup() {
            const {isAuthenticated, invalidate} = useAuthentication()
            return {
                isAuthenticated,
                invalidate
            }
        },
        methods: {
            async logOut() {
                await this.invalidate().then(() => {
                    this.$router.push({name: 'Login'})
                })
            }
        }
    }
</script>
