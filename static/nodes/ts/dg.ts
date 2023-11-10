import * as Node from "./nodeInterfaces.js";
import { fCapital, updateContextText, nodeSelect, nodeHover, nodeHoverOut, resetStates, addSlider, filterByPercent, setupZoomButtons, createLegend, populateSearchList } from "./node-helpers.js";
// Basically saying to typescript these will be here when you need them, trust me
declare let sigma: any;
declare let d3: any;
declare let Highcharts: any;

let head_strong_gexf = "/static/nodes/gexf/dg.gexf";
let context_path = "/static/nodes/csv/dg-context.csv";
let context_links_path = "/static/nodes/csv/dg-context-links.csv";

let selected: string[] = [];
let percent = 100;
let categories:Node.LegendItem[] = [
    { class: 2, name: "Chain of Dogs" },
    { class: 3, name: "Rebels" },
    { class: 1, name: "Enslaved" },
    { class: 4, name: "Assassins" },
    { class: 5, name: "Path of Hands" },
    { class: 6, name: "Other Malazans" },
    { class: 7, name: "Others" },
];
let mapSelected = false;
let getColor = new Map<number, string>();
getColor.set(1, "#FF8800");
getColor.set(2, "#CC1919");
getColor.set(3, "#23CA23");
getColor.set(4, "#0070D1");
getColor.set(5, "#66B8FF");
getColor.set(6, "#EB6060");
getColor.set(7, "#FFFF1A");

sigma.classes.graph.addMethod('neighbors', function (this: any, nodeId: string): Node.SigmaNodeColelction {
    let k: string;
    let neighbors: Node.SigmaNodeColelction = {};
    let index: string[] = this.allNeighborsIndex[nodeId] || {};

    for (k in index)
        neighbors[k] = this.nodesIndex[k];

    return neighbors;
});

// still using the old sigma, because the new one does not support a canvas renderer which is a prerequisite for curced edges.
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
    d3.csv(context_path),
    d3.csv(context_links_path),
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

    updateContextText(s, contexts, context_links, selected, percent, "simple");
    createLegend(categories, getColor);

    // Create slider
    let sliderName = "percent-slider";
    let min = '0';
    let max = '100';
    let value: string = percent.toString();
    let sliderContainer: HTMLElement = document.getElementById("slider_container")!;
    addSlider(sliderContainer, sliderName, min, max, value, sliderChange);

    function sliderChange(): void {
        let slider: HTMLSelectElement = <HTMLSelectElement>document.getElementById(sliderName + "-slider")!;
        let shownPercentage: HTMLElement = document.getElementById("percent-slider-slider-output")!;
        percent = +slider.value;
        shownPercentage.innerHTML = percent + "% completed";

        filterByPercent(s, selected, contexts, context_links, percent);

        updateContextText(s, contexts, context_links, selected, percent, "simple");
        s.refresh();

    }
    function searchChange(e: any): void {
        let value = e.target.value;

        // Add node to selected
        s.graph.nodes().forEach(function (n: Node.SigmaNode) {
            if (n.label == value) {
                if (!selected.includes(n.id)) {
                    selected.push(n.id);
                }
            }
        });
        nodeSelect(s, selected, contexts, context_links, percent, "simple");
    }

    // Click event for node
    s.bind('clickNode', function (e: any): void {
        // Add or remove from selected array
        let nod = e.data.node.id;
        // if we are deselecting, all good
        if (selected.includes(nod)) {
            let index = selected.indexOf(nod);
            selected.splice(index, 1);
            nodeSelect(s, selected, contexts, context_links, percent, "simple");
        } else if (selected.length < 2) { // if we want to add to the selected, make sure 2 are not already selected
            selected.push(nod);
            nodeSelect(s, selected, contexts, context_links, percent, "simple");
        }
        // if two are already selected, do nothing
    });

    // Mouse over event
    s.bind('overNode', function (e: any): void {
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
    s.bind('clickStage', function (): void {
        selected = [];
        resetStates(s);
        updateContextText(s, contexts, context_links, selected, percent, "simple");
        s.refresh();
    });

}).catch(function (error) {
    console.log(error);
})

addLegendEvents()

function addLegendEvents():void {
     // click effect for legend
     document.querySelectorAll('.legend-item').forEach(function (a) {
        a.addEventListener("mouseover", function (this: Element) {
            let name = this.classList[1];
            mapLegendHover(name);
        });
        a.addEventListener("mouseout", function (this: Element) {
            mapLegendHoverOut();
        });
        a.addEventListener("click", function (this: Element) {
            let name = this.classList[1];
            mapLegendClick(name);
        });
    });
}

function mapLegendHover(name:string):void {
    document.querySelectorAll('.map-overlay').forEach(function (e) {
        if (name != e.id) {
            e.classList.add("unhovered");
        }
    });
}
function mapLegendHoverOut():void {
    document.querySelectorAll('.map-overlay').forEach(function (e) {
            e.classList.remove("unhovered");
    });
}
function mapLegendClick(name:string):void {
    if (mapSelected) {
        mapSelected = false;
        document.querySelectorAll('.map-overlay').forEach(function (e) {
            e.classList.remove("unselected");
        });
    } else {
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
let wordColors = [2, 8, 16, 23, 4, 31, 49, 44, 6, 10, 18, 26, 29, 37]

let wordcloud = d3.csv(dg_wordcloud)
    .then(function (data: any[]): void {
        let initialData = get_data();

        function get_data(): Node.CloudData[] {
            let new_data: Node.CloudData[] = [];
            let i = 0;

            for (let row of data) {
                
                new_data.push({ name: row.label, weight:row.weight, colorIndex: wordColors[i] });
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
.catch(function (error: Error) {
    console.log(error);
})

