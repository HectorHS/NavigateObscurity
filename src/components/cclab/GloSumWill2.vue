<template>
  <figure>
    <highcharts :options="nbtSplineOptions" class="h-full"></highcharts>
  </figure>
</template>

<script lang="ts">
  import { useGlobalSumStore } from '@/store/cclab/globalSumStore.ts';
  import { mapState, mapWritableState } from 'pinia';
  import { defineComponent } from 'vue';

  export default defineComponent ({
    components: {
    },
    setup() {

    },
    data: () => ({

    }),
    methods: {
    },
    computed: {
       ...mapState(useGlobalSumStore, ['nbtSplineOptions']),
    },
  })

</script>

<style lang="scss" scoped>

</style>