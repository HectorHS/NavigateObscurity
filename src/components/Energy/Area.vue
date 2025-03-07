<template>
    <figure class="dash-card">
      <h5 class="pb-2">{{ selectedCountry }}'s energy use over time </h5>
      <div class="w-full" style="height:calc(100% - 20px)">
        <highcharts v-if="areaOptions && areaOptions.series!.length > 0 && (areaOptions.series![0] as Highcharts.SeriesAreaOptions).data!.length > 0" :options="areaOptions" class="w-full h-full"></highcharts>
        <div v-else class="w-full h-full animate-pulse bg-demo-area-light bg-contain bg-center bg-no-repeat"></div>
      </div>
    </figure>
  </template>

  <script lang="ts">
    import { defineComponent } from 'vue';
    import { mapState } from 'pinia';
    import { useEnergyStore } from '@/store/energyStore.ts';

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
        ...mapState(useEnergyStore, ['areaOptions', 'selectedCountry']),
      },
    })

  </script>

