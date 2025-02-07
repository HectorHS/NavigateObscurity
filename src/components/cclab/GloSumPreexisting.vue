<template>
    <figure>
    <highcharts :options="preexistingSplineOptions" class="h-full w-full"></highcharts>
  </figure>

</template>

<script lang="ts">
  import { useGlobalSumStore } from '@/store/CCLAB/globalSumStore';
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
      ...mapState(useGlobalSumStore, ['preexistingSplineOptions']),
    },
  })

</script>

<style lang="scss" scoped>

</style>