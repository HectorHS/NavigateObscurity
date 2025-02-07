<template>
    <section class="flex relative gap-12 flex-col lg:flex-row items-center">
      <h2 class="lg:hidden text-left -mb-8">Malazan</h2>
        <div class="flex-1 w-full">
            <ul class="grid gap-1 sm:gap-4 m-0 mx-auto sm:w-11/12 pb-[12%] sm:pb-[8.4%] overflow-hidden grid-cols-6">
                <li v-for="item in malazanPages" :key="item.title" class="hexagon">
                    <div class="hexagon-item">
                        <a class="absolute visible group" :href="item.path">
                            <img class="m-0 mx-auto w-full absolute visible opacity-15 lg:opacity-100 group-hover:opacity-15" :src='item.image' :alt="item.title">
                            <h3 class="w-full lg:hidden group-hover:block absolute visible text-gray">{{item.title}}</h3>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="items-center flex-1 lg:order-first">
            <!-- This extra div is actually useful -->
            <div>
              <h1 class="hidden lg:block text-left mb-8">Malazan</h1>
                <p>
                  Are you on book 7 and can't remember what exactly happened on book 1? 
                  Are you on your first  read throught and want to make sure you are not missing any major plot points? 
                  I got you.
                </p>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
  import { useAppStore } from '@/store/appStore.ts';
  import { mapState, mapWritableState } from 'pinia';
  import { defineComponent } from 'vue';

export default defineComponent ({
    setup() {
    },
    data: () => ({

    }),
    methods: {
    },
    computed: {
      ...mapState(useAppStore, ['malazanPages']),
    },
  })
</script>

<style lang="scss" scoped>
.hexagon {
  @apply relative invisible;
  grid-column-end: span 2;

  &:nth-child(5n + 1) {
    /* first hexagon of odd rows */
    grid-column-start: 2;
  }
  &:after {
    content: "";
    display: block;
    padding-bottom: 86.602%; /* =  100 / tan(60) * 1.5 */
  }

    .hexagon-item {
        @apply absolute w-full overflow-hidden invisible;
        padding-bottom: 115.47%; /* =  width / sin(60) */
        transform: rotate(-60deg) skewY(30deg);

        a {
            @apply transition-all duration-300 bg-gradient-to-br to-blue lg:to-gray-100 via-gray-200 from-amber-800 bg-size-200 bg-pos-100-l hover:bg-pos-0-l z-10 justify-center flex items-center w-full h-full text-center overflow-hidden;
            transform: skewY(-30deg) rotate(60deg); // tailwind defaults to a single transform with the rotate first which does not work for us
        }
    }
}
</style>