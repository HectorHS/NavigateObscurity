import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import * as HCTypes from '@/interfaces/HCTypes.ts';
import * as NOTypes from '@/interfaces/NOTypes.ts';
import * as d3Fetch from "d3-fetch";
import { getTailwindColor, getCountryCode, numberFormatter, fCapital, getLinearGradient } from '@/helpers/commonFunctions.ts';
import { getMigrationMapOptions, getMigrationTreemapOptions } from '@/helpers/chartOptions.js';
import Highcharts from 'highcharts';

interface MigrationMapData extends HCTypes.MapData{
    absolute: number,
    income: string,
    year: string
}
interface MigrationWheelData extends HCTypes.SankeyData{
    measure: string
}

export const useMigrationStore = defineStore('migrationStore', () =>{
    const mapDestinationData = ref<MigrationMapData[]>([]);
    const mapOriginData = ref<MigrationMapData[]>([]);
    const mapRefugeesData = ref<MigrationMapData[]>([]);
    const selectedMapMeasure = ref<string>('Destination of migration');
    const selectedMapYear = ref<string>('2017');
    const selectedMapIncomes = ref<string[]>([]);
    const mapSliderValue = ref<string>('0');
    const allMapMeasures = ref<string[]>(["Destination of migration", "Origin of migration", "Destination of refugees"]);
    const allMapYears = ref<string[]>([]);
    const allMapIncomes = ref<string[]>([]);
    const treemapRawData = ref<any[]>([]);
    const selectedTreemapYear = ref<string>('2017');
    const selectedTreemapMeasure = ref<string>('Destination');
    const selectedTreemapCountry = ref<string>('Lebanon');
    const allTreemapYears = ref<string[]>([]);
    const allTreemapMeasures = ref<string[]>(['Destination', 'Origin']);
    const allTreemapCountries = ref<string[]>([]);
    const wheelRawData = ref<MigrationWheelData[]>([]);
    const allWheelMeasures = ref<string[]>([]);
    const selectedWheelMeasure = ref<string>('Continent');
    const allWheelRegions = ref<string[]>([]);
    const colorMap = ref<Map<string, string> | undefined>(undefined);
    const dummydata = [{"id":"Lebanon","name":"Lebanon","absolute":139459,"value":16.959625440836678},{"id":"Lebanon","name":"Lebanon","absolute":129006,"value":15.688434877781832}];

    const filteredMapData = computed<MigrationMapData[]>(() => {
        let filtered: MigrationMapData[] = [];
        if (selectedMapMeasure.value == "Destination of migration" && mapDestinationData.value.length > 0 ) {
            filtered = mapDestinationData.value.filter((r: any) => +r.value >= +mapSliderValue.value && selectedMapIncomes.value.includes(r.income) && r.year == selectedMapYear.value);
        } else if (selectedMapMeasure.value == "Origin of migration" && mapOriginData.value.length > 0){
            filtered = mapOriginData.value.filter((r: any) => +r.value >= +mapSliderValue.value && selectedMapIncomes.value.includes(r.income) && r.year == selectedMapYear.value);
        } else if (selectedMapMeasure.value == "Destination of refugees" && mapRefugeesData.value.length > 0) {
            filtered = mapRefugeesData.value.filter((r: any) => +r.value >= +mapSliderValue.value && selectedMapIncomes.value.includes(r.income) && r.year == selectedMapYear.value);
        }
        return filtered;
    });
    const mapOptions = computed<Highcharts.Options>(() => {
        let options: Highcharts.Options = getMigrationMapOptions();

        options.series![0].data = filteredMapData.value;
        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject):string {
            let title: string = fCapital(this.key!);
            let value: string = numberFormatter(this.point.value!);
            let text = "";
            let abs: string = numberFormatter((this.point as any).absolute!);
            if (selectedMapMeasure.value == "Destination of migration") {
                text = abs + " migrated into the country, <br>consisting " + value + "% of local population";
            } else if (selectedMapMeasure.value == "Origin of migration") {
                text = abs + " migrated out of the country, <br>consisting " + value + "% of local population";
            } else if (selectedMapMeasure.value == "Destination of refugees") {
                text = abs + " recognised refugees have arrived into the country, <br>consisting " + value + "% of local population";
            }
            return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
        };
        if (selectedMapMeasure.value == "Destination of migration") {
            options.colorAxis!.max = 7;
        } else if (selectedMapMeasure.value == "Origin of migration") {
            options.colorAxis!.max = 7;
        } else if (selectedMapMeasure.value == "Destination of refugees") {
            options.colorAxis!.max = 0.7;
        }

        return options;
    });
    const filteredTreemapData = computed<HCTypes.TreemapData[]>(() => {
        let new_data:HCTypes.TreemapData[] = [];
        if ( treemapRawData.value.length > 0) {
            let measureFilter = selectedTreemapMeasure.value == "Destination" ? 'country_host' : 'country_origin';
            let measureCountry = selectedTreemapMeasure.value == "Destination" ? 'country_origin' : 'country_host';
            let slice = treemapRawData.value.filter((r:any) => r[measureFilter] == selectedTreemapCountry.value);
            for (let row of slice) {
                new_data.push({name: row[measureCountry] ,value: +row[selectedTreemapYear.value]})
            }
        }
        return new_data;
    });
    const treemapOptions = computed<Highcharts.Options>(() => {
        let options = getMigrationTreemapOptions();
        options.series![0].data = filteredTreemapData.value;
        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject):string {
            let title: string = fCapital(this.key!);
            let text = "";
            if (selectedTreemapMeasure.value == "Destination") {
                text = numberFormatter(this.point.value!) + ' people have migrated to ' + selectedTreemapCountry.value;
            } else {
                text = numberFormatter(this.point.value!) + ' people have migrated from ' + selectedTreemapCountry.value;
            }
            return '<text><span style="font-size:1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
        }
        return options;
    });
    const filteredWheelData = computed<MigrationWheelData[]> (() => {
        return wheelRawData.value.filter((r:any) => r.measure == selectedWheelMeasure.value);
    });
    const wheelOptions = computed<Highcharts.Options> (() => {
        // let options = getMigrationBubblesOptions();
        let nodes = [];
        for (let region of allWheelRegions.value) {
            nodes.push({id: region, color: getTailwindColor(colorMap.value!.get(region)!)})
        }

        let options: Highcharts.Options = {
            tooltip: {
                useHTML: true,
                headerFormat: '',
                formatter: function (this: Worlddata.TooltipFormatterContextObject):string {
                    let point = this.point;
                    let text = "";
                    if ((this.point as any).formatPrefix == "node") {
                        let region = fCapital(point.name!);
                        let population = numberFormatter((point as any).sum);

                        text = "<strong>" + region + "</strong>: " + population;
                    } else {
                        let from = fCapital((point as any).from);
                        let to = fCapital((point as any).to);
                        let population = numberFormatter((point as any).weight);
                        text = from + " &#8594; " + to + ": " + population;
                    }
                    return '<text>' + text + '</text>';
                },
            },
            plotOptions: {
                dependencywheel: {
                    allowPointSelect: true,
                    curveFactor: 0.6,
                    linkOpacity: 0.2,
                    nodePadding: 0,
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                data: filteredWheelData.value,
                type: 'dependencywheel',
                name: 'Migration flow',
                dataLabels: {
                    enabled: false
                },
                size: '95%',
                nodes: nodes,
            }],
        }
        return options;
    });
    const wheelLegendItems = computed<NOTypes.LegendItem[]> (() => {
        let items:NOTypes.LegendItem[] = [];
        let regions = [...new Set(filteredWheelData.value.map((d:any) => d.from))] as string[];
        for (let r of regions ) {
            items.push({name: r, color: colorMap.value!.get(r)! })
        }
        return items;
    });
