<template>
  <Navbar></Navbar>
  <Header></Header>

  <div class="data-container glo-comparison-container">

  <h1>Global cohorts - variable comparison</h1>
  <div class="dashboard-text">
      We surveyed 1031 participants from 39 countries every two weeks for six months. During that time they answered almost 500 unique questions for us. Use the dashboard below to see how their responses correlate.
  </div>
  <figure style="margin-bottom:50px;">
      <div class="dash-texture">
          <div class="dashboard-instructions dash-info">
              <div class="title">How to use:</div>
              <div class="text">
                  <ul>
                      <li>
                          Choose a primary variable (question) corresponding to the survey question you are most interested in.
                      </li>
                      <li>
                          Select a date which correspond to the relevant data collection time point. Only dates when the primary variable was asked will be available.
                      </li>
                  </ul>
                  <ul>
                      <li>
                          Choose a secondary variable (question) so you can see how it correlates with the primary variable. Only variables available for the selected date will be visible.
                      </li>
                      <li>
                          If you manipulate the variables / date in a different order you might get an error. If that happens, just start over again.
                      </li>
                  </ul>
              </div>
          </div>
          <div class="dashboard-container-horizontal CCLab-dashboard">
              <div class="dashboard-container-vertical dashboard-level-1">
                  <div class="dashboard-container-horizontal dashboard-side-60">
                      <div style="height: inherit;">
                          <div class="cclab-stats-container1">
                              <div class="cclab-stats-container2">
                                  <div class="dash-stat-box dash-stat-box-1">
                                      <div class="cclab-stat-label-container">
                                          <div class="cclab-stat-label"># of individuals</div>
                                          <div class="cclab-stat-sublabel">({{ selectedDate }})</div>
                                      </div>
                                      <div class="cclab-stat-value"> {{ stats.sample }}</div>
                                  </div>
                                  <div class="dash-stat-box dash-stat-box-2">
                                      <div class="cclab-stat-label-container">
                                          <div class="cclab-stat-label">Covid positive</div>
                                          <div class="cclab-stat-sublabel">({{ selectedDate }})</div>
                                      </div>
                                      <div class="cclab-stat-value">{{ stats.covid }}</div>
                                  </div>
                              </div>
                              <div class="cclab-stats-container2">
                                  <div class="dash-stat-box dash-stat-box-3">
                                      <div class="cclab-stat-label-container">
                                          <div class="cclab-stat-label">With infected contacts</div>
                                          <div class="cclab-stat-sublabel">({{ selectedDate }})</div>
                                      </div>
                                      <div class="cclab-stat-value">{{ stats.contacts }}</div>
                                  </div>
                                  <div class="dash-stat-box dash-stat-box-4">
                                      <div class="cclab-stat-label-container">
                                          <div class="cclab-stat-label">With pre-existing</div>
                                          <div class="cclab-stat-sublabel">({{ selectedDate }})</div>
                                      </div>
                                      <div class="cclab-stat-value">{{ stats.pre }}</div>
                                  </div>
                              </div>
                          </div>
                          <div v-if="validCombo" class="chart-inset h-[350px] mb-[15px]">
                              <highcharts  :options="heatmapOptions" class="h-full w-full heatmap"></highcharts>
                          </div>
                          <div v-else class="error h-[350px] mb-[15px]">
                              <p>Invalid date - variable combination</p>
                          </div>
                          <div v-if="validCombo" class="chart-inset h-[400px]">
                              <highcharts  :options="barOptions" class="h-full w-full"></highcharts>
                          </div>
                          <div v-else class="error h-[400px]">
                              <p>Invalid date - variable combination</p>
                          </div>
                      </div>
                  </div>
                  <div class="dashboard-side-40">
                      <div class="cclab-dashboard-options dash-info">
                          <datalist id="old-var1-datalist">
                              <option v-for="v in all_variables" :value="v" :label="descriptions_lookup[v]"></option>
                          </datalist>
                          <div class="CCLAB-var-container">
                              <div class="CCLAB-var-title"> Primary variable: </div>
                              <div class="search-container">
                                  <input list="old-var1-datalist" placeholder="Search for a variable"  @input="var1Change" class="w-full">
                              </div>
                          </div>
                          <div>
                              <b>{{ selectedVar1 }}</b>
                              {{ descriptions_lookup[selectedVar1] }}
                          </div>
                          <div class="CCLAB-var-container" style="padding-top:40px;">
                              <div class="CCLAB-var-title">Date:</div>
                              <div class="dropdown-container" style="width:100%">
                                  <select v-model="selectedDate">
                                      <option v-for="date in all_dates">{{date}}</option>
                                  </select>
                              </div>
                          </div>
                          <datalist id="old-var2-datalist">
                              <option v-for="v in availableVar2" :value="v" :label="descriptions_lookup[v]"></option>
                          </datalist>
                          <div class="CCLAB-var-container" style="padding-top:40px;">
                              <div class="CCLAB-var-title"> Secondary variable: </div>
                              <div class="search-container">
                                  <input list="old-var2-datalist" placeholder="Search for a variable" @input="var2Change" class="w-full">
                              </div>
                          </div>
                          <div>
                              <b>{{ selectedVar2 }}</b>
                              {{ descriptions_lookup[selectedVar2] }}
                          </div>
                      </div>
                      <div class="pies-container">
                          <div v-if="validCombo" class="chart-inset h-[250px] w-full">
                              <highcharts  :options="pie1Options" class="h-full w-full cclab-pie"></highcharts>
                          </div>
                           <div v-else class="error h-[250px] w-full">
                              <p>Invalid date - variable combination</p>
                          </div>
                          <div v-if="validCombo" class="chart-inset h-[250px] w-full">
                              <highcharts  :options="pie2Options" class="h-full w-full cclab-pie"></highcharts>
                          </div>
                          <div v-else class="error h-[250px] w-full">
                              <p>Invalid date - variable combination</p>
                          </div>
                      </div>
                      <div v-if="validCombo"  class="chart-inset h-[320px]">
                          <highcharts :options="lineOptions" class="h-full w-full lines"></highcharts>
                      </div>
                      <div v-else class="error h-[320px]">
                          <p>Invalid date - variable combination</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <a class="cclab-button" href="https://www.cooperationintheapocalypse.org/#data">return to data</a>

  </figure>

