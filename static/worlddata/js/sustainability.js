// helpers
import { fCapital, addDropdown, getCountryCode, numberFormatter, getIndexColor, createLegend } from "./chartHelper.js";
let sustain_map_path = "/static/worlddata/csv/sustainability-map.csv";
let sustain_area_path = "/static/worlddata/csv/sustainability-area.csv";
var sustainabilityMap = d3.csv(sustain_map_path)
    .then(function (data) {
    // All filterable options
    const ALL_MEASURES = [...new Set(data.map((d) => d.Measure))].sort();
    const ALL_AREAS = [...new Set(data.map((d) => d.Area))].sort();
    let all_inco = [...new Set(data.map((d) => d.IncomeGroup))].sort();
    // Remove empty value and add an All option for the filter
    all_inco.splice(0, 1);
    all_inco.unshift("All");
    const ALL_INCOMES = all_inco;
    // Default values
    let measure = "Ecological deficit or reserve";
    let area = "Total";
    let income = "All";
    let container_class = ".sustain-map";
    let initial_data = [];
    function get_data() {
        let new_data = [];
        for (let row of data) {
            if (income == "All") {
                if (row.Measure == measure && row.Area == area) {
                    new_data.push({ country: getCountryCode(row.Country), value: +row.Value });
                }
            }
            else {
                if (row.Measure == measure && row.Area == area && row.IncomeGroup == income) {
                    new_data.push({ country: getCountryCode(row.Country), value: +row.Value });
                }
            }
        }
        return new_data;
    }
    initial_data = get_data();
    // Initiate the chart
    let chart = Highcharts.mapChart({
        chart: {
            height: 500,
            renderTo: 'sustain_map',
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
            tickInterval: 2.5,
            max: 5,
            min: -5,
            stops: [
                [0, getIndexColor(30)],
                [0.35, getIndexColor(9)],
                [0.5, getIndexColor(52)],
                [0.65, getIndexColor(23)],
                [0.95, getIndexColor(3)]
            ],
        },
        tooltip: {
            formatter: function () {
                let title = fCapital(this.key);
                let val = this.point.value;
                let value = numberFormatter(val);
                let text = "";
                if (measure == "Biocapacity") {
                    text = value + " gha per person <br>With a global average of " + getBiocapacityAverage.get(area);
                }
                else if (measure == "Ecological deficit or reserve") {
                    if (val > 0) {
                        text = value + " gha per person reserve (more biocapacity than consumption) <br>With a global average of " + getReserveAverage.get(area);
                    }
                    else {
                        text = value + " gha per person deficit (more consumption than biocapacity) <br>With a global average of " + getReserveAverage.get(area);
                    }
                }
                else if (measure == "Ecological footprint of consumption") {
                    text = value + " gha per person <br>With a global average of " + getConsumptionAverage.get(area);
                }
                return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
            },
            useHTML: true
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
    let filters = document.querySelector(container_class + " .chart-filters");
    // Create a measure dropdown
    let measureName = "map-measure";
    let measureWidth = "320px";
    addDropdown(filters, measureName, measureWidth, measureChange, ALL_MEASURES, measure);
    // Update chart data on measure change
    function measureChange() {
        measure = document.getElementById(measureName + "-select").value;
        updateColorAxis();
        chart.series[0].setData(get_data());
    }
    // Create a area dropdown
    let areaName = "map-area";
    let areaWidth = "170px";
    addDropdown(filters, areaName, areaWidth, areaChange, ALL_AREAS, area);
    // Update chart data on area change
    function areaChange() {
        area = document.getElementById(areaName + "-select").value;
        updateColorAxis();
        chart.series[0].setData(get_data());
    }
    // Create a income dropdown
    let incomeName = "map-income";
    let incomeWidth = "150px";
    addDropdown(filters, incomeName, incomeWidth, incomeChange, ALL_INCOMES, income);
    // Update chart data on income change
    function incomeChange() {
        income = document.getElementById(incomeName + "-select").value;
        updateColorAxis();
        chart.series[0].setData(get_data());
    }
    // To reverse color coding for biocapacity where larger numbers are better
    // And to better centre and distribute colors. Max is always double the average value.
    function updateColorAxis() {
        let updatedColorAxis = {};
        if (measure == "Biocapacity") {
            updatedColorAxis = {
                stops: [
                    [0, getIndexColor(30)],
                    [0.35, getIndexColor(9)],
                    [0.5, getIndexColor(52)],
                    [0.65, getIndexColor(23)],
                    [0.95, getIndexColor(3)]
                ],
                min: 0
            };
            if (area == "Total") {
                updatedColorAxis.tickInterval = 0.7;
                updatedColorAxis.max = 3.4;
            }
            else if (area == "Built up land") {
                updatedColorAxis.tickInterval = 0.04;
                updatedColorAxis.max = 0.12;
            }
            else if (area == "Cropland") {
                updatedColorAxis.tickInterval = 0.4;
                updatedColorAxis.max = 1.2;
            }
            else if (area == "Fishing grounds") {
                updatedColorAxis.tickInterval = 0.1;
                updatedColorAxis.max = 0.3;
            }
            else if (area == "Forest") {
                updatedColorAxis.tickInterval = 0.35;
                updatedColorAxis.max = 1.4;
            }
            else if (area == "Grazing land") {
                updatedColorAxis.tickInterval = 0.1;
                updatedColorAxis.max = 0.4;
            }
        }
        else if (measure == "Ecological deficit or reserve") {
            updatedColorAxis = {
                stops: [
                    [0, getIndexColor(30)],
                    [0.35, getIndexColor(9)],
                    [0.5, getIndexColor(52)],
                    [0.65, getIndexColor(23)],
                    [0.95, getIndexColor(3)]
                ],
            };
            if (area == "Total" || area == "Forest") {
                updatedColorAxis.tickInterval = 2.5;
                updatedColorAxis.max = 5;
                updatedColorAxis.min = -5;
            }
            else if (area == "Built up land") {
                updatedColorAxis.tickInterval = 0;
                updatedColorAxis.max = 0;
                updatedColorAxis.min = 0;
            }
            else if (area == "Cropland" || area == "Fishing grounds" || area == "Grazing land") {
                updatedColorAxis.tickInterval = 0.5;
                updatedColorAxis.max = 1;
                updatedColorAxis.min = -1;
            }
        }
        else if (measure == "Ecological footprint of consumption") {
            updatedColorAxis = {
                stops: [
                    [0, getIndexColor(3)],
                    [0.35, getIndexColor(23)],
                    [0.5, getIndexColor(52)],
                    [0.65, getIndexColor(9)],
                    [0.95, getIndexColor(30)]
                ],
                min: 0,
            };
            if (area == "Total") {
                updatedColorAxis.tickInterval = 1.4;
                updatedColorAxis.max = 5.6;
            }
            else if (area == "Built up land") {
                updatedColorAxis.tickInterval = 0.04;
                updatedColorAxis.max = 0.12;
            }
            else if (area == "Cropland") {
                updatedColorAxis.tickInterval = 0.30;
                updatedColorAxis.max = 1.2;
            }
            else if (area == "Fishing grounds") {
                updatedColorAxis.tickInterval = 0.05;
                updatedColorAxis.max = 0.2;
            }
            else if (area == "Forest") {
                updatedColorAxis.tickInterval = 1;
                updatedColorAxis.max = 4;
            }
            else if (area == "Grazing land") {
                updatedColorAxis.tickInterval = 0.1;
                updatedColorAxis.max = 0.3;
            }
        }
        chart.update({
            colorAxis: updatedColorAxis,
        }, false);
    }
    let getBiocapacityAverage = new Map();
    getBiocapacityAverage.set('Total', '1.68');
    getBiocapacityAverage.set('Built up land', '0.06');
    getBiocapacityAverage.set('Cropland', '0.55');
    getBiocapacityAverage.set('Fishing grounds', '0.15');
    getBiocapacityAverage.set('Forest', '0.70');
    getBiocapacityAverage.set('Grazing land', '0.2');
    let getReserveAverage = new Map();
    getReserveAverage.set('Total', '-1.15');
    getReserveAverage.set('Built up land', '0');
    getReserveAverage.set('Cropland', '0');
    getReserveAverage.set('Fishing grounds', '0.06');
    getReserveAverage.set('Forest', '-1.28');
    getReserveAverage.set('Grazing land', '0.06');
    let getConsumptionAverage = new Map();
    getConsumptionAverage.set('Total', '2.84');
    getConsumptionAverage.set('Built up land', '0.06');
    getConsumptionAverage.set('Cropland', '0.55');
    getConsumptionAverage.set('Fishing grounds', '0.09');
    getConsumptionAverage.set('Forest', '1.99');
    getConsumptionAverage.set('Grazing land', '0.14');
})
    .catch(function (error) {
    console.log(error);
});
let sustainabilityArea = d3.csv(sustain_area_path)
    .then(function (data) {
    // All filterable options
    const ALL_MEASURES = [...new Set(data.map((d) => d.record))].sort();
    const ALL_COUNTRIES = [...new Set(data.map((d) => d.country))].sort();
    let all_years = data.columns;
    all_years.splice(0, 3);
    // Default values
    let measure = "Footprint of Consumption";
    let country = "World";
    let container_class = ".sustain-area";
    let initial_data = [];
    let getColor = new Map();
    getColor.set('Built up land', 50);
    getColor.set("Crop land", 10);
    getColor.set("Fishing grounds", 3);
    getColor.set("Forest land", 25);
    getColor.set("Grazing land", 20);
    function get_data() {
        let new_data = [];
        for (let row of data) {
            if (row.record == measure && row.country == country) {
                let year_data = [];
                for (let ye in all_years) {
                    year_data[ye] = +row[all_years[ye]];
                }
                new_data.push({ type: 'area', id: row.area, name: row.area, data: year_data, colorIndex: getColor.get(row.area) });
            }
        }
        return new_data;
    }
    initial_data = get_data();
    var chart = Highcharts.chart({
        chart: {
            type: 'area',
            height: 500,
            renderTo: 'sustain_area'
        },
        title: {
            text: undefined
        },
        xAxis: {
            categories: all_years,
            tickInterval: 5,
            title: {
                text: undefined
            }
        },
        yAxis: {
            title: {
                text: 'Global Hectares (gha)'
            },
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                findNearestPointBy: 'xy',
                fillOpacity: 0.8,
                marker: {
                    enabled: false,
                },
                trackByArea: true
            },
        },
        tooltip: {
            formatter: function () {
                var title = fCapital(this.key);
                var value = numberFormatter(this.y);
                var area = fCapital(this.series.name);
                return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + area + ": " + value + ' gha</text>';
            },
            useHTML: true,
            split: false,
        },
        series: initial_data,
        legend: {
            enabled: false
        }
    });
    let chart_points = chart.series;
    createLegend(chart_points, chart_points, container_class);
    // Dropdowns
    // Define dropdown container
    let filters = document.querySelector(container_class + " .chart-filters");
    // Create a measure dropdown
    var measureName = "area-measure";
    let measureWidth = "320px";
    addDropdown(filters, measureName, measureWidth, measureChange, ALL_MEASURES, measure);
    // Update chart data on measure change
    function measureChange() {
        measure = document.getElementById(measureName + "-select").value;
        updateData();
    }
    // Create a country dropdown
    let countryName = "area-country";
    let countryWidth = "320px";
    addDropdown(filters, countryName, countryWidth, countryChange, ALL_COUNTRIES, country);
    // Update chart data on country change
    function countryChange() {
        country = document.getElementById(countryName + "-select").value;
        updateData();
    }
    function updateData() {
        let loops = chart.series.length;
        var updated_data = get_data();
        // First empty the existing data
        for (var i = 0; i < loops; i++) {
            chart.series[0].remove(false);
        }
        // Then add the updated data
        for (var i = 0; i < updated_data.length; i++) {
            chart.addSeries(updated_data[i], false);
        }
        chart.redraw();
    }
})
    .catch(function (error) {
    console.log(error);
});
