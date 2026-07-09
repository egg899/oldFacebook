<script>
// import usuario from "../data/usuario";
import Auth from "../services/auth";
import menu from "../data/menu";
import GaleriaUsuario from "./GaleriaUsuario.vue";
import publicaciones from "../data/publicaciones";

    export default {
    name: "LeftSidebar",

    components: {
        GaleriaUsuario
    },

    data() {
        return {
            usuario: Auth.usuarioActual(),
            menu,
            publicacionesLocal: publicaciones
        };
    },

    computed: {

        publicacionesUsuario() {

            return this.publicacionesLocal.filter(
                p => p.autorId === this.usuario.id
            );

        },

        imagenesUsuario() {

            return this.publicacionesUsuario.filter(
                p => p.imagen
            );

        }

    }

}

</script>



<template>
    <aside class="left-sidebar">

        

        <!-- {{ publicacionesUsuario }} -->

            <RouterLink
    :to="`/perfil/${usuario.id}`"
    class="perfil"
>

    <img
        :src="usuario.foto"
        :alt="usuario.nombre"
    >

    <div>

        <span>
            {{ usuario.nombre }} {{ usuario.apellido }}
        </span>

        <p>
            {{ usuario.profesion }}
        </p>

    </div>

</RouterLink>

   
       

        <nav class="menu-lateral">

            <a 
                href="#"
                v-for="opcion in menu"
                :key="opcion.id">

                {{ opcion.icono }}
                {{ opcion.nombre }}
            </a>

        </nav>

        <div class="bloque-galeria">
            <GaleriaUsuario :imagenes="imagenesUsuario"/>
        </div>
    </aside>
        
    
</template>


