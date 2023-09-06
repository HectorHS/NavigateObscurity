// helpers
import { fCapital, addDropdown, getCountryCode, numberFormatter, getIndexColor, addTabClickEvents } from "./chartHelper.js";
let life_map_path = "/static/worlddata/csv/life-map.csv";
let old_death_path = "/static/worlddata/csv/death-old.csv";
let death_causes_path = "/static/worlddata/csv/death-causes.csv";
let death_locations_path = "/static/worlddata/csv/death-locations.csv";
let death_risks_path = "/static/worlddata/csv/death-risks.csv";
let death_causes_percent_path = "/static/worlddata/csv/death-causes-percent.csv";
let death_top_causes_path = "/static/worlddata/csv/death-top-causes.csv";
let tabcss = "death_intro";
addTabClickEvents(tabcss);
let LifeMap = d3.csv(life_map_path)
    .then(function (data) {
    // All filterable options
    const ALL_PARAMETERS = [...new Set(data.map((d) => d.Parameter))].sort();
    const ALL_YEARS = [...new Set(data.map((d) => d.Year))].sort();
    let all_locations = data.columns;
    all_locations.splice(0, 2);
    // Default values
    let parameter = "Life expectancy";
    let year = "2020";
    let container_class = ".life-map";
    let initial_data = [];
    function get_data() {
        let new_data = [];
        for (let row of data) {
            if (row.Parameter == parameter && row.Year == year) {
                for (let loc of all_locations) {
                    if (row[loc]) {
                        new_data.push({ country: getCountryCode(loc), value: +row[loc] });
                    }
                }
            }
        }
        return new_data;
    }
    initial_data = get_data();
    // Initiate the chart
    var chart = Highcharts.mapChart({
        chart: {
            // height: 500,
            renderTo: 'life_map',
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
                let title = fCapital(this.key);
                // let value:number = (<HighMaps.MapPoint>this.point).value!;
                let value = this.point.value;
                let text = "";
                if (parameter == "Fertility rate") {
                    let val = numberFormatter(value);
                    text = val + " births per woman";
                }
                else if (parameter == "Life expectancy") {
                    text = "Life expectancy at birth is " + value + " years";
                }
                else if (parameter == "Median age") {
                    let val = numberFormatter(value);
                    text = "Median age of the whole population is " + val + " years old";
                }
                else if (parameter == "Mortality percentage") {
                    let val = numberFormatter(value);
                    text = "Total amount of deaths this year amounts to " + val + "% of the total population";
                }
                else if (parameter == "Population") {
                    let val = numberFormatter(value);
                    text = "Total population of the country is " + val;
                }
                else if (parameter == "Population density") {
                    text = value + " people living per square kilometer";
                }
                return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
            },
            useHTML: true
        },
        series: [{
                type: 'map',
                mapData: Highcharts.maps['custom/world'],
                colorIndex: 2,
                colorKey: 'value',
                data: initial_data,
                joinBy: ['iso-a3', 'country'], // first var: type of geographical data, second: data column name
            }]
    });
    // Dropdowns
    // Define dropdown container
    let filters = document.querySelector(container_class + " .chart-filters");
    // Create a parameter dropdown
    let parameterName = "life-map-parameter";
    let parameterWidth = "300px";
    addDropdown(filters, parameterName, parameterWidth, parameterChange, ALL_PARAMETERS, parameter);
    // Update chart data on cause change
    function parameterChange() {
        parameter = document.getElementById(parameterName + "-select").value;
        updateColorStops();
        chart.series[0].setData(get_data());
    }
    // Create a year dropdown
    var yearName = "life-map-year", yearWidth = "100px";
    addDropdown(filters, yearName, yearWidth, yearChange, ALL_YEARS, year);
    // Update chart data on sex change
    function yearChange() {
        year = document.getElementById(yearName + "-select").value;
        updateColorStops();
        chart.series[0].setData(get_data());
    }
    // adjust color stops according to parameter
    function updateColorStops() {
        let updatedColorAxis = {};
        if (parameter == "Fertility rate") {
            updatedColorAxis = {
                tickInterval: 1,
                max: 3,
                min: 1,
            };
        }
        else if (parameter == "Life expectancy") {
            updatedColorAxis = {
                tickInterval: 10,
                max: 80,
                min: 30,
            };
        }
        else if (parameter == "Median age") {
            updatedColorAxis = {
                tickInterval: 15,
                max: 45,
                min: 15,
            };
        }
        else if (parameter == "Mortality percentage") {
            updatedColorAxis = {
                tickInterval: 0.5,
                max: 2.25,
                min: 0.25,
            };
        }
        else if (parameter == "Population") {
            updatedColorAxis = {
                max: 500000000,
                min: 1000000,
            };
        }
        else if (parameter == "Population density") {
            updatedColorAxis = {
                tickInterval: 200,
                max: 400,
                min: 0,
            };
        }
        chart.update({
            colorAxis: updatedColorAxis,
        }, false);
    }
})
    .catch(function (error) {
    console.log(error);
});
let DeathDash = Promise.all([
    d3.csv(death_causes_path),
    d3.csv(death_locations_path),
    d3.csv(death_causes_percent_path),
    d3.csv(death_top_causes_path),
    d3.csv(death_risks_path),
]).then(function (files) {
    // All filterable options
    const ALL_LOCATIONS = [...new Set(files[1].map((d) => d.Location))].sort();
    const ALL_AGES = [...new Set(files[0].map((d) => d.age))].sort();
    const ALL_MAIN_CAUSES = [...new Set(files[2].map((d) => d.cause))].sort();
    const PYRAMID_CATEGORIES = [
        '0 to 9', '10 to 19', '20 to 29', '30 to 39',
        '40 to 49', '50 to 59', '60 to 69', '70 to 79', '80 to 89',
        '90+'
    ];
    //Default values for filters
    //TODO get rid of the two locations and use lookup
    let location = "Global";
    let innerLocation = "Global";
    let sex = "Both";
    let age = "All ages";
    let cause = "All causes";
    let maxMapColor = "#E63333";
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
    for (let i = 0; i < radioElements.length; i++) {
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
        let new_data = [];
        for (let row of files[0]) {
            if (row.age == age && row.sex == sex && row.cause != "All causes") {
                let cause = row.cause;
                let parent = getCauseParent.get(cause);
                if (parent == undefined) {
                    parent = "";
                }
                if (parent == "") {
                    new_data.push({ id: cause, name: cause, value: +row[innerLocation], colorIndex: getColor.get(cause) });
                }
                else {
                    new_data.push({ id: cause, name: cause, parent: parent, value: +row[innerLocation] });
                }
            }
        }
        return new_data;
    }
    function get_map_data() {
        let new_data = [];
        let new_series = [];
        if (cause == "All causes") {
            for (let caus of ALL_MAIN_CAUSES) {
                for (let row of files[3]) {
                    if (row.cause == caus && row.sex == sex && row.age == age && row.location != "Global") {
                        new_data.push({ country: getCountryCode(row.location), value: +row.value, originalName: row.location });
                    }
                }
                if (new_data.length > 0) {
                    let slice = { data: new_data, name: caus, type: 'map', colorIndex: getColor.get(caus), showInLegend: false };
                    new_series.push(slice);
                    new_data = [];
                }
            }
        }
        else {
            for (let row of files[2]) {
                if (row.age == age && row.sex == sex && row.cause == cause && row.location != "Global") {
                    for (let loc of ALL_LOCATIONS) {
                        new_data.push({ country: getCountryCode(loc), value: +row[loc], originalName: loc });
                    }
                }
            }
            let series = { data: new_data, name: cause, type: 'map', colorIndex: 999 };
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
                }
                else if (row.age == "10 to 19") {
                    ten = +row[innerLocation];
                }
                else if (row.age == "20 to 29") {
                    twenty = +row[innerLocation];
                }
                else if (row.age == "30 to 39") {
                    thirty = +row[innerLocation];
                }
                else if (row.age == "40 to 49") {
                    forty = +row[innerLocation];
                }
                else if (row.age == "50 to 59") {
                    fifty = +row[innerLocation];
                }
                else if (row.age == "60 to 69") {
                    sixty = +row[innerLocation];
                }
                else if (row.age == "70 to 79") {
                    seventy = +row[innerLocation];
                }
                else if (row.age == "80 to 89") {
                    eighty = +row[innerLocation];
                }
                else if (row.age == "90+") {
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
            let dv = { y: dataPC[i], totalValue: data[i] };
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
        if (cause == "All causes") {
            map_chart.update({
                plotOptions: { map: { colorAxis: false } }
            }, false);
            let newColorAxis = {
                visible: false
            };
            map_chart.update({
                colorAxis: newColorAxis,
            }, false);
        }
        else {
            if (col) {
                maxMapColor = col;
            }
            map_chart.update({
                plotOptions: { map: { colorAxis: 0 } }
            }, false);
            let newColorAxis = {
                visible: true,
                minColor: '#222a2a',
                maxColor: maxMapColor,
                max: getCauseMaxValue.get(cause)
            };
            map_chart.update({
                colorAxis: newColorAxis,
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
        var new_data = [];
        for (let row of files[4]) {
            if (cause == row.cause && age == row.age && sex == row.sex) {
                new_data.push({ id: row.rei, name: row.rei, value: +row[innerLocation], colorIndex: getColor.get(row.rei) });
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
    let initial_treemap_data = get_treemap_data();
    let initial_map_data = get_map_data();
    let initial_pyramid_male_data = get_pyramid_slice_data("Male");
    let initial_pyramid_female_data = get_pyramid_slice_data("Female");
    let initial_bubbles_data = get_bubbles_data();
    setMapTitle();
    setBubblesTitle();
    // Initiate the charts
    let treemap_chart = Highcharts.chart({
        chart: {
            type: 'treemap',
            margin: 0,
            renderTo: 'death_tree'
        },
        title: {
            text: undefined
        },
        tooltip: {
            formatter: function () {
                let title = fCapital(this.key);
                let deaths = numberFormatter(this.point.value);
                let perc = this.point.value / this.point.series.tree.val * 100;
                let per = numberFormatter(perc);
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
                        let boxWidth = 1;
                        let boxHeight = 1;
                        if (this.point.shapeArgs) {
                            boxWidth = this.point.shapeArgs.width;
                            boxHeight = this.point.shapeArgs.height;
                        }
                        let maxLineHeight = (Math.floor(boxHeight / 20)) - 1;
                        let maxLineLength = boxWidth / 8;
                        let nameParts = this.point.name.split(" ");
                        let name = [];
                        let newLine = "";
                        let oldLine = "";
                        let i = 0;
                        for (let n in nameParts) {
                            i = +1;
                            // If we have reached the line number (height) limit,
                            // try to append ... dots on remaining name element
                            // and break the for loop
                            if (name.length == maxLineHeight) {
                                newLine = oldLine.concat("...");
                                if (newLine.length > maxLineLength) {
                                    newLine = "...";
                                }
                                oldLine = newLine;
                                break;
                            }
                            else {
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
                                }
                                else {
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
                            let color = getIndexColor(getMapColor.get(cause));
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
                        }
                        else {
                            setTreemapTitle();
                        }
                    }
                }
            }
        },
        series: [{
                type: 'treemap',
                name: 'Causes of death',
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
                data: initial_treemap_data
            }],
    });
    let map_chart = Highcharts.mapChart({
        chart: {
            renderTo: 'death_map',
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
            text: undefined
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
                colorAxis: false,
                mapData: Highcharts.maps['custom/world'],
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
                joinBy: ['iso-a3', 'country']
            }
        },
        colorAxis: {
            minColor: '#222a2a',
            maxColor: maxMapColor,
            visible: false
        },
        tooltip: {
            formatter: function () {
                var title = fCapital(this.key);
                var per = numberFormatter(this.point.value);
                if (cause == "All causes") {
                    return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>Top cause of death: ' + this.series.name + '<br>Percentage of total deaths: ' + per + '%</text>';
                }
                else {
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
    let pyramid_chart = Highcharts.chart({
        chart: {
            type: 'bar',
            renderTo: 'death_pyramid',
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
            text: undefined
        },
        xAxis: [{
                categories: PYRAMID_CATEGORIES,
                reversed: true,
                plotBands: [],
                labels: {
                    step: 1,
                },
                accessibility: {
                    description: 'Age (male)'
                },
            }, {
                opposite: true,
                reversed: true,
                categories: PYRAMID_CATEGORIES,
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
                    legendItemClick: function () {
                        // to disable default effect of hiding series
                        return false;
                    },
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<strong>Aged from ' + this.x + '</strong><br/>' +
                    'Male, total number of deaths: ' + numberFormatter(this.points[0].point.totalValue) + '<br>' +
                    'Male, share of deaths: ' + Math.abs(this.points[0].y) + '%<br>' +
                    'Female, total number of deaths: ' + numberFormatter(this.points[1].point.totalValue) + '<br>' +
                    'Female, share of deaths: ' + Math.abs(this.points[1].y) + '%';
            },
            shared: true,
        },
        series: [{
                type: 'bar',
                name: "Male",
                colorIndex: 49,
                data: initial_pyramid_male_data
            }, {
                type: 'bar',
                name: "Female",
                colorIndex: 51,
                data: initial_pyramid_female_data
            }]
    });
    var bubbles_chart = Highcharts.chart({
        chart: {
            type: 'packedbubble',
            renderTo: 'death_bubbles'
        },
        title: {
            text: undefined
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
                minSize: "10%",
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
                type: 'packedbubble',
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
        }
        else {
            text = "Share of deaths for " + cause;
        }
        if (age != "All ages" && sex != "Both") {
            let additionalText = "(" + sex + ", " + age + " years old)";
            text = text + " " + additionalText;
        }
        else if (sex != "Both") {
            let additionalText = "(" + sex + ")";
            text = text + " " + additionalText;
        }
        else if (age != "All ages") {
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
        }
        else if (cause != "All causes") {
            let additionalText = "(" + cause + ")";
            text = text + " " + additionalText;
        }
        else if (location != "Global") {
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
        }
        else {
            text = "Risks associated with " + cause;
        }
        if (age != "All ages" && sex != "Both" && location != "Global") {
            let additionalText = "(" + location + ", " + sex + ", " + age + " years old)";
            text = text + " " + additionalText;
        }
        else if (age != "All ages" && sex != "Both") {
            let additionalText = "(" + sex + ", " + age + " years old)";
            text = text + " " + additionalText;
        }
        else if (age != "All ages" && location != "Global") {
            let additionalText = "(" + location + ", " + age + " years old)";
            text = text + " " + additionalText;
        }
        else if (sex != "Both" && location != "Global") {
            let additionalText = "(" + location + ", " + sex + ")";
            text = text + " " + additionalText;
        }
        else if (age != "All ages") {
            let additionalText = "(" + age + " years old)";
            text = text + " " + additionalText;
        }
        else if (sex != "Both") {
            let additionalText = "(" + sex + ")";
            text = text + " " + additionalText;
        }
        else if (location != "Global") {
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
        }
        else {
            text = "Total " + cause + " deaths brake down";
        }
        if (age != "All ages" && sex != "Both" && location != "Global") {
            let additionalText = "(" + location + ", " + sex + ", " + age + " years old)";
            text = text + " " + additionalText;
        }
        else if (age != "All ages" && sex != "Both") {
            let additionalText = "(" + sex + ", " + age + " years old)";
            text = text + " " + additionalText;
        }
        else if (age != "All ages" && location != "Global") {
            let additionalText = "(" + location + ", " + age + " years old)";
            text = text + " " + additionalText;
        }
        else if (sex != "Both" && location != "Global") {
            let additionalText = "(" + location + ", " + sex + ")";
            text = text + " " + additionalText;
        }
        else if (age != "All ages") {
            let additionalText = "(" + age + " years old)";
            text = text + " " + additionalText;
        }
        else if (sex != "Both") {
            let additionalText = "(" + sex + ")";
            text = text + " " + additionalText;
        }
        else if (location != "Global") {
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
        treemap_chart.series[0].setRootNode?.("", true, {
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
            let elem = radioElements[i];
            if (elem.value == "Both") {
                elem.checked = true;
            }
            else {
                elem.checked = false;
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
        }
        else if (sex == "Male") {
            maleEl.classList.add("pyramid-label-selected");
            femaleEl.classList.remove("pyramid-label-selected");
            maleSeriesEl.classList.remove("pyramid-series-inactive");
            femaleSeriesEl.classList.add("pyramid-series-inactive");
        }
        else if (sex == "Female") {
            maleEl.classList.remove("pyramid-label-selected");
            femaleEl.classList.add("pyramid-label-selected");
            maleSeriesEl.classList.add("pyramid-series-inactive");
            femaleSeriesEl.classList.remove("pyramid-series-inactive");
        }
    }
    function setPyramidBands() {
        let new_bands = [];
        let catAges = [...ALL_AGES];
        catAges.pop();
        if (age == "All ages") {
            for (let i = 0; i < (catAges.length); i++) {
                new_bands.push({ from: i - 0.5, to: i + 0.5, className: 'pyramid-band' });
            }
        }
        else {
            for (let i = 0; i < (catAges.length); i++) {
                if (catAges.indexOf(age) == i) {
                    new_bands.push({ from: i - 0.5, to: i + 0.5, className: 'pyramid-band-selected' });
                }
                else {
                    new_bands.push({ from: i - 0.5, to: i + 0.5, className: 'pyramid-band' });
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
                }
                else {
                    el.classList.remove("selected-element");
                }
            }
        }
        else {
            for (let el of elements) {
                el.classList.remove("selected-element");
            }
        }
    }
})
    .catch(function (error) {
    console.log(error);
});
var oldDeathTree = d3.csv(old_death_path)
    .then(function (data) {
    function get_data() {
        var new_data = [];
        for (let row of data) {
            new_data.push({ name: row.Cause, value: +row.Number, colorIndex: getColor.get(row.Cause) });
        }
        return new_data;
    }
    let initial_data = get_data();
    let chart = Highcharts.chart({
        chart: {
            type: 'treemap',
            height: 300,
            renderTo: 'old_death_tree'
        },
        title: {
            text: undefined
        },
        tooltip: {
            formatter: function () {
                var title = fCapital(this.key);
                var deaths = numberFormatter(this.point.value);
                let perc = this.point.value / this.point.series.tree.val * 100;
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
});
// To keep color of causes consistent
let getColor = new Map();
getColor.set('Cardiovascular diseases', 2);
getColor.set('Cardiovascular diseases', 2);
getColor.set('Cardiovascular disease', 2);
getColor.set('Cancer', 4);
getColor.set('Chronic respiratory diseases', 6);
getColor.set('Pneumonia or influenza', 6);
getColor.set('Respiratory infections and tuberculosis', 18);
getColor.set('Tuberculosis', 18);
getColor.set('Neurological disorders', 24);
getColor.set('Senility', 24);
getColor.set('Diabetes and kidney diseases', 3);
getColor.set('Nephropathies', 3);
getColor.set('Digestive diseases', 0);
getColor.set('Maternal and neonatal disorders', 23);
getColor.set('Maternal disorders', 23);
getColor.set('Neonatal disorders', 23);
getColor.set('Unintentional injuries', 8);
getColor.set('Accidents', 8);
getColor.set('Enteric infections', 20);
getColor.set('Gastrointestinal infections', 20);
getColor.set('Transport injuries', 10);
getColor.set('Other non-communicable diseases', 1);
getColor.set('HIV/AIDS', 16);
getColor.set('HIV/AIDS and sexually transmitted infections', 16);
getColor.set('Other infectious diseases', 17);
getColor.set('Self-harm', 12);
getColor.set('Suicide', 12);
getColor.set('Neglected tropical diseases and malaria', 15);
getColor.set('Diphtheria', 18);
getColor.set('Interpersonal violence', 11);
getColor.set('Substance use disorders', 27);
getColor.set('Nutritional deficiencies', 25);
getColor.set('Conflict and terrorism', 7);
getColor.set('Musculoskeletal disorders', 26);
getColor.set('Sexually transmitted infections excluding HIV', 16);
getColor.set('Skin and subcutaneous diseases', 5);
getColor.set('Executions and police conflict', 9);
getColor.set('Mental disorders', 22);
getColor.set('Sense organ diseases', 4);
getColor.set('High systolic blood pressure', 30);
getColor.set('High LDL cholesterol', 30);
getColor.set('Diabetes', 30);
getColor.set('Kidney dysfunction', 30);
getColor.set('Low bone mineral density', 30);
getColor.set('Air pollution', 33);
getColor.set('Unsafe water, sanitation, and handwashing', 33);
getColor.set('Non-optimal temperature', 33);
getColor.set('Other environmental risks', 33);
getColor.set('Intimate partner violence', 33);
getColor.set('Childhood sexual abuse and bullying', 33);
getColor.set('Dietary risks', 28);
getColor.set('Obesity', 28);
getColor.set('Smoking', 28);
getColor.set('Child and maternal malnutrition', 28);
getColor.set('Alcohol use', 28);
getColor.set('Unsafe sex', 28);
getColor.set('Low physical activity', 28);
getColor.set('Occupational risks', 28);
getColor.set('Drug use', 28);
let getMapColor = new Map();
getMapColor.set('Cardiovascular diseases', 2);
getMapColor.set('Cardiovascular disease', 2);
getMapColor.set('Cancer', 2);
getMapColor.set('Chronic respiratory diseases', 2);
getMapColor.set('Pneumonia or influenza', 2);
getMapColor.set('Respiratory infections and tuberculosis', 16);
getMapColor.set('Tuberculosis', 16);
getMapColor.set('Neurological disorders', 23);
getMapColor.set('Senility', 23);
getMapColor.set('Diabetes and kidney diseases', 2);
getMapColor.set('Nephropathies', 2);
getMapColor.set('Digestive diseases', 2);
getMapColor.set('Maternal and neonatal disorders', 23);
getMapColor.set('Maternal disorders', 23);
getMapColor.set('Neonatal disorders', 23);
getMapColor.set('Unintentional injuries', 8);
getMapColor.set('Accidents', 8);
getMapColor.set('Enteric infections', 16);
getMapColor.set('Gastrointestinal infections', 16);
getMapColor.set('Transport injuries', 8);
getMapColor.set('Other non-communicable diseases', 2);
getMapColor.set('HIV/AIDS', 16);
getMapColor.set('HIV/AIDS and sexually transmitted infections', 16);
getMapColor.set('Other infectious diseases', 16);
getMapColor.set('Self-harm', 8);
getMapColor.set('Suicide', 8);
getMapColor.set('Neglected tropical diseases and malaria', 16);
getMapColor.set('Diphtheria', 16);
getMapColor.set('Interpersonal violence', 8);
getMapColor.set('Substance use disorders', 23);
getMapColor.set('Nutritional deficiencies', 23);
getMapColor.set('Conflict and terrorism', 8);
getMapColor.set('Musculoskeletal disorders', 23);
getMapColor.set('Sexually transmitted infections excluding HIV', 16);
getMapColor.set('Skin and subcutaneous diseases', 2);
getMapColor.set('Executions and police conflict', 8);
getMapColor.set('Mental disorders', 23);
getMapColor.set('Sense organ diseases', 2);
let getCauseParent = new Map();
getCauseParent.set("Tuberculosis", "Respiratory infections and tuberculosis");
getCauseParent.set("Upper respiratory infections", "Respiratory infections and tuberculosis");
getCauseParent.set("Otitis media", "Respiratory infections and tuberculosis");
getCauseParent.set("Lower respiratory infections", "Respiratory infections and tuberculosis");
getCauseParent.set("Respiratory infections and tuberculosis", "");
getCauseParent.set("Diarrheal diseases", "Enteric infections");
getCauseParent.set("Typhoid and paratyphoid", "Enteric infections");
getCauseParent.set("Other intestinal infectious diseases", "Enteric infections");
getCauseParent.set("Invasive Non-typhoidal Salmonella (iNTS)", "Enteric infections");
getCauseParent.set("Enteric infections", "");
getCauseParent.set("Malaria", "Neglected tropical diseases and malaria");
getCauseParent.set("Chagas disease", "Neglected tropical diseases and malaria");
getCauseParent.set("Leishmaniasis", "Neglected tropical diseases and malaria");
getCauseParent.set("African trypanosomiasis", "Neglected tropical diseases and malaria");
getCauseParent.set("Schistosomiasis", "Neglected tropical diseases and malaria");
getCauseParent.set("Cystic echinococcosis", "Neglected tropical diseases and malaria");
getCauseParent.set("Cysticercosis", "Neglected tropical diseases and malaria");
getCauseParent.set("Lymphatic filariasis", "Neglected tropical diseases and malaria");
getCauseParent.set("Onchocerciasis", "Neglected tropical diseases and malaria");
getCauseParent.set("Trachoma", "Neglected tropical diseases and malaria");
getCauseParent.set("Dengue", "Neglected tropical diseases and malaria");
getCauseParent.set("Yellow fever", "Neglected tropical diseases and malaria");
getCauseParent.set("Rabies", "Neglected tropical diseases and malaria");
getCauseParent.set("Intestinal nematode infections", "Neglected tropical diseases and malaria");
getCauseParent.set("Leprosy", "Neglected tropical diseases and malaria");
getCauseParent.set("Food-borne trematodiases", "Neglected tropical diseases and malaria");
getCauseParent.set("Ebola", "Neglected tropical diseases and malaria");
getCauseParent.set("Zika virus", "Neglected tropical diseases and malaria");
getCauseParent.set("Other neglected tropical diseases", "Neglected tropical diseases and malaria");
getCauseParent.set("Neglected tropical diseases and malaria", "");
getCauseParent.set("Neonatal disorders", "Maternal and neonatal disorders");
getCauseParent.set("Maternal disorders", "Maternal and neonatal disorders");
getCauseParent.set("Maternal and neonatal disorders", "");
getCauseParent.set("Bladder cancer", "Cancer");
getCauseParent.set("Brain and nervous system cancer", "Cancer");
getCauseParent.set("Breast cancer", "Cancer");
getCauseParent.set("Cervical cancer", "Cancer");
getCauseParent.set("Colon and rectum cancer", "Cancer");
getCauseParent.set("Esophageal cancer", "Cancer");
getCauseParent.set("Gallbladder and biliary tract cancer", "Cancer");
getCauseParent.set("Kidney cancer", "Cancer");
getCauseParent.set("Larynx cancer", "Cancer");
getCauseParent.set("Leukemia", "Cancer");
getCauseParent.set("Lip and oral cavity cancer", "Cancer");
getCauseParent.set("Liver cancer", "Cancer");
getCauseParent.set("Malignant skin melanoma", "Cancer");
getCauseParent.set("Nasopharynx cancer", "Cancer");
getCauseParent.set("Non-melanoma skin cancer", "Cancer");
getCauseParent.set("Other pharynx cancer", "Cancer");
getCauseParent.set("Ovarian cancer", "Cancer");
getCauseParent.set("Pancreatic cancer", "Cancer");
getCauseParent.set("Prostate cancer", "Cancer");
getCauseParent.set("Stomach cancer", "Cancer");
getCauseParent.set("Testicular cancer", "Cancer");
getCauseParent.set("Thyroid cancer", "Cancer");
getCauseParent.set("Tracheal, bronchus, and lung cancer", "Cancer");
getCauseParent.set("Uterine cancer", "Cancer");
getCauseParent.set("Mesothelioma", "Cancer");
getCauseParent.set("Hodgkin lymphoma", "Cancer");
getCauseParent.set("Non-Hodgkin lymphoma", "Cancer");
getCauseParent.set("Multiple myeloma", "Cancer");
getCauseParent.set("Other malignant neoplasms", "Cancer");
getCauseParent.set("Other neoplasms", "Cancer");
getCauseParent.set("Brain and central nervous system cancer", "Cancer");
getCauseParent.set("Cancer", "");
getCauseParent.set("Ischemic heart disease", "Cardiovascular diseases");
getCauseParent.set("Rheumatic heart disease", "Cardiovascular diseases");
getCauseParent.set("Non-rheumatic valvular heart disease", "Cardiovascular diseases");
getCauseParent.set("Stroke", "Cardiovascular diseases");
getCauseParent.set("Hypertensive heart disease", "Cardiovascular diseases");
getCauseParent.set("Cardiomyopathy and myocarditis", "Cardiovascular diseases");
getCauseParent.set("Aortic aneurysm", "Cardiovascular diseases");
getCauseParent.set("Atrial fibrillation and flutter", "Cardiovascular diseases");
getCauseParent.set("Endocarditis", "Cardiovascular diseases");
getCauseParent.set("Peripheral artery disease", "Cardiovascular diseases");
getCauseParent.set("Other cardiovascular and circulatory diseases", "Cardiovascular diseases");
getCauseParent.set("Cardiovascular diseases", "");
getCauseParent.set("Alzheimer's disease and other dementias", "Neurological disorders");
getCauseParent.set("Motor neuron disease", "Neurological disorders");
getCauseParent.set("Multiple sclerosis", "Neurological disorders");
getCauseParent.set("Other neurological disorders", "Neurological disorders");
getCauseParent.set("Parkinson's disease", "Neurological disorders");
getCauseParent.set("Headache disorders", "Neurological disorders");
getCauseParent.set("Idiopathic epilepsy", "Neurological disorders");
getCauseParent.set("Neurological disorders", "");
getCauseParent.set("Anxiety disorders", "Mental disorders");
getCauseParent.set("Attention-deficit/hyperactivity disorder", "Mental disorders");
getCauseParent.set("Autism spectrum disorders", "Mental disorders");
getCauseParent.set("Bipolar disorder", "Mental disorders");
getCauseParent.set("Depressive disorders", "Mental disorders");
getCauseParent.set("Idiopathic developmental intellectual disability", "Mental disorders");
getCauseParent.set("Other mental disorders", "Mental disorders");
getCauseParent.set("Schizophrenia", "Mental disorders");
getCauseParent.set("Conduct disorder", "Mental disorders");
getCauseParent.set("Eating disorders", "Mental disorders");
getCauseParent.set("Mental disorders", "");
getCauseParent.set("Alcohol use disorders", "Substance use disorders");
getCauseParent.set("Drug use disorders", "Substance use disorders");
getCauseParent.set("Substance use disorders", "");
getCauseParent.set("Acute glomerulonephritis", "Diabetes and kidney diseases");
getCauseParent.set("Diabetes mellitus", "Diabetes and kidney diseases");
getCauseParent.set("Chronic kidney disease", "Diabetes and kidney diseases");
getCauseParent.set("Diabetes and kidney diseases", "");
getCauseParent.set("Cyclist road injuries", "Transport injuries");
getCauseParent.set("Motor vehicle road injuries", "Transport injuries");
getCauseParent.set("Motorcyclist road injuries", "Transport injuries");
getCauseParent.set("Other road injuries", "Transport injuries");
getCauseParent.set("Pedestrian road injuries", "Transport injuries");
getCauseParent.set("Other transport injuries", "Transport injuries");
getCauseParent.set("Transport injuries", "");
getCauseParent.set("Animal contact", "Unintentional injuries");
getCauseParent.set("Drowning", "Unintentional injuries");
getCauseParent.set("Environmental heat and cold exposure", "Unintentional injuries");
getCauseParent.set("Exposure to forces of nature", "Unintentional injuries");
getCauseParent.set("Exposure to mechanical forces", "Unintentional injuries");
getCauseParent.set("Falls", "Unintentional injuries");
getCauseParent.set("Fire, heat, and hot substances", "Unintentional injuries");
getCauseParent.set("Foreign body", "Unintentional injuries");
getCauseParent.set("Poisonings", "Unintentional injuries");
getCauseParent.set("Other unintentional injuries", "Unintentional injuries");
getCauseParent.set("Adverse effects of medical treatment", "Unintentional injuries");
getCauseParent.set("Unintentional injuries", "");
getCauseParent.set("Sexually transmitted infections excluding HIV", "HIV/AIDS and sexually transmitted infections");
getCauseParent.set("HIV/AIDS", "HIV/AIDS and sexually transmitted infections");
getCauseParent.set("HIV/AIDS and sexually transmitted infections", "");
getCauseParent.set("Chronic obstructive pulmonary disease", "Chronic respiratory diseases");
getCauseParent.set("Asthma", "Chronic respiratory diseases");
getCauseParent.set("Pneumoconiosis", "Chronic respiratory diseases");
getCauseParent.set("Interstitial lung disease and pulmonary sarcoidosis", "Chronic respiratory diseases");
getCauseParent.set("Other chronic respiratory diseases", "Chronic respiratory diseases");
getCauseParent.set("Chronic respiratory diseases", "");
getCauseParent.set("Acute hepatitis", "Other infectious diseases");
getCauseParent.set("Meningitis", "Other infectious diseases");
getCauseParent.set("Encephalitis", "Other infectious diseases");
getCauseParent.set("Diphtheria", "Other infectious diseases");
getCauseParent.set("Whooping cough", "Other infectious diseases");
getCauseParent.set("Tetanus", "Other infectious diseases");
getCauseParent.set("Measles", "Other infectious diseases");
getCauseParent.set("Varicella and herpes zoster", "Other infectious diseases");
getCauseParent.set("Other unspecified infectious diseases", "Other infectious diseases");
getCauseParent.set("Other infectious diseases", "");
getCauseParent.set("Appendicitis", "Digestive diseases");
getCauseParent.set("Cirrhosis and other chronic liver diseases", "Digestive diseases");
getCauseParent.set("Upper digestive system diseases", "Digestive diseases");
getCauseParent.set("Paralytic ileus and intestinal obstruction", "Digestive diseases");
getCauseParent.set("Inguinal, femoral, and abdominal hernia", "Digestive diseases");
getCauseParent.set("Inflammatory bowel disease", "Digestive diseases");
getCauseParent.set("Gallbladder and biliary diseases", "Digestive diseases");
getCauseParent.set("Vascular intestinal disorders", "Digestive diseases");
getCauseParent.set("Pancreatitis", "Digestive diseases");
getCauseParent.set("Other digestive diseases", "Digestive diseases");
getCauseParent.set("Digestive diseases", "");
getCauseParent.set("Congenital birth defects", "Other non-communicable diseases");
getCauseParent.set("Gynecological diseases", "Other non-communicable diseases");
getCauseParent.set("Urinary diseases and male infertility", "Other non-communicable diseases");
getCauseParent.set("Endocrine, metabolic, blood, and immune disorders", "Other non-communicable diseases");
getCauseParent.set("Sudden infant death syndrome", "Other non-communicable diseases");
getCauseParent.set("Hemoglobinopathies and hemolytic anemias", "Other non-communicable diseases");
getCauseParent.set("Other non-communicable diseases", "");
getCauseParent.set("Conflict and terrorism", "");
getCauseParent.set("Executions and police conflict", "");
getCauseParent.set("Interpersonal violence", "");
getCauseParent.set("Musculoskeletal disorders", "");
getCauseParent.set("Nutritional deficiencies", "");
getCauseParent.set("Skin and subcutaneous diseases", "");
getCauseParent.set("Suicide", "");
let getCauseMaxValue = new Map();
getCauseMaxValue.set("Cancer", 30);
getCauseMaxValue.set("Cardiovascular diseases", 60);
getCauseMaxValue.set("Chronic respiratory diseases", 20);
getCauseMaxValue.set("Conflict and terrorism", 9);
getCauseMaxValue.set("Diabetes and kidney diseases", 20);
getCauseMaxValue.set("Digestive diseases", 10);
getCauseMaxValue.set("Enteric infections", 20);
getCauseMaxValue.set("Executions and police conflict", 0.5);
getCauseMaxValue.set("HIV/AIDS and sexually transmitted infections", 25);
getCauseMaxValue.set("Interpersonal violence", 5);
getCauseMaxValue.set("Maternal and neonatal disorders", 15);
getCauseMaxValue.set("Mental disorders", 0);
getCauseMaxValue.set("Musculoskeletal disorders", 0.5);
getCauseMaxValue.set("Neglected tropical diseases and malaria", 15);
getCauseMaxValue.set("Neurological disorders", 10);
getCauseMaxValue.set("Nutritional deficiencies", 5);
getCauseMaxValue.set("Other infectious diseases", 10);
getCauseMaxValue.set("Other non-communicable diseases", 10);
getCauseMaxValue.set("Respiratory infections and tuberculosis", 20);
getCauseMaxValue.set("Skin and subcutaneous diseases", 0.5);
getCauseMaxValue.set("Substance use disorders", 2.5);
getCauseMaxValue.set("Suicide", 7);
getCauseMaxValue.set("Transport injuries", 15);
getCauseMaxValue.set("Unintentional injuries", 8);
