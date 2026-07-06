<script>
import contactos from '../data/contactos';
import usuarios from '../data/usuarios';
import AmigosUsuario from './AmigosUsuario.vue';


    export default {
        name:"RightSidebar",

        components: {
            AmigosUsuario
        },

        data(){
            return {
                contactos: contactos,
                usuarios: usuarios
            }
        }
    }

</script>



<template>

    <aside class="right-sidebar">

        <section class="widget">

            <h3>Contactos</h3>

            <div
                class="contacto"
                v-for="contacto in contactos"
                :key="contacto.id"
            >

                <span class="estado">

                    {{ contacto.estado ? "🟢" : "⚪" }}

                </span>

                <span>

                    {{ contacto.nombre }}

                </span>

            </div>

        </section>

        <section class="widget ">
            
            <AmigosUsuario :usuarios="usuarios" />
        </section>

        <section class="widget">

            <h3>Cumpleaños</h3>

            <p>
                🎂 Hoy cumple Juan Pérez
            </p>

        </section>

        <section class="widget">

            <h3>Eventos</h3>

            <p>
                📅 Reunión de Programación
            </p>

        </section>

    </aside>

</template>



