<template>
    <Header title="Guns germs and steel by Jared Diamond"></Header>
    <section class="px-base">
      <div class="pt-20 w-mainText">
          <p>
            Why did societies develop in different ways and how did certain societies manage to dominate over others throughout the years? 
            The advantages of the dominators are usually down to guns, germs and steel, but why were not those things equally available across 
            societies? Jared Diamond argues that such inequalities are not caused by qualitative differences amongst the people themselves, 
            but are instead dictated by their environments. From the availability of wild animals and plants for the development of food 
            production that allowed the rise of populations, to the particular geography of a society’s environment that allowed or inhibited 
            contact with others and the transfer of goods, ideas, and diseases, it is these external environmental factors that resulted in 
            the wild societal inequalities we ended up with in the last few centuries. 
          </p>

      </div>
      <Instructions></Instructions>
    </section>
    <Nodes type="notes" filePrefix="ggs-" gexf='ggs.gexf' :colors="colorMap" :categories="categoriesMap"></Nodes>

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
      pageId: 9,
      colorMap: new Map<number,string>([
        [0, "blue-400"],
        [1, "cyan-300"],
        [2, "yellow-300"],
        [3, "emerald-400"],
        [4, "violet-400"],
        [5, "red-400"],
        [6, "orange-400"]
      ]),
      categoriesMap: new Map<number,string>([
        [2, "Food production" ],  
        [0, "Locations"],
        [1, "People" ],
        [6, "Societies" ],
        [5, "Conflict" ],
        [4, "Guns, germs and steel"],
        [3, "Environment" ],
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
