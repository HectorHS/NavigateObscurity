<template>
    <Header title="COVID-19"></Header>
    <section class="px-base mt-24" >
      <p>All data presented here cover the first 3 years of the pandemic (2020 - 2022).</p>
      <h3 >The Covid-19 Dashboard</h3>
      <QON :questions="questions" :obscurities="obscurities" :navigations="navigations" class="my-8"></QON>

      <!-- dashboard - mobile -->
      <div v-if="screenWidth < 1200">
          <CovidOverview> </CovidOverview>
          <CovidMap class="dash-card my-4 mt-4 h-[300px]"></CovidMap>
          <CovidMortality class="mb-4 h-[400px]"></CovidMortality>
          <CovidCases class="mb-4 h-[300px]"></CovidCases>
          <CovidDeaths class="mb-4 h-[300px]"></CovidDeaths>
          <CovidVaccines class="mb-4 h-[300px]"></CovidVaccines>
          <CovidHospitals class="h-[300px]"></CovidHospitals>
      </div>


      <!-- dashboard - desktop -->
       <div class=" h-[1100px]" v-else>
        <div class="h-[550px] flex">
            <CovidMap class="w-7/12 pb-4"></CovidMap>
          <div class="w-5/12 h-full">
            <CovidOverview> </CovidOverview>
            <CovidMortality class="h-[403px] mt-4"></CovidMortality>
          </div>
        </div>
        <div class="h-[550px] flex">
          <div class="flex flex-col w-6/12 h-full mr-4">
              <CovidCases class="h-3/6 mb-4"></CovidCases>
              <CovidDeaths class="h-3/6"></CovidDeaths>
          </div>
          <div class="flex flex-col w-6/12 h-full">
              <CovidVaccines class="h-3/6 mb-4"></CovidVaccines>
              <CovidHospitals class="h-3/6"></CovidHospitals>
          </div>
        </div>
       </div>
      <div class="source-text">
        <p>*Sources:
          <br />
          cases & deaths data: <a href="https://github.com/CSSEGISandData/COVID-19"
              target="_blank">Johns Hopkins University.</a>Downloaded on 11/05/2023. </br>
          Hospitalization & vaccination data: <a href="https://github.com/owid/covid-19-data" target="_blank">Our World
              in Data.</a>Downloaded on 11/05/2023. <br />
          Historical weekly death toll & excess mortality: <a href="https://www.mortality.org/" target="_blank">Human Mortality Database</a>,
            <a href="https://github.com/akarlinsky/world_mortality/tree/main" target="_blank">World Mortality Dataset</a>,
            & <a href="https://www.who.int/data/sets/global-excess-deaths-associated-with-covid-19-modelled-estimates" target="_blank">WHO</a>, all downloaded on 30/05/2023.
            <br/>Movement restriction data: <a href="https://github.com/OxCGRT/covid-policy-tracker" target="_blank">Oxford University.</a> Downloaded on 22/05/2023.
        </p>
      </div>
    </section>
    <Comments :pageId="pageId"></Comments>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapState, mapWritableState } from 'pinia';
  import { useCovidStore } from '@/store/covidStore.ts';
  import { useAppStore } from '@/store/appStore.ts';

  import Header from '@/components/Header.vue';
  import Comments from '@/components/Comments.vue';
  // import Dropdown from '@/components/Controls/Dropdown.vue';
  import QON from '@/components/QON.vue';
  import CovidMap from '@/components/Covid/Map.vue';
  import CovidOverview from '@/components/Covid/Overview.vue';
  import CovidMortality from '@/components/Covid/Mortality.vue';
  import CovidCases from '@/components/Covid/Cases.vue';
  import CovidDeaths from '@/components/Covid/Deaths.vue';
  import CovidVaccines from '@/components/Covid/Vaccines.vue';
  import CovidHospitals from '@/components/Covid/Hospitals.vue';

  // https://github.com/highcharts/highcharts-vue#importing-highcharts-modules
  import Highcharts from 'highcharts';
  import labelsInit from 'highcharts/modules/series-label'
  labelsInit(Highcharts)

  import '@/styles/highcharts.scss';

  export default defineComponent ({
    components: {
      Header,
      Comments,
      QON,
      CovidMap,
      CovidOverview,
      CovidMortality,
      CovidCases,
      CovidDeaths,
      CovidVaccines,
      CovidHospitals
    },
    setup() {
      const covidStore = useCovidStore()
      return { covidStore }
    },
    data: () => ({
      pageId: 6, 
      questions: [
        'For each of the first three years of the pandemic, Chile had a 50% increase in its total yearly death toll (from all causes) compared to the' +
        'average of the previous five years, and only about half of these deaths correspond to the recorded covid-19 deaths.',
        'The COVID-19 death toll for New Zealand in 2020 and 2021 was similar to its yearly suicide death toll (you might need to check some ' +
        '<a href="https://www.navigateobscurity.com/data/death" target="_blank">death data</a> for this).',
        'At some point during the first three years of the pandemic, some movement restriction was imposed in all countries at the same time (at ' +
        'least in all countries we have data for).',
        'Only about half of the excess mortality (deaths exceeding the average of previous years) for the USA, Brazil, Spain, France and Sweden, ' +
        'can be accounted for by the COVID-19 deaths recorded in the first three years of the pandemic.',
        "Despite the dramatic increase in vaccinations in 2021, the number of total cases, hospitalizations, and deaths weren't so different between " +
        'January 2021 and January 2022 for the UK, France, and Italy.',
        'For each of the first three years of the pandemic, more people died from COVID-19, than the number of deaths caused in a typical year by wars, ' +
        'violent crimes, terrorism, and drug abuse combined (you might need to check some ' +
        '<a href="https://www.navigateobscurity.com/data/death" target="_blank">death data</a> for this).'
      ],
      obscurities: [
        'Cases numbers are the confirmed cases, so the number of people who have tested positive for COVID-19. Since the begining of the pandemic, ' +
        'we have known that since everyone was not constantly being tested, the confirmed cases figures must be undervaluing the true spread of the ' +
        'virus. The question is, by how much? A good indication is to look at how many tests have been done for every positive result. If we have done ' +
        '100 tests for every positive one (100 ratio), our total numbers are probably much more accurate than having done 2 tests for each positive one ' +
        '(2 ratio). Ok, so I can look at the total confirmed cases, and then on the positive ratio, come up with a fancy calculation formula and then I’ll ' +
        'know. Getting closer, but not there yet. Testing is carried out very differently in different parts of the world. Some countries count the number ' +
        'of people tested, others the number of samples tested, and for many countries we don’t even have data. Some countries test widely, some narrowly ' +
        'in high-risk populations, others use track and test systems and so on. All these different approaches cannot be accurately quantified at this ' +
        'point, but some data is better than none.',
        'Death data might be a better metric to gauge the impact of the pandemic at a certain time, but again it is not perfect. COVID-19 deaths are ' +
        'counted slightly differently in different places. Sometimes even in the same place at different times. For instance, in the UK, up until the ' +
        '12 of August 2020, all deaths following a positive COVID-19 test were counted in the COVID-19 death sum. Then, officials decided to only ' +
        'include deaths occurring up until 28 days after the initial positive test cutting down the total number of deaths by over 5 thousand. In ' +
        'many other countries, COVID-19 needs to be specifically listed in the causes of death of a patient. And of course, COVID-19 is rarely the ' +
        'only cause of death. This is not a new problem. Terminally ill people are very often challenged on multiple fronts.',
        'Another way to look at death data is to simply sum up all deaths occurring over a month (or week) and compare the total monthly (or weekly) ' +
        'sums with previous years. The gross simplification here is that any excess deaths should correspond to COVID-19’s impact. True, but impact is ' +
        'not just people directly dying from COVID-19, but also from the side effects of the pandemic. Like hospitals being full, patients avoid ' +
        'visiting them out of fear and so on. Unfortunately, this data is missing for many countries, including China, India, Indonesia and ' +
        'Pakistan, which combined constitute about half of the Earth’s population.',
        'To get an idea of how badly the healthcare system was hit, we can look at the number of people who were hospitalized or even put into ICUs ' +
        '(intensive care units) due to COVID-19. We have 2 different kinds of metrics here, one about the total number of patients in hospitals ' +
        '(or ICUs) at any given time, and another about new admissions. I am showing data for the first kind of data where possible, but you might ' +
        'notice that we only have new admissions data for some countries, others only report on hospitalizations or ICUs but not both, and for many ' +
        'countries we do not have any relevant data at all.',
        'Of course, all of the above were impacted by the different policies each country imposed on its citizens and borders, adding another level ' +
        'of obscurity when trying to compare these measures. These policies were very diverse and hard to quantify, so in order to provide some visual ' +
        'representation here (as seen on the map chart when selecting "movement restrictions imposed") I have made two simplifications. First, I have ' +
        'only focused on movement restriction policies and in this way ignored a wide variety of other policies including mask wearing, working from ' +
        'home, closure of schools and businesses, and restriction of gatherings. This is not because I have proof that movement restriction policies ' +
        'were more effective in battling COVID-19 than other policies, it is simply because I found these policies to be the most severe and hard to ' +
        'comply to. Second, I am simplyfying these responses by grouping them in 4 categories: "generall lockdown", and "general curfew", when a ' +
        'lockdown or curfew was imposed on the whole country; "non general restrictions", when a movement restricion was only imposed on part of the ' +
        'population, like a localised lockdown or curfew; and "test/vaccination based restrictions" when restrictions were only imposed on people ' +
        'without a proof of vaccination and/or test, most commonly imposed on travel.'
      ],
      navigations: [
        'Cases and death data are provided on a "per million people" basis (as seen on the map chart) so that values between countries are ' +
        'comparable, and on a "total number" basis (as seen on the bar charts) to make comparisons across time easier to decipher. Due to the ' +
        'various obscurities described above, the data is better suited for comparing values across time for the same country, than comparing ' +
        'values between countries. So ultimately, the numbers are more useful if seen like body weight readings. Sure, you can compare your ' +
        'number with everyone else’s, but it’s probably more useful to just compare it with the one you had a week ago, a month ago or a year ' +
        "ago. All things considered, the best way to get a bird's eye view of this data is via the animation feature of the map (click the play " +
        'button!), which allows you to compare data across countries and time simultaneously, while also providing a clear view of the different ' +
        'waves of the pandemic.',
        'The hospitalisation, vaccination, and movement restriction data can provide further context to the cases and deaths data. Take Germany ' +
        'as an example. The ratio between cases, hospitalizations, and deaths, remained very similar during the first two winters of the pandemic. ' +
        'Then, in the beginning of 2022, case numbers exploded while the positive test ratio hit an all-time low indicating that the real number of ' +
        'cases was almost certainly even higher. At the same time, deaths were actually reduced compared to the previous winter. This is ' +
        'particularly surprising after seeing that hospitalisations were actually pretty high for a very long time in 2022. The less strict ' +
        'movement restrictions in this third winter likely contributed to the increased cases, but the increased vaccination likely contributed to ' +
        'the reduced deaths. The total excess deaths, however, were significantly higher in 2022, possibly hinting at the hidden impacts of an over ' +
        'encumbered health system. Lastly, the winter peaks in cases, hospitalizations and deaths can partly explain the increased movement ' +
        'restrictions imposed during winters, which is a theme shared with most countries of similar geographies (climate).',
        "Finally, the overall excess of deaths is arguably the best testament to COVID-19's impact. Beyond debates about the virus' deadliness, " +
        'and the reliability of the various available data, here is a clear metric of the cost of life of the pandemic and how we handled it.'
    ]
    }),
    methods: {
    },
    computed: {
      ...mapState(useAppStore, ['screenWidth']),
    },
    mounted () {
      this.covidStore.loadData();
      this.covidStore.initialiseMaps();
    }
  })

</script>
