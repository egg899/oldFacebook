<script>
export default {
    name:"GaleriaUsuario",
    
    props: {
        imagenes: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            modalAbierto: false,
            indexActual: 0
        };
    },
    methods: {
        abrirModal(index) {
            this.indexActual = index;
            this.modalAbierto = true
        },//abrirModal

        cerrarModal(){
            this.modalAbierto = false;
        },

        siguiente() {
            if(this.indexActual < this.imagenes.length-1) {
                this.indexActual++;
            } else {
                this.indexActual = 0
            }
        },

        anterior() {
            if(this.indexActual > 0){
                this.indexActual--;
            } else {
                this.indexActual = this.imagenes.length - 1;
            }
        }
    }//methods
}




</script>


<template>

    <div v-if="imagenes.length" class="galeria">
       <p class="galeria-title">Fotos</p>

        <div class="galeria-grid">
            <img
      v-for="(img, index) in imagenes"
      :key="img.id"
      :src="img.imagen"
      class="galeria-img"
      @click="abrirModal(index)"
    />
        </div>


        <!-- MODAL -->
         <div v-if="modalAbierto"
            class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
         >
        <!-- imagen -->
         <img :src="imagenes[indexActual].imagen" class="max-h-[80vh] max-w-[90vw] rounded-lg pointer">


         <!-- cerrar -->
      <button
        class="absolute top-5 right-5 text-white text-3xl"
        @click="cerrarModal"
      >
        ✕
      </button>


      <!-- prev -->
      <button
        class="absolute left-5 text-white text-4xl pointer"
        @click="anterior"
      >
        ‹
      </button>

      <!-- next -->
      <button
        class="absolute right-5 text-white text-4xl pointer"
        @click="siguiente"
      >
        ›
      </button>

         </div>


    </div>


</template>