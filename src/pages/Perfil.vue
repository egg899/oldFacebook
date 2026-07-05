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

    data() {
        return{
             editandoPerfil: false,
             formulario: {
                nombre: "",
                apellido: "",
                profesion:""
             }
        }
       
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
            return this.usuarioPerfil && usuario.id === this.usuarioPerfil.id;
        },//esMiPerfil

        

    },//computed

    methods: {
        editarPerfil() {

            this.formulario = {
                nombre: this.usuarioPerfil.nombre,
                apellido:this.usuarioPerfil.apellido,
                profesion: this.usuarioPerfil.profesion
            }


            this.editandoPerfil = true;
            
        },//editarPerfil

        guardarPerfil() {
            this.usuarioPerfil.nombre = this.formulario.nombre;
            this.usuarioPerfil.apellido = this.formulario.apellido;
            this.usuarioPerfil.profesion = this.formulario.profesion;

            this.editandoPerfil = false;
        },

        cancelarEdicion() {
            this.editandoPerfil = false;
        }
    }//methods

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
        
        <template v-if="!editandoPerfil">
            <h1>
                {{ usuarioPerfil.nombre }}
                {{ usuarioPerfil.apellido }}
            </h1>

            <p>{{ usuarioPerfil.profesion }}</p>
        </template>
        
        <template v-else>

            <input
                v-model="formulario.nombre"
                placeholder="Nombre"
            >


            <input
                v-model="formulario.apellido"
                placeholder="Nombre"
            >


            <input
                v-model="formulario.profesion"
                placeholder="Nombre"
            >

            <div class="acciones-edicion">

                <button @click="guardarPerfil">
                    Guardar
                </button>

                 <button @click="cancelarEdicion">
                    Cancelar
                </button>
            </div>


        </template>
        

            <button v-if="esMiPerfil && !editandoPerfil" class="btn-perfil" @click="editarPerfil">
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