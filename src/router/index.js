import {createWebHistory, createRouter} from "vue-router";
import Login from "../components/Login.vue";
import useAuthentication from "../functions/useAuthentication.js";
import Protected from "../components/Protected.vue";

const history = createWebHistory()
const routes = [
    {
        path: "/login",
        name: 'Login',
        component: Login,
        meta: {requiresVisitor: true}
    },
    {
        path: "/protected",
        name: 'Protected',
        component: Protected,
        meta: {requiresAuth: true}
    },
]

const router = createRouter({history, routes})
const {isAuthenticated} = useAuthentication()

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated.value) {
            next({
                name: 'Login',
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (isAuthenticated.value) {
            next({
                name: 'Protected',
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;
