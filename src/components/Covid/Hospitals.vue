<template>
  <div>
    <figure class="dash-card h-full">
      <h5 class="pb-2">COVID-19 hospitalizations</h5>
      <highcharts v-if="hospitalsOptions.series && hospitalsOptions.series[0].data.length > 0" :options="hospitalsOptions" style="height: calc(100% - 30px);"></highcharts>
      <div v-else class="no-data" style="height: calc(100% - 30px);">No data available</div>
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

