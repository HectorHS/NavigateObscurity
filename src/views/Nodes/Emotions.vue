<template>
    <Header title="Emotions - by the Huberman Lab"></Header>
    <section class="px-base">
      <div class="pt-20 w-mainText">
          <p>
            In a series of 4 podcasts dedicated to emotions, Andrew Huberman, takes a deep dive into stress, nutrition, motivation, 
            and relationships, discussing how each of these impacts our mood and emotions. Through this discussion Huberman provides 
            valuable concepts we can use to better understand and communicate our own emotions and explains the various tools we can 
            use to influence and change them, ranging from the things we consume to the various behaviours we can implement for 
            results both in the short and the long term.  
          </p>
      </div>
      <Instructions></Instructions>
    </section>
    <Nodes type="notes" filePrefix="hl-emotions-" gexf='hl-emotions.gexf' :colors="colorMap" :categories="categoriesMap" :links="true" :linksMap="linksMap"></Nodes>

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
      pageId: 10,
      colorMap: new Map<number,string>([
        [0, "emerald-500"],
        [1, "yellow-300"],
        [2, "red-400"],
        [3, "purple-400"],
        [4, "blue-400"],
        [5, "cyan-200"],
        [6, "violet-400"]
      ]),
      categoriesMap: new Map<number,string>([
        [6, "Concepts" ],  
        [2, "Behaviours" ],
        [5, "Psychological components" ],
        [4, "Physiological components"],
        [0, "Molecules"],
        [1, "Consumables" ],
        [3, "Conditions" ],
      ]),
      linksMap: new Map<string,string>([
        ["podcast_10", "https://www.youtube.com/watch?v=ntfcfJ28eiU"],
        ["podcast_11", "https://www.youtube.com/watch?v=XfURDjegrAw"],
        ["podcast_12", "https://www.youtube.com/watch?v=vA50EK70whE" ],
        ["podcast_13", "https://www.youtube.com/watch?v=hcuMLQVAgEg" ],
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
