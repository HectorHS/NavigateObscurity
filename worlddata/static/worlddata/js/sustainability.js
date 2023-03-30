var sustain_map_path = "/static/worlddata/csv/sustainability-map.csv",
    sustain_area_path = "/static/worlddata/csv/sustainability-area.csv";

var sustainabilityMap = d3.csv(sustain_map_path)
    .then(function (data) {
        // All filterable options
        const all_measures = [...new Set(data.map(d => d.Measure))].sort()
        const all_areas = [...new Set(data.map(d => d.Area))].sort()
        const all_incomes = [...new Set(data.map(d => d.IncomeGroup))].sort()

        // Remove empty value and add an All option for the filter
        all_incomes.splice(0, 1);
        all_incomes.unshift("All");

        // Default values
        var measure = "Ecological deficit or reserve",
            area = "Total",
            income = "All";

        var container_class = ".sustain-map";
        var initial_data = [];

        function get_data() {
            var new_data = [];
            for (let row of data) {
                if (income == "All") {
                    if (row.Measure == measure && row.Area == area) {
                        new_data.push({ country: getCountryCode(row.Country), value: +row.Value });
                    }
                } else {
                    if (row.Measure == measure && row.Area == area && row.IncomeGroup == income) {
                        new_data.push({ country: getCountryCode(row.Country), value: +row.Value });
                    }
                }
            }
            return new_data;
        }

        intial_data = get_data();

        // Initiate the chart
        var chart = Highcharts.mapChart('sustain_map', {
            chart: {
                height: 500
            },
            title: {
                text: null
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
                    var title = fCapital(this.key);
                    var value = numberFormatter(this.point.value);
                    var text = "";
                    if (measure == "Biocapacity") {
                        text = value + " gha per person <br>With a global average of " + getBiocapacityAverage[area];
                    } else if (measure == "Ecological deficit or reserve") {
                        if (value > 0) {
                            text = value + " gha per person reserve (more biocapacity than consumption) <br>With a global average of " + getReserveAverage[area];
                        } else {
                            text = value + " gha per person deficit (more consumption than biocapacity) <br>With a global average of " + getReserveAverage[area];
                        }
                    } else if (measure == "Ecological footprint of consumption") {
                        text = value + " gha per person <br>With a global average of " + getConsumptionAverage[area];
                    }
                    return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
                },
                useHTML: true
            },
            series: [{
                mapData: Highcharts.maps['custom/world'],
                data: intial_data,
                joinBy: ['iso-a3', 'country'], // first var: type of geographical data, second: data column name
            }]
        });

        // Dropdowns
        // Define dropdown container
        var filters = document.querySelector(container_class + " .chart-filters");


        // Create a measure dropdown
        var measureName = "map-measure",
            measureWidth = "320px";
        addDropdown(filters, measureName, measureWidth, measureChange, all_measures, measure);

        // Update chart data on measure change
        function measureChange() {
            measure = document.getElementById(measureName + "-select").value;
            updateColorOrder();
            updateColorStops();
            chart.series[0].setData(get_data());
        }

        // Create a area dropdown
        var areaName = "map-area",
            areaWidth = "170px";
        addDropdown(filters, areaName, areaWidth, areaChange, all_areas, area);

        // Update chart data on area change
        function areaChange() {
            area = document.getElementById(areaName + "-select").value;
            updateColorStops();
            chart.series[0].setData(get_data());
        }

        // Create a income dropdown
        var incomeName = "map-income",
            incomeWidth = "50px";
        addDropdown(filters, incomeName, incomeWidth, incomeChange, all_incomes, income);

        // Update chart data on income change
        function incomeChange() {
            income = document.getElementById(incomeName + "-select").value;
            updateColorStops();
            chart.series[0].setData(get_data());
        }

        // To reverse color coding for biocapacity where larger numbers are better
        function updateColorOrder() {
            if (measure == "Biocapacity") {
                chart.colorAxis[0].update({
                    stops: [
                        [0, getIndexColor(30)],
                        [0.35, getIndexColor(9)],
                        [0.5, getIndexColor(52)],
                        [0.65, getIndexColor(23)],
                        [0.95, getIndexColor(3)]
                    ],
                }, false)
            } else if (measure == "Ecological deficit or reserve") {
                chart.colorAxis[0].update({
                    stops: [
                        [0, getIndexColor(30)],
                        [0.35, getIndexColor(9)],
                        [0.5, getIndexColor(52)],
                        [0.65, getIndexColor(23)],
                        [0.95, getIndexColor(3)]
                    ],
                }, false)
            } else if (measure == "Ecological footprint of consumption") {
                chart.colorAxis[0].update({
                    stops: [
                        [0, getIndexColor(3)],
                        [0.35, getIndexColor(23)],
                        [0.5, getIndexColor(52)],
                        [0.65, getIndexColor(9)],
                        [0.95, getIndexColor(30)]
                    ],
                }, false)
            }
        }

        // To better centre and distribute colors. Max is always double the average value.
        function updateColorStops() {

            if (measure == "Biocapacity") {
                if (area == "Total") {
                    chart.colorAxis[0].update({
                        tickInterval: 0.7,
                        max: 3.4,
                        min: 0,
                    }, false)
                } else if (area == "Built up land") {
                    chart.colorAxis[0].update({
                        tickInterval: 0.04,
                        max: 0.12,
                        min: 0,
                    }, false)
                } else if (area == "Cropland") {
                    chart.colorAxis[0].update({
                        tickInterval: 0.4,
                        max: 1.2,
                        min: 0,
                    }, false)
                } else if (area == "Fishing grounds") {
                    chart.colorAxis[0].update({
                        tickInterval: 0.1,
                        max: 0.3,
                        min: 0,
                    }, false)
                } else if (area == "Forest") {
                    chart.colorAxis[0].update({
                        tickInterval: 0.35,
                        max: 1.4,
                        min: 0,
                    }, false)
                } else if (area == "Grazing land") {
                    chart.colorAxis[0].update({
                        tickInterval: 0.1,
                        max: 0.4,
                        min: 0,
                    }, false)
                }
            } else if (measure == "Ecological deficit or reserve") {
                if (area == "Total") {
                    chart.colorAxis[0].update({
                        tickInterval: 2.5,
                        max: 5,
                        min: -5,
                    }, false)
                } else if (area == "Built up land") {
                } else if (area == "Cropland") {
                    chart.colorAxis[0].update({
                        tickInterval: 0.5,
                        max: 1,
                        min: -1,
                    }, false)
                } else if (area == "Fishing grounds") {
                    chart.colorAxis[0].update({
                        tickInterval: 0.5,
                        max: 1,
                        min: -1,
                    }, false)
                } else if (area == "Forest") {
                    chart.colorAxis[0].update({
                        tickInterval: 2.5,
                        max: 5,
                        min: -5,
                    }, false)
                } else if (area == "Grazing land") {
                    chart.colorAxis[0].update({
                        tickInterval: 0.5,
                        max: 1,
                        min: -1,
                    }, false)
                }
            } else if (measure == "Ecological footprint of consumption") {
                if (area == "Total") {
                    chart.colorAxis[0].update({
                        tickInterval: 1.4,
                        max: 5.6,
                        min: 0,
                    }, false)
                } else if (area == "Built up land") {
                    chart.colorAxis[0].update({
                        tickInterval: 0.04,
                        max: 0.12,
                        min: 0,
                    }, false)
                } else if (area == "Cropland") {
                    chart.colorAxis[0].update({
                        tickInterval: 0.30,
                        max: 1.2,
                        min: 0,
                    }, false)
                } else if (area == "Fishing grounds") {
                    chart.colorAxis[0].update({
                        tickInterval: 0.05,
                        max: 0.2,
                        min: 0,
                    }, false)
                } else if (area == "Forest") {
                    chart.colorAxis[0].update({
                        tickInterval: 1,
                        max: 4,
                        min: 0,
                    }, false)
                } else if (area == "Grazing land") {
                    chart.colorAxis[0].update({
                        tickInterval: 0.1,
                        max: 0.3,
                        min: 0,
                    }, false)
                }
            }
        }
        var getBiocapacityAverage = {
            'Total': '1.68',
            'Built up land': '0.06',
            'Cropland': '0.55',
            'Fishing grounds': '0.15',
            'Forest': '0.70',
            'Grazing land': '0.2'
        }
        var getReserveAverage = {
            'Total': '-1.15',
            'Built up land': '0',
            'Cropland': '0',
            'Fishing grounds': '0.06',
            'Forest': '-1.28',
            'Grazing land': '0.06'
        }
        var getConsumptionAverage = {
            'Total': '2.84',
            'Built up land': '0.06',
            'Cropland': '0.55',
            'Fishing grounds': '0.09',
            'Forest': '1.99',
            'Grazing land': '0.14'
        }
    })


    .catch(function (error) {
        console.log(error);
    })

