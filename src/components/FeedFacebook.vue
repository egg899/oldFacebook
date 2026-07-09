<script>
// import Publicaciones from '../data/publicaciones';
import PublicacionFacebook from './PublicacionFacebook.vue';
// import usuario from "../data/usuario.js";
import Auth from "../services/auth.js";
    export default {
        name: "FeedFacebook",
        components:{
            PublicacionFacebook

        },

        data() {
            return{
                //   usuario: usuario,
                  usuario: Auth.usuarioActual(),
                  nuevaPublicacion:"",
                //   publicaciones: Publicaciones,
                  publicaciones: Auth.obtenerPublicaciones(),
                  imagenSeleccionada:null,
                  imagenPreview: ""
            }
          
        },


        methods: {
            crearPublicacion(){

                if(this.nuevaPublicacion === "") {
                    return
            }// if
            
            
               
                        // this.publicaciones.unshift({
                        // id: Date.now(),
                        // autorId: this.usuario.id,
                        // autor: `${this.usuario.nombre} ${this.usuario.apellido}`,
                        // fecha: "Hace un momento",
                        // contenido: this.nuevaPublicacion,
                        // imagen: this.imagenPreview,
                        // likes:0,
                        // comentarios:[]
                        // });
                        Auth.crearPublicaciones({
                            autorId: this.usuario.id,
                            autor: `${this.usuario.nombre} ${this.usuario.apellido}`,
                            fecha: "Hace un momento",
                            contenido: this.nuevaPublicacion,
                            imagen: this.imagenPreview,
                            likes: 0,
                            comentarios: []
                        });

                        this.publicaciones = Auth.obtenerPublicaciones();

                        this.nuevaPublicacion = "";
                        this.imagenPreview = "";
                        this.imagenSeleccionada = null;



                        // console.log('AuthorID: ',this.usuario.id);
                },//crearPublicacion

                
                seleccionarImagen(evento) {
                    const archivo = evento.target.files[0];
                    if(!archivo){
                        return;
                    }

                    this.imagenSeleccionada = archivo;

                    this.imagenPreview = URL.createObjectURL(archivo);

                },//seleccionarImagen


                eliminarPublicacion(id) {
                    //this.publicaciones = this.publicaciones.filter(publicacion => publicacion.id !== id)
                    Auth.eliminarPublicacion(id);

                    this.publicaciones = Auth.obtenerPublicaciones();
                
                }//eliminarPublicacion
                
        }
    }

</script>



<template>

    <section class="feed">

        <div class="crear-publicacion">

            <h3>¿Qué estás pensando?</h3>

            <textarea
                v-model="nuevaPublicacion"
                placeholder="Escribí algo..."
            ></textarea>
            
            <input
                type="file"
                accept="image/*"
                class="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100 "
                @change="seleccionarImagen"
            />
            
        <!----Image Preview-->
            <img
                v-if="imagenPreview"
                :src="imagenPreview"
                class="preview"
            >


            <button @click="crearPublicacion" :disabled="nuevaPublicacion.trim() === ''">
                Publicar
            </button>

        </div>

        <PublicacionFacebook
            v-for="publicacion in publicaciones"
            :key="publicacion.id"
            :publicacion="publicacion"
            :usuario="usuario"
            @eliminar="eliminarPublicacion"
        />
        
        <!-- <article
            class="post"
            v-for="publicacion in publicaciones"
            :key="publicacion.id"
        >

            <h3>{{ publicacion.autor }}</h3>

            <small>{{ publicacion.fecha }}</small>

            <p>

                {{ publicacion.contenido }}

            </p>

            <img
                v-if="publicacion.imagen"
                :src="publicacion.imagen"
                :alt="publicacion.autor"
            >

        </article> -->

    </section>

</template>

