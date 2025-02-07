<template>
  <figure>
    <highcharts :options="inter1SplineOptions" class="h-full w-full"></highcharts>
  </figure>
</template>

<script lang="ts">
  import { useGlobalSumStore } from '@/store/cclab/globalSumStore.ts';
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
       ...mapState(useGlobalSumStore, ['inter1SplineOptions']),
    },
  })

</script>

<style lang="scss" scoped>

</style>