<template>
  <div>
    <figure class="dash-card h-full">
      <h5 class="pb-2">COVID-19 hospitalizations</h5>
      <div class="w-full" style="height:calc(100% - 30px)">
        <div v-if="hospitalsOptions && hospitalsOptions.series" class="h-full w-full">
          <highcharts v-if="(hospitalsOptions.series[0] as Highcharts.SeriesBarOptions).data!.length > 0" :options="hospitalsOptions" class="h-full w-full"></highcharts>
          <div v-else class="no-data h-full">No data available</div>
        </div>
        <div v-else class="w-full h-full animate-pulse bg-demo-columns-stacked bg-contain bg-center bg-no-repeat mt-[3px]"></div>
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
        ...mapState(useCovidStore, ['hospitalsOptions']),
      },
    })

  </script>

