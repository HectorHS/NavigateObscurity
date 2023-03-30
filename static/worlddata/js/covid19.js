var covid_map_path = "/static/worlddata/csv/covid-map.csv";
covid_area_path = "/static/worlddata/csv/covid-time.csv";
covid_lockdown_path = "/static/worlddata/csv/covid-lockdown.csv";
covid_lockdown_notes_path = "/static/worlddata/csv/covid-lockdown-notes.csv";
covid_excess_deaths_path = "/static/worlddata/csv/covid-excess-deaths.csv";
population_path = "/static/worlddata/csv/population.csv";

var CovidDashboard = Promise.all([
    d3.csv(covid_map_path),
    d3.csv(covid_area_path),
    d3.csv(covid_lockdown_path),
    d3.csv(covid_excess_deaths_path),
    d3.csv(population_path),
    d3.csv(covid_lockdown_notes_path)
]).then(function (files) {
    // All filterable options
    const all_parameters = ["Cases per 1 million (7 day average)",
        "Deaths per 1 million (7 day average)",
        "Fully vaccinated population share"];
    const all_countries = [...new Set(files[0].map(d => d.Country))].sort()
    const all_countries_ex = [...new Set(files[3].map(d => d.Country))].sort()
    const all_weeks = [...new Set(files[3].map(d => d.Week))]

    let cols = files[1].columns;
    let lock_cols = files[2].columns;
    cols.splice(0, 3);
    lock_cols.splice(0, 2);
    const all_dates = cols;
    const all_dates_lock = lock_cols;
    let all_week_dates_lock = [];
    for (let i = 0; i < (all_dates_lock.length - 1); i += 7) {
        all_week_dates_lock.push(all_dates_lock[i]);
    }
    all_week_dates_lock.push(all_dates_lock[all_dates_lock.length - 1]);

    // Default values
    let parameter = "Deaths per 1 million (7 day average)",
        metric = "absolute",
        country = "World",
        innerCountry = "World",
        total_excess = 0,
        date_lock = all_week_dates_lock[all_week_dates_lock.length - 1];
    let timer;

    let map_container_class = ".covid-map",
        excess_container_class = ".covid-excess",
        cases_container_class = ".cases-chart",
        map_response_container_class = ".lockdown-map",
        initial_map_data = [],
        xAxisBands = [],
        initial_old_excess_data = [],
        initial_latest_excess_data = [],
        initial_cases_time_data = [],
        initial_map_response_data = [];

    // Set html dates
    var last_date = all_dates[all_dates.length - 1];
    let dates_26 = all_dates.slice(Math.max(all_dates.length - 26, 0));
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
                } else if (parameter == "Deaths per 1 million (7 day average)") {
                    val = row.Deaths_week;
                } else if (parameter == "Fully vaccinated population share") {
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
                for (let day in all_dates) {
                    val = +row[all_dates[day]];
                    // this especially helpful for test positive rates where we are missing a lot of values
                    if (val == 0) {
                        val = null
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
        let updated_hospital_bar_all_data = get_bar_data("Tests");
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
            err1.classList.add("hide")
            err2.classList.add("hide")
        } else {
            err1.classList.remove("hide")
            err2.classList.remove("hide")
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
            err.classList.add("hide")
        } else {
            err.classList.remove("hide")
        }

        return week_data;
    }
    function get_latest_excess_data(year) {
        let latest_data = [];
        for (let row of files[3]) {
            if (row.Country == innerCountry) {
                if (year == 2020) {
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
    function excess_data_update() {
        let excess20 = get_latest_excess_data(2020);
        let excess21 = get_latest_excess_data(2021);
        let excess22 = get_latest_excess_data(2022);
        let old = get_old_excess_data();
        let series20 = {
            data: [],
            label: {
                enabled: false,
                format: ''
            }
        }
        let series21 = {
            data: [],
            label: {
                enabled: false,
                format: ''
            }
        }
        let series22 = {
            data: [],
            label: {
                enabled: false,
                format: ''
            }
        }

        //excess_chart.update(options);
        excess_chart.series[0].setData(old);

        if (excess20.length != 0) {
            let oldTotal = 0;
            let total2020 = 0;
            let total_excess_text_2020 = '';

            for (let i = 0; i < excess20.length; i++) {
                total2020 += +excess20[i];
                oldTotal += +old[i];
            }
            total_excess_2020 = total2020 - oldTotal;

            let val = numberFormatter(total_excess_2020);
            if (total_excess_2020 > 0) {
                total_excess_text_2020 = "+ " + val.toString();
            } else {
                total_excess_text_2020 = val.toString();
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
                total2021 += +excess21[i];
                oldTotal += +old[i];
            }
            total_excess_2021 = total2021 - oldTotal;

            let val = numberFormatter(total_excess_2021);
            if (total_excess_2021 > 0) {
                total_excess_text_2021 = "+ " + val.toString();
            } else {
                total_excess_text_2021 = val.toString();
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
                total2022 += +excess22[i];
                oldTotal += +old[i];
            }
            total_excess_2022 = total2022 - oldTotal;

            let val = numberFormatter(total_excess_2022);
            if (total_excess_2022 > 0) {
                total_excess_text_2022 = "+ " + val.toString();
            } else {
                total_excess_text_2022 = val.toString();
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
        var new_data = [];
        for (let row of files[2]) {
            if (row.Country != "World" && row.Measure == "restriction") {
                var value = row[date_lock];
                var country = getCountryCode(row.Country);
                var noteCode = +get_map_response_note_code(row.Country);
                var note = get_map_response_note(noteCode);

                new_data.push({ country: country, value: +value, note: note });
            }
        }
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
    function getCountryPopulation(country) {
        for (let poprow of files[4]) {
            if (poprow.Country == country) {
                return poprow.Population
            }
        }
        console.log('population for ' + country + ' not found');
        return 0;
    }
    function setStats() {
        let cases2020, cases2021, cases2022, casesPc, deaths_2020, deaths_2021, deaths_2022, deathsPc, vaccinationShare, boosterShare;

        for (let row of files[0]) {
            if (innerCountry == row.Country) {
                cases = numberFormatter(+row.Cases);
                cases2020 = numberFormatter(+row.Cases_2020);
                cases2021 = numberFormatter(+row.Cases_2021);
                cases2022 = numberFormatter(+row.Cases_2022);
                casesPc = numberFormatter(+row.Cases_week);
                deaths = numberFormatter(+row.Deaths);
                deaths2020 = numberFormatter(+row.Deaths_2020);
                deaths2021 = numberFormatter(+row.Deaths_2021);
                deaths2022 = numberFormatter(+row.Deaths_2022);
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
        statDeaths2020.innerHTML = deaths2020;
        statDeaths.innerHTML = deaths;
        statDeaths2021.innerHTML = deaths2021;
        statDeaths2022.innerHTML = deaths2022;
        statDeathsPc.innerHTML = deathsPc;

        statVaccinationShare.innerHTML = vaccinationShare + "%";
        statBoosterShare.innerHTML = boosterShare + "%";
    }

    intial_map_data = get_map_data();
    initial_cases_bar_data = get_bar_data("Cases");
    initial_cases_bar_26_data = JSON.parse(JSON.stringify(initial_cases_bar_data));
    initial_cases_bar_26_data = initial_cases_bar_26_data.slice(Math.max(initial_cases_bar_26_data.length - 26, 0));
    initial_deaths_bar_data = get_bar_data("Deaths");
    initial_deaths_bar_26_data = JSON.parse(JSON.stringify(initial_deaths_bar_data));
    initial_deaths_bar_26_data = initial_deaths_bar_26_data.slice(Math.max(initial_deaths_bar_26_data.length - 26, 0));
    initial_old_excess_data = get_old_excess_data();
    initial_2020_excess_data = get_latest_excess_data(2020);
    initial_2021_excess_data = get_latest_excess_data(2021);
    initial_2022_excess_data = get_latest_excess_data(2022);
    initial_map_response_data = get_map_response_data();
    initial_hospitalization_data = get_bar_data("Hospitalizations");
    initial_hospitalization_26_data = JSON.parse(JSON.stringify(initial_hospitalization_data));
    initial_hospitalization_26_data = initial_hospitalization_26_data.slice(Math.max(initial_hospitalization_26_data.length - 26, 0));
    initial_icu_data = get_bar_data("ICU");
    initial_icu_26_data = JSON.parse(JSON.stringify(initial_icu_data));
    initial_icu_26_data = initial_icu_26_data.slice(Math.max(initial_icu_26_data.length - 26, 0));
    setStats();
    let chartXAxis = {
        categories: all_dates,
        tickInterval: 20,
        labels: {
            enabled: false
        },
        title: {
            enabled: false
        },
    };

    // Dashboard 1
    let chart = Highcharts.mapChart('covid_map', {
        chart: {
            styledMode: true,
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
            text: null
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
                var title = fCapital(this.key);
                var value = this.point.value;
                var text = "";
                if (parameter == "Cases per 1 million (7 day average)") {
                    let val = numberFormatter(value);
                    text = val + " cases per 1 million people (average of last 7 days)";
                } else if (parameter == "Deaths per 1 million (7 day average)") {
                    let val = numberFormatter(value);
                    text = val + " deaths per 1 million people (average of last 7 days)";
                } else if (parameter == "Fully vaccinated population share") {
                    let val = numberFormatter(value);
                    text = val + "% of total population has been fully vaccinated";
                }
                return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
            },
            useHTML: true
        },
        credits: {
            enabled: false
        },
        series: [{
            mapData: Highcharts.maps['custom/world'],
            data: intial_map_data,
            joinBy: ['iso-a3', 'country'], // first var: type of geographical data, second: data column name
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
    let cases_bar_all = Highcharts.chart('cases_bars_all', {
        chart: {
            type: 'column',
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
                pointPadding: 0
            },
            series: {
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
    let cases_bar_26 = Highcharts.chart('cases_bars_26', {
        chart: {
            type: 'column',
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
                enabled: false
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
                pointPadding: 0
            },
            series: {
                groupPadding: 0.1,
            }
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
    let deaths_bar_all = Highcharts.chart('deaths_bars_all', {
        chart: {
            type: 'column',
        },
        title: {
            align: 'left',
            text: 'Weekly figures - all time'
        },
        xAxis: chartXAxis,
        yAxis: {
            title: {
                enabled: false
            },
            endOnTick: false
        },
        tooltip: {
            formatter: function () {
                var title = fCapital(this.x),
                    value = numberFormatter(this.y);

                return '<b>' + title + '</b><br/>Weekly deaths: ' + value;
            },
            useHTML: true,
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                borderRadius: 3,
                pointPadding: 0
            },
            series: {
                groupPadding: 0.1,
            }
        },
        series: [{
            colorIndex: 4,
            name: 'Covid19',
            data: initial_deaths_bar_data,
        }],
        legend: {
            enabled: false
        }
    });
    let hospital_bar_all = Highcharts.chart('hospital_bars_all', {
        chart: {
            type: 'column',
        },
        title: {
            align: 'left',
            text: 'Weekly figures - all time'
        },
        xAxis: chartXAxis,
        yAxis: {
            title: {
                enabled: false
            },
            endOnTick: false
        },
        tooltip: {
            formatter: function () {
                let weeklyCountries = ["Greece", "Liechtenstein", "Russia", "Singapore", "Latvia", "Malta", "Chile", "Germany"];
                var title = fCapital(this.x),
                    value = this.point.y,
                    tot = this.point.total,
                    series = this.series.name,
                    hosp = 0,
                    icu = 0,
                    text = "";

                // no easy way to show both values on tooltip, so doing this
                if (series == "hospitalization") {
                    hosp = numberFormatter(value);
                    icu = numberFormatter(tot - value);
                } else {
                    hosp = numberFormatter(tot - value);
                    icu = numberFormatter(value);
                }

                if (weeklyCountries.includes(country)) {
                    text = "Weekly admissions ";
                } else {
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
                pointPadding: 0
            },
            series: {
                groupPadding: 0.1,
            }
        },
        series: [{
            colorIndex: 24,
            name: 'hospitalization',
            data: initial_hospitalization_data,
        }, {
            colorIndex: 27,
            name: 'icu',
            data: initial_icu_data,
        }],
        legend: {
            enabled: false
        }
    });
    let deaths_bar_26 = Highcharts.chart('deaths_bars_26', {
        chart: {
            type: 'column',
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
                enabled: false
            },
        },
        yAxis: {
            title: {
                enabled: false
            },
            endOnTick: false
        },
        tooltip: {
            formatter: function () {
                var title = fCapital(this.x),
                    value = numberFormatter(this.y);

                return '<b>' + title + '</b><br/>Weekly deaths: ' + value;
            },
            useHTML: true,
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                borderRadius: 3,
                pointPadding: 0
            },
            series: {
                groupPadding: 0.1,
            }
        },
        series: [{
            colorIndex: 4,
            id: 'Covid19',
            data: initial_deaths_bar_26_data,
        }],

        legend: {
            enabled: false
        }
    });
    let hospital_bar_26 = Highcharts.chart('hospital_bars_26', {
        chart: {
            type: 'column',
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
                enabled: false
            },
        },
        yAxis: {
            title: {
                enabled: false
            },
            endOnTick: false
        },
        tooltip: {
            formatter: function () {
                let weeklyCountries = ["Greece", "Liechtenstein", "Russia", "Singapore", "Latvia", "Malta", "Chile", "Germany"];
                var title = fCapital(this.x),
                    value = this.point.y,
                    tot = this.point.total,
                    series = this.series.name,
                    hosp = 0,
                    icu = 0,
                    text = "";

                // no easy way to show both values on tooltip, so doing this
                if (series == "hospitalization") {
                    hosp = numberFormatter(value);
                    icu = numberFormatter(tot - value);
                } else {
                    hosp = numberFormatter(tot - value);
                    icu = numberFormatter(value);
                }

                if (weeklyCountries.includes(country)) {
                    text = "Weekly admissions ";
                } else {
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
                pointPadding: 0
            },
            series: {
                groupPadding: 0.1,
            }
        },
        series: [{
            colorIndex: 24,
            name: 'hospitalization',
            data: initial_hospitalization_26_data,
        }, {
            colorIndex: 27,
            name: 'icu',
            data: initial_icu_data,
        }],

        legend: {
            enabled: false
        }
    });
    let excess_chart = Highcharts.chart('excess_deaths', {
        chart: {
            type: 'area',
        },
        title: {
            text: undefined
        },
        xAxis: {
            categories: all_weeks,
            tickInterval: 10,
            title: {
                enabled: false
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
        tooltip: {
            split: false,
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
                pointPadding: 0
            },
            series: {
                groupPadding: 0.1,
            }
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
            shared: true
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
    var map_repsonse_chart = Highcharts.mapChart('lockdown_map', {
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
            tickInterval: 1,
            max: 3,
            min: 0,
            stops: [
                [0, getIndexColor(52)],
                [0.33, getIndexColor(37)],
                [0.66, getIndexColor(16)],
                [0.95, getIndexColor(18)]
            ],
        },
        tooltip: {
            formatter: function () {
                var title = fCapital(this.key);
                var value = this.point.value;
                var note = this.point.note;
                var textArray = addLineBreaks(note, 60);
                var text = textArray[0];
                if (textArray.length > 1) {
                    for (i = 1; textArray.length > i; i++) {
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
        series: [{
            mapData: Highcharts.maps['custom/world'],
            data: initial_map_response_data,
            joinBy: ['iso-a3', 'country'], // first var: type of geographical data, second: data column name
        }]
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
    var map_filters = document.querySelector(map_container_class + " .chart-filters");

    // Create a parameter dropdown for the map
    var parameterName = "covid-map-parameter",
        parameterWidth = "340px";
    addDropdown(map_filters, parameterName, parameterWidth, parameterChange, all_parameters, parameter);

    // Update chart data on parameter change
    function parameterChange() {
        parameter = document.getElementById(parameterName + "-select").value;
        updateColorOrder();
        updateColorStops();
        chart.series[0].setData(get_map_data());
    }

    // Legends
    excess_chart_points = excess_chart.series;
    var excessLegend = createLegend(excess_chart_points, excess_chart_points, excess_container_class);

    // adjust map color stops according to parameter
    function updateColorStops() {
        if (parameter == "Cases per 1 million (7 day average)") {
            chart.colorAxis[0].update({
                tickInterval: 400,
                max: 2000,
                min: 0,
            }, false)
        } else if (parameter == "Deaths per 1 million (7 day average)") {
            chart.colorAxis[0].update({
                tickInterval: 1,
                max: 5,
                min: 0,
            }, false)
        } else if (parameter == "Fully vaccinated population share") {
            chart.colorAxis[0].update({
                tickInterval: 20,
                max: 80,
                min: 0,
            }, false)
        }
    }

    function updateColorOrder() {
        if (parameter == "Cases per 1 million (7 day average)") {
            chart.colorAxis[0].update({
                stops: [
                    [0, getIndexColor(3)],
                    [0.35, getIndexColor(23)],
                    [0.5, getIndexColor(52)],
                    [0.65, getIndexColor(9)],
                    [0.95, getIndexColor(30)]
                ],
            }, false)
        } else if (parameter == "Deaths per 1 million (7 day average)") {
            chart.colorAxis[0].update({
                stops: [
                    [0, getIndexColor(3)],
                    [0.35, getIndexColor(23)],
                    [0.5, getIndexColor(52)],
                    [0.65, getIndexColor(9)],
                    [0.95, getIndexColor(30)]
                ],
            }, false)
        } else if (parameter == "Fully vaccinated population share") {
            chart.colorAxis[0].update({
                stops: [
                    [0, getIndexColor(53)],
                    [0.01, getIndexColor(30)],
                    [0.35, getIndexColor(9)],
                    [0.5, getIndexColor(52)],
                    [0.65, getIndexColor(23)],
                    [0.95, getIndexColor(3)]
                ],
            }, false)
        }
    }

    function highlightCountry() {
        let elements = document.querySelectorAll(".covid-map .highcharts-map-series .highcharts-point");
        if (country != 'World') {
            let css = 'highcharts-name-' + country.toLowerCase().split(' ').join('-');
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
    // Dashboard 2
    // Define filters / options for response map
    var responseFilters = document.querySelector(map_response_container_class + " .chart-filters");

    // legend for response map
    $responseLegendContainer = $('.lockdown-map .secondary-legend');
    let responseLegendItems = [{ name: "No restrictions", colorIndex: 52 },
    { name: 'Some movement restrictions', colorIndex: 37 },
    { name: 'Curfew', colorIndex: 16 },
    { name: 'Lockdown', colorIndex: 18 }];

    // Append legend items
    for (let point of responseLegendItems) {
        $responseLegendContainer.append('<div class="legend-item"><div class="dot legend-color-' + point.colorIndex + '" ></div><div class="serieName" id="">' + fCapital(point.name) + '</div></div>');
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
    var sliderName = "play-slider",
        min = "0",
        max = (all_week_dates_lock.length - 1),
        value = max,
        containerWidth = 400;
    sliderWidth = 100;
    addSlider(responseFilters, sliderName, min, max, value, containerWidth, sliderWidth, sliderDateChange);

    let loopi = 0;
    let slider = document.getElementById(sliderName + "-slider");
    let shownDate = document.getElementById("play-slider-slider-output");
    shownDate.innerHTML = date_lock;
    let playing = false;

    // Update chart data on slider change
    function sliderDateChange() {
        date_lock = all_week_dates_lock[slider.value];
        loopi = slider.value;
        shownDate.innerHTML = date_lock;
        dateChange()
    }

    function dateChange() {
        map_repsonse_chart.series[0].setData(get_map_response_data());

        // to control the animation on change
        let animation = {
            duration: 300,
            easing: 'linear'
        }
        // cases_time_chart.series[0].setData(timeData[0]);
        // let new_data = timeData[0];
        // console.log(new_data);
        // cases_time_chart.series[0].setData(new_data, false, false);
        // console.log(cases_time_chart.series[0].data);
        // for (let j of new_data) {
        //     console.log(j.name + ": " + j.y);
        // }
        // for (let i of cases_time_chart.series[0].data) {
        //     console.log(i.name + ": " + i.y);
        // }
        // cases_time_chart.redraw(animation);
        // cases_time_chart.series[0].update({
        //     data: timeData[0]
        // });
        //cases_time_chart.redraw(animation);
        // deaths_time_chart.series[0].setData(timeData[1], false, false);
        // deaths_time_chart.redraw(animation);
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
        } else {
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
        let questionsText = document.getElementById("covid_dash_questions");
        let obscurityText = document.getElementById("covid_dash_obscurity");
        let navigationText = document.getElementById("covid_dash_navigation");

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