<script>
import Auth from "../services/auth";
import AmigosUsuario from "../components/AmigosUsuario.vue";

export default {
    name: "Amigos",

    components: {
        AmigosUsuario
    },

    data() {
        return {
            usuarios: Auth.obtenerUsuarios()
        };
    }
}
</script>

<template>

    <AmigosUsuario
        :usuarios="usuarios"
    />

</template>