import { fCapital, updateContextText, nodeSelect, nodeHover, nodeHoverOut, resetStates, addSlider, filterByPercent, setupZoomButtons, createLegend, populateSearchList } from "./node-helpers.js";
let head_strong_gexf = "/static/nodes/gexf/dg.gexf";
let context_path = "/static/nodes/csv/dg-context.csv";
let context_links_path = "/static/nodes/csv/dg-context-links.csv";
let selected = [];
let percent = 100;
let categories = [
    { class: 2, name: "Chain of Dogs" },
    { class: 3, name: "Rebels" },
    { class: 1, name: "Enslaved" },
    { class: 4, name: "Assassins" },
    { class: 5, name: "Path of Hands" },
    { class: 6, name: "Other Malazans" },
    { class: 7, name: "Others" },
];
let mapSelected = false;
let getColor = new Map();
getColor.set(1, "#FF8800");
getColor.set(2, "#CC1919");
getColor.set(3, "#23CA23");
getColor.set(4, "#0070D1");
getColor.set(5, "#66B8FF");
getColor.set(6, "#EB6060");
getColor.set(7, "#FFFF1A");
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
        setupZoomButtons(s);
    });
    updateContextText(s, contexts, context_links, selected, percent, "simple");
    createLegend(categories, getColor);
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
}).catch(function (error) {
    console.log(error);
});
addLegendEvents();
function addLegendEvents() {
    // click effect for legend
    document.querySelectorAll('.legend-item').forEach(function (a) {
        a.addEventListener("mouseover", function () {
            let name = this.classList[1];
            mapLegendHover(name);
        });
        a.addEventListener("mouseout", function () {
            mapLegendHoverOut();
        });
        a.addEventListener("click", function () {
            let name = this.classList[1];
            mapLegendClick(name);
        });
    });
}
function mapLegendHover(name) {
    document.querySelectorAll('.map-overlay').forEach(function (e) {
        if (name != e.id) {
            e.classList.add("unhovered");
        }
    });
}
function mapLegendHoverOut() {
    document.querySelectorAll('.map-overlay').forEach(function (e) {
        e.classList.remove("unhovered");
    });
}
function mapLegendClick(name) {
    if (mapSelected) {
        mapSelected = false;
        document.querySelectorAll('.map-overlay').forEach(function (e) {
            e.classList.remove("unselected");
        });
    }
    else {
        mapSelected = true;
        document.querySelectorAll('.map-overlay').forEach(function (e) {
            if (name != e.id) {
                e.classList.add("unselected");
            }
        });
    }
}
// WORDCLOUD
let dg_wordcloud = "/static/nodes/csv/dg-wordcloud.csv";
let wordColors = [2, 8, 16, 23, 4, 31, 49, 44, 6, 10, 18, 26, 29, 37];
let wordcloud = d3.csv(dg_wordcloud)
    .then(function (data) {
    let initialData = get_data();
    function get_data() {
        let new_data = [];
        let i = 0;
        for (let row of data) {
            new_data.push({ name: row.label, weight: row.weight, colorIndex: wordColors[i] });
            i++;
            if (i == wordColors.length) {
                i = 0;
            }
        }
        return new_data;
    }
    let chart = Highcharts.chart('wordcloud', {
        chart: {
            styledMode: true,
        },
        series: [{
                type: 'wordcloud',
                data: initialData,
                name: 'Occurrences',
            }],
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
    });
})
    .catch(function (error) {
    console.log(error);
});
let dg_bubbles = "/static/nodes/csv/dg-bubbles.csv";
let BubblesColor = new Map();
BubblesColor.set('Assassins', 3);
BubblesColor.set('COD', 30);
BubblesColor.set('Enslaved', 44);
BubblesColor.set('Malazans', 29);
BubblesColor.set('Others', 8);
BubblesColor.set('POH', 1);
BubblesColor.set('Rebels', 24);
let bubbles = d3.csv(dg_bubbles)
    .then(function (data) {
    let initial_bubbles_data = get_data();
    function get_data() {
        let new_data = [];
        for (let row of data) {
            let alias = '';
            if (+row.aliasflag > 0) {
                alias = row.alias;
            }
            new_data.push({ id: row.id, name: row.name, value: +row.weight, colorIndex: BubblesColor.get(row.category), customFlag: +row.aliasflag, customProperty: alias });
        }
        return new_data;
    }
    let bubblesChart = Highcharts.chart('bubbles', {
        chart: {
            type: 'packedbubble',
            height: 500,
        },
        title: {
            text: undefined
        },
        tooltip: {
            useHTML: true,
            headerFormat: '',
            pointFormatter: function () {
                let text;
                if (this.customFlag == 1) {
                    text = this.value + " mentions for " + this.customProperty;
                }
                else {
                    text = this.value + " mentions";
                }
                return '<text><span style="font-size:1.1em"><strong>' + this.name + '</strong></span><br>' + text + '</text>';
            },
        },
        plotOptions: {
            packedbubble: {
                crisp: true,
                minSize: "5%",
                maxSize: "400%",
                marker: {
                    lineColor: '#DDDDD',
                    states: {
                        hover: {
                            enabled: true,
                        },
                    }
                },
                layoutAlgorithm: {
                    gravitationalConstant: 0.02,
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    filter: {
                        property: 'value',
                        operator: '>',
                        value: 70
                    }
                }
            }
        },
        legend: {
            enabled: false
        },
        series: [{
                type: 'packedbubble',
                name: 'Mentions by name',
                data: initial_bubbles_data,
                allowPointSelect: false
            }],
        responsive: {
            rules: [{
                    condition: {
                        maxWidth: 700
                    },
                    chartOptions: {
                        plotOptions: {
                            packedbubble: {
                                maxSize: "250%",
                            }
                        }
                    }
                }]
        }
    });
})
    .catch(function (error) {
    console.log(error);
});
