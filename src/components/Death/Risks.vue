<template>
  <figure class="dash-card h-full">
    <h5>{{risksTitle}}</h5>
    <div class="w-full" style="height:calc(100% - 20px)">
      <highcharts v-if="deathRiskOptions && deathRiskOptions.series!.length > 0 && (deathRiskOptions.series![0] as Highcharts.SeriesBarOptions).data!.length > 0" :options="deathRiskOptions" class="w-full h-full"></highcharts>
      <div v-else class="w-full h-full animate-pulse bg-demo-bars bg-contain bg-center bg-no-repeat mt-[3px]"></div>
    </div>
  </figure>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapState } from 'pinia';
  import { useDeathStore } from '@/store/deathStore.ts';

  import IconBase from '@/components/IconBase.vue';

  // https://github.com/highcharts/highcharts-vue#importing-highcharts-modules
  import Highcharts from 'highcharts';
  import '@/styles/highcharts.scss';

  export default defineComponent ({
    components: {
      IconBase,
    },
    setup() {
    },
    data: () => ({
    }),
    methods: {
    },
    computed: {
      risksTitle():string {
        let title = 'Risks associated with all causes of death';
        if (this.selectedDeathCause != "All causes") {
          title = 'Risks associated with ' + this.selectedDeathCause.toLowerCase();
        }
        return title;
      },
      ...mapState(useDeathStore, ['deathRiskOptions', 'selectedDeathCause']),
    },
  })

</script>

