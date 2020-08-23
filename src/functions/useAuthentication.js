import {ref} from "vue"
import axios from "axios"

const user = ref(null)
const isAuthenticated = ref(false)
export default function useAuthentication() {
    function validateUserIsAuthenticated() {
        return axios.get('/api/user').then(response => {
            user.value = response.data
            isAuthenticated.value = true
        }).catch(() => {
            return invalidate()
        })
    }

    async function authenticate(credentials) {
        await axios.get('/sanctum/csrf-cookie')
        await axios.post('/login', credentials)

        return validateUserIsAuthenticated()
    }

    function invalidate() {
        return axios.post('/logout').then(() => {
            user.value = null
            isAuthenticated.value = false
        })
    }

    return {
        user,
        isAuthenticated,
        authenticate,
        validateUserIsAuthenticated,
        invalidate
    }
}
