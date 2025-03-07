<template>
    <figure class="dash-card h-full">
      <h5 class="pb-2">{{selectedCountry}}'s energy use by sector</h5>
      <div class="w-full" style="height:calc(100% - 110px)">
        <highcharts v-if="sunburstOptions && sunburstOptions.series!.length > 0 && (sunburstOptions.series![0] as Highcharts.SeriesBarOptions).data!.length > 0" :options="sunburstOptions" class="w-full h-full"></highcharts>
        <div v-else class="w-full h-full animate-pulse bg-demo-sunburst-light bg-contain bg-center bg-no-repeat mt-[3px]"></div>
      </div>
      <!-- legend -->
      <div class="flex mt-2 justify-center flex-wrap">
        <div v-for="item in sunburstLegendItems" class="flex  mr-5">
          <div class="legend-dot" :class="'bg-' + item.color"></div>
          <div class="my-auto">{{ item.name }}</div>
        </div>
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
        ...mapState(useEnergyStore, ['sunburstOptions', 'sunburstLegendItems', 'selectedCountry']),
      },
    })

  </script>

