<script>
//import usuario from "../data/usuario";
import Auth from "../services/auth";


export default {
    name: "AmigosUsuario",

    props: {
        usuarios: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            usuario: Auth.usuarioActual(),
           
        };
    },

    computed: {
        usuarios() {
            return Auth.obtenerUsuarios();
        },

        amigos() {
            return this.usuarios.filter(
                u => this.usuario.amigos.includes(u.id)
            );
        },

        sugeridos() {
            return this.usuarios.filter(
                u =>
                    u.id !== this.usuario.id &&
                    !this.usuario.amigos.includes(u.id)
                );
        }
    },//computed

    methods: {
        agregarAmigo(user) {
            this.usuario.amigos.push(user.id);
            Auth.actualizarUsuario(this.usuario);
            this.usuario = Auth.usuarioActual();
        },

         quitarAmigo(user) {

            this.usuario.amigos = this.usuario.amigos.filter(
                id => id !== user.id
            );

            Auth.actualizarUsuario(this.usuario);

            this.usuario = Auth.usuarioActual();

        }
    }

    
};
</script>

<template>

<section class="bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden">
        <div 
            v-if="$route.path === '/amigos'"
            class="px-5 py-3 bg-gray-100 border-b border-gray-300"
        >
            <button
                @click="$router.back()"
                class="text-sm text-blue-700 hover:underline"
            >
                ← Volver
            </button>
        </div>
    <!-- AMIGOS -->
    <div class="px-5 py-4 bg-gray-100 border-b border-gray-300">
        <h2 class="font-semibold text-gray-700 text-sm">
            Amigos ({{ amigos.length }})
        </h2>
    </div>

    <div
        v-for="amigo in amigos"
        :key="amigo.id"
        class="px-5 py-4 border-b border-gray-200 hover:bg-gray-50"
    >

        <div class="flex items-center gap-4">

            <img
                :src="amigo.foto"
                class="w-12 h-12 rounded border object-cover"
            >

            <div>

                <p class="text-sm font-semibold text-blue-700 hover:underline cursor-pointer">
                    <RouterLink
                        :to="`/perfil/${amigo.id}`"
                        class="text-sm font-semibold text-blue-700 hover:underline"
                    >
                        {{ amigo.nombre }} {{ amigo.apellido }}
                    </RouterLink>
                </p>

                <p class="text-xs text-gray-500 mt-1">
                    {{ amigo.profesion }}
                </p>

            </div>

        </div>

        <div class="mt-3">

            <button
                @click="quitarAmigo(amigo)"
                class="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
            >
                Quitar amigo
            </button>

        </div>

    </div>

    <!-- VER TODOS -->
    <div v-if="amigos.length > 0 && !['/amigos'].includes($route.path)" class="px-5 py-4 border-b border-gray-300">
        <RouterLink to="/amigos" class="text-sm text-blue-700 hover:underline">
            Ver todos los amigos →
        </RouterLink>
    </div>

    <!-- SUGERIDOS -->
    <div class="px-5 py-4 bg-gray-100 border-b border-gray-300">
        <h2 class="font-semibold text-gray-700 text-sm">
            Personas que quizás conozcas ({{ sugeridos.length }})
        </h2>
    </div>

    <div
        v-for="persona in sugeridos"
        :key="persona.id"
        class="px-5 py-4 border-b border-gray-200 hover:bg-gray-50"
    >

        <div class="flex items-center gap-4">

            <img
                :src="persona.foto"
                class="w-12 h-12 rounded border object-cover"
            >

            <div>

                <p class="text-sm font-semibold text-blue-700 hover:underline cursor-pointer">
                <RouterLink
                    :to="`/perfil/${persona.id}`"
                    class="text-sm font-semibold text-blue-700 hover:underline"
                    >
                    {{ persona.nombre }} {{ persona.apellido }}
                </RouterLink>
                </p>

                <p class="text-xs text-gray-500 mt-1">
                    {{ persona.profesion }}
                </p>

            </div>

        </div>

        <div class="mt-3">

            <button
                @click="agregarAmigo(persona)"
                class="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"
            >
                Agregar amigo
            </button>

        </div>

    </div>

</section>

</template>