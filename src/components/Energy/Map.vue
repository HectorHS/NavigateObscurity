<template>
    <figure class="bg-gray h-full">
        <DashCommand text="Select an energy source"></DashCommand>
        <RadioButtons :items="energyRadioItems" id="radio1" v-model="selectedSource" class="pb-2 ml-[-10px]" direction="row"></RadioButtons>
        <h5>{{ mapTitle }}</h5>
        <DashCommand text="Click on the map to select a country"></DashCommand>
        <highcharts :constructorType="'mapChart'" :options="mapOptions" class="w-full energy-map" style="height:calc(100% - 100px)"></highcharts>
    </figure>
  </template>

  <script lang="ts">
    import { defineComponent } from 'vue';
    import { mapState, mapWritableState } from 'pinia';
    import { useEnergyStore } from '@/store/energyStore.ts';
    import { fCapital } from '@/helpers/commonFunctions.ts';

    import RadioButtons from '@/components/Controls/RadioButtons.vue';
    import DashCommand from '@/components/Dash/Command.vue';

    export default defineComponent ({
      components: {
        RadioButtons,
        DashCommand
      },
      setup() {
      },
      data: () => ({
      }),
      methods: {
        fCapital
      },
      computed: {
        mapTitle():string {
            let title = "";
            if (this.selectedSource == "all") {
                title = "Energy used per person";
            } else if (this.typeMap) {
                title = fCapital(this.typeMap.get(this.selectedSource)!) + " as % of all energy used";
            }
            return title;
        },
        ...mapState(useEnergyStore, ['mapOptions', 'typeMap']),
        ...mapWritableState(useEnergyStore, ['energyRadioItems','selectedSource']),
      },
    })

  </script>

