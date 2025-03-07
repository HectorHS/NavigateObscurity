<template>
  <div>
    <figure class="dash-card h-full">
      <h5 class="pb-2">COVID-19 tests & vaccinations</h5>
      <div class="w-full" style="height:calc(100% - 30px)">
        <highcharts v-if="vaccinesOptions && vaccinesOptions.series!.length > 0 && (vaccinesOptions.series![0] as Highcharts.SeriesBarOptions).data" :options="vaccinesOptions" class="w-full h-full"></highcharts>
        <div v-else class="w-full h-full animate-pulse bg-demo-columns-line bg-contain bg-center bg-no-repeat"></div>
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
        ...mapState(useCovidStore, ['vaccinesOptions']),
      },
    })

  </script>

