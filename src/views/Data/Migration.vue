<template>
    <Header title="Migration"></Header>
    <section class="px-base">
      <div class="pt-20 w-mainText">
          <p>
            In this interactive map you can get a glimpse on how many migrants and refugees are hosted in each
            country
            (destination of) and where they are coming from (origin of). The colours of the visualisations are based
            on
            population percentages. The neutral (grey color) is set to the global average (for instance, about 3.5%
            of
            the global population has migrated away from their country), and the max is set to double that value.
            This
            helps in giving us a broad idea of migration but does not highlight the extreme outliers as countries
            with
            a 10% and a 50% migration are painted with the same color. To find those, use the slider provided to
            exclude
            small values. Additionally, use the parameters to switch between destination and origin visualisations,
            see
            data for different years, or slice them according to income levels.
          </p>
      </div>
      <figure>
        <div class="flex">
            <Dropdown :items="allMapMeasures" v-model="selectedMapMeasure" class="w-[400px]"></Dropdown>
            <Dropdown :items="allMapYears" v-model="selectedMapYear" class="w-[200px]"></Dropdown>
            <DropdownMultiple :items="allMapIncomes" v-model="selectedMapIncomes" compId="mapIncomeSelect" class="w-[200px]"></DropdownMultiple>
            <Slider v-model="mapSliderValue" :min="0" :max="50" class="w-[200px]"></Slider>
        </div>
         <highcharts :constructorType="'mapChart'" :options="mapOptions" class="w-full h-[80vh]"></highcharts>
        <div class="source-text">
          <p>
             *Source:
            <a href="http://www.un.org/en/development/desa/population/migration/data/index.shtml" target="_blank">United
                Nations </a>
            (retrieved 02/02/2019)
          </p>
        </div>
      </figure>
    </section>
    <section class="px-base" >
      <div class="pt-24 pb-10 w-mainText">
        <p>
          And here is a breakdown of migrants by country. You can switch between "Destination" to see the
            breakdown of
            immigrants living in a destination country, and "Origin" to see where people of a particular origin
            country
            emigrated to. The size indicates larger populations, but you can also check the exact numbers by
            hovering
            over them. The colours have been randomly assigned and don’t mean anything - just there for show. On the
            legend are highlighted the top five results.
        </p>
      </div>
      <figure>
        <div class="flex">
          <Dropdown :items="allTreemapCountries" v-model="selectedTreemapCountry" class="w-[400px]"></Dropdown>
          <Dropdown :items="allTreemapYears" v-model="selectedTreemapYear" class="w-[200px]"></Dropdown>
          <RadioButtons :items="treemapRadioItems" id="radio2" v-model="selectedTreemapMeasure" direction="row" ></RadioButtons>
        </div>
        <highcharts :options="treemapOptions" class="w-full h-[60vh]"></highcharts>

      </figure>
      <div class="source-text">
          <p>
               *Source:
            <a href="http://www.un.org/en/development/desa/population/migration/data/index.shtml" target="_blank">United
                Nations </a>
            (retrieved 02/02/2019)
          </p>
      </div>
    </section>
     <section >
      <div class="px-base pt-24 pb-10 w-mainText">
        <p>
          Below you can see a rough visualization of the flow of migration between larger areas. You can choose
            between continents and regions - anything more specific gets too convoluted. The outer bases represent
            the
            total of migrants - people moving both in and out of the region - and the inside lines visualize their
            movement. Movements are coloured according to origin.
        </p>
      </div>
      <figure class="flex items-center">

        <highcharts :options="wheelOptions" class="w-8/12 min-h-[80vh]"></highcharts>
        <div class="w-4/12 flex flex-col justify-start">
          <RadioButtons :items="wheelRadioItems" id="radio1" v-model="selectedWheelMeasure" class="w-48" direction="row"></RadioButtons>
          <!-- Legend -->
          <div class="mt-5" :class="{'columns-2': selectedWheelMeasure == 'Region'}">
            <div v-for="item in wheelLegendItems" class="my-1 w-full flex break-inside-avoid-column">
              <div class="legend-dot" :class="'bg-'+item.color"></div>
              <div>{{ item.name }}</div>
            </div>
          </div>
        </div>
      </figure>
      <div class="source-text">
          <p>
              *Source:
            <a href="http://www.un.org/en/development/desa/population/migration/data/index.shtml" target="_blank">United
                Nations </a>
            (retrieved 02/02/2019)
          </p>
      </div>
    </section>
    <Comments :pageId="pageId"></Comments>

</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapState, mapWritableState } from 'pinia';
  import { useMigrationStore } from '@/store/migrationStore.ts';

  import Header from '@/components/Header.vue';
  import Comments from '@/components/Comments.vue';
  import Dropdown from '@/components/Controls/Dropdown.vue';
  import DropdownMultiple from '@/components/Controls/DropdownMultiple.vue';
  import Slider from '@/components/Controls/Slider.vue';
  import RadioButtons from '@/components/Controls/RadioButtons.vue';

  // https://github.com/highcharts/highcharts-vue#importing-highcharts-modules
  import Highcharts from 'highcharts';
  import Sankey from 'highcharts/modules/sankey';
  Sankey(Highcharts);
  import Treemap from 'highcharts/modules/treemap';
  Treemap(Highcharts);
  import dependencyWheel from 'highcharts/modules/dependency-wheel';
  dependencyWheel(Highcharts);
  import '@/styles/highcharts.scss';

  import * as NOTypes from '@/interfaces/NOTypes';

  export default defineComponent ({
    components: {
      Header,
      Comments,
      Dropdown,
      DropdownMultiple,
      Slider,
      RadioButtons
    },
    setup() {
      const migrationStore = useMigrationStore()
      return { migrationStore }
    },
    data: () => ({
      pageId: 4,
    }),
    methods: {
    },
    computed: {
      filt() {
        return this.filteredTreemapData.slice(0, 10);
      },
      wheelRadioItems(): NOTypes.RadioItem[] {
        let items: NOTypes.RadioItem[] = [];
        for (let m of this.allWheelMeasures) {
          let check = this.selectedWheelMeasure == m ? true : false;
          items.push({title:m, value: m, checked: check});
        }
        return items;
      },
      treemapRadioItems(): NOTypes.RadioItem[] {
        let items: NOTypes.RadioItem[] = [];
        for (let m of this.allTreemapMeasures) {
          let check = this.selectedTreemapMeasure == m ? true : false;
          items.push({title:m, value: m, checked: check});
        }
        return items;
      },
      ...mapState(useMigrationStore, [ 'mapOptions', 'allMapMeasures', 'allMapYears', 'allMapIncomes', 'treemapOptions', 'filteredTreemapData', 'allTreemapMeasures',
        'allTreemapCountries','allTreemapYears','wheelOptions','allWheelMeasures','wheelLegendItems']),
      ...mapWritableState(useMigrationStore, ['selectedMapMeasure', 'selectedMapYear', 'selectedMapIncomes','mapSliderValue','selectedTreemapMeasure',
        'selectedTreemapCountry','selectedTreemapYear','selectedWheelMeasure']),
    },
    watch: {
    },
    mounted () {
      this.migrationStore.loadData();
      this.migrationStore.initialiseColorMap();
    }
  })

</script>

