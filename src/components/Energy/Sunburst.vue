<template>
    <figure class="dash-card h-full">
      <h5 class="pb-2">{{selectedCountry}}'s energy use by sector</h5>
      <highcharts :options="sunburstOptions" style="height: calc(100% - 110px);"></highcharts>
      <!-- legend -->
      <div class="flex mt-2 justify-center flex-wrap">
        <div v-for="item in sunburstLegendItems" class="flex  mr-5">
          <div class="legend-dot" :class="'bg-' + item.color"></div>
          <div class="my-auto">{{ item.name }}</div>
        </div>
      </div>
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
        ...mapState(useEnergyStore, ['sunburstOptions', 'sunburstLegendItems', 'selectedCountry']),
      },
      watch: {
      },
      mounted () {
      }
    })

  </script>