// does this need to be an async function?
    function loadData():void {
        d3Fetch.csv("/csv/migration-map.csv").then( (data: any[]): void => {
            let destination: MigrationMapData[] = [];
            let origin: MigrationMapData[] = [];
            let refugees: MigrationMapData[] = [];
            for (let row of data) {
                let country: string = getCountryCode(row.country);
                destination.push({
                    country: country, value: +row.migrants_destination_per, absolute: +row.migrants_destination,
                    income: row.income_level, year: row.year});
                origin.push({
                    country: country, value: +row.migrants_origin_per, absolute: +row.migrants_origin,
                    income: row.income_level, year: row.year
                });
                refugees.push({
                    country: country, value: +row.refugees_destination_per, absolute: +row.refugees_destination,
                    income: row.income_level, year: row.year
                });
            }

            mapDestinationData.value = destination;
            mapOriginData.value = origin;
            mapRefugeesData.value = refugees;
            allMapYears.value = [...new Set(data.map((d: { year: string }) => d.year))].sort() as string[];
            allMapIncomes.value = [...new Set(data.map((d: { income_level: string }) => d.income_level))].sort() as string[];
            // Remove empty value
            allMapIncomes.value.splice(0, 1);
            selectedMapIncomes.value = allMapIncomes.value.slice();
        });
        d3Fetch.csv("/csv/migration-treemap.csv").then( (data: any[]): void => {
            treemapRawData.value = data;
            allTreemapYears.value = data.columns;
            allTreemapYears.value.splice(0,2);
            allTreemapCountries.value = [...new Set(data.map((d:any) => d.country_origin))].sort() as string[];
        });
        d3Fetch.csv("/csv/migration-wheel.csv").then( (data: any[]): void => {
            let rawData = data;
            wheelRawData.value = [];
            for (let row of rawData) { 
                wheelRawData.value.push({ from: row.Origin, to: row.Destination, weight: +row.Population, measure: row.Parameter, color: getLinearGradient(colorMap.value!.get(row.Origin)!)});
            }
            allWheelMeasures.value = [...new Set(data.map((d:any) => d.Parameter))].sort() as string[];
            allWheelRegions.value  = [...new Set(data.map((d:any) => d.Origin))].sort() as string[];
        });
    }
    function initialiseColorMap():void {
        let map = new Map<string, string>();
        map.set('Africa','yellow-300');
        map.set("Asia",'violet-300');
        map.set("Europe",'blue-400');
        map.set("Latin America and the Caribbean",'green-400');
        map.set("Northern America",'red-400');
        map.set("Oceania",'gray-300');
        map.set("Eastern Africa",'yellow-200');
        map.set("Middle Africa",'yellow-300');
        map.set("Northern Africa",'yellow-400');
        map.set("Southern Africa",'yellow-500');
        map.set("Western Africa",'yellow-600');
        map.set("Eastern Asia",'violet-200');
        map.set("South-Eastern Asia",'violet-300');
        map.set("Southern Asia",'violet-400');
        map.set("Central Asia",'violet-500');
        map.set("Western Asia",'violet-600');
        map.set("Eastern Europe",'blue-200');
        map.set("Northern Europe",'blue-300');
        map.set("Southern Europe",'blue-400');
        map.set("Western Europe",'blue-500');
        map.set("Caribbean",'green-300');
        map.set("Central America",'green-500');
        map.set("South America",'green-700');
        colorMap.value = map;
    }
// all variables and functions should be added here
  return {
    mapDestinationData,
    mapOriginData,
    mapRefugeesData,
    selectedMapMeasure,
    selectedMapYear,
    selectedMapIncomes,
    mapSliderValue,
    allMapMeasures,
    allMapYears,
    allMapIncomes,
    treemapRawData,
    selectedTreemapYear,
    selectedTreemapMeasure,
    selectedTreemapCountry,
    allTreemapYears,
    allTreemapMeasures,
    allTreemapCountries,
    wheelRawData,
    allWheelMeasures,
    selectedWheelMeasure,
    allWheelRegions,
    filteredMapData,
    mapOptions,
    filteredTreemapData,
    treemapOptions,
    filteredWheelData,
    wheelOptions,
    wheelLegendItems,
    loadData,
    initialiseColorMap,
    dummydata
  }
});


