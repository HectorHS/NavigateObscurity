<template>
  <div>
    <figure class="dash-card h-full">
      <h5 class="pb-2">{{ title }}</h5>
      <div class="w-full" style="height: calc(100% - 40px);">
        <div v-if="excessOptions && excessOptions.series" class="h-full w-full">
          <highcharts v-if="(excessOptions.series[0] as Highcharts.SeriesBarOptions).data!.length > 0" :options="excessOptions" class="h-full"></highcharts>
          <div v-else class="no-data h-full">No data available</div>
        </div>
        <div v-else class="w-full h-full animate-pulse bg-demo-columns-lines bg-contain bg-center bg-no-repeat"></div>
      </div>
    </figure>
  </div>
</template>

  <script lang="ts">
    import { defineComponent } from 'vue';
    import { mapState } from 'pinia';
    import { useCovidStore } from '@/store/covidStore.ts';

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
          return this.selectedCountry == "World" ? "Expected deaths (without considering the pandemic) vs estimated actual deaths" : "Expected deaths (based on values before the pandemic) vs actual deaths";
        },
        ...mapState(useCovidStore, ['selectedCountry','excessOptions']),
      },
    })

  </script>