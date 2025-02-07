<template>
    <Header title="Head strong by Dave Asprey"></Header>
    <section class="px-base">
      <div class="pt-20 w-mainText">
          <p>
            Everything we do, from breathing, to exercising and daydreaming requires energy. All energy is produced in
            the cellular level, and is produced on demand – it cannot be stored. Therefore, everything you do always
            antagonises this limited resource of energy. Higher level functions such as creativity and rational thinking
            are not essential for surviving – at least not like breathing, moving and digestion are – and as a result
            they score lower in the energy priority list. At the same time, such higher level functions require a lot of
            energy. So how do you achieve and maintain peak mental performance and clarity of thought? By boosting your
            energy production and minimising the energy expenditure of other functions.
          </p>

      </div>
      <Instructions></Instructions>
    </section>
    <Nodes type="notes" filePrefix="hs-" gexf='head-strong.gexf' :colors="colorMap" :categories="categoriesMap"></Nodes>

    <Comments :pageId="pageId"></Comments>

</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import Header from '@/components/Header.vue';
  import Instructions from '@/components/Nodes/Instructions.vue';
  import Comments from '@/components/Comments.vue';
  import Nodes from '@/components/Nodes/Nodes.vue';

  export default defineComponent ({
    components: {
      Header,
      Instructions, 
      Comments,
      Nodes
    },
    setup() {
    },
    data: () => ({
      pageId: 3,
      colorMap: new Map<number,string>([
        [0, "blue-200"],
        [1, "blue-400"],
        [2, "emerald-500"],
        [3, "violet-100"],
        [4, "yellow-400"],
        [5, "violet-400"],
        [6, "red-300"],
        [7, "orange-300"],
        [8, "green-400"],
        [9, "purple-400"]]),
      categoriesMap: new Map<number,string>([
        [7, "Cellular" ],
        [4, "Physiological"],
        [9, "Hormonal" ],
        [5, "Neurological" ],
        [3, "Mental" ],
        [2, "Habits" ],
        [1, "Foods" ],
        [0, "Food components"],
        [6, "Toxins" ],
        [8, "Environment"]
      ]),
    }),
    computed: {
    },
    methods: {
    },
    watch: {
    },
    mounted () {
    }
  })
</script>
