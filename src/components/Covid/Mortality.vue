<template>
  <div>
    <figure class="dash-card h-full">
      <h5 class="pb-2">{{ title }}</h5>
      <highcharts v-if="excessOptions.series && excessOptions.series[0].data.length > 0" :options="excessOptions" style="height: calc(100% - 40px);"></highcharts>
      <div v-else class="no-data" style="height: calc(100% - 40px);">No data available</div>
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
      watch: {
      },
      mounted () {
      }
    })

  </script>