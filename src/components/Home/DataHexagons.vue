<template>
    <section class="flex gap-12 flex-col lg:flex-row items-center">
        <div class="flex-1 w-full">
            <ul class="grid gap-1 sm:gap-4 m-0 mx-auto sm:w-11/12 pb-[12%] sm:pb-[8.4%] overflow-hidden grid-cols-6">
                <li v-for="item in dataPages" :key="item.title" class="hexagon">
                    <div class="hexagon-item">
                        <a class="absolute visible group" :href="'data'+ item.path">
                            <IconBase :icon="item.icon" class="-inset-x-full w-auto mx-auto my-0 absolute visible fill-gray h-3/6 opacity-30 lg:opacity-100  group-hover:opacity-30"></IconBase>
                            <h3 class="w-full lg:hidden group-hover:block absolute visible text-gray">{{item.title}}</h3>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="flex-1 items-center lg:order-first">
            <!-- This extra div is actually useful -->
            <div>
                <p>
                    Too often, I realise how little I know about this world. I am not talking about details,
                    I am talking about the big picture. The kind of things you would expect to cover on an Earth
                    101 course in an alien university. So, I look for reasonably well sourced data and visualise
                    them hoping to aid my perspective on life on Earth.
                </p>
                <button type="button" class="button mt-8">Browse all data</button>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
  import { useAppStore } from '@/store/appStore.ts';
  import { mapState, mapWritableState } from 'pinia';
  import { defineComponent } from 'vue';
  import IconBase from '@/components/IconBase.vue';
export default defineComponent ({
    setup() {
    },
    components: {
      IconBase
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
.hexagon {
  @apply relative invisible;
  grid-column-end: span 2;
  .hexagon-item {
        @apply absolute w-full overflow-hidden invisible;
        padding-bottom: 115.47%; /* =  width / sin(60) */
        transform: rotate(-60deg) skewY(30deg);

        a {
            @apply z-10 justify-center flex items-center w-full h-full text-center overflow-hidden transition-all duration-300 bg-gradient-to-br from-amber-600 bg-size-200 bg-pos-100-l hover:bg-pos-0-l;
            transform: skewY(-30deg) rotate(60deg); // tailwind defaults to a single transform with the rotate first which does not work for us
        }
    }

  &:after {
    content: "";
    display: block;
    padding-bottom: 86.602%; /* =  100 / tan(60) * 1.5 */
  }
  &:nth-child(5n + 1) {
    /* first hexagon of odd rows */
    grid-column-start: 2;

    a {
      @apply  to-blue-300 via-blue-100;
    }
  }
  &:nth-child(5n + 2) a {
    @apply  to-blue via-blue-200;
  }
  &:nth-child(5n + 3) a {
    @apply  to-blue via-amber-500;
  }
  &:nth-child(5n + 4) a {
    @apply  to-blue-600 via-blue-300;
  }
  &:nth-child(5n + 5) a {
    @apply  to-blue-700 via-blue;
  }
}
</style>