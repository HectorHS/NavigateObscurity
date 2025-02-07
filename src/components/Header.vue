<template>
    <section class="bg-cover bg-center bg-no-repeat bg-header-full lg:bg-header-small h-[30vh] lg:h-screen-half" title="Walking in the desert">
      <h1 class="absolute z-10 left-base w-95ch top-[23vh] lg:top-[40vh]">{{title}}</h1>
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
  })
</script>