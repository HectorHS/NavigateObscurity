<template>
    <Header></Header>
    <DataHexagons class="p-base mt-10"></DataHexagons>
    <NotesHexagons class="p-base mt-10"></NotesHexagons>
    


</template>

<script lang="ts">
  import DataHexagons from '@/components/Home/DataHexagons.vue';
  import Header from '@/components/Home/Header.vue';
  import NotesHexagons from '@/components/Home/NotesHexagons.vue';
  import { defineComponent } from 'vue';
  

  export default defineComponent ({
    components: {
      DataHexagons,
      Header,
      NotesHexagons
        
    },
    setup() {

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