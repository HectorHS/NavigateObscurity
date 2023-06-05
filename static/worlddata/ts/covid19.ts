// Basically saying to typescript these will be here when you need them, trust me
declare let d3: any; 
declare let Highcharts: any;
// helpers
import { fCapital, addDropdown, getCountryCode, numberFormatter, getIndexColor, addLineBreaks, addSlider, addTabClickEvents, getCountryName, getHighchartsMapCSSName  } from "./chartHelper.js";

import * as Worlddata from "./worlddataInterfaces.js";

let covid_map_path = "/static/worlddata/csv/covid-map.csv";
let covid_lockdown_notes_path = "/static/worlddata/csv/covid-lockdown-notes.csv";
let covid_excess_deaths_path = "/static/worlddata/csv/covid-excess-deaths.csv";
let covid_stats_path = "/static/worlddata/csv/covid-stats.csv";

let tabcss:string = "covid_intro";
addTabClickEvents(tabcss);

let CovidDashboard = Promise.all([
    d3.csv(covid_map_path),
    d3.csv(covid_lockdown_notes_path),
    d3.csv(covid_stats_path),
    d3.csv(covid_excess_deaths_path),
]).then(function (files:any[]):void {
    // All filterable options
    const ALL_PARAMETERS = ["Cases per 1 million (7 day average)",
        "Deaths per 1 million (7 day average)",
        "Fully vaccinated population share",
        "Movement restrictions imposed"];
    const ALL_WEEKS:string[] = [...new Set(files[3].map((d: { Week: number; }) => d.Week))] as string[];

    let date_cols = files[0].columns as string[];
    date_cols.splice(0, 2);
    const ALL_DATES = date_cols;
    let date = ALL_DATES[ALL_DATES.length -1];

    // Default values
    let parameter = "Deaths per 1 million (7 day average)";
    let country = "World";
    let excessDateType = "month";
    let hospitalDateType = "week";
    let timer:number;

    let map_container_class = ".covid-map";

    // Initialise stat elements
    let statDeaths:HTMLElement = document.getElementById("stat_deaths")!;
    let statDeaths2020:HTMLElement = document.getElementById("stat_deaths_2020")!;
    let statDeaths2021:HTMLElement = document.getElementById("stat_deaths_2021")!;
    let statDeaths2022:HTMLElement = document.getElementById("stat_deaths_2022")!;
    let statCases:HTMLElement = document.getElementById("stat_cases")!;
    let statCases2020:HTMLElement = document.getElementById("stat_cases_2020")!;
    let statCases2021:HTMLElement = document.getElementById("stat_cases_2021")!;
    let statCases2022:HTMLElement = document.getElementById("stat_cases_2022")!;
    let statExcess:HTMLElement = document.getElementById("stat_excess")!;
    let statExcess2020:HTMLElement = document.getElementById("stat_excess_2020")!;
    let statExcess2021:HTMLElement = document.getElementById("stat_excess_2021")!;
    let statExcess2022:HTMLElement = document.getElementById("stat_excess_2022")!;
    let statVaccinationShare:HTMLElement = document.getElementById("stat_vaccination_share")!;

    function get_bar_data(measure:string):(number | null)[] {
        let data:(number | null)[] = [];
        let newMeasure = measure;
        let dailyCountries:string[] = ["Algeria",
        "Argentina",
        "Australia",
            "Austria",
            "Belgium",
            "Bolivia",
            "Bulgaria",
            "Canada",
            "Croatia",
            "Cyprus",
            "Czechia",
            "Denmark",
            "Estonia",
            "Finland",
            "France",
            "Ireland",
            "Israel",
            "Italy",
            "Japan",
            "Liechtenstein",
            "Lithuania",
            "Luxembourg",
            "Malaysia",
            "Netherlands",
            "Poland",
            "Portugal",
            "Romania",
            "Serbia",
            "Slovakia",
            "Slovenia",
            "South Africa",
            "Korea, South",
            "Spain",
            "Sweden",
            "Switzerland",
            "United Kingdom",
            "United States",
            ];
            let weeklyCountries:string[] = ["Chile",
            "Croatia",
            "Germany",
            "Greece",
            "Hungary",
            "Iceland",
            "Latvia",
            "Liechtenstein",
            "Malta",
            "Norway",
            "Russia",
            "Singapore"];

        if (dailyCountries.includes(country)){
            hospitalDateType = "day";
            if (measure == "Hospital") {
                newMeasure = "Daily hospital occupancy";
            } else if (measure == "ICU") {
                newMeasure = "Daily ICU occupancy";
            }
        } else if (weeklyCountries.includes(country)){
            hospitalDateType = "week";
            if (measure == "Hospital") {
                newMeasure = "Weekly new hospital admissions";
            } else if (measure == "ICU") {
                newMeasure = "Weekly new ICU admissions";
            }
        } 
        
        for (let row of files[0]) {
            if (row.variable == newMeasure && row.Country == country) {
                for (let day in ALL_DATES) {
                    let val: number | null = +row[ALL_DATES[day]];
                    // this especially helpful for test positive rates where we are missing a lot of values
                    if (val == 0) {
                        val = null;
                    }
                    data.push(val);
                }
                return data;
            }
        }
        return data;
    }
    function bar_data_update() {
        let updated_cases_data:(number | null)[] = get_bar_data("cases");
        let updated_deaths_data:(number | null)[] = get_bar_data("deaths");
        let updated_hospitalization_data:(number | null)[] = get_bar_data("Hospital");
        let updated_icu_data:(number | null)[] = get_bar_data("ICU");
        let updated_vaccination_data:(number | null)[] = get_bar_data("vaccinations");

        // Then add the updated data
        cases_chart.series[0].setData(updated_cases_data);
        deaths_chart.series[0].setData(updated_deaths_data);
        hospital_chart.series[0].setData(updated_hospitalization_data);
        hospital_chart.series[1].setData(updated_icu_data);
        vaccination_chart.series[0].setData(updated_vaccination_data)

        // Hide / show errors for test graphs (we miss test data for many countries)
        let err1:Element = document.getElementById("hospital_error")!;
        if (updated_hospitalization_data.length > 1 || updated_icu_data.length > 1) {
            err1.classList.add("hide")
        } else {
            err1.classList.remove("hide")
        }

        cases_chart.redraw();
        deaths_chart.redraw();
        hospital_chart.redraw();
        vaccination_chart.redraw();
    }
    function change_dashboard_country_text(country:string):void {
        let c = getCountryName(country);

        var element:Element = document.getElementsByClassName("dashboard-profile-country")[0].firstElementChild!;
        element.innerHTML = c;
    }
    function get_old_excess_data():number[] {
        let week_data:number[] = [];
        for (let row of files[3]) {
            if (row.Country == country) {
                excessDateType = row.Time_unit;
                if (row.Deaths_2020 > 0) {
                    week_data.push(+row.Deaths_old);
                }
            }
        }

        //update title
        let subtitleContainer:Element = document.querySelector(".covid-excess .dashboard-subtitle")!;
        let newSubtitle:string = "";
        if (country == "World"){
            newSubtitle = "Expected deaths (without considering the pandemic) vs estimated actual deaths";
        } else if (excessDateType == "month") {
            newSubtitle = "Expected deaths (based on values before the pandemic) vs actual deaths";
        } else if (excessDateType == "week") {
            newSubtitle = "Expected deaths (based on values before the pandemic) vs actual deaths";
        }
        subtitleContainer.innerHTML = newSubtitle;

        let err:HTMLElement = document.getElementById("excess_error")!;
        if (week_data.length > 1) {
            err.classList.add("hide")
        } else {
            err.classList.remove("hide")
        }

        return week_data;
    }
    function get_latest_excess_data(year:number):number[] {
        let latest_data:number[] = [];
        for (let row of files[3]) {
            if (row.Country == country) {
                if (year == 2020) {
                    //TODO are these checks ok? we have some zeroes in the data so how do they translate?
                    if (row.Deaths_2020 > 0) {
                        latest_data.push(+row.Deaths_2020);
                    }
                } else if (year == 2021) {
                    if (row.Deaths_2021 > 0) {
                        latest_data.push(+row.Deaths_2021);
                    }
                } else if (year == 2022) {
                    if (row.Deaths_2022 > 0) {
                        latest_data.push(+row.Deaths_2022);
                    }
                }
            }
        }
        return latest_data;
    }
    function excess_data_update():void {
        let excess20:number[] = get_latest_excess_data(2020);
        let excess21:number[] = get_latest_excess_data(2021);
        let excess22:number[] = get_latest_excess_data(2022);
        let old = get_old_excess_data();
        interface excessSeries {
            type: string,
            data: number[],
            label?: {
                enabled: boolean,
                format: string
            },
            name?: string
        }
        let oldName:string = "";
        let name20: string = "";
        let name21: string = "";
        let name22: string = "";
        if (country == "World"){
            oldName = "Expected deaths";
            name20 = "2020 (estimated)";
            name21 = "2021 (estimated)";
            name22 = "2022 (estimated)";
        } else {
            oldName = "2015-9 average";
            name20 = "2020";
            name21 = "2021";
            name22 = "2022";
        }
        let seriesOld:excessSeries = {
            name: oldName,
            type: 'column',
            data: old
        }
        let series20:excessSeries = {
            type: 'spline',
            name: name20,
            data: [],
            label: {
                enabled: false,
                format: ''
            }
        }
        let series21:excessSeries = {
            type: 'spline',
            name: name21,
            data: [],
            label: {
                enabled: false,
                format: ''
            }
        }
        let series22:excessSeries = {
            type: 'spline',
            name: name22,
            data: [],
            label: {
                enabled: false,
                format: ''
            }
        }

        if (excess20.length != 0) {
            let oldTotal = 0;
            let total2020 = 0;
            let total_excess_text_2020 = '';

            for (let i = 0; i < excess20.length; i++) {
                total2020 += excess20[i];
                oldTotal += old[i];
            }
            let total_excess_2020 = total2020 - oldTotal;

            let val = numberFormatter(total_excess_2020);
            if (total_excess_2020 > 0) {
                total_excess_text_2020 = "+ " + val;
            } else {
                total_excess_text_2020 = val;
            }

            series20.label!.format = total_excess_text_2020;
            series20.label!.enabled = true;
        }
        if (excess21.length != 0) {
            let oldTotal = 0;
            let total2021 = 0;
            let total_excess_2021 = 0;
            let total_excess_text_2021 = '';

            for (let i = 0; i < excess21.length; i++) {
                total2021 += excess21[i];
                oldTotal += old[i];
            }
            total_excess_2021 = total2021 - oldTotal;

            let val = numberFormatter(total_excess_2021);
            if (total_excess_2021 > 0) {
                total_excess_text_2021 = "+ " + val;
            } else {
                total_excess_text_2021 = val;
            }

            series21.label!.format = total_excess_text_2021;
            series21.label!.enabled = true;
        }
        if (excess22.length != 0) {
            let oldTotal = 0;
            let total2022 = 0;
            let total_excess_2022 = 0;
            let total_excess_text_2022 = '';

            for (let i = 0; i < excess22.length; i++) {
                total2022 += excess22[i];
                oldTotal += old[i];
            }
            total_excess_2022 = total2022 - oldTotal;

            let val = numberFormatter(total_excess_2022);
            if (total_excess_2022 > 0) {
                total_excess_text_2022 = "+ " + val;
            } else {
                total_excess_text_2022 = val;
            }

            series22.label!.format = total_excess_text_2022;
            series22.label!.enabled = true;
        }

        // update data
        series20.data = excess20;
        series21.data = excess21;
        series22.data = excess22;
        excess_chart.series[0].update(seriesOld, false);
        excess_chart.series[1].update(series20, false);
        excess_chart.series[2].update(series21, false);
        excess_chart.series[3].update(series22, false);
        excess_chart.redraw();
        excess_chart.setSize();
    }
    function get_map_data():Worlddata.Mapseries[] {
        let new_data:Worlddata.Mapseries[] = [];
        if (parameter == "Movement restrictions imposed") {
            let lock_data:Worlddata.MapData[] = [];
            let cur_data:Worlddata.MapData[] = [];
            let some_data:Worlddata.MapData[] = [];
            let test_data:Worlddata.MapData[] = [];
            let no_data:Worlddata.MapData[] = [];
            let empty_data:Worlddata.MapData[] = [];
            for (let row of files[0]) {
                if (row.Country != "World" && row.variable == "restrictions") {
                    
                    let note = row[date];
                    let country = getCountryCode(row.Country);

                    if (note > 20000) {
                        lock_data.push({ country: country, countryName: row.Country, value: 5, note: note });
                    } else if (note > 10000) {
                        cur_data.push({ country: country, countryName: row.Country, value: 4, note: note });
                    } else if (note > 100) {
                        some_data.push({ country: country, countryName: row.Country, value: 3, note: note });
                    } else if (note > 50) {
                        test_data.push({ country: country, countryName: row.Country, value: 2, note: note });
                    } else if (note > 9) {
                        no_data.push({ country: country, countryName: row.Country, value: 1, note: note });
                    } else {
                        empty_data.push({ country: country, countryName: row.Country, value: 0, note: note });
                    }
                }
            }

            let emptySlice:Worlddata.Mapseries = { data: empty_data, name: 'No data', type: 'map', colorIndex: 51 };
            let noSlice:Worlddata.Mapseries = { data: no_data, name: 'No restrictions', type: 'map', colorIndex: 49 };
            let testSlice:Worlddata.Mapseries = { data: test_data, name: 'Test/vaccination based restrictions', type: 'map', colorIndex: 36 };
            let someSlice:Worlddata.Mapseries = { data: some_data, name: 'Non general restrictions', type: 'map', colorIndex: 38 };
            let curSlice:Worlddata.Mapseries = { data: cur_data, name: 'General curfew', type: 'map', colorIndex: 16 };
            let lockSlice:Worlddata.Mapseries = { data: lock_data, name: 'General lockdown', type: 'map', colorIndex: 18 };
            new_data.push(emptySlice);
            new_data.push(noSlice);
            new_data.push(testSlice);
            new_data.push(someSlice);
            new_data.push(curSlice);
            new_data.push(lockSlice);
        } else {
            let map_data:Worlddata.MapData[] = [];
            let param:string = "";
            if (parameter == "Cases per 1 million (7 day average)"){
                param = "cases_pm";
            } else if (parameter == "Deaths per 1 million (7 day average)") {
                param = "deaths_pm";
            } else if (parameter == "Fully vaccinated population share") {
                param = "vaccinations";
            }
            for (let row of files[0]) {
                if (row.Country != "World" && row.variable == param) {
                    let val = row[date];
                    map_data.push({ country: getCountryCode(row.Country), value: +val, countryName: row.Country });
                }
            }
            let new_slice:Worlddata.Mapseries = { data: map_data, name: parameter, type: 'map', colorIndex: 3 };
            new_data.push(new_slice);
            }
        return new_data;
    }
    function update_map_data():void {
        let updatedData = get_map_data();
        // remove old series
        let loops = map_chart.series.length;
        for (var i = 0; i < loops; i++) {
            map_chart.series[0].remove(false);
        }

        // then add new ones
        for (var i = 0; i < updatedData.length; i++) {
            map_chart.addSeries(updatedData[i], false);
        }
        map_chart.redraw();
    }
    function get_map_restriction_note(code:number):string {
        for (let row of files[1]) {
            if (row.Code == code) {
                return row.Note;
            }
        }
        console.log("No note found for code " + code);
        return "N/A";
    }
    function setStats():void {
        let cases:string = '';
        let cases2020:string = '';
        let cases2021:string = '';
        let cases2022:string = '';
        let deaths:string = '';
        let deaths_2020:string = '';
        let deaths_2021:string = '';
        let deaths_2022:string = '';
        let vaccinationShare:string = '';
        let excess:string = '';
        let excess2020:string = '';
        let excess2021:string = '';
        let excess2022:string = '';

        for (let row of files[2]) {
            if (country == row.Country) {
                cases = numberFormatter(+row.Cases_total);
                cases2020 = numberFormatter(+row.Cases_2020);
                cases2021 = numberFormatter(+row.Cases_2021);
                cases2022 = numberFormatter(+row.Cases_2022);
                deaths = numberFormatter(+row.Deaths_total);
                deaths_2020 = numberFormatter(+row.Deaths_2020);
                deaths_2021 = numberFormatter(+row.Deaths_2021);
                deaths_2022 = numberFormatter(+row.Deaths_2022);
                vaccinationShare = numberFormatter(+row.Vaccinations);
                excess = numberFormatter(+row.Excess_Deaths_total);
                excess2020 = numberFormatter(+row.Excess_Deaths_2020);
                excess2021 = numberFormatter(+row.Excess_Deaths_2021);
                excess2022 = numberFormatter(+row.Excess_Deaths_2022);
                break;
            }
        }
        statCases.innerHTML = cases;
        statCases2020.innerHTML = cases2020;
        statCases2021.innerHTML = cases2021;
        statCases2022.innerHTML = cases2022;
        statDeaths.innerHTML = deaths;
        statDeaths2020.innerHTML = deaths_2020;
        statDeaths2021.innerHTML = deaths_2021;
        statDeaths2022.innerHTML = deaths_2022;
        statVaccinationShare.innerHTML = vaccinationShare + "%";
        statExcess.innerHTML = excess;
        statExcess2020.innerHTML = excess2020;
        statExcess2021.innerHTML = excess2021;
        statExcess2022.innerHTML = excess2022;
    }

    let initial_map_data = get_map_data();
    let initial_old_excess_data = get_old_excess_data();
    let initial_2020_excess_data = get_latest_excess_data(2020);
    let initial_2021_excess_data = get_latest_excess_data(2021);
    let initial_2022_excess_data = get_latest_excess_data(2022);
    let initial_cases_data = get_bar_data("cases");
    let initial_deaths_data = get_bar_data("deaths");
    let initial_hospitalization_data = get_bar_data("Hospital");
    let initial_icu_data = get_bar_data("ICU");
    let initial_vaccination_data = get_bar_data("vaccinations");

    setStats();
    let chartXAxis:Worlddata.XAxisOptions = {
        categories: ALL_DATES,
        tickInterval: 52,
        labels: {
            enabled: true,
        },
        title: {
            text: undefined
        },
    };

    let cases_chart = Highcharts.chart({
        chart: {
            type: 'column',
            renderTo: 'cases_bars'
        },
        title: {
            text: undefined
        },
        xAxis: chartXAxis,
        yAxis: {
            min: 0,
            endOnTick: false,
            title: {
                text: "Weekly sum"
            },
        },
        tooltip: {
            formatter: function (this: Worlddata.TooltipFormatterContextObject):string {
                let title = getCountryName(country);
                let date = this.x as string;
                let cases = numberFormatter(this.points![0].y!);
                return '<span style="font-size: 1.1em"><b>' + title + 
                '</b><br></span>For week ending on: <b>' + date + '</b><br>Sum of cases:<b> ' + cases + '</b>';
            },
            useHTML: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                },
                label: {
                    enabled: false
                }
            },
            column: {
                stacking: 'normal',
                borderRadius: 3,
                pointPadding: 0,
                groupPadding: 0.1,
            }
        },
        series: [{
            id: "cases",
            name: "COVID-19 cases",
            type: 'column',
            colorIndex: 1,
            data: initial_cases_data,
        }],


        legend: {
            enabled: false
        }
    });
    let deaths_chart = Highcharts.chart({
        chart: {
            type: 'column',
            renderTo: 'deaths_bars'
        },
        title: {
            text: undefined
        },
        xAxis: chartXAxis,
        yAxis: {
            title: {
                text: "Weekly sum"
            },
            endOnTick: false,
            min: 0
        },
        tooltip: {
            formatter: function (this: Worlddata.TooltipFormatterContextObject):string {
                let title = getCountryName(country);
                let date = this.x as string;
                let value = numberFormatter(this.y!);

                return '<span style="font-size: 1.1em"><b>' + title + 
                '</b><br></span>For week ending on: <b>' + date + '</b><br>Sum of deaths:<b> ' + value + '</b>';
            },
            useHTML: true,
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                borderRadius: 3,
                pointPadding: 0,
                groupPadding: 0.1,
            },
        },
        series: [{
            colorIndex: 44,
            name: 'Covid19',
            type: 'column',
            data: initial_deaths_data,
        }],
        legend: {
            enabled: false
        }
    });
    let hospital_chart = Highcharts.chart({
        chart: {
            type: 'column',
            renderTo: 'hospital_bars'
        },
        title: {
            text: undefined
        },
        xAxis: chartXAxis,
        yAxis: {
            title: {
                text: undefined
            },
            endOnTick: false
        },
        tooltip: {
            formatter: function (this: Worlddata.TooltipFormatterContextObject):string {
                let title = getCountryName(country);
                let date:string = this.x as string;
                let hosp:string = "N/A";
                let icu:string = "N/A";
                let hospText = '';
                let icuText = '';

                // check if we have them both
                if (this.points!.length > 1) {
                    hosp = numberFormatter(this.points![0].y!);
                    icu = numberFormatter(this.points![1].y!);
                } else {
                    // we only have one
                    if (country == "Poland"){
                        hosp = numberFormatter(this.points![0].y!);
                    } else {
                        icu = numberFormatter(this.points![0].y!);
                    }
                }

                if (hospitalDateType == "week") {
                    hospText = "New hospital admissions: <b>";
                    icuText = "New ICU admissions: <b>";
                } else if (hospitalDateType == "day"){
                    hospText = "Average daily hospital occupancy: <b>";
                    icuText = "Average daily ICU occupancy: <b>";
                }
                
                return '<span style="font-size: 1.1em"><b>' + title + 
                '</b><br></span>For week ending on: <b>' + date + '</b><br/>' + hospText + hosp +
                    '</b><br/>' + icuText + icu + '</b>';
            },
            useHTML: true,
            shared: true,
            split: false,
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                borderRadius: 3,
                pointPadding: 0,
                groupPadding: 0.1,
            },
        },
        series: [{
            type: 'column',
            colorIndex: 14,
            name: 'hospitalization',
            data: initial_hospitalization_data,
        }, {
            type: 'column',
            colorIndex: 18,
            name: 'icu',
            data: initial_icu_data,
        }],
        legend: {
            enabled: false
        }
    });
    let vaccination_chart = Highcharts.chart({
        chart: {
            type: 'column',
            renderTo: 'vaccination_bars'
        },
        title: {
            text: undefined
        },
        xAxis: chartXAxis,
        yAxis: {
            title: {
                text: "Population share"
            },
            labels: {
                format: '{text}%'
            },
            endOnTick: true,
            max: 100
        },
        tooltip: {
            formatter: function (this: Worlddata.TooltipFormatterContextObject):string {
                let title = getCountryName(country);
                let date = this.x as string;
                let value = numberFormatter(this.y!);

                return '<span style="font-size: 1.1em"><b>' + title + '</b><br></span>For week ending on <b>' + date + 
                '<br/>' + value + '%</b> of the population had been vaccinated';
            },
            useHTML: true,
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                borderRadius: 3,
                pointPadding: 0,
                groupPadding: 0.1,
            },
        },
        series: [{
            colorIndex: 24,
            name: 'Covid19',
            type: 'column',
            data: initial_vaccination_data,
        }],
        legend: {
            enabled: false
        }
    });
    let excess_chart = Highcharts.chart({
        chart: {
            type: 'area',
            renderTo: 'excess_deaths'
        },
        title: {
            text: undefined
        },
        xAxis: {
            categories: ALL_WEEKS,
            tickInterval: 10,
            title: {
                text: undefined
            },
            labels: {
                enabled: false
            },
        },
        yAxis: {
            title: {
                text: 'Total deaths (for all causes)'
            },
            endOnTick: false
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                },
                label: {
                    enabled: false
                }
            },
            column: {
                stacking: 'normal',
                borderRadius: 3,
                pointPadding: 0,
                groupPadding: 0.1,
            },
        },
        tooltip: {
            formatter: function (this: Worlddata.TooltipFormatterContextObject):string {
                let twentyone = "N/A";
                let twentytwo = "N/A";
                let title:string = "";
                if (excessDateType == "week") {
                    title = 'Week ' + this.x;
                } else {
                    if (this.x == 0) {
                        title = "January";
                    } else if (this.x == 1) {
                        title = "February";
                    } else if (this.x == 2) {
                        title = "March";
                    } else if (this.x == 3) {
                        title = "April";
                    } else if (this.x == 4) {
                        title = "May";
                    } else if (this.x == 5) {
                        title = "June";
                    } else if (this.x == 6) {
                        title = "July";
                    } else if (this.x == 7) {
                        title = "August";
                    } else if (this.x == 8) {
                        title = "September";
                    } else if (this.x == 9) {
                        title = "October";
                    } else if (this.x == 10) {
                        title = "November";
                    } else if (this.x == 11) {
                        title = "December";
                    }
                }
                
                let old:string = numberFormatter(this.points![0].y!);
                let twenty = numberFormatter(this.points![1].y!);
                if (this.points!.length > 2) {
                    twentyone = numberFormatter(this.points![2].y!);
                }
                if (this.points!.length > 3) {
                    twentytwo = numberFormatter(this.points![3].y!);
                }
                let text = "";
                if (excessDateType == "month") {
                   text = "Monthly";
                } else {
                    text = "Weekly";
                }
                return '<b>' + title + '</b><br/>Weekly death toll (average of 2015-9): <b>' + old +
                    '</b><br/>' + text + ' death toll (2020): <b>' + twenty +
                    '</b><br/>' + text + ' death toll (2021): <b>' + twentyone +
                    '</b><br/>' + text + ' death toll (2022): <b>' + twentytwo + '</b>';
            },
            useHTML: true,
            shared: true,
            split: false,
        },
        series: [{
            id: "old",
            name: "Expected deaths",
            type: 'column',
            colorIndex: 50,
            data: initial_old_excess_data,

        },
        {
            id: "2020",
            name: "2020 (estimated)",
            type: 'spline',
            colorIndex: 46,
            data: initial_2020_excess_data,
            label: {
                enabled: false,
                format: ''
            }
        },
        {
            id: "2021",
            name: "2021 (estimated)",
            type: 'spline',
            colorIndex: 44,
            data: initial_2021_excess_data,
            label: {
                enabled: false,
                format: ''
            }
        },
        {
            id: "2022",
            name: "2022 (estimated)",
            type: 'spline',
            colorIndex: 9,
            data: initial_2022_excess_data,
            label: {
                enabled: false,
                format: ''
            }
        },
        ],
        legend: {
            enabled: true
        }
    });
    let map_chart = Highcharts.mapChart({
        chart: {
            renderTo: 'covid_map',
            events: {
                click: function () {
                    country = "World";
                    change_dashboard_country_text(country);
                    setStats();
                    bar_data_update();
                    excess_data_update();
                    highlightCountry();
                }
            }
        },
        plotOptions: {
            map: {
                type:'map',
                allAreas: false, // this is needed for movement restrictions data
                joinBy: ['iso-a3', 'country'],
                mapData: Highcharts.maps['custom/world'],
                colorAxis: 0,
                events:{
                    click: function (e:any) {
                        country = e.point.countryName;
                        change_dashboard_country_text(country);
                        setStats();
                        bar_data_update();
                        excess_data_update();
                        highlightCountry();
                    }
                }
            },
        },
        colorAxis: {
            tickInterval: 1,
            max: 5,
            min: 0,
            startOnTick: false,
            endOnTick: false,
            showInLegend: true,
            stops: [
                [0, getIndexColor(3)],
                [0.1, getIndexColor(50)],
                [0.95, getIndexColor(45)]
            ],
        },
        title: {
            text: undefined
        },
        mapNavigation: {
            enabled: true,
            enableMouseWheelZoom: false,
            enableButtons: true,
        },
        tooltip: {
            formatter: function (this: Worlddata.TooltipFormatterContextObject):string {
                let title:string = fCapital(this.key as string);
                if (parameter == "Movement restrictions imposed"){
   
                    let note:number = (this.point as any).note!;
                    let noteText = get_map_restriction_note(note);
                    let textArray:string[] = addLineBreaks(noteText, 60);
                    let text = textArray[0];
                    if (textArray.length > 1) {
                        for (let i = 1; textArray.length > i; i++) {
                            text = text + "<br/>" + textArray[i];
                        }
                    }
                    return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
                } else {
                    let value:string = this.point.value!.toString();
                    let text:string = "";
                    if (parameter == "Cases per 1 million (7 day average)"){
                        text = "<b>" + value + "</b> daily cases per 1 million people <br>(7 day average for week ending on " + date + ")";
                    } else if (parameter == "Deaths per 1 million (7 day average)") {
                        text = "<b>" + value + "</b> daily deaths per 1 million people <br>(7 day average for week ending on " + date + ")";
                    } else if (parameter == "Fully vaccinated population share") {
                        text = "<b>" + value + "%</b> of total population was fully vaccinated by " + date;
                    }
                    return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
            }
            },
            useHTML: true
        },
        legend: {
            enabled: true
        },
        series: initial_map_data,
    });

    // Otherwise these charts overflow their containers
    map_chart.setSize();
    excess_chart.setSize();
    cases_chart.setSize();
    deaths_chart.setSize();
    hospital_chart.setSize();
    vaccination_chart.setSize();

    // Filters
    // Dropdown
    // Define dropdown container
    let map_dropdown_container:HTMLElement = document.querySelector(map_container_class + " .chart-options .row1")!;

    // Create a parameter dropdown for the map
    let parameterName = "covid-map-parameter";
    let parameterWidth = "";
    addDropdown(map_dropdown_container, parameterName, parameterWidth, parameterChange, ALL_PARAMETERS, parameter);

    // Update chart data on parameter change
    function parameterChange() {
        parameter = (<HTMLSelectElement>document.getElementById(parameterName + "-select")).value;
        update_map_data();
        updateColorAxis();
        highlightCountry();
    }
    // Define filters / options for response map
    var map_playButton_container:HTMLElement = document.querySelector(map_container_class + " .chart-options .play-container")!;

    // Create play button
    let playButton = document.createElement("div");
    playButton.classList.add("play-button");
    playButton.addEventListener("click", playToggle);
    let playIcon = document.createElement("span");
    playIcon.id = map_container_class + "-play-icon";
    playIcon.classList.add("i-play");
    playButton.appendChild(playIcon);
    map_playButton_container.appendChild(playButton);

    // Create a slider
    let sliderName = "play-slider";
    let min = 0;
    let max:number = (ALL_DATES.length - 1);
    let value:number = max;
    let containerWidth = 375;
    let sliderWidth = 100;
    addSlider(map_playButton_container, sliderName, min, max, value, containerWidth, sliderWidth, sliderDateChange);

    let loopi = 0;
    let slider:HTMLSelectElement = <HTMLSelectElement>document.getElementById(sliderName + "-slider");
    let shownDate:HTMLElement = document.getElementById(sliderName + "-slider-output")!;
    shownDate.innerHTML = date;
    let playing = false;

    // Update chart data on slider change
    function sliderDateChange():void {
        loopi = slider.value as unknown as number;
        date = ALL_DATES[loopi];
        shownDate.innerHTML = date;
        dateChange()
    }

    function dateChange():void {
        let updatedMapData = get_map_data();
        // remove old series
        let loops = map_chart.series.length;
        for (var i = 0; i < loops; i++) {
            map_chart.series[0].remove(false);
        }

        // then add new ones
        for (var i = 0; i < updatedMapData.length; i++) {
            map_chart.addSeries(updatedMapData[i], false);
        }

        map_chart.redraw(false);
        if (date == ALL_DATES[ALL_DATES.length - 1] && playing) {
            stopPlaying();
        }
    }
    function stopPlaying():void {
        let iSpan:HTMLElement = document.getElementById(map_container_class + "-play-icon")!;
        iSpan.classList.remove("i-pause");
        iSpan.classList.add("i-play");
        playing = false;
        clearInterval(timer);
    }

    function playToggle():void {
        let iSpan:HTMLElement = document.getElementById(map_container_class + "-play-icon")!;
        if (playing) {
            stopPlaying();
        } else {
            if (date == ALL_DATES[(ALL_DATES.length - 1)]) {
                loopi = 0;
            }
            playing = true;
            iSpan.classList.remove("i-play");
            iSpan.classList.add("i-pause");
            timer = setInterval(function () {
                if (loopi < ALL_DATES.length) {
                    date = ALL_DATES[loopi];
                    shownDate.innerHTML = date;
                    slider.value = loopi as unknown as string;
                    dateChange();
                    loopi++;
                }
            }, 250);
        }
    }

    // adjust map color stops according to parameter
    function updateColorAxis() {
        let updatedAxis:Worlddata.ColorAxisOptions = {};
        let updatedPlotOptions:Worlddata.PlotOptions = {};

        if (parameter == "Cases per 1 million (7 day average)") {
            updatedAxis = {
                tickInterval: 400,
                max: 2000,
                min: 0,
                showInLegend: true,
                stops: [
                    [0, getIndexColor(3)],
                    [0.1, getIndexColor(50)],
                    [0.95, getIndexColor(45)]
                ],
            };
        } else if (parameter == "Deaths per 1 million (7 day average)") {
            updatedAxis = {
                tickInterval: 1,
                max: 5,
                min: 0,
                showInLegend: true,
                stops: [
                    [0, getIndexColor(3)],
                    [0.1, getIndexColor(50)],
                    [0.95, getIndexColor(45)]
                ],
            };
        } else if (parameter == "Fully vaccinated population share") {
            updatedAxis = {
                tickInterval: 20,
                max: 80,
                min: 0,
                showInLegend: true,
                stops: [
                    [0, getIndexColor(45)],
                    [0.1, getIndexColor(50)],
                    [0.95, getIndexColor(3)]
                ],
            };
        } else if (parameter == "Movement restrictions imposed"){
            updatedAxis = {
                tickInterval: 1,
                max: 5,
                min: 0,
                showInLegend: false,
                stops: [
                    [0, getIndexColor(3)],
                    [0.35, getIndexColor(23)],
                    [0.5, getIndexColor(52)],
                    [0.65, getIndexColor(9)],
                    [0.95, getIndexColor(30)]
                ],
            };
        }

        if (parameter == "Movement restrictions imposed") {
            updatedPlotOptions = {
                colorAxis: false
            }
        } else {
            updatedPlotOptions = {
                colorAxis: 0
            };
        }
        map_chart.update({
            plotOptions: {
                map:updatedPlotOptions,
            }
        },false);
        map_chart.update({
            colorAxis: updatedAxis,
        },false);

        // hack because otherwise colors are not automatically updated
        if (parameter == "Movement restrictions imposed") {
            dateChange();
        }
        map_chart.redraw(false);
    }
    function highlightCountry():void {
        let elements:NodeListOf<HTMLElement> = document.querySelectorAll(".covid-map .highcharts-map-series .highcharts-point");
        if (country != 'World') {
            let css = getHighchartsMapCSSName(country);
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