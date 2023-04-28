// for loading data
import "https://d3js.org/d3-dsv.v1.min.js";
import "https://d3js.org/d3-fetch.v1.min.js";
// helpers
import { fCapital, addDropdown, getCountryCode, numberFormatter, getIndexColor, addLineBreaks, createLegend, addSlider, addTabClickEvents } from "./chartHelper.js";
// for visualising data
import Highcharts from "https://code.highcharts.com/es-modules/masters/highcharts.src.js";
import HighMaps from "https://code.highcharts.com/maps/es-modules/masters/highmaps.src.js";
const topology = await fetch('https://code.highcharts.com/mapdata/custom/world-eckert3-highres.geo.json').then(response => response.json());
let covid_map_path = "/static/worlddata/csv/covid-map.csv";
let covid_area_path = "/static/worlddata/csv/covid-time.csv";
let covid_lockdown_path = "/static/worlddata/csv/covid-lockdown.csv";
let covid_lockdown_notes_path = "/static/worlddata/csv/covid-lockdown-notes.csv";
let covid_excess_deaths_path = "/static/worlddata/csv/covid-excess-deaths.csv";
let population_path = "/static/worlddata/csv/population.csv";
let tabcss = "covid_intro";
addTabClickEvents(tabcss);
let CovidDashboard = Promise.all([
    d3.csv(covid_map_path),
    d3.csv(covid_area_path),
    d3.csv(covid_lockdown_path),
    d3.csv(covid_excess_deaths_path),
    d3.csv(population_path),
    d3.csv(covid_lockdown_notes_path)
]).then(function (files) {
    // All filterable options
    const ALL_PARAMETERS = ["Cases per 1 million (7 day average)",
        "Deaths per 1 million (7 day average)",
        "Fully vaccinated population share"];
    // const ALL_COUNTRIES = [...new Set(files[0].map(d => d.Country))].sort()
    // const all_countries_ex = [...new Set(files[3].map(d => d.Country))].sort()
    const ALL_WEEKS = [...new Set(files[3].map((d) => d.Week))];
    let cols = files[1].columns;
    let lock_cols = files[2].columns;
    cols.splice(0, 3);
    lock_cols.splice(0, 2);
    const ALL_DATES = cols;
    const ALL_DATES_LOCK = lock_cols;
    let all_week_dates_lock = [];
    for (let i = 0; i < (ALL_DATES_LOCK.length - 1); i += 7) {
        all_week_dates_lock.push(ALL_DATES_LOCK[i]);
    }
    all_week_dates_lock.push(ALL_DATES_LOCK[ALL_DATES_LOCK.length - 1]);
    // Default values
    let parameter = "Deaths per 1 million (7 day average)";
    // TODO do we really need two country variables?
    let country = "World";
    let innerCountry = "World";
    let date_lock = all_week_dates_lock[all_week_dates_lock.length - 1];
    let timer;
    let map_container_class = ".covid-map";
    let excess_container_class = ".covid-excess";
    let map_response_container_class = ".lockdown-map";
    // Set html dates
    var last_date = ALL_DATES[ALL_DATES.length - 1];
    let dates_26 = ALL_DATES.slice(Math.max(ALL_DATES.length - 26, 0));
    let last_update = document.getElementById("last_update");
    last_update.innerHTML = "<strong>Last update: " + last_date + ".</strong>";
    let JHU_update = document.getElementById("JHU_date");
    JHU_update.innerHTML = " Downlaoded at " + last_date + ".";
    let test_update = document.getElementById("Test_date");
    test_update.innerHTML = " Downlaoded at " + last_date + ".";
    // Initialise stat elements
    let statDeaths = document.getElementById("stat_deaths");
    let statDeaths2020 = document.getElementById("stat_deaths_2020");
    let statDeaths2021 = document.getElementById("stat_deaths_2021");
    let statDeaths2022 = document.getElementById("stat_deaths_2022");
    let statCases = document.getElementById("stat_cases");
    let statCases2020 = document.getElementById("stat_cases_2020");
    let statCases2021 = document.getElementById("stat_cases_2021");
    let statCases2022 = document.getElementById("stat_cases_2022");
    let statCasesPc = document.getElementById("stat_cases_pc");
    let statDeathsPc = document.getElementById("stat_deaths_pc");
    let statVaccinationShare = document.getElementById("stat_vaccination_share");
    let statBoosterShare = document.getElementById("stat_booster_share");
    function get_map_data() {
        var new_data = [];
        for (let row of files[0]) {
            var val = 0;
            if (row.Country != "World") {
                if (parameter == "Cases per 1 million (7 day average)") {
                    val = row.Cases_week;
                }
                else if (parameter == "Deaths per 1 million (7 day average)") {
                    val = row.Deaths_week;
                }
                else if (parameter == "Fully vaccinated population share") {
                    val = row.Fully_vaccinated;
                }
                new_data.push({ country: getCountryCode(row.Country), value: +val, originalName: row.Country });
            }
        }
        return new_data;
    }
    function get_bar_data(measure) {
        let day_data = [];
        for (let row of files[1]) {
            if (row.Parameter == measure && row.Country == innerCountry) {
                for (let day in ALL_DATES) {
                    let val = +row[ALL_DATES[day]];
                    // this especially helpful for test positive rates where we are missing a lot of values
                    if (val == 0) {
                        val = null;
                    }
                    day_data[day] = val;
                }
                return day_data;
            }
        }
        return day_data;
    }
    function bar_data_update() {
        let updated_cases_bar_all_data = get_bar_data("Cases");
        let updated_deaths_bar_all_data = get_bar_data("Deaths");
        let updated_hospitalization_all_data = get_bar_data("Hospitalizations");
        let updated_icu_all_data = get_bar_data("ICU");
        let updated_cases_bar_26_data = JSON.parse(JSON.stringify(updated_cases_bar_all_data));
        updated_cases_bar_26_data = updated_cases_bar_26_data.slice(Math.max(updated_cases_bar_26_data.length - 26, 0));
        let updated_deaths_bar_26_data = JSON.parse(JSON.stringify(updated_deaths_bar_all_data));
        updated_deaths_bar_26_data = updated_deaths_bar_26_data.slice(Math.max(updated_deaths_bar_26_data.length - 26, 0));
        let updated_hospitalization_26_data = JSON.parse(JSON.stringify(updated_hospitalization_all_data));
        updated_hospitalization_26_data = updated_hospitalization_26_data.slice(Math.max(updated_hospitalization_26_data.length - 26, 0));
        let updated_icu_26_data = JSON.parse(JSON.stringify(updated_icu_all_data));
        updated_icu_26_data = updated_icu_26_data.slice(Math.max(updated_icu_26_data.length - 26, 0));
        // Then add the updated data
        cases_bar_all.series[0].setData(updated_cases_bar_all_data);
        cases_bar_26.series[0].setData(updated_cases_bar_26_data);
        deaths_bar_all.series[0].setData(updated_deaths_bar_all_data);
        deaths_bar_26.series[0].setData(updated_deaths_bar_26_data);
        hospital_bar_all.series[0].setData(updated_hospitalization_all_data);
        hospital_bar_26.series[0].setData(updated_hospitalization_26_data);
        hospital_bar_all.series[1].setData(updated_icu_all_data);
        hospital_bar_26.series[1].setData(updated_icu_26_data);
        // Hide / show errors for test graphs (we miss test data for many countries)
        let err1 = document.getElementById("hospital_all_error");
        let err2 = document.getElementById("hospital_26_error");
        if (updated_hospitalization_all_data.length > 1) {
            err1.classList.add("hide");
            err2.classList.add("hide");
        }
        else {
            err1.classList.remove("hide");
            err2.classList.remove("hide");
        }
        cases_bar_all.redraw();
        cases_bar_26.redraw();
        deaths_bar_all.redraw();
        deaths_bar_26.redraw();
        hospital_bar_all.redraw();
        hospital_bar_26.redraw();
    }
    function change_dashboard_country_text(country) {
        let c = (country == "United States of America") ? "USA" : country;
        var element = document.getElementsByClassName("dashboard-profile-country")[0].firstElementChild;
        element.innerHTML = c;
    }
    function get_old_excess_data() {
        let week_data = [];
        for (let row of files[3]) {
            if (row.Country == innerCountry) {
                if (row.Deaths_2020 > 0) {
                    week_data.push(+row.Deaths_old);
                }
            }
        }
        let err = document.getElementById("excess_error");
        if (week_data.length > 1) {
            err.classList.add("hide");
        }
        else {
            err.classList.remove("hide");
        }
        return week_data;
    }
    function get_latest_excess_data(year) {
        let latest_data = [];
        for (let row of files[3]) {
            if (row.Country == innerCountry) {
                if (year == 2020) {
                    //TODO are these checks ok? we have some zeroes in the data so how do they translate?
                    if (row.Deaths_2020 > 0) {
                        latest_data.push(+row.Deaths_2020);
                    }
                }
                else if (year == 2021) {
                    if (row.Deaths_2021 > 0) {
                        latest_data.push(+row.Deaths_2021);
                    }
                }
                else if (year == 2022) {
                    if (row.Deaths_2022 > 0) {
                        latest_data.push(+row.Deaths_2022);
                    }
                }
            }
        }
        return latest_data;
    }
    function excess_data_update() {
        let excess20 = get_latest_excess_data(2020);
        let excess21 = get_latest_excess_data(2021);
        let excess22 = get_latest_excess_data(2022);
        let old = get_old_excess_data();
        let series20 = {
            type: 'spline',
            data: [],
            label: {
                enabled: false,
                format: ''
            }
        };
        let series21 = {
            type: 'spline',
            data: [],
            label: {
                enabled: false,
                format: ''
            }
        };
        let series22 = {
            type: 'spline',
            data: [],
            label: {
                enabled: false,
                format: ''
            }
        };
        excess_chart.series[0].setData(old);
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
            }
            else {
                total_excess_text_2020 = val;
            }
            series20.label.format = total_excess_text_2020;
            series20.label.enabled = true;
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
            }
            else {
                total_excess_text_2021 = val;
            }
            series21.label.format = total_excess_text_2021;
            series21.label.enabled = true;
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
            }
            else {
                total_excess_text_2022 = val;
            }
            series22.label.format = total_excess_text_2022;
            series22.label.enabled = true;
        }
        series20.data = excess20;
        series21.data = excess21;
        series22.data = excess22;
        excess_chart.series[1].update(series20, false);
        excess_chart.series[2].update(series21, false);
        excess_chart.series[3].update(series22, false);
        excess_chart.redraw();
        excess_chart.setSize();
    }
    function get_map_response_data() {
        let new_data = [];
        let lock_data = [];
        let cur_data = [];
        let some_data = [];
        let no_data = [];
        for (let row of files[2]) {
            if (row.Country != "World" && row.Measure == "restriction") {
                let value = row[date_lock];
                let country = getCountryCode(row.Country);
                let noteCode = +get_map_response_note_code(row.Country);
                let note = get_map_response_note(noteCode);
                if (value == 0) {
                    no_data.push({ country: country, value: +value, note: note });
                }
                else if (value == 1) {
                    some_data.push({ country: country, value: +value, note: note });
                }
                else if (value == 2) {
                    cur_data.push({ country: country, value: +value, note: note });
                }
                else if (value == 3) {
                    lock_data.push({ country: country, value: +value, note: note });
                }
            }
        }
        let noSlice = { data: no_data, name: 'No restrictions', type: 'map', colorIndex: 52 };
        let someSlice = { data: some_data, name: 'Some restrictions', type: 'map', colorIndex: 37 };
        let curSlice = { data: cur_data, name: 'Curfew', type: 'map', colorIndex: 16 };
        let lockSlice = { data: lock_data, name: 'Lockdown', type: 'map', colorIndex: 18 };
        new_data.push(noSlice);
        new_data.push(someSlice);
        new_data.push(curSlice);
        new_data.push(lockSlice);
        return new_data;
    }
    function get_map_response_note(code) {
        for (let row of files[5]) {
            if (row.Code == code) {
                return row.Note;
            }
        }
        console.log("No note found for code " + code);
        return "N/A";
    }
    function get_map_response_note_code(country) {
        for (let row of files[2]) {
            if (row.Measure == "note" && row.Country == country) {
                return row[date_lock];
            }
        }
        console.log("No note code found for " + country);
        return 0;
    }
    function setStats() {
        let cases = '';
        let cases2020 = '';
        let cases2021 = '';
        let cases2022 = '';
        let casesPc = '';
        let deaths = '';
        let deaths_2020 = '';
        let deaths_2021 = '';
        let deaths_2022 = '';
        let deathsPc = '';
        let vaccinationShare = '';
        let boosterShare = '';
        for (let row of files[0]) {
            if (innerCountry == row.Country) {
                cases = numberFormatter(+row.Cases);
                cases2020 = numberFormatter(+row.Cases_2020);
                cases2021 = numberFormatter(+row.Cases_2021);
                cases2022 = numberFormatter(+row.Cases_2022);
                casesPc = numberFormatter(+row.Cases_week);
                deaths = numberFormatter(+row.Deaths);
                deaths_2020 = numberFormatter(+row.Deaths_2020);
                deaths_2021 = numberFormatter(+row.Deaths_2021);
                deaths_2022 = numberFormatter(+row.Deaths_2022);
                deathsPc = numberFormatter(+row.Deaths_week);
                vaccinationShare = numberFormatter(+row.Fully_vaccinated);
                boosterShare = numberFormatter(+row.Vaccinated_booster);
                break;
            }
        }
        statCases.innerHTML = cases;
        statCases2020.innerHTML = cases2020;
        statCases2021.innerHTML = cases2021;
        statCases2022.innerHTML = cases2022;
        statCasesPc.innerHTML = casesPc;
        statDeaths2020.innerHTML = deaths_2020;
        statDeaths.innerHTML = deaths;
        statDeaths2021.innerHTML = deaths_2021;
        statDeaths2022.innerHTML = deaths_2022;
        statDeathsPc.innerHTML = deathsPc;
        statVaccinationShare.innerHTML = vaccinationShare + "%";
        statBoosterShare.innerHTML = boosterShare + "%";
    }
    let initial_map_data = get_map_data();
    let initial_cases_bar_data = get_bar_data("Cases");
    let initial_cases_bar_26_data = JSON.parse(JSON.stringify(initial_cases_bar_data));
    initial_cases_bar_26_data = initial_cases_bar_26_data.slice(Math.max(initial_cases_bar_26_data.length - 26, 0));
    let initial_deaths_bar_data = get_bar_data("Deaths");
    let initial_deaths_bar_26_data = JSON.parse(JSON.stringify(initial_deaths_bar_data));
    initial_deaths_bar_26_data = initial_deaths_bar_26_data.slice(Math.max(initial_deaths_bar_26_data.length - 26, 0));
    let initial_old_excess_data = get_old_excess_data();
    let initial_2020_excess_data = get_latest_excess_data(2020);
    let initial_2021_excess_data = get_latest_excess_data(2021);
    let initial_2022_excess_data = get_latest_excess_data(2022);
    let initial_map_response_data = get_map_response_data();
    let initial_hospitalization_data = get_bar_data("Hospitalizations");
    let initial_hospitalization_26_data = JSON.parse(JSON.stringify(initial_hospitalization_data));
    initial_hospitalization_26_data = initial_hospitalization_26_data.slice(Math.max(initial_hospitalization_26_data.length - 26, 0));
    let initial_icu_data = get_bar_data("ICU");
    let initial_icu_26_data = JSON.parse(JSON.stringify(initial_icu_data));
    initial_icu_26_data = initial_icu_26_data.slice(Math.max(initial_icu_26_data.length - 26, 0));
    setStats();
    let chartXAxis = {
        categories: ALL_DATES,
        tickInterval: 20,
        labels: {
            enabled: false
        },
        title: {
            text: undefined
        },
    };
    // Dashboard 1
    let chart = HighMaps.mapChart({
        chart: {
            renderTo: 'covid_map',
            map: topology,
            // styledMode: true,
            height: 526,
            marginBottom: 20,
            events: {
                click: function (e) {
                    country = "World";
                    innerCountry = "World";
                    change_dashboard_country_text(country);
                    setStats();
                    bar_data_update();
                    excess_data_update();
                    highlightCountry();
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
            tickInterval: 1,
            max: 5,
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
            formatter: function () {
                let title = fCapital(this.key);
                let value = this.point.value;
                var text = "";
                if (parameter == "Cases per 1 million (7 day average)") {
                    let val = numberFormatter(value);
                    text = val + " cases per 1 million people (average of last 7 days)";
                }
                else if (parameter == "Deaths per 1 million (7 day average)") {
                    let val = numberFormatter(value);
                    text = val + " deaths per 1 million people (average of last 7 days)";
                }
                else if (parameter == "Fully vaccinated population share") {
                    let val = numberFormatter(value);
                    text = val + "% of total population has been fully vaccinated";
                }
                return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
            },
            useHTML: true,
            borderColor: '#ff0000'
        },
        credits: {
            enabled: false
        },
        series: [{
                type: 'map',
                colorIndex: 2,
                data: initial_map_data,
                joinBy: ['iso-a3', 'country'],
                events: {
                    click: function (e) {
                        country = e.point.name;
                        innerCountry = e.point.originalName;
                        change_dashboard_country_text(country);
                        setStats();
                        bar_data_update();
                        excess_data_update();
                        highlightCountry();
                    }
                }
            }]
    });
    let cases_bar_all = Highcharts.chart({
        chart: {
            type: 'column',
            renderTo: 'cases_bars_all'
        },
        title: {
            align: 'left',
            text: 'Weekly figures - all time'
        },
        xAxis: chartXAxis,
        yAxis: {
            title: {
                text: "cases"
            },
            min: 0,
            endOnTick: false
        },
        tooltip: {
            formatter: function () {
                let rate = "N/A";
                let title = fCapital(this.x);
                let cases = numberFormatter(this.points[0].y);
                return '<b>' + title + '</b><br/>Weekly cases: ' + cases;
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
                data: initial_cases_bar_data,
            }],
        legend: {
            enabled: false
        }
    });
    let cases_bar_26 = Highcharts.chart({
        chart: {
            type: 'column',
            renderTo: 'cases_bars_26'
        },
        title: {
            align: 'left',
            text: 'Weekly figures - last 6 months'
        },
        xAxis: {
            categories: dates_26,
            tickInterval: 20,
            labels: {
                enabled: false
            },
            title: {
                text: undefined
            },
        },
        yAxis: {
            title: {
                text: 'Cases'
            },
            min: 0,
            endOnTick: false
        },
        tooltip: {
            formatter: function () {
                let title = fCapital(this.x);
                let cases = numberFormatter(this.points[0].y);
                return '<b>' + title + '</b><br/>Weekly cases: ' + cases;
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
            },
        },
        series: [{
                colorIndex: 1,
                id: 'cases',
                name: "COVID-19 cases",
                type: 'column',
                data: initial_cases_bar_26_data,
            }],
        legend: {
            enabled: false
        },
    });
    let deaths_bar_all = Highcharts.chart({
        chart: {
            type: 'column',
            renderTo: 'deaths_bars_all'
        },
        title: {
            align: 'left',
            text: 'Weekly figures - all time'
        },
        xAxis: chartXAxis,
        yAxis: {
            title: {
                text: undefined
            },
            endOnTick: false
        },
        tooltip: {
            formatter: function () {
                let title = fCapital(this.x);
                let value = numberFormatter(this.y);
                return '<b>' + title + '</b><br/>Weekly deaths: ' + value;
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
                colorIndex: 4,
                name: 'Covid19',
                type: 'column',
                data: initial_deaths_bar_data,
            }],
        legend: {
            enabled: false
        }
    });
    let hospital_bar_all = Highcharts.chart({
        chart: {
            type: 'column',
            renderTo: 'hospital_bars_all'
        },
        title: {
            align: 'left',
            text: 'Weekly figures - all time'
        },
        xAxis: chartXAxis,
        yAxis: {
            title: {
                text: undefined
            },
            endOnTick: false
        },
        tooltip: {
            formatter: function () {
                let weeklyCountries = ["Greece", "Liechtenstein", "Russia", "Singapore", "Latvia", "Malta", "Chile", "Germany"];
                let title = fCapital(this.x);
                let value = this.point.y;
                let tot = this.point.total;
                let series = this.series.name;
                let hosp = '';
                let icu = '';
                let text = '';
                // no easy way to show both values on tooltip, so doing this
                if (series == "hospitalization") {
                    hosp = numberFormatter(value);
                    icu = numberFormatter(tot - value);
                }
                else {
                    hosp = numberFormatter(tot - value);
                    icu = numberFormatter(value);
                }
                if (weeklyCountries.includes(country)) {
                    text = "Weekly admissions ";
                }
                else {
                    text = "Total patients ";
                }
                return '<b>' + title + '</b><br/>' + text + 'in hospitals: ' + hosp +
                    '<br/>' + text + "in ICU's: " + icu;
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
                type: 'column',
                colorIndex: 24,
                name: 'hospitalization',
                data: initial_hospitalization_data,
            }, {
                type: 'column',
                colorIndex: 27,
                name: 'icu',
                data: initial_icu_data,
            }],
        legend: {
            enabled: false
        }
    });
    let deaths_bar_26 = Highcharts.chart({
        chart: {
            type: 'column',
            renderTo: 'deaths_bars_26'
        },
        title: {
            align: 'left',
            text: 'Weeklly figures - last 6 months'
        },
        xAxis: {
            categories: dates_26,
            tickInterval: 20,
            labels: {
                enabled: false
            },
            title: {
                text: undefined
            },
        },
        yAxis: {
            title: {
                text: undefined
            },
            endOnTick: false
        },
        tooltip: {
            formatter: function () {
                let title = fCapital(this.x);
                let value = numberFormatter(this.y);
                return '<b>' + title + '</b><br/>Weekly deaths: ' + value;
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
                type: 'column',
                colorIndex: 4,
                id: 'Covid19',
                data: initial_deaths_bar_26_data,
            }],
        legend: {
            enabled: false
        }
    });
    let hospital_bar_26 = Highcharts.chart({
        chart: {
            type: 'column',
            renderTo: 'hospital_bars_26'
        },
        title: {
            align: 'left',
            text: 'Weekly figures - last 6 months'
        },
        xAxis: {
            categories: dates_26,
            tickInterval: 20,
            labels: {
                enabled: false
            },
            title: {
                text: undefined
            },
        },
        yAxis: {
            title: {
                text: undefined
            },
            endOnTick: false
        },
        tooltip: {
            formatter: function () {
                let weeklyCountries = ["Greece", "Liechtenstein", "Russia", "Singapore", "Latvia", "Malta", "Chile", "Germany"];
                let title = fCapital(this.x);
                let value = this.point.y;
                let tot = this.point.total;
                let series = this.series.name;
                let hosp = '';
                let icu = '';
                let text = '';
                // no easy way to show both values on tooltip, so doing this
                if (series == "hospitalization") {
                    hosp = numberFormatter(value);
                    icu = numberFormatter(tot - value);
                }
                else {
                    hosp = numberFormatter(tot - value);
                    icu = numberFormatter(value);
                }
                if (weeklyCountries.includes(country)) {
                    text = "Weekly admissions ";
                }
                else {
                    text = "Total patients ";
                }
                return '<b>' + title + '</b><br/>' + text + 'in hospitals: ' + hosp +
                    '<br/>' + text + "in ICU's: " + icu;
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
                type: 'column',
                colorIndex: 24,
                name: 'hospitalization',
                data: initial_hospitalization_26_data,
            }, {
                type: 'column',
                colorIndex: 27,
                name: 'icu',
                data: initial_icu_data,
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
            formatter: function () {
                let twentyone = "N/A";
                let title = 'Week ' + this.x;
                let old = numberFormatter(this.points[0].y);
                let twenty = numberFormatter(this.points[1].y);
                if (this.points.length > 2) {
                    twentyone = numberFormatter(this.points[2].y);
                }
                return '<b>' + title + '</b><br/>Weekly death toll (average of 2015-9): ' + old +
                    '<br/>Weekly death toll (2020): ' + twenty +
                    '<br/>Weekly death toll (2021): ' + twentyone;
            },
            useHTML: true,
            shared: true,
            split: false,
        },
        series: [{
                id: "old",
                name: "2015-9 average",
                type: 'column',
                colorIndex: 50,
                data: initial_old_excess_data,
            },
            {
                id: "2020",
                name: "2020",
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
                name: "2021",
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
                name: "2022",
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
            enabled: false
        }
    });
    // Dashboard 2
    let map_repsonse_chart = HighMaps.mapChart({
        chart: {
            height: 500,
            renderTo: 'lockdown_map',
            map: topology,
        },
        plotOptions: {
            map: {
                allAreas: false,
                joinBy: ['iso-a3', 'country'],
            },
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
            formatter: function () {
                let title = fCapital(this.key);
                let note = this.point.note;
                let textArray = addLineBreaks(note, 60);
                let text = textArray[0];
                if (textArray.length > 1) {
                    for (let i = 1; textArray.length > i; i++) {
                        text = text + "<br/>" + textArray[i];
                    }
                }
                return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
            },
            useHTML: true
        },
        legend: {
            enabled: false
        },
        series: initial_map_response_data,
    });
    // Dashboard 1
    // Otherwise these charts overflow their containers
    excess_chart.setSize();
    cases_bar_all.setSize();
    cases_bar_26.setSize();
    deaths_bar_all.setSize();
    deaths_bar_26.setSize();
    hospital_bar_all.setSize();
    hospital_bar_26.setSize();
    // Dropdowns
    // Define dropdown container
    let map_filters = document.querySelector(map_container_class + " .chart-filters");
    // Create a parameter dropdown for the map
    let parameterName = "covid-map-parameter";
    let parameterWidth = "340px";
    addDropdown(map_filters, parameterName, parameterWidth, parameterChange, ALL_PARAMETERS, parameter);
    // Update chart data on parameter change
    function parameterChange() {
        parameter = document.getElementById(parameterName + "-select").value;
        updateColorAxis();
        chart.series[0].setData(get_map_data());
    }
    // Legends
    let excess_chart_points = excess_chart.series;
    createLegend(excess_chart_points, excess_chart_points, excess_container_class);
    // adjust map color stops according to parameter
    function updateColorAxis() {
        let updatedAxis = {};
        if (parameter == "Cases per 1 million (7 day average)") {
            updatedAxis = {
                tickInterval: 400,
                max: 2000,
                min: 0,
                stops: [
                    [0, getIndexColor(3)],
                    [0.35, getIndexColor(23)],
                    [0.5, getIndexColor(52)],
                    [0.65, getIndexColor(9)],
                    [0.95, getIndexColor(30)]
                ],
            };
        }
        else if (parameter == "Deaths per 1 million (7 day average)") {
            updatedAxis = {
                tickInterval: 1,
                max: 5,
                min: 0,
                stops: [
                    [0, getIndexColor(3)],
                    [0.35, getIndexColor(23)],
                    [0.5, getIndexColor(52)],
                    [0.65, getIndexColor(9)],
                    [0.95, getIndexColor(30)]
                ],
            };
        }
        else if (parameter == "Fully vaccinated population share") {
            updatedAxis = {
                tickInterval: 20,
                max: 80,
                min: 0,
                stops: [
                    [0, getIndexColor(53)],
                    [0.01, getIndexColor(30)],
                    [0.35, getIndexColor(9)],
                    [0.5, getIndexColor(52)],
                    [0.65, getIndexColor(23)],
                    [0.95, getIndexColor(3)]
                ],
            };
        }
        chart.update({
            colorAxis: updatedAxis,
        }, false);
    }
    function highlightCountry() {
        let elements = document.querySelectorAll(".covid-map .highcharts-map-series .highcharts-point");
        if (country != 'World') {
            let css = 'highcharts-name-' + country.toLowerCase().split(' ').join('-');
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
    // Dashboard 2
    // Define filters / options for response map
    var responseFilters = document.querySelector(map_response_container_class + " .chart-filters");
    // legend for response map
    let responseLegendContainer = document.querySelector('.lockdown-map .secondary-legend');
    let responseLegendItems = [{ name: "No restrictions", colorIndex: 52 },
        { name: 'Some movement restrictions', colorIndex: 37 },
        { name: 'Curfew', colorIndex: 16 },
        { name: 'Lockdown', colorIndex: 18 }];
    // Append legend items
    for (let point of responseLegendItems) {
        responseLegendContainer.innerHTML += '<div class="legend-item"><div class="dot legend-color-' + point.colorIndex + '" ></div><div class="serieName" id="">' + fCapital(point.name) + '</div></div>';
    }
    // Create play button
    let playButton = document.createElement("div");
    playButton.classList.add("play-button");
    playButton.addEventListener("click", playToggle);
    let playIcon = document.createElement("span");
    playIcon.id = map_container_class + "-play-icon";
    playIcon.classList.add("i-play");
    playButton.appendChild(playIcon);
    responseFilters.appendChild(playButton);
    // Create a slider
    let sliderName = "play-slider";
    let min = 0;
    let max = (all_week_dates_lock.length - 1);
    let value = max;
    let containerWidth = 400;
    let sliderWidth = 100;
    addSlider(responseFilters, sliderName, min, max, value, containerWidth, sliderWidth, sliderDateChange);
    let loopi = 0;
    let slider = document.getElementById(sliderName + "-slider");
    let shownDate = document.getElementById(sliderName + "-slider-output");
    shownDate.innerHTML = date_lock;
    let playing = false;
    // Update chart data on slider change
    function sliderDateChange() {
        loopi = slider.value;
        date_lock = all_week_dates_lock[loopi];
        shownDate.innerHTML = date_lock;
        dateChange();
    }
    function dateChange() {
        let updatedMapData = get_map_response_data();
        // remove old series
        let loops = map_repsonse_chart.series.length;
        for (var i = 0; i < loops; i++) {
            map_repsonse_chart.series[0].remove(false);
        }
        // then add new ones
        for (var i = 0; i < updatedMapData.length; i++) {
            map_repsonse_chart.addSeries(updatedMapData[i], false);
        }
        map_repsonse_chart.redraw(false);
        if (date_lock == all_week_dates_lock[all_week_dates_lock.length - 1] && playing) {
            stopPlaying();
        }
    }
    function stopPlaying() {
        let iSpan = document.getElementById(map_container_class + "-play-icon");
        iSpan.classList.remove("i-pause");
        iSpan.classList.add("i-play");
        playing = false;
        clearInterval(timer);
    }
    function playToggle() {
        let iSpan = document.getElementById(map_container_class + "-play-icon");
        if (playing) {
            stopPlaying();
        }
        else {
            if (date_lock == all_week_dates_lock[(all_week_dates_lock.length - 1)]) {
                loopi = 0;
            }
            playing = true;
            iSpan.classList.remove("i-play");
            iSpan.classList.add("i-pause");
            timer = setInterval(function () {
                if (loopi < all_week_dates_lock.length) {
                    date_lock = all_week_dates_lock[loopi];
                    shownDate.innerHTML = date_lock;
                    slider.value = loopi;
                    dateChange();
                    loopi++;
                }
            }, 500);
        }
    }
})
    .catch(function (error) {
    console.log(error);
});
