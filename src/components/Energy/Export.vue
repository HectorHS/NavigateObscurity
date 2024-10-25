<template>
    <figure class="dash-card h-full">
      <h5 class="pb-2">{{title}}</h5>
      <highcharts :options="exportOptions" style="height: calc(100% - 30px);"></highcharts>
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
          return this.selectedCountry == "World" ? "Countries exporting the most energy" : this.selectedCountry + " gave energy to:";
        },
        ...mapState(useEnergyStore, ['exportOptions', 'selectedCountry']),
      },
      watch: {
      },
      mounted () {
      }
    })

  </script>

