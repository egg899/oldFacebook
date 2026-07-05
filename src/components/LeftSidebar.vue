<script>
import usuario from "../data/usuario";
import menu from "../data/menu";


    export default {
        name:"LeftSidebar",

        data() {
            return {
                usuario: usuario,
                menu: menu
            }
        }
    }

</script>



<template>
    <aside class="left-sidebar">

        

        

            <div
                class="perfil"
                @click="$router.push(`/perfil/${usuario.id}`)"
            >
             <img
                :src="usuario.foto"
                :alt="usuario.nombre"
            >
            <div>

                <span>{{usuario.nombre}} {{ usuario.apellido }}</span>

                <p> {{ usuario.profesion }}</p>
        </div>

    </div>

   
       

        <nav class="menu-lateral">

            <a 
                href="#"
                v-for="opcion in menu"
                :key="opcion.id">

                {{ opcion.icono }}
                {{ opcion.nombre }}
            </a>

        </nav>


    </aside>
        
    
</template>


