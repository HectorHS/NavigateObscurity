<template>
  <figure>
    <highcharts :options="nbtSplineOptions" class="h-full"></highcharts>
  </figure>
</template>

<script lang="ts">
  import { useUsSumStore } from '@/store/CCLAB/usSumStore';
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
       ...mapState(useUsSumStore, ['nbtSplineOptions']),
    },
  })

</script>

<style lang="scss" scoped>

</style>