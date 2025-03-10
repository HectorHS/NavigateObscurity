<template>
    <Header title="Biodiversity"></Header>
    <section class="px-base">
      <div class="lg:pt-20 w-mainText">
          <p>
            Below you can see the breakdown of the total weight of living organisms (biomass) estimated to be currently
            living on Earth. Biomass is here counted in gigatons of carbon.
          </p>
            <p>
            Keep in mind that I have excluded the estimated 300gt of tree trunks and stems which are mostly non-living lignified
            tissue, as well as the 67gt of bacteria, the 7gt of archaea and the 0.15gt of viruses of the deep subterranian levels
            (both terrestrial and marine) as these organisms are metabolically dormant.
          </p>
          <p>
            Still, you will have to exclude plants altogether from the chart below to have a chance to spot humans and other terrestrial animals.
          </p>
      </div>
      <figure class="flex flex-col lg:flex-row items-center">
        <div class="w-full lg:w-3/12 flex justify-end">
          <RadioButtons :items="radioItems" id="radio1" v-model="selectedPlants" class="w-full" :direction="radioDirection"></RadioButtons>
        </div>
        <div class="h-[50vh] md:h-[70vh] lg:w-9/12">
          <highcharts v-if="sunburstOptions && sunburstOptions.series!.length > 0 && (sunburstOptions.series![0] as Highcharts.SeriesSunburstOptions).data!.length > 0" :options="sunburstOptions" class="w-full h-full"></highcharts>
          <div v-else class="w-full h-full animate-pulse bg-demo-sunburst bg-contain bg-center bg-no-repeat mt-[3px]"></div>
        </div>
      </figure>
      <div class="source-text">
          <p>
            *Source:
            <a href="http://www.pnas.org/content/115/25/6506" target="_blank">Yinon M. Bar-On, Rob Phillips, and Ron
                Milo. 2018. "The
                biomass distribution on Earth". Proceedings of the National Academy of Sciences of the United States of
                America.</a>
          </p>
      </div>
    </section>
    <section class="px-base">
      <div class="pt-24 pb-10 w-mainText">
        <p>
          Here you can see the correlation between the total population of taxa, and their corresponding biomass. Note
          that populations are presented in powers of ten, so every step indicates a tenfold increase of population. 
        </p>
      </div>
      <figure>
        <div class="h-[350px]">
          <highcharts v-if="scatterOptions && scatterOptions.series!.length > 0 && (scatterOptions.series![0] as Highcharts.SeriesScatterOptions).data!.length > 0" :options="scatterOptions" class="w-full h-full"></highcharts>
          <div v-else class="w-full h-full animate-pulse bg-demo-bubbles bg-contain bg-center bg-no-repeat mt-[3px]"></div>
        </div>
      </figure>
      <div class="source-text">
          <p>
              *Source:
              <a href="http://www.pnas.org/content/115/25/6506" target="_blank">Yinon M. Bar-On, Rob Phillips, and Ron
                  Milo. 2018. "The
                  biomass distribution on Earth". Proceedings of the National Academy of Sciences of the United States of
                  America.</a>
          </p>
      </div>
    </section>
    <Comments :pageId="pageId"></Comments>

</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapState, mapWritableState } from 'pinia';
  import { useBiodiversityStore } from '@/store/biodiversityStore.ts';
  import { useAppStore } from '@/store/appStore.ts';

  import Header from '@/components/Header.vue';
  import RadioButtons from '@/components/Controls/RadioButtons.vue';
  import Comments from '@/components/Comments.vue';

  import Highcharts from 'highcharts';
  import sunburstInit from 'highcharts/modules/sunburst'
  sunburstInit(Highcharts)
  import '@/styles/highcharts.scss';

  import * as NOTypes from '@/interfaces/NOTypes';

  export default defineComponent ({
    components: {
      Header,
      RadioButtons,
      Comments
    },
    setup() {
      const biodiversityStore = useBiodiversityStore()
      return { biodiversityStore }
    },
    data: () => ({
      radioItems:[{title: 'include plants', value: 'plants', checked: true}, {title: 'exclude plants', value: 'no_plants', checked: false}] as NOTypes.RadioItem[],
      pageId: 3,
    }),
    methods: {
    },
    computed: {
      radioDirection() {
        let direction = 'row';
        if (this.screenWidth > 800) {
          direction = 'column';
        }
        return direction;
      },
      ...mapState(useBiodiversityStore, [ 'sunburstOptions', 'scatterOptions']),
      ...mapState(useAppStore, ['screenWidth']),
      ...mapWritableState(useBiodiversityStore, ['selectedPlants']),
    },
    mounted () {
      this.biodiversityStore.loadData();
      this.biodiversityStore.initialiseColorMap();
    }
  })

</script>

