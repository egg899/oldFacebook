<script>
import usuarios from "../data/usuarios";
import usuario from "../data/usuario";
import mensajes from "../data/mensajes";

export default {
    name: "ChatFacebook",

    data() {
        return {
            usuario: usuario,

            usuarios: usuarios.filter(u => u.id !== usuario.id),

            chatSeleccionado: null,

            nuevoMensaje: "",
            
            mensajes : mensajes,

            abierto:false,

            chatMinimizado: false,

            escribiendo: false,

            buscarUsuario: ""
        }
    },
    computed:   {

        mensajesChat() {
            if(!this.chatSeleccionado){
                return [];
            }

            return this.mensajes.filter(mensaje => 
            (mensaje.emisorId === this.usuario.id && 
            mensaje.receptorId === this.chatSeleccionado.id)

            ||

            (mensaje.emisorId === this.chatSeleccionado.id && 
                mensaje.receptorId === this.usuario.id)

            );
        }, //mensajesChat

        usuariosFiltrados() {

                return this.usuarios.filter(usuario => {

                    const nombreCompleto =
                        `${usuario.nombre} ${usuario.apellido}`.toLowerCase();

                    return nombreCompleto.includes(
                        this.buscarUsuario.toLowerCase()
                    );

                });

            },


    },
    methods: {

        abrirChat(usuario) {

                this.chatSeleccionado = usuario;

                this.chatMinimizado = false;

                this.scrollAbajo();

            },

      enviarMensaje() {

            if (this.nuevoMensaje.trim() === "" || !this.chatSeleccionado) {
                return;
            }

            this.mensajes.push({
                id: Date.now(),
                conversacionId: this.chatSeleccionado.id,
                emisorId: this.usuario.id,
                receptorId: this.chatSeleccionado.id,
                texto: this.nuevoMensaje,
                fecha: "Hace un momento"
            });

            this.nuevoMensaje = "";

            this.scrollAbajo();

            this.escribiendo = true;

            setTimeout(() => {

                this.escribiendo = false;

                this.mensajes.push({
                    id: Date.now() + 1,
                    conversacionId: this.chatSeleccionado.id,
                    emisorId: this.chatSeleccionado.id,
                    receptorId: this.usuario.id,
                    texto: "¡Hola! Esta es una respuesta automática.",
                    fecha: "Hace un momento"
                });

                this.scrollAbajo();

            }, 2000);

        },

        minimizarChat() {
            this.chatMinimizado = !this.chatMinimizado;
        },

        cerrarChat() {
           
            this.chatSeleccionado = null;
            this.chatMinimizado = false;
        },

        ultimoMensaje(usuarioId) {
            const conversacion = this.mensajes.filter(mensaje =>
                (mensaje.emisorId === this.usuario.id &&
                    mensaje.receptorId === usuarioId)

                    ||

                (mensaje.emisorId === usuarioId &&
                    mensaje.receptorId === this.usuario.id)
            );//conversacion


            if(conversacion.length === 0) {
                return "No hay mensajes";
            }

            const ultimo = conversacion[conversacion.length - 1];

            if(ultimo.emisorId === this.usuario.id) {
                return `Vos: ${ultimo.texto}`;
            }

            return ultimo.texto;

        },//ultimoMensaje

        ultimaHora(usuarioId) {

    const conversacion = this.mensajes.filter(mensaje =>

        (mensaje.emisorId === this.usuario.id &&
            mensaje.receptorId === usuarioId)

        ||

        (mensaje.emisorId === usuarioId &&
            mensaje.receptorId === this.usuario.id)

    );

    if (conversacion.length === 0) {
        return "";
    }

    return conversacion[conversacion.length - 1].fecha;

},
       scrollAbajo() {

    this.$nextTick(() => {

        const contenedor = this.$refs.contenedorMensajes;

        if (contenedor) {
            contenedor.scrollTop = contenedor.scrollHeight;
        }

    });

},

    }

}
</script>

<template>
<!-- {{ mensajesChat }} -->

 <!-- Botón flotante -->
    <button
        v-if="!abierto"
        @click="abierto = true"
        class="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl"
    >
        💬
    </button>

  
 
