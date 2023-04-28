declare let d3: any; // Basically saying to typescript there will be a d3 when you need it, trust me

// import "https://code.highcharts.com/es-modules/masters/modules/exporting.src.js";
import { fCapital, createLegend, addDropdown } from "./chartHelper.js";
import Highcharts from "https://code.highcharts.com/es-modules/masters/highcharts.src.js";
import * as Worlddata from "./worlddataInterfaces.js";

let donut_path: string = "/static/worlddata/csv/biodiversity-pie.csv";
let scatter_path: string = "/static/worlddata/csv/biomass-scatter.csv";


    let pieChart = d3.csv(donut_path)
        .then(function (data:any[]):void {

            // Get unique values for various columns of data
            const ALL_TAXONS:string[] = [...new Set(data.map(d => d.Taxon))].sort()
            const ALL_TERRITORIES:string[] = [...new Set(data.map(d => d.Territory))].sort()

            let defaultTaxon = "All";
            let defaultTerritory = "All";
            let taxon = defaultTaxon;
            let territory = defaultTerritory;

            let container_class = '.biomass-pie';

            function get_data(): Worlddata.PieData[] {
                let new_data: Worlddata.PieData[] = [];

                for (let row of data) {
                    if ((row.Taxon == taxon) && (row.Territory == territory) && colorMap.get(row.Category) !== undefined) {
                        new_data.push({ id: row.Category, name: row.Category, y: +row.Biomass, colorIndex: colorMap.get(row.Category)! }); // exclamation mark to bypass undefined case of colorMap
                    }
                }
                return new_data;
            }

            let initial_data = get_data();

            let chart = Highcharts.chart({
                chart: {
                    renderTo: "pie_chart",

                    plotShadow: false,
                    type: 'pie',
                    height: 400
                },
                title: {
                    text: undefined
                },
                tooltip: {
                    formatter: function (this: Highcharts.TooltipFormatterContextObject):string {
                        let title = fCapital(this.key!);
                        let sName = this.series.name;
                        let sValue = this.y;
                        let per = this.percentage.toFixed(1);

                        return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + sName + ': ' + sValue + 'gt <br> Percentage: ' + per + '%</text>';
                    },
                    useHTML: true
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false,
                        }
                    }
                },
                series: [{
                    type:"pie",
                    name: "Biomass",
                    innerSize: '30%',
                    data: initial_data
                }],
                annotations: [{
                    labels: [{
                        point: '0'
                    }]
                }, {
                    visible: false,
                }]
            },
            )
            // Initialise legend
            let chart_points = chart.series[0].data;
            createLegend(chart_points, chart_points, container_class);

            // Dropdowns
            // Define dropdown container
            let filters = document.querySelector(".chart-filters");

            // Create a taxon dropdown
            let taxonName = "taxon";
            let taxonWidth = "100px";
            addDropdown(filters!, taxonName, taxonWidth, taxonChange, ALL_TAXONS!, taxon);

            // Update chart data on taxon change
            function taxonChange():void {
                taxon = (<HTMLSelectElement>document.getElementById(taxonName + "-select")).value;
                chart.series[0].setData(get_data());
                let legend_data = chart.series[0].data;
                createLegend(legend_data, legend_data, container_class);
            }

            // Create a territory dropdown
            let territoryName = "territory";
            let territoryWidth = "250px";
            addDropdown(filters!, territoryName, territoryWidth, territoryChange, ALL_TERRITORIES, territory);

            // Update chart data on territory change
            function territoryChange():void {
                territory = (<HTMLSelectElement>document.getElementById(territoryName + "-select")).value;
                chart.series[0].setData(get_data());
                let legend_data = chart.series[0].data;
                createLegend(legend_data, legend_data, container_class);
            }
        })
        .catch(function (error:Error) {
            console.log(error);
        })

    let scatterPlot = d3.csv(scatter_path)
        .then(function (data:any[]):void {

            // Get unique values for various columns of data
            let container_class = '.biomass-scatter';

            function get_data(): Worlddata.ScatterData[] {
                let new_data: Worlddata.ScatterData[] = [];
                let i = 0;
                for (let row of data) {
                    new_data.push({ name: row.group, y: +row.Mass, x: +row.power, colorIndex: colorMap.get(row.group)! });
                    i += 1;
                }
                return new_data;
            }

            let initial_data = get_data();

            let chart = Highcharts.chart( {
                chart: {
                    renderTo: 'scatter_plot',
                    type: 'scatter',
                    zooming:{
                        type: 'xy'
                    },
                    height: 400
                },
                title: {
                    text: undefined
                },
                tooltip: {
                    useHTML: true
                },
                xAxis: {
                    labels: {
                        formatter: function () {
                            return ('<div class="highcharts-axis-html-labels"><text>10<sup >' + this.value + '</sup></text></div>')
                        },
                        useHTML: true,
                    },
                    title: {
                        text: 'Population'
                    },
                    startOnTick: true,
                    endOnTick: true,
                },
                yAxis: {
                    title: {
                        text: 'Biomass (gt of C)'
                    }
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 30,
                            states: {
                                hover: {
                                    enabled: true,
                                    radiusPlus: 10,
                                },
                                select: {
                                    enabled: true,
                                    radiusPlus: 10
                                }
                            }
                        },
                        opacity: 0.6,
                        tooltip: {
                            headerFormat: '',
                            pointFormatter: function () {
                                let sName = fCapital(this.name);
                                let biomass = this.y;
                                let populance = this.x;

                                return '<text><span style="font-size:1.1em"><strong>' + sName + '</strong></span><br>Biomass: ' + biomass + 'gt <br> Population: 10<sup>' + populance + '</sup> organisms</text>';
                            },
                        },
                        stickyTracking: false
                    }
                },
                series: [{
                    type: 'scatter',
                    allowPointSelect: true,
                    data: initial_data,
                    showInLegend: false
                }],
            })

            let chart_points = chart.series[0].data;
            createLegend(chart_points, chart_points, container_class);
        })
        .catch(function (error:Error) {
            console.log(error);
        })

    // To keep colors consistent
    let colorMap = new Map<string, number>();
    colorMap.set('Plants',24);
    colorMap.set('Bacteria',5);
    colorMap.set('Fungi',0);
    colorMap.set('Archaea',16);
    colorMap.set('Protists',38);
    colorMap.set('Animals',30);
    colorMap.set('Viruses',12);
    colorMap.set('Fish',3);
    colorMap.set('Livestock',28);
    colorMap.set('Humans',30);
    colorMap.set('Wild mammals',9);
    colorMap.set('Wild birds',1);
    colorMap.set('Arthropods',17);
    colorMap.set('Annelids',19);
    colorMap.set('Molluscs',36);
    colorMap.set('Cnidarians',23);
    colorMap.set('Nematodes',40);

