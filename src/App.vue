<script>
import ChatFacebook from '../src/components/ChatFacebook.vue';
import Auth from "./services/auth.js";

export default {
  name: 'App',
  components: {
    ChatFacebook
  },

   data() {
    return {
      mostrarChat: Auth.estaLogueado()
    };
  },

  // computed: {
  //   mostrarChat() {
  //     return Auth.estaLogueado();
  //   }
  // },
  
  watch: {
    $route() {
      this.mostrarChat = Auth.estaLogueado();

    }
  }
}



</script>



<template>
   <ChatFacebook v-if="!['/', '/login'].includes($route.path)" />
  <RouterView />
 
</template>

