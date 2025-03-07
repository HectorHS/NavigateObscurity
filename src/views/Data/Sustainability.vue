<template>
    <Header title="Sustainability"></Header>
    <section class="px-base">
      <div class="pt-10 w-mainText">
        <p>
            Biocapacity here is the ability of earth to provide what humans demand of it in a
            sustainable way. Start by thinking of all the cropland, grazing land,
            fishing grounds and forests needed to extract our food and other essential resources,
            and put them all together. Then add all the land and forests needed to absorb
            all our waste and carbon emissions. Lastly, add all the space humanity takes up
            for our infrastructure, cities etc. All that, provided in a manner that is renewable,
            makes up earth’s biocapacity. The average biocapacity per person on the planet is
            1.7 global hectares. This is our personal budget for all our needs.
        </p>
        <p>
            A global hectare (gha) is a productivity weighted measurement of space. So a gha of cropland takes up less
            space than a gha of pasture land, according to their difference in productivity. This allows us to have a
            single unit of measurement for diverse environmental resources, and more importantly, of the environmental
            impact of our consumption habits.
        </p>
        <p>
            The environmental footprint of consumption is therefore measured in the global hectares needed for those
            activities. When the footprint exceeds biocapacity, production is not sustainable and we have an
            environmental deficit. On a national level, biocapacity could be imported via trade. But on an international
            level, a deficit translates to environmental assets being depleted (think of fisheries, forests etc) and /
            or waste being emitted (land, sea and atmosphere). The total ecological footprint of humanity is 2.8 gha per
            person. In our current consumption levels, we need 1.7 earths to sustain us.
        </p>
        <p>
            For more information and great visualisations, visit the <a href="http://data.footprintnetwork.org/#/"
                target="_blank">Global Footprint Network</a>.
        </p>
      </div>
      <figure>
        <div class="flex flex-wrap">
            <Dropdown :items="allMapMeasures" v-model="selectedMapMeasure" class="w-[400px]"></Dropdown>
            <Dropdown :items="allAreas" v-model="selectedMapArea" class="w-[200px]"></Dropdown>
            <Dropdown :items="allIncomes" v-model="selectedMapIncome" class="w-[200px]"></Dropdown>
        </div>
        <div class="w-full h-[50vh] lg:h-[80vh]">
          <highcharts v-if="dataLoaded" :constructorType="'mapChart'" :options="mapOptions" class="h-full w-full"></highcharts>
          <div v-else class="w-full h-full animate-pulse bg-demo-map bg-contain bg-center bg-no-repeat mt-[3px]"></div>
        </div>
        
        <div class="source-text">
          <p>
            *Source:
            <a href="http://data.footprintnetwork.org/#/" target="_blank">Global Footprint Network. </a>
            National Footprint Accounts, 2018 Edition. Downloaded 25/11/2018.
          </p>
      </div>
      </figure>

    </section>
    <section class="px-base">
      <div class="pt-24 pb-10 w-mainText">
        <p>
            Below you can see a breakdown of the different types of consumption or biocapacity as well as historical
            data for each country. 
        </p>
      </div>
      <figure>
        <div class="flex">
            <Dropdown :items="allAreaMeasures" v-model="selectedAreaMeasure" class="w-[400px]"></Dropdown>
            <Dropdown :items="allCountries" v-model="selectedAreaCountry" class="w-[200px]"></Dropdown>
        </div>
        <div class="w-full h-[50vh] mt-3">
          <highcharts v-if="dataLoaded" :options="areaOptions" class="h-full w-full"></highcharts>
          <div v-else class="w-full h-full animate-pulse bg-demo-area bg-contain bg-center bg-no-repeat mt-[3px]"></div>
        </div>
        <div class="source-text">
        <p>
            *Source:
            <a href="http://data.footprintnetwork.org/#/" target="_blank">Global Footprint Network. </a>
            National Footprint Accounts, 2018 Edition. Downloaded 25/11/2018.
        </p>
      </div>
      </figure>
    </section>
    <Comments :pageId="pageId"></Comments>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapState, mapWritableState } from 'pinia';
  import { useSustainabilityStore } from '@/store/sustainabilityStore.ts';

  import Header from '@/components/Header.vue';
  import Dropdown from '@/components/Controls/Dropdown.vue';
  import Comments from '@/components/Comments.vue';

  import '@/styles/highcharts.scss';

  export default defineComponent ({
    components: {
      Header,
      Dropdown,
      Comments
    },
    setup() {
      const sustainabilityStore = useSustainabilityStore()
      return { sustainabilityStore }
    },
    data: () => ({
      pageId: 2,
    }),
    methods: {
    },
    computed: {
      ...mapState(useSustainabilityStore, [ 'mapOptions', 'allMapMeasures', 'allAreas', 'allIncomes', 'areaOptions', 'allAreaMeasures', 'allCountries','dataLoaded']),
      ...mapWritableState(useSustainabilityStore, ['selectedMapMeasure', 'selectedMapArea', 'selectedMapIncome', 'selectedAreaMeasure', 'selectedAreaCountry']),
    },
    mounted () {
      this.sustainabilityStore.loadData();
      this.sustainabilityStore.initialiseMaps();
    }
  })

</script>