<div  v-if="abierto"
    class="fixed bottom-0 right-5
           w-[700px]
           h-[500px]
           bg-white
           rounded-t-lg
           shadow-2xl
           border
           overflow-hidden
           flex "
>

      
     <button
        class="cerrarTodo"
        @click="abierto = false"
    >
        ✖
    </button>
    <!-- Lista de usuarios -->
    <aside class="w-[260px] border-r flex flex-col overflow-hidden">


            <div class="p-3">

                <input
                    v-model="buscarUsuario"
                    type="text"
                    placeholder="Buscar..."
                    class="w-full border rounded-lg px-3 py-2"
                >

            </div>



        <h2 class="text-xl font-bold p-4">
            Chats
        </h2>

        <div class="flex-1 overflow-y-auto">
        <div
            v-for="usuario in usuariosFiltrados"
            :key="usuario.id"
            @click="abrirChat(usuario)"
            class="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100"
        >

            <img
                :src="usuario.foto"
                class="w-12 h-12 rounded-full"
            >

            <div class="flex-1">

                <div class="flex  items-center">
                    <span
                        class="w-3 h-3 me-2 rounded-full"
                        :class="usuario.online ? 'bg-green-500' : 'bg-gray-400'"
                    ></span> 
                    <p class="font-semibold">
                        {{ usuario.nombre }}
                    </p>

                    

                </div>

                <small class="text-gray-500 truncate block">
                    {{ ultimoMensaje(usuario.id) }}
                </small>

                 <small class="text-gray-400">
                    {{ ultimaHora(usuario.id) }}
                </small>

            </div>

                    </div>
                    </div>
    </aside>

    <!-- Conversación -->

    <section class="flex-1 flex flex-col overflow-hidden">
        <!-- Botón flotante -->
        
    <div
        v-if="chatSeleccionado"
        class="flex flex-col h-full"
    >

        <!-- Header del chat -->
        <div class="p-4 border-b font-bold flex justify-between items-center bg-gray-50">

            <span>{{ chatSeleccionado.nombre }}</span>

            <!-- <div class="flex gap-2">

                <button @click="minimizarChat">
                    {{ chatMinimizado ? "▲" : "▼" }}
                </button>

                <button @click="cerrarChat">
                    ✖
                </button>

            </div> -->

        </div>

        <!-- Contenido del chat -->
        <div
            v-if="!chatMinimizado"
            class="flex flex-col flex-1 min-h-0"
        >

        <div
            ref="contenedorMensajes"
            class="contenedor-mensajes flex-1 overflow-y-auto p-4"
        >
                <div
                    v-for="mensaje in mensajesChat"
                    :key="mensaje.id"
                    class="mb-3"
                >

                    <div
                        :class="[
                            'inline-block px-4 py-2 rounded-lg',
                            mensaje.emisorId === usuario.id
                                ? 'bg-blue-600 text-white ml-auto block w-fit'
                                : 'bg-gray-200 text-black'
                        ]"
                    >

                        {{ mensaje.texto }}

                    </div>

                </div>

                <p
                    v-if="mensajesChat.length === 0"
                    class="text-center text-gray-400"
                >
                    Todavía no hay mensajes.
                </p>

                
                <p
                    v-if="escribiendo"
                    class="italic text-gray-500 p-2"
                >
                    {{ chatSeleccionado.nombre }} está escribiendo...
                </p>

            </div>

            <div class="p-4 border-t flex gap-2">

            <input
                v-model="nuevoMensaje"
                @keyup.enter="enviarMensaje"
                class="flex-1 border rounded px-3 py-2"
                placeholder="Escribí un mensaje..."
            >

                <button
                    @click="enviarMensaje"
                    class="bg-blue-600 text-white px-4 rounded"
                >
                    Enviar
                </button>

            </div>

        </div>

    </div>

    <div
        v-else
        class="flex-1 flex items-center justify-center text-gray-500"
    >    

            

        Seleccioná un chat

    </div>

</section>

        </div>

</template>