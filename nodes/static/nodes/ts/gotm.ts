import * as Node from "./nodeInterfaces.js";
import { fCapital, updateContextText, nodeSelect, nodeHover, nodeHoverOut, resetStates, addSlider, filterByPercent, setupZoomButtons, createLegend, populateSearchList } from "./node-helpers.js";

// Basically saying to typescript these will be here when you need them, trust me
declare let sigma: any;
declare let d3: any;
declare let Highcharts: any;

let head_strong_gexf = "/static/nodes/gexf/gotm.gexf";
let head_strong_context = "/static/nodes/csv/gotm-context.csv";
let head_strong_context_links = "/static/nodes/csv/gotm-context-links.csv";

let selected: string[] = [];
let percent = 100;
let categories:Node.LegendItem[] = [
    { class: 4, name: "Darujhistan cabal, Eel & allies" },
    { class: 5, name: "Darujhistan, others" },
    { class: 3, name: "Tiste Andii & allies" },
    { class: 2, name: "Ascendants" },
    { class: 1, name: "Bridgeburners" },
    { class: 0, name: "Malazans" },
    { class: 6, name: "Others" },
];
let getColor = new Map<number, string>();
getColor.set(0, "#EB6060");
getColor.set(1, "#CC1919");
getColor.set(2, "#23CA23");
getColor.set(3, "#101414");
getColor.set(4, "#0070D1");
getColor.set(5, "#66B8FF");
getColor.set(6, "#FFFF1A");

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
    d3.csv(head_strong_context),
    d3.csv(head_strong_context_links),
]).then(function (files: any[]): void {

    let contexts = files[0];
    let context_links = files[1];

    // Load data to the graph
    sigma.parsers.gexf(head_strong_gexf, s,
        function (s: any): void {
            // Add various parameters to nodes and edges
            s.graph.nodes().forEach(function (n: Node.SigmaNode) {
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
    let value = percent.toString();
    let sliderContainer: HTMLElement = document.getElementById("slider_container")!;
    addSlider(sliderContainer, sliderName, min, max, value, sliderChange);

    function sliderChange(): void {
        let slider: HTMLSelectElement = <HTMLSelectElement>document.getElementById(sliderName + "-slider");
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
    s.bind('outNode', function (): void {
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

// Bubbles
let gotm_bubbles = "/static/nodes/csv/gotm-bubbles.csv";
let BubblesColor = new Map<string, number>();
BubblesColor.set('ascendants', 24);
BubblesColor.set('bridgeburners', 30);
BubblesColor.set('darujhistan', 3);
BubblesColor.set('darujhistan_others', 1);
BubblesColor.set('malazans', 29);
BubblesColor.set('others', 8);
BubblesColor.set('tiste', 51);

let bubbles = d3.csv(gotm_bubbles).then(function (data: any[]): void {
    let initial_bubbles_data = get_data();

    function get_data(): Node.BubbleData[] {
        let new_data: Node.BubbleData[] = [];
        
        for (let row of data) {
            let alias:string = '';
            if (+row.aliasflag > 0) {
                alias = row.alias;
            }
            new_data.push({id: row.id, name: row.name, value: +row.weight, colorIndex: BubblesColor.get(row.category)!, customFlag: +row.aliasflag, customProperty: alias})
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
            pointFormatter: function (this: Node.TooltipFormatterContextObject):string {
                let text:string;
                if (this.customFlag == 1) {
                    text = this.value + " mentions for " + this.customProperty;
                } else {
                    text = this.value + " mentions";
                }
                return '<text><span style="font-size:1.1em"><strong>' + this.name + '</strong></span><br>' + text + '</text>';
            },
        },
        plotOptions: {
            packedbubble: {
                crisp: true,
                minSize: "5%", // These two control the min and max size of the bubbles
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
                dataLabels:{
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
.catch(function (error: Error) {
    console.log(error);
})

// WORDCLOUD
let gotm_wordcloud = "/static/nodes/csv/gotm-wordcloud.csv";
let wordColors = [2, 8, 16, 23, 4, 31, 49, 44, 6, 10, 18, 26, 29, 37]

let wordcloud = d3.csv(gotm_wordcloud)
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



