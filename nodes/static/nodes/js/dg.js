import { fCapital, updateContextText, nodeSelect, nodeHover, nodeHoverOut, resetStates, addSlider, filterByPercent } from "./node-helpers.js";
let head_strong_gexf = "/static/nodes/gexf/dg.gexf";
let context_path = "/static/nodes/csv/dg-context.csv";
let context_links_path = "/static/nodes/csv/dg-context-links.csv";
let selected = [];
let percent = 100;
sigma.classes.graph.addMethod('neighbors', function (nodeId) {
    let k;
    let neighbors = {};
    let index = this.allNeighborsIndex[nodeId] || {};
    for (k in index)
        neighbors[k] = this.nodesIndex[k];
    return neighbors;
});
// still using the old sigma, because the new one does not support a canvas renderer which is a prerequisite for curced edges.
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
let s = new sigma(SigmaConstructor);
// Load all notes
Promise.all([
    d3.csv(context_path),
    d3.csv(context_links_path),
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
        let zoomInButton = document.getElementById('zoom-in-button');
        zoomInButton.addEventListener("click", zoomIn);
        let zoomOutButton = document.getElementById('zoom-out-button');
        zoomOutButton.addEventListener("click", zoomOut);
    });
    updateContextText(s, contexts, context_links, selected, percent, "simple");
    createLegend();
    // Create slider
    let sliderName = "percent-slider";
    let min = '0';
    let max = '100';
    let value = percent.toString();
    let sliderContainer = document.getElementById("slider_container");
    addSlider(sliderContainer, sliderName, min, max, value, sliderChange);
    function sliderChange() {
        let slider = document.getElementById(sliderName + "-slider");
        let shownPercentage = document.getElementById("percent-slider-slider-output");
        percent = +slider.value;
        shownPercentage.innerHTML = percent + "% completed";
        filterByPercent(s, selected, contexts, context_links, percent);
        updateContextText(s, contexts, context_links, selected, percent, "simple");
        s.refresh();
    }
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
        nodeSelect(s, selected, contexts, context_links, percent, "simple");
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
        let nod = e.data.node.id;
        // if we are deselecting, all good
        if (selected.includes(nod)) {
            let index = selected.indexOf(nod);
            selected.splice(index, 1);
            nodeSelect(s, selected, contexts, context_links, percent, "simple");
        }
        else if (selected.length < 2) { // if we want to add to the selected, make sure 2 are not already selected
            selected.push(nod);
            nodeSelect(s, selected, contexts, context_links, percent, "simple");
        }
        // if two are already selected, do nothing
    });
    // Mouse over event
    s.bind('overNode', function (e) {
        // if two are already selected do nothing
        if (selected.length < 2) {
            nodeHover(s, e.data.node, selected, contexts, context_links, percent);
        }
    });
    // Mouse out event
    s.bind('outNode', function () {
        nodeHoverOut(s, selected, contexts, context_links, percent);
    });
    // When the background is clicked, we reset the graph
    s.bind('clickStage', function () {
        selected = [];
        resetStates(s);
        updateContextText(s, contexts, context_links, selected, percent, "simple");
        s.refresh();
    });
    function createLegend() {
        let categories = [
            { class: 2, name: "Chain of Dogs" },
            { class: 3, name: "Rebels" },
            { class: 1, name: "Enslaved" },
            { class: 4, name: "Assassins" },
            { class: 5, name: "Path of Hands" },
            { class: 6, name: "Other Malazans" },
            { class: 7, name: "Others" },
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
getColor.set(1, "#FF8800");
getColor.set(2, "#CC1919");
getColor.set(3, "#23CA23");
getColor.set(4, "#0070D1");
getColor.set(5, "#66B8FF");
getColor.set(6, "#EB6060");
getColor.set(7, "#FFFF1A");
