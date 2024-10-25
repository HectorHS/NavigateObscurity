<template>
    <section class="bg-cover bg-center bg-no-repeat bg-header-small h-screen-half" title="Walking in the desert">
      <h1 class="absolute z-10 left-base w-95ch top-[40vh]">{{title}}</h1>
    </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
export default defineComponent ({
    setup() {
    },
    props: {
      title: String
    },
    data: () => ({
    }),
    methods: {
      
    },
    computed: {
    },
    watch: {
    },
    mounted () {
    }
  })

</script>

<style lang="scss" scoped>

</style>