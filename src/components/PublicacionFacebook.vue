<script>
import Auth from "../services/auth";


    export default {
        name: "PublicacionFacebook",

        props: {
            publicacion: Object,
            usuario:Object,
            esMiPerfil: Boolean
        },

        data() {
            return {
                // likes: this.publicacion.likes,
                // yaDioLike: false,
                comentarios:this.publicacion.comentarios,
                nuevoComentario: "",
                editando: false,
                textoEditado: this.publicacion.contenido
            }
        },
        
        computed:{
            esMiPublicacion(){
                // console.log('Publicacion AutorId:, ', this.publicacion.autorId);
                // console.log('usuario Id: ', this.usuario.id)
                // console.log(this.publicacion.autorId == `${this.usuario.id}`)
                console.log(this.publicacion);
                  return Number(this.publicacion.autorId) === Number(this.usuario.id);
                
            },

             cantidadLikes() {
                return this.publicacion.likes?.length || 0;
            },

            yaDioLike(){
                const usuario = Auth.usuarioActual();

                return this.publicacion.likes?.includes(usuario.id);
            },
        },

        methods: {

            verPerfil() {
                this.$router.push(`/perfil/${this.publicacion.autorId}`);
            },//verPerfil


            // darLike() {
            //     if(this.yaDioLike){
            //         this.likes--;
            //         this.yaDioLike = false;
            //     } else {
            //         this.likes++;
            //         this.yaDioLike = true;
            //     }
            // },//darLike

            darLike() {
                const usuario = Auth.usuarioActual();
                this.$emit("like", {
                    publicacionId: this.publicacion.id,
                    usuarioId: usuario.id,
                    yaDioLike:this.yaDioLike
                });//like emit
            },

           

            crearComentario() {
                if(this.nuevoComentario.trim() === "") return;


               this.comentarios.push({
                        id: Date.now(),
                        autor: "German Verissimo",
                        fecha: "Hace un momento",
                        contenido: this.nuevoComentario,
                        
                        });
                        this.nuevoComentario = "";





            },//crearComentario     
            
            
            editarPublicacion() {

                this.editando = true;



            },//editaPublicacion

            guardarEdicion() {
                if (this.textoEditado.trim() === "") {

                        return;

                    }
                this.$emit('editar', {
                    ...this.publicacion,
                    contenido:this.textoEditado
                })
                this.publicacion.contenido = this.textoEditado;
                this.editando = false;

            },//guardarEdicion

            cancelarEdicion() {
                this.textoEditado = this.publicacion.contenido;

                this.editando = false;
            }, //cancelarEdicion

            eliminarPublicacion(){
                // console.log(this.esMiPublicacion)
                // console.log(this.publicacion.id)
                 if (!this.esMiPublicacion) return;
                this.$emit("eliminar", this.publicacion.id);
            },//eliminarPublicacion


        }
    }


</script>





<template>

    <article class="post">

        <h3 @click="verPerfil()" class="autor">

            {{ publicacion.autor }}

        </h3>

        <small>

            {{ publicacion.fecha }}

        </small>

        <p v-if="!editando">

            {{ publicacion.contenido }}

        </p>

        <textarea
          v-else

            v-model="textoEditado"
        >
           
        </textarea>


        <button
                class="guardar-btn"

                v-if="editando"

                @click="guardarEdicion"

            >

                Guardar

            </button>

            <button class="cancelarEd-btn" v-if="editando"
                @click="cancelarEdicion">
                Cancelar
            </button>

        <img
            v-if="publicacion.imagen"
            :src="publicacion.imagen"
            :alt="publicacion.autor"
        >
        
        <div class="acciones">
            <button @click="darLike">
                {{ yaDioLike ? "💙 Te gusta": "👍 Me gusta" }} 
                ({{ cantidadLikes }})   
            </button>


            <div class="acciones-propias" v-if="esMiPublicacion">
            <button v-if="esMiPerfil" @click="editarPublicacion">
                 ✏ Editar
            </button>


             <button v-if="esMiPerfil" class="eliminar-btn" 
                        @click="eliminarPublicacion"
                        
                        >
                        🗑 Eliminar</button>
                        </div>



        </div>



        <div class="comentarios">
            <h4> Comentarios </h4>
        
                <div class="comentario"
                    v-for="comentario in comentarios"
                    :key="comentario.id"
                >


                    <strong>{{ comentario.autor }}</strong>

                    <p>{{ comentario.contenido }}</p>


                   

                </div>
        
        </div>


        <div class="nuevo-comentario">
            <input
                type="text"
                placeholder="Escribí un comentario..."
                v-model="nuevoComentario"
            >

            <button
                @click="crearComentario"
                :disabled="nuevoComentario.trim() === ''"
            >Comentar</button>
        </div>

    </article>

</template>







