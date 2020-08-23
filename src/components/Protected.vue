<template>
  <h1>This route requires authentication</h1>
  You can access this route since <b>isAuthenticated</b> is <b>true</b>!
  <br>
  Logged in user: {{ user }}
</template>

<script>
    import useAuthentication from "../functions/useAuthentication";
    export default {
        name: 'Dashboard',
        setup() {
            const { isAuthenticated, user } = useAuthentication()

            return {
                isAuthenticated,
                user
            }
        }
    }
</script>
