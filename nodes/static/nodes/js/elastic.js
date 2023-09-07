let static_url = elastic_graph_gexf = "/static/nodes/gexf/elastic.gexf",
    elastic_context = "/static/nodes/csv/elastic-context.csv",
    elastic_context_links = "/static/nodes/csv/elastic-context-links.csv";

  let selected = [];
  MiniBarOptions = {
    barType: "default",
    minBarSize: 100,
    alwaysShowBars: true,
  };

  sigma.classes.graph.addMethod('neighbors', function (nodeId) {
    let k,
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
      maxNodeSize: 20, // this also controls how many labels will be shown
      minEdgeSize: 0.1,
      maxEdgeSize: 3,
      defaultEdgeType: "curve", // only works on canvas renderer
      defaultLabelColor: "#dffcff",
      labelColor:"#dffcff",
      defaultHoverLabelBGColor: "#171c1c",
      defaultLabelHoverColor: "#dffcff",
      font: "Poppins",
      drawLabels: true,
      mouseWheelEnabled: false,
      doubleClickEnabled: false,
      touchEnabled: true,
    },
  });

  // Load all notes
  Promise.all([
    d3.csv(elastic_context),
    d3.csv(elastic_context_links),
  ]).then(function (files) {

    var contexts = files[0],
      context_links = files[1];

    // Load data to the graph
    sigma.parsers.gexf(elastic_graph_gexf, s,
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

    updateContextText(contexts, context_links, selected, null, "simple");
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
      nodeSelect(s, selected, contexts, context_links, files[0], files[1], null, "simple");
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
      // if we are deselecting, all good
      if (selected[e.data.node.id]) {
        delete selected[e.data.node.id];
        nodeSelect(s, selected, contexts, context_links, files[0], files[1], null, "simple");
      } else if (Object.keys(selected).length < 2) { // if we want to add to the selected, make sure 2 are not already selected
        selected[e.data.node.id] = e.data.node;
        nodeSelect(s, selected, contexts, context_links, files[0], files[1], null, "simple");
      } 
      // if two are already selected, do nothing
    });

    // Mouse over event
    s.bind('overNode', function (e) {
      if (Object.keys(selected).length < 2) {
        nodeHover(s, e.data.node, selected, files[0], files[1]);
      }
    });

    // Mouse out event
    s.bind('outNode', function (e) {
      nodeHoverOut(s, selected, files[0], files[1]);
    });

    // When the background is clicked, we reset the graph
    s.bind('clickStage', function (e) {
      selected = [];
      resetStates(s);
      updateContextText(contexts, context_links, selected, null, "simple");
      s.refresh();
    });

    function createLegend() {
      var categories = [
        { class: "2", name: "Hardware" },
        { class: "0", name: "Legacy" },
        { class: "3", name: "Frozen thinking" },
        { class: "4", name: "Analytical thinking" },
        { class: "5", name: "Elastic thinking" },
        { class: "1", name: "Drives" },
        { class: "6", name: "Outcomes" },
        { class: "7", name: "Substances" },
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
    "0": "#8B9595",
    "1": "#F18E8E",
    "2": "#9D61D1",
    "3": "#CC1919",
    "4": "#23CA23",
    "5": "#0070D1",
    "6": "#FFFF1A",
    "7": "#101414"
  };