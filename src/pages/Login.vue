<script>
import Auth from "../services/auth";
import RegistroBox from "../components/RegistroBox.vue"
export default {
    name: "Login",

    components: {
        RegistroBox
    },

    data() {
        return {
            email: "",
            password: "",
            error: "",

         

        

       
        };
    },

    methods: {
         iniciarSesion() {

            this.error = "";

            const loginCorrecto = Auth.login(
                this.email,
                this.password
            );
            // console.log('Error del Login: ',loginCorrecto)
            if (loginCorrecto.ok) {

                const usuario = Auth.usuarioActual();
                
                this.$router.push(`/perfil/${usuario.id}`);

            } else {

                this.error = "Email o contraseña incorrectos.";
                // alert(this.error);

            }

        }
    }

}

</script>

<template>
<div class="min-h-screen bg-[#e7ebf2] ">

    <!-- HEADER FACEBOOK 2011 -->
    <header class="bg-[#3b5998] border-b border-[#29447e] 

">

    <div class="  
            max-w-[980px]
            mx-auto
            px-4
            py-3
            flex
            flex-col
            md:flex-row
            md:h-[82px]
            md:items-center
            md:justify-between
            gap-4
         
            gap-3 md:gap-10 lg:gap-80">

        <!-- LOGO -->
        <div class="text-white text-[44px] font-bold leading-none ">
            facebook
        </div>


        <!-- LOGIN -->
        <form 
            @submit.prevent="iniciarSesion"
            class="flex gap-3"
        >

            <div class="flex flex-col">

                <label class="text-white text-xs mb-1">
                    Correo electrónico
                </label>

                <input
                    v-model="email"
                    type="email"
                    class="w-[160px] h-[22px] border border-[#1d2a5b] px-1 text-xs bg-white text-black"
                >

            </div>



            <div class="flex flex-col">

                <label class="text-white text-xs mb-1 ">
                    Contraseña
                </label>

                <input
                    v-model="password"
                    type="password"
                    class="w-[160px] h-[22px] border border-[#1d2a5b] px-1 text-xs bg-white text-black"
                >

                <a class="text-[#9cb4d8] text-xs mt-1">
                    ¿Olvidaste tu contraseña?
                </a>

            </div>



            <div class="pt-[14px]">

                <button
                    class="h-[24px] px-3 bg-[#4267a9] border border-[#29447e] text-white text-xs font-bold"
                >
                    Entrar
                </button>

            </div>


        </form>

        
    </div>


</header>



    <!-- CONTENIDO -->

   <main 
    class="contenidoLogin
        w-full
        max-w-[980px]
        mx-auto
        px-4
        flex
        flex-col
        md:flex-row
        gap-8
        pt-10
    "
>


    <!-- IZQUIERDA -->

    <section 
        class="
            w-full
            md:w-[55%]
            pr-0
            md:pr-10
        "
    >


        <h2 
            class="
                text-[#333]
                text-[20px]
                font-bold
                leading-7
                mb-8
                max-w-[450px]
            "
        >

            Facebook te ayuda a comunicarte y compartir
            con las personas que forman parte de tu vida.

        </h2>



        <img
            src="/images/bg/registrarse_fondo.png"
            class="
                w-full
                max-w-[450px]
                h-auto
            "
        >


    </section>






    <!-- DERECHA -->

    <section 
        class="
            w-full
            md:w-[45%]
            max-w-[400px]
        "
    >
<p 
            v-if="error"
            class="mt-2 text-sm text-red-600"
            > 
            {{ error }} 
        </p>

        <h2 
            class="
                text-[32px]
                md:text-[36px]
                font-bold
                text-[#333]
            "
        >
            Regístrate
        </h2>


        <p class="text-[18px] mb-5">
            Es gratis y lo será siempre.
        </p>


        <RegistroBox/>


    </section>


</main>



</div>
</template>