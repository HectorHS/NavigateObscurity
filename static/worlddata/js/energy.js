// helpers
import { fCapital, getCountryCode, numberFormatter, getIndexColor, addTabClickEvents, getCountryName, getHighchartsMapCSSName, fLower, createLegend } from "./chartHelper.js";
let energy_map_path = "/static/worlddata/csv/energy-map.csv";
let energy_area_path = "/static/worlddata/csv/energy-area.csv";
let energy_trade_path = "/static/worlddata/csv/energy-trade.csv";
let energy_sectors_path = "/static/worlddata/csv/energy-consumption-sectors.csv";
let tabcss = "energy_intro";
addTabClickEvents(tabcss);
var energyDashboard = Promise.all([
    d3.csv(energy_map_path),
    d3.csv(energy_area_path),
    d3.csv(energy_trade_path),
    d3.csv(energy_sectors_path)
]).then(function (files) {
    // Default values
    let getColor = new Map();
    getColor.set('oil', 51);
    getColor.set("oilmax", 52);
    getColor.set("gas", 9);
    getColor.set("gasmax", 9);
    getColor.set("coal", 50);
    getColor.set("coalmax", 52);
    getColor.set("nuclear", 4);
    getColor.set("nuclearmax", 3);
    getColor.set("hydro", 2);
    getColor.set("hydromax", 1);
    getColor.set("renew", 24);
    getColor.set("renewmax", 22);
    getColor.set("solar", 21);
    getColor.set("wind", 23);
    getColor.set("geothermal", 25);
    getColor.set("biofuels", 26);
    getColor.set("electricity", 45);
    getColor.set("transport", 39);
    getColor.set("residential", 36);
    getColor.set("services", 20);
    getColor.set("industry", 16);
    getColor.set("other", 52);
    getColor.set("road", 38);
    getColor.set("train", 39);
    getColor.set("water", 40);
    getColor.set("air", 41);
    getColor.set("appliances_res", 35);
    getColor.set("lighting_res", 36);
    getColor.set("cooling_res", 37);
    getColor.set("heating_res", 38);
    getColor.set("lighting_ser", 18);
    getColor.set("cooling_ser", 19);
    getColor.set("heating_ser", 20);
    getColor.set("agriculture", 14);
    getColor.set("mining", 15);
    getColor.set("metal", 16);
    getColor.set("mineral", 17);
    getColor.set("chemical", 18);
    getColor.set("paper", 19);
    getColor.set("construction", 20);
    let country = "World";
    let source = "All";
    let all_years = files[1].columns;
    all_years.splice(0, 2);
    let initial_area_data = get_area_data();
    let initial_import_data = getTradeData("Import");
    let initial_import_xaxis = getTradeXAxis("Import");
    let initial_export_data = getTradeData("Export");
    let initial_export_xaxis = getTradeXAxis("Export");
    let initial_data = get_map_data();
    let initial_sector_data = getSectorData();
    let statEnergy = document.getElementById("stat_energy");
    let statCO2 = document.getElementById("stat_co2");
    let statPop = document.getElementById("stat_population");
    let statImport = document.getElementById("stat_import");
    let statExport = document.getElementById("stat_export");
    // radio
    document.getElementsByName('source-radio').forEach(function (a) {
        a.onchange = energyRadioChange;
    });
    function energyRadioChange() {
        source = document.querySelector('input[name="source-radio"]:checked').value;
        // update area
        setAreaData();
        // update map
        updateColorStops();
        map_chart.series[0].setData(get_map_data());
        let title = document.getElementById('map_title');
        let newTitle;
        if (source == "All") {
            newTitle = "Energy used per person";
        }
        else {
            newTitle = source + " as % of all energy used";
        }
        title.innerHTML = newTitle;
        // if country is already selected, keep it selected
        if (country != "World") {
            highlightCountry(false);
        }
    }
    function get_map_data() {
        let new_data = [];
        let val = 0;
        for (let row of files[0]) {
            if (source == "All") {
                val = +row.consumption_pc;
            }
            else if (source == "Oil") {
                val = +row.oil;
            }
            else if (source == "Gas") {
                val = +row.gas;
            }
            else if (source == "Coal") {
                val = +row.coal;
            }
            else if (source == "Nuclear") {
                val = +row.nuclear;
            }
            else if (source == "Hydroelectric") {
                val = +row.hydro;
            }
            else if (source == "Renewables") {
                val = +row.renewables;
            }
            new_data.push({ id: row.country, country: getCountryCode(row.country), value: val });
        }
        return new_data;
    }
    function getSectorData() {
        let newData = [];
        for (let row of files[3]) {
            if (getCountryName(row.country) == country) {
                newData.push({ id: 'Transport', parent: '', name: 'transport', value: +row.transport_total, colorIndex: getColor.get('transport'), className: "highcharts-point-level1" });
                if (+row.transport_road > 0) {
                    newData.push({ id: 'Road', parent: 'Transport', name: 'road', value: +row.transport_road, colorIndex: getColor.get('road'), className: 'saturated' });
                }
                if (+row.transport_trains > 0) {
                    newData.push({ id: 'Trains', parent: 'Transport', name: 'train', value: +row.transport_trains, colorIndex: getColor.get('train'), className: 'saturated' });
                }
                if (+row.transport_ships > 0) {
                    newData.push({ id: 'Ships', parent: 'Transport', name: 'water', value: +row.transport_ships, colorIndex: getColor.get('water'), className: 'saturated' });
                }
                if (+row.transport_airplanes > 0) {
                    newData.push({ id: 'Airplanes', parent: 'Transport', name: 'air', value: +row.transport_airplanes, colorIndex: getColor.get('air'), className: 'saturated' });
                }
                if (+row.residential_total > 0) {
                    newData.push({ id: 'Residential', parent: '', name: 'Residential', value: +row.residential_total, colorIndex: getColor.get('residential'), className: "highcharts-point-level1" });
                }
                if (+row.residential_appliances > 0) {
                    newData.push({ id: 'Appliances', parent: 'Residential', name: 'appliances', value: +row.residential_appliances, colorIndex: getColor.get('appliances_res'), className: 'saturated' });
                }
                if (+row.residential_lighting > 0) {
                    newData.push({ id: 'Lighting', parent: 'Residential', name: 'lighting', value: +row.residential_lighting, colorIndex: getColor.get('lighting_res'), className: 'saturated' });
                }
                if (+row.residential_cooling > 0) {
                    newData.push({ id: 'Cooling', parent: 'Residential', name: 'cooling', value: +row.residential_cooling, colorIndex: getColor.get('cooling_res'), className: 'saturated' });
                }
                if (+row.residential_heating > 0) {
                    newData.push({ id: 'Heating', parent: 'Residential', name: 'heating', value: +row.residential_heating, colorIndex: getColor.get('heating_res'), className: 'saturated' });
                }
                if (+row.services_total > 0) {
                    newData.push({ id: 'Services', parent: '', name: 'services', value: +row.services_total, colorIndex: getColor.get('services'), className: "highcharts-point-level1" });
                }
                if (+row.services_lighting > 0) {
                    newData.push({ id: 'Lighting', parent: 'Services', name: 'lighting', value: +row.services_lighting, colorIndex: getColor.get('lighting_ser'), className: 'saturated' });
                }
                if (+row.services_cooling > 0) {
                    newData.push({ id: 'Cooling', parent: 'Services', name: 'cooling', value: +row.services_cooling, colorIndex: getColor.get('cooling_ser'), className: 'saturated' });
                }
                if (+row.services_heating > 0) {
                    newData.push({ id: 'Heating', parent: 'Services', name: 'heating', value: +row.services_heating, colorIndex: getColor.get('heating_ser'), className: 'saturated' });
                }
                newData.push({ id: 'Industry', parent: '', name: 'Industry', value: +row.industry_total, colorIndex: getColor.get('industry'), className: "highcharts-point-level1" });
                if (+row.industry_agriculture > 0) {
                    newData.push({ id: 'Agriculture', parent: 'Industry', name: 'agriculture', value: +row.industry_agriculture, colorIndex: getColor.get('agriculture'), className: 'saturated' });
                }
                if (+row.industry_mining > 0) {
                    newData.push({ id: 'Mining', parent: 'Industry', name: 'mining', value: +row.industry_mining, colorIndex: getColor.get('mining'), className: 'saturated' });
                }
                if (+row.industry_metals > 0) {
                    newData.push({ id: 'Metals', parent: 'Industry', name: 'metal production', value: +row.industry_metals, colorIndex: getColor.get('metal'), className: 'saturated' });
                }
                if (+row.industry_minerals > 0) {
                    newData.push({ id: 'Minerals', parent: 'Industry', name: 'mineral production', value: +row.industry_minerals, colorIndex: getColor.get('mineral'), className: 'saturated' });
                }
                if (+row.industry_chemicals > 0) {
                    newData.push({ id: 'Chemicals', parent: 'Industry', name: 'chemical production', value: +row.industry_chemicals, colorIndex: getColor.get('chemical'), className: 'saturated' });
                }
                if (+row.industry_paper > 0) {
                    newData.push({ id: 'Paper', parent: 'Industry', name: 'paper production', value: +row.industry_paper, colorIndex: getColor.get('paper'), className: 'saturated' });
                }
                if (+row.industry_construction > 0) {
                    newData.push({ id: 'Construction', parent: 'Industry', name: 'construction', value: +row.industry_construction, colorIndex: getColor.get('construction'), className: 'saturated' });
                }
                newData.push({ id: 'Other', parent: '', name: 'other', value: +row.other, colorIndex: getColor.get('other'), className: "highcharts-point-level1" });
            }
        }
        return newData;
    }
    function get_area_data() {
        var new_data = [];
        if (source == "Renewables") {
            for (let row of files[1]) {
                if (getCountryName(row.country) == country && (row.type == "solar" || row.type == "wind" || row.type == "geothermal" || row.type == "biofuels")) {
                    let year_data = [];
                    for (let ye in all_years) {
                        year_data[ye] = +row[all_years[ye]];
                    }
                    new_data.push({ type: 'area', id: row.type, name: row.type, data: year_data, colorIndex: getColor.get(row.type) });
                }
            }
        }
        else {
            for (let row of files[1]) {
                if (getCountryName(row.country) == country && (source == "All" || source.toLocaleLowerCase() == row.type)) {
                    let year_data = [];
                    for (let ye in all_years) {
                        year_data[ye] = +row[all_years[ye]];
                    }
                    new_data.push({ type: 'area', id: row.type, name: row.type, data: year_data, colorIndex: getColor.get(row.type) });
                }
            }
        }
        return new_data;
    }
    function setTradeAxis() {
        let max = 0;
        max = import_chart.yAxis[0].max;
        if (export_chart.yAxis[0].max > max) {
            max = export_chart.yAxis[0].max;
        }
        import_chart.yAxis[0].setExtremes(undefined, max);
        export_chart.yAxis[0].setExtremes(undefined, max);
    }
    function getTradeData(type) {
        let oilData = [];
        let gasData = [];
        let coalData = [];
        let elecData = [];
        // get subset with source country
        // get a list of target countries
        // go through list add to arrays
        let mySubset = files[2].filter((d) => { return getCountryName(d.SourceCountry) == country && d.Type == type; });
        mySubset.sort(function (a, b) {
            return parseFloat(b.Total) - parseFloat(a.Total);
        });
        let targetCountries = [...new Set(mySubset.map((d) => d.TargetCountry))];
        for (let coun of targetCountries) {
            for (let row of mySubset) {
                if (row.TargetCountry == coun) {
                    oilData.push(+row.Oil);
                    gasData.push(+row.NaturalGas);
                    coalData.push(+row.Coal);
                    elecData.push(+row.Electricity);
                }
            }
        }
        let series = [];
        let oilSlice = {
            name: 'Oil',
            type: 'bar',
            data: oilData,
            colorIndex: getColor.get('oil')
        };
        let gasSlice = {
            name: 'Natural gas',
            type: 'bar',
            data: gasData,
            colorIndex: getColor.get('gas')
        };
        let coalSlice = {
            name: 'Coal',
            type: 'bar',
            data: coalData,
            colorIndex: getColor.get('coal')
        };
        let elecSlice = {
            name: 'Electricity',
            type: 'bar',
            data: elecData,
            colorIndex: getColor.get('electricity')
        };
        series.push(oilSlice);
        series.push(gasSlice);
        series.push(coalSlice);
        series.push(elecSlice);
        return series;
    }
    function getTradeXAxis(type) {
        let countries = [];
        let mySubset = files[2].filter((d) => { return getCountryName(d.SourceCountry) == country && d.Type == type; });
        mySubset.sort(function (a, b) {
            return parseFloat(b.Total) - parseFloat(a.Total);
        });
        let Targetcountries = [...new Set(mySubset.map((d) => d.TargetCountry))];
        for (let coun of Targetcountries) {
            countries.push(getCountryName(coun));
        }
        return countries;
    }
    function updateCountry() {
        let element = document.getElementsByClassName("dashboard-profile-country")[0].firstElementChild;
        element.innerHTML = country;
        let importTitle = document.getElementById('import_title');
        let exportTitle = document.getElementById('export_title');
        let newImportTitle;
        let newExportTitle;
        if (country == "World") {
            newImportTitle = "Countries importing the most energy";
            newExportTitle = "Countries exporting the most energy";
        }
        else {
            newImportTitle = country + " received energy from:";
            newExportTitle = country + " gave energy to:";
        }
        importTitle.innerHTML = newImportTitle;
        exportTitle.innerHTML = newExportTitle;
        setAreaData();
        setTradeData();
        setSectorData();
        setStats();
    }
    function setSectorData() {
        // Update sector data
        let newSectorData = getSectorData();
        sector_pie_chart.series[0].update({
            type: 'sunburst',
            data: newSectorData
        });
        sector_pie_chart.redraw();
        // Hide / show errors for missing data
        let errorSectors = document.getElementById("energy_sectors_error");
        if (newSectorData.length > 1) {
            errorSectors.classList.add("hide");
        }
        else {
            errorSectors.classList.remove("hide");
        }
    }
    function setTradeData() {
        // Update trade data
        let loopsImport = import_chart.series.length;
        let loopsExport = export_chart.series.length;
        let updatedImportData = getTradeData('Import');
        let updatedExportData = getTradeData('Export');
        // First empty the existing data
        for (let i = 0; i < loopsImport; i++) {
            import_chart.series[0].remove(false);
        }
        for (let i = 0; i < loopsExport; i++) {
            export_chart.series[0].remove(false);
        }
        // Reset max values of axes
        import_chart.yAxis[0].setExtremes(undefined, undefined);
        export_chart.yAxis[0].setExtremes(undefined, undefined);
        // Then add the updated data
        for (let i = 0; i < updatedImportData.length; i++) {
            import_chart.addSeries(updatedImportData[i], false);
        }
        for (let i = 0; i < updatedExportData.length; i++) {
            export_chart.addSeries(updatedExportData[i], false);
        }
        let xAxisCountriesImport = getTradeXAxis('Import');
        let xAxisCountriesExport = getTradeXAxis('Export');
        import_chart.update({
            xAxis: [{
                    categories: xAxisCountriesImport
                }]
        });
        export_chart.update({
            xAxis: [{
                    categories: xAxisCountriesExport
                }]
        });
        setTradeAxis();
        import_chart.redraw();
        export_chart.redraw();
    }
    function setAreaData() {
        // Update Area data
        let loops = area_chart.series.length;
        let updated_area_data = get_area_data();
        // First empty the existing data
        for (let i = 0; i < loops; i++) {
            area_chart.series[0].remove(false);
        }
        // Then add the updated data
        for (let i = 0; i < updated_area_data.length; i++) {
            area_chart.addSeries(updated_area_data[i], false);
        }
        area_chart.redraw();
        // Hide / show errors for missing data
        let errorArea = document.getElementById("energy_area_error");
        if (updated_area_data.length > 0) {
            errorArea.classList.add("hide");
        }
        else {
            errorArea.classList.remove("hide");
        }
    }
    // To better centre and distribute colors. Max is always double the average value.
    function updateColorStops() {
        let updatedColorAxis = {};
        if (source == "All") {
            updatedColorAxis = {
                tickInterval: 100,
                max: 350,
                min: 50,
                startOnTick: false,
                endOnTick: false,
                stops: [
                    [0, getIndexColor(3)],
                    [0.1, getIndexColor(50)],
                    [0.95, getIndexColor(45)]
                ],
            };
        }
        else if (source == "Gas") {
            updatedColorAxis = {
                tickInterval: 20,
                max: 60,
                min: 10,
                startOnTick: false,
                endOnTick: false,
                stops: [
                    [0, getIndexColor(53)],
                    [0.95, getIndexColor(getColor.get("gasmax"))]
                ],
            };
        }
        else if (source == "Oil") {
            updatedColorAxis = {
                tickInterval: 20,
                max: 60,
                min: 10,
                startOnTick: false,
                endOnTick: false,
                stops: [
                    [0, getIndexColor(53)],
                    [0.95, getIndexColor(getColor.get("oilmax"))]
                ],
            };
        }
        else if (source == "Coal") {
            updatedColorAxis = {
                tickInterval: 20,
                max: 50,
                min: 0,
                startOnTick: false,
                endOnTick: false,
                stops: [
                    [0, getIndexColor(53)],
                    [0.95, getIndexColor(getColor.get("coalmax"))]
                ],
            };
        }
        else if (source == "Nuclear") {
            updatedColorAxis = {
                tickInterval: 10,
                max: 25,
                min: 0,
                startOnTick: false,
                endOnTick: false,
                stops: [
                    [0, getIndexColor(53)],
                    [0.95, getIndexColor(getColor.get("nuclearmax"))]
                ],
            };
        }
        else if (source == "Hydroelectric") {
            updatedColorAxis = {
                tickInterval: 10,
                max: 25,
                min: 0,
                startOnTick: false,
                endOnTick: false,
                stops: [
                    [0, getIndexColor(53)],
                    [0.95, getIndexColor(getColor.get("hydromax"))]
                ],
            };
        }
        else if (source == "Renewables") {
            updatedColorAxis = {
                tickInterval: 5,
                max: 15,
                min: 0,
                startOnTick: false,
                endOnTick: false,
                stops: [
                    [0, getIndexColor(53)],
                    [0.95, getIndexColor(getColor.get("renewmax"))]
                ],
            };
        }
        map_chart.update({
            colorAxis: updatedColorAxis,
        }, false);
    }
    function setStats() {
        let energy = '';
        let pop = '';
        let co2 = '';
        let imp = '';
        let exp = '';
        for (let row of files[0]) {
            if (country == getCountryName(row.country)) {
                energy = numberFormatter(+row.energy_share);
                pop = numberFormatter(+row.population_share);
                co2 = numberFormatter(+row.co2_share);
                imp = numberFormatter(+row.import_share);
                exp = numberFormatter(+row.export_share);
                break;
            }
        }
        statEnergy.innerHTML = energy + "%";
        statCO2.innerHTML = co2 + "%";
        statPop.innerHTML = pop + "%";
        statImport.innerHTML = imp + "%";
        statExport.innerHTML = exp + "%";
    }
    function highlightCountry(deselect) {
        let elements = document.querySelectorAll(".energy-dashboard .highcharts-map-series .highcharts-point");
        if (deselect) {
            for (let el of elements) {
                el.classList.remove("selected-element");
            }
        }
        else {
            let css = getHighchartsMapCSSName(country);
            for (let el of elements) {
                if (el.classList.contains(css)) {
                    el.classList.add("selected-element");
                }
                else {
                    el.classList.remove("selected-element");
                }
            }
        }
    }
    // Initiate the chart
    var map_chart = Highcharts.mapChart({
        chart: {
            renderTo: 'energy_map',
            events: {
                click: function () {
                    country = "World";
                    updateCountry();
                    highlightCountry(true);
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
        colorAxis: {
            tickInterval: 100,
            max: 350,
            min: 50,
            startOnTick: false,
            endOnTick: false,
            stops: [
                [0, getIndexColor(3)],
                [0.1, getIndexColor(50)],
                [0.95, getIndexColor(45)]
            ],
        },
        tooltip: {
            formatter: function () {
                var title = fCapital(this.key);
                var value = this.point.value;
                var text = "";
                if (source == "All") {
                    text = value + " gigajoules consumed per person";
                }
                else if (source == "Oil") {
                    text = numberFormatter(value) + "% of consumed energy comes from <b>oil</b>";
                }
                else if (source == "Gas") {
                    text = numberFormatter(value) + "% of consumed energy comes from <b>gas</b>";
                }
                else if (source == "Coal") {
                    text = numberFormatter(value) + "% of consumed energy comes from <b>coal</b>";
                }
                else if (source == "Nuclear") {
                    text = numberFormatter(value) + "% of consumed energy comes from <b>nuclear</b> plants";
                }
                else if (source == "Hydroelectric") {
                    text = numberFormatter(value) + "% of consumed energy comes from <b>hydroelectric</b> plants";
                }
                else if (source == "Renewables") {
                    text = numberFormatter(value) + "% of consumed energy comes from <b>renewables</b>";
                }
                return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
            },
            useHTML: true
        },
        series: [{
                type: 'map',
                mapData: Highcharts.maps['custom/world'],
                data: initial_data,
                joinBy: ['iso-a3', 'country'],
                events: {
                    click: function (e) {
                        // if same country selected, default to world
                        if (country == getCountryName(e.point.name)) {
                            country = "World";
                            highlightCountry(true);
                        }
                        else {
                            country = getCountryName(e.point.name);
                            highlightCountry(false);
                        }
                        updateCountry();
                    }
                }
            }]
    });
    let sector_pie_chart = Highcharts.chart({
        chart: {
            renderTo: 'energy_sectors'
        },
        title: {
            text: undefined
        },
        series: [{
                type: 'sunburst',
                data: initial_sector_data,
                name: 'Root',
                allowTraversingTree: true,
                allowPointSelect: true,
                innerSize: '30%',
                levelIsConstant: false,
                dataLabels: {
                    enabled: false
                },
                levels: [{
                        level: 1,
                    }, {
                        level: 2,
                        colorByPoint: true
                    }]
            }],
        tooltip: {
            headerFormat: '',
            // TODO types here
            pointFormat: 'The population of <b>{point.name}</b> is <b>{point.value}</b>',
            formatter: function () {
                // we need to manually calculate total and percentages for slices
                let series = this.series;
                let level1Points = this.series.points.filter(function (point) {
                    return point.parent == "";
                });
                let level1Total = series.__myTotal || (series.__myTotal = level1Points.map(p => p.value || 0).reduce((a, b) => a + b));
                let value = numberFormatter(this.point.value / level1Total * 100);
                let text = "";
                let drillText = "";
                if (this.point.parent == "") {
                    text = fCapital(this.key);
                }
                else {
                    let value2 = numberFormatter(this.point.value / this.point.node.parentNode.val * 100);
                    drillText = "<br>and<b> " + value2 + "%</b> of all " + fLower(this.point.parent) + " energy use";
                    if (this.point.parent == "Transport") {
                        text = "Transport by " + this.key;
                    }
                    else if (this.point.parent == "Residential") {
                        text = "Residential " + this.key;
                    }
                    else if (this.point.parent == "Industry") {
                        text = "Industrial " + this.key;
                    }
                    else if (this.point.parent == "Services") {
                        text = this.key + " for services";
                    }
                }
                let tip = "<text><b>" + text + "</b> takes up <b>" + value + "%</b> of all energy use" + drillText + "</text>";
                return tip;
            }
        }
    });
    let area_chart = Highcharts.chart({
        chart: {
            type: 'area',
            renderTo: 'energy_area'
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
                text: 'Petajoules'
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
                let value = numberFormatter(this.y);
                let text1 = '<b>' + value + "</b> petajoules of energy consumed came from <b>" + this.series.name + '</b>';
                let perc = numberFormatter(this.y / this.total * 100);
                let text2 = '<b>' + perc + "%</b> of all energy consumed in " + this.x + " came from <b>" + this.series.name + '</b>';
                return '<text><span style="font-size: 1.1em"><strong>' + country + '</strong></span><br>' + text1 + '<br>' + text2 + '</text>';
            },
            useHTML: true
        },
        series: initial_area_data,
        legend: {
            enabled: false
        }
    });
    let import_chart = Highcharts.chart({
        chart: {
            type: 'bar',
            renderTo: 'energy_import'
        },
        title: {
            text: undefined
        },
        xAxis: {
            categories: initial_import_xaxis
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Petajoules'
            }
        },
        tooltip: {
            formatter: function () {
                let text = "";
                if (country == "World") {
                    text = '<text><b>' + getCountryName(this.x) + '</b> imported a total of <br><b>' +
                        numberFormatter(this.y) + '</b> petajoules of <b>' + this.series.name + '</b></text>';
                }
                else {
                    text = '<text><b>' + country + '</b> imported from <b>' + getCountryName(this.x) + '<br/>' +
                        numberFormatter(this.y) + '</b> petajoules of <b>' + this.series.name + '</b></text>';
                }
                return text;
            }
        },
        plotOptions: {
            series: {
                stacking: 'normal',
            }
        },
        series: initial_import_data,
        legend: {
            enabled: false
        }
    });
    var export_chart = Highcharts.chart({
        chart: {
            type: 'bar',
            renderTo: 'energy_export'
        },
        title: {
            text: undefined
        },
        xAxis: {
            categories: initial_export_xaxis
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Petajoules'
            }
        },
        tooltip: {
            formatter: function () {
                let text = "";
                if (country == "World") {
                    text = '<text><b>' + getCountryName(this.x) + '</b> exported a total of <br><b>' +
                        numberFormatter(this.y) + '</b> petajoules of <b>' + this.series.name + '</b></text>';
                }
                else {
                    text = '<text><b>' + country + '</b> exported to <b>' + getCountryName(this.x) + '<br/>' +
                        numberFormatter(this.y) + '</b> petajoules of <b>' + this.series.name + '</b></text>';
                }
                return text;
            }
        },
        plotOptions: {
            series: {
                stacking: 'normal',
            }
        },
        series: initial_export_data,
        legend: {
            enabled: false
        }
    });
    setTradeAxis();
    setStats();
    // Legends
    let sector_chart_points = sector_pie_chart.series[0].data;
    createLegend(sector_chart_points, sector_chart_points, '.energy-sector');
    let area_chart_points = area_chart.series;
    createLegend(area_chart_points, area_chart_points, '.energy-area');
    map_chart.setSize();
    sector_pie_chart.setSize();
    area_chart.setSize();
    import_chart.setSize();
    export_chart.setSize();
})
    .catch(function (error) {
    console.log(error);
});
