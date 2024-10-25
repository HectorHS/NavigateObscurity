import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import * as HCTypes from '@/interfaces/HCTypes.ts';
import * as d3Fetch from "d3-fetch";
import { getTailwindColor, getCountryCode, numberFormatter, fCapital, getLinearGradient, getTailwindHexColor } from '@/helpers/commonFunctions.ts';
import { getSustainabilityMapOptions, getSustainabilityAreaOptions } from '@/helpers/chartOptions.js';
import Highcharts from 'highcharts';


interface SustainMapData extends HCTypes.MapData{
    measure: boolean;
    area: string;
    income: string;
}

export const useSustainabilityStore = defineStore('sustainabilityStore', () =>{
    const mapDataRaw = ref<SustainMapData[]>([]);
    const areaDataRaw = ref<any[]>([]);
    const selectedMapIncome = ref<string>('All');
    const selectedMapMeasure = ref<string>('Ecological deficit or reserve');
    const selectedMapArea = ref<string>('Total');
    const selectedAreaMeasure = ref<string>('Footprint of Consumption');
    const selectedAreaCountry = ref<string>('World');
    const allYears = ref<string[]>([]);
    const allCountries = ref<string[]>([]);
    const allAreaMeasures = ref<string[]>(['Built up land', 'Crop land', 'Grazing land','Forest land','Fishing grounds']); // hardcoding this to control order
    const allMapMeasures = ref<string[]>([]);
    const allAreas = ref<string[]>([]);
    const allIncomes = ref<string[]>([]);

    const colorMap = ref<Map<string, string> | undefined>(undefined);
    const getBiocapacityAverage = ref<Map<string, string> | undefined>(undefined);
    const getReserveAverage = ref<Map<string, string> | undefined>(undefined);
    const getConsumptionAverage = ref<Map<string, string> | undefined>(undefined);

    const filteredMapData = computed<SustainMapData[]>(() => {
        let filtered:SustainMapData[] = [];
        if (mapDataRaw.value.length > 0 && selectedMapIncome.value == "All") {
            filtered = mapDataRaw.value.filter((r:any) => r.measure == selectedMapMeasure.value && r.area == selectedMapArea.value);
        } else if (mapDataRaw.value.length > 0) {
            filtered = mapDataRaw.value.filter((r:any) => r.measure == selectedMapMeasure.value && r.area == selectedMapArea.value && r.income == selectedMapIncome.value);
        }

        return filtered;
    });
    const filteredAreaData = computed<HCTypes.AreaSeries[]>(() => {
        let filtered:any[] = [];
        let new_data:HCTypes.AreaSeries[] = [];
        if (areaDataRaw.value.length > 0 && colorMap.value) {
            filtered = areaDataRaw.value.filter((r:any) => r.record == selectedAreaMeasure.value && r.country == selectedAreaCountry.value)
            for (let measure of allAreaMeasures.value) {
                let year_data:any[] = [];
                let slice = filtered.filter((r:any) => r.area == measure);
                for (let ye in allYears.value) {
                    year_data[ye] = {y:+slice[0][allYears.value[ye]], name:allYears.value[ye]};
                }
                new_data.push({ type: 'area', id: measure, name: measure, legendSymbol:'rectangle', data: year_data, color: getLinearGradient(colorMap.value!.get(measure)!) })
            }
        }
        return new_data;
    });
    const mapOptions = computed<Highcharts.Options>(() => {
        let options:Highcharts.Options = getSustainabilityMapOptions();

        options.series![0].data = filteredMapData.value;
        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject):string {
            let title:string = fCapital(this.key!);
            let val:number = this.point.value!;
            let value:string = numberFormatter(val);
            let text = "";
            if (selectedMapMeasure.value == "Biocapacity") {
                text = value + " gha per person <br>With a global average of " + getBiocapacityAverage.value!.get(selectedMapArea.value);
            } else if (selectedMapMeasure.value == "Ecological deficit or reserve") {
                if (val > 0) {
                    text = value + " gha per person reserve (more biocapacity than consumption) <br>With a global average of " + getReserveAverage.value!.get(selectedMapArea.value);
                } else {
                    text = value + " gha per person deficit (more consumption than biocapacity) <br>With a global average of " + getReserveAverage.value!.get(selectedMapArea.value);
                }
            } else if (selectedMapMeasure.value == "Ecological footprint of consumption") {
                text = value + " gha per person <br>With a global average of " + getConsumptionAverage.value!.get(selectedMapArea.value);
            }
            return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
        };
        options.colorAxis = mapColorAxis.value;
        // options.series![0].data = testData;
        return options;   
    });
    const areaOptions = computed<Highcharts.Options>(() => {
        let options:Highcharts.Options = getSustainabilityAreaOptions();

        options.series = filteredAreaData.value;
        options.xAxis!.max = allYears.value.length -1;
        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject):string {
            var title = fCapital(this.key!);
            var value = numberFormatter(this.y!);
            var area = fCapital(this.series!.name!);

            return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + area + ": " + value + ' gha</text>';
        };
        return options;
    
    });
    const mapColorAxis = computed<Highcharts.ColorAxisOptions>(() => {
        let colorAxis:Highcharts.ColorAxisOptions = {};
        if (selectedMapMeasure.value == "Biocapacity") {
            colorAxis = {
                stops: [
                    [0, getTailwindHexColor('orange-400')],
                    [0.4, getTailwindHexColor('yellow-200')],
                    [0.6, getTailwindHexColor('cyan-200')],
                    [0.95, getTailwindHexColor('blue-400')]
                ],
                min: 0
            };
            if (selectedMapArea.value == "Total") {
                colorAxis.tickAmount = 4;
                colorAxis.max = 3.4;
            } else if (selectedMapArea.value == "Built up land") {
                colorAxis.tickAmount = 4;
                colorAxis.max = 0.12;
            } else if (selectedMapArea.value == "Cropland") {
                colorAxis.tickAmount = 4;
                colorAxis.max = 1.2;
            } else if (selectedMapArea.value == "Fishing grounds") {
                colorAxis.tickAmount = 3;
                colorAxis.max = 0.3;
            } else if (selectedMapArea.value == "Forest") {
                colorAxis.tickAmount = 4;
                colorAxis.max = 1.4;
            } else if (selectedMapArea.value == "Grazing land") {
                colorAxis.tickAmount = 4;
                colorAxis.max = 0.4;
            }
        } else if (selectedMapMeasure.value == "Ecological deficit or reserve") {
            colorAxis = {
                stops: [
                    [0, getTailwindHexColor('orange-400')],
                    [0.4, getTailwindHexColor('yellow-200')],
                    [0.6, getTailwindHexColor('cyan-200')],
                    [0.95, getTailwindHexColor('blue-400')]
                ],
            };
            if (selectedMapArea.value == "Total" || selectedMapArea.value == "Forest") {
                colorAxis.tickAmount = 5;
                colorAxis.max = 5;
                colorAxis.min = -5;
            } else if (selectedMapArea.value == "Built up land") {
                colorAxis.tickAmount = 0;
                colorAxis.max = 0;
                colorAxis.min = 0;
            } else if (selectedMapArea.value == "Cropland" || selectedMapArea.value == "Fishing grounds" || selectedMapArea.value == "Grazing land") {
                colorAxis.tickAmount = 5;
                colorAxis.max = 1;
                colorAxis.min = -1;
            }
        } else if (selectedMapMeasure.value == "Ecological footprint of consumption") {
            colorAxis = {
                stops: [
                    [0, getTailwindHexColor('blue-400')],
                    [0.4, getTailwindHexColor('cyan-200')],
                    [0.6, getTailwindHexColor('yellow-200')],
                    [0.95, getTailwindHexColor('orange-400')]
                ],
                min: 0,
            };
            if (selectedMapArea.value == "Total") {
                colorAxis.tickAmount = 4;
                colorAxis.max = 5.6;
            } else if (selectedMapArea.value == "Built up land") {
                colorAxis.tickAmount = 4;
                colorAxis.max = 0.12;
            } else if (selectedMapArea.value == "Cropland") {
                colorAxis.tickAmount = 4;
                colorAxis.max = 1.2;
            } else if (selectedMapArea.value == "Fishing grounds") {
                colorAxis.tickAmount = 4;
                colorAxis.max = 0.2;
            } else if (selectedMapArea.value == "Forest") {
                colorAxis.tickAmount = 4;
                colorAxis.max = 4;
            } else if (selectedMapArea.value == "Grazing land") {
                colorAxis.tickAmount = 3;
                colorAxis.max = 0.3;
            }
        }
        return colorAxis;
        
    });
    function loadData():void {
        d3Fetch.csv("/csv/sustainability-map.csv").then( (data: any[]): void => {
            let d:SustainMapData[] = [];
            for (let row of data) {
                d.push({country: getCountryCode(row.Country), value: +row.Value, measure: row.Measure, area: row.Area, income: row.IncomeGroup});
            }
            mapDataRaw.value = d;
            allMapMeasures.value = [...new Set(data.map((d: any) => d.Measure))].sort() as string[];
            allAreas.value = [...new Set(data.map((d: any) => d.Area))].sort() as string[];
            let all_inco:string[] = [...new Set(data.map((d: any) => d.IncomeGroup))].sort() as string[];
            // Remove empty value and add an All option for the filter
            all_inco.splice(0, 1);
            all_inco.unshift("All");
            allIncomes.value = all_inco;
        });
        d3Fetch.csv("/csv/sustainability-area.csv").then( (data: any): void => {
            areaDataRaw.value = data;
            allCountries.value = [...new Set(data.map((d:any) => d.country))] as string[];
            allYears.value = data.columns as string[];
            allYears.value.splice(0,3);
        });
    }
    function initialiseMaps():void {
        let map = new Map<string, string>();
        map.set('Built up land','purple-400');
        map.set('Crop land', 'yellow-300');
        map.set('Fishing grounds', 'blue-400');
        map.set('Forest land', 'green-600');
        map.set('Grazing land', 'orange-400');
        colorMap.value = map;

        let bioMap = new Map<string, string>();
        bioMap.set('Total','1.68');
        bioMap.set('Built up land','0.06');
        bioMap.set('Cropland','0.55');
        bioMap.set('Fishing grounds','0.15');
        bioMap.set('Forest','0.70');
        bioMap.set('Grazing land','0.2');
        getBiocapacityAverage.value = bioMap;

        let resMap = new Map<string, string>();
        resMap.set('Total', '-1.15');
        resMap.set('Built up land','0');
        resMap.set('Cropland','0');
        resMap.set('Fishing grounds','0.06');
        resMap.set('Forest','-1.28');
        resMap.set('Grazing land','0.06');
        getReserveAverage.value = resMap;
        
        let conMap = new Map<string, string>();
        conMap.set('Total','2.84');
        conMap.set('Built up land','0.06');
        conMap.set('Cropland','0.55');
        conMap.set('Fishing grounds','0.09');
        conMap.set('Forest','1.99');
        conMap.set('Grazing land','0.14');
        getConsumptionAverage.value = conMap;
    }
   
// all variables and functions should be added here
  return {
    mapDataRaw,
    areaDataRaw,
    selectedMapIncome,
    selectedMapMeasure,
    selectedMapArea,
    selectedAreaMeasure,
    selectedAreaCountry,
    allYears,
    allCountries,
    allAreaMeasures,
    allMapMeasures,
    allAreas,
    allIncomes,
    colorMap,
    getBiocapacityAverage,
    getReserveAverage,
    getConsumptionAverage,
    filteredMapData,
    filteredAreaData,
    mapOptions,
    areaOptions,
    mapColorAxis,
    loadData,
    initialiseMaps,
  }
});


