import { createRouter, createWebHistory } from 'vue-router';
import { authMiddleware, guestMiddleware } from "../middleware/authMiddleware";
import Perfil from "../pages/Perfil.vue";
import Inicio from '../pages/Inicio.vue';
import ChatFacebook from '../components/ChatFacebook.vue';
import Login from '../pages/Login.vue';
import Amigos from '../pages/Amigos.vue';

const routes = [
    {
        path: "/",
        component: Login,
        beforeEnter: guestMiddleware
    },
    {
       path: "/inicio",
       component: Inicio,
       beforeEnter: authMiddleware
        },
    {
        path: "/perfil/:id",
        component: Perfil,
        beforeEnter: authMiddleware
    },
    {
        path: "/chat",
        component: ChatFacebook,
        beforeEnter: authMiddleware
    },
    {
        path: "/amigos",
        component: Amigos,
        beforeEnter: authMiddleware
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;