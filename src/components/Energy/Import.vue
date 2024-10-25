<template>
    <figure class="dash-card h-full">
      <h5 class="pb-2">{{title}}</h5>
      <highcharts :options="importOptions" style="height: calc(100% - 30px);"></highcharts>
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
      watch: {
      },
      mounted () {
      }
    })

  </script>

