// Basically saying to typescript these will be here when you need them, trust me
declare let d3: any; 
declare let Highcharts: any;
// helpers
import { fCapital, addDropdown, getCountryCode, numberFormatter, getIndexColor, addSlider, createLegend } from "./chartHelper.js";

import * as Worlddata from "./worlddataInterfaces.js";

let migration_map_path = "/static/worlddata/csv/migration-map.csv";
let migration_bubbles_path = "/static/worlddata/csv/migration-bubbles.csv";
let migration_wheel_path = "/static/worlddata/csv/migration-wheel.csv";

let migrationMap = d3.csv(migration_map_path)
    .then(function (data:any):void {
        // All filterable options
        const ALL_YEARS:string[] = [...new Set(data.map((d: { year: string}) => d.year))].sort() as string[];
        const all_inco:string[] = [...new Set(data.map((d: { income_level: string})  => d.income_level))].sort() as string[];
        let ALL_MEASURES = ["Destination of migration", "Origin of migration", "Destination of refugees"];

        // Remove empty value and add an All option for the filter
        all_inco.splice(0, 1);
        all_inco.unshift("All");
        const ALL_INCOMES = all_inco;

        // Default values
        let measure = "Destination of migration";
        let year = "2017";
        let income = "All";
        let percentage = 0;

        let container_class = ".migration-map";

        function get_data():Worlddata.MapData[] {
            let new_data:Worlddata.MapData[] = [];
            // let per = percentage);
            let val = 0;
            let abs = 0;
            for (let row of data) {
                if (measure == "Destination of migration") {
                    val = +row.migrants_destination_per;
                    abs = +row.migrants_destination;
                } else if (measure == "Origin of migration") {
                    val = +row.migrants_origin_per;
                    abs = +row.migrants_origin;
                } else if (measure == "Destination of refugees") {
                    val = +row.refugees_destination_per;
                    abs = +row.refugees_destination;
                }
                if (income == "All") { //All is not an option in our raw data
                    if (row.year == year && val > percentage) {
                        new_data.push({ country: getCountryCode(row.country), value: val, absolute: abs });
                    }
                } else {
                    if (row.year == year && val > percentage && income == row.income_level) {
                        new_data.push({ country: getCountryCode(row.country), value: val, absolute: abs });
                    }
                }
            }
            return new_data;
        }

        let initial_data = get_data();
     
        // Initiate the chart
        let chart = Highcharts.mapChart({
            chart: {
                height: 500,
                renderTo: 'migration_map',
            },
            title: {
                text: undefined
            },
            mapNavigation: {
                enabled: true,
                enableMouseWheelZoom: false,
                enableButtons: true,
            },
            colorAxis: {
                tickInterval: 1,
                max: 7,
                min: 0,
                stops: [
                    [0, getIndexColor(3)],
                    [0.35, getIndexColor(23)],
                    [0.5, getIndexColor(52)],
                    [0.65, getIndexColor(9)],
                    [0.95, getIndexColor(30)]
                ],
            },
            tooltip: {
                formatter: function (this: Worlddata.TooltipFormatterContextObject):string {
                    let title:string = fCapital(this.key!);
                    let value:string = numberFormatter(this.point.value!);
                    let text = "";
                    let abs:string = numberFormatter((this.point as any).absolute!);
                    if (measure == "Destination of migration") {
                        text = abs + " migrated into the country, <br>consisting " + value + "% of local population";
                    } else if (measure == "Origin of migration") {
                        text = abs + " migrated out of the country, <br>consisting " + value + "% of local population";
                    } else if (measure == "Destination of refugees") {
                        text = abs + " recognised refugees have arrived into the country, <br>consisting " + value + "% of local population";
                    }
                    return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
                },
                useHTML: true
            },
            credits: {
                enabled: false
            },
            series: [{
                type: 'map',
                mapData: Highcharts.maps['custom/world'],
                colorIndex: 2,
                data: initial_data,
                joinBy: ['iso-a3', 'country'], // first var: type of geographical data, second: data column name
            }]
        });

        // Dropdowns
        // Define dropdown container
        let filters:HTMLElement = document.querySelector(container_class + " .chart-filters")!;

        // Create a measure dropdown
        let measureName = "area-measure";
        let measuerWidth = "250px";
        addDropdown(filters, measureName, measuerWidth, measureChange, ALL_MEASURES, measure);

        // Update chart data on measure change
        function measureChange():void {
            measure = (<HTMLSelectElement>document.getElementById(measureName + "-select")).value;
            updateColorStops();
            chart.series[0].setData(get_data());
        }

        // Create a year dropdown
        let yearName = "area-year";
        let yearWidth = "80px";
        addDropdown(filters, yearName, yearWidth, yearChange, ALL_YEARS, year);

        // Update chart data on year change
        function yearChange():void {
            year = (<HTMLSelectElement>document.getElementById(yearName + "-select")).value;
            chart.series[0].setData(get_data());
        }

        // Create a income dropdown
        let incomeName = "area-income";
        let incomeWidth = "150px";
        addDropdown(filters, incomeName, incomeWidth, incomeChange, ALL_INCOMES, income);

        // Update chart data on income change
        function incomeChange():void {
            income = (<HTMLSelectElement>document.getElementById(incomeName + "-select")).value;
            chart.series[0].setData(get_data());
        }

        // Create a slider
        let percentageName = "map-percentage";
        let min = 0;
        let max = 50;
        let value = 0;
        let containerWidth = 250;
        let sliderWidth = 40;
        addSlider(filters, percentageName, min, max, value, sliderWidth, percentageChange);


        // Update chart data on percentage change
        function percentageChange():void {
            percentage = (<HTMLSelectElement>document.getElementById(percentageName + "-slider")).value as unknown as number;
            document.getElementById(percentageName + "-slider-output")!.innerHTML = percentage + "%";
            chart.series[0].setData(get_data());
        }

        function updateColorStops():void {
            let updatedColorAxis:Worlddata.ColorAxisOptions = {};
            if (measure == "Destination of migration") {
                updatedColorAxis = {
                    tickInterval: 1,
                    max: 7,
                    min: 0,
                };
            } else if (measure == "Origin of migration") {
                updatedColorAxis = {
                    tickInterval: 1,
                    max: 7,
                    min: 0,
                };
            } else if (measure == "Destination of refugees") {
                updatedColorAxis = {
                    tickInterval: 0.1,
                    max: 0.7,
                    min: 0,
                };
            }
            chart.update({
                colorAxis: updatedColorAxis,
            },false);
        }

    })
    .catch(function (error:Error) {
        console.log(error);
    })

