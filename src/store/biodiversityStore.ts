// This store should manage app-wide data like login / user information
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import * as HCTypes from '@/interfaces/HCTypes.ts';
import * as d3Fetch from "d3-fetch";
import { getTailwindColor, getRadialGradient } from '@/helpers/commonFunctions.ts';
import { getBioScatterOptions, getBioSunburstOptions } from '@/helpers/chartOptions.js';
import Highcharts from 'highcharts';


export const useBiodiversityStore = defineStore('biodiversityStore', () =>{
    const selectedPlants = ref<string>('plants');
    const colorMap = ref<Map<string, string> | undefined>(undefined);
    const sunburstDataRaw = ref<HCTypes.SunburstData[]>([]);
    const scatterData = ref<HCTypes.ScatterData[]>([]);

    const sunburstSeries = computed<HCTypes.SunburstData[]>(() => {
        let match = selectedPlants.value == 'plants' ? '1' : '0';
        return sunburstDataRaw.value.filter(x => x.plants == match);
    })
    const sunburstOptions = computed<Highcharts.Options>(() => {
        let options:Highcharts.Options = getBioSunburstOptions();
        (options.series![0] as Highcharts.SeriesSunburstOptions).data = sunburstSeries.value;
        return options;
    })
    const scatterOptions = computed<Highcharts.Options>(() => {
        let options:Highcharts.Options = getBioScatterOptions();
        (options.series![0] as Highcharts.SeriesScatterOptions).data = scatterData.value;
        return options;
    })
    function loadData():void {
        d3Fetch.csv("/csv/data/biodiversity-pie.csv").then( (data: any[]): void => {
            let d:HCTypes.SunburstData[] = [];
            for (let row of data) {
                d.push({id: row.id, parent: row.parent, parentName: row.parent_name, name: row.name, value:row.value, mass:row.biomass, percent: row.percent, plants: row.plants, color: getTailwindColor(colorMap.value!.get(row.id)!)});
            }
            sunburstDataRaw.value = d;
        });
        d3Fetch.csv("/csv/data/biodiversity-scatter.csv").then( (data: any[]): void => {
            let d:HCTypes.ScatterData[] = [];
            for (let row of data) {
                d.push({name: row.group, y: +row.mass, x: +row.power, color: getRadialGradient(colorMap.value!.get(row.group)!)});
            }
            scatterData.value = d;
        });
    }
    function initialiseColorMap():void {
        let map = new Map<string, string>();
        // for the sunbusrts
        map.set('0','transparent');
        map.set('1.1', 'emerald-500');
        map.set('1.2', 'blue-400');
        map.set('2.01', 'emerald-600');
        map.set('2.04', 'emerald-500');
        map.set('2.06', 'emerald-400');
        map.set('2.1', 'emerald-300');
        map.set('2.12', 'emerald-200');
        map.set('2.14', 'violet-700');
        map.set('2.16', 'emerald-200');
        map.set('2.05','blue-800');
        map.set('2.07','blue-700');
        map.set('2.11','blue-600');
        map.set('2.13','blue-500');
        map.set('2.15','blue-400');
        map.set('2.17','blue-300');
        map.set('3.06', 'violet-600');
        map.set('3.07', 'violet-700');
        map.set('3.08', 'violet-500');
        map.set('3.09', 'violet-400');
        map.set('3.1', 'violet-300');
        map.set('3.11', 'violet-200');
        map.set('3.12', 'violet-100');
        map.set('3.01','blue-500');
        map.set('3.02','blue-400');
        map.set('3.03','blue-300');
        map.set('3.04','blue-200');
        map.set('3.05','blue-100');
        // for the scatter
        map.set('Plants', 'emerald-600');
        map.set('Bacteria', 'blue-600');
        map.set('Fungi', 'cyan-300');
        map.set('Archaea', 'red-500');
        map.set('Protists', 'purple-700');
        map.set('Animals', 'violet-300');
        map.set('Viruses', 'yellow-600');
        colorMap.value = map;
    }

// all variables and functions should be added here
  return {
    selectedPlants,
    colorMap,
    sunburstDataRaw,
    scatterData,
    sunburstSeries,
    sunburstOptions,
    scatterOptions,
    loadData,
    initialiseColorMap,
  }
});


