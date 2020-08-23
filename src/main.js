import {createApp} from "vue"
import App from "./App.vue"
import router from "./router"
import axios from "axios"
import useAuthentication from "./functions/useAuthentication"

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:80"

if (router.history.location.fullPath === "/login") {
    createApp(App).use(router).mount("#app")
} else {
    useAuthentication().validateUserIsAuthenticated().then(() => {
        createApp(App).use(router).mount("#app")
    })
}
