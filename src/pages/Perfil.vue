<script>
import usuarios from "../data/usuarios";
import usuario from "../data/usuario";
import publicaciones from "../data/publicaciones";

import HeaderFacebook from "../components/HeaderFacebook.vue";
import PublicacionFacebook from "../components/PublicacionFacebook.vue";

export default {
    name: "Perfil",

    components: {
        HeaderFacebook,
        PublicacionFacebook
    },

    computed: {

        usuarioPerfil() {

            const id = Number(this.$route.params.id);

            return usuarios.find(usuario => usuario.id === id);

        },//usuarioPerfil

        publicacionesUsuario() {

            const id = Number(this.$route.params.id);

            return publicaciones.filter(publicacion => publicacion.autorId === id);

        },//publicacionesUsuario

        esMiPerfil() {
            return usuario.id === this.usuarioPerfil.id;
        }//esMiPerfil

    }

}
</script>

<template>

    <HeaderFacebook />

    <section
        class="perfil-usuario"
        v-if="usuarioPerfil"
    >

        <div class="portada"></div>

        <div class="info-perfil">

            <img
                :src="usuarioPerfil.foto"
                :alt="usuarioPerfil.nombre"
                class="foto-perfil"
            >

            <h1>
                {{ usuarioPerfil.nombre }}
                {{ usuarioPerfil.apellido }}
            </h1>

            <p>{{ usuarioPerfil.profesion }}</p>

            <button v-if="esMiPerfil" class="btn-perfil">
                Editar perfil
            </button>

        </div>

        <div class="publicaciones">

            <h2>Publicaciones</h2>

            <PublicacionFacebook
                v-for="publicacion in publicacionesUsuario"
                :key="publicacion.id"
                :publicacion="publicacion"
                :usuario="usuarioPerfil"
            />

        </div>

    </section>
            <section class="perfil-usuario" v-else>
            Usuario no encontrado
            </section>
</template>