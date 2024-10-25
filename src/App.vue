<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <RouterView />
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { useAppStore } from '@/store/appStore';

export default {
    components: {
      Navbar,
      Footer
    },
    setup() {
      const appStore = useAppStore();
      return { appStore };
    },
    data: () => ({
      timer: 0
    }),
    methods: {
            // implementing a debounce function to avoid calling updateScreensize multiple times on manual size changes
      screenSizeChange(){
          clearTimeout(this.timer);
          this.timer = setTimeout(() => { this.updateScreensize(); }, 500);
      },
      updateScreensize() {
        let w = window.innerWidth;
        this.appStore.setScreenSize(w);
      },
    },
    computed: {
    },
    watch: {
    },
    mounted () {
      this.updateScreensize();
      window.addEventListener("resize", this.screenSizeChange);
    },
    unmounted() {
      window.removeEventListener("resize", this.screenSizeChange);
    },
  }
</script>

<style lang="scss">

</style>