var migrationBubbles = d3.csv(migration_bubbles_path)
    .then(function (data:any):void {

        const ALL_COUNTRIES:string[] = [...new Set(data.map((d: {country_host:string}) => d.country_host))].sort() as string[];
        const ALL_PARAMETERS = ["Destination", "Origin"];
        const ALL_YEARS = ["1990", "1995", "2000", "2005", "2010", "2015", "2017"];

        let country = "Lebanon";
        let year = "2017";
        let parameter = "Destination";

        let container_class = ".migration-bubbles";
        let initial_data:Worlddata.BubblesData[] = [];

        let random_colors = [3, 9, 18, 23, 31, 37, 1, 12, 15, 26, 29, 39, 42, 5, 8, 19, 22, 32, 38, 43, 2, 10, 17, 24, 30, 40, 4, 11, 16, 25, 33, 36, 54];


        function get_data():Worlddata.BubblesData[] {
            let new_data:Worlddata.BubblesData[] = [];
            let i = 0;
            let total_migrants = 0;
            if (parameter == "Destination") {
                for (let row of data) {
                    if (country == row.country_host) {
                        new_data.push({ id: row.country_origin, name: row.country_origin, absolute: +row[year], value: 0, colorIndex: random_colors[i] });
                        if (i == (random_colors.length - 1)) {
                            i = 0;
                        } else {
                            i++;
                        }
                        total_migrants += +row[year];
                    }
                }
            } else {
                for (let row of data) {
                    if (country == row.country_origin) {
                        new_data.push({ id: row.country_host, name: row.country_host, absolute: +row[year], value: 0, colorIndex: random_colors[i] });
                        if (i == (random_colors.length - 1)) {
                            i = 0;
                        } else {
                            i++;
                        }
                        total_migrants += +row[year];
                    }
                }
            }
            // We are calculating percentages to keep bubble sizes consistent
            for (let i in new_data) {
                new_data[i].value = (new_data[i].absolute! / total_migrants) * 100;
            }
            return new_data;
        }

        initial_data = get_data();

        var chart = Highcharts.chart({
            chart: {
                styledMode: true,
                type: 'packedbubble',
                height: '500px',
                renderTo: 'migration_bubbles'
            },
            title: {
                text: undefined
            },
            tooltip: {
                useHTML: true,
                headerFormat: '',
                pointFormatter: function (this: Worlddata.TooltipFormatterContextObject):string {
                    var sName = fCapital(this.name!),
                        population = numberFormatter((this as any).absolute),
                        text = "";
                    if (parameter == "Destination") {
                        text = population + ' people have migrated to ' + country;
                    } else {
                        text = population + ' people have migrated from ' + country;
                    }
                    return '<text><span style="font-size:1.1em"><strong>' + sName + '</strong></span><br>' + text + '</text>';
                },
            },
            plotOptions: {
                packedbubble: {
                    animation:
                    {
                        duration: 100
                    },
                    animationLimit: 50,
                    clip: false,
                    // initialPositions: 'random',
                    minSize: 1, // These two control the min and max size of the bubbles
                    maxSize: 600,
                    zMax: 100, // These two define the scale, to keep it consistent across different variables
                    zMin: 1,   // without them, maxsize would be the biggest bubble regardless of actual value - so it could be 95% or 15% and would look the same
                    marker: {
                        states: {
                            hover: {
                                enabled: true,
                                radiusPlus: 10,
                            },
                            select: {
                                enabled: true,
                                radiusPlus: 10,
                            }
                        }
                    },
                    layoutAlgorithm: {
                        enableSimulation: true,
                        friction: 0.7,
                        gravitationalConstant: 0.02, //make the movement slower
                        maxIterations: 200, // total animation time
                        maxSpeed: 8
                    }
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Migrants',
                type: 'packedbubble',
                data: initial_data,
                allowPointSelect: true

            }]
        });

        let legend_data = initial_data.sort((a, b) => b.value - a.value).slice(0, 5);
        let chart_points = chart.series[0].data;
        createLegend(chart_points, legend_data, container_class);

        // Dropdowns
        // Define dropdown container
        let filters:HTMLSpanElement = document.querySelector(container_class + " .chart-filters")!;

        // Create a parameter dropdown
        let parameterName = "bubbles-parameter";
        let parameterWidth = "250px";
        addDropdown(filters, parameterName, parameterWidth, parameterChange, ALL_PARAMETERS, parameter);

        // Update chart data on year change
        function parameterChange():void {
            parameter = (<HTMLSelectElement>document.getElementById(parameterName + "-select")).value;
            let new_data = get_data();
            let legend_data = new_data.sort((a, b) => b.value - a.value).slice(0, 5);// only going for a top five
            chart.series[0].setData(new_data);
            chart_points = chart.series[0].data;
            createLegend(chart_points, legend_data, container_class);
        }

        // Create a country dropdown
        let countryName = "bubbles-country";
        let countryWidth = "250px";
        addDropdown(filters, countryName, countryWidth, countryChange, ALL_COUNTRIES, country);

        // Update chart data on year change
        function countryChange():void {
            country = (<HTMLSelectElement>document.getElementById(countryName + "-select")).value;
            let new_data = get_data();
            let legend_data = new_data.sort((a, b) => b.value - a.value).slice(0, 5);// only going for a top five
            chart.series[0].setData(new_data);
            chart_points = chart.series[0].data;
            createLegend(chart_points, legend_data, container_class);
        }

        // Create a year dropdown
        let yearName = "bubbles-year";
        let yearWidth = "80px";
        addDropdown(filters, yearName, yearWidth, yearChange, ALL_YEARS, year);

        // Update chart data on year change
        function yearChange():void {
            year = (<HTMLSelectElement>document.getElementById(yearName + "-select")).value;
            let new_data = get_data();
            let legend_data = new_data.sort((a, b) => b.value - a.value).slice(0, 5);
            chart.series[0].setData(new_data);
            chart_points = chart.series[0].data;
            createLegend(chart_points, legend_data, container_class);
        }

    })
    .catch(function (error:Error) {
        console.log(error);
    })

