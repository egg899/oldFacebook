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

            chatMinimizado: false
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
        }


    },
    methods: {

        abrirChat(usuario) {
            this.chatSeleccionado = usuario;
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

            setTimeout(() => {

                this.mensajes.push({
                    id: Date.now() + 1,
                    conversacionId: this.chatSeleccionado.id,
                    emisorId: this.chatSeleccionado.id,
                    receptorId: this.usuario.id,
                    texto: "¡Hola! Esta es una respuesta automática.",
                    fecha: "Hace un momento"
                });

            }, 2000);

        },//EnviarMensaje

        minimizarChat() {
            this.chatMinimizado = !this.chatMinimizado;
        },

        cerrarChat() {
            this.chatSeleccionado = null;
            this.chatMinimizado = false;
        }


    }

}
</script>

<template>
<!-- {{ mensajesChat }} -->
<div class="flex h-[80vh] bg-white rounded-lg shadow">

        

    <!-- Lista de usuarios -->
    <aside class="w-1/3 border-r">

        <h2 class="text-xl font-bold p-4">
            Chats
        </h2>

        <div
            v-for="usuario in usuarios"
            :key="usuario.id"
            @click="abrirChat(usuario)"
            class="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100"
        >

            <img
                :src="usuario.foto"
                class="w-12 h-12 rounded-full"
            >

            <div>

                <p class="font-semibold">
                    {{ usuario.nombre }}
                </p>

                <small class="text-gray-500">
                    {{ usuario.profesion }}
                </small>

            </div>

        </div>

    </aside>

    <!-- Conversación -->

    <section class="flex-1 flex flex-col">

    <div
        v-if="chatSeleccionado"
        class="flex flex-col h-full"
    >

        <!-- Header del chat -->
        <div class="p-4 border-b font-bold flex justify-between items-center">

            <span>{{ chatSeleccionado.nombre }}</span>

            <div class="flex gap-2">

                <button @click="minimizarChat">
                    {{ chatMinimizado ? "▲" : "▼" }}
                </button>

                <button @click="cerrarChat">
                    ✖
                </button>

            </div>

        </div>

        <!-- Contenido del chat -->
        <div
            v-if="!chatMinimizado"
            class="flex flex-col flex-1"
        >

            <div class="flex-1 p-4 overflow-y-auto">

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

            </div>

            <div class="p-4 border-t flex gap-2">

                <input
                    v-model="nuevoMensaje"
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