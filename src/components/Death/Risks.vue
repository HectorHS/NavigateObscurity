<template>
  <figure class="dash-card h-full">
    <h5>{{risksTitle}}</h5>
    <highcharts :options="deathRiskOptions" class="h-[330px]" style="height: calc(100% - 20px);"></highcharts>
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
    watch: {
    },
    mounted () {
    }
  })

</script>

