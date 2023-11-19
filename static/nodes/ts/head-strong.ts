import * as Node from "./nodeInterfaces.js";
import { fCapital, updateContextText, nodeSelect, nodeHover, nodeHoverOut, resetStates, setupZoomButtons, createLegend, populateSearchList } from "./node-helpers.js";
// Basically saying to typescript these will be here when you need them, trust me
declare let sigma: any;
declare let d3: any;

let head_strong_gexf = "/static/nodes/gexf/head-strong.gexf"
let head_strong_context = "/static/nodes/csv/context.csv";
let head_strong_context_links = "/static/nodes/csv/context-links.csv";

let selected: string[] = [];
let categories:Node.LegendItem[] = [
  { class: 7, name: "Cellular" },
  { class: 4, name: "Physiological" },
  { class: 9, name: "Hormonal" },
  { class: 5, name: "Neurological" },
  { class: 3, name: "Mental" },
  { class: 2, name: "Habits" },
  { class: 1, name: "Foods" },
  { class: 0, name: "Food components" },
  { class: 6, name: "Toxins" },
  { class: 8, name: "Environment" }
];
let getColor = new Map<number, string>();
getColor.set(0, "#f28cd0");
getColor.set(1, "#cf1791");
getColor.set(2, "#1B981B");
getColor.set(3, "#66B8FF");
getColor.set(4, "#7de87d");
getColor.set(5, "#0070D1");
getColor.set(6, "#9f1414");
getColor.set(7, "#101414");
getColor.set(8, "#FFFF1A");
getColor.set(9, "#9D61D1");

sigma.classes.graph.addMethod('neighbors', function (this: any, nodeId: string): Node.SigmaNodeColelction {
  let k: string;
  let neighbors: Node.SigmaNodeColelction = {};
  let index = this.allNeighborsIndex[nodeId] || {};

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
    minNodeSize: 0.5,
    maxNodeSize: 15, // this also controls how many labels will be shown
    minEdgeSize: 0.05,
    maxEdgeSize: 3,
    defaultEdgeType: "curve", // only works on canvas renderer
    defaultLabelColor: "#dffcff",
    labelColor: "dffcff",
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
  d3.csv(head_strong_context),
  d3.csv(head_strong_context_links),
]).then(function (files: any[]): void {

  let contexts = files[0];
  let context_links = files[1];

  // Load data to the graph
  sigma.parsers.gexf(head_strong_gexf, s,
    function (s: any): void {
      // Add various parameters to nodes and edges
      s.graph.nodes().forEach(function (n: Node.SigmaNode): void {
        n.label = fCapital(n.label);
        n.color = getColor.get(n.attributes["modularity class"])!;
        n.originalColor = n.color;
        n.inactiveColor = "#455454";
        n.selectedColor = "#DDDDDD";
      });
      s.graph.edges().forEach(function (e: Node.SigmaEdge) {
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

  updateContextText(s, contexts, context_links, selected, 0, "simple");
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
    nodeSelect(s, selected, contexts, context_links, 0, "simple");
  }

  // Click event for node
  s.bind('clickNode', function (e: any): void {
    // Add or remove from selected array
    let nod = e.data.node.id;
    // if we are deselecting, all good
    if (selected.includes(nod)) {
      let index = selected.indexOf(nod);
      selected.splice(index, 1);
      nodeSelect(s, selected, contexts, context_links, 0, "simple");
    } else if (selected.length < 2) { // if we want to add to the selected, make sure 2 are not already selected
      selected.push(nod);
      nodeSelect(s, selected, contexts, context_links, 0, "simple");
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
    updateContextText(s, contexts, context_links, selected, 0, "simple");
    s.refresh();
  });

}).catch(function (error): void {
  console.log(error);
})

