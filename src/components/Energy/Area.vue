<template>
    <figure class="dash-card">
      <h5 class="pb-2">{{ selectedCountry }}'s energy use over time </h5>
      <highcharts :options="areaOptions" style="height: calc(100% - 20px);"></highcharts>
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

