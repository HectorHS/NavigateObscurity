<template>
  <section>
    <div class="cclab-banner-container">
        <div class="cclab-banner-title"></div>
    </div>
    <div class="cclab-title-separator">

    </div>
    <div class="cclab-subtitle-container">
        <div class="subtitle-1">How will humanity survive?</div>
        <div class="subtitle-2">Interdisciplinary science and scholarship is our only hope.</div>
    </div>
  </section>
</template>

 <script lang="ts">
 import { useAppStore } from '@/store/appStore';
 import { defineComponent } from 'vue';
 import '@/styles/cclab.scss';
 export default defineComponent ({
   components: {
   },
   setup() {
     // setup the store
     const appStore = useAppStore();
     return { appStore };
   },
    data: () => ({
    }),
    methods: {
    },
    computed: {
    },
 })

</script>
<style lang="scss" scoped>
.cclab-banner-container {
      height: 100vh;
      background-color: #00000080;
      background: linear-gradient(0deg, rgba(59, 43, 51, 0.2), rgba(59, 43, 51, 0.4)),
          url(/images/cclab/cclab-banner.webp);
      background-attachment: fixed;
      background-position: top;
      background-size: cover;
  }
  .cclab-banner-title {
      background-image: url(/images/cclab/cclab-title.webp);
      height: 200px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      top: 50vh;
      z-index: 9;
  }
  .cclab-title-separator {
      background-color: #1c1c1c;
      height: 100px;
      -webkit-clip-path: polygon(0% 100%, 100% 0%, 100% 100%, 0% 100%);
      clip-path: polygon(0% 100%, 100% 0%, 100% 100%, 0% 100%);
      margin-top: -100px;
  }
  .cclab-subtitle-container {
      background-color: #1c1c1c;
      margin-top: -1px;
  }
  .subtitle-1 {
      color: white;
      text-align: center;
      font-size: 220%;
      font-family: bungee, sans-serif;
  }
  .subtitle-2 {
      color: white;
      text-align: center;
      font-size: 120%;
      padding-bottom: 50px;
  }

</style>