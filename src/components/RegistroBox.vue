<script>
import Auth from "../services/auth";

export default {
    name: "RegistroBox",

    data() {
        return {

            nombre: "",
            apellido: "",
            email: "",
            repetirEmail: "",
            password: "",
            dia: "",
            mes: "",
            anio: "",
            genero: "",
            foto: "",
            amigos: "",

            dias: Array.from({ length: 31 }, (_, i) => i + 1),

            meses: [
                "ene",
                "feb",
                "mar",
                "abr",
                "may",
                "jun",
                "jul",
                "ago",
                "sep",
                "oct",
                "nov",
                "dic"
            ],

            anios: Array.from(
                { length: 120 },
                (_, i) => new Date().getFullYear() - i
            )

        };
    },

    methods: {

        registrar() {

            if (this.email !== this.repetirEmail) {
                alert("Los correos no coinciden.");
                return;
            }


            Auth.registrar({
                nombre: this.nombre,
                apellido: this.apellido,
                email: this.email,
                password: this.password,
                fechaNacimieto:`${this.dia}/${this.mes}/${this.anio}`,
                genero: this.genero,
                biografia: '',
                profesion:'',
                foto: this.foto || "https://placehold.co/150x150",
                amigos: [],
                publicaciones: []
            });



             const usuario = Auth.usuarioActual();

                this.$router.push(`/perfil/${usuario.id}`);

        }

    }

}
</script>

<template>

<form
    @submit.prevent="registrar"
    class="space-y-2"
>

    <div
        class="
            flex
            flex-col
            sm:flex-row
            gap-2
        "
    >

        <input
            v-model="nombre"
            placeholder="Nombre"
            class="w-full sm:w-1/2 h-[38px] border border-[#bdc7d8] px-3 text-lg bg-white"
        >

        <input
            v-model="apellido"
            placeholder="Apellido"
            class="w-full sm:w-1/2 h-[38px] border border-[#bdc7d8] px-3 text-lg bg-white"
        >

    </div>

    <input
        v-model="email"
        placeholder="Tu correo electrónico"
        class="w-full h-[38px] border border-[#bdc7d8] px-3 text-lg bg-white"
    >

    <input
        v-model="repetirEmail"
        placeholder="Vuelve a escribir tu correo"
        class="w-full h-[38px] border border-[#bdc7d8] px-3 text-lg bg-white"
    >

    <input
        v-model="password"
        type="password"
        placeholder="Contraseña nueva"
        class="w-full h-[38px] border border-[#bdc7d8] px-3 text-lg bg-white"
    >

    <div class="pt-3">

        <div class="font-bold text-[#555]">
            Fecha de nacimiento
        </div>

        <div class="flex flex-wrap gap-1 mt-2">

            <select
                v-model="dia"
                class="border h-[28px] text-sm bg-white px-1"
            >
                <option disabled value="">
                    Día
                </option>

                <option
                    v-for="dia in dias"
                    :key="dia"
                    :value="dia"
                >
                    {{ dia }}
                </option>

            </select>

            <select
                v-model="mes"
                class="border h-[28px] text-sm bg-white px-1"
            >
                <option disabled value="">
                    Mes
                </option>

                <option
                    v-for="(mes,index) in meses"
                    :key="index"
                    :value="index+1"
                >
                    {{ mes }}
                </option>

            </select>

            <select
                v-model="anio"
                class="border h-[28px] text-sm bg-white px-1"
            >
                <option disabled value="">
                    Año
                </option>

                <option
                    v-for="anio in anios"
                    :key="anio"
                    :value="anio"
                >
                    {{ anio }}
                </option>

            </select>

        </div>

    </div>

    <div class="flex gap-5 mt-3 text-sm">

        <label>

            <input
                type="radio"
                value="Mujer"
                v-model="genero"
            >

            Mujer

        </label>

        <label>

            <input
                type="radio"
                value="Hombre"
                v-model="genero"
            >

            Hombre

        </label>

    </div>

    <p class="text-[11px] text-[#777] leading-4 mt-3">

        Al hacer clic en Registrarte aceptás las condiciones
        y la política de privacidad.

    </p>

    <button
        class="
            mt-4
            px-10
            py-1
            bg-[#69a74e]
            border
            border-[#3b6e22]
            rounded
            text-white
            text-xl
            font-bold
        "
    >
        Registrarte
    </button>

</form>

</template>