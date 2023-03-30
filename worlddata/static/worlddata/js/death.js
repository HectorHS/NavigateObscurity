var life_map_path = "/static/worlddata/csv/life-map.csv";
old_death_path = "/static/worlddata/csv/death-old.csv";
death_causes_path = "/static/worlddata/csv/death-causes.csv";
death_locations_path = "/static/worlddata/csv/death-locations.csv";
death_risks_path = "/static/worlddata/csv/death-risks.csv";
death_causes_percent_path = "/static/worlddata/csv/death-causes-percent.csv";
death_top_causes_path = "/static/worlddata/csv/death-top-causes.csv";

var LifeMap = d3.csv(life_map_path)
    .then(function (data) {
        // All filterable options
        const all_parameters = [...new Set(data.map(d => d.Parameter))].sort();
        const all_years = [...new Set(data.map(d => d.Year))].sort();
        const all_locations = ["Afghanistan",
            "Albania",
            "Algeria",
            "American Samoa",
            "Andorra",
            "Angola",
            "Anguilla",
            "Antigua and Barbuda",
            "Argentina",
            "Armenia",
            "Aruba",
            "Australia",
            "Austria",
            "Azerbaijan",
            "Bahamas",
            "Bahrain",
            "Bangladesh",
            "Barbados",
            "Belarus",
            "Belgium",
            "Belize",
            "Benin",
            "Bermuda",
            "Bhutan",
            "Bolivia (Plurinational State of)",
            "Bonaire, Sint Eustatius and Saba",
            "Bosnia and Herzegovina",
            "Botswana",
            "Brazil",
            "British Virgin Islands",
            "Brunei Darussalam",
            "Bulgaria",
            "Burkina Faso",
            "Burundi",
            "Cabo Verde",
            "Cambodia",
            "Cameroon",
            "Canada",
            "Cayman Islands",
            "Central African Republic",
            "Chad",
            "Channel Islands",
            "Chile",
            "China",
            "China, Hong Kong SAR",
            "China, Macao SAR",
            "China, Taiwan Province of China",
            "Colombia",
            "Comoros",
            "Congo",
            "Cook Islands",
            "Costa Rica",
            "Cote d'Ivoire",
            "Croatia",
            "Cuba",
            "Curacao",
            "Cyprus",
            "Czechia",
            "Dem. People's Republic of Korea",
            "Democratic Republic of the Congo",
            "Denmark",
            "Djibouti",
            "Dominica",
            "Dominican Republic",
            "Ecuador",
            "Egypt",
            "El Salvador",
            "Equatorial Guinea",
            "Eritrea",
            "Estonia",
            "Eswatini",
            "Ethiopia",
            "Falkland Islands (Malvinas)",
            "Faroe Islands",
            "Fiji",
            "Finland",
            "France",
            "French Guiana",
            "French Polynesia",
            "Gabon",
            "Gambia",
            "Georgia",
            "Germany",
            "Ghana",
            "Gibraltar",
            "Greece",
            "Greenland",
            "Grenada",
            "Guadeloupe",
            "Guam",
            "Guatemala",
            "Guinea",
            "Guinea-Bissau",
            "Guyana",
            "Haiti",
            "Holy See",
            "Honduras",
            "Hungary",
            "Iceland",
            "India",
            "Indonesia",
            "Iran (Islamic Republic of)",
            "Iraq",
            "Ireland",
            "Isle of Man",
            "Israel",
            "Italy",
            "Jamaica",
            "Japan",
            "Jordan",
            "Kazakhstan",
            "Kenya",
            "Kiribati",
            "Kuwait",
            "Kyrgyzstan",
            "Lao People's Democratic Republic",
            "Latvia",
            "Lebanon",
            "Lesotho",
            "Liberia",
            "Libya",
            "Liechtenstein",
            "Lithuania",
            "Luxembourg",
            "Madagascar",
            "Malawi",
            "Malaysia",
            "Maldives",
            "Mali",
            "Malta",
            "Marshall Islands",
            "Martinique",
            "Mauritania",
            "Mauritius",
            "Mayotte",
            "Mexico",
            "Micronesia (Fed. States of)",
            "Monaco",
            "Mongolia",
            "Montenegro",
            "Montserrat",
            "Morocco",
            "Mozambique",
            "Myanmar",
            "Namibia",
            "Nauru",
            "Nepal",
            "Netherlands",
            "New Caledonia",
            "New Zealand",
            "Nicaragua",
            "Niger",
            "Nigeria",
            "Niue",
            "North Macedonia",
            "Northern Mariana Islands",
            "Norway",
            "Oman",
            "Pakistan",
            "Palau",
            "Panama",
            "Papua New Guinea",
            "Paraguay",
            "Peru",
            "Philippines",
            "Poland",
            "Portugal",
            "Puerto Rico",
            "Qatar",
            "Republic of Korea",
            "Republic of Moldova",
            "Reunion",
            "Romania",
            "Russian Federation",
            "Rwanda",
            "Saint Barthelemy",
            "Saint Helena",
            "Saint Kitts and Nevis",
            "Saint Lucia",
            "Saint Martin (French part)",
            "Saint Pierre and Miquelon",
            "Saint Vincent and the Grenadines",
            "Samoa",
            "San Marino",
            "Sao Tome and Principe",
            "Saudi Arabia",
            "Senegal",
            "Serbia",
            "Seychelles",
            "Sierra Leone",
            "Singapore",
            "Sint Maarten (Dutch part)",
            "Slovakia",
            "Slovenia",
            "Solomon Islands",
            "Somalia",
            "South Africa",
            "South Sudan",
            "Spain",
            "Sri Lanka",
            "State of Palestine",
            "Sudan",
            "Suriname",
            "Sweden",
            "Switzerland",
            "Syrian Arab Republic",
            "Tajikistan",
            "Thailand",
            "Timor-Leste",
            "Togo",
            "Tokelau",
            "Tonga",
            "Trinidad and Tobago",
            "Tunisia",
            "Turkey",
            "Turkmenistan",
            "Turks and Caicos Islands",
            "Tuvalu",
            "Uganda",
            "Ukraine",
            "United Arab Emirates",
            "United Kingdom",
            "United Republic of Tanzania",
            "United States Virgin Islands",
            "United States of America",
            "Uruguay",
            "Uzbekistan",
            "Vanuatu",
            "Venezuela (Bolivarian Republic of)",
            "Viet Nam",
            "Wallis and Futuna Islands",
            "Western Sahara",
            "Yemen",
            "Zambia",
            "Zimbabwe",
        ];

        // Default values
        var parameter = "Life expectancy",
            year = "2020";

        var container_class = ".life-map";
        var initial_data = [];

        function get_data() {
            var new_data = [];
            for (let row of data) {
                if (row.Parameter == parameter && row.Year == year) {
                    for (loc of all_locations) {
                        if (row[loc]) {
                            new_data.push({ country: getCountryCode(loc), value: +row[loc] });
                        }
                    }
                }
            }
            return new_data;
        }

        intial_data = get_data();

        // Initiate the chart
        var chart = Highcharts.mapChart('life_map', {
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
                tickInterval: 10,
                max: 80,
                min: 30,
                stops: [
                    [0, '#0070D1'],
                    [0.35, '#23CA23'],
                    [0.5, '#DDDDDD'],
                    [0.65, '#FFFF1A'],
                    [0.95, '#E63333']
                ],
            },
            tooltip: {
                formatter: function () {
                    var title = fCapital(this.key);
                    var value = this.point.value;
                    var text = "";
                    if (parameter == "Fertility rate") {
                        let val = numberFormatter(value);
                        text = val + " births per woman";
                    } else if (parameter == "Life expectancy") {
                        text = "Life expectancy at birth is " + value + " years";
                    } else if (parameter == "Median age") {
                        let val = numberFormatter(value);
                        text = "Median age of the whole population is " + val + " years old";
                    } else if (parameter == "Mortality percentage") {
                        let val = numberFormatter(value);
                        text = "Total amount of deaths this year amounts to " + val + "% of the total population";
                    } else if (parameter == "Population") {
                        let val = numberFormatter(value);
                        text = "Total population of the country is " + val;
                    } else if (parameter == "Population density") {
                        text = value + " people living per square kilometer";
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

        // Create a parameter dropdown
        var parameterName = "life-map-parameter",
            parameterWidth = "300px";
        addDropdown(filters, parameterName, parameterWidth, parameterChange, all_parameters, parameter);

        // Update chart data on cause change
        function parameterChange() {
            parameter = document.getElementById(parameterName + "-select").value;
            updateColorStops();
            chart.series[0].setData(get_data());
        }
        // Create a year dropdown
        var yearName = "life-map-year",
            yearWidth = "100px";
        addDropdown(filters, yearName, yearWidth, yearChange, all_years, year);

        // Update chart data on sex change
        function yearChange() {
            year = document.getElementById(yearName + "-select").value;
            updateColorStops();
            chart.series[0].setData(get_data());
        }
        // adjust color stops according to parameter
        function updateColorStops() {
            if (parameter == "Fertility rate") {
                chart.colorAxis[0].update({
                    tickInterval: 1,
                    max: 3,
                    min: 1,
                }, false)
            } else if (parameter == "Life expectancy") {
                chart.colorAxis[0].update({
                    tickInterval: 10,
                    max: 80,
                    min: 30,
                }, false)
            } else if (parameter == "Median age") {
                chart.colorAxis[0].update({
                    tickInterval: 15,
                    max: 45,
                    min: 15,
                }, false)
            } else if (parameter == "Mortality percentage") {
                chart.colorAxis[0].update({
                    tickInterval: 0.5,
                    max: 2.25,
                    min: 0.25,
                }, false)
            } else if (parameter == "Population") {
                chart.colorAxis[0].update({
                    // tickInterval: 200000000,
                    // startOnTick: false,
                    max: 500000000,
                    min: 1000000,
                }, false)
            } else if (parameter == "Population density") {
                chart.colorAxis[0].update({
                    tickInterval: 200,
                    max: 400,
                    min: 0,
                }, false)
            }
        }


    })
    .catch(function (error) {
        console.log(error);
    })

var DeathDash = Promise.all([
    d3.csv(death_causes_path),
    d3.csv(death_locations_path),
    d3.csv(death_causes_percent_path),
    d3.csv(death_top_causes_path),
    d3.csv(death_risks_path),
]).then(function (files) {
    // All filterable options
    // const all_measures = [...new Set(data.map(d => d.measure))].sort()
    const all_locations = [...new Set(files[1].map(d => d.Location))].sort();
    const all_sexes = [...new Set(files[0].map(d => d.sex))].sort();
    const all_ages = [...new Set(files[0].map(d => d.age))].sort();
    const all_causes = [...new Set(files[0].map(d => d.cause))].sort();
    const all_main_causes = [...new Set(files[2].map(d => d.cause))].sort();

    //Default values for filters
    var location = "Global",
        innerLocation = "Global",
        sex = "Both",
        age = "All ages",
        cause = "All causes";

    var container_class = ".death-tree";
    var initial_data = [];
    var pyramid_categories = [
        '0 to 9', '10 to 19', '20 to 29', '30 to 39',
        '40 to 49', '50 to 59', '60 to 69', '70 to 79', '80 to 89',
        '90+'
    ];
    let causeElement = document.getElementById("death-dashboard-cause");
    let locationElement = document.getElementById("death-dashboard-location");
    let ageElement = document.getElementById("death-dashboard-age");
    let sexElement = document.getElementById("death-dashboard-sex");
    let radioElements = document.getElementsByClassName('sex-radio');

    // setting reseting click events
    document.getElementById("resetCause").addEventListener("click", resetCause);
    document.getElementById("resetLocation").addEventListener("click", resetLocation);
    document.getElementById("resetAge").addEventListener("click", resetAge);
    document.getElementById("resetSex").addEventListener("click", resetSex);
    for (var i = 0; i < radioElements.length; i++) {
        radioElements[i].onchange = sexRadioChange;
    }

    function sexRadioChange() {
        sex = document.querySelector('input[name="sex-radio"]:checked').value;
        updateSex();
        treemap_data_update();
        bubbles_data_update();
        map_data_update();
    }

    function get_treemap_data() {
        var new_data = [];
        for (let row of files[0]) {
            if (row.age == age && row.sex == sex && row.cause != "All causes") {
                let cause = row.cause;

                let parent = getCauseParent[cause];
                if (parent == undefined) {
                    parent = "";
                }

                if (parent == "") {
                    new_data.push({ id: cause, name: cause, value: +row[innerLocation], colorIndex: getColor[cause] });
                } else {
                    new_data.push({ id: cause, name: cause, parent: parent, value: +row[innerLocation] });
                }
            }
        }
        return new_data;
    }
    function get_map_data() {
        var new_data = [];
        let new_series = [];
        if (cause == "All causes") {
            data_values = [];
            data_locs = [];
            for (caus of all_main_causes) {
                for (let row of files[3]) {
                    if (row.cause == caus && row.sex == sex && row.age == age && row.location != "Global") {
                        new_data.push({ country: getCountryCode(row.location), value: +row.value, originalName: row.location })
                    }
                }
                if (new_data.length > 0) {
                    let slice = { data: new_data, name: caus, colorIndex: getColor[caus], showInLegend: false }
                    new_series.push(slice);
                    new_data = [];
                }

            }
        } else {
            for (let row of files[2]) {
                if (row.age == age && row.sex == sex && row.cause == cause && row.location != "Global") {
                    for (loc of all_locations) {
                        new_data.push({ country: getCountryCode(loc), value: +row[loc], originalName: loc });
                    }
                }
            }
            let series = { data: new_data, name: cause }
            new_series.push(series);
        }
        return new_series;
    }
    function get_pyramid_slice_data(sex) {
        let zero = 0;
        let ten = 0;
        let twenty = 0;
        let thirty = 0;
        let forty = 0;
        let fifty = 0;
        let sixty = 0;
        let seventy = 0;
        let eighty = 0;
        let ninety = 0;

        for (let row of files[0]) {
            if (row.sex == sex && row.cause == cause) {
                if (row.age == "0 to 9") {
                    zero = +row[innerLocation];
                } else if (row.age == "10 to 19") {
                    ten = +row[innerLocation];
                } else if (row.age == "20 to 29") {
                    twenty = +row[innerLocation];
                } else if (row.age == "30 to 39") {
                    thirty = +row[innerLocation];
                } else if (row.age == "40 to 49") {
                    forty = +row[innerLocation];
                } else if (row.age == "50 to 59") {
                    fifty = +row[innerLocation];
                } else if (row.age == "60 to 69") {
                    sixty = +row[innerLocation];
                } else if (row.age == "70 to 79") {
                    seventy = +row[innerLocation];
                } else if (row.age == "80 to 89") {
                    eighty = +row[innerLocation];
                } else if (row.age == "90+") {
                    ninety = +row[innerLocation];
                }
            }
        }
        let data = [];
        data.push(zero);
        data.push(ten);
        data.push(twenty);
        data.push(thirty);
        data.push(forty);
        data.push(fifty);
        data.push(sixty);
        data.push(seventy);
        data.push(eighty);
        data.push(ninety);

        let total = 0;
        for (let d of data) {
            total = total + d;
        }
        let dataPC = [];
        for (let d of data) {
            dataPC.push(+numberFormatter(d / total * 100));
        }

        // make values negative for male
        if (sex == "Male") {
            for (let i = 0; i < dataPC.length; i++) {
                dataPC[i] = dataPC[i] * -1;
            }
        }
        let new_data = [];
        for (let i = 0; i < dataPC.length; i++) {
            let dv = { y: dataPC[i], totalValue: data[i] }
            new_data.push(dv);
        }

        return new_data;
    }
    function treemap_data_update() {
        let updated_treemap_data = get_treemap_data();

        treemap_chart.series[0].setData(updated_treemap_data);

        setTreemapTitle();
        treemap_chart.setSize();
    }
    function pyramid_data_update() {
        let updated_pyramid_male_data = get_pyramid_slice_data("Male");
        let updated_pyramid_female_data = get_pyramid_slice_data("Female");

        pyramid_chart.series[0].setData(updated_pyramid_male_data);
        pyramid_chart.series[1].setData(updated_pyramid_female_data);

        pyramid_chart.setSize();
        setPyramidTitle();
    }
    function map_data_update(col) {
        let updatedMapData = get_map_data();
        let color = map_chart.colorAxis[0].options.maxColor;

        if (cause == "All causes") {
            map_chart.update({
                plotOptions: { map: { colorAxis: false } }
            }, false);
            map_chart.update({
                colorAxis: { visible: false }
            }, false);
        } else {
            if (col) {
                color = col;
            }
            map_chart.update({
                plotOptions: { map: { colorAxis: 0 } }
            }, false);
            map_chart.update({
                colorAxis: { maxColor: color, visible: true, max: +getCauseMaxValue[cause] }
            }, false);
        }

        // remove old series
        let loops = map_chart.series.length;
        for (var i = 0; i < loops; i++) {
            map_chart.series[0].remove(false);
        }

        // then add new ones
        for (var i = 0; i < updatedMapData.length; i++) {
            map_chart.addSeries(updatedMapData[i], false);
        }

        map_chart.redraw();
        map_chart.reflow();
        highlightCountry();
        setMapTitle();
    }
    function get_bubbles_data() {

        var new_data = [],
            total_risks = 0;
        for (let row of files[4]) {
            if (cause == row.cause && age == row.age && sex == row.sex) {
                // new_data.push({ id: row.rei, name: row.rei, absolute: +row[location], value: 0, colorIndex: getColor[row.rei] });
                new_data.push({ id: row.rei, name: row.rei, value: +row[innerLocation], colorIndex: getColor[row.rei] });

            }
        }

        return new_data;
    }
    function bubbles_data_update() {
        let updated_bubble_data = get_bubbles_data();

        // remove old series
        bubbles_chart.series[0].setData(updated_bubble_data);
        setBubblesTitle();
    }

    intial_treemap_data = get_treemap_data();
    initial_map_data = get_map_data();
    initial_pyramid_male_data = get_pyramid_slice_data("Male");
    initial_pyramid_female_data = get_pyramid_slice_data("Female");
    initial_bubbles_data = get_bubbles_data();
    setMapTitle();
    setBubblesTitle();

    // Initiate the charts
    let treemap_chart = Highcharts.chart('death_tree', {
        chart: {
            type: 'treemap',
            margin: 0
        },
        title: {
            text: null
        },
        tooltip: {
            formatter: function () {
                var title = fCapital(this.key);
                var deaths = numberFormatter(this.point.value);
                var perc = this.point.value / this.series.tree.val * 100;
                var per = numberFormatter(perc);
                return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>Total number of deaths: ' + deaths + '<br> Share of deaths: ' + per + '%</text>';
            },
            useHTML: true
        },
        xAxis: {
            visible: false,

        },
        plotOptions: {
            treemap: {
                dataLabels: {
                    formatter: function () {
                        var boxWidth = this.point.shapeArgs.width;
                        var boxHeight = this.point.shapeArgs.height;
                        var maxLineHeight = (Math.floor(boxHeight / 20)) - 1;
                        var maxLineLength = boxWidth / 8;
                        var nameParts = this.point.name.split(" ");
                        var name = [];
                        var newLine = "";
                        var oldLine = "";
                        var i = 0;
                        var words = 0;
                        for (var n in nameParts) {
                            i = +1;
                            // If we have reached the line number (height) limit,
                            // try to append ... dots on remaining name element
                            // and break the for loop
                            if (name.length == maxLineHeight) {
                                newLine = oldLine.concat("...");
                                if (newLine.length > maxLineLength) {
                                    newLine = "..."
                                }
                                oldLine = newLine;
                                break;
                            } else {
                                // We keep adding name elements until we hit the width limit
                                newLine = oldLine.concat(nameParts[n]).concat(" ");
                                if (newLine.length > maxLineLength) {
                                    // once we hit the limit, we add previous name that was 
                                    // still under limit
                                    name.push(oldLine);
                                    // We replace so that we don't lose current element on next loop
                                    oldLine = nameParts[n].concat(" ");
                                    // There is a chance that the current element is too large and cannot 
                                    // be displayed on its own. In such cases we just want to return ... 
                                    // and exit the loop
                                    if (oldLine.length > maxLineLength) {
                                        oldLine = ("...");
                                        break;
                                    }
                                } else {
                                    // if limit is not hit, newline becomes the oldline
                                    oldLine = newLine;
                                }
                            }
                        }
                        name.push(oldLine);
                        return name.join("<br/>");
                    },
                    padding: 0
                },
                levels: [{
                    level: 1,
                    colorKey: 'colorValue',
                }]
            },
            series: {
                events: {
                    click: function (e) {
                        if (e.point.node.level < 2) {
                            cause = e.point.name;
                            location = "Global";
                            innerLocation = "Global";
                            causeElement.innerHTML = cause;
                            locationElement.innerHTML = location;
                            let color = getIndexColor(getMapColor[cause]);
                            pyramid_data_update();
                            bubbles_data_update();
                            map_data_update(color);
                        }
                        return true;
                    },
                    setRootNode: function (e) {
                        if (e.trigger == "traverseUpButton") {
                            cause = "All causes";
                            causeElement.innerHTML = cause;
                            pyramid_data_update();
                            bubbles_data_update();
                            map_data_update();
                        } else {
                            setTreemapTitle();
                        }
                    }
                }
            }
        },
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            allowTraversingTree: true,
            animationLimit: 1000,
            dataLabels: {
                enabled: false,
            },
            levelIsConstant: false,
            levels: [{
                level: 1,
                dataLabels: {
                    enabled: true,
                }
            }],
            data: intial_treemap_data
        }],
    });
    let map_chart = Highcharts.mapChart('death_map', {
        chart: {
            events: {
                click: function (e) {
                    location = "Global";
                    innerLocation = "Global";
                    locationElement.innerHTML = location;
                    highlightCountry();
                    treemap_data_update();
                    pyramid_data_update();
                    bubbles_data_update();
                }
            }
        },
        title: {
            text: null
        },
        mapNavigation: {
            enabled: true,
            enableMouseWheelZoom: false,
            enableButtons: true,
        },
        plotOptions: {
            map: {
                allAreas: false,
                joinBy: ['iso-a3', 'country'],
                colorAxis: false
            },
            series: {
                events: {
                    click: function (e) {
                        location = e.point.name;
                        innerLocation = e.point.originalName;
                        locationElement.innerHTML = location;
                        highlightCountry();
                        treemap_data_update();
                        pyramid_data_update();
                        bubbles_data_update();
                    }
                },
                mapData: Highcharts.maps['custom/world'],
                joinBy: ['iso-a3', 'country']
            }
        },
        colorAxis: {
            minColor: '#222a2a',
            maxColor: '#E63333',
            visible: false
        },
        tooltip: {
            formatter: function () {
                var title = fCapital(this.key);
                var per = numberFormatter(this.point.value);
                if (cause == "All causes") {
                    return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>Top cause of death: ' + this.series.name + '<br>Percentage of total deaths: ' + per + '%</text>';
                } else {
                    return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>Percentage of total deaths: ' + per + '%</text>';
                }
            },
            useHTML: true
        },
        series: initial_map_data,
        legend: {
            enabled: true
        }
    });
    let pyramid_chart = Highcharts.chart('death_pyramid', {
        chart: {
            type: 'bar',
            events: {
                click: function () {
                    age = this.hoverPoint.category;
                    ageElement.innerHTML = age;

                    setPyramidBands();
                    treemap_data_update();
                    bubbles_data_update();
                    map_data_update();
                }
            }
        },
        title: {
            text: null
        },
        xAxis: [{
            categories: pyramid_categories,
            reversed: true,
            plotBands: [],
            labels: {
                step: 1,
            },
            accessibility: {
                description: 'Age (male)'
            },

        }, { // mirror axis on right side
            opposite: true,
            reversed: true,
            categories: pyramid_categories,
            linkedTo: 0,
            labels: {
                step: 1,
            },
            accessibility: {
                description: 'Age (female)'
            }
        }],
        yAxis: {
            title: {
                text: null,
            },
            labels: {
                formatter: function () {
                    return numberFormatter(Math.abs(this.value)) + "%";
                }
            },
            accessibility: {
                description: 'Total number of deaths',
            }
        },

        plotOptions: {
            series: {
                stacking: 'normal',
                events: {
                    legendItemClick: function (e) {
                        // to disable default effect of hiding series
                        return false;
                    },
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<strong>Aged from ' + this.x + '</strong><br/>' +
                    'Male, total number of deaths: ' + numberFormatter(this.points[0].point.totalValue, 1) + '<br>' +
                    'Male, share of deaths: ' + Math.abs(this.points[0].y) + '%<br>' +
                    'Female, total number of deaths: ' + numberFormatter(this.points[1].point.totalValue, 1) + '<br>' +
                    'Female, share of deaths: ' + Math.abs(this.points[1].y) + '%';
            },
            shared: true,
        },

        series: [{
            name: "Male",
            colorIndex: 49,
            data: initial_pyramid_male_data
        }, {
            name: "Female",
            colorIndex: 51,
            data: initial_pyramid_female_data
        }]
    });
    var bubbles_chart = Highcharts.chart('death_bubbles', {
        chart: {
            type: 'packedbubble',
        },
        title: {
            text: null
        },
        tooltip: {
            useHTML: true,
            headerFormat: '',
            pointFormatter: function () {
                let sName = fCapital(this.name);
                let text = "Associated with " + numberFormatter(this.value) + " deaths";
                return '<text><span style="font-size:1.1em"><strong>' + sName + '</strong></span><br>' + text + '</text>';
            },
        },
        plotOptions: {
            packedbubble: {
                crisp: true,

                minSize: "10%", // These two control the min and max size of the bubbles
                maxSize: "200%",
                // zMax: 100, // These two define the scale, to keep it consistent across different variables
                // zMin: 1,   // without them, maxsize would be the biggest bubble regardless of actual value - so it could be 95% or 15% and would look the same
                marker: {
                    lineColor: '#DDDDD',
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
                // useSimulation: true,
                layoutAlgorithm: {
                    initialPositions: 'random',
                    maxIterations: 200, // total animation time
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
            name: 'Risks',
            data: initial_bubbles_data,
            allowPointSelect: true

        }]
    });

    setPyramidBands();
    // Otherwise these charts overflow their containers
    map_chart.reflow();
    treemap_chart.reflow();
    pyramid_chart.reflow();
    bubbles_chart.reflow();

    // Change / reset functions
    function setMapTitle() {
        let element = document.getElementById("death_map_title");
        let text;

        if (cause == "All causes") {
            text = "National leading causes of death";
        } else {
            text = "Share of deaths for " + cause;
        }
        if (age != "All ages" && sex != "Both") {
            let additionalText = "(" + sex + ", " + age + " years old)";
            text = text + " " + additionalText;
        } else if (sex != "Both") {
            let additionalText = "(" + sex + ")";
            text = text + " " + additionalText;
        } else if (age != "All ages") {
            let additionalText = "(" + age + " years old)";
            text = text + " " + additionalText;
        }

        element.innerHTML = text;
    }
    function setPyramidTitle() {
        let element = document.getElementById("death_pyramid_title");
        let text = "Share of deaths by age";

        if (cause != "All causes" && location != "Global") {
            let additionalText = "(" + location + ", " + cause + ")";
            text = text + " " + additionalText;
        } else if (cause != "All causes") {
            let additionalText = "(" + cause + ")";
            text = text + " " + additionalText;
        } else if (location != "Global") {
            let additionalText = "(" + location + ")";
            text = text + " " + additionalText;
        }

        element.innerHTML = text;
    }
    function setBubblesTitle() {
        let element = document.getElementById("death_bubbles_title");
        let text;

        if (cause == "All causes") {
            text = "Risks associated with all causes of death";
        } else {
            text = "Risks associated with " + cause;
        }
        if (age != "All ages" && sex != "Both" && location != "Global") {
            let additionalText = "(" + location + ", " + sex + ", " + age + " years old)";
            text = text + " " + additionalText;
        } else if (age != "All ages" && sex != "Both") {
            let additionalText = "(" + sex + ", " + age + " years old)";
            text = text + " " + additionalText;
        } else if (age != "All ages" && location != "Global") {
            let additionalText = "(" + location + ", " + age + " years old)";
            text = text + " " + additionalText;
        } else if (sex != "Both" && location != "Global") {
            let additionalText = "(" + location + ", " + sex + ")";
            text = text + " " + additionalText;
        } else if (age != "All ages") {
            let additionalText = "(" + age + " years old)";
            text = text + " " + additionalText;
        } else if (sex != "Both") {
            let additionalText = "(" + sex + ")";
            text = text + " " + additionalText;
        } else if (location != "Global") {
            let additionalText = "(" + location + ")";
            text = text + " " + additionalText;
        }

        element.innerHTML = text;
    }
    function setTreemapTitle() {
        let element = document.getElementById("death_treemap_title");
        let text;
        if (cause == "All causes") {
            text = "Total deaths broken down by cause";
        } else {
            text = "Total " + cause + " deaths brake down";
        }

        if (age != "All ages" && sex != "Both" && location != "Global") {
            let additionalText = "(" + location + ", " + sex + ", " + age + " years old)";
            text = text + " " + additionalText;
        } else if (age != "All ages" && sex != "Both") {
            let additionalText = "(" + sex + ", " + age + " years old)";
            text = text + " " + additionalText;
        } else if (age != "All ages" && location != "Global") {
            let additionalText = "(" + location + ", " + age + " years old)";
            text = text + " " + additionalText;
        } else if (sex != "Both" && location != "Global") {
            let additionalText = "(" + location + ", " + sex + ")";
            text = text + " " + additionalText;
        } else if (age != "All ages") {
            let additionalText = "(" + age + " years old)";
            text = text + " " + additionalText;
        } else if (sex != "Both") {
            let additionalText = "(" + sex + ")";
            text = text + " " + additionalText;
        } else if (location != "Global") {
            let additionalText = "(" + location + ")";
            text = text + " " + additionalText;
        }

        element.innerHTML = text;
    }
    function resetLocation() {
        location = "Global";
        innerLocation = "Global";
        locationElement.innerHTML = location;

        treemap_data_update();
        pyramid_data_update();
        bubbles_data_update();
        highlightCountry();
    }
    function resetCause() {
        cause = "All causes";
        causeElement.innerHTML = cause;
        treemap_chart.series[0].setRootNode("", true, {
            trigger: 'click'
        });

        pyramid_data_update();
        bubbles_data_update();
        map_data_update();
    }
    function resetAge() {
        age = "All ages";
        ageElement.innerHTML = age;

        setPyramidBands();
        treemap_data_update();
        bubbles_data_update();
        map_data_update();
    }
    function resetSex() {
        sex = "Both";
        sexElement.innerHTML = sex;
        for (var i = 0; i < radioElements.length; i++) {
            if (radioElements[i].value == "Both") {
                radioElements[i].checked = true;
            } else {
                radioElements[i].checked = false;
            }
        }

        updateSex();
        treemap_data_update();
        bubbles_data_update();
        map_data_update();
    }
    function updateSex() {
        let maleEl = document.querySelector(".death-pyramid .highcharts-legend .highcharts-series-0 text");
        let maleSeriesEl = document.querySelector(".death-pyramid  .highcharts-series-group .highcharts-series-0");
        let femaleEl = document.querySelector(".death-pyramid .highcharts-legend .highcharts-series-1 text");
        let femaleSeriesEl = document.querySelector(".death-pyramid  .highcharts-series-group .highcharts-series-1");
        sexElement.innerHTML = sex;

        if (sex == "Both") {
            maleEl.classList.remove("pyramid-label-selected");
            femaleEl.classList.remove("pyramid-label-selected");
            maleSeriesEl.classList.remove("pyramid-series-inactive");
            femaleSeriesEl.classList.remove("pyramid-series-inactive");
        } else if (sex == "Male") {
            maleEl.classList.add("pyramid-label-selected");
            femaleEl.classList.remove("pyramid-label-selected");
            maleSeriesEl.classList.remove("pyramid-series-inactive");
            femaleSeriesEl.classList.add("pyramid-series-inactive");
        } else if (sex == "Female") {
            maleEl.classList.remove("pyramid-label-selected");
            femaleEl.classList.add("pyramid-label-selected");
            maleSeriesEl.classList.add("pyramid-series-inactive");
            femaleSeriesEl.classList.remove("pyramid-series-inactive");
        }
    }
    function setPyramidBands() {
        let new_bands = [];
        let catAges = [...all_ages];
        catAges.pop();

        if (age == "All ages") {
            for (let i = 0; i < (catAges.length); i++) {
                new_bands.push({ from: i - 0.5, to: i + 0.5, className: 'pyramid-band' })
            }
        } else {
            for (let i = 0; i < (catAges.length); i++) {
                if (catAges.indexOf(age) == i) {
                    new_bands.push({ from: i - 0.5, to: i + 0.5, className: 'pyramid-band-selected' })
                } else {
                    new_bands.push({ from: i - 0.5, to: i + 0.5, className: 'pyramid-band' })
                }
            }
        }

        pyramid_chart.update({
            xAxis: { plotBands: new_bands }
        }, false);
        pyramid_chart.setSize();

    }
    function highlightCountry() {
        let elements = document.querySelectorAll(".death-dashboard .highcharts-map-series .highcharts-point");
        if (location != 'Global') {
            let css = 'highcharts-name-' + location.toLowerCase().split(' ').join('-');
            for (let el of elements) {
                if (el.classList.contains(css)) {
                    el.classList.add("selected-element");
                } else {
                    el.classList.remove("selected-element");
                }
            }
        } else {
            for (let el of elements) {
                el.classList.remove("selected-element");
            }
        }
    }
})
    .catch(function (error) {
        console.log(error);
    })

var oldDeathTree = d3.csv(old_death_path)
    .then(function (data) {

        function get_data() {
            var new_data = [];
            for (let row of data) {
                new_data.push({ name: row.Cause, value: +row.Number, colorIndex: getColor[row.Cause] });
            }
            return new_data;
        }

        initial_data = get_data();

        var chart = Highcharts.chart('old_death_tree', {
            chart: {
                type: 'treemap',
                height: 300
            },
            title: {
                text: null
            },
            tooltip: {
                formatter: function () {
                    var title = fCapital(this.key);
                    var deaths = numberFormatter(this.point.value);
                    var perc = this.point.value / this.series.tree.val * 100;
                    var per = numberFormatter(perc);
                    return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>Total number of deaths: ' + deaths + '<br> Percentage: ' + per + '%</text>';
                },
                useHTML: true
            },
            series: [{
                type: 'treemap',
                layoutAlgorithm: 'squarified',
                data: initial_data
            }],
        });
    })
    .catch(function (error) {
        console.log(error);
    })



function tabClickHandler(element) {
    if (!(element.classList.contains("tab-active"))) {
        // hide all tab buttons
        let parent = element.parentNode;
        for (let i in parent.childNodes) {
            let el = parent.childNodes[i];
            if (el.nodeName == "DIV") {
                el.classList.remove("tab-active");
            }
        }

        //activate this button
        element.classList.add("tab-active");

        // hide other texts and activate this text
        let questionsText = document.getElementById("death_dash_questions");
        let obscurityText = document.getElementById("death_dash_obscurity");
        let navigationText = document.getElementById("death_dash_navigation");

        if (element.innerHTML == "Questions") {
            obscurityText.classList.add("hide");
            navigationText.classList.add("hide");
            questionsText.classList.remove("hide");
        } else if (element.innerHTML == "Obscurity") {
            questionsText.classList.add("hide");
            navigationText.classList.add("hide");
            obscurityText.classList.remove("hide");
        } else if (element.innerHTML == "Navigation") {
            questionsText.classList.add("hide");
            obscurityText.classList.add("hide");
            navigationText.classList.remove("hide");
        }
    }
}
// To keep color of causes consistent
var getColor = {
    'Cardiovascular diseases': '2',
    'Cardiovascular disease': '2',
    'Cancer': '4',
    'Chronic respiratory diseases': '6',
    'Pneumonia or influenza': '6',
    'Respiratory infections and tuberculosis': '18',
    'Tuberculosis': '18',
    'Neurological disorders': '24',
    'Senility': '24',
    'Diabetes and kidney diseases': '3',
    'Nephropathies': '3',
    'Digestive diseases': '0',
    'Maternal and neonatal disorders': '23',
    'Maternal disorders': '23',
    'Neonatal disorders': '23',
    'Unintentional injuries': '8',
    'Accidents': '8',
    'Enteric infections': '20',
    'Gastrointestinal infections': '20',
    'Transport injuries': '10',
    'Other non-communicable diseases': '1',
    'HIV/AIDS': '16',
    'HIV/AIDS and sexually transmitted infections': '16',
    'Other infectious diseases': '17',
    'Self-harm': '12',
    'Suicide': '12',
    'Neglected tropical diseases and malaria': '15',
    'Diphtheria': '18',
    'Interpersonal violence': '11',
    'Substance use disorders': '27',
    'Nutritional deficiencies': '25',
    'Conflict and terrorism': '7',
    'Musculoskeletal disorders': '26',
    'Sexually transmitted infections excluding HIV': '16',
    'Skin and subcutaneous diseases': '5',
    'Executions and police conflict': '9',
    'Mental disorders': '22',
    'Sense organ diseases': '4',
    'High systolic blood pressure': '30',
    'High LDL cholesterol': '30',
    'Diabetes': '30',
    'Kidney dysfunction': '30',
    'Low bone mineral density': '30',
    'Air pollution': '33',
    'Unsafe water, sanitation, and handwashing': '33',
    'Non-optimal temperature': '33',
    'Other environmental risks': '33',
    'Intimate partner violence': '33',
    'Childhood sexual abuse and bullying': '33',
    'Dietary risks': '28',
    'Obesity': '28',
    'Smoking': '28',
    'Child and maternal malnutrition': '28',
    'Alcohol use': '28',
    'Unsafe sex': '28',
    'Low physical activity': '28',
    'Occupational risks': '28',
    'Drug use': '28'
};
var getMapColor = {
    'Cardiovascular diseases': '2',
    'Cardiovascular disease': '2',
    'Cancer': '2',
    'Chronic respiratory diseases': '2',
    'Pneumonia or influenza': '2',
    'Respiratory infections and tuberculosis': '16',
    'Tuberculosis': '16',
    'Neurological disorders': '23',
    'Senility': '23',
    'Diabetes and kidney diseases': '2',
    'Nephropathies': '2',
    'Digestive diseases': '2',
    'Maternal and neonatal disorders': '23',
    'Maternal disorders': '23',
    'Neonatal disorders': '23',
    'Unintentional injuries': '8',
    'Accidents': '8',
    'Enteric infections': '16',
    'Gastrointestinal infections': '16',
    'Transport injuries': '8',
    'Other non-communicable diseases': '2',
    'HIV/AIDS': '16',
    'HIV/AIDS and sexually transmitted infections': '16',
    'Other infectious diseases': '16',
    'Self-harm': '8',
    'Suicide': '8',
    'Neglected tropical diseases and malaria': '16',
    'Diphtheria': '16',
    'Interpersonal violence': '8',
    'Substance use disorders': '23',
    'Nutritional deficiencies': '23',
    'Conflict and terrorism': '8',
    'Musculoskeletal disorders': '23',
    'Sexually transmitted infections excluding HIV': '16',
    'Skin and subcutaneous diseases': '2',
    'Executions and police conflict': '8',
    'Mental disorders': '23',
    'Sense organ diseases': '2'
};

let getCauseParent = {
    "Tuberculosis": "Respiratory infections and tuberculosis",
    "Lower respiratory infections": "Respiratory infections and tuberculosis",
    "Upper respiratory infections": "Respiratory infections and tuberculosis",
    "Otitis media": "Respiratory infections and tuberculosis",
    "Respiratory infections and tuberculosis": "",
    "Diarrheal diseases": "Enteric infections",
    "Typhoid and paratyphoid": "Enteric infections",
    "Other intestinal infectious diseases": "Enteric infections",
    "Invasive Non-typhoidal Salmonella (iNTS)": "Enteric infections",
    "Enteric infections": "",
    "Malaria": "Neglected tropical diseases and malaria",
    "Chagas disease": "Neglected tropical diseases and malaria",
    "Leishmaniasis": "Neglected tropical diseases and malaria",
    "African trypanosomiasis": "Neglected tropical diseases and malaria",
    "Schistosomiasis": "Neglected tropical diseases and malaria",
    "Cystic echinococcosis": "Neglected tropical diseases and malaria",
    "Cysticercosis": "Neglected tropical diseases and malaria",
    "Lymphatic filariasis": "Neglected tropical diseases and malaria",
    "Onchocerciasis": "Neglected tropical diseases and malaria",
    "Trachoma": "Neglected tropical diseases and malaria",
    "Dengue": "Neglected tropical diseases and malaria",
    "Yellow fever": "Neglected tropical diseases and malaria",
    "Rabies": "Neglected tropical diseases and malaria",
    "Intestinal nematode infections": "Neglected tropical diseases and malaria",
    "Leprosy": "Neglected tropical diseases and malaria",
    "Food-borne trematodiases": "Neglected tropical diseases and malaria",
    "Ebola": "Neglected tropical diseases and malaria",
    "Zika virus": "Neglected tropical diseases and malaria",
    "Other neglected tropical diseases": "Neglected tropical diseases and malaria",
    "Neglected tropical diseases and malaria": "",
    "Neonatal disorders": "Maternal and neonatal disorders",
    "Maternal disorders": "Maternal and neonatal disorders",
    "Maternal and neonatal disorders": "",
    "Bladder cancer": "Cancer",
    "Brain and nervous system cancer": "Cancer",
    "Breast cancer": "Cancer",
    "Cervical cancer": "Cancer",
    "Colon and rectum cancer": "Cancer",
    "Esophageal cancer": "Cancer",
    "Gallbladder and biliary tract cancer": "Cancer",
    "Kidney cancer": "Cancer",
    "Larynx cancer": "Cancer",
    "Leukemia": "Cancer",
    "Lip and oral cavity cancer": "Cancer",
    "Liver cancer": "Cancer",
    "Malignant skin melanoma": "Cancer",
    "Nasopharynx cancer": "Cancer",
    "Non-melanoma skin cancer": "Cancer",
    "Other pharynx cancer": "Cancer",
    "Ovarian cancer": "Cancer",
    "Pancreatic cancer": "Cancer",
    "Prostate cancer": "Cancer",
    "Stomach cancer": "Cancer",
    "Testicular cancer": "Cancer",
    "Thyroid cancer": "Cancer",
    "Tracheal, bronchus, and lung cancer": "Cancer",
    "Uterine cancer": "Cancer",
    "Mesothelioma": "Cancer",
    "Hodgkin lymphoma": "Cancer",
    "Non-Hodgkin lymphoma": "Cancer",
    "Multiple myeloma": "Cancer",
    "Other malignant neoplasms": "Cancer",
    "Other neoplasms": "Cancer",
    "Brain and central nervous system cancer": "Cancer",
    "Cancer": "",
    "Ischemic heart disease": "Cardiovascular diseases",
    "Rheumatic heart disease": "Cardiovascular diseases",
    "Non-rheumatic valvular heart disease": "Cardiovascular diseases",
    "Stroke": "Cardiovascular diseases",
    "Hypertensive heart disease": "Cardiovascular diseases",
    "Cardiomyopathy and myocarditis": "Cardiovascular diseases",
    "Aortic aneurysm": "Cardiovascular diseases",
    "Atrial fibrillation and flutter": "Cardiovascular diseases",
    "Endocarditis": "Cardiovascular diseases",
    "Peripheral artery disease": "Cardiovascular diseases",
    "Other cardiovascular and circulatory diseases": "Cardiovascular diseases",
    "Cardiovascular diseases": "",
    "Alzheimer's disease and other dementias": "Neurological disorders",
    "Motor neuron disease": "Neurological disorders",
    "Multiple sclerosis": "Neurological disorders",
    "Other neurological disorders": "Neurological disorders",
    "Parkinson's disease": "Neurological disorders",
    "Headache disorders": "Neurological disorders",
    "Idiopathic epilepsy": "Neurological disorders",
    "Neurological disorders": "",
    "Anxiety disorders": "Mental disorders",
    "Attention-deficit/hyperactivity disorder": "Mental disorders",
    "Autism spectrum disorders": "Mental disorders",
    "Bipolar disorder": "Mental disorders",
    "Depressive disorders": "Mental disorders",
    "Idiopathic developmental intellectual disability": "Mental disorders",
    "Other mental disorders": "Mental disorders",
    "Schizophrenia": "Mental disorders",
    "Conduct disorder": "Mental disorders",
    "Eating disorders": "Mental disorders",
    "Mental disorders": "",
    "Alcohol use disorders": "Substance use disorders",
    "Drug use disorders": "Substance use disorders",
    "Substance use disorders": "",
    "Acute glomerulonephritis": "Diabetes and kidney diseases",
    "Diabetes mellitus": "Diabetes and kidney diseases",
    "Chronic kidney disease": "Diabetes and kidney diseases",
    "Diabetes and kidney diseases": "",
    "Cyclist road injuries": "Transport injuries",
    "Motor vehicle road injuries": "Transport injuries",
    "Motorcyclist road injuries": "Transport injuries",
    "Other road injuries": "Transport injuries",
    "Pedestrian road injuries": "Transport injuries",
    "Other transport injuries": "Transport injuries",
    "Transport injuries": "",
    "Animal contact": "Unintentional injuries",
    "Drowning": "Unintentional injuries",
    "Environmental heat and cold exposure": "Unintentional injuries",
    "Exposure to forces of nature": "Unintentional injuries",
    "Exposure to mechanical forces": "Unintentional injuries",
    "Falls": "Unintentional injuries",
    "Fire, heat, and hot substances": "Unintentional injuries",
    "Foreign body": "Unintentional injuries",
    "Poisonings": "Unintentional injuries",
    "Other unintentional injuries": "Unintentional injuries",
    "Adverse effects of medical treatment": "Unintentional injuries",
    "Unintentional injuries": "",
    "Sexually transmitted infections excluding HIV": "HIV/AIDS and sexually transmitted infections",
    "HIV/AIDS": "HIV/AIDS and sexually transmitted infections",
    "HIV/AIDS and sexually transmitted infections": "",
    "Chronic obstructive pulmonary disease": "Chronic respiratory diseases",
    "Asthma": "Chronic respiratory diseases",
    "Pneumoconiosis": "Chronic respiratory diseases",
    "Interstitial lung disease and pulmonary sarcoidosis": "Chronic respiratory diseases",
    "Other chronic respiratory diseases": "Chronic respiratory diseases",
    "Chronic respiratory diseases": "",
    "Acute hepatitis": "Other infectious diseases",
    "Meningitis": "Other infectious diseases",
    "Encephalitis": "Other infectious diseases",
    "Diphtheria": "Other infectious diseases",
    "Whooping cough": "Other infectious diseases",
    "Tetanus": "Other infectious diseases",
    "Measles": "Other infectious diseases",
    "Varicella and herpes zoster": "Other infectious diseases",
    "Other unspecified infectious diseases": "Other infectious diseases",
    "Other infectious diseases": "",
    "Appendicitis": "Digestive diseases",
    "Cirrhosis and other chronic liver diseases": "Digestive diseases",
    "Upper digestive system diseases": "Digestive diseases",
    "Paralytic ileus and intestinal obstruction": "Digestive diseases",
    "Inguinal, femoral, and abdominal hernia": "Digestive diseases",
    "Inflammatory bowel disease": "Digestive diseases",
    "Gallbladder and biliary diseases": "Digestive diseases",
    "Vascular intestinal disorders": "Digestive diseases",
    "Pancreatitis": "Digestive diseases",
    "Other digestive diseases": "Digestive diseases",
    "Digestive diseases": "",
    "Congenital birth defects": "Other non-communicable diseases",
    "Gynecological diseases": "Other non-communicable diseases",
    "Urinary diseases and male infertility": "Other non-communicable diseases",
    "Endocrine, metabolic, blood, and immune disorders": "Other non-communicable diseases",
    "Sudden infant death syndrome": "Other non-communicable diseases",
    "Hemoglobinopathies and hemolytic anemias": "Other non-communicable diseases",
    "Other non-communicable diseases": "",
    "Conflict and terrorism": "",
    "Executions and police conflict": "",
    "Interpersonal violence": "",
    "Musculoskeletal disorders": "",
    "Nutritional deficiencies": "",
    "Skin and subcutaneous diseases": "",
    "Suicide": ""
};

let getCauseMaxValue = {
    "Cancer": "30",
    "Cardiovascular diseases": "60",
    "Chronic respiratory diseases": "20",
    "Conflict and terrorism": "9",
    "Diabetes and kidney diseases": "20",
    "Digestive diseases": "10",
    "Enteric infections": "20",
    "Executions and police conflict": "0.5",
    "HIV/AIDS and sexually transmitted infections": "25",
    "Interpersonal violence": "5",
    "Maternal and neonatal disorders": "15",
    "Mental disorders": "0",
    "Musculoskeletal disorders": "0.5",
    "Neglected tropical diseases and malaria": "15",
    "Neurological disorders": "10",
    "Nutritional deficiencies": "5",
    "Other infectious diseases": "10",
    "Other non-communicable diseases": "10",
    "Respiratory infections and tuberculosis": "20",
    "Skin and subcutaneous diseases": "0.5",
    "Substance use disorders": "2.5",
    "Suicide": "7",
    "Transport injuries": "15",
    "Unintentional injuries": "8",
}