let migrationWheel = d3.csv(migration_wheel_path)
    .then(function (data:any) {
        // fix for bug of self referencing points
        (function (H) {
            let base = (H as any).seriesTypes.sankey.prototype;

            (H as any).seriesTypes.dependencywheel.prototype.createNode = function (id:any):any {
                let node = base.createNode.call(this, id);
                node.index = this.nodes.length - 1;
                /**
                 * Return the sum of incoming and outgoing links.
                 * @private
                 */
                node.getSum = function () {
                    return node.linksFrom
                        .concat(node.linksTo)
                        .filter(function (link:any, i:any, links:any) {
                            return links.indexOf(link) === i;
                        })
                        .reduce(function (acc:any, link:any) {
                            return acc + link.weight;
                        }, 0);
                };
                /**
                 * Get the offset in weight values of a point/link.
                 * @private
                 */
                node.offset = function (point:any) {
                    var offset = 0,
                        i,
                        links = node.linksFrom.concat(node.linksTo),
                        sliced;
                    /**
                     * @private
                     */
                    function otherNode(link:any) {
                        if (link.fromNode === node) {
                            return link.toNode;
                        }
                        return link.fromNode;
                    }
                    // Sort and slice the links to avoid links going out of each
                    // node crossing each other.
                    links.sort(function (a:any, b:any) {
                        return otherNode(a).index - otherNode(b).index;
                    });
                    for (i = 0; i < links.length; i++) {
                        if (otherNode(links[i]).index > node.index) {
                            links = links.slice(0, i).reverse().concat(links.slice(i).reverse());
                            sliced = true;
                            break;
                        }
                    }
                    if (!sliced) {
                        links.reverse();
                    }
                    for (i = 0; i < links.length; i++) {
                        if (links[i] === point) {
                            return offset;
                        }
                        if (links.indexOf(links[i]) === i) {
                            offset += links[i].weight;
                        }
                    }
                };
                return node;
            }
        })(Highcharts);
        // All filterable options
        const ALL_PARAMETERS:string[] = [...new Set(data.map((d: {Parameter:string}) => d.Parameter))].sort() as string[];

        // Default values
        let parameter = "Continent";

        let container_class = ".migration-wheel";
        let initial_data = [];

        let getColor = new Map<string, number>();
        getColor.set('Africa',9);
        getColor.set("Asia",17);
        getColor.set("Europe",3);
        getColor.set("Latin America and the Caribbean",24);
        getColor.set("Northern America",30);
        getColor.set("Oceania",50);
        getColor.set("Eastern Africa",8);
        getColor.set("Middle Africa",9);
        getColor.set("Northern Africa",10);
        getColor.set("Southern Africa",11);
        getColor.set("Western Africa",12);
        getColor.set("Eastern Asia",15);
        getColor.set("South-Eastern Asia",16);
        getColor.set("Southern Asia",17);
        getColor.set("Central Asia",18);
        getColor.set("Western Asia",19);
        getColor.set("Eastern Europe",2);
        getColor.set("Northern Europe",3);
        getColor.set("Southern Europe",4);
        getColor.set("Western Europe",5);
        getColor.set("Caribbean",22);
        getColor.set("Central America",24);
        getColor.set("South America",26);

        function get_data():Worlddata.SankeyData[] {
            var new_data:Worlddata.SankeyData[] = [];

            for (let row of data) {
                if (parameter == row.Parameter) {
                    new_data.push({ from: row.Origin, to: row.Destination, weight: +row.Population, colorIndex: getColor.get(row.Origin) });
                }
            }
            return new_data;
        }

        initial_data = get_data();

        let chart = Highcharts.chart({
            chart: {
                styledMode: true,
                height: '500px',
                renderTo: 'migration_wheel'
            },
            title: {
                text: undefined
            },
            tooltip: {
                useHTML: true,
                headerFormat: '',
                formatter: function (this: Worlddata.TooltipFormatterContextObject):string {
                    let point = this.point;
                    let text = "";
                    if ((this.point as any).formatPrefix == "node") {
                        let region = fCapital(point.name!);
                        let population = numberFormatter((point as any).sum);

                        text = "<strong>" + region + "</strong>: " + population;
                    } else {
                        let from = fCapital((point as any).from);
                        let to = fCapital((point as any).to);
                        let population = numberFormatter((point as any).weight);
                        text = from + " &#8594; " + to + ": " + population;
                    }
                    return '<text>' + text + '</text>';
                },
            },
            plotOptions: {
                dependencywheel: {
                    allowPointSelect: true,
                    curveFactor: 0.6,
                    linkOpacity: 0.2,
                    nodePadding: 0,
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                data: initial_data,
                type: 'dependencywheel',
                name: 'Migration flow',
                dataLabels: {
                    enabled: false
                },
                size: '95%',
                nodes: [{
                    id: "Africa",
                    colorIndex: getColor.get("Africa"),
                }, {
                    id: "Asia",
                    colorIndex: getColor.get("Asia"),
                }, {
                    id: "Europe",
                    colorIndex: getColor.get("Europe"),
                }, {
                    id: "Latin America and the Caribbean",
                    colorIndex: getColor.get("Latin America and the Caribbean"),
                }, {
                    id: "Northern America",
                    colorIndex: getColor.get("Northern America"),
                }, {
                    id: "Oceania",
                    colorIndex: getColor.get("Oceania"),
                }, {
                    id: "Eastern Africa",
                    colorIndex: getColor.get("Eastern Africa")
                }, {
                    id: "Middle Africa",
                    colorIndex: getColor.get("Middle Africa")
                }, {
                    id: "Northern Africa",
                    colorIndex: getColor.get("Northern Africa")
                }, {
                    id: "Southern Africa",
                    colorIndex: getColor.get("Southern Africa")
                }, {
                    id: "Western Africa",
                    colorIndex: getColor.get("Western Africa")
                }, {
                    id: "Central Asia",
                    colorIndex: getColor.get("Central Asia")
                }, {
                    id: "Eastern Asia",
                    colorIndex: getColor.get("Eastern Asia")
                }, {
                    id: "Southern Asia",
                    colorIndex: getColor.get("Southern Asia")
                }, {
                    id: "South-Eastern Asia",
                    colorIndex: getColor.get("South-Eastern Asia")
                }, {
                    id: "Western Asia",
                    colorIndex: getColor.get("Western Asia")
                }, {
                    id: "Eastern Europe",
                    colorIndex: getColor.get("Eastern Europe")
                }, {
                    id: "Northern Europe",
                    colorIndex: getColor.get("Northern Europe")
                }, {
                    id: "Southern Europe",
                    colorIndex: getColor.get("Southern Europe")
                }, {
                    id: "Western Europe",
                    colorIndex: getColor.get("Western Europe")
                }, {
                    id: "Caribbean",
                    colorIndex: getColor.get("Caribbean")
                }, {
                    id: "Central America",
                    colorIndex: getColor.get("Central America")
                }, {
                    id: "South America",
                    colorIndex: getColor.get("South America")
                }]
            }],
        });

        // for some reason rearragnes the chart and its prettier
        chart.setSize();
        // Add a legend
        let chart_nodes:Worlddata.PointOptions[] = chart.series[0].nodes;
        let chart_points:Worlddata.PointOptions[] = chart.series[0].data;
        createLegend(chart_points, chart_nodes, container_class);

        // Dropdowns
        // Define dropdown container
        let filters:HTMLElement = document.querySelector(container_class + " .chart-filters")!;
        // Create a parameter dropdown
        let parameterName = "wheel-parameter";
        let parameterWidth = "150px";
        addDropdown(filters, parameterName, parameterWidth, parameterChange, ALL_PARAMETERS, parameter);

        // Update chart data on parameter change
        function parameterChange():void {
            parameter = (<HTMLSelectElement>document.getElementById(parameterName + "-select")).value;

            chart.series[0].setData(get_data());
            chart.setSize();

            chart_nodes = chart.series[0].nodes;
            chart_points = chart.series[0].data;
            createLegend(chart_points, chart_nodes, container_class);
        }
    })
    .catch(function (error:Error) {
        console.log(error);
    })