</div>
<Footer></Footer>


</template>

<script lang="ts">
import { useGlobalComparisonStore } from '@/store/cclab/globalComparisonStore.ts';
import { mapState, mapWritableState } from 'pinia';
import { defineComponent } from 'vue';
import Navbar from '@/components/cclab/Navbar.vue';
import Header from '@/components/cclab/Header.vue';
import Footer from '@/components/cclab/Footer.vue';
import UsSumOverview from '@/components/cclab/UsSumOverview.vue';

import Highcharts from 'highcharts';
import heatmapInit from 'highcharts/modules/heatmap';
import coloraxisInit from 'highcharts/modules/coloraxis';
heatmapInit(Highcharts)
coloraxisInit(Highcharts)


export default defineComponent ({
  components: {
    UsSumOverview,
    Navbar,
    Header,
    Footer,
  },
  setup() {
    const globalComnparisonStore = useGlobalComparisonStore()
    return { globalComnparisonStore }
  },
  data: () => ({
search: ''
  }),
  methods: {
      var1Change(event:any) {
          if (event.inputType == "insertReplacementText") {
              this.selectedVar1 = event.data;
          }
      },
      var2Change(event:any) {
           if (event.inputType == "insertReplacementText") {
              this.selectedVar2 = event.data;
          }
      }
  },
  computed: {
      ...mapState(useGlobalComparisonStore , ['descriptions_lookup', 'stats','validCombo','pie1Options','pie2Options','heatmapOptions',
          'all_variables','all_dates','availableVar2','barOptions','lineOptions']),
      ...mapWritableState(useGlobalComparisonStore, ['selectedVar1','selectedVar2','selectedDate']),
  },
  mounted () {
      this.globalComnparisonStore.loadData();
      this.globalComnparisonStore.initialiseMaps();
  }
})

</script>

<style lang="scss" scoped>

</style>