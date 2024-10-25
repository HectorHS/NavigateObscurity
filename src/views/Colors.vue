<template>
    <Header title="Colors"></Header>
    <div class="flex mx-5 mt-20">
      <h4 class="my-auto text-right" style="width:150px;">Chart colors</h4>
      <div v-for="color of colorNames" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5 mt-10">
      <h4 class="my-auto text-right" style="width:150px;">Blue</h4>
      <div v-for="color of blue" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Purple</h4>
      <div v-for="color of purple" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Violet</h4>
      <div v-for="color of violet" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Red</h4>
      <div v-for="color of red" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Orange</h4>
      <div v-for="color of orange" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Yellow</h4>
      <div v-for="color of yellow" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Green</h4>
      <div v-for="color of green" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Emerald</h4>
      <div v-for="color of emerald" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Cyan</h4>
      <div v-for="color of cyan" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Blue</h4>
      <div v-for="color of blue" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Gray</h4>
      <div v-for="color of gray" :class="color" class="w-16 h-16 m-2"></div>
    </div>
</template>

<script lang="ts">
  import Header from '@/components/Header.vue';
  import { defineComponent } from 'vue';

  export default defineComponent ({
    components: {
      Header
    },
    setup() {

    },
    data: () => ({
      // by having all these here we are also forcing tailwind to include all these styles. be careful if you delete these.
      colorNames: ['bg-blue', 'bg-purple-300', 'bg-violet-400', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400','bg-emerald-400','bg-cyan-400', 'bg-blue-400'],
      blue: ['bg-blue-100','bg-blue-200','bg-blue-300','bg-blue-400','bg-blue-500','bg-blue-600','bg-blue-700', 'bg-blue-800','bg-blue-900'],
      violet: ['bg-violet-100','bg-violet-200','bg-violet-300','bg-violet-400','bg-violet-500','bg-violet-600','bg-violet-700', 'bg-violet-800','bg-violet-900'],
      red: ['bg-red-100','bg-red-200','bg-red-300','bg-red-400','bg-red-500','bg-red-600','bg-red-700', 'bg-red-800','bg-red-900'],
      orange: ['bg-orange-100','bg-orange-200','bg-orange-300','bg-orange-400','bg-orange-500','bg-orange-600','bg-orange-700', 'bg-orange-800','bg-orange-900'],
      emerald: ['bg-emerald-100','bg-emerald-200','bg-emerald-300','bg-emerald-400','bg-emerald-500','bg-emerald-600','bg-emerald-700', 'bg-emerald-800','bg-emerald-900'],
      yellow: ['bg-yellow-100','bg-yellow-200','bg-yellow-300','bg-yellow-400','bg-yellow-500','bg-yellow-600','bg-yellow-700', 'bg-yellow-800','bg-yellow-900'],
      purple: ['bg-purple-100','bg-purple-200','bg-purple-300','bg-purple-400','bg-purple-500','bg-purple-600','bg-purple-700', 'bg-purple-800','bg-purple-900'],
      green: ['bg-green-100','bg-green-200','bg-green-300','bg-green-400','bg-green-500','bg-green-600','bg-green-700', 'bg-green-800','bg-green-900'],
      cyan: ['bg-cyan-100','bg-cyan-200','bg-cyan-300','bg-cyan-400','bg-cyan-500','bg-cyan-600','bg-cyan-700', 'bg-cyan-800','bg-cyan-900'],
      gray: ['bg-gray-100','bg-gray-200','bg-gray-300','bg-gray-400','bg-gray-500','bg-gray-600','bg-gray-700', 'bg-gray-800','bg-gray-900'],
    }),
    methods: {
      
    },
    computed: {
    },
    watch: {
    },
    mounted () {
    }
  })

</script>

<style lang="scss" scoped>


</style>