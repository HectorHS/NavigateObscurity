<template>
  <figure class="dash-card">
    <h5>Share of deaths by age</h5>
    <DashCommand text="Click on the graph to select an age group and sex"></DashCommand>

    <div class="w-full" style="height:calc(100% - 80px)">
      <highcharts v-if="deathAgePyramidOptions && deathAgePyramidOptions.series!.length > 0" :options="deathAgePyramidOptions" class="w-full h-full"></highcharts>
      <div v-else class="w-full h-full animate-pulse bg-demo-pyramid bg-contain bg-center bg-no-repeat mt-[3px]"></div>
    </div>
    <RadioButtons :items="sexRadioItems" id="radio1" v-model="selectedDeathSex" class="justify-center pb-2" direction="row" :light="true"></RadioButtons>
  </figure>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapState, mapWritableState } from 'pinia';
  import { useDeathStore } from '@/store/deathStore.ts';
  import RadioButtons from '@/components/Controls/RadioButtons.vue';
  import DashCommand from '@/components/Dash/Command.vue';

  // https://github.com/highcharts/highcharts-vue#importing-highcharts-modules
  import Highcharts from 'highcharts';
  import '@/styles/highcharts.scss';

  export default defineComponent ({
    components: {
      RadioButtons,
      DashCommand
    },
    setup() {
    },
    data: () => ({
    }),
    methods: {
    },
    computed: {

      ...mapState(useDeathStore, ['deathAgePyramidOptions']),
      ...mapWritableState(useDeathStore, ['selectedDeathSex', 'sexRadioItems']),
    },
  })

</script>

<style lang="scss" scoped>
:deep(.pyramid-band)  {
  @apply fill-gray-600 opacity-70 hover:fill-blue cursor-pointer;

}
:deep(.pyramid-band-selected) {
  @apply fill-orange opacity-100 hover:fill-blue cursor-pointer;
}

</style>
