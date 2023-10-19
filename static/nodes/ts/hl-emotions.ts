import * as Node from "./nodeInterfaces.js";
import { fCapital, updateContextText, nodeSelect, nodeHover, nodeHoverOut, resetStates, setupZoomButtons, createLegend, populateSearchList } from "./node-helpers.js";
// Basically saying to typescript these will be here when you need them, trust me
declare let sigma: any;
declare let d3: any;

let hl_emotions_graph_gexf = "/static/nodes/gexf/hl-emotions.gexf";
let hl_emotions_context = "/static/nodes/csv/hl-emotions-context.csv";
let hl_emotions_context_links = "/static/nodes/csv/hl-emotions-context-links.csv";

let selected: string[] = [];
let categories:Node.LegendItem[] = [
  { class: 6, name: "Concepts" },
  { class: 2, name: "Behaviours" },
  { class: 5, name: "Psychological components" },
  { class: 4, name: "Physiological components" },
  { class: 0, name: "Molecules" },
  { class: 1, name: "Consumables" },
  { class: 3, name: "Conditions" },
];
let getColor = new Map<number, string>();
getColor.set(0, "#FF8800");
getColor.set(1, "#FFFF4D");
getColor.set(2, "#23CA23");
getColor.set(3, "#170303");
getColor.set(4, "#0070D1");
getColor.set(5, "#C29CE2");
getColor.set(6, "#D1158F");

sigma.classes.graph.addMethod('neighbors', function (this: any, nodeId: string): Node.SigmaNodeColelction {
  let k: string;
  let neighbors: Node.SigmaNodeColelction = {};
  let index: string[] = this.allNeighborsIndex[nodeId] || {};

  for (k in index)
    neighbors[k] = this.nodesIndex[k];

  return neighbors;
});

// Initialise sigma with settings
let SigmaConstructor: Node.SigmaConstructor = {
  renderers: [
    {
      type: 'canvas',
      container: document.getElementById('graph-container')!,
      freeStyle: true
    }
  ],
  settings: {
    minNodeSize: 1,
    maxNodeSize: 20, // this also controls how many labels will be shown
    minEdgeSize: 0.1,
    maxEdgeSize: 3,
    defaultEdgeType: "curve", // only works on canvas renderer
    defaultLabelColor: "#dffcff",
    labelColor: "#dffcff",
    defaultHoverLabelBGColor: "#171c1c",
    defaultLabelHoverColor: "#dffcff",
    font: "Poppins",
    drawLabels: true,
    mouseWheelEnabled: false,
    doubleClickEnabled: false,
    touchEnabled: false,
  },
};
let s: any = new sigma(SigmaConstructor);

// Load all notes
Promise.all([
  d3.csv(hl_emotions_context),
  d3.csv(hl_emotions_context_links),
]).then(function (files: any[]): void {

  let contexts = files[0];
  let context_links = files[1];

  // Load data to the graph
  sigma.parsers.gexf(hl_emotions_graph_gexf, s,
    function (s: any): void {
      // Add various parameters to nodes and edges
      s.graph.nodes().forEach(function (n: Node.SigmaNode): void {
        n.label = fCapital(n.label);
        n.color = getColor.get(n.attributes["modularity class"])!;
        n.originalColor = n.color;
        n.inactiveColor = "#455454";
        n.selectedColor = "#DDDDDD";
      });
      s.graph.edges().forEach(function (e: Node.SigmaEdge): void {
        e.originalColor = e.color;
        e.inactiveColor = "#455454";
      });
      s.refresh();
      populateSearchList(s);

      // Add event listeners to buttons
      let inputBox: HTMLElement = document.getElementById('search-input')!;
      inputBox.addEventListener("change", searchChange);

      setupZoomButtons(s);
    });

  updateContextText(s, contexts, context_links, selected, 0, "reference");
  createLegend(categories, getColor);

  function searchChange(e: any): void {
    let value = e.target.value;

    // Add node to selected
    s.graph.nodes().forEach(function (n: Node.SigmaNode): void {
      if (n.label == value) {
        if (!selected.includes(n.id)) {
          selected.push(n.id);
        }
      }
    });
    nodeSelect(s, selected, contexts, context_links, 0, "reference");
  }

  // Click event for node
  s.bind('clickNode', function (e: any): void {
    // Add or remove from selected array
    let nod = e.data.node.id;
    // if we are deselecting, all good
    if (selected.includes(nod)) {
      let index = selected.indexOf(nod);
      selected.splice(index, 1);
      nodeSelect(s, selected, contexts, context_links, 0, "reference");
    } else if (selected.length < 2) { // if we want to add to the selected, make sure 2 are not already selected
      selected.push(nod);
      nodeSelect(s, selected, contexts, context_links, 0, "reference");
    }
    // if two are already selected, do nothing
  });

  // Mouse over event
  s.bind('overNode', function (e: any): void {
    // if two are already selected do nothing
    if (Object.keys(selected).length < 2) {
      nodeHover(s, e.data.node, selected, contexts, context_links, 0);
    }
  });

  // Mouse out event
  s.bind('outNode', function (): void {
    nodeHoverOut(s, selected, contexts, context_links, 0);
  });

  // When the background is clicked, we reset the graph
  s.bind('clickStage', function (): void {
    selected = [];
    resetStates(s);
    updateContextText(s, contexts, context_links, selected, 0, "reference");
    s.refresh();
  });

}).catch(function (error): void {
  console.log(error);
})


