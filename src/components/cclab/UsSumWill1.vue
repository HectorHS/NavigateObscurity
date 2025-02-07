<template>
  <figure>
    <highcharts :options="willSplineOptions" class="h-full"></highcharts>
  </figure>
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
       ...mapState(useUsSumStore, ['willSplineOptions']),
    },
  })

</script>

<style lang="scss" scoped>

</style>