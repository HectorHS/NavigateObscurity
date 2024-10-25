<template>
  <figure class="bg-gray h-full">
      <h5>{{ mapTitle }}</h5>
      <DashCommand text="Click on the map to select a country"></DashCommand>
      <highcharts :constructorType="'mapChart'" :options="deathMapOptions" class="w-full death-map" style="height:calc(100% - 45px)"></highcharts>
  </figure>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapState, mapWritableState } from 'pinia';
  import { useDeathStore } from '@/store/deathStore.ts';

  import DashCommand from '@/components/Dash/Command.vue';

  // https://github.com/highcharts/highcharts-vue#importing-highcharts-modules
  import Highcharts from 'highcharts';
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
      mapTitle():string {
        let title = 'National leading causes of death';
        if (this.selectedDeathCause != "All causes") {
          title = 'Share of deaths for ' + this.selectedDeathCause.toLowerCase();
        }
        return title;
      },
      ...mapState(useDeathStore, ['deathMapOptions']),
      ...mapWritableState(useDeathStore, ['selectedDeathCause']),
    },
    watch: {
    },
    mounted () {
    }
  })

</script>

