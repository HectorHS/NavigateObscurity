import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import * as HCTypes from '@/interfaces/HCTypes.ts';
import * as NOTypes from '@/interfaces/NOTypes.ts';
import * as d3Fetch from "d3-fetch";
import { getTailwindColor, getCountryCode, numberFormatter, fCapital, getTailwindHexColor, getDataLabelColor } from '@/helpers/commonFunctions.ts';
import { getLifeMapOptions, getDeathMapOptions, getDeathTreemapOptions, getDeathAgePyramidOptions, getDeathRiskOptions, getDeathTreemapOldOptions } from '@/helpers/chartOptions.js';
import Highcharts from 'highcharts';

interface DeathRiskData {
    data: HCTypes.BarData[];
    categories: string[];
}

export const useDeathStore = defineStore('deathStore', () =>{
    const lifeMapRawData = ref<any[]>([]);
    const allLifeMeasures = ref<string[]>([]);
    const allLifeYears = ref<string[]>([]);
    const allLifeLocations = ref<string[]>([]);
    const deathPercentRawData = ref<any[]>([]);
    const deathTreemapRawData = ref<any[]>([]);
    const allDeathLocations = ref<string[]>([]);
    const deathOldTreemapData = ref<any[]>([]);
    const deathRisksRawData = ref<any[]>([]);
    const deathTopCausesRawData = ref<any[]>([]);
    const causeColorMap = ref<Map<string, string> | undefined>(undefined);
    const mapColorMap = ref<Map<string, string> | undefined>(undefined);
    const parentMap = ref<Map<string, string> | undefined>(undefined);
    const maxValueMap = ref<Map<string, number> | undefined>(undefined);
    const selectedLifeMeasure = ref<string>('Life expectancy');
    const selectedLifeYear = ref<string>('2020');
    const allDeathAges = ref<string[]>([]);
    const allMainCauses = ref<string[]>([]);
    const deathPyramidCategories= ref<string[]>([
        '0 to 9', '10 to 19', '20 to 29', '30 to 39',
        '40 to 49', '50 to 59', '60 to 69', '70 to 79', '80 to 89',
        '90+'
    ]);
    const selectedDeathLocation = ref<string>('Global');
    const selectedDeathAge = ref<string>('All ages');
    const selectedDeathSex = ref<string>('Both');
    const selectedDeathCause = ref<string>('All causes');
    const selectedDeathMaxMapColor = ref<string>('#E63333');
    const sexRadioItems = ref <NOTypes.RadioItem[]>([{ title: 'Male', value: 'Male', checked: false, colors: ['gray-900'] },
        { title: 'Female', value: 'Female', checked: false, colors: ['gray-100'] },
        { title: 'Both', value: 'Both', checked: true, colors: ['gray-900', 'gray-100'] }]);

    const filteredLifeData = computed<HCTypes.MapData[]>(() => {
        let data:HCTypes.MapData[] = [];
        for (let row of lifeMapRawData.value) {
            if (row.Parameter == selectedLifeMeasure.value && row.Year == selectedLifeYear.value) {
                for (let loc of allLifeLocations.value) {
                    let val = +row[loc] == 0 ? null : +row[loc];
                    data.push({country: getCountryCode(loc), value: val})
                }
            }
        }
        return data;
    })
    const lifeMapOptions = computed<Highcharts.Options>(() => {
        let options: Highcharts.Options = getLifeMapOptions();

        options.series![0].data = filteredLifeData.value;
        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject):string {
            let title: string = fCapital(this.key!);
            let value: number = this.point.value!;
            let text = "";
            if (selectedLifeMeasure.value == "Fertility rate") {
                text = numberFormatter(value) + " births per woman";
            } else if (selectedLifeMeasure.value == "Life expectancy") {
                text = "Life expectancy at birth is " + value + " years";
            } else if (selectedLifeMeasure.value == "Median age") {
                text = "Median age of the whole population is " + numberFormatter(value) + " years old";
            } else if (selectedLifeMeasure.value == "Mortality percentage") {
                text = "Total amount of deaths this year amounts to " + numberFormatter(value) + "% of the total population";
            } else if (selectedLifeMeasure.value == "Population") {
                text = "Total population of the country is " + numberFormatter(value);
            } else if (selectedLifeMeasure.value == "Population density") {
                text = value + " people living per square kilometer";
            }
            return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
        };

        if (selectedLifeMeasure.value == "Fertility rate") {
            options.colorAxis!.max = 3;
            options.colorAxis!.min = 1;
        } else if (selectedLifeMeasure.value == "Life expectancy") {
            options.colorAxis!.max = 80;
            options.colorAxis!.min = 30;
        } else if (selectedLifeMeasure.value == "Median age") {
            options.colorAxis!.max = 45;
            options.colorAxis!.min = 15;
        } else if (selectedLifeMeasure.value == "Mortality percentage") {
            options.colorAxis!.max = 2.25;
            options.colorAxis!.min = 0.25;
        } else if (selectedLifeMeasure.value == "Population") {
            options.colorAxis!.max = 500000000;
            options.colorAxis!.min = 1000000;
        } else if (selectedLifeMeasure.value == "Population density") {
            options.colorAxis!.max = 400;
            options.colorAxis!.min = 0;
        }

        return options;
    });
    const filteredDeathMapData = computed<HCTypes.Mapseries>(() => {
        let new_data:HCTypes.MapData[] = [];
        let new_series:HCTypes.Mapseries[]  = [];
        if (selectedDeathCause.value == "All causes") {
            for (let caus of allMainCauses.value) {
                for (let row of deathTopCausesRawData.value) {
                    if (row.cause == caus && row.sex == selectedDeathSex.value && row.age == selectedDeathAge.value && row.location != "Global") {
                        new_data.push({ country: getCountryCode(row.location), value: +row.value, name: row.location})
                    }
                }
                if (new_data.length > 0 && causeColorMap.value) {
                    let slice:HCTypes.Mapseries = { data: new_data, name: caus, type: 'map', color: getTailwindColor(causeColorMap.value!.get(caus) as string), showInLegend: false }
                    new_series.push(slice);
                    new_data = [];
                }
            }
        } else {
            for (let row of deathPercentRawData.value) {
                if (row.age == selectedDeathAge.value && row.sex == selectedDeathSex.value && row.cause == selectedDeathCause.value && row.location != "Global") {
                    for (let loc of allDeathLocations.value) {
                        new_data.push({ country: getCountryCode(loc), value: +row[loc] });
                    }
                }deathPercentRawData
            }
            let series:HCTypes.Mapseries = { data: new_data, name: selectedDeathCause.value, type: 'map' }
            new_series.push(series);
        }
        if (new_series.length > 0) {
            return new_series;
        } else {
            return [{ data: [], name: 'no data', type: 'map' }];
        }
    });
    const deathMapOptions = computed<Highcharts.Options>(() => {
        let options: Highcharts.Options = getDeathMapOptions();

        options.series = filteredDeathMapData.value;
        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject):string {
            var title = fCapital(this.key!);
            var per = numberFormatter(this.point.value!);
            if (selectedDeathCause.value == "All causes") {
                return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>Top cause of death: ' + this.series!.name + '<br>Percentage of total deaths: ' + per + '%</text>';
            } else {
                return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>Percentage of total deaths: ' + per + '%</text>';
            }
        };
        options.colorAxis!.maxColor = "#E63333";
        options.plotOptions!.series!.events = {
            click: function (e:any) {
                if (selectedDeathLocation.value == e.point.name) {
                    selectedDeathLocation.value = "Global";
                    deselectDeathCountry();
                } else {
                    selectedDeathLocation.value = e.point.name;
                }
            }
        };
        options.chart = {
            events: { // for when clicking on the background
                click: function (e:any) {
                    selectedDeathLocation.value = "Global";
                    // also deselect all points
                    deselectDeathCountry();
                }
            }
        };

        if (selectedDeathCause.value == "All causes") {
            options.plotOptions!.map!.colorAxis = false;
            (options.colorAxis! as Highcharts.ColorAxisOptions).visible = false;
        } else {
            let maxMapColor = getTailwindHexColor(mapColorMap.value!.get(selectedDeathCause.value)!);
            options.plotOptions!.map!.colorAxis = 0;
            (options.colorAxis! as Highcharts.ColorAxisOptions) = {
                visible: true,
                minColor: getTailwindHexColor('gray-800'),
                maxColor: maxMapColor,
                max: maxValueMap.value!.get(selectedDeathCause.value)
            };
        }

        return options;
    });
    const fitleredDeathTreemapData = computed<HCTypes.TreemapData[]>(() => {
        let new_data: HCTypes.TreemapData[] = [];
        let slice = deathTreemapRawData.value.filter((row) => row.age == selectedDeathAge.value && row.sex == selectedDeathSex.value && row.cause != "All causes")
        for (let row of slice) {
            let cause:string = row.cause;
            let parent = parentMap.value!.get(cause);
            if (parent == undefined) {
                parent = "";
            }

            if (parent == "") {
                new_data.push({ id: cause, name: cause, value: +row[selectedDeathLocation.value], color: getTailwindHexColor(causeColorMap.value!.get(cause)!), dataLabels:{color: getDataLabelColor(causeColorMap.value!.get(cause)!)} });
            } else {
                new_data.push({ id: cause, name: cause, parent: parent, value: +row[selectedDeathLocation.value] });
            }
        }
        return new_data;
    });
    const deathTreemapOptions = computed<Highcharts.Options>(() => {
        let options: Highcharts.Options = getDeathTreemapOptions();

        options.series![0].data = fitleredDeathTreemapData.value;
        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject):string {
            let title = fCapital(this.key!);
            let deaths = numberFormatter(this.point!.value!);
            let perc = this.point!.value! / this.point!.series!.tree!.val! * 100;
            let per = numberFormatter(perc);
            return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>Total number of deaths: ' + deaths + '<br> Share of deaths: ' + per + '%</text>';
        };
        options.plotOptions!.series = {
            events: {
                click: function (e:any):boolean {
                    if ((e.point as Highcharts.SeriesClickCallbackFunction).node!.level! < 2) {
                        selectedDeathCause.value = e.point.name;
                    }
                    return true;
                },
                setRootNode: function (e: HCTypes.RootNodeEvent):void {
                    if (e.trigger == "traverseUpButton") {
                        selectedDeathCause.value = "All causes";
                    }
                }
            }
        }
        if (selectedDeathCause.value == 'All causes') {
            options.series![0].setRootNode?.("", true, {
                trigger: 'click'
            });
        }
        // (treemap_chart.series[0] as Worlddata.TreemapSeries).setRootNode?.("", true, {
        //     trigger: 'click'
        // });

        return options;
    });
    const fitleredDeatAgeMaleData = computed<HCTypes.BarData[]>(() => {
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

        let slice = deathTreemapRawData.value.filter((row) => row.sex == 'Male' && row.cause == selectedDeathCause.value);

        for (let row of slice) {
            if (row.age == "0 to 9") {
                zero = +row[selectedDeathLocation.value];
            } else if (row.age == "10 to 19") {
                ten = +row[selectedDeathLocation.value];
            } else if (row.age == "20 to 29") {
                twenty = +row[selectedDeathLocation.value];
            } else if (row.age == "30 to 39") {
                thirty = +row[selectedDeathLocation.value];
            } else if (row.age == "40 to 49") {
                forty = +row[selectedDeathLocation.value];
            } else if (row.age == "50 to 59") {
                fifty = +row[selectedDeathLocation.value];
            } else if (row.age == "60 to 69") {
                sixty = +row[selectedDeathLocation.value];
            } else if (row.age == "70 to 79") {
                seventy = +row[selectedDeathLocation.value];
            } else if (row.age == "80 to 89") {
                eighty = +row[selectedDeathLocation.value];
            } else if (row.age == "90+") {
                ninety = +row[selectedDeathLocation.value];
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
        let dataPC:number[] = [];
        for (let d of data) {
            dataPC.push(+numberFormatter(d / total * 100));
        }

        // make values negative for male
        for (let i = 0; i < dataPC.length; i++) {
            dataPC[i] = dataPC[i] * -1;
        }
        let new_data:HCTypes.BarData[] = [];
        for (let i = 0; i < dataPC.length; i++) {
            let dv:HCTypes.BarData = { y: dataPC[i], totalValue: data[i] }
            new_data.push(dv);
        }

        return new_data;
    });
    const fitleredDeatAgeFemaleData = computed<HCTypes.BarData[]>(() => {
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

        let slice = deathTreemapRawData.value.filter((row) => row.sex == 'Female' && row.cause == selectedDeathCause.value);

        for (let row of slice) {
            if (row.age == "0 to 9") {
                zero = +row[selectedDeathLocation.value];
            } else if (row.age == "10 to 19") {
                ten = +row[selectedDeathLocation.value];
            } else if (row.age == "20 to 29") {
                twenty = +row[selectedDeathLocation.value];
            } else if (row.age == "30 to 39") {
                thirty = +row[selectedDeathLocation.value];
            } else if (row.age == "40 to 49") {
                forty = +row[selectedDeathLocation.value];
            } else if (row.age == "50 to 59") {
                fifty = +row[selectedDeathLocation.value];
            } else if (row.age == "60 to 69") {
                sixty = +row[selectedDeathLocation.value];
            } else if (row.age == "70 to 79") {
                seventy = +row[selectedDeathLocation.value];
            } else if (row.age == "80 to 89") {
                eighty = +row[selectedDeathLocation.value];
            } else if (row.age == "90+") {
                ninety = +row[selectedDeathLocation.value];
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
        let dataPC:number[] = [];
        for (let d of data) {
            dataPC.push(+numberFormatter(d / total * 100));
        }
        let new_data:HCTypes.BarData[] = [];
        for (let i = 0; i < dataPC.length; i++) {
            let dv:HCTypes.BarData = { y: dataPC[i], totalValue: data[i] }
            new_data.push(dv);
        }

        return new_data;
    });
    const deathAgePyramidOptions = computed<Highcharts.Options>(() => {
        let options: Highcharts.Options = getDeathAgePyramidOptions();

        (options.xAxis as Highcharts.XAxisOptions[])[0].categories =  deathPyramidCategories.value;
        (options.xAxis as Highcharts.XAxisOptions[])[1].categories =  deathPyramidCategories.value;
        (options.xAxis as Highcharts.XAxisOptions[])[0].plotBands =  pyramidBands.value;

        options.tooltip!.formatter = function (this: Highcharts.TooltipFrmatterContextObject):string {
            return '<strong>Aged from ' + this.x + '</strong><br/>' +
            'Male, total number of deaths: ' + numberFormatter((this.points![0].point as HCTypes.BarData).totalValue!) + '<br>' +
            'Male, share of deaths: ' + Math.abs(this.points![0].y!) + '%<br>' +
            'Female, total number of deaths: ' + numberFormatter((this.points![1].point as HCTypes.BarData).totalValue!) + '<br>' +
            'Female, share of deaths: ' + Math.abs(this.points![1].y!) + '%';
        };
        (options.series![0] as Highcharts.SeriesBarOptions).data = fitleredDeatAgeMaleData.value;
        (options.series![1] as Highcharts.SeriesBarOptions).data = fitleredDeatAgeFemaleData.value;

        options.chart!.events = {
            click: function (this:Worlddata.ClickEvent) {
                if (selectedDeathAge.value == this.hoverPoint!.category) {
                    selectedDeathAge.value = 'All ages';
                } else {
                    selectedDeathAge.value = this.hoverPoint!.category!;
                }
            }
        };
        // interactivity for selecting a sex
        (options.series![0] as Highcharts.SeriesBarOptions).opacity = 1;
        (options.series![1] as Highcharts.SeriesBarOptions).opacity = 1;
        if (selectedDeathSex.value == 'Male') {
            (options.series![1] as Highcharts.SeriesBarOptions).opacity = 0.5;
        } else if (selectedDeathSex.value == 'Female') {
            (options.series![0] as Highcharts.SeriesBarOptions).opacity = 0.5;
        }

        return options;
    });
    const fitleredDeatRisksData = computed<DeathRiskData>(() => {
        let data:HCTypes.BarData[] = [];
        let cats:string[] = [];
        let slice = deathRisksRawData.value.filter((row:any) => row.cause == selectedDeathCause.value && row.age == selectedDeathAge.value && row.sex == selectedDeathSex.value);
        for (let row of slice) {
            data.push({ y: +row[selectedDeathLocation.value], color: getTailwindHexColor(causeColorMap.value!.get(row.rei)!) });
            cats.push(row.rei);
        }
        data.reverse();
        cats.reverse();
        return {data:data, categories:cats};
    });
    const deathRiskOptions = computed<Highcharts.Options>(() => {
        let options: Highcharts.Options = getDeathRiskOptions();

        (options.xAxis as Highcharts.XAxisOptions).categories =  fitleredDeatRisksData.value.categories;
        (options.series![0] as Highcharts.SeriesBarOptions).data = fitleredDeatRisksData.value.data;
        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
            return '<strong>' + this.x + '</strong> associated with <strong>' + numberFormatter(this.y as number)  + ' deaths</strong>';
        };
        // options.tooltip!.formatter = function (this: Highcharts.TooltipFrmatterContextObject):string {

        // };
        return options;
    });
    const pyramidBands = computed<any>(() => {
        let new_bands = [];
        let catAges = [...allDeathAges.value];
        catAges.pop();

        if (selectedDeathAge.value == "All ages") {
            for (let i = 0; i < (catAges.length); i++) {
                new_bands.push({ from: i - 0.5, to: i + 0.5, className: 'pyramid-band' })
            }
        } else {
            for (let i = 0; i < (catAges.length); i++) {
                if (catAges.indexOf(selectedDeathAge.value) == i) {
                    new_bands.push({ from: i - 0.5, to: i + 0.5, className: 'pyramid-band-selected' })
                } else {
                    new_bands.push({ from: i - 0.5, to: i + 0.5, className: 'pyramid-band' })
                }
            }
        }
        return new_bands;
    });
    const deathTreemapOldOptions = computed<Highcharts.Options>(() => {
        let options: Highcharts.Options = getDeathTreemapOldOptions();

        (options.series![0] as Highcharts.SeriesTreemapOptions).data = deathOldTreemapData.value;
        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
            let title = fCapital(this.key!);
            let deaths = numberFormatter(this.point!.value!);
            let perc = this.point!.value! / this.point!.series!.tree!.val! * 100;
            let per = numberFormatter(perc);
            return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>Total number of deaths: <b>' + deaths + '</b><br> Share of deaths: <b>' + per + '%</b></text>';
        };

        return options;
    });

// does this need to be an async function?
    function loadData():void {
        d3Fetch.csv("/csv/data/life-map.csv").then( (data: any[]): void => {
            lifeMapRawData.value = data;
            allLifeMeasures.value = [...new Set(data.map((d: { Parameter: string }) => d.Parameter))].sort() as string[];
            allLifeYears.value = [...new Set(data.map((d: { Year: string }) => d.Year))].sort() as string[];
            allLifeLocations.value = data.columns;
            allLifeLocations.value.splice(0,2);
        });
        d3Fetch.csv("/csv/data/death-causes-percent.csv").then( (data: any[]): void => {
            deathPercentRawData.value = data;
            allDeathLocations.value = data.columns;
            allDeathLocations.value.splice(0,3);
            allMainCauses.value = [...new Set(data.map((d:any) => d.cause))].sort() as string[];
        });
        d3Fetch.csv("/csv/data/death-causes.csv").then( (data: any[]): void => {
            deathTreemapRawData.value = data;
            allDeathAges.value = [...new Set(data.map((d:any) => d.age))].sort() as string[];
        });
        d3Fetch.csv("/csv/data/death-old.csv").then( (data: any[]): void => {
            deathOldTreemapData.value = [];
            for (let row of data) {
                deathOldTreemapData.value.push({
                    name: row.Cause, value: +row.Number, color: getTailwindHexColor(causeColorMap.value!.get(row.Cause)!)
                })
            }
        });
        d3Fetch.csv("/csv/data/death-risks.csv").then( (data: any[]): void => {
            deathRisksRawData.value = data;
        });
        d3Fetch.csv("/csv/data/death-top-causes.csv").then( (data: any[]): void => {
            deathTopCausesRawData.value = data;
        });
    }
    function initialiseMaps():void {
        let cause = new Map<string, string>();
        cause.set('Cardiovascular diseases','blue-300');
        cause.set('Cardiovascular diseases','blue-300');
        cause.set('Cardiovascular disease','blue-300');
        cause.set('Cancer','blue-500');
        cause.set('Chronic respiratory diseases','blue-900');
        cause.set('Pneumonia or influenza','blue-900');
        cause.set('Respiratory infections and tuberculosis','violet-500');
        cause.set('Tuberculosis','violet-500');
        cause.set('Neurological disorders','green-300');
        cause.set('Senility','green-300');
        cause.set('Diabetes and kidney diseases','blue-400');
        cause.set('Nephropathies','blue-400');
        cause.set('Digestive diseases','blue-100');
        cause.set('Maternal and neonatal disorders','green-100');
        cause.set('Maternal disorders','green-100');
        cause.set('Neonatal disorders','green-100');
        cause.set('Unintentional injuries','yellow-300');
        cause.set('Accidents','yellow-300');
        cause.set('Enteric infections','violet-900');
        cause.set('Gastrointestinal infections','violet-900');
        cause.set('Transport injuries','yellow-700');
        cause.set('Other non-communicable diseases','blue-100');
        cause.set('HIV/AIDS','violet-400');
        cause.set('HIV/AIDS and sexually transmitted infections','violet-400');
        cause.set('Other infectious diseases','violet-600');
        cause.set('Self-harm','orange-300');
        cause.set('Suicide','yellow-900');
        cause.set('Neglected tropical diseases and malaria','violet-200');
        cause.set('Diphtheria','violet-500');
        cause.set('Interpersonal violence','yellow-500');
        cause.set('Substance use disorders','green-900');
        cause.set('Nutritional deficiencies','green-700');
        cause.set('Conflict and terrorism','yellow-200');
        cause.set('Musculoskeletal disorders','green-400');
        cause.set('Sexually transmitted infections excluding HIV','violet-400');
        cause.set('Skin and subcutaneous diseases','blue-700');
        cause.set('Executions and police conflict','yellow-100');
        cause.set('Mental disorders','green-500');
        cause.set('Sense organ diseases','blue-500');
        cause.set('Blood pressure','red-600');
        cause.set('Cholesterol','red-600');
        cause.set('Diabetes','red-600');
        cause.set('Kidney dysfunction','red-600');
        cause.set('Bone density','red-600');
        cause.set('Air pollution','red-200');
        cause.set('Sanitation','red-200');
        cause.set('Temperature','red-200');
        cause.set('Environment','red-200');
        cause.set('Partner violence','red-200');
        cause.set('Childhood abuse','red-200');
        cause.set('Diet','red-400');
        cause.set('Obesity','red-400');
        cause.set('Smoking','red-400');
        cause.set('Malnutrition','red-400');
        cause.set('Alcohol','red-400');
        cause.set('Unsafe sex','red-400');
        cause.set('Low exercise','red-400');
        cause.set('Work-related','red-400');
        cause.set('Drug use','red-400');
        causeColorMap.value = cause;

        let map = new Map<string, string>();
        map.set('Cardiovascular diseases','blue-300');
        map.set('Cardiovascular disease','blue-300');
        map.set('Cancer','blue-300');
        map.set('Chronic respiratory diseases','blue-300');
        map.set('Pneumonia or influenza','blue-300');
        map.set('Respiratory infections and tuberculosis','violet-400');
        map.set('Tuberculosis','violet-400');
        map.set('Neurological disorders','green-100');
        map.set('Senility','green-100');
        map.set('Diabetes and kidney diseases','blue-300');
        map.set('Nephropathies','blue-300');
        map.set('Digestive diseases','blue-300');
        map.set('Maternal and neonatal disorders','green-100');
        map.set('Maternal disorders','green-100');
        map.set('Neonatal disorders','green-100');
        map.set('Unintentional injuries','yellow-300');
        map.set('Accidents','yellow-300');
        map.set('Enteric infections','violet-400');
        map.set('Gastrointestinal infections','violet-400');
        map.set('Transport injuries','yellow-300');
        map.set('Other non-communicable diseases','blue-300');
        map.set('HIV/AIDS','violet-400');
        map.set('HIV/AIDS and sexually transmitted infections','violet-400');
        map.set('Other infectious diseases','violet-400');
        map.set('Self-harm','yellow-300');
        map.set('Suicide','yellow-300');
        map.set('Neglected tropical diseases and malaria','violet-400');
        map.set('Diphtheria','violet-400');
        map.set('Interpersonal violence','yellow-300');
        map.set('Substance use disorders','green-100');
        map.set('Nutritional deficiencies','green-100');
        map.set('Conflict and terrorism','yellow-300');
        map.set('Musculoskeletal disorders','green-100');
        map.set('Sexually transmitted infections excluding HIV','violet-400');
        map.set('Skin and subcutaneous diseases','blue-300');
        map.set('Executions and police conflict','yellow-300');
        map.set('Mental disorders','green-100');
        map.set('Sense organ diseases','blue-300');
        mapColorMap.value = map;

        let parent = new Map<string, string>();
        parent.set("Tuberculosis","Respiratory infections and tuberculosis");
        parent.set("Upper respiratory infections","Respiratory infections and tuberculosis");
        parent.set("Otitis media","Respiratory infections and tuberculosis");
        parent.set(	 "Lower respiratory infections","Respiratory infections and tuberculosis");
        parent.set("Respiratory infections and tuberculosis","");
        parent.set("Diarrheal diseases","Enteric infections");
        parent.set("Typhoid and paratyphoid","Enteric infections");
        parent.set("Other intestinal infectious diseases","Enteric infections");
        parent.set("Invasive Non-typhoidal Salmonella (iNTS)","Enteric infections");
        parent.set("Enteric infections","");
        parent.set("Malaria","Neglected tropical diseases and malaria");
        parent.set("Chagas disease","Neglected tropical diseases and malaria");
        parent.set("Leishmaniasis","Neglected tropical diseases and malaria");
        parent.set("African trypanosomiasis","Neglected tropical diseases and malaria");
        parent.set("Schistosomiasis","Neglected tropical diseases and malaria");
        parent.set("Cystic echinococcosis","Neglected tropical diseases and malaria");
        parent.set("Cysticercosis","Neglected tropical diseases and malaria");
        parent.set("Lymphatic filariasis","Neglected tropical diseases and malaria");
        parent.set("Onchocerciasis","Neglected tropical diseases and malaria");
        parent.set("Trachoma","Neglected tropical diseases and malaria");
        parent.set("Dengue","Neglected tropical diseases and malaria");
        parent.set("Yellow fever","Neglected tropical diseases and malaria");
        parent.set("Rabies","Neglected tropical diseases and malaria");
        parent.set("Intestinal nematode infections","Neglected tropical diseases and malaria");
        parent.set("Leprosy","Neglected tropical diseases and malaria");
        parent.set("Food-borne trematodiases","Neglected tropical diseases and malaria");
        parent.set("Ebola","Neglected tropical diseases and malaria");
        parent.set("Zika virus","Neglected tropical diseases and malaria");
        parent.set("Other neglected tropical diseases","Neglected tropical diseases and malaria");
        parent.set("Neglected tropical diseases and malaria","");
        parent.set("Neonatal disorders","Maternal and neonatal disorders");
        parent.set("Maternal disorders","Maternal and neonatal disorders");
        parent.set("Maternal and neonatal disorders","");
        parent.set("Bladder cancer","Cancer");
        parent.set("Brain and nervous system cancer","Cancer");
        parent.set("Breast cancer","Cancer");
        parent.set("Cervical cancer","Cancer");
        parent.set("Colon and rectum cancer","Cancer");
        parent.set("Esophageal cancer","Cancer");
        parent.set("Gallbladder and biliary tract cancer","Cancer");
        parent.set("Kidney cancer","Cancer");
        parent.set("Larynx cancer","Cancer");
        parent.set("Leukemia","Cancer");
        parent.set("Lip and oral cavity cancer","Cancer");
        parent.set("Liver cancer","Cancer");
        parent.set("Malignant skin melanoma","Cancer");
        parent.set("Nasopharynx cancer","Cancer");
        parent.set("Non-melanoma skin cancer","Cancer");
        parent.set("Other pharynx cancer","Cancer");
        parent.set("Ovarian cancer","Cancer");
        parent.set("Pancreatic cancer","Cancer");
        parent.set("Prostate cancer","Cancer");
        parent.set("Stomach cancer","Cancer");
        parent.set("Testicular cancer","Cancer");
        parent.set("Thyroid cancer","Cancer");
        parent.set("Tracheal, bronchus, and lung cancer","Cancer");
        parent.set("Uterine cancer","Cancer");
        parent.set("Mesothelioma","Cancer");
        parent.set("Hodgkin lymphoma","Cancer");
        parent.set("Non-Hodgkin lymphoma","Cancer");
        parent.set("Multiple myeloma","Cancer");
        parent.set("Other malignant neoplasms","Cancer");
        parent.set("Other neoplasms","Cancer");
        parent.set("Brain and central nervous system cancer","Cancer");
        parent.set("Cancer","");
        parent.set("Ischemic heart disease","Cardiovascular diseases");
        parent.set("Rheumatic heart disease","Cardiovascular diseases");
        parent.set("Non-rheumatic valvular heart disease","Cardiovascular diseases");
        parent.set("Stroke","Cardiovascular diseases");
        parent.set("Hypertensive heart disease","Cardiovascular diseases");
        parent.set("Cardiomyopathy and myocarditis","Cardiovascular diseases");
        parent.set("Aortic aneurysm","Cardiovascular diseases");
        parent.set("Atrial fibrillation and flutter","Cardiovascular diseases");
        parent.set("Endocarditis","Cardiovascular diseases");
        parent.set("Peripheral artery disease","Cardiovascular diseases");
        parent.set("Other cardiovascular and circulatory diseases","Cardiovascular diseases");
        parent.set("Cardiovascular diseases","");
        parent.set("Alzheimer's disease and other dementias","Neurological disorders");
        parent.set("Motor neuron disease","Neurological disorders");
        parent.set("Multiple sclerosis","Neurological disorders");
        parent.set("Other neurological disorders","Neurological disorders");
        parent.set("Parkinson's disease","Neurological disorders");
        parent.set("Headache disorders","Neurological disorders");
        parent.set("Idiopathic epilepsy","Neurological disorders");
        parent.set("Neurological disorders","");
        parent.set("Anxiety disorders","Mental disorders");
        parent.set("Attention-deficit/hyperactivity disorder","Mental disorders");
        parent.set("Autism spectrum disorders","Mental disorders");
        parent.set("Bipolar disorder","Mental disorders");
        parent.set("Depressive disorders","Mental disorders");
        parent.set("Idiopathic developmental intellectual disability","Mental disorders");
        parent.set("Other mental disorders","Mental disorders");
        parent.set("Schizophrenia","Mental disorders");
        parent.set("Conduct disorder","Mental disorders");
        parent.set("Eating disorders","Mental disorders");
        parent.set("Mental disorders","");
        parent.set("Alcohol use disorders","Substance use disorders");
        parent.set("Drug use disorders","Substance use disorders");
        parent.set("Substance use disorders","");
        parent.set("Acute glomerulonephritis","Diabetes and kidney diseases");
        parent.set("Diabetes mellitus","Diabetes and kidney diseases");
        parent.set("Chronic kidney disease","Diabetes and kidney diseases");
        parent.set("Diabetes and kidney diseases","");
        parent.set("Cyclist road injuries","Transport injuries");
        parent.set("Motor vehicle road injuries","Transport injuries");
        parent.set("Motorcyclist road injuries","Transport injuries");
        parent.set("Other road injuries","Transport injuries");
        parent.set("Pedestrian road injuries","Transport injuries");
        parent.set("Other transport injuries","Transport injuries");
        parent.set("Transport injuries","");
        parent.set("Animal contact","Unintentional injuries");
        parent.set("Drowning","Unintentional injuries");
        parent.set("Environmental heat and cold exposure","Unintentional injuries");
        parent.set("Exposure to forces of nature","Unintentional injuries");
        parent.set("Exposure to mechanical forces","Unintentional injuries");
        parent.set("Falls","Unintentional injuries");
        parent.set("Fire, heat, and hot substances","Unintentional injuries");
        parent.set("Foreign body","Unintentional injuries");
        parent.set("Poisonings","Unintentional injuries");
        parent.set("Other unintentional injuries","Unintentional injuries");
        parent.set("Adverse effects of medical treatment","Unintentional injuries");
        parent.set("Unintentional injuries","");
        parent.set("Sexually transmitted infections excluding HIV","HIV/AIDS and sexually transmitted infections");
        parent.set("HIV/AIDS","HIV/AIDS and sexually transmitted infections");
        parent.set("HIV/AIDS and sexually transmitted infections","");
        parent.set("Chronic obstructive pulmonary disease","Chronic respiratory diseases");
        parent.set("Asthma","Chronic respiratory diseases");
        parent.set("Pneumoconiosis","Chronic respiratory diseases");
        parent.set("Interstitial lung disease and pulmonary sarcoidosis","Chronic respiratory diseases");
        parent.set("Other chronic respiratory diseases","Chronic respiratory diseases");
        parent.set("Chronic respiratory diseases","");
        parent.set("Acute hepatitis","Other infectious diseases");
        parent.set("Meningitis","Other infectious diseases");
        parent.set("Encephalitis","Other infectious diseases");
        parent.set("Diphtheria","Other infectious diseases");
        parent.set("Whooping cough","Other infectious diseases");
        parent.set("Tetanus","Other infectious diseases");
        parent.set("Measles","Other infectious diseases");
        parent.set("Varicella and herpes zoster","Other infectious diseases");
        parent.set("Other unspecified infectious diseases","Other infectious diseases");
        parent.set("Other infectious diseases","");
        parent.set("Appendicitis","Digestive diseases");
        parent.set("Cirrhosis and other chronic liver diseases","Digestive diseases");
        parent.set("Upper digestive system diseases","Digestive diseases");
        parent.set("Paralytic ileus and intestinal obstruction","Digestive diseases");
        parent.set("Inguinal, femoral, and abdominal hernia","Digestive diseases");
        parent.set("Inflammatory bowel disease","Digestive diseases");
        parent.set("Gallbladder and biliary diseases","Digestive diseases");
        parent.set("Vascular intestinal disorders","Digestive diseases");
        parent.set("Pancreatitis","Digestive diseases");
        parent.set("Other digestive diseases","Digestive diseases");
        parent.set("Digestive diseases","");
        parent.set("Congenital birth defects","Other non-communicable diseases");
        parent.set("Gynecological diseases","Other non-communicable diseases");
        parent.set("Urinary diseases and male infertility","Other non-communicable diseases");
        parent.set("Endocrine, metabolic, blood, and immune disorders","Other non-communicable diseases");
        parent.set("Sudden infant death syndrome","Other non-communicable diseases");
        parent.set("Hemoglobinopathies and hemolytic anemias","Other non-communicable diseases");
        parent.set("Other non-communicable diseases","");
        parent.set("Conflict and terrorism","");
        parent.set("Executions and police conflict","");
        parent.set("Interpersonal violence","");
        parent.set("Musculoskeletal disorders","");
        parent.set("Nutritional deficiencies","");
        parent.set("Skin and subcutaneous diseases","");
        parent.set("Suicide","");
        parentMap.value = parent;

        let max = new Map<string, number>();
        max.set("Cancer",30);
        max.set("Cardiovascular diseases",60);
        max.set("Chronic respiratory diseases",20);
        max.set("Conflict and terrorism",9);
        max.set("Diabetes and kidney diseases",20);
        max.set("Digestive diseases",10);
        max.set("Enteric infections",20);
        max.set("Executions and police conflict",0.5);
        max.set("HIV/AIDS and sexually transmitted infections",25);
        max.set("Interpersonal violence",5);
        max.set("Maternal and neonatal disorders",15);
        max.set("Mental disorders",0);
        max.set("Musculoskeletal disorders",0.5);
        max.set("Neglected tropical diseases and malaria",15);
        max.set("Neurological disorders",10);
        max.set("Nutritional deficiencies",5);
        max.set("Other infectious diseases",10);
        max.set("Other non-communicable diseases",10);
        max.set("Respiratory infections and tuberculosis",20);
        max.set("Skin and subcutaneous diseases",0.5);
        max.set("Substance use disorders",2.5);
        max.set("Suicide",7);
        max.set("Transport injuries",15);
        max.set("Unintentional injuries",8);
        maxValueMap.value = max;
    }
    function deselectDeathCountry():void {
        let selected = document.querySelectorAll('.death-map .highcharts-point-select');
        selected.forEach((item) => {
            item.classList.remove('highcharts-point-select');
        });
    }
// all variables and functions should be added here
  return {
    lifeMapRawData,
    allLifeMeasures,
    allLifeYears,
    deathPercentRawData,
    deathTreemapRawData,
    allDeathLocations,
    deathOldTreemapData,
    deathRisksRawData,
    deathTopCausesRawData,
    causeColorMap,
    mapColorMap,
    parentMap,
    maxValueMap,
    selectedLifeMeasure,
    selectedLifeYear,
    allLifeLocations,
    filteredLifeData,
    lifeMapOptions,
    allDeathAges,
    allMainCauses,
    deathPyramidCategories,
    selectedDeathLocation,
    selectedDeathAge,
    selectedDeathSex,
    selectedDeathCause,
    selectedDeathMaxMapColor,
    filteredDeathMapData,
    deathMapOptions,
    fitleredDeathTreemapData,
    deathTreemapOptions,
    fitleredDeatAgeMaleData,
    fitleredDeatAgeFemaleData,
    deathAgePyramidOptions,
    fitleredDeatRisksData,
    deathRiskOptions,
    pyramidBands,
    deathTreemapOldOptions,
    sexRadioItems,
    loadData,
    initialiseMaps,
    deselectDeathCountry
  }
});