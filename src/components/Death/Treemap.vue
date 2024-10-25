<template>
  <figure class="dash-card h-full">
    <div class="flex">
    <h5>Total deaths broken down by cause</h5>
    <h5 v-show="selectedDeathCause != 'All causes'" class="ml-2">({{ selectedDeathCause }})</h5>
    </div>
    <DashCommand text="Click on the graph to select a cause of death"></DashCommand>
    <highcharts :options="deathTreemapOptions" class="w-full" style="height: calc(100% - 45px)"></highcharts>
  </figure>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapState, mapWritableState } from 'pinia';
  import { useDeathStore } from '@/store/deathStore.ts';

  import DashCommand from '@/components/Dash/Command.vue';

  // https://github.com/highcharts/highcharts-vue#importing-highcharts-modules
  import Highcharts from 'highcharts';
  import Treemap from 'highcharts/modules/treemap';
  Treemap(Highcharts);
  import '@/styles/highcharts.scss';

  export default defineComponent ({
    components: {
      DashCommand
    },
    setup() {
    },
    data: () => ({
    }),
    methods: {
    },
    computed: {
      ...mapState(useDeathStore, ['deathTreemapOptions']),
      ...mapWritableState(useDeathStore, ['selectedDeathCause']),
    },
    watch: {
    },
    mounted () {
    }
  })

</script>

