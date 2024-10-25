<template>
  <div class="dash-card mb-4">
  <h5 class="font-bold pb-1">Showing data for</h5>
    <div>
      <span>Location: </span>
      <span class="font-bold" :class="{'text-blue':selectedDeathLocation!='Global'}">{{ getCountryName(selectedDeathLocation) }}</span>
      <IconBase icon="refresh" height="18" class="pl-2 fill-gray-500 inline" @click="resetLocation" :class="{'!fill-blue':selectedDeathLocation!='Global', 'cursor-pointer':selectedDeathLocation!='Global', 'hover:!fill-orange':selectedDeathLocation!='Global'}"></IconBase>
    </div>
    <div>
      <span>Cause: </span>
      <span class="font-bold" :class="{'text-blue':selectedDeathCause!='All causes'}">{{ selectedDeathCause }}</span>
      <IconBase icon="refresh" height="18" class="pl-2 fill-gray-500 inline" @click="selectedDeathCause = 'All causes'" :class="{'!fill-blue':selectedDeathCause!='All causes', 'cursor-pointer':selectedDeathCause!='All causes', 'hover:!fill-orange':selectedDeathCause!='All causes'}"></IconBase>
    </div>
    <div>
      <span>Age: </span>
      <span class="font-bold" :class="{'text-blue':selectedDeathAge!='All ages'}">{{ selectedDeathAge }}</span>
      <IconBase icon="refresh" height="18" class="pl-2 fill-gray-500 inline" @click="selectedDeathAge = 'All ages'" :class="{'!fill-blue':selectedDeathAge!='All ages', 'cursor-pointer':selectedDeathAge!='All ages', 'hover:!fill-orange':selectedDeathAge!='All ages'}"></IconBase>
    </div>
    <div>
      <span>Sex: </span>
      <span class="font-bold" :class="{'text-blue':selectedDeathSex!='Both'}"> {{ selectedDeathSex }}</span>
      <IconBase icon="refresh" height="18" class="pl-2 fill-gray-500 inline" @click="resetSex" :class="{'!fill-blue':selectedDeathSex!='Both', 'cursor-pointer':selectedDeathSex!='Both','hover:!fill-orange':selectedDeathSex!='Both'}"></IconBase>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapState, mapWritableState } from 'pinia';
  import { useDeathStore } from '@/store/deathStore.ts';
  import { getCountryName } from '@/helpers/commonFunctions.ts';

  import IconBase from '@/components/IconBase.vue';

  export default defineComponent ({
    components: {
      IconBase,
    },
    setup() {
      const deathStore = useDeathStore()
      return { deathStore }
    },
    data: () => ({

    }),
    methods: {
      resetLocation():void {
        this.selectedDeathLocation = 'Global';
        this.deathStore.deselectDeathCountry();
      },
      resetSex():void {
        this.selectedDeathSex = 'Both';
        this.sexRadioItems[0].checked = false;
        this.sexRadioItems[1].checked = false;
        this.sexRadioItems[2].checked = true;
      },
      getCountryName
    },
    computed: {
      ...mapState(useDeathStore, ['deathMapOptions']),
      ...mapWritableState(useDeathStore, ['selectedDeathLocation', 'selectedDeathCause', 'selectedDeathAge', 'selectedDeathSex', 'sexRadioItems']),
    },
    watch: {
    },
    mounted () {
    }
  })

</script>