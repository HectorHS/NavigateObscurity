<template>
    <Header title="Get some perspective"></Header>
    <section class="pa-base pt-20">
        <div v-for="page in dataPages" class="flex py-7 mb-12 ">
            <div class="w-1/3 px-3 lg:w-1/5">
                <Hexagon :title="page.title" :icon="page.icon" :background="page.bg" :type="page.type"></Hexagon>
            </div>
            <div class="w-2/3 lg:w-4/5" style=" max-width: 700px;">
                <p class="pb-8">{{page.abstract}}</p>
                <a class="button mt-8" :href="page.path">Explore {{page.title}}</a>
            </div>
        </div>
</section>
</template>

<script lang="ts">
  import Header from '@/components/Header.vue';
  import { useAppStore } from '@/store/appStore.ts';
  import { mapState, mapWritableState } from 'pinia';
  import Hexagon from '@/components/Hexagon.vue';
  import { defineComponent } from 'vue';

  export default defineComponent ({
    components: {
      Header,
      Hexagon     
    },
    setup() {

    },
    data: () => ({

    }),
    methods: {
      
    },
    computed: {
        ...mapState(useAppStore, ['dataPages']),
    },
    watch: {
    },
    mounted () {
    }
  })

</script>

<style lang="scss" scoped>


</style>