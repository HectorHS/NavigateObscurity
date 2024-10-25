<template >
  <v-container style="max-width: 2200px;">
    <OverviewStats></OverviewStats>
    <MachinesPreview></MachinesPreview>
  </v-container>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useMachinesStore } from '@/store/machinesStore';
  import { mapState, mapWritableState } from 'pinia';
  import OverviewStats from '@/components/Machines/OverviewStats.vue';
  import MachinesPreview from '@/components/Machines/MachinesPreview.vue';

export default defineComponent({
  components: {
    OverviewStats,
    MachinesPreview
    },
  setup() {
      const machinesStore = useMachinesStore()
      return { machinesStore }
    },
  data: () => ({
   
  }),
  computed: {
   
  },
  methods: {
  
  },
  created() {},
  mounted () {
    this.machinesStore.getMachinesOverviewData();
  },
});
</script>

<style scoped>
</style>

