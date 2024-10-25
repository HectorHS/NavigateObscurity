<template>
  <div>
    <figure class="dash-card h-full">
      <h5 class="pb-2">COVID-19 deaths</h5>
      <highcharts :options="deathsOptions" style="height: calc(100% - 30px);"></highcharts>
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
      watch: {
      },
      mounted () {
      }
    })

  </script>

