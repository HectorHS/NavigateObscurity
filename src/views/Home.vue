<template>
    <Header></Header>
    <DataHexagons class="p-base mt-10"></DataHexagons>
    <NotesHexagons class="p-base mt-10"></NotesHexagons>
    <MalazanHexagons class="p-base mt-10"></MalazanHexagons>
</template>

<script lang="ts">
  import DataHexagons from '@/components/Home/DataHexagons.vue';
  import Header from '@/components/Home/Header.vue';
  import NotesHexagons from '@/components/Home/NotesHexagons.vue';
  import MalazanHexagons from '@/components/Home/MalazanHexagons.vue';
  import { defineComponent } from 'vue';

  export default defineComponent ({
    components: {
      DataHexagons,
      Header,
      NotesHexagons,
      MalazanHexagons
    },
    setup() {
    },
    data: () => ({
    }),
    methods: {
    },
    computed: {
    },
  })
</script>
