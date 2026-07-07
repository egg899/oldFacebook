import { createRouter, createWebHistory } from 'vue-router';


import Perfil from "../pages/Perfil.vue";
import Inicio from '../pages/Inicio.vue';
import ChatFacebook from '../components/ChatFacebook.vue'
const routes = [
    {
        path: '/',
        component: Inicio
    },
    {
        path:'/perfil/:id',
        component: Perfil
    },
    {
        path:'/chat',
        component: ChatFacebook,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;