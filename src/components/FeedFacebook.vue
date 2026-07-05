<script>
import Publicaciones from '../data/publicaciones';
import PublicacionFacebook from './PublicacionFacebook.vue';
import usuario from "../data/usuario.js";

    export default {
        name: "FeedFacebook",
        components:{
            PublicacionFacebook

        },

        data() {
            return{
                  usuario: usuario,
                  nuevaPublicacion:"",
                  publicaciones: Publicaciones,
                  imagenSeleccionada:null,
                  imagenPreview: ""
            }
          
        },


        methods: {
            crearPublicacion(){

                if(this.nuevaPublicacion === "") {
                    return
            }// if
            
            
               
                        this.publicaciones.unshift({
                        id: Date.now(),
                        authorId: this.usuario.id,
                        autor: "German Verissimo",
                        fecha: "Hace un momento",
                        contenido: this.nuevaPublicacion,
                        imagen: this.imagenPreview,
                        likes:0,
                        comentarios:[]
                        });
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
                    this.publicaciones = this.publicaciones.filter(publicacion => publicacion.id !== id)
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

