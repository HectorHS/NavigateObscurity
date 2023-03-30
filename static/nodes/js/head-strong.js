var static_url = head_strong_gexf = "/static/nodes/gexf/head-strong.gexf",
head_strong_context = "/static/nodes/csv/context.csv",
head_strong_context_links = "/static/nodes/csv/context-links.csv";

var selected = [];
MiniBarOptions = {
barType: "default",
minBarSize: 100,
alwaysShowBars: true,
};

sigma.classes.graph.addMethod('neighbors', function (nodeId) {
var k,
  neighbors = {},
  index = this.allNeighborsIndex[nodeId] || {};

for (k in index)
  neighbors[k] = this.nodesIndex[k];

return neighbors;
});

// Initialise sigma with settings
var s = new sigma({
renderers: [
  {
    type: 'canvas',
    container: document.getElementById('graph-container'),
    freeStyle: true
  }
],
settings: {
  minNodeSize: 1,
  maxNodeSize: 20,
  minEdgeSize: 0.1,
  maxEdgeSize: 0.5,
  defaultEdgeType: "curve", // only works on canvas renderer
  labelColor: "node",
  labelHoverBGColor: "default",
  defaultHoverLabelBGColor: "#171c1c",
  defaultLabelHoverColor: "#fff",
  font: "Poppins",
  drawLabels: false,
  mouseWheelEnabled: false,
  doubleClickEnabled: false,
  touchEnabled: false,
},
});

// Load all notes
Promise.all([
d3.csv(head_strong_context),
d3.csv(head_strong_context_links),
]).then(function (files) {

var contexts = files[0],
  context_links = files[1];

// Load data to the graph
sigma.parsers.gexf(head_strong_gexf, s,
  function (s) {
    // Add various parameters to nodes and edges
    s.graph.nodes().forEach(function (n) {
      n.label = fCapital(n.label);
      n.color = getColor[n.attributes["modularity class"]];
      n.originalColor = n.color;
      n.inactiveColor = "#455454";
      n.selectedColor = "#DDDDDD";
    });
    s.graph.edges().forEach(function (e) {
      e.originalColor = e.color;
      e.inactiveColor = "#455454";
    });
    s.refresh();
    populateSearchList(s.graph.nodes());

    // Add event listeners to buttons
    var inputBox = document.getElementById('search-input');
    inputBox.addEventListener("change", searchChange);

    var zoomInButton = document.getElementById('zoom-in-button');
    zoomInButton.addEventListener("click", zoomIn);
    var zoomOutButton = document.getElementById('zoom-out-button');
    zoomOutButton.addEventListener("click", zoomOut);
  });

updateContextText(contexts, context_links, selected);
createLegend();

function searchChange(e) {
  var value = e.target.value;

  // Add node to selected
  s.graph.nodes().forEach(function (n) {
    if (n.label == value) {
      if (!selected[n.id]) {
        selected[n.id] = n;
      }
    }
  });
  nodeSelect(s, selected, contexts, context_links);
}

function zoomIn() {
  var c = s.camera;
  c.goTo({
    ratio: c.ratio / c.settings('zoomingRatio')
  });
}

function zoomOut() {
  var c = s.camera;
  c.goTo({
    ratio: c.ratio * c.settings('zoomingRatio')
  });
}

// Click event for node
s.bind('clickNode', function (e) {
  // Add or remove from selected array
  if (!selected[e.data.node.id]) {
    selected[e.data.node.id] = e.data.node;
  } else {
    delete selected[e.data.node.id];
  }

  nodeSelect(s, selected, contexts, context_links);
});

// Mouse over event
s.bind('overNode', function (e) {
  nodeHover(s, e.data.node, selected);
});

// Mouse out event
s.bind('outNode', function (e) {
  nodeHoverOut(s, selected);
});

// When the background is clicked, we reset the graph
s.bind('clickStage', function (e) {
  selected = [];
  resetStates(s);
  showSelectedNodes(selected);
  updateContextText(contexts, context_links, selected);
  s.refresh();
});

function createLegend() {
  var categories = [
    { class: "7", name: "Cellular" },
    { class: "4", name: "Physiological" },
    { class: "9", name: "Hormonal" },
    { class: "5", name: "Neurological" },
    { class: "3", name: "Mental" },
    { class: "2", name: "Habits" },
    { class: "1", name: "Foods" },
    { class: "0", name: "Food components" },
    { class: "6", name: "Toxins" },
    { class: "8", name: "Environment" }
  ];

  var container = document.getElementById('node-legend');

  //Object.keys(categories).forEach(function (key) {
  for (var cat of categories) {
    var legend_item = document.createElement("div");
    legend_item.classList.add('legend-item');

    var legend_dot = document.createElement("div");
    legend_dot.classList.add('legend-dot');
    legend_dot.style["background-color"] = getColor[cat.class];
    legend_item.appendChild(legend_dot);

    var legend_label = document.createElement("div");
    legend_label.classList.add('legend-label');
    legend_label.innerHTML = cat.name;
    legend_item.appendChild(legend_label);

    container.appendChild(legend_item);
  }
}

function populateSearchList(nodes) {
  var container = document.getElementById('nodes-datalist');
  nodes.forEach(function (n) {
    var item = document.createElement('option');
    item.value = n.label;
    container.appendChild(item);
  });
}

}).catch(function (error) {
console.log(error);
})

getColor = {
"0": "#ED45B2",
"1": "#970F67",
"2": "#1B981B",
"3": "#66B8FF",
"4": "#001B33",
"5": "#0070D1",
"6": "#E63333",
"7": "#101414",
"8": "#FFFF1A",
"9": "#9D61D1 ",
};