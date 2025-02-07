<template>
    <Header title="Gardens of the moon by Steven Erikson"></Header>
    <section class="px-base">
      <div class="pt-20 w-mainText">
          <p>
            In the fantasy world of Wu, the Malazan Empire is ever expanding. After arriving in the continent of Genabackis, the Empire 
            has quickly conquered most of the free cities on the North. Two remain: Pale and Darujhistan. While Pale has been under siege 
            for three years, the Empire is already setting its gaze to Darujhistan. As tensions are rising within the Malazan ranks, the 
            Empire will attempt a series of desperate gambits to bring the last free cities under the fold. Gods will step into the fray, 
            ancient beings will be summoned and things will get complicated. 
          </p>

      </div>
    </section>
    <Stats book="gotm" class="my-16"></Stats>
    <section class="px-base">
      <h2>What happened?</h2>
      <div class="mb-6">According to my notes.</div>
      <Instructions :percent="true"></Instructions>
      <Nodes type="malazan" filePrefix="gotm-" gexf='gotm.gexf' :colors="colorMap" :categories="categoriesMap" :sizeMultiplier="0.3"></Nodes>
    </section>

    <section class="px-base mt-20">
      <h2>Who took the spotlight?</h2>
      <div class="mb-6">Mentions by name or alias.</div>
      <Bubbles filePrefix="gotm-" :colors="colorMap" class="h-[40vh] lg:h-[70vh]"></Bubbles>
    </section>

    <section class="px-base mt-20">
      <h2>Most used phrases</h2>
      <div class="mb-6">Word combinations after excluding character names.</div>
      <Wordcloud filePrefix="gotm-" class="h-[40vh] lg:h-[70vh]"></Wordcloud>
    </section>

    <Comments :pageId="pageId"></Comments>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import Header from '@/components/Header.vue';
  import Instructions from '@/components/Nodes/Instructions.vue';
  import Comments from '@/components/Comments.vue';
  import Nodes from '@/components/Nodes/Nodes.vue';
  import Stats from '@/components/Malazan/Stats.vue';
  import Bubbles from '@/components/Malazan/Bubbles.vue';
  import Wordcloud from '@/components/Malazan/Wordcloud.vue';

  export default defineComponent ({
    components: {
      Header,
      Instructions, 
      Comments,
      Nodes,
      Stats,
      Bubbles,
      Wordcloud
    },
    setup() {
    },
    data: () => ({
      pageId: 7,
      colorMap: new Map<number,string>([
        [0, "red-400"],
        [1, "orange-300"],
        [2, "emerald-500"],
        [3, "gray-900"],
        [4, "blue-400"],
        [5, "cyan-300"],
        [6, "yellow-300"]
      ]),
      categoriesMap: new Map<number,string>([
        [4, "Darujhistan cabal, Eel & allies"],
        [5, "Darujhistan, others" ],
        [3, "Tiste Andii & allies" ],
        [2, "Ascendants" ],
        [1, "Bridgeburners" ],
        [0, "Malazans"],
        [6, "Others" ],
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
