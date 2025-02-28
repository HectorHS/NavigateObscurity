<template>
    <Header title="Deadhouse gates by Steven Erikson"></Header>
    <section class="px-base">
      <div class="pt-20 w-mainText">
          <p>
            In the Seven Cities continent a rebellion is brewing with a prophecy, an obscure goddess, high mages, local warlords 
            and ex-Malazan militants all playing a role. The Malazan Empire will try to supress it strengthening its presence in 
            the area with a newly appointed Fist and his forces. Two bridgeburners embark on a quest across the same continent 
            with a hidden agenda. A noble, a historian and a thug form an unlikely partnership as they are enslaved and sent to 
            what promises to be a transformative journey. An ancient warrior is on a mission to uncover his past while his 
            companion is deliberately keeping it obscure. A horde of shapeshifters converge on a path fighting for ascension. 
            Paths will be crossed, ankles will be broken, prophecies will be fulfilled, innocents will be crucified, assassins 
            will be unleashed, soldiers will be betrayed, and children will die. This is the second installment of the Malazan 
            Book of the Fallen.  
          </p>

      </div>
    </section>
    <Stats book="dg" class="my-16"></Stats>
    <section class="px-base">
      <h2>What happened?</h2>
      <div class="mb-6">According to my notes.</div>
      <Instructions :percent="true"></Instructions>
      <Nodes type="malazan" filePrefix="dg-" gexf='dg.gexf' :colors="colorMap" :categories="categoriesMap" :sizeMultiplier="1"></Nodes>
    </section>

    <Bubbles filePrefix="dg-" :colors="colorMap" class="px-base mt-20"></Bubbles>
    <MalazanMap filePrefix="dg-" :items="mapitems" class="px-base mt-20"></MalazanMap>
    <Wordcloud filePrefix="dg-" class="px-base mt-20"></Wordcloud>

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
  import MalazanMap from '@/components/Malazan/Map.vue';

  import * as NOTypes from '@/interfaces/NOTypes';

  export default defineComponent ({
    components: {
      Header,
      Instructions, 
      Comments,
      Nodes,
      Stats,
      Bubbles,
      Wordcloud,
      MalazanMap
    },
    setup() {
    },
    data: () => ({
      pageId: 11,
      colorMap: new Map<number,string>([
        [7, "violet-400"],
        [1, "yellow-400"],
        [2, "red-400"],
        [3, "green-400"],
        [4, "blue-400"],
        [5, "cyan-300"],
        [6, "orange-300"],
        [8, "purple-200"]
      ]),
      categoriesMap: new Map<number,string>([
        [4, "Assassins"],
        [5, "Path of Hands" ],
        [3, "Rebels" ],
        [2, "Chain of Dogs" ],
        [1, "Enslaved" ],
        [7, "Others"],
        [6, "Other Malazans" ],
        [8, "Worldbuilding" ],
      ]),
      mapitems: [{id: 'coltaine', title: 'The Chain of Dogs', color: 'red-400'},
        {id: 'felisin', title: 'Felisin, Heboric, Baudin', color: 'orange-300'},
        {id: 'fiddler', title: 'Fiddler, Apsalar, Crokus', color: 'blue-600'},
        {id: 'kalam', title: 'Kalam', color: 'blue-300'},
        {id: 'gesler', title: 'Gesler, Stormy, Truth', color: 'green-400'},
        {id: 'icarium', title: 'Icarium, Mappo', color: 'violet-400'},
        ] as NOTypes.MalazanMapItem[]
    }),
    computed: {
    },
    methods: {
    },
  })
</script>
