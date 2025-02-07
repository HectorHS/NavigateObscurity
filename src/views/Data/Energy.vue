<template>
    <Header title="Energy"></Header>
    <section class="px-base mt-24" >
      <h3 >The Energy Dashboard</h3>
      <QON :questions="questions" :obscurities="obscurities" :navigations="navigations" class="my-8"></QON>

      <!-- dashboard - mobile -->
      <div v-if="screenWidth < 1200">
        <div class="">
          <EnergyOverview> </EnergyOverview>
          <EnergyMap class="dash-card mb-4 h-[300px]"></EnergyMap>
          <EnergyArea class="mb-4 h-[600px]"></EnergyArea>
          <EnergyImport class="mb-4 h-[400px]"></EnergyImport>
          <EnergyExport class="mb-4 h-[400px]"></EnergyExport>
          <EnergySunburst class="h-[400px]"></EnergySunburst>
        </div>
      </div>


      <!-- dashboard - desktop -->
       <div class=" h-[1000px]" v-else>
        <div class="h-[600px] flex">
          <EnergyMap class="w-8/12 pb-4"></EnergyMap>
          <div class="w-4/12 h-full ">
            <EnergyOverview> </EnergyOverview>
            <EnergyArea class="h-[458px]"></EnergyArea>
          </div>
        </div>
        <div class="h-[400px] flex">
          <div class="w-4/12 h-full">
            <EnergyImport></EnergyImport>
          </div>
          <div class="w-4/12 h-full">
            <EnergyExport class=" mx-4"></EnergyExport>
          </div>
          <div class="w-4/12 h-full">
            <EnergySunburst></EnergySunburst>
          </div>
        </div>
       </div>
      <div class="source-text">
        <p>*Sources:
          <br />
          Energy used & CO2 data: <a
              href="https://www.bp.com/en/global/corporate/energy-economics/statistical-review-of-world-energy/downloads.html"
              target="_blank">BP stats review 2022</a>. Downloaded at 23/09/2022. </br>
          Data for missing countries was sourced by: <a
              href="https://databank.worldbank.org/reports.aspx?source=2&type=metadata" target="_blank">
              World Bank</a>. Downloaded at 19/10/2022.<br />
          Import & export data: <a
              href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/TTOXMB"
              target="_blank">Global energy relations dataset (GERD)</a>. Downloaded at 11/11/2022. </br>
          Energy use by sector data: IEA's <a
              href="https://www.iea.org/data-and-statistics/data-product/energy-efficiency-indicators-highlights"
              target="_blank"> energy efficiency</a>
          & <a href="https://www.iea.org/data-and-statistics/data-product/world-energy-balances-highlights"
              target="_blank">world energy</a> databases. Both downloaded at 27/01/2023.<br />
          Population data: <a href="https://databank.worldbank.org/reports.aspx?source=2&type=metadata"
              target="_blank"> World Bank</a>. Downloaded at 19/10/2022.
        </p>
      </div>
    </section>
    <Comments :pageId="pageId"></Comments>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapState } from 'pinia';
  import { useEnergyStore } from '@/store/energyStore.ts';
  import { useAppStore } from '@/store/appStore.ts';

  import Header from '@/components/Header.vue';
  import Comments from '@/components/Comments.vue';
  import QON from '@/components/QON.vue';
  import EnergyMap from '@/components/Energy/Map.vue';
  import EnergyArea from '@/components/Energy/Area.vue';
  import EnergyOverview from '@/components/Energy/Overview.vue';
  import EnergyImport from '@/components/Energy/Import.vue';
  import EnergyExport from '@/components/Energy/Export.vue';
  import EnergySunburst from '@/components/Energy/Sunburst.vue';

  // https://github.com/highcharts/highcharts-vue#importing-highcharts-modules
  import Highcharts from 'highcharts';
  import sunburstInit from 'highcharts/modules/sunburst'
  sunburstInit(Highcharts)
  import '@/styles/highcharts.scss';

  export default defineComponent ({
    components: {
      Header,
      Comments,
      QON,
      EnergyMap,
      EnergyArea,
      EnergyOverview,
      EnergyImport,
      EnergyExport,
      EnergySunburst
    },
    setup() {
      const energyStore = useEnergyStore()
      return { energyStore }
    },
    data: () => ({
      pageId: 12,
      questions: [
        'The total global energy consumption has tripled over the last 55 years.',
        'Large producer countries like the USA, China, and Germany spend as much energy in industry as they do in transportation (of goods and people).',
        'The world’s third-largest energy exporter is also the world’s second-largest energy importer.',
        'Brazil has a larger percentage of energy coming from renewable sources than Germany.',
        'The total energy consumption in Germany has remained fairly constant from 1970 to today. The same is true for other large countries in Europe like the UK, France and Spain.',
        'Despite having a population 4 times larger, India consumes the same total amount of energy as the USA.'
      ],
      obscurities: [
        'Even though energy plays a very important role in our lives on several levels, interpersonal, social, national, and global, our sources ' +
        'of free-to-access international energy data are very restricted. This is the reason why data for several countries and several metrics are ' +
        'utterly missing in this dashboard, and it is the first and most obvious of the data’s limitations here. In no particular order, several ' +
        'other limitations are the following.',
        'The data might give us an indication of how much energy is produced, but it does not tell us much about the impact on our societies and ' +
        'the environment of such practices. For instance, how much waste is produced, how is it managed, what is the impact of energy production ' +
        'on the health of local communities and so on.',
        'Country-level data is interesting, but a lot of energy is being produced and sold by major international corporations, which are completely ' +
        'hidden in nation-level representations.',
        'Who benefits? Is energy production government run or is it private? Do local communities benefit from the energy produced (financially, with ' +
        'cheap energy, or even with jobs) or is it used elsewhere?',
        'Since even large energy exporters like the USA and Russia import significant amounts of energy, it becomes obvious that energy is not traded ' +
        'just to cover the energy needs of a particular population. There are more parameters that drive this trade, which, however, remain hidden in ' +
        'this representation.'
      ],
      navigations: [
        'On the map you can see how much energy each country consumes per capita, allowing us to compare energy consumption needs and habits across ' +
        'regions. By changing the energy source via the radio buttons we can also see on the map the degree that each country relies on that particular ' +
        'energy source. Lastly, the map can be used to select a country and update the rest of the stats and charts on the dashboard.',
        'The area chart shows energy consumption over time to help us appreciate both how the total consumption has been changing over time, and how ' +
        'the makeup of our energy sources has been changing. These are total values (not per capita as in the map), so changes in population and the ' +
        'standard of living have a significant impact here. The two bar charts give us a quick glimpse at the top countries that provide (sell) and ' +
        'consume (buy) energy from the selected country. The pie chart gives us a breakdown of how energy is eventually used.'
    ]
    }),
    methods: {
    },
    computed: {
      ...mapState(useAppStore, ['screenWidth']),
    },
    mounted () {
      this.energyStore.loadData();
      this.energyStore.initialiseMaps();
    }
  })

</script>
