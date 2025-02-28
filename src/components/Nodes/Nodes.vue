<template>
    <section class='px-base lg:h-[90vh] mt-10 flex flex-col lg:flex-row'>
      <!-- contexts -->
      <div class="w-full lg:w-2/6 bg-gray-800 rounded-xl p-3 pr-1 shadow-lg overflow-hidden order-last lg:order-first" >
        <div class="context-container overflow-y-auto h-[400px] lg:h-full">
          <h4 class="mb-4" v-html="contextTitle"></h4>
          <div v-if="links" v-for="item of filteredContexts" class="pb-6">
            <div>{{item.text}}</div>
            <div class="text-end text-xs underline">
              <a :href="item.link" target="_blank"><i>Link to video</i></a>
            </div>
          </div>
          <div v-else v-for="item of filteredContexts">
            <p>{{item.text}}</p>
          </div>
        </div>
      </div>
      <!-- sigma -->
      <div id="sigma_container" class="w-full lg:w-4/6 h-[500px] lg:h-full relative">
        <div class="flex flex-col float-right w-nodeControls">
          <SliderPercent v-if="type == 'malazan'" v-model="percent" class="mb-2"></SliderPercent>
          <DropdownSearch :items="allNodes" v-model="nodeSearched" placeholder="Search for a node"></DropdownSearch>
          <button class="zoom-button rounded-t" @click="zoom">+</button>
          <button class="zoom-button rounded-b" @click="unzoom">-</button>
        </div>
      </div>
    </section>
    <!-- legend -->
    <section class="px-base text-sm">
      <div class="flex mt-2 justify-center flex-wrap">
        <div v-for="[key, value] of categories" class="flex  mr-2">
          <div class="legend-dot" :class="'bg-' + colors.get(key)"></div>
          <div class="my-auto">{{ value }}</div>
        </div>
      </div>
    </section>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import { fCapital, getTailwindHexColor } from '@/helpers/commonFunctions';
  import * as d3Fetch from "d3-fetch";
  import { mapState } from 'pinia';
  import { useAppStore } from '@/store/appStore.ts';

  import Header from '@/components/Header.vue';
  import Instructions from '@/components/Nodes/Instructions.vue';
  import Comments from '@/components/Comments.vue';
  import IconBase from '@/components/IconBase.vue';
  import DropdownSearch from '@/components/Controls/DropdownSearch.vue';
  import SliderPercent from '@/components/Controls/SliderPercent.vue';

  import Graph from "graphology";
  import Sigma from "sigma";
  import { parse } from "graphology-gexf/browser";
  import EdgeCurveProgram from "@sigma/edge-curve";
  import NodeGradientProgram  from "@/helpers/node-gradient";

  import { type EdgeDisplayData, type NodeDisplayData,  } from "sigma/types";
  import * as NOTypes from '@/interfaces/NOTypes';

  export default defineComponent ({
    components: {
      Header,
      Instructions,
      Comments,
      IconBase,
      DropdownSearch,
      SliderPercent
    },
    setup() {
    },
    props: {
      filePrefix: { // to find csv files to load
        type: String,
        required: true
      },
      colors: { // nodes colors
        type:Object as PropType<Map<number,string>>,
        required: true
      },
      categories: { // node categories
        type: Object as PropType<Map<number,string>>,
        required: true
      },
      gexf: { // gexf file name
        type: String,
        required: true
      },
      links: { // if true provides link for each context
        type: Boolean,
        required: false,
      },
      linksMap: { // to find appropriate link 
        type: Object as PropType<Map<string,string>>,
        required: false,
      },
      type: { // notes or malazan
        type: String,
        required: true,
      },
      sizeMultiplier: { // to control nodes size
        type: Number,
        required: false,
      }
    },
    data: () => ({
      pageId: 3,
      hoveredNode: undefined as string | undefined,
      hoveredNeighbors: [] as string[],
      selectedNodes: [] as string[],
      selectedNeighbors: [] as string[],
      renderer: undefined as Sigma | undefined,
      graph: undefined as any,
      allNodes: [] as string[],
      nodeSearched: '',
      invalidColor: "#32383e",
      contextDataRaw: [] as NOTypes.ContextData[],
      contextLinkDataRaw: [] as NOTypes.ContextLinkData[],
      curvature: 0.4,
      percent: 100,
    }),
    computed: {
      contextTitle():string {
        let title = 'All notes';
        if (this.selectedNodes.length > 0) {
          let n = this.type == 'notes' ? this.selectedNodes[0] : fCapital(this.selectedNodes[0]);
          title = 'Notes for <span class="text-blue">' + n + '</span>';
        }
        if (this.selectedNodes.length > 1) {
          let n = this.type == 'notes' ? this.selectedNodes[1] : fCapital(this.selectedNodes[1]);
          title = title + ' & <span class="text-blue">' + n + '</span>';
        }
        title = title + ':';
        return title;
      },
      filteredContexts():NOTypes.ContextData[] {
        let linksSlice = this.contextLinkDataRaw.slice();
        if (this.selectedNodes.length == 1) {
          linksSlice = linksSlice.filter(l => l.from == this.selectedNodes[0] || l.to.includes(this.selectedNodes[0]));
        } else if (this.selectedNodes.length == 2) {
          linksSlice = linksSlice.filter(l => (l.from == this.selectedNodes[0] && l.to.includes(this.selectedNodes[1])) || (l.from == this.selectedNodes[1] && l.to.includes(this.selectedNodes[0])));
        }

        let ids = linksSlice.map(l => l.contextId);
        let contextsSlice = this.contextDataRaw.filter(c => ids.includes(c.id));
        if (this.type == "malazan") {
          contextsSlice = contextsSlice.filter(c => c.percent! <= this.percent)
        }
        return contextsSlice;
      },
      colorsHex():Map<number, string> {
        let hexes = new Map<number, string>();
        this.colors.forEach((value, key) => {
          hexes.set(key, this.getTailwindHexColor(value));
        })
        return hexes;
      },
      sizeMultiplierCalc():number {
        let multiplier = this.sizeMultiplier ? this.sizeMultiplier : 1;
        if (this.screenWidth < 750) {
          multiplier = multiplier * 0.7;
        }
        return multiplier;
      },

      ...mapState(useAppStore, ['screenWidth']),
    },
    methods: {
      initiateSigma(container:HTMLElement):void {
        let graph_gexf = "/gexf/" + this.gexf;
        fetch(graph_gexf)
        .then((res) => res.text())
        .then((gexf) => {
          this.graph = parse(Graph, gexf);
          this.allNodes = this.graph.nodes();
          // to find graphology functions https://graphology.github.io/attributes.html#node-attributes

          // Add various parameters to nodes and edges
          this.graph.nodes().forEach((node, i) => {
            let color = this.colorsHex.get(this.graph!.getNodeAttribute(node, "modularity class"))!;
            this.graph!.setNodeAttribute(node, "color", color);
            this.graph!.setNodeAttribute(node, "label", this.fCapital(this.graph!.getNodeAttribute(node, "label")));
            this.graph!.setNodeAttribute(node, "type", 'gradient');
            let size = this.graph?.getNodeAttribute(node, "size") * this.sizeMultiplierCalc;
            this.graph!.setNodeAttribute(node, "size", size);
          });
          this.graph.forEachEdge((edge, source, target) => {
            let color = this.colorsHex.get(this.graph!.getNodeAttribute(target, "modularity class"))!;
            this.graph!.setEdgeAttribute(edge, "color", this.getColorWithTransparency(color));
            this.graph!.setEdgeAttribute(edge, "curvature", this.curvature);
          })
          // instatiate sigma
          // all settings: https://github.com/jacomyal/sigma.js/blob/40bd5266410be119863fc2557f72d98d0bf754ee/packages/sigma/src/settings.ts#L57
          this.renderer = new Sigma(this.graph, container, {
            allowInvalidContainer: true,
            defaultEdgeType: "curve",
            labelRenderedSizeThreshold: 15,
            enableCameraRotation: false,
            enableCameraZooming: false,
            minEdgeThickness: 2,
            defaultDrawNodeHover: this.drawHover,
            defaultDrawNodeLabel: this.drawLabel,
            edgeProgramClasses: {
              curve: EdgeCurveProgram,
            },
            nodeProgramClasses: {
              gradient: NodeGradientProgram,
            },
          });

          // graph events:
          this.renderer.on("enterNode", ({ node }) => {
            this.setHoveredNode(node);
          });
          this.renderer.on("leaveNode", () => {
            this.setHoveredNode(undefined);
          });
          this.renderer.on("clickNode", ({ node }) => {
            this.setSelectedNodes(node);
          });
          this.renderer.on("clickStage", () => {
            this.selectedNeighbors = [];
            this.selectedNodes = [];
            // Refresh rendering
            this.renderer!.refresh({
              // We don't touch the graph data so we can skip its reindexation
              skipIndexation: true,
            });
          });
          // see here for reducer functionality: https://www.sigmajs.org/storybook/?path=/story/use-reducers--story

          // Render nodes accordingly to state:
          // 1. If a node is selected, it is highlighted, and non neighbors are greyed out
          // 2. If a node is hovered, it is highlighted, and non neighbors are greyed out
          // 3. If two nodes are selected, they are highlighted, and non common neighbors are greyed out
          this.renderer.setSetting("nodeReducer", (node, data) => {
            const res: Partial<NodeDisplayData> = { ...data };

            // grey out non-neighbors on hover
            if (this.hoveredNeighbors.length > 0 && !this.hoveredNeighbors.includes(node) && this.hoveredNode !== node) {
              res.label = "";
              res.color = this.invalidColor;
            }
            // highlight selected nodes
            if (this.selectedNodes.includes(node)) {
              res.highlighted = true;
              res.color = "#fff";
            }
            // grey out non neighbors of selected nodes
            if (this.selectedNodes.length > 0 && !this.selectedNeighbors.includes(node) && !this.selectedNodes.includes(node)) {
              res.label = "";
              res.color = this.invalidColor;
            }

            return res;
          });

          // Render edges accordingly to state:
          // 1. If a node is selected, edges to non neighbors are greyed out
          // 2. If a node is hovered, edges to non neighbors are greyed out
          // 3. If two nodes are selected, edges to non common neighbors are greyed out
          this.renderer.setSetting("edgeReducer", (edge, data) => {
            const res: Partial<EdgeDisplayData> = { ...data };

            if ( this.hoveredNode && !this.graph!.extremities(edge).every((n) => n === this.hoveredNode || this.graph!.areNeighbors(n, this.hoveredNode))) {
              res.color = this.getColorWithTransparency(this.invalidColor);
            }
            if ( this.selectedNodes.length > 0) {
              for (let selected of this.selectedNodes) {
                if (!this.graph!.extremities(edge).every((n) => n === selected || this.graph!.areNeighbors(n, selected))) {
                  res.color = this.getColorWithTransparency(this.invalidColor);
                }
              }
            }

            return res;
          });
        });

      },
      drawHover(context: CanvasRenderingContext2D, data: any, settings: any):void {
        // original implementation: https://github.com/jacomyal/sigma.js/blob/7b3a5ead355f7c54449002e6909a9af2eecae6db/src/rendering/canvas/hover.ts
        let labelSize = settings.labelSize;
        let labelFont = settings.labelFont;
        let weight = settings.labelWeight;

        context.font = `${weight} ${labelSize}px ${labelFont}`;

        // Then we draw the label background
        context.fillStyle = "#040506";
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 8;
        context.shadowColor = "#000";

        const PADDING = 2;

        if (typeof data.label === "string") {
          const textWidth = context.measureText(data.label).width,
            boxWidth = Math.round(textWidth + 15),
            boxHeight = Math.round(labelSize + 2 * PADDING),
            radius = Math.max(data.size, labelSize / 2) + PADDING;

          const angleRadian = Math.asin(boxHeight / 2 / radius);
          const xDeltaCoord = Math.sqrt(Math.abs(Math.pow(radius, 2) - Math.pow(boxHeight / 2, 2)));

          context.beginPath();
          context.moveTo(data.x + xDeltaCoord, data.y + boxHeight / 2);
          context.lineTo(data.x + radius + boxWidth, data.y + boxHeight / 2);
          context.lineTo(data.x + radius + boxWidth, data.y - boxHeight / 2);
          context.lineTo(data.x + xDeltaCoord, data.y - boxHeight / 2);
          context.arc(data.x, data.y, radius, angleRadian, -angleRadian);
          context.closePath();
          context.fill();
        } else {
          context.beginPath();
          context.arc(data.x, data.y, data.size + PADDING, 0, Math.PI * 2);
          context.closePath();
          context.fill();
        }

        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 0;

        // And finally we draw the label
        this.drawLabel(context, data, settings);
      },
      drawLabel(context: CanvasRenderingContext2D, data: any, settings: any):void {
        // original implementation: https://github.com/jacomyal/sigma.js/blob/7b3a5ead355f7c54449002e6909a9af2eecae6db/src/rendering/canvas/label.ts
        if (!data.label) return;

        context.fillStyle = '#b9c6c6';
        context.font = `600 14px Poppins`;

        context.fillText(data.label, data.x + data.size + 3, data.y + 4);
      },
      setHoveredNode(node?: string):void {
        if (node && this.graph) {
          this.hoveredNode = node;
          this.hoveredNeighbors = this.graph.neighbors(node);
        }

        if (!node) {
          this.hoveredNode = undefined;
          this.hoveredNeighbors = [];
        }

        // Refresh rendering
        this.renderer!.refresh({
          // We don't touch the graph data so we can skip its reindexation
          skipIndexation: true,
        });
      },
      // I think we have a bit of an issue, because a context might connect with many nodes, without the nodes conecting between them
      // for example (huberman-emotions),for context 17, physiological-sigh connects with heart-rate,lungs, mouth, parasympathetic-system, emotional-regulation
      // distress	connects with physiological-sigh, emotional-regulation. 17 connects with all those, but distress does not connect with mouth
      // Which means that after selecting distress, mouth is not highlighted, and seems irrelevant.
      // there are several ways forward.
      // 1 - is to redo all connections and make sure everything connects with everything.
      // this will make the graph look more busy, and will make some connections we might not want to make, but will have some consistency in user experience
      // 2 - not allow more than 2 selections. We make a commitment to only show stuff that are directly connected,
      // we rely on the graph for those and connections like distress-mouth will remain hidden.
      // 3 - we allow as many connections we want. We look into the contexts and manually find all relevant nodes.
      // mouth will be visible after selecting distress, but will be lacking an edge. The question is if edges are not there to help
      // visually on selection, what is their purpose
      // I will go with option 2 for now but might need to review this.
      setSelectedNodes( node: string):void {
          if (this.selectedNodes.includes(node)) {
           this.selectedNodes = this.selectedNodes.filter(n => n !== node);
           if (this.selectedNodes.length == 1) {
              this.selectedNeighbors = this.graph!.neighbors(this.selectedNodes[0]);
            } else {
              this.selectedNeighbors = [];
            }
          } else if (this.selectedNodes.length < 2) {
            this.selectedNodes.push(node);
            if (this.selectedNodes.length == 1) {
              this.selectedNeighbors = this.graph!.neighbors(node);
            } else {
              let neighbors1 = this.graph!.neighbors(this.selectedNodes[0]);
              let neighbors2 = this.graph!.neighbors(this.selectedNodes[1]);
              this.selectedNeighbors = neighbors1.filter(value => neighbors2.includes(value));
            }
          }

        // Refresh rendering
        this.renderer!.refresh({
          // We don't touch the graph data so we can skip its reindexation
          skipIndexation: true,
        });
      },
      zoom():void {
        if (this.renderer) {
          this.renderer.setSetting("enableCameraZooming", true);
          this.renderer.getCamera().animatedZoom({ duration: 300 });
          let _ = this;
          setTimeout(function() {
            _.renderer!.setSetting("enableCameraZooming", false);
          }, 300);
        }
      },
      unzoom():void {
        if (this.renderer) {
          this.renderer.setSetting("enableCameraZooming", true);
          this.renderer.getCamera().animatedUnzoom({ duration: 300 });
          let _ = this;
          setTimeout(function() {
            _.renderer!.setSetting("enableCameraZooming", false);
          }, 300);
        }
      },
      loadData():void {
        let path = '/csv/notes/';
        if (this.type == 'malazan') {
          path = '/csv/malazan/';
        }
        d3Fetch.csv(path + this.filePrefix + "context.csv").then( (data: any[]): void => {
            let d:NOTypes.ContextData[] = [];
            if (this.links) {
              for (let row of data) {
                let full_time = row.Time;
                let time_array = full_time.split(".");
                let hours = +time_array[0];
                let mins = +time_array[1];
                let secs = +time_array[2];
                let seconds = hours * 3600 + mins * 60 + secs;
                let link = this.linksMap!.get(row.Video) + "&t=" + seconds + "s";
                d.push({id: row.Id, text: row.Context, link: link});
              }
            } else if (this.type == "malazan") {
              for (let row of data) {
                d.push({id: row.Id, text: row.Context, percent: +row.Percent});
              }
            } else {
              for (let row of data) {
                d.push({id: row.Id, text: row.Context});
              }
            }
            this.contextDataRaw = d;
        });
        d3Fetch.csv(path + this.filePrefix + "context-links.csv").then( (data: any): void => {
            let d: NOTypes.ContextLinkData[] = [];
            let toColumns = data.columns;
            toColumns.splice(0, 2);
            for (let row of data) {
                let to: string[] = [];
                for (let col of toColumns) {
                    to.push(row[col]);
                }
                d.push({ contextId: row.Context, from: row.node1, to: to });
            }
            this.contextLinkDataRaw = d;
        });
      },
      getColorWithTransparency(color1:string):string {
        let color2 = '#22252a';
        let amount = 0.7;

        const [rA, gA, bA] = color1.match(/\w\w/g)!.map((c) => parseInt(c, 16));
        const [rB, gB, bB] = color2.match(/\w\w/g)!.map((c) => parseInt(c, 16));
        const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
        const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
        const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
        return '#' + r + g + b;
      },
      fCapital,
      getTailwindHexColor
    },

    watch: {
      nodeSearched : function () {
        this.setSelectedNodes(this.nodeSearched);
      },
    },
    mounted () {
      let container:HTMLElement = document.getElementById("sigma_container")!;
      this.initiateSigma(container);
      this.loadData();
    }
  })
</script>

<style lang="scss" scoped>
  .zoom-button {
    @apply relative cursor-pointer z-10 text-textColor bg-gray text-xl border border-solid border-textColor self-end h-9 w-9 hover:bg-blue hover:text-gray;
  }
  .context-container {
    scrollbar-color: #7d9297 #151619; /* The first applies to the thumb of the scrollbar, the second to the track. */
    scrollbar-width: thin;
  }
</style>
