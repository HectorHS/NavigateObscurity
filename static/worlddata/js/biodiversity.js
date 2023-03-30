var donut_path = "/static/worlddata/csv/biodiversity-pie.csv";
    scatter_path = "/static/worlddata/csv/biomass-scatter.csv";

    var pieChart = d3.csv(donut_path)
        .then(function (data) {

            // Get unique values for various columns of data
            const all_taxons = [...new Set(data.map(d => d.Taxon))].sort()
            const all_territories = [...new Set(data.map(d => d.Territory))].sort()
            const all_categories = [...new Set(data.map(d => d.Category))].sort()

            var defaultTaxon = "All";
            var defaultTerritory = "All";
            var taxon = defaultTaxon;
            var territory = defaultTerritory;

            var container_class = '.biomass-pie';

            function get_data() {
                var new_data = [];

                for (let row of data) {
                    if ((row.Taxon == taxon) && (row.Territory == territory)) {
                        new_data.push({ id: row.Category, name: row.Category, y: +row.Biomass, colorIndex: getColor[row.Category] });
                    }
                }
                return new_data;
            }

            initial_data = get_data();

            var chart = Highcharts.chart('pie_chart', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    height: 400
                },
                title: {
                    text: null
                },
                tooltip: {
                    formatter: function () {
                        var title = fCapital(this.key);
                        var sName = this.series.name;
                        var sValue = this.y;
                        var per = this.percentage.toFixed(1);

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
                            //format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
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
            chart_points = chart.series[0].data;
            createLegend(chart_points, chart_points, container_class);

            // Dropdowns
            // Define dropdown container
            var filters = document.querySelector(".chart-filters");

            // Create a taxon dropdown
            var taxonName = "taxon",
                taxonWidth = "100px";
            addDropdown(filters, taxonName, taxonWidth, taxonChange, all_taxons, taxon);

            // Update chart data on taxon change
            function taxonChange() {
                taxon = document.getElementById(taxonName + "-select").value;
                chart.series[0].setData(get_data());
                var legend_data = chart.series[0].data;
                createLegend(legend_data, legend_data, container_class);
            }

            // Create a territory dropdown
            var territoryName = "territory",
                territoryWidth = "250px";
            addDropdown(filters, territoryName, territoryWidth, territoryChange, all_territories, territory);

            // Update chart data on territory change
            function territoryChange() {
                territory = document.getElementById(territoryName + "-select").value;
                chart.series[0].setData(get_data());
                var legend_data = chart.series[0].data;
                createLegend(legend_data, legend_data, container_class);
            }
        })
        .catch(function (error) {
            console.log(error);
        })

    var scatterPlot = d3.csv(scatter_path)
        .then(function (data) {

            // Get unique values for various columns of data
            const all_categories = [...new Set(data.map(d => d.group))].sort()

            var container_class = '.biomass-scatter';

            function get_data() {
                var new_data = [];
                var i = 0;
                for (let row of data) {
                    new_data.push({ name: row.group, y: +row.Mass, x: +row.power, colorIndex: getColor[row.group] });
                    i += 1;
                }
                return new_data;
            }

            initial_data = get_data();

            var chart = Highcharts.chart('scatter_plot', {
                chart: {
                    type: 'scatter',
                    zoomType: 'xy',
                    height: 400
                },
                title: {
                    text: null
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
                        enabled: true,
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
                                var sName = fCapital(this.name);
                                var biomass = this.y;
                                var populance = this.x;

                                return '<text><span style="font-size:1.1em"><strong>' + sName + '</strong></span><br>Biomass: ' + biomass + 'gt <br> Population: 10<sup>' + populance + '</sup> organisms</text>';
                            },
                            useHTML: true
                        },
                        stickyTracking: false
                    }
                },
                series: [{
                    allowPointSelect: true,
                    data: initial_data,
                    showInLegend: false
                }],
            })

            chart_points = chart.series[0].data;
            createLegend(chart_points, chart_points, container_class);
        })
        .catch(function (error) {
            console.log(error);
        })

    // To keep colors consistent
    var getColor = {
        'Plants': '24',
        'Bacteria': '5',
        'Fungi': '0',
        'Archaea': '16',
        'Protists': '38',
        'Animals': '30',
        'Viruses': '12',
        'Fish': '3',
        'Livestock': '28',
        'Humans': '30',
        'Wild mammals': '9',
        'Wild birds': '1',
        'Arthropods': '17',
        'Annelids': '19',
        'Molluscs': '36',
        'Cnidarians': '23',
        'Nematodes': '40'
    };