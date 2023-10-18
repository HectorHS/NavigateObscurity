import { fCapital, updateContextText, nodeSelect, nodeHover, nodeHoverOut, resetStates } from "./node-helpers.js";
let ggs_graph_gexf = "/static/nodes/gexf/ggs.gexf";
let ggs_context = "/static/nodes/csv/GGS-context.csv";
let ggs_context_links = "/static/nodes/csv/GGS-context-links.csv";
let txt2 = "another test";
let selected = [];
sigma.classes.graph.addMethod('neighbors', function (nodeId) {
    let k;
    let neighbors = {};
    let index = this.allNeighborsIndex[nodeId] || {};
    for (k in index)
        neighbors[k] = this.nodesIndex[k];
    return neighbors;
});
let SigmaConstructor = {
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
        maxEdgeSize: 3,
        defaultEdgeType: "curve",
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
// Initialise sigma with settings
let s = new sigma(SigmaConstructor);
// Load all notes
Promise.all([
    d3.csv(ggs_context),
    d3.csv(ggs_context_links),
]).then(function (files) {
    let contexts = files[0];
    let context_links = files[1];
    // Load data to the graph
    sigma.parsers.gexf(ggs_graph_gexf, s, function (s) {
        // Add various parameters to nodes and edges
        s.graph.nodes().forEach(function (n) {
            n.label = fCapital(n.label);
            n.color = getColor.get(n.attributes["modularity class"]);
            n.originalColor = n.color;
            n.inactiveColor = "#455454";
            n.selectedColor = "#DDDDDD";
        });
        s.graph.edges().forEach(function (e) {
            e.originalColor = e.color;
            e.inactiveColor = "#455454";
        });
        s.refresh();
        populateSearchList(s);
        // Add event listeners to buttons
        let inputBox = document.getElementById('search-input');
        inputBox.addEventListener("change", searchChange);
        let zoomInButton = document.getElementById('zoom-in-button');
        zoomInButton.addEventListener("click", zoomIn);
        let zoomOutButton = document.getElementById('zoom-out-button');
        zoomOutButton.addEventListener("click", zoomOut);
    });
    updateContextText(s, contexts, context_links, selected, 0, "simple");
    createLegend();
    function searchChange(e) {
        let value = e.target.value;
        // Add node to selected
        s.graph.nodes().forEach(function (n) {
            if (n.label == value) {
                if (!selected.includes(n.id)) {
                    selected.push(n.id);
                }
            }
        });
        nodeSelect(s, selected, contexts, context_links, 0, "simple");
    }
    function zoomIn() {
        let c = s.camera;
        c.goTo({
            ratio: c.ratio / c.settings('zoomingRatio')
        });
    }
    function zoomOut() {
        let c = s.camera;
        c.goTo({
            ratio: c.ratio * c.settings('zoomingRatio')
        });
    }
    // Click event for node
    s.bind('clickNode', function (e) {
        // Add or remove from selected array
        let nod = e.data.node.id;
        // if we are deselecting, all good
        if (selected.includes(nod)) {
            let index = selected.indexOf(nod);
            selected.splice(index, 1);
            nodeSelect(s, selected, contexts, context_links, 0, "simple");
        }
        else if (selected.length < 2) { // if we want to add to the selected, make sure 2 are not already selected
            selected.push(nod);
            nodeSelect(s, selected, contexts, context_links, 0, "simple");
        }
        // if two are already selected, do nothing
    });
    // Mouse over event
    s.bind('overNode', function (e) {
        if (selected.length < 2) {
            nodeHover(s, e.data.node, selected, contexts, context_links, 0);
        }
    });
    // Mouse out event
    s.bind('outNode', function () {
        nodeHoverOut(s, selected, contexts, context_links, 0);
    });
    // When the background is clicked, we reset the graph
    s.bind('clickStage', function () {
        selected = [];
        resetStates(s);
        updateContextText(s, contexts, context_links, selected, 0, "simple");
        s.refresh();
    });
    // TODO why is this not in the helper?
    function createLegend() {
        let categories = [
            { class: 2, name: "Food production" },
            { class: 0, name: "Locations" },
            { class: 1, name: "People" },
            { class: 6, name: "Societies" },
            { class: 5, name: "Conflict" },
            { class: 4, name: "Guns, germs and steel" },
            { class: 3, name: "Environment" },
        ];
        let container = document.getElementById('node-legend');
        //Object.keys(categories).forEach(function (key) {
        for (let cat of categories) {
            let legend_item = document.createElement("div");
            legend_item.classList.add('legend-item');
            let legend_dot = document.createElement("div");
            legend_dot.classList.add('legend-dot');
            legend_dot.style.backgroundColor = getColor.get(cat.class);
            legend_item.appendChild(legend_dot);
            let legend_label = document.createElement("div");
            legend_label.classList.add('legend-label');
            legend_label.innerHTML = cat.name;
            legend_item.appendChild(legend_label);
            container.appendChild(legend_item);
        }
    }
    function populateSearchList(s) {
        let container = document.getElementById('nodes-datalist');
        s.graph.nodes().forEach(function (n) {
            let item = document.createElement('option');
            item.value = n.label;
            container.appendChild(item);
        });
    }
}).catch(function (error) {
    console.log(error);
});
let getColor = new Map();
getColor.set(0, "#0070D1");
getColor.set(1, "#66B8FF");
getColor.set(2, "#FFFF4D");
getColor.set(3, "#23CA23");
getColor.set(4, "#D1158F");
getColor.set(5, "#CC1919");
getColor.set(6, "#FF8800");
