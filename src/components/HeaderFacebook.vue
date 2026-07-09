<script>
    import Auth from "../services/auth";


    export default {
        name: "HeaderFacebook",

        data() {
            return {
                usuario: null
            };
        },

        mounted() {
            this.usuario = Auth.usuarioActual();
        },

        methods: {
            logout() {
                Auth.logout();

                this.$router.replace("/")
            }
        }


    }
</script>



<template>
    <header class="header fixed top-0 left-0 w-full h-16 bg-white shadow z-50">

        
            <RouterLink class="logo"
            to="/inicio"
            
        >
            Facebook
        </RouterLink>
        
        <!-- {{ console.log('Usuario Logueado: ' ,usuario) }} -->
        <div class="busqueda">
            <input
                type="text"
                placeholder="Buscar"
            >
        </div>

        <nav v-if="usuario" class="flex items-center gap-6 menu">

            <RouterLink to="/inicio">
                Inicio
            </RouterLink>

            <RouterLink :to="`/perfil/${usuario.id}`">
                {{ usuario.nombre }}
            </RouterLink>

                <button
                @click="logout"
                class="text-white text-sm font-medium p-0 m-0 border-0 bg-transparent cursor-pointer hover:underline"
            >
                Salir
            </button>

    </nav>


    </header>
</template>


