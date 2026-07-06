<script>
import usuarios from "../data/usuarios";
import usuario from "../data/usuario";
import publicaciones from "../data/publicaciones";

import HeaderFacebook from "../components/HeaderFacebook.vue";
import PublicacionFacebook from "../components/PublicacionFacebook.vue";
import GaleriaUsuario from "../components/GaleriaUsuario.vue";


export default {
    name: "Perfil",

    components: {
        HeaderFacebook,
        PublicacionFacebook,
        GaleriaUsuario
    },

    data() {
        return {
            editandoPerfil: false,

            formulario: {
                nombre: "",
                apellido: "",
                profesion: "",
                biografia: ""
            },

            publicacionesLocal: publicaciones
        };
    },

    computed: {
        usuarioPerfil() {
            const id = Number(this.$route.params.id);
            return usuarios.find(u => u.id === id);
        },

        publicacionesUsuario() {
            const id = Number(this.$route.params.id);
            
            return this.publicacionesLocal.filter(p => p.autorId === id);
        },

        imagenesUsuario() {
           
            return this.publicacionesUsuario.filter(p => p.imagen);
        },

        esMiPerfil() {
            return usuario.id === this.usuarioPerfil?.id;
        }
    },

    methods: {
        editarPerfil() {
            this.formulario = {
                nombre: this.usuarioPerfil.nombre,
                apellido: this.usuarioPerfil.apellido,
                profesion: this.usuarioPerfil.profesion,
                biografia: this.usuarioPerfil.biografia
            };

            this.editandoPerfil = true;
        },

        guardarPerfil() {
            if (!this.formulario.nombre.trim() || !this.formulario.apellido.trim()) {
                alert("Completa los campos.");
                return;
            }

            if (!this.formulario.biografia.trim()) {
                alert("Completá la biografía.");
                return;
            }

            this.usuarioPerfil.nombre = this.formulario.nombre;
            this.usuarioPerfil.apellido = this.formulario.apellido;
            this.usuarioPerfil.profesion = this.formulario.profesion;
            this.usuarioPerfil.biografia = this.formulario.biografia;

            this.editandoPerfil = false;
        },

        cancelarEdicion() {
            this.editandoPerfil = false;
        },

        eliminarPublicacion(id) {
            this.publicacionesLocal = this.publicacionesLocal.filter(
                p => p.id !== id
            );
        }
    }
};
</script>

<template>
    <HeaderFacebook />

    <section class="perfil-usuario" v-if="usuarioPerfil">

        <div class="portada"></div>

        <div class="info-perfil">

            <img
                :src="usuarioPerfil.foto"
                :alt="usuarioPerfil.nombre"
                class="foto-perfil"
            />

            <template v-if="!editandoPerfil">
                <h1>
                    {{ usuarioPerfil.nombre }}
                    {{ usuarioPerfil.apellido }}
                </h1>

                <p>{{ usuarioPerfil.profesion }}</p>

                <h3 class="mt-5 text-lg font-semibold text-gray-900">
                    Biografía
                </h3>

                <p class="mt-2 max-w-lg text-center leading-6 text-gray-600">
                    {{ usuarioPerfil.biografia }}
                </p>
            </template>

            <template v-else>
                <div class="formulario-edicion">

                    <input v-model="formulario.nombre" placeholder="Nombre" />
                    <input v-model="formulario.apellido" placeholder="Apellido" />
                    <input v-model="formulario.profesion" placeholder="Profesion" />

                    <textarea
                        v-model="formulario.biografia"
                        placeholder="Biografía"
                    ></textarea>

                </div>

                <div class="acciones-edicion">

                    <button @click="guardarPerfil">Guardar</button>
                    <button @click="cancelarEdicion">Cancelar</button>

                </div>
            </template>

            <button
                v-if="esMiPerfil && !editandoPerfil"
                class="btn-perfil"
                @click="editarPerfil"
            >
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
                @eliminar="eliminarPublicacion"
            />

        </div>

        <!-- <div v-if="imagenesUsuario.length" class="mt-8">

            <h2 class="text-xl font-bold mb-4">Fotos</h2>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">

                <img
                    v-for="publicacion in imagenesUsuario"
                    :key="publicacion.id"
                    :src="publicacion.imagen"
                    class="w-full h-48 object-cover rounded-lg shadow cursor-pointer hover:scale-105 transition"
                />

            </div>

        </div> -->
        <!---If imagenes usuario-->
        <div class="bloque-galeria">
            <GaleriaUsuario :imagenes="imagenesUsuario"/>
        </div>

    </section>

    <section v-else class="perfil-usuario">
        Usuario no encontrado
    </section>
</template>