// helpers
import { fCapital, addDropdown, getCountryCode, numberFormatter, getIndexColor, addLineBreaks, addSlider, addTabClickEvents, getCountryName, getHighchartsMapCSSName } from "./chartHelper.js";
let covid_map_path = "/static/worlddata/csv/covid-map.csv";
let covid_lockdown_notes_path = "/static/worlddata/csv/covid-lockdown-notes.csv";
let covid_excess_deaths_path = "/static/worlddata/csv/covid-excess-deaths.csv";
let covid_stats_path = "/static/worlddata/csv/covid-stats.csv";
let tabcss = "covid_intro";
addTabClickEvents(tabcss);
let CovidDashboard = Promise.all([
    d3.csv(covid_map_path),
    d3.csv(covid_lockdown_notes_path),
    d3.csv(covid_stats_path),
    d3.csv(covid_excess_deaths_path),
]).then(function (files) {
    // All filterable options
    const ALL_PARAMETERS = ["Cases per 1 million (7 day average)",
        "Deaths per 1 million (7 day average)",
        "Fully vaccinated population share",
        "Movement restrictions imposed"];
    const ALL_WEEKS = [...new Set(files[3].map((d) => d.Week))];
    let date_cols = files[0].columns;
    date_cols.splice(0, 2);
    const ALL_DATES = date_cols;
    let date = ALL_DATES[ALL_DATES.length - 1];
    // Default values
    let parameter = "Deaths per 1 million (7 day average)";
    let country = "World";
    let excessDateType = "month";
    let hospitalDateType = "week";
    let timer;
    let map_container_class = ".covid-map";
    // Initialise stat elements
    let statDeaths = document.getElementById("stat_deaths");
    let statDeaths2020 = document.getElementById("stat_deaths_2020");
    let statDeaths2021 = document.getElementById("stat_deaths_2021");
    let statDeaths2022 = document.getElementById("stat_deaths_2022");
    let statCases = document.getElementById("stat_cases");
    let statCases2020 = document.getElementById("stat_cases_2020");
    let statCases2021 = document.getElementById("stat_cases_2021");
    let statCases2022 = document.getElementById("stat_cases_2022");
    let statExcess = document.getElementById("stat_excess");
    let statExcess2020 = document.getElementById("stat_excess_2020");
    let statExcess2021 = document.getElementById("stat_excess_2021");
    let statExcess2022 = document.getElementById("stat_excess_2022");
    let statVaccinationShare = document.getElementById("stat_vaccination_share");
    function get_bar_data(measure) {
        let data = [];
        let newMeasure = measure;
        let dailyCountries = ["Algeria",
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
        let weeklyCountries = ["Chile",
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
        if (dailyCountries.includes(country)) {
            hospitalDateType = "day";
            if (measure == "Hospital") {
                newMeasure = "Daily hospital occupancy";
            }
            else if (measure == "ICU") {
                newMeasure = "Daily ICU occupancy";
            }
        }
        else if (weeklyCountries.includes(country)) {
            hospitalDateType = "week";
            if (measure == "Hospital") {
                newMeasure = "Weekly new hospital admissions";
            }
            else if (measure == "ICU") {
                newMeasure = "Weekly new ICU admissions";
            }
        }
        for (let row of files[0]) {
            if (row.variable == newMeasure && row.Country == country) {
                // instead of iterating, turn the whole row into an array
                data = Object.values(row);
                data.shift();
                data.shift();
                data = data.map(Number);
                return data;
            }
        }
        return data;
    }
    function bar_data_update() {
        let updated_cases_data = get_bar_data("cases");
        let updated_deaths_data = get_bar_data("deaths");
        let updated_hospitalization_data = get_bar_data("Hospital");
        let updated_icu_data = get_bar_data("ICU");
        let updated_vaccination_data = get_bar_data("vaccinations");
        let updated_test_data1 = get_bar_data("tests_people");
        let updated_test_data2 = get_bar_data("tests_samples");
        let updated_test_data3 = get_bar_data("tests_tests");
        let updated_test_data4 = get_bar_data("tests_unclear");
        let updated_test_ratio_data = get_bar_data("tests_pc");
        let hospitalYAxis = {
            title: {
                text: undefined
            },
            endOnTick: false
        };
        if (hospitalDateType == "week") {
            hospitalYAxis.title.text = "Sum of admissions";
        }
        else if (hospitalDateType == "day") {
            hospitalYAxis.title.text = "Daily occupancy";
        }
        hospital_chart.update({
            yAxis: hospitalYAxis,
        }, false);
        // Then add the updated data
        // cases_chart.series[0].update(updated_cases_data, false);
        // cases_chart.series[1].update(updated_test_ratio_data, false);
        cases_chart.series[0].setData(updated_cases_data, false);
        cases_chart.series[1].setData(updated_test_ratio_data, false);
        deaths_chart.series[0].setData(updated_deaths_data, false);
        hospital_chart.series[0].setData(updated_hospitalization_data, false);
        hospital_chart.series[1].setData(updated_icu_data, false);
        vaccination_chart.series[0].setData(updated_vaccination_data, false);
        vaccination_chart.series[1].setData(updated_test_data1, false);
        vaccination_chart.series[2].setData(updated_test_data2, false);
        vaccination_chart.series[3].setData(updated_test_data3, false);
        vaccination_chart.series[4].setData(updated_test_data4, false);
        // Hide / show errors for test graphs (we miss test data for many countries)
        let err1 = document.getElementById("hospital_error");
        if (updated_hospitalization_data.length > 1 || updated_icu_data.length > 1) {
            err1.classList.add("hide");
        }
        else {
            err1.classList.remove("hide");
        }
        cases_chart.redraw();
        deaths_chart.redraw();
        hospital_chart.redraw();
        vaccination_chart.redraw();
    }
    function change_dashboard_country_text(country) {
        let c = getCountryName(country);
        var element = document.getElementsByClassName("dashboard-profile-country")[0].firstElementChild;
        element.innerHTML = c;
    }
    function get_old_excess_data() {
        let week_data = [];
        for (let row of files[3]) {
            if (row.Country == country) {
                excessDateType = row.Time_unit;
                if (row.Deaths_2020 > 0) {
                    week_data.push(+row.Deaths_old);
                }
            }
        }
        //update title
        let subtitleContainer = document.querySelector(".covid-excess .dashboard-subtitle");
        let newSubtitle = "";
        if (country == "World") {
            newSubtitle = "Expected deaths (without considering the pandemic) vs estimated actual deaths";
        }
        else if (excessDateType == "month") {
            newSubtitle = "Expected deaths (based on values before the pandemic) vs actual deaths";
        }
        else if (excessDateType == "week") {
            newSubtitle = "Expected deaths (based on values before the pandemic) vs actual deaths";
        }
        subtitleContainer.innerHTML = newSubtitle;
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
            if (row.Country == country) {
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
    function get_excess_total(year) {
        let value = null;
        for (let row of files[2]) {
            if (country == row.Country) {
                if (year == 2020) {
                    if (row.Excess_Deaths_2020 != '') {
                        value = +row.Excess_Deaths_2020;
                    }
                }
                else if (year == 2021) {
                    if (row.Excess_Deaths_2021 != '') {
                        value = +row.Excess_Deaths_2021;
                    }
                }
                else if (year == 2022) {
                    if (row.Excess_Deaths_2022 != '') {
                        value = +row.Excess_Deaths_2022;
                    }
                }
                return value;
            }
        }
        return value;
    }
    function excess_data_update() {
        let excess20 = get_latest_excess_data(2020);
        let excess21 = get_latest_excess_data(2021);
        let excess22 = get_latest_excess_data(2022);
        let old = get_old_excess_data();
        let oldName = "";
        let name20 = "";
        let name21 = "";
        let name22 = "";
        if (country == "World") {
            oldName = "Expected deaths";
            name20 = "2020 (estimated)";
            name21 = "2021 (estimated)";
            name22 = "2022 (estimated)";
        }
        else {
            oldName = "2015-9 average";
            name20 = "2020";
            name21 = "2021";
            name22 = "2022";
        }
        let seriesOld = {
            name: oldName,
            type: 'column',
            data: old
        };
        let series20 = {
            type: 'spline',
            name: name20,
            data: [],
            label: {
                enabled: false,
                format: ''
            }
        };
        let series21 = {
            type: 'spline',
            name: name21,
            data: [],
            label: {
                enabled: false,
                format: ''
            }
        };
        let series22 = {
            type: 'spline',
            name: name22,
            data: [],
            label: {
                enabled: false,
                format: ''
            }
        };
        let total2020 = get_excess_total(2020);
        let total2021 = get_excess_total(2021);
        let total2022 = get_excess_total(2022);
        if (total2020 != null) {
            let total2020Text = "";
            if (total2020 > 0) {
                total2020Text = "+ " + numberFormatter(total2020);
            }
            else {
                total2020Text = numberFormatter(total2020);
            }
            series20.label.format = total2020Text;
            series20.label.enabled = true;
        }
        else {
            series20.label.format = '';
            series20.label.enabled = false;
        }
        if (total2021 != null) {
            let total2021Text = "";
            if (total2021 > 0) {
                total2021Text = "+ " + numberFormatter(total2021);
            }
            else {
                total2021Text = numberFormatter(total2021);
            }
            series21.label.format = total2021Text;
            series21.label.enabled = true;
        }
        else {
            series21.label.format = '';
            series21.label.enabled = false;
        }
        if (total2022 != null) {
            let total2022Text = "";
            if (total2022 > 0) {
                total2022Text = "+ " + numberFormatter(total2022);
            }
            else {
                total2022Text = numberFormatter(total2022);
            }
            series22.label.format = total2022Text;
            series22.label.enabled = true;
        }
        else {
            series22.label.format = '';
            series22.label.enabled = false;
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
    function get_map_data() {
        let new_data = [];
        if (parameter == "Movement restrictions imposed") {
            let lock_data = [];
            let cur_data = [];
            let some_data = [];
            let test_data = [];
            let no_data = [];
            let empty_data = [];
            for (let row of files[0]) {
                if (row.Country != "World" && row.variable == "restrictions") {
                    let note = row[date];
                    let country = getCountryCode(row.Country);
                    if (note > 20000) {
                        lock_data.push({ country: country, countryName: row.Country, value: 5, note: note });
                    }
                    else if (note > 10000) {
                        cur_data.push({ country: country, countryName: row.Country, value: 4, note: note });
                    }
                    else if (note > 100) {
                        some_data.push({ country: country, countryName: row.Country, value: 3, note: note });
                    }
                    else if (note > 50) {
                        test_data.push({ country: country, countryName: row.Country, value: 2, note: note });
                    }
                    else if (note > 9) {
                        no_data.push({ country: country, countryName: row.Country, value: 1, note: note });
                    }
                    else {
                        empty_data.push({ country: country, countryName: row.Country, value: 0, note: note });
                    }
                }
            }
            let emptySlice = { data: empty_data, name: 'No data', type: 'map', colorIndex: 51 };
            let noSlice = { data: no_data, name: 'No restrictions', type: 'map', colorIndex: 49 };
            let testSlice = { data: test_data, name: 'Test/vaccination based restrictions', type: 'map', colorIndex: 36 };
            let someSlice = { data: some_data, name: 'Non general restrictions', type: 'map', colorIndex: 38 };
            let curSlice = { data: cur_data, name: 'General curfew', type: 'map', colorIndex: 16 };
            let lockSlice = { data: lock_data, name: 'General lockdown', type: 'map', colorIndex: 18 };
            new_data.push(emptySlice);
            new_data.push(noSlice);
            new_data.push(testSlice);
            new_data.push(someSlice);
            new_data.push(curSlice);
            new_data.push(lockSlice);
        }
        else {
            let map_data = [];
            let param = "";
            if (parameter == "Cases per 1 million (7 day average)") {
                param = "cases_pm";
            }
            else if (parameter == "Deaths per 1 million (7 day average)") {
                param = "deaths_pm";
            }
            else if (parameter == "Fully vaccinated population share") {
                param = "vaccinations";
            }
            for (let row of files[0]) {
                if (row.Country != "World" && row.variable == param) {
                    let val = row[date];
                    map_data.push({ country: getCountryCode(row.Country), value: +val, countryName: row.Country });
                }
            }
            let new_slice = { data: map_data, name: parameter, type: 'map', colorIndex: 3 };
            new_data.push(new_slice);
        }
        return new_data;
    }
    function update_map_data() {
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
    function get_map_restriction_note(code) {
        for (let row of files[1]) {
            if (row.Code == code) {
                return row.Note;
            }
        }
        console.log("No note found for code " + code);
        return "N/A";
    }
    function setStats() {
        let cases = '';
        let cases2020 = '';
        let cases2021 = '';
        let cases2022 = '';
        let deaths = '';
        let deaths_2020 = '';
        let deaths_2021 = '';
        let deaths_2022 = '';
        let vaccinationShare = '';
        let excess = '';
        let excess2020 = '';
        let excess2021 = '';
        let excess2022 = '';
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
    let initial_tests_data1 = get_bar_data("tests_people");
    let initial_tests_data2 = get_bar_data("tests_samples");
    let initial_tests_data3 = get_bar_data("tests_tests");
    let initial_tests_data4 = get_bar_data("tests_unclear");
    let initial_test_ratio_data = get_bar_data("tests_pc");
    let initial_excess2020Total = numberFormatter(get_excess_total(2020));
    let initial_excess2021Total = numberFormatter(get_excess_total(2021));
    setStats();
    let chartXAxis = {
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
            renderTo: 'cases_bars',
        },
        title: {
            text: undefined
        },
        xAxis: chartXAxis,
        yAxis: [{
                min: 0,
                endOnTick: false,
                title: {
                    text: "Sum of cases"
                },
                className: 'highcharts-color-3',
            }, {
                min: 0,
                endOnTick: false,
                title: {
                    text: "Tests per case"
                },
                className: 'highcharts-color-36',
                opposite: true
            }],
        tooltip: {
            formatter: function () {
                let title = getCountryName(country);
                let date = this.x;
                let cases = numberFormatter(this.points[0].y);
                let casesText = 'Sum of cases:<b> ' + cases + '</b>';
                let ratio = 0;
                if (this.points.length > 1) {
                    ratio = this.points[1].y;
                }
                let ratioText = "";
                if (ratio > 0) {
                    ratioText = '<b>' + numberFormatter(ratio) + "</b> tests for each case";
                }
                else {
                    ratioText = "No test data available";
                }
                return '<span style="font-size: 1.1em"><b>' + title +
                    '</b><br></span>For week ending on: <b>' + date + '</b><br>' + casesText +
                    '<br/>' + ratioText;
            },
            useHTML: true,
            shared: true,
            split: false,
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                },
                label: {
                    enabled: false
                },
                connectNulls: false
            },
            column: {
                stacking: 'normal',
                borderRadius: 3,
                pointPadding: 0,
                groupPadding: 0.1,
                crisp: false
            }
        },
        series: [{
                name: "COVID-19 cases",
                type: 'column',
                colorIndex: 3,
                data: initial_cases_data,
                yAxis: 0
            }, {
                name: "Positive test ratio",
                type: 'spline',
                colorIndex: 36,
                data: initial_test_ratio_data,
                yAxis: 1,
                label: {
                    enabled: true,
                }
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
            formatter: function () {
                let title = getCountryName(country);
                let date = this.x;
                let value = numberFormatter(this.y);
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
                crisp: false
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
            formatter: function () {
                let title = getCountryName(country);
                let date = this.x;
                let hosp = "N/A";
                let icu = "N/A";
                let hospText = '';
                let icuText = '';
                // check if we have them both
                if (this.points.length > 1) {
                    hosp = numberFormatter(this.points[0].y);
                    icu = numberFormatter(this.points[1].y);
                }
                else {
                    // we only have one
                    if (country == "Poland") {
                        hosp = numberFormatter(this.points[0].y);
                    }
                    else {
                        icu = numberFormatter(this.points[0].y);
                    }
                }
                if (hospitalDateType == "week") {
                    hospText = "New hospital admissions: <b>";
                    icuText = "New ICU admissions: <b>";
                }
                else if (hospitalDateType == "day") {
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
                crisp: false
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
        yAxis: [{
                title: {
                    text: "Sum of tests"
                },
                endOnTick: false,
                min: 0,
                className: 'highcharts-color-24',
            },
            {
                title: {
                    text: "Population share"
                },
                labels: {
                    format: '{text}%'
                },
                endOnTick: true,
                max: 100,
                opposite: true,
                className: 'highcharts-color-35',
            }],
        tooltip: {
            formatter: function () {
                let title = getCountryName(country);
                let date = this.x;
                let vacc = numberFormatter(this.points[0].y);
                let vaccText = "<b>" + vacc + "%</b> of the population had been vaccinated<br/>";
                let testText = "";
                if (title == "World") {
                    let test1 = this.points[1].y;
                    let test2 = this.points[2].y;
                    let test3 = this.points[3].y;
                    let test4 = this.points[4].y;
                    let testTotal = test1 + test2 + test3 + test4;
                    if (testTotal > 0) {
                        testText = "A total of <b>" + numberFormatter(testTotal) + "</b> mixed unit tests were carried out <br/>(" +
                            numberFormatter(test1) + " people + " + numberFormatter(test2) + " samples +<br/>" +
                            numberFormatter(test3) + " tests + " + numberFormatter(test4) + " unknown units)";
                    }
                    else {
                        testText = "No test data available";
                    }
                }
                else {
                    // we only have one, check series name to see which one
                    let val = this.points[1].y;
                    if (val > 0) {
                        let type = this.points[1].series.name;
                        if (type == "tests_people") {
                            testText = "<b>" + numberFormatter(val) + "</b> people were tested";
                        }
                        else if (type == "tests_samples") {
                            testText = "<b>" + numberFormatter(val) + "</b> samples were tested";
                        }
                        else if (type == "tests_tests") {
                            testText = "<b>" + numberFormatter(val) + "</b> tests were carried out";
                        }
                        else if (type == "tests_unclear") {
                            testText = "<b>" + numberFormatter(val) + "</b> tests were carried out (unclear units)";
                        }
                    }
                    else {
                        testText = "No test data available";
                    }
                }
                return '<span style="font-size: 1.1em"><b>' + title + '</b><br></span>For week ending on <b>' + date +
                    '</b><br/>' + vaccText + testText;
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
                crisp: false
            },
        },
        series: [{
                colorIndex: 35,
                name: 'Vaccinations',
                type: 'spline',
                data: initial_vaccination_data,
                yAxis: 1,
                zIndex: 1
            }, {
                name: "tests_people",
                type: 'column',
                colorIndex: 24,
                data: initial_tests_data1,
                label: {
                    enabled: false,
                    format: ''
                }
            }, {
                name: "tests_samples",
                type: 'column',
                colorIndex: 24,
                data: initial_tests_data2,
                label: {
                    enabled: false,
                    format: ''
                }
            }, {
                name: "tests_tests",
                type: 'column',
                colorIndex: 24,
                data: initial_tests_data3,
                label: {
                    enabled: false,
                    format: ''
                }
            }, {
                name: "tests_unclear",
                type: 'column',
                colorIndex: 24,
                data: initial_tests_data4,
                label: {
                    enabled: false,
                    format: ''
                }
            },],
        legend: {
            enabled: false
        }
    });
    let excess_chart = Highcharts.chart({
        chart: {
            type: 'spline',
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
                text: 'Total deaths (all causes)'
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
                crisp: false
            },
        },
        tooltip: {
            formatter: function () {
                let twentyone = "N/A";
                let twentytwo = "N/A";
                let title = "";
                if (excessDateType == "week") {
                    title = 'Week ' + this.x;
                }
                else {
                    if (this.x == 0) {
                        title = "January";
                    }
                    else if (this.x == 1) {
                        title = "February";
                    }
                    else if (this.x == 2) {
                        title = "March";
                    }
                    else if (this.x == 3) {
                        title = "April";
                    }
                    else if (this.x == 4) {
                        title = "May";
                    }
                    else if (this.x == 5) {
                        title = "June";
                    }
                    else if (this.x == 6) {
                        title = "July";
                    }
                    else if (this.x == 7) {
                        title = "August";
                    }
                    else if (this.x == 8) {
                        title = "September";
                    }
                    else if (this.x == 9) {
                        title = "October";
                    }
                    else if (this.x == 10) {
                        title = "November";
                    }
                    else if (this.x == 11) {
                        title = "December";
                    }
                }
                let old = numberFormatter(this.points[0].y);
                let twenty = numberFormatter(this.points[1].y);
                if (this.points.length > 2) {
                    twentyone = numberFormatter(this.points[2].y);
                }
                if (this.points.length > 3) {
                    twentytwo = numberFormatter(this.points[3].y);
                }
                let text = "";
                if (excessDateType == "month") {
                    text = "Monthly";
                }
                else {
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
                colorIndex: 6,
                data: initial_old_excess_data,
            },
            {
                id: "2020",
                name: "2020 (estimated)",
                type: 'spline',
                colorIndex: 46,
                data: initial_2020_excess_data,
                label: {
                    enabled: true,
                    format: initial_excess2020Total
                }
            },
            {
                id: "2021",
                name: "2021 (estimated)",
                type: 'spline',
                colorIndex: 44,
                data: initial_2021_excess_data,
                label: {
                    enabled: true,
                    format: initial_excess2021Total
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
                type: 'map',
                allAreas: false,
                joinBy: ['iso-a3', 'country'],
                mapData: Highcharts.maps['custom/world'],
                colorAxis: 0,
                events: {
                    click: function (e) {
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
            formatter: function () {
                let title = fCapital(this.key);
                if (parameter == "Movement restrictions imposed") {
                    let note = this.point.note;
                    let noteText = get_map_restriction_note(note);
                    let textArray = addLineBreaks(noteText, 60);
                    let text = textArray[0];
                    if (textArray.length > 1) {
                        for (let i = 1; textArray.length > i; i++) {
                            text = text + "<br/>" + textArray[i];
                        }
                    }
                    return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
                }
                else {
                    let value = this.point.value.toString();
                    let text = "";
                    if (parameter == "Cases per 1 million (7 day average)") {
                        text = "<b>" + value + "</b> daily cases per 1 million people <br>(7 day average for week ending on " + date + ")";
                    }
                    else if (parameter == "Deaths per 1 million (7 day average)") {
                        text = "<b>" + value + "</b> daily deaths per 1 million people <br>(7 day average for week ending on " + date + ")";
                    }
                    else if (parameter == "Fully vaccinated population share") {
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
    let map_dropdown_container = document.querySelector(map_container_class + " .chart-options .row1");
    // Create a parameter dropdown for the map
    let parameterName = "covid-map-parameter";
    let parameterWidth = "";
    addDropdown(map_dropdown_container, parameterName, parameterWidth, parameterChange, ALL_PARAMETERS, parameter);
    // Update chart data on parameter change
    function parameterChange() {
        parameter = document.getElementById(parameterName + "-select").value;
        update_map_data();
        updateColorAxis();
        highlightCountry();
    }
    // Define filters / options for response map
    var map_playButton_container = document.querySelector(map_container_class + " .chart-options .play-container");
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
    let max = (ALL_DATES.length - 1);
    let value = max;
    let containerWidth = 375;
    let sliderWidth = 100;
    addSlider(map_playButton_container, sliderName, min, max, value, sliderWidth, sliderDateChange);
    let loopi = 0;
    let slider = document.getElementById(sliderName + "-slider");
    let shownDate = document.getElementById(sliderName + "-slider-output");
    shownDate.innerHTML = date;
    let playing = false;
    // Update chart data on slider change
    function sliderDateChange() {
        loopi = slider.value;
        date = ALL_DATES[loopi];
        shownDate.innerHTML = date;
        dateChange();
    }
    function dateChange() {
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
                    slider.value = loopi;
                    dateChange();
                    loopi++;
                }
            }, 150);
        }
    }
    // adjust map color stops according to parameter
    function updateColorAxis() {
        let updatedAxis = {};
        let updatedPlotOptions = {};
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
        }
        else if (parameter == "Deaths per 1 million (7 day average)") {
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
        }
        else if (parameter == "Fully vaccinated population share") {
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
        }
        else if (parameter == "Movement restrictions imposed") {
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
            };
        }
        else {
            updatedPlotOptions = {
                colorAxis: 0
            };
        }
        map_chart.update({
            plotOptions: {
                map: updatedPlotOptions,
            }
        }, false);
        map_chart.update({
            colorAxis: updatedAxis,
        }, false);
        // hack because otherwise colors are not automatically updated
        if (parameter == "Movement restrictions imposed") {
            dateChange();
        }
        map_chart.redraw(false);
    }
    function highlightCountry() {
        let elements = document.querySelectorAll(".covid-map .highcharts-map-series .highcharts-point");
        if (country != 'World') {
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
