<template>
    <figure class="bg-gray h-full">
      <h5 class="pb-2"></h5>
      <div class="flex" :class="flexDirection">
        <Dropdown :items="allParameters" v-model="selectedParameter" class="w-full md:w-[410px]"></Dropdown>
        <DashCommand text="Select a measure"></DashCommand>
      </div>
      <div class="flex mt-2" :class="flexDirection">
        <div class='flex'>
          <button @click="animation">
            <IconBase v-if="animateDates" icon="stop" height="35" class="play-button"></IconBase>
            <IconBase v-else icon="play" height="35" class="play-button"></IconBase>
          </button>
          <Slider v-model="selectedDateIndex" :dates="allDates" class="w-[320px] mr-6"></Slider>
        </div>
        <DashCommand text="Click on the play button to animate"></DashCommand>
      </div>
      <DashCommand text="Click on the map to select a country"></DashCommand>
      <!-- <highcharts  :options="mapOptions" class="w-full covid-map" style="height:calc(100% - 100px)"></highcharts> -->
      <div class="w-full" style="height:calc(100% - 100px)">
        <highcharts v-if="mapOptions && mapOptions.series!.length > 0" :options="mapOptions" :constructorType="'mapChart'" class="w-full h-full covid-map"></highcharts>
        <div v-else class="w-full h-full animate-pulse bg-demo-map bg-contain bg-center bg-no-repeat mt-[3px]"></div>
      </div>
    </figure>
  </template>

  <script lang="ts">
    import { defineComponent } from 'vue';
    import { mapState, mapWritableState } from 'pinia';
    import { useCovidStore } from '@/store/covidStore.ts';
    import { useAppStore } from '@/store/appStore.ts';

    import Dropdown from '@/components/Controls/Dropdown.vue';
    import Slider from '@/components/Controls/SliderDate.vue';
    import DashCommand from '@/components/Dash/Command.vue';
    import IconBase from '@/components/IconBase.vue';

    export default defineComponent ({
      components: {
        Dropdown,
        Slider,
        DashCommand,
        IconBase
      },
      setup() {
      },
      data: () => ({
      }),
      methods: {
        animation():void {
          this.animateDates = !this.animateDates;
        }
      },
      computed: {
        buttonIcon():string {
          return this.animateDates ? 'stop' : 'play';
        },
        flexDirection():string {
          let d = 'flex-col-reverse';
          if (this.screenWidth > 950) {
            d = 'flex-row';
          }
          return d;
        },
        ...mapState(useCovidStore, ['mapOptions', 'allParameters', 'allDates']),
        ...mapState(useAppStore, ['screenWidth']),
        ...mapWritableState(useCovidStore, ['selectedParameter', 'selectedDateIndex', 'animateDates'])
      },
    })

  </script>

