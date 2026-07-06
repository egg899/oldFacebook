<script>
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
            amigos:[],
            sugeridos: []

        };
    }


}



</script>