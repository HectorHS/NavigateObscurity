<template>
  <div class="dash-stats-container1">
    <div class="dash-stats-container2">
        <div class="dash-stat-box dash-stat-box-1 w-3/6">
            <div class="dash-stat-label-container">
                <div class="dash-stat-label"># of individuals</div>
                <div class="cclab-stat-sublabel">({{ selected_state }})</div>
            </div>
            <div class="dash-stat-value">{{ statsData.sample }}</div>
        </div>
        <div class="dash-stat-box dash-stat-box-2 w-3/6">
            <div class="dash-stat-label-container">
                <div class="dash-stat-label">Average age</div>
                <div class="cclab-stat-sublabel">({{ selected_state }})</div>
            </div>
            <div class="dash-stat-value">{{ statsData.age }}</div>
        </div>
    </div>
    <div class="dash-stats-container2">
        <div class="dash-stat-box dash-stat-box-3 w-3/6">
            <div class="dash-stat-label-container">
                <div class="dash-stat-label">Female </div>
                <div class="cclab-stat-sublabel">({{ selected_state }})</div>
            </div>
            <highcharts :options="sexPieOptions" class="h-[100px]"></highcharts>
        </div>
        <div class="dash-stat-box dash-stat-box-4  w-3/6">
            <div class="dash-stat-label-container">
                <div class="dash-stat-label">COVID-19 infected</div>
                <div class="cclab-stat-sublabel">({{ selected_state }})</div>
            </div>
            <div class="dash-stat-value">{{ statsData.covid }}</div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { useUsSumStore } from '@/store/cclab/usSumStore.ts';
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
        ...mapState(useUsSumStore, ['statsData', 'sexPieOptions', 'selected_state']),
    },
  })

</script>

<style lang="scss" scoped>

</style>