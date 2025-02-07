<template>
  <figure>
    <highcharts :options="willSplineOptions" class="h-full"></highcharts>
  </figure>
</template>

<script lang="ts">
  import { useGlobalSumStore } from '@/store/CCLAB/globalSumStore';
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
       ...mapState(useGlobalSumStore, ['willSplineOptions']),
    },
  })

</script>

<style lang="scss" scoped>

</style>