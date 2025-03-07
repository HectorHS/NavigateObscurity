<template>
    <figure class="dash-card h-full">
      <h5 class="pb-2">{{title}}</h5>
      <div class="w-full" style="height:calc(100% - 30px)">
        <highcharts v-if="importOptions && importOptions.series!.length > 0 && (importOptions.series![0] as Highcharts.SeriesBarOptions).data!.length > 0" :options="importOptions" class="w-full h-full"></highcharts>
        <div v-else class="w-full h-full animate-pulse bg-demo-bars-stacked bg-contain bg-center bg-no-repeat"></div>
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
        title():string {
          return this.selectedCountry == "World" ? "Countries importing the most energy" : this.selectedCountry + " received energy from:";
        },
        ...mapState(useEnergyStore, ['importOptions','selectedCountry']),
      },
    })

  </script>