var sustainabilityArea = d3.csv(sustain_area_path)
    .then(function (data) {
        // All filterable options
        const all_measures = [...new Set(data.map(d => d.record))].sort()
        const all_countries = [...new Set(data.map(d => d.country))].sort()
        const all_areas = [...new Set(data.map(d => d.area))].sort()
        const all_years = ["1961",
            "1962",
            "1963",
            "1964",
            "1965",
            "1966",
            "1967",
            "1968",
            "1969",
            "1970",
            "1971",
            "1972",
            "1973",
            "1974",
            "1975",
            "1976",
            "1977",
            "1978",
            "1979",
            "1980",
            "1981",
            "1982",
            "1983",
            "1984",
            "1985",
            "1986",
            "1987",
            "1988",
            "1989",
            "1990",
            "1991",
            "1992",
            "1993",
            "1994",
            "1995",
            "1996",
            "1997",
            "1998",
            "1999",
            "2000",
            "2001",
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014"];

        // Default values
        var measure = "Footprint of Consumption",
            country = "World";

        var container_class = ".sustain-area";
        var initial_data = [];

        function getBlankData() {
            return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }

        var getColor = {
            "Built up land": "50",
            "Crop land": "10",
            "Fishing grounds": "3",
            "Forest land": "25",
            "Grazing land": "20"
        };

        function get_data() {
            var new_data = [];
            for (let row of data) {
                if (row.record == measure && row.country == country) {
                    var year_data = [];
                    for (let ye in all_years) {
                        year_data[ye] = +row[all_years[ye]];
                    }
                    new_data.push({ id: row.area, name: row.area, data: year_data, colorIndex: getColor[row.area] })
                }
            }
            return new_data;
        }

        initial_data = get_data();

        var chart = Highcharts.chart('sustain_area', {
            chart: {
                type: 'area',
                height: 500
            },
            title: {
                text: null
            },
            xAxis: {
                categories: all_years,
                tickInterval: 5,
                title: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'Global Hectares (gha)'
                },
            },
            tooltip: {
                split: false,
                valueSuffix: ' millions'
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
                useHTML: true
            },
            series: initial_data,
            legend: {
                enabled: false
            }
        });

        chart_points = chart.series;
        var legend = createLegend(chart_points, chart_points, container_class);
        // Dropdowns
        // Define dropdown container
        var filters = document.querySelector(container_class + " .chart-filters");

        // Create a measure dropdown
        var measureName = "area-measure",
            measureWidth = "320px";
        addDropdown(filters, measureName, measureWidth, measureChange, all_measures, measure);

        // Update chart data on measure change
        function measureChange() {
            measure = document.getElementById(measureName + "-select").value;

            var loops = chart.series.length;
            var updated_data = get_data();

            chart.series[0].setVisible(false);
            // First empty the existing data
            for (var i = 0; i < loops; i++) {
                chart.series[0].remove(false);
            }
            // Then add the updated data
            for (var i = 0; i < updated_data.length; i++) {
                chart.addSeries(updated_data[i], false);
            }
            chart.series[0].setVisible(true, true);
        }

        // Create a country dropdown
        var countryName = "area-country",
            countryWidth = "320px";
        addDropdown(filters, countryName, countryWidth, countryChange, all_countries, country);


        // Update chart data on country change
        function countryChange() {
            country = document.getElementById(countryName + "-select").value;

            var loops = chart.series.length;
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
    })