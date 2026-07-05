import { createRouter, createWebHistory } from 'vue-router';


import Perfil from "../pages/Perfil.vue";
import Inicio from '../pages/Inicio.vue';

const routes = [
    {
        path: '/',
        component: Inicio
    },
    {
        path:'/perfil/:id',
        component: Perfil
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;