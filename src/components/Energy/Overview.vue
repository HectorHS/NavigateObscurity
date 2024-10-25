<template>
    <div class="dash-card mb-4 h-[110px]">
        <div v-if="selectedCountry == 'World'" class="text-center content-center h-full">Select a country from the map to see some country specific stats</div>
        <div v-else>
          <h5 class="font-bold pb-1">
            <span class="text-blue underline">{{getCountryName(selectedCountry)}}</span>
            <span> has a global share of:</span>
          </h5>
          <div class="flex flex-row flex-wrap text-sm pb-2">
              <div class="pr-5">
                  <div>
                      <span>Energy use: </span>
                      <span class="font-bold">{{ stats.energy }}%</span>
                  </div>
                  <div>
                      <span>Energy imports: </span>
                      <span class="font-bold">{{ stats.import }}%</span>
                  </div>
                  <div>
                      <span>Energy exports: </span>
                      <span class="font-bold">{{ stats.export }}%</span>
                  </div>
              </div>
              <div class="">
                  <div>
                      <span>Population: </span>
                      <span class="font-bold">{{ stats.population }}%</span>
                  </div>
                  <div>
                      <span>CO2 emissions: </span>
                      <span class="font-bold">{{ stats.co2 }}%</span>
                  </div>
              </div>
          </div>
        </div>
    </div>
  </template>

  <script lang="ts">
    import { defineComponent } from 'vue';
    import { mapState, mapWritableState } from 'pinia';
    import { useEnergyStore } from '@/store/energyStore.ts';
    import { getCountryName } from '@/helpers/commonFunctions.ts';

    export default defineComponent ({
      components: {
      },
      setup() {
      },
      data: () => ({

      }),
      methods: {

        getCountryName
      },
      computed: {
        ...mapState(useEnergyStore, ['selectedCountry','stats']),
        ...mapWritableState(useEnergyStore, []),
      },
      watch: {
      },
      mounted () {
      }
    })

  </script>