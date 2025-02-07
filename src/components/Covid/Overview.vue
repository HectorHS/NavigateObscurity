<template>
  <div class="dash-card">
    <DashCountry :text="selectedCountry"></DashCountry>
    <h5>Total (2020-2022)</h5>
    <div class="flex flex-row flex-wrap text-sm pb-2">
      <div class="w-3/6">
        <div>
            <span>COVID-19 cases: </span>
            <span v-if="stats" class="font-bold">{{ stats.cases }}</span>
            <Tooltip v-if="stats" orientation="right">
              <div class="font-bold pb-1">Total cases</div>
              <div class="flex ">
                  <div>2020: </div>
                  <div class="font-bold pl-1">{{ stats.cases2020 }}</div>
              </div>
              <div class="flex">
                  <div>2021: </div>
                  <div class="font-bold pl-1">{{ stats.cases2021 }}</div>
              </div>
              <div class="flex">
                  <div>2022: </div>
                  <div class="font-bold pl-1">{{ stats.cases2022 }}</div>
              </div>
            </Tooltip>
        </div>
        <div>
            <span>COVID-19 deaths: </span>
            <span v-if="stats" class="font-bold">{{ stats.deaths }}</span>
            <Tooltip v-if="stats" orientation="right">
              <div class="font-bold pb-1">Total deaths</div>
              <div class="flex ">
                  <div>2020: </div>
                  <div class="font-bold pl-1">{{ stats.deaths2020 }}</div>
              </div>
              <div class="flex">
                  <div>2021: </div>
                  <div class="font-bold pl-1">{{ stats.deaths2021 }}</div>
              </div>
              <div class="flex">
                  <div>2022: </div>
                  <div class="font-bold pl-1">{{ stats.deaths2022 }}</div>
              </div>
            </Tooltip>
        </div>
    </div>
      <div class="w-3/6">
        <div>
          <span>Fully vaccinated:</span>
          <span v-if="stats" class="font-bold pl-1">{{ stats.vaccinationShare }}</span>
        </div>
        <div>
          <span>Excess deaths:</span>
          <span v-if="stats" class="font-bold pl-1">{{ stats.excess }}</span>
          <Tooltip v-if="stats" orientation="left">
              <div class="font-bold pb-1">Total excess deaths</div>
              <div class="flex ">
                  <div>2020: </div>
                  <div class="font-bold pl-1">{{ stats.excess2020 }}</div>
              </div>
              <div class="flex">
                  <div>2021: </div>
                  <div class="font-bold pl-1">{{ stats.excess2021 }}</div>
              </div>
              <div class="flex">
                  <div>2022: </div>
                  <div class="font-bold pl-1">{{ stats.excess2022 }}</div>
              </div>
            </Tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

  <script lang="ts">
    import { defineComponent } from 'vue';
    import { mapState } from 'pinia';
    import { useCovidStore } from '@/store/covidStore.ts';

    import DashCountry from '@/components/Dash/Country.vue';
    import Tooltip from '@/components/Tooltip.vue';

    export default defineComponent ({
      components: {
        DashCountry,
        Tooltip
      },
      setup() {
      },
      data: () => ({
      }),
      methods: {
      },
      computed: {
        ...mapState(useCovidStore, ['selectedCountry', 'stats']),
      },
    })

  </script>

