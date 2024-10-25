<template>
  <figure class="dash-card">
    <h5>Share of deaths by age</h5>
    <DashCommand text="Click on the graph to select an age group and sex"></DashCommand>

    <highcharts :options="deathAgePyramidOptions" class="w-full" style="height: calc(100% - 70px);"></highcharts>
    <RadioButtons :items="sexRadioItems" id="radio1" v-model="selectedDeathSex" class="justify-center pb-2" direction="row"></RadioButtons>
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
    watch: {
    },
    mounted () {
    }
  })

</script>

<style lang="scss" scoped>
:deep(.pyramid-band)  {
  @apply fill-gray opacity-70 hover:fill-blue cursor-pointer;

}
:deep(.pyramid-band-selected) {
  @apply fill-orange opacity-100 hover:fill-blue cursor-pointer;
}

</style>
