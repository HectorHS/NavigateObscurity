<template>
  <section>
    <div class="border rounded-xl px-5">
      <h5 class="my-3">How to use:</h5>
      <div class="flex flex-col lg:flex-row pl-3 text-xs">
        <ul class="mr-5 flex-1">
          <li v-for="item of list1" class="pb-3 list-disc">{{ item }} </li>
        </ul>
        <ul class="mr-5 flex-1">
          <li v-for="item of list2" class="pb-3 list-disc">{{ item }} </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent ({
    setup() {
    },
    props: {
      percent: { // to find csv files to load
        type: Boolean,
        required: false
      },
    },
    data: () => ({
      list1Simple: [ "Hover over a node to see its name, and which other nodes it connects to.",
          "Click on a node to see all relevant notes.",
          "Click on a second node to only see notes related to both nodes.",
          "No more than two nodes can be selected at a time."],
      list2Simple: [
          "Click on a selected node to deselect it or click on the background to reset all selections.",
          "Use the search box to find a node - suggestions will be shown when you start typing.",
          "Click on the + or - button to zoom in and out.",
          "Click and drag the background to move the view of the graph."],
      list1Percent: [ "Hover over a node to see its name, and which other nodes it connects to.",
          "Click on a node to see all relevant notes.",
          "Click on a second node to only see notes related to both nodes.",
          "No more than two nodes can be selected at a time.",
          "Click on a selected node to deselect it or click on the background to reset all selections."],
      list2Percent: [
          "Use the search box to find a node - suggestions will be shown when you start typing.",
          "Click on the + or - button to zoom in and out.",
          "Click and drag the background to move the view of the graph.",
          "To avoid spoilers, use the slider to indicate your current progression in the book."]
    }),
    methods: {
    },
    computed: {
      list1():string[] {
        let list = this.list1Simple;
        if (this.percent) {
          list = this.list1Percent;
        }
        return list;
      },
      list2():string[] {
        let list = this.list2Simple;
        if (this.percent) {
          list = this.list2Percent;
        }
        return list;
      }
    },
  })

</script>

