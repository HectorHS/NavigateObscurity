<template>
    <Header title="Elastic thinking by Leonard Mlodinow"></Header>
    <section class="px-base">
      <div class="pt-20 w-mainText">
          <p>
            Are you interested in becoming more creative or imaginative? Better at dealing with ambiguity, contradictions, 
            and more able to adapt to change? Ready to challenge some of your well-rooted assumptions while you are at it? 
            Turns out there is a coherent way of thinking that can help you with all that. It’s called elastic thinking. 
          </p>

      </div>
      <Instructions></Instructions>
    </section>
    <Nodes type="notes" filePrefix="elastic-" gexf='elastic.gexf' :colors="colorMap" :categories="categoriesMap"></Nodes>

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
      pageId: 8,
      colorMap: new Map<number,string>([
        [0, "purple-400"],
        [1, "cyan-300"],
        [2, "red-300"],
        [3, "violet-400"],
        [4, "yellow-400"],
        [5, "blue-400"],
        [6, "emerald-500"],
        [7, "orange-300"]
      ]),
      categoriesMap: new Map<number,string>([
        [2, "Hardware" ],  
        [0, "Legacy"],
        [3, "Frozen thinking" ],
        [4, "Analytical thinking"],
        [5, "Elastic thinking" ],
        [1, "Drives" ],
        [6, "Outcomes" ],
        [7, "Substances" ],
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
