import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import {store} from "@/store";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
        beforeEnter: (to, from, next) => {
            if (store.getters['AUTH/isAuth']) {
                next()
                return
            }
            next('/login')
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        beforeEnter: (to, from, next) => {
            if (!store.getters['AUTH/isAuth']) {
                next()
                return
            }
            next('/')
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
