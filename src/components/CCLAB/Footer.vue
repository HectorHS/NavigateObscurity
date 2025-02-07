<template>
  <div class="cclab-footer">
    <div class="banner-copy">© 2025 Zombie Apocalypse Medicine Alliance</div>
  </div>
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
    mounted () {
    }
 })

</script>
<style lang="scss" scoped>


</style>