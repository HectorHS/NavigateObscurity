<template>
    <Navbar></Navbar>
    <Header></Header>

    <div class="data-container us-lookup-container">

    <h1>US cohort - variable lookup</h1>
    <div class="dashboard-text">915 participants were asked 1033 questions across 18 timepoints. Find out what we asked, when we asked it, and how participants responded.</div>
    <figure style="margin-bottom:50px;">
        <div class="dash-texture">
            <datalist id="look_us_datalist">
                <option v-for="v in all_variables" :value="v" :label="descriptions_lookup[v]"></option>
            </datalist>
            <div class="search-parent">
                <div class="search-container">
                    <input list="look_us_datalist" placeholder="Search for a variable"  @input="searchChange" class="w-full">
                </div>
            </div>
            <div class="dash-info">
                <div class="lookup-dash-info">
                    <div style="display: inline-flex; padding-bottom: 10px;">
                        <div class="lookup-info-title"> Keyword: </div>
                        <div class="look-text" style="font-size:110%;">{{ selected_variable }}</div>
                    </div>
                    <div style="display: inline-flex;">
                        <div class="lookup-info-title"> Description: </div>
                        <div class="look-text" style="font-size:110%;">{{ descriptions_lookup[selected_variable] }}</div>
                    </div>

                </div>

            </div>
            <div style="font-size: 110%; padding:5px 0 0 10px;">Available at the following
                time points:</div>



            <div class="look-checks-container" style="margin: 0 10px;">
                <div class="look-checks-line">
                    <div v-for="i in 9" class="look-check-container">
                        <div class="look-check-title">{{ checkItems[i-1].date }}</div>
                        <div class="look-check-title-small">{{ checkItems[i-1].timepoint }}</div>
                        <div v-if="checkItems[i-1].checked" class="look-check check-yes"></div>
                        <div v-else class="look-check check-no"></div>
                    </div>
                </div>
            <div class="look-checks-line">
                <div v-for="i in 9" class="look-check-container">
                    <div class="look-check-title">{{ checkItems[i+8].date }}</div>
                    <div class="look-check-title-small">{{ checkItems[i+8].timepoint }}</div>
                    <div v-if="checkItems[i+8].checked" class="look-check check-yes"></div>
                    <div v-else class="look-check check-no"></div>
                </div>
            </div>
            </div>
            <div class="chart-inset" style="margin:10px;">
                <highcharts v-if="selected_variableType == 'number'" :options="intOptions" class="h-full w-full lookup-line-chart"></highcharts>
                <highcharts v-else :options="stringOptions" class="h-full w-full"></highcharts>
            </div>
        </div>

        <a class="cclab-button" href="https://www.cooperationintheapocalypse.org/#data">return to data</a>
    </figure>

</div>
<Footer></Footer>


</template>

<script lang="ts">
  import { useUsLookupStore } from '@/store/CCLAB/usLookupStore';
  import { mapState, mapWritableState } from 'pinia';
  import { defineComponent } from 'vue';
  import Navbar from '@/components/CCLAB/Navbar.vue';
  import Header from '@/components/CCLAB/Header.vue';
  import Footer from '@/components/CCLAB/Footer.vue';
  import UsSumOverview from '@/components/CCLAB/UsSumOverview.vue';

  import Highcharts from 'highcharts';
  import wordcloudInit from 'highcharts/modules/wordcloud'
  wordcloudInit(Highcharts)


  export default defineComponent ({
    components: {
      UsSumOverview,
      Navbar,
      Header,
      Footer,

    },
    setup() {
      const usLookupStore = useUsLookupStore()
      return { usLookupStore }
    },
    data: () => ({
search: ''
    }),
    methods: {
        searchChange(event:any) {
            if (event.inputType == "insertReplacementText") {
                this.selected_variable = event.data;
            }
        }
    },
    computed: {
        ...mapState(useUsLookupStore , ['checkItems','all_variables','descriptions_lookup','intOptions', 'stringOptions','selected_variableType']),
        ...mapWritableState(useUsLookupStore, ['selected_variable']),
    },
    mounted () {
        this.usLookupStore.loadData();
    }
  })

</script>

<style lang="scss" scoped>

</style>