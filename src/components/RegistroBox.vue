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
            amigos: [],

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
            ),
            error: ""

        };
    },

    methods: {

        registrar() {

            this.error = "";

            if (!this.nombre.trim()) {
                this.error = "Ingresá tu nombre.";
                return;
            }

            if (!this.apellido.trim()) {
                this.error = "Ingresá tu apellido.";
                return;
            }

            if (!this.email.trim()) {
                this.error = "Ingresá tu correo electrónico.";
                return;
            }

            if (this.email !== this.repetirEmail) {
                this.error = "Los correos no coinciden.";
                return;
            }

            if (!this.password.trim()) {
                this.error = "Ingresá una contraseña.";
                return;
            }

            if (!this.dia || !this.mes || !this.anio) {
                this.error = "Seleccioná tu fecha de nacimiento.";
                return;
            }

            if (!this.genero) {
                this.error = "Seleccioná un género.";
                return;
            }

            Auth.registrar({
                nombre: this.nombre,
                apellido: this.apellido,
                email: this.email,
                password: this.password,
                fechaNacimiento: `${this.dia}/${this.mes}/${this.anio}`,
                genero: this.genero,
                biografia: "",
                profesion: "",
                foto: this.foto || "https://placehold.co/150x150",
                amigos: [],
                publicaciones: []
            });

            const usuario = Auth.usuarioActual();

            this.$router.push(`/perfil/${usuario.id}`);

        }//registrar

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

<p
    v-if="error"
    class="mt-3 text-sm text-red-600 font-semibold"
>
    {{ error }}
</p>
</form>

</template>