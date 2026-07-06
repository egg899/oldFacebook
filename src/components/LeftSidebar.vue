<script>
import usuario from "../data/usuario";
import menu from "../data/menu";
import GaleriaUsuario from "./GaleriaUsuario.vue";
import publicaciones from "../data/publicaciones";

    export default {
        name:"LeftSidebar",
        components:{
        GaleriaUsuario
    },
        data() {
            return {
                usuario: usuario,
                menu: menu, 
                publicacionesLocal: publicaciones
            };
        },
        computed:{
            publicacionesUsuario() {
                //console.log('El usuario: ',this.usuario, this.usuario.id);
                const id = Number(this.usuario.id);
                //console.log('Publicaciones Local: ', this.publicacionesLocal.filter(p => p.autorId === id))
                return this.publicacionesLocal.filter(p => p.autorId === id);
            },//publicacionesUsuario
            imagenesUsuario() {
           
            return this.publicacionesUsuario.filter(p => p.imagen);
        },//imagenesUsuario
        }

    }

</script>



<template>
    <aside class="left-sidebar">

        

        <!-- {{ publicacionesUsuario }} -->

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

        <div class="bloque-galeria">
            <GaleriaUsuario :imagenes="imagenesUsuario"/>
        </div>
    </aside>
        
    
</template>


