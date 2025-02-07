<template>
    <Navbar></Navbar>
    <Header></Header>

  <div class="data-container">
    <!-- remade us dashboard - public facing -->
    <figure style="margin-bottom:50px;">

        <div class="dashboard-container-horizontal CCLab-dashboard glodash-container">
            <h1>Global cohort - Summary of findings</h1>
            <div class="dashboard-text">We surveyed an international cohort of 1018 participants 14 times
                between March 2th
                2020 and August 22nd 2020. Here are our main findings regarding cooperation.

            </div>

            <GloSumOverview></GloSumOverview>

            <div class="dash-texture">
                <div class="dashboard-container-vertical dashboard-level-1">
                    <div class="dashboard-container-horizontal dashboard-side-50">
                        <div class="dash-info">We examined how people’s willingness to help others and their
                            perceived interdependence with others
                            changed during the COVID-19 pandemic. Use the map below to see how people from different
                            countries
                            responded to some of our questions (graphs on the right).</div>
                        <div class="dash-attention" style="height: 100px;">
                            <div id="glo_dash_country" class="yellow-font">({{ selected_country }})</div>
                            <div>! Choose a country by clicking on the map</div>
                        </div>
                        <div  class="chart-inset">
                            <GloSumMap class="h-[435px]"></GloSumMap>
                            <div id="glodash_map"></div>
                        </div>
                    </div>
                    <div class="dashboard-container-horizontal dashboard-side-50">
                        <div class="dashboard-container-vertical">
                            <GloSumInter1 class="chart-inset h-[300px]"></GloSumInter1>
                            <GloSumInter2 class="chart-inset  h-[300px]"></GloSumInter2>
                        </div>
                        <div class="dashboard-container-vertical">
                            <GloSumWill1 class="chart-inset  h-[408px]"></GloSumWill1>
                            <GloSumWill2 class="chart-inset  h-[408px]"></GloSumWill2>
                        </div>

                    </div>
                </div>
                <div class="dash-info">
                    <div style="font-weight: 600; font-size: 120%; padding-bottom: 10px;">Explore further</div>
                    <div>See how responses changed over time for specific questions broken down by age, sex and preexisting conditions</div>
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
                    <GloSumCovid class="chart-inset dashboard-breakdown"></GloSumCovid>
                    <GloSumAge class="chart-inset dashboard-breakdown"></GloSumAge>
                </div>
                <div class="dashboard-container-vertical">
                    <GloSumSex class="chart-inset dashboard-breakdown"></GloSumSex>
                    <GloSumPreexisting class="chart-inset dashboard-breakdown"></GloSumPreexisting>
                </div>

            </div>
            </div>
        <a class="cclab-button" href="https://www.cooperationintheapocalypse.org/#data">return to data</a>

    </figure>



</div>
<Footer></Footer>


</template>

<script lang="ts">
    import { useGlobalSumStore } from '@/store/CCLAB/globalSumStore';
  import { mapState, mapWritableState } from 'pinia';
  import { defineComponent } from 'vue';
  import GloSumOverview from '@/components/CCLAB/GloSumOverview.vue';
  import Navbar from '@/components/CCLAB/Navbar.vue';
  import Header from '@/components/CCLAB/Header.vue';
  import Footer from '@/components/CCLAB/Footer.vue';
  import GloSumMap from '@/components/CCLAB/GloSumMap.vue';
  import GloSumInter1 from '@/components/CCLAB/GloSumInter1.vue';
  import GloSumInter2 from '@/components/CCLAB/GloSumInter2.vue';
  import GloSumWill1 from '@/components/CCLAB/GloSumWill1.vue';
  import GloSumWill2 from '@/components/CCLAB/GloSumWill2.vue';
  import GloSumAge from '@/components/CCLAB/GloSumAge.vue';
  import GloSumSex from '@/components/CCLAB/GloSumSex.vue';
  import GloSumCovid from '@/components/CCLAB/GloSumCovid.vue';
  import GloSumPreexisting from '@/components/CCLAB/GloSumPreexisting.vue';

  export default defineComponent ({
    components: {
      GloSumOverview,
      Navbar,
      Header,
      Footer,
      GloSumMap,
      GloSumInter1,
      GloSumInter2,
      GloSumWill1,
      GloSumWill2,
      GloSumAge,
      GloSumSex,
      GloSumCovid,
      GloSumPreexisting
    },
    setup() {
      const globalSumStore = useGlobalSumStore()
      return { globalSumStore }
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
        ...mapState(useGlobalSumStore, ['selected_country', 'all_questions', 'scaleMap']),
        ...mapWritableState(useGlobalSumStore, ['selected_question']),
    },
    mounted () {
        this.globalSumStore.loadData();
        this.globalSumStore.initialiseMaps();
    }
  })

</script>

<style lang="scss" scoped>

</style>