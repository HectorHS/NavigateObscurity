<template>
  <highcharts :constructorType="'mapChart'" :options="mapOptions" class="w-full h-full cclab-old-sum-map" ></highcharts>
</template>

<script lang="ts">
  import { useGlobalSumStore } from '@/store/CCLAB/globalSumStore';
  import { mapState, mapWritableState } from 'pinia';
  import { defineComponent } from 'vue';

  export default defineComponent ({
    components: {
    },
    data: () => ({
    }),
    methods: {
    },
    computed: {
      ...mapState(useGlobalSumStore, ['mapOptions']),
    },
  })

</script>

<style lang="scss" scoped>

</style>