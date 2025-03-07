<template>
    <Header title="Death"></Header>
    <section class="px-base">
      <div class="pt-20 w-mainText">
          <p>
            First, a quick visualization to get a perspective of where people live, and how many people get born and die each year.
             Each line represents 10 million people.
          </p>
          <p>
            More people die each year (57m) than the entire populations of Australia and New Zealand (43m), and more than twice that
            many are being born each year (140m). The populations of Europe and Latin America are relatively similar (747m and 653m),
            and each of which is about twice the population of North America (369m), and half the population of Africa (1.3b). Asia
            (4.6b) makes up more than half of the total population of Earth (7.8b).
          </p>
      </div>
    <figure>
      <div class="container">
        <!-- Values are in 10s of millions -->
        <!--  Africa: 134 -->
        <div v-for="n in 134" class="inline-block h-5 w-1.5 rounded mx-0.5 bg-yellow-300"></div>
        <!-- Asia: 464 -->
        <div v-for="n in 464" class="inline-block h-5 w-1.5 rounded mx-0.5 bg-violet-400"></div>
        <!-- Europe: 75 -->
        <div v-for="n in 75" class="inline-block h-5 w-1.5 rounded mx-0.5 bg-blue-400"></div>
        <!-- Latin America and the Caribbean: 65 -->
        <div v-for="n in 65" class="inline-block h-5 w-1.5 rounded mx-0.5 bg-green-300"></div>
        <!-- Northern America: 37 -->
        <div v-for="n in 37" class="inline-block h-5 w-1.5 rounded mx-0.5 bg-red-400"></div>
        <!-- Oceania: 4 -->
        <div v-for="n in 4" class="inline-block h-5 w-1.5 rounded mx-0.5 bg-cyan-300"></div>
        <!-- births: 14 -->
        <div class="inline ml-4">
          <div class="inline-block text-3xl m-0 text-gray-100 leading-4">+</div>
          <div v-for="n in 14" class="inline-block h-5 w-1.5 rounded mx-0.5 bg-gray-100"></div>
        </div>
        <!-- deaths: 6 -->
        <div class="inline ml-4">
          <div class="inline-block text-3xl m-0 text-gray-900 leading-4">-</div>
          <div v-for="n in 6" class="inline-block h-5 w-1.5 rounded mx-0.5 bg-gray-900"  ></div>
        </div>
        <!-- legend -->
        <div class="flex mt-2 justify-center flex-wrap">
          <div v-for="item in populationLegendItems" class="flex  mr-5">
            <div class="legend-dot" :class="'bg-' + item.color"></div>
            <div class="my-auto">{{ item.name }}</div>
          </div>
        </div>

        <div class="source-text">
          <p>
              *Source:
            <a href="https://population.un.org/wpp/Download/Standard/Population/" target="_blank">United
                Nations </a>
            (retrieved 21/02/2020)
          </p>
        </div>
      </div>

      </figure>
    </section>
    <section class="px-base" >
      <div class="pt-24 pb-10 w-mainText">
        <p>
          Apart from the total populations of each country and region, it's interesting to note a few more factors. Population
          density, which measures how many people live per square kilometre, so basically, how crowded is it there. Fertility rate
          which indicates how many children on average are born per woman. A number of around 2 would indicate a stable population,
          with a larger number signalling a population increase and vice versa. Life expectancy is the number of years someone can
          expect to live being born on the given year and place. Median age is an indicator of how old a population is, with smaller
          numbers indicating younger populations and vice versa. Lastly, mortality percentage is the percentage of the total
          population that dies each year.
        </p>
        <p>
          It’s hopeful that there seems to be an optimistic trend in all parameters, with life expectancy stealing the show.
          Despite the fact that fertility rates have been dropping in most of the world, the world’s population has soared mostly
          due to the impressive increase in life expectancy. We are getting more simply by getting older. And with so low median
          ages and high fertility rates, we can expect much more growth coming in the following years from Africa.
        </p>
      </div>
      <figure>
        <div class="flex">
            <Dropdown :items="allLifeMeasures" v-model="selectedLifeMeasure" class="w-[400px]"></Dropdown>
            <Dropdown :items="allLifeYears" v-model="selectedLifeYear" class="w-[200px]"></Dropdown>
        </div>
        <div class="w-full h-[50vh] lg:h-[80vh]">
          <highcharts v-if="lifeMapOptions && lifeMapOptions.series!.length > 0 && (lifeMapOptions.series![0] as Highcharts.SeriesMapOptions).data!.length > 0" :constructorType="'mapChart'" :options="lifeMapOptions" class="w-full h-full"></highcharts>
          <div v-else class="w-full h-full animate-pulse bg-demo-map bg-contain bg-center bg-no-repeat mt-[3px]"></div>
        </div>
        <div class="source-text">
          <p>*Source:
            <a href="http://data.un.org/" target="_blank">United Nations </a>
            (retrieved 26/02/2020)
          </p>
        </div>
      </figure>

    <!-- dashboard -->
    </section>
    <section class="px-base mt-24" >
      <h3 >The Death Dashboard</h3>
      <QON :questions="questions" :obscurities="obscurities" :navigations="navigations" class="my-8"></QON>

      <!-- dashboard - mobile -->
      <div v-if="screenWidth < 1200">
          <DeathMeasures> </DeathMeasures>
          <DeathMap class="dash-card mb-4 h-[300px]"></DeathMap>
          <DeathPyramid class=" mb-4 h-[400px]"></DeathPyramid>
          <DeathTreemap class="mb-4 h-[600px]"></DeathTreemap>
          <DeathRisks class="h-[400px]"></DeathRisks>
      </div>


      <!-- dashboard - desktop -->
       <div class=" h-[1000px]" v-else>
        <div class="h-[600px] flex">
            <DeathMap class="w-3/5 pb-4"></DeathMap>
          <div class="w-2/5 h-full">
            <DeathMeasures> </DeathMeasures>
            <DeathPyramid class="h-[430px]"></DeathPyramid>
          </div>
        </div>
        <div class="h-[400px] flex">
          <div class="w-3/5 mr-4 h-full">
            <DeathTreemap></DeathTreemap>
          </div>
          <div class="w-2/5 h-full">
            <DeathRisks></DeathRisks>
          </div>
        </div>
       </div>
      <div class="source-text">
        <p>*Source:
          <a href="http://ghdx.healthdata.org/gbd-results-tool" target="_blank">The Global Health Data Exchange.</a>
          (retrieved 27/01/2021)
        </p>
      </div>
    </section>

    <section class="px-base" >
      <div class="pt-24 pb-10 w-mainText">
        <p>
          Historical death data is nowhere close to the quality and detail of what is presented above, but you can see a rought
          estimate of the major causes of death for the US in 1900 below.
        </p>
      </div>
      <figure>
        <div class="w-full h-[305px]">
          <highcharts v-if="deathTreemapOldOptions && deathTreemapOldOptions.series!.length > 0 && (deathTreemapOldOptions.series![0] as Highcharts.SeriesTreemapOptions).data!.length > 0" :options="deathTreemapOldOptions" class="w-full h-full"></highcharts>
          <div v-else class="w-full h-full animate-pulse bg-demo-treemap bg-contain bg-center bg-no-repeat mt-[3px]"></div>
        </div>
      </figure>
      <div class="source-text">
        <p>*Source:
          <a href="https://www.nejm.org/doi/full/10.1056/NEJMp1113569" target="_blank">The New England Journal of Medicine.</a>
          (retrieved 06/11/2018)
        </p>
      </div>
    </section>
    <Comments :pageId="pageId"></Comments>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapState, mapWritableState } from 'pinia';
  import { useDeathStore } from '@/store/deathStore.ts';
  import { useAppStore } from '@/store/appStore.ts';

  import Header from '@/components/Header.vue';
  import Comments from '@/components/Comments.vue';
  import Dropdown from '@/components/Controls/Dropdown.vue';
  import QON from '@/components/QON.vue';
  import DeathMap from '@/components/Death/Map.vue';
  import DeathMeasures from '@/components/Death/Measures.vue';
  import DeathPyramid from '@/components/Death/Pyramid.vue';
  import DeathTreemap from '@/components/Death/Treemap.vue';
  import DeathRisks from '@/components/Death/Risks.vue';

  // https://github.com/highcharts/highcharts-vue#importing-highcharts-modules
  import Highcharts from 'highcharts';
  import Treemap from 'highcharts/modules/treemap';
  Treemap(Highcharts);
  import '@/styles/highcharts.scss';

  export default defineComponent ({
    components: {
      Header,
      Comments,
      Dropdown,
      QON,
      DeathMap,
      DeathMeasures,
      DeathPyramid,
      DeathTreemap,
      DeathRisks
    },
    setup() {
      const deathStore = useDeathStore()
      return { deathStore }
    },
    data: () => ({
      pageId: 1,
      populationLegendItems: [
        {name: 'Africa', color: 'yellow-300'},
        {name: 'Asia', color: 'violet-400'},
        {name: 'Europe', color: 'blue-400'},
        {name: 'Latin America and the Caribbean', color: 'green-300'},
        {name: 'Northern America', color: 'red-400'},
        {name: 'Oceania', color: 'cyan-300'},
        {name: 'Births', color: 'gray-100'},
        {name: 'Deaths', color: 'gray-900'}],
      questions: [
        'The leading cause of death for Males aged 20-29 across Northern Europe, Canada and Australia, is suicide.',
        'One in 5 deaths in Nigeria, are for children under the age of 9.',
        'Four times more deaths are related to air pollution (risk) than to unsafe water, sanitation and handwashing (risk).',
        'Almost a third of all deaths in South Africa are caused by HIV.',
        'Globally, drug use (risk) is associated with about 5 times more deaths than alcohol consumption (risk).',
        'Globally, more people die from traffic accidents than enteric infections, digestive diseases, and HIV combined.'
      ],
      obscurities: [
        'Attributing a single cause of death for each death happening is a useful simplification that allows us to compare causes of death ' +
        'and get a bird’s eye view of what is killing us. But it also hides a lot of what is going on. Does a HIV patient who contracts viral ' +
        'Hepatitis die from HIV or Hepatitis? Does a cancer patient who contracts the flu, which then develops to pneumonia die from cancer, ' +
        'the flu, or pneumonia? Does a driver having a fatal road accident while under the influence of alcohol die from the car crash, or the ' +
        'alcohol? Does a child who is severely underfed die from malnutrition or from poverty? To navigate this landscape, we need some ' +
        'conventions, and the dominating one is to single out the most severe cause, the one having the greatest impact on one’s health. As a ' +
        'result, in this dataset, the first death would be counted under HIV, the second under cancer, the third as a transport accident (with ' +
        'alcohol an associated risk) and the last a nutritional deficiency (with poverty ignored as a factor).',
        'The examples above show two important shortcomings of such datasets. The simplification of a single cause of death, and the disregard ' +
        'of certain socioeconomic contributors (such as poverty). This last bit is important because big scale tragedies like poverty, famine, ' +
        'war, child labour and so on will not show up either as risks or causes of death. Another, is that death itself is a very narrow point ' +
        'of view for disease, and more broadly, suffering. Patients can live for years with ALS, decades with HIV and many overcome cancer. So ' +
        'this data is not a good indication of how many people get impacted by a disease (e.g. you cannot tell how many people get cancer), or ' +
        'how much it impacts them. Ultimately this data can only help us understand mortality.'
      ],
      navigations: [
        'All data presented here is for 2019.',
        'Three out of the four charts shown here are clickable so click away and use them to filter the data based on location, cause of death, ' +
        'age and sex. You can review your selections on the top right, where you can also click on the refresh buttons to reset them.',
        ' Use the map to either see what causes of death dominate each geography (no cause of death selected) or to compare the prevalence of a ' +
        'specific cause of death between countries. This is especially interesting when comparing poorer and richer areas, or when comparing ' +
        'younger and older age groups. The divided box underneath (treemap) shows a break-down of all deaths for the selected country (or the ' +
        'world). The total area represents all deaths, and the size of each smaller part is analogous to the corresponding number of deaths. ' +
        'The double bars provide some demographic information on who is doing all the dying. You’ll notice that in rich countries, barely anyone young ' +
        'dies, but the image changes dramatically in the poorest parts of the world. Note that a 20% on ages 70-79 translates to “20% of the ' +
        'deceased where 70-79 years old” and not “20% of 70-79 years old died”. The last set of bars show risks associated with the selected cause(s) of ' +
        'death. Note that here there is no 1-1 relation between deaths and risks. ' +
        'Multiple risks might relate to the same death, and some deaths might not relate to any risks, so the sums of all deaths (on the ' +
        'treemap) and all risks may not match, and the elimination of all risks will not lead to the elimination of all relevant deaths.'
    ]
    }),
    methods: {
    },
    computed: {
      ...mapState(useDeathStore, ['allLifeMeasures','allLifeYears', 'lifeMapOptions','deathTreemapOldOptions']),
      ...mapState(useAppStore, ['screenWidth', 'allPages']),
      ...mapWritableState(useDeathStore, ['selectedLifeMeasure','selectedLifeYear']),
    },
    mounted () {
      this.deathStore.loadData();
      this.deathStore.initialiseMaps();
    }
  })

</script>
