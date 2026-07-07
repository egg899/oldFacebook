<script>
import HeaderFacebook from '../components/HeaderFacebook.vue';
import LeftSidebar from '../components/LeftSidebar.vue';
import FeedFacebook from '../components/FeedFacebook.vue';
import RightSidebar from '../components/RightSidebar.vue';


export default {
  name: 'Inicio',
  components: {
    HeaderFacebook,
    LeftSidebar,
    FeedFacebook,
    RightSidebar
  }
}
</script>

<template>
  
  <HeaderFacebook />

  <main class="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto p-4 justify-center">
    <LeftSidebar class=" w-full md:w-1/4 order-2 md:order-1" />
    <FeedFacebook class="w-full md:w-2/4 order-1 md:order-2"/>
    <RightSidebar class="w-full md:w-1/4 order-3 md:order-3" />
  </main>


</template>