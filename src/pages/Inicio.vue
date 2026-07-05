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

  <main class="contenedor">
    <LeftSidebar />
    <FeedFacebook />
    <RightSidebar />
  </main>
</template>