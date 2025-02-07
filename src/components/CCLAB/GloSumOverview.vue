<template>
  <div class="dash-stats-container1">
    <div class="dash-stats-container2">
        <div class="dash-stat-box dash-stat-box-1 w-3/6">
            <div class="dash-stat-label-container">
                <div class="dash-stat-label"># of individuals</div>
                <div class="cclab-stat-sublabel">({{ selected_country }})</div>
            </div>
            <div class="dash-stat-value">{{ statsData.sample }}</div>
        </div>
        <div class="dash-stat-box dash-stat-box-2 w-3/6">
            <div class="dash-stat-label-container">
                <div class="dash-stat-label">Average age</div>
                <div class="cclab-stat-sublabel">({{ selected_country }})</div>
            </div>
            <div class="dash-stat-value">{{ statsData.age }}</div>
        </div>
    </div>
    <div class="dash-stats-container2">
        <div class="dash-stat-box dash-stat-box-3 w-3/6">
            <div class="dash-stat-label-container">
                <div class="dash-stat-label">Female </div>
                <div class="cclab-stat-sublabel">({{ selected_country }})</div>
            </div>
            <highcharts :options="sexPieOptions" class="h-[100px]"></highcharts>
        </div>
        <div class="dash-stat-box dash-stat-box-4  w-3/6">
            <div class="dash-stat-label-container">
                <div class="dash-stat-label">With preexisting conditions</div>
                <div class="cclab-stat-sublabel">({{ selected_country }})</div>
            </div>
            <div class="dash-stat-value">{{ statsData.preexisting }}</div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { useGlobalSumStore } from '@/store/CCLAB/globalSumStore';
  import { mapState, mapWritableState } from 'pinia';
  import { defineComponent } from 'vue';

  export default defineComponent ({
    components: {
    },
    setup() {

    },
    data: () => ({

    }),
    methods: {

    },
    computed: {
        ...mapState(useGlobalSumStore, ['statsData', 'sexPieOptions', 'selected_country']),
    },
  })

</script>

<style lang="scss" scoped>

</style>