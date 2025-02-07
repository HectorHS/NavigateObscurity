<template>
  <highcharts :constructorType="'mapChart'" :options="mapOptions" class="w-full h-full cclab-us-sum-map" ></highcharts>
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
      ...mapState(useUsSumStore, ['mapOptions']),
    },
  })

</script>

<style lang="scss" scoped>

</style>