<script>
import ChatFacebook from '../src/components/ChatFacebook.vue';
import Auth from "./services/auth.js";

export default {
  name: 'App',
  components: {
    ChatFacebook
  },

  computed: {
    mostrarChat() {
      return Auth.estaLogueado();
    }
  } 
}



</script>



<template>
   <ChatFacebook v-if="mostrarChat"/>
  <RouterView />
 
</template>

