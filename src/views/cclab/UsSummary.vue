<template>
    <Navbar></Navbar>
    <Header></Header>

  <div class="data-container">
    <!-- remade us dashboard - public facing -->
    <figure style="margin-bottom:50px;">

        <div class="dashboard-container-horizontal CCLab-dashboard glodash-container">
            <h1>US cohort - Summary of findings</h1>
            <div class="dashboard-text">We surveyed a representive cohort of 921 US based participants 18 times
                between September 26th
                2020 and August 29th 2022. Here are our main findings regarding cooperation.

            </div>

            <UsSumOverview></UsSumOverview>

            <div class="dash-texture">
                <div class="dashboard-container-vertical dashboard-level-1">
                    <div class="dashboard-container-horizontal dashboard-side-50">
                        <div class="dash-info">We examined how people’s willingness to help others and their
                            perceived interdependence with others
                            changed during the COVID-19 pandemic. Use the map below to see how people from different
                            states
                            responded to some of our questions (graphs on the right).</div>
                        <div class="dash-attention" style="height: 100px;">
                            <div id="glo_dash_country" class="yellow-font">({{ selected_state }})</div>
                            <div>! Choose a state by clicking on the map</div>
                        </div>
                        <div  class="chart-inset">
                            <UsSumMap class="h-[436px]"></UsSumMap>
                            <div id="glodash_map"></div>
                        </div>
                    </div>
                    <div class="dashboard-container-horizontal dashboard-side-50">
                        <div class="dashboard-container-vertical">
                            <UsSumInter1 class="chart-inset h-[300px]"></UsSumInter1>
                            <UsSumInter2 class="chart-inset  h-[300px]"></UsSumInter2>
                        </div>
                        <div class="dashboard-container-vertical">
                            <UsSumWill1 class="chart-inset  h-[408px]"></UsSumWill1>
                            <UsSumWill2 class="chart-inset  h-[408px]"></UsSumWill2>
                        </div>

                    </div>
                </div>
                <div class="dash-info">
                    <div style="font-weight: 600; font-size: 120%; padding-bottom: 10px;">Explore further</div>
                    <div>See how responses changed over time for specific questions broken down by age, sex and COVID-19
                        infection</div>
                </div>
                <div class="dash-attention">
                    <div class="yellow-font">{{questionText}} </div>
                    <div>! Choose a different question:</div>
                    <div class="dropdown-container w-full">
                        <select v-model="selected_question">
                            <option v-for="q of all_questions">{{ q }}</option>
                        </select>
                    </div>
                </div>
                <div class="dashboard-container-vertical">
                    <UsSumCovid class="chart-inset dashboard-breakdown"></UsSumCovid>
                    <UsSumAge class="chart-inset dashboard-breakdown"></UsSumAge>
                </div>
                <div class="dashboard-container-vertical">
                    <UsSumSex class="chart-inset dashboard-breakdown"></UsSumSex>
                    <UsSumInfected class="chart-inset dashboard-breakdown"></UsSumInfected>
                </div>

            </div>
            </div>
        <a class="cclab-button" href="https://www.cooperationintheapocalypse.org/#data">return to data</a>

    </figure>



</div>
<Footer></Footer>


</template>

<script lang="ts">
  import { useUsSumStore } from '@/store/cclab/usSumStore.ts';
  import { mapState, mapWritableState } from 'pinia';
  import { defineComponent } from 'vue';
  import Navbar from '@/components/cclab/Navbar.vue';
  import Header from '@/components/cclab/Header.vue';
  import Footer from '@/components/cclab/Footer.vue';
  import UsSumOverview from '@/components/cclab/UsSumOverview.vue';
  import UsSumMap from '@/components/cclab/UsSumMap.vue';
  import UsSumInter1 from '@/components/cclab/UsSumInter1.vue';
  import UsSumInter2 from '@/components/cclab/UsSumInter2.vue';
  import UsSumWill1 from '@/components/cclab/UsSumWill1.vue';
  import UsSumWill2 from '@/components/cclab/UsSumWill2.vue';
  import UsSumAge from '@/components/cclab/UsSumAge.vue';
  import UsSumSex from '@/components/cclab/UsSumSex.vue';
  import UsSumCovid from '@/components/cclab/UsSumCovid.vue';
  import UsSumInfected from '@/components/cclab/UsSumInfected.vue';

  export default defineComponent ({
    components: {
      UsSumOverview,
      Navbar,
      Header,
      Footer,
      UsSumMap,
      UsSumInter1,
      UsSumInter2,
      UsSumWill1,
      UsSumWill2,
      UsSumAge,
      UsSumSex,
      UsSumCovid,
      UsSumInfected
    },
    setup() {
      const usSumStore = useUsSumStore()
      return { usSumStore }
    },
    data: () => ({

    }),
    methods: {

    },
    computed: {
        questionText():string {
            let text = '';
            if (this.selected_question) {
                text = this.selected_question;
                if (this.scaleMap) {
                    text = text + ' ' + this.scaleMap.get(this.selected_question);
                }
            }
            return text;
        },
        ...mapState(useUsSumStore, ['selected_state', 'all_questions', 'scaleMap']),
        ...mapWritableState(useUsSumStore, ['selected_question']),
    },
    mounted () {
        this.usSumStore.loadData();
        this.usSumStore.initialiseMaps();
    }
  })

</script>

<style lang="scss" scoped>

</style>