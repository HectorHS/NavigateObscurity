// This store should manage app-wide data like login / user information
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import * as HCTypes from '@/interfaces/HCTypes.ts';
import * as d3Fetch from "d3-fetch";
import * as NOTypes from '@/interfaces/NOTypes.ts';
import { fCapital, numberFormatter, getCountryCode, getCountryName, getTailwindHexColor, addLineBreaks, getLinearGradient } from '@/helpers/commonFunctions.ts';
import { getCovidBarOptions, getCovidExcessOptions, getCovidMapOptions } from '@/helpers/chartOptions.js';
import Highcharts from 'highcharts';

export const useCovidStore = defineStore('covidStore', () =>{
    const mapDataRaw = ref<any[]>([]);
    const excessDataRaw = ref<any[]>([]);
    const statsDataRaw = ref<any[]>([]);
    const lockdownNotesDataRaw = ref<any[]>([]);
    const selectedCountry = ref<string>("World");
    const allParameters = ref<string[]>(["Cases per 1 million (7 day average)",
        "Deaths per 1 million (7 day average)",
        "Fully vaccinated population share",
        "Movement restrictions imposed"]);
    const selectedParameter = ref<string>("Deaths per 1 million (7 day average)");
    const allWeeks = ref<string[]>([]);
    const allDates = ref<string[]>([]);
    const selectedDateIndex = ref<number>(0);
    const excessDateType = ref<string>("month");
    const hospitalDateType = ref<string>("week");
    const timer = ref<number | undefined>(undefined);
    const map_container_class = ref<string>(".covid-map");
    const colorMap = ref<Map<string, string> | undefined>(undefined);
    const animateDates = ref<boolean>(false);

    interface ExcessTotal {
        t2020: number | null,
        t2021: number| null,
        t2022: number| null,
    }
    interface Stats {
        cases: string,
        cases2020: string,
        cases2021: string,
        cases2022: string,
        deaths: string,
        deaths2020: string,
        deaths2021: string,
        deaths2022: string,
        vaccinationShare: string,
        excess: string,
        excess2020: string,
        excess2021: string,
        excess2022: string,
    }

    const oldExcessData = computed<number[]>(() => {
        let week_data: number[] = [];
        for (let row of excessDataRaw.value) {
            if (row.Country == selectedCountry.value) {
                excessDateType.value = row.Time_unit;
                if (row.Deaths_2020 > 0) {
                    week_data.push(+row.Deaths_old);
                }
            }
        }

        return week_data;
    });
    const excessData2020 = computed<number[]>(() => {
        let week_data: number[] = [];
        for (let row of excessDataRaw.value) {
            if (row.Country == selectedCountry.value) {
                excessDateType.value = row.Time_unit;
                if (row.Deaths_2020 > 0) {
                    week_data.push(+row.Deaths_2020);
                }
            }
        }

        return week_data;
    });
    const excessData2021 = computed<number[]>(() => {
        let week_data: number[] = [];
        for (let row of excessDataRaw.value) {
            if (row.Country == selectedCountry.value) {
                excessDateType.value = row.Time_unit;
                if (row.Deaths_2021 > 0) {
                    week_data.push(+row.Deaths_2021);
                }
            }
        }

        return week_data;
    });
    const excessData2022 = computed<number[]>(() => {
        let week_data: number[] = [];
        for (let row of excessDataRaw.value) {
            if (row.Country == selectedCountry.value) {
                excessDateType.value = row.Time_unit;
                if (row.Deaths_2022 > 0) {
                    week_data.push(+row.Deaths_2022);
                }
            }
        }

        return week_data;
    });
    const excessTotal = computed<ExcessTotal>(() => {
        let t2020: number | null = null;
        let t2021: number | null = null;
        let t2022: number | null = null;
        for (let row of statsDataRaw.value) {
            if (row.Country == selectedCountry.value) {
                t2020 = +row.Excess_Deaths_2020;
                t2021 = +row.Excess_Deaths_2021;
                t2022 = +row.Excess_Deaths_2022;
                break;
            }
        }

        return {t2020: t2020, t2021: t2021, t2022: t2022};
    });
    const filteredMapData = computed<Highcharts.SeriesMapOptions[]>(() => {
        let data: Highcharts.SeriesMapOptions[] = [];

        if (selectedParameter.value == "Movement restrictions imposed") {
            let lock_data:HCTypes.MapData[] = [];
            let cur_data:HCTypes.MapData[] = [];
            let some_data:HCTypes.MapData[] = [];
            let test_data:HCTypes.MapData[] = [];
            let no_data:HCTypes.MapData[] = [];
            let empty_data:HCTypes.MapData[] = [];
            for (let row of mapDataRaw.value) {
                if (row.Country != "World" && row.variable == "restrictions") {

                    let note = row[selectedDate.value];
                    let country = getCountryCode(row.Country);

                    if (note > 20000) {
                        lock_data.push({ country: country, name: row.Country, value: 5, note: note });
                    } else if (note > 10000) {
                        cur_data.push({ country: country, name: row.Country, value: 4, note: note });
                    } else if (note > 100) {
                        some_data.push({ country: country, name: row.Country, value: 3, note: note });
                    } else if (note > 50) {
                        test_data.push({ country: country, name: row.Country, value: 2, note: note });
                    } else if (note > 9) {
                        no_data.push({ country: country, name: row.Country, value: 1, note: note });
                    } else {
                        empty_data.push({ country: country, name: row.Country, value: 0, note: note });
                    }
                }
            }

            let emptySlice:Highcharts.SeriesMapOptions = { data: empty_data, name: 'No data', type: 'map', color: getTailwindHexColor('gray-900')};
            let noSlice: Highcharts.SeriesMapOptions = { data: no_data, name: 'No restrictions', type: 'map', color: getTailwindHexColor('gray-200') };
            let testSlice: Highcharts.SeriesMapOptions = { data: test_data, name: 'Test/vaccination based restrictions', type: 'map', color: getTailwindHexColor('purple-200') };
            let someSlice: Highcharts.SeriesMapOptions = { data: some_data, name: 'Non general restrictions', type: 'map', color: getTailwindHexColor('purple-500') };
            let curSlice: Highcharts.SeriesMapOptions = { data: cur_data, name: 'General curfew', type: 'map', color: getTailwindHexColor('violet-300') };
            let lockSlice: Highcharts.SeriesMapOptions = { data: lock_data, name: 'General lockdown', type: 'map', color: getTailwindHexColor('violet-600') };
            data.push(emptySlice);
            data.push(noSlice);
            data.push(testSlice);
            data.push(someSlice);
            data.push(curSlice);
            data.push(lockSlice);
        } else {
            let map_data:HCTypes.MapData[] = [];
            let param:string = "";
            if (selectedParameter.value == "Cases per 1 million (7 day average)"){
                param = "cases_pm";
            } else if (selectedParameter.value == "Deaths per 1 million (7 day average)") {
                param = "deaths_pm";
            } else if (selectedParameter.value == "Fully vaccinated population share") {
                param = "vaccinations";
            }
            for (let row of mapDataRaw.value) {
                if (row.Country != "World" && row.variable == param) {
                    let val = row[selectedDate.value];
                    map_data.push({ country: getCountryCode(row.Country), value: +val, name: row.Country });
                }
            }
            let new_slice:Highcharts.SeriesMapOptions  = { data: map_data, name: selectedParameter.value, type: 'map' };
            data.push(new_slice);
            }
        return data;
    });

    const casesOptions = computed<Highcharts.Options>(() => {
        let casesData: number[] = getBarData('cases');
        let testRatioData: number[] = getBarData('tests_pc');

        let options = getCovidBarOptions();
        (options.xAxis as Highcharts.XAxisOptions).categories = allDates.value;
        (options.yAxis as Highcharts.YAxisOptions[])[0].title = { text: "Sum of cases" };
        (options.yAxis as Highcharts.YAxisOptions[])[1].title = { text: "Tests per case" };

        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
            let title = getCountryName(selectedCountry.value);
            let date = this.x as string;
            let cases = numberFormatter(this.points![0].y!);
            let casesText = 'Sum of cases:<b> ' + cases + '</b>';
            let ratio: number = 0;
            if (this.points!.length > 1) {
                ratio = this.points![1].y!;
            }

            let ratioText = "";
            if (ratio > 0) {
                ratioText = '<b>' + numberFormatter(ratio) + "</b> tests for each case"
            } else {
                ratioText = "No test data available";
            }

            return '<span style="font-size: 1.1em"><b>' + title +
                '</b><br></span>For week ending on: <b>' + date + '</b><br>' + casesText +
                '<br/>' + ratioText;
        }

        options.series =
            [{
                name: "COVID-19 cases",
                type: 'column',
                data: casesData,
                yAxis: 0
            }, {
                name: "Positive test ratio",
                type: 'spline',
                data: testRatioData,
                yAxis: 1,
                label: {
                    enabled: true,
                }
            }];

            if (colorMap.value) {
                (options.yAxis as Highcharts.YAxisOptions[])[0].title!.style = { color: getTailwindHexColor(colorMap.value.get('cases')!) };
                (options.yAxis as Highcharts.YAxisOptions[])[0].labels = { style: { color: getTailwindHexColor(colorMap.value.get('cases')!) } };
                (options.yAxis as Highcharts.YAxisOptions[])[1].title!.style = { color: getTailwindHexColor(colorMap.value.get('tests_pc')!) };
                (options.yAxis as Highcharts.YAxisOptions[])[1].labels = { style: { color: getTailwindHexColor(colorMap.value.get('tests_pc')!) } };
                (options.series as Highcharts.SeriesAdOptions[])[0].color = getLinearGradient(colorMap.value.get('cases')!);
                (options.series as Highcharts.SeriesAdOptions[])[1].color = getTailwindHexColor(colorMap.value.get('tests_pc')!);
            }

            return options;
    });
    const deathsOptions = computed<Highcharts.Options>(() => {
        let deathsData: number[] = getBarData('deaths');

        let options = getCovidBarOptions();
        (options.xAxis as Highcharts.XAxisOptions).categories = allDates.value;
        (options.yAxis as Highcharts.YAxisOptions[])[0].title = { text: "Weekly sum" };

        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
            let title = getCountryName(selectedCountry.value);
            let date = this.x as string;
            let value = numberFormatter(this.y!);

            return '<span style="font-size: 1.1em"><b>' + title +
                '</b><br></span>For week ending on: <b>' + date + '</b><br>Sum of deaths:<b> ' + value + '</b>';
        }

        options.series = [{
            name: 'Covid19',
            type: 'column',
            data: deathsData,
        }];

        if (colorMap.value) {
            (options.series as Highcharts.SeriesAdOptions[])[0].color = getLinearGradient(colorMap.value.get('deaths')!);
        }

        return options;
    });
    const hospitalsOptions = computed<Highcharts.Options>(() => {
        let hospitalData: number[] = getBarData('Hospital');
        let icuData: number[] = getBarData('ICU');

        let options = getCovidBarOptions();
        (options.xAxis as Highcharts.XAxisOptions).categories = allDates.value;
        if (hospitalDateType.value == "week") {
            (options.yAxis as Highcharts.YAxisOptions[])[0].title = { text: "Sum of admissions" };
        } else if (hospitalDateType.value == "day"){
            (options.yAxis as Highcharts.YAxisOptions[])[0].title = { text: "Daily occupancy" };
        }

        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
            let title = getCountryName(selectedCountry.value);
            let date: string = this.x as string;
            let hosp: string = "N/A";
            let icu: string = "N/A";
            let hospText = '';
            let icuText = '';

            // check if we have them both
            if (this.points!.length > 1) {
                hosp = numberFormatter(this.points![0].y!);
                icu = numberFormatter(this.points![1].y!);
            } else {
                // we only have one
                if (selectedCountry.value == "Poland") {
                    hosp = numberFormatter(this.points![0].y!);
                } else {
                    icu = numberFormatter(this.points![0].y!);
                }
            }

            if (hospitalDateType.value == "week") {
                hospText = "New hospital admissions: <b>";
                icuText = "New ICU admissions: <b>";
            } else if (hospitalDateType.value == "day") {
                hospText = "Average daily hospital occupancy: <b>";
                icuText = "Average daily ICU occupancy: <b>";
            }

            return '<span style="font-size: 1.1em"><b>' + title +
                '</b><br></span>For week ending on: <b>' + date + '</b><br/>' + hospText + hosp +
                '</b><br/>' + icuText + icu + '</b>';
        }

        options.series =
            [{
                type: 'column',
                name: 'hospitalization',
                data: hospitalData,
            }, {
                type: 'column',
                name: 'icu',
                data: icuData,
                }];

        if (colorMap.value) {
            (options.series as Highcharts.SeriesAdOptions[])[0].color = getLinearGradient(colorMap.value.get('Hospital')!);
            (options.series as Highcharts.SeriesAdOptions[])[1].color = getLinearGradient(colorMap.value.get('ICU')!);
        }

        return options;
    });
    const vaccinesOptions = computed<Highcharts.Options>(() => {
        let vaccinationsData: number[] = getBarData('vaccinations');
        let testData1: number[] = getBarData('tests_people');
        let testData2: number[] = getBarData('tests_samples');
        let testData3: number[] = getBarData('tests_tests');
        let testData4: number[] = getBarData('tests_unclear');

        let options = getCovidBarOptions();
        (options.xAxis as Highcharts.XAxisOptions).categories = allDates.value;
        (options.yAxis as Highcharts.YAxisOptions[])[0].title = { text: "Sum of tests" };
        (options.yAxis as Highcharts.YAxisOptions[])[1].title = { text: "Population share" };
        (options.yAxis as Highcharts.YAxisOptions[])[1].labels = { format: '{text}%' };
        (options.yAxis as Highcharts.YAxisOptions[])[1].endOnTick = true;
        (options.yAxis as Highcharts.YAxisOptions[])[1].max = 100;

        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
            let title = getCountryName(selectedCountry.value);
            let date = this.x as string;
            let vacc = numberFormatter(this.points![0].y!);
            let vaccText = "<b>" + vacc + "%</b> of the population had been vaccinated<br/>";
            let testText = "";
            if (title == "World") {
                let test1 = this.points![1].y!;
                let test2 = this.points![2].y!;
                let test3 = this.points![3].y!;
                let test4 = this.points![4].y!;
                let testTotal = test1 + test2 + test3 + test4;
                if (testTotal > 0) {
                    testText = "A total of <b>" + numberFormatter(testTotal) + "</b> mixed unit tests were carried out <br/>(" +
                        numberFormatter(test1) + " people + " + numberFormatter(test2) + " samples +<br/>" +
                        numberFormatter(test3) + " tests + " + numberFormatter(test4) + " unknown units)";
                } else {
                    testText = "No test data available";
                }

            } else {
                // we only have one, check series name to see which one
                let val = this.points![1].y!;
                if (val > 0) {
                    let type = (this.points![1].series! as Highcharts.Series).name;
                    if (type == "tests_people") {
                        testText = "<b>" + numberFormatter(val) + "</b> people were tested";
                    } else if (type == "tests_samples") {
                        testText = "<b>" + numberFormatter(val) + "</b> samples were tested";
                    } else if (type == "tests_tests") {
                        testText = "<b>" + numberFormatter(val) + "</b> tests were carried out";
                    } else if (type == "tests_unclear") {
                        testText = "<b>" + numberFormatter(val) + "</b> tests were carried out (unclear units)";
                    }
                } else {
                    testText = "No test data available";
                }
            }

            return '<span style="font-size: 1.1em"><b>' + title + '</b><br></span>For week ending on <b>' + date +
                '</b><br/>' + vaccText + testText;
        }

        options.series =
            [{
                name: 'Vaccinations',
                type: 'spline',
                data: vaccinationsData,
                yAxis: 1,
                zIndex: 1
            },{
                name: "tests_people",
                type: 'column',
                data: testData1,
                label: {
                    enabled: false,
                    format: ''
                }
                },{
                    name: "tests_samples",
                    type: 'column',
                    data: testData2,
                    label: {
                        enabled: false,
                        format: ''
                    }
                },{
                    name: "tests_tests",
                    type: 'column',
                    data: testData3,
                    label: {
                        enabled: false,
                        format: ''
                    }
                },{
                    name: "tests_unclear",
                    type: 'column',
                    data: testData4,
                    label: {
                        enabled: false,
                        format: ''
                    }
                }];

        if (colorMap.value) {
            (options.yAxis as Highcharts.YAxisOptions[])[1].title!.style = { color: getTailwindHexColor(colorMap.value.get('vaccinations')!) };
            (options.yAxis as Highcharts.YAxisOptions[])[1].labels = { style: { color: getTailwindHexColor(colorMap.value.get('vaccinations')!) } };
            (options.yAxis as Highcharts.YAxisOptions[])[0].title!.style = { color: getTailwindHexColor(colorMap.value.get('tests_people')!) };
            (options.yAxis as Highcharts.YAxisOptions[])[0].labels = { style: { color: getTailwindHexColor(colorMap.value.get('tests_people')!) } };
            (options.series as Highcharts.SeriesAdOptions[])[0].color = getTailwindHexColor(colorMap.value.get('vaccinations')!);
            (options.series as Highcharts.SeriesAdOptions[])[1].color = getLinearGradient(colorMap.value.get('tests_people')!);
            (options.series as Highcharts.SeriesAdOptions[])[2].color = getLinearGradient(colorMap.value.get('tests_people')!);
            (options.series as Highcharts.SeriesAdOptions[])[3].color = getLinearGradient(colorMap.value.get('tests_people')!);
            (options.series as Highcharts.SeriesAdOptions[])[4].color = getLinearGradient(colorMap.value.get('tests_people')!);
        }

        return options;
    });
    const excessOptions = computed<Highcharts.Options>(() => {
        let options = getCovidExcessOptions();
        (options.xAxis as Highcharts.XAxisOptions).categories = allWeeks.value;

        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
            let twentyone = "N/A";
            let twentytwo = "N/A";
            let title: string = "";
            if (excessDateType.value == "week") {
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

            let old: string = numberFormatter(this.points![0].y!);
            let twenty = numberFormatter(this.points![1].y!);
            if (this.points!.length > 2) {
                twentyone = numberFormatter(this.points![2].y!);
            }
            if (this.points!.length > 3) {
                twentytwo = numberFormatter(this.points![3].y!);
            }
            let text = "";
            if (excessDateType.value == "month") {
                text = "Monthly";
            } else {
                text = "Weekly";
            }
            return '<b>' + title + '</b><br/>Weekly death toll (average of 2015-9): <b>' + old +
                '</b><br/>' + text + ' death toll (2020): <b>' + twenty +
                '</b><br/>' + text + ' death toll (2021): <b>' + twentyone +
                '</b><br/>' + text + ' death toll (2022): <b>' + twentytwo + '</b>';
        }
        let format2020:string = '';
        let format2021:string = '';
        let format2022:string = '';
        let enabled2020:boolean = false;
        let enabled2021:boolean = false;
        let enabled2022:boolean = false;
        if (excessTotal.value.t2020) {
            format2020 = excessTotal.value.t2020  >= 0 ? "+ " + numberFormatter(excessTotal.value.t2020) : numberFormatter(excessTotal.value.t2020);
            enabled2020 = true;
        }
        if (excessTotal.value.t2021) {
            format2021 = excessTotal.value.t2021  >= 0 ? "+ " + numberFormatter(excessTotal.value.t2021) : numberFormatter(excessTotal.value.t2021);
            enabled2021 = true;
        }
        if (excessTotal.value.t2022) {
            format2022 = excessTotal.value.t2022  >= 0 ? "+ " + numberFormatter(excessTotal.value.t2022) : numberFormatter(excessTotal.value.t2022);
            enabled2022 = true;
        }
        let oldName = selectedCountry.value == "World" ? "Expected deaths" : "2015-9 average";
        let name20 = selectedCountry.value == "World" ? "2020 (estimated)" : "2020";
        let name21 = selectedCountry.value == "World" ? "2021 (estimated)" : "2021";
        let name22 = selectedCountry.value == "World" ? "2022 (estimated)" : "2022";

        options.series = [{
            id: "old",
            name: oldName,
            type: 'column',
            data: oldExcessData.value,

        },
        {
            id: "2020",
            name: name20,
            type: 'spline',
            data: excessData2020.value,
            label: {
                enabled: enabled2020,
                format: format2020
            }
        },

        {
            id: "2021",
            name: name21,
            type: 'spline',
            data: excessData2021.value,
            label: {
                enabled: enabled2021,
                format: format2021
            }
        },
        {
            id: "2022",
            name: name22,
            type: 'spline',
            data: excessData2022.value,
            label: {
                enabled: enabled2022,
                format: format2022
            }
        },
        ];

        if (colorMap.value) {
            (options.series as Highcharts.SeriesAdOptions[])[0].color = getLinearGradient(colorMap.value!.get('excess_old')!);
            (options.series as Highcharts.SeriesAdOptions[])[1].color = getTailwindHexColor(colorMap.value!.get('excess_2020')!);
            (options.series as Highcharts.SeriesAdOptions[])[2].color = getTailwindHexColor(colorMap.value.get('excess_2021')!);
            (options.series as Highcharts.SeriesAdOptions[])[3].color = getTailwindHexColor(colorMap.value.get('excess_2022')!);
        }

        return options;
    });
    const mapOptions = computed<Highcharts.Options>(() => {
        let options = getCovidMapOptions();
        options.chart = {
            events: { // for when clicking on the background
                click: function (e:any) {
                    deselectCountry();
                }
            }
        };
        options.plotOptions!.series!.events = {
            click: function (e:any) {
                if (selectedCountry.value == e.point.name) {
                    deselectCountry();
                } else {
                    selectedCountry.value = e.point.name;
                }
            }
        };

        if (selectedParameter.value == "Movement restrictions imposed") {
            options.plotOptions!.map!.colorAxis = false;
        } else {
            options.plotOptions!.map!.colorAxis = 0;
        }

        let colorAxis: Highcharts.ColorAxisOptions = {
            startOnTick: false,
            endOnTick: false,
        };
        let legend: Highcharts.LegendOptions = {
            enabled: true,
            symbolRadius: 0,
            symbolHeight: 15,
            symbolWidth: 300
        }
        // To better centre and distribute colors. Max is always double the average value.
        if (selectedParameter.value == "Cases per 1 million (7 day average)") {
                colorAxis.tickInterval = 1000;
                colorAxis.max = 2000;
                colorAxis.min = 0;
                colorAxis.showInLegend = true;
                colorAxis.stops = [
                    [0, getTailwindHexColor('blue-500')],
                    [0.1, getTailwindHexColor('cyan-300')],
                    [0.3, getTailwindHexColor('yellow-300')],
                    [0.95, getTailwindHexColor('orange-500')]
                ];
        } else if (selectedParameter.value == "Deaths per 1 million (7 day average)") {
            colorAxis.tickInterval = 1;
            colorAxis.max = 5;
            colorAxis.min = 0;
            colorAxis.showInLegend = true;
            colorAxis.stops = [
                [0, getTailwindHexColor('blue-500')],
                [0.1, getTailwindHexColor('cyan-300')],
                [0.3, getTailwindHexColor('yellow-300')],
                [0.95, getTailwindHexColor('orange-500')]
            ];
        } else if (selectedParameter.value == "Fully vaccinated population share") {
            colorAxis.tickInterval = 20;
            colorAxis.max = 80;
            colorAxis.min = 0;
            colorAxis.showInLegend = true;
            colorAxis.stops = [
                [0, getTailwindHexColor('orange-500')],
                [0.1, getTailwindHexColor('yellow-300')],
                [0.3, getTailwindHexColor('cyan-300')],
                [0.95, getTailwindHexColor('blue-500')]
            ];
        } else if (selectedParameter.value == "Movement restrictions imposed"){
            colorAxis = {showInLegend: false};
            legend = {
                enabled: true,
                symbolRadius: 20,
                symbolHeight: 20,
                symbolWidth: 20
            }
        }
        options.colorAxis = colorAxis;
        options.legend = legend;

        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
            let title:string = fCapital(this.key as string);
            if (selectedParameter.value == "Movement restrictions imposed") {
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
                if (selectedParameter.value == "Cases per 1 million (7 day average)"){
                    text = "<b>" + value + "</b> daily cases per 1 million people <br>(7 day average for week ending on " + selectedDate.value + ")";
                } else if (selectedParameter.value == "Deaths per 1 million (7 day average)") {
                    text = "<b>" + value + "</b> daily deaths per 1 million people <br>(7 day average for week ending on " + selectedDate.value + ")";
                } else if (selectedParameter.value == "Fully vaccinated population share") {
                    text = "<b>" + value + "%</b> of total population was fully vaccinated by " + selectedDate.value;
                }
                return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
            }
        }

        options.series = filteredMapData.value;

        return options;
    })
    const stats = computed<Stats | undefined>(() => {
        for (let row of statsDataRaw.value) {
            if (selectedCountry.value == row.Country) {
                 return {
                    cases: numberFormatter(+row.Cases_total),
                    cases2020: numberFormatter(+row.Cases_2020),
                    cases2021: numberFormatter(+row.Cases_2021),
                    cases2022: numberFormatter(+row.Cases_2022),
                    deaths: numberFormatter(+row.Deaths_total),
                    deaths2020: numberFormatter(+row.Deaths_2020),
                    deaths2021: numberFormatter(+row.Deaths_2021),
                    deaths2022: numberFormatter(+row.Deaths_2022),
                    vaccinationShare: numberFormatter(+row.Vaccinations) + '%',
                    excess: numberFormatter(+row.Excess_Deaths_total),
                    excess2020: numberFormatter(+row.Excess_Deaths_2020),
                    excess2021: numberFormatter(+row.Excess_Deaths_2021),
                    excess2022: numberFormatter(+row.Excess_Deaths_2022)
                }
            }
        }
        return undefined;
    });
    const selectedDate = computed<String>(() =>{
        return allDates.value.length > 0 ? allDates.value[selectedDateIndex.value] : '';
    })

    function get_map_restriction_note(code:number):string {
        for (let row of lockdownNotesDataRaw.value) {
            if (row.Code == code) {
                return row.Note;
            }
        }
        console.log("No note found for code " + code);
        return "N/A";
    }
    function getBarData(measure: string):number[] {
        let data:number[] = [];
        let newMeasure = measure;
        const dailyCountries:string[] = ["Algeria",
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
        const weeklyCountries:string[] = ["Chile",
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

        if (dailyCountries.includes(selectedCountry.value)) {
            hospitalDateType.value = "day";
            if (measure == "Hospital") {
                newMeasure = "Daily hospital occupancy";
            } else if (measure == "ICU") {
                newMeasure = "Daily ICU occupancy";
            }
        } else if (weeklyCountries.includes(selectedCountry.value)) {
            hospitalDateType.value = "week";
            if (measure == "Hospital") {
                newMeasure = "Weekly new hospital admissions";
            } else if (measure == "ICU") {
                newMeasure = "Weekly new ICU admissions";
            }
        }

        for (let row of mapDataRaw.value) {
            if (row.variable == newMeasure && row.Country == selectedCountry.value) {
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

    function deselectCountry():void {
        selectedCountry.value = "World";
        let selected = document.querySelectorAll('.covid-map .highcharts-point-select');
        selected.forEach((item) => {
            item.classList.remove('highcharts-point-select');
        });
    }
    function dateAnimationHandler():void {
        if (animateDates.value) {
            deselectCountry();
            playDateAnimation();
        } else {
            clearInterval(timer.value);
        }
    }
    function playDateAnimation():void {
        if (selectedDateIndex.value == allDates.value.length - 1) {
            selectedDateIndex.value = 0;
        }
        timer.value = setInterval(function () {
            if (selectedDateIndex.value < allDates.value.length - 1) {
                selectedDateIndex.value++;
            } else {
                clearInterval(timer.value);
                animateDates.value = false;
            }
        }, 150);
    }
    function resetCountry():void {
        selectedCountry.value = 'World';
    }
    function loadData():void {
        d3Fetch.csv("/csv/covid-map.csv").then( (data: any): void => {
            mapDataRaw.value = data;
            let date_cols = data.columns as string[];
            date_cols.splice(0, 2);
            allDates.value = date_cols;
            selectedDateIndex.value = allDates.value.length - 1;
        });
        d3Fetch.csv("/csv/covid-stats.csv").then( (data: any): void => {
            statsDataRaw.value = data;
        });
        d3Fetch.csv("/csv/covid-excess-deaths.csv").then((data: any[]): void => {
            excessDataRaw.value = data;
            allWeeks.value = [...new Set(data.map((d: any) => d.Week))] as string[];
        });
        d3Fetch.csv("/csv/covid-lockdown-notes.csv").then((data: any[]): void => {
            lockdownNotesDataRaw.value = data;
        });
    }
    function initialiseMaps(): void {
        let color = new Map<string, string>();
        color.set('cases', 'blue-300');
        color.set('tests_pc', 'purple-100');
        color.set('deaths', 'orange-300');
        color.set('Hospital', 'gray-100');
        color.set('ICU', 'violet-600');
        color.set('vaccinations', 'violet-100');
        color.set('tests_people', 'green-400');
        color.set('excess_old', 'gray-400');
        color.set('excess_2020', 'orange-500');
        color.set('excess_2021', 'orange-300');
        color.set('excess_2022', 'yellow-300');
        colorMap.value = color;
    }

    watch(animateDates, dateAnimationHandler)

// all variables and functions should be added here
    return {
        mapDataRaw,
        excessDataRaw,
        lockdownNotesDataRaw,
        selectedCountry,
        allParameters,
        selectedParameter,
        allWeeks,
        allDates,
        selectedDate,
        selectedDateIndex,
        excessDateType,
        hospitalDateType,
        timer,
        map_container_class,
        colorMap,
        casesOptions,
        deathsOptions,
        hospitalsOptions,
        vaccinesOptions,
        oldExcessData,
        excessOptions,
        excessData2020,
        excessData2021,
        excessData2022,
        excessTotal,
        mapOptions,
        stats,
        animateDates,
        getBarData,
        deselectCountry,
        resetCountry,
        dateAnimationHandler,
        playDateAnimation,
        loadData,
        initialiseMaps
  }
});


