import { fCapital, updateContextText, nodeSelect, nodeHover, nodeHoverOut, resetStates, setupZoomButtons, createLegend, populateSearchList } from "./node-helpers.js";
let head_strong_gexf = "/static/nodes/gexf/head-strong.gexf";
let head_strong_context = "/static/nodes/csv/context.csv";
let head_strong_context_links = "/static/nodes/csv/context-links.csv";
let selected = [];
let categories = [
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
let getColor = new Map();
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
sigma.classes.graph.addMethod('neighbors', function (nodeId) {
    let k;
    let neighbors = {};
    let index = this.allNeighborsIndex[nodeId] || {};
    for (k in index)
        neighbors[k] = this.nodesIndex[k];
    return neighbors;
});
// Initialise sigma with settings
let SigmaConstructor = {
    renderers: [
        {
            type: 'canvas',
            container: document.getElementById('graph-container'),
            freeStyle: true
        }
    ],
    settings: {
        minNodeSize: 0.5,
        maxNodeSize: 15,
        minEdgeSize: 0.05,
        maxEdgeSize: 3,
        defaultEdgeType: "curve",
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
let s = new sigma(SigmaConstructor);
// Load all notes
Promise.all([
    d3.csv(head_strong_context),
    d3.csv(head_strong_context_links),
]).then(function (files) {
    let contexts = files[0];
    let context_links = files[1];
    // Load data to the graph
    sigma.parsers.gexf(head_strong_gexf, s, function (s) {
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
        setupZoomButtons(s);
    });
    updateContextText(s, contexts, context_links, selected, 0, "simple");
    createLegend(categories, getColor);
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
        // if two are already selected do nothing
        if (Object.keys(selected).length < 2) {
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
}).catch(function (error) {
    console.log(error);
});
