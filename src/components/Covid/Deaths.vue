<template>
  <div>
    <figure class="dash-card h-full">
      <h5 class="pb-2">COVID-19 deaths</h5>
      <div class="w-full" style="height:calc(100% - 30px)">
        <highcharts v-if="deathsOptions && deathsOptions.series!.length > 0 && (deathsOptions.series![0] as Highcharts.SeriesBarOptions).data" :options="deathsOptions" class="w-full h-full"></highcharts>
        <div v-else class="w-full h-full animate-pulse bg-demo-columns-line bg-contain bg-center bg-no-repeat mt-[3px]"></div>
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
        ...mapState(useCovidStore, ['deathsOptions']),
      },
    })

  </script>

