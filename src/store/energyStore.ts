// This store should manage app-wide data like login / user information
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import * as HCTypes from '@/interfaces/HCTypes.ts';
import * as d3Fetch from "d3-fetch";
import * as NOTypes from '@/interfaces/NOTypes.ts';
import { fCapital, numberFormatter, getCountryCode, getCountryName, getTailwindHexColor, getLinearGradient } from '@/helpers/commonFunctions.ts';
import { getEnergyMapOptions, getEnergysunburstOptions, getEnergyAreaOptions, getEnergyBarOptions } from '@/helpers/chartOptions.js';
import Highcharts from 'highcharts';

interface EnergyStats {
    energy: string,
    population: string,
    co2: string,
    import: string,
    export: string
}

export const useEnergyStore = defineStore('energyStore', () =>{
    const mapDataRaw = ref<any[]>([]);
    const areaDataRaw = ref<any[]>([]);
    const tradeDataRaw = ref<any[]>([]);
    const sunburstDataRaw = ref<any[]>([]);
    const allYears = ref<string[]>([]);
    const selectedSource = ref<string>("all");
    const selectedCountry = ref<string>("World");
    const colorMap = ref<Map<string, string> | undefined>(undefined);
    const typeMap = ref<Map<string, string> | undefined>(undefined);
    const energyRadioItems = ref <NOTypes.RadioItem[]>([{ title: 'All energy', value: 'all', checked: true, colors: [ 'orange-400', 'gray-200','blue-400'] },
        { title: 'Oil', value: 'oil', checked: false, colors: ['red-500'] },
        { title: 'Natural gas', value: 'gas', checked: false, colors: ['yellow-300'] },
        { title: 'Coal', value: 'coal', checked: false, colors: ['gray-400'] },
        { title: 'Nuclear', value: 'nuclear', checked: false, colors: ['purple-500'] },
        { title: 'Hydroelectric', value: 'hydro', checked: false, colors: ['blue-500'] },
        { title: 'Other renewables', value: 'renewables', checked: false, colors: ['green-400'] },
    ]);

    const filteredMapData = computed<HCTypes.MapData[]>(() => {
        let data: HCTypes.MapData[] = [];
        let val:number = 0;
        for (let row of mapDataRaw.value) {
            if (selectedSource.value == "all") {
                val = +row.consumption_pc;
            } else if (selectedSource.value == "oil") {
                val = +row.oil;
            } else if (selectedSource.value == "gas") {
                val = +row.gas;
            } else if (selectedSource.value == "coal") {
                val = +row.coal;
            } else if (selectedSource.value == "nuclear") {
                val = +row.nuclear;
            } else if (selectedSource.value == "hydro") {
                val = +row.hydro;
            } else if (selectedSource.value == "renewables") {
                val = +row.renewables;
            }
            data.push({ name: row.country, country: getCountryCode(row.country), value: val });
        }
        return data;
    })
    const filteredAreaData = computed<HCTypes.AreaSeries[]>(() => {
        var new_data: HCTypes.AreaSeries[] = [];
        if (selectedSource.value == "renewables") {
            for (let row of areaDataRaw.value) {
                if (getCountryName(row.country) == selectedCountry.value && (row.type == "solar" || row.type == "wind" || row.type == "geothermal" || row.type == "biofuels")) {
                    let year_data: number[] = [];
                    for (let ye in allYears.value) {
                        year_data[ye] = +row[allYears.value[ye]];
                    }
                    let color: any = colorMap.value ? getLinearGradient(colorMap.value.get(row.type)!) : getLinearGradient("gray-400");
                    new_data.push({ type: 'area', id: row.type, name: fCapital(typeMap.value!.get(row.type)), legendSymbol: 'rectangle', data: year_data, color: color })
                }
            }
        } else {
            for (let row of areaDataRaw.value) {
                if (getCountryName(row.country) == selectedCountry.value && (selectedSource.value == "all" || selectedSource.value == row.type)) {
                    let year_data: number[] = [];
                    for (let ye in allYears.value) {
                        year_data[ye] = +row[allYears.value[ye]];
                    }
                    let color: any = colorMap.value ? getLinearGradient(colorMap.value.get(row.type)!) : getLinearGradient("gray-400");
                    new_data.push({ type: 'area', id: row.type, name: fCapital(typeMap.value!.get(row.type)), legendSymbol: 'rectangle', data: year_data, color: color })
                }
            }
        }
        return new_data;
    })
    const filteredImportData = computed < HCTypes.BarSeries[]>(() => {
        return getTradeData("Import")
    })
    const filteredExportData = computed<HCTypes.BarSeries[]>(() => {
        return getTradeData("Export")
    })
    const filteredSunburstData = computed<HCTypes.SunburstData[]>(() => {
        let newData: HCTypes.SunburstData[] = [];
        for (let row of sunburstDataRaw.value) {
            if (getCountryName(row.country) == selectedCountry.value) {
                newData.push({ id: 'Transport', parent: '', name: 'transport', value: +row.transport_total, color: getTailwindHexColor(colorMap.value!.get('transport')!) })
                if (+row.transport_road > 0) {
                    newData.push({ id: 'Road', parent: 'Transport', name: 'road', value: +row.transport_road, color: getTailwindHexColor(colorMap.value!.get('road')!) })
                }
                if (+row.transport_trains > 0) {
                    newData.push({ id: 'Trains', parent: 'Transport', name: 'train', value: +row.transport_trains, color: getTailwindHexColor(colorMap.value!.get('train')!) })
                }
                if (+row.transport_ships > 0) {
                    newData.push({ id: 'Ships', parent: 'Transport', name: 'water', value: +row.transport_ships, color: getTailwindHexColor(colorMap.value!.get('water')!) })
                }
                if (+row.transport_airplanes > 0) {
                    newData.push({ id: 'Airplanes', parent: 'Transport', name: 'air', value: +row.transport_airplanes, color: getTailwindHexColor(colorMap.value!.get('air')!) })
                }
                if (+row.residential_total > 0) {
                    newData.push({ id: 'Residential', parent: '', name: 'Residential', value: +row.residential_total, color: getTailwindHexColor(colorMap.value!.get('residential')!)})
                }
                if (+row.residential_appliances > 0) {
                    newData.push({ id: 'Appliances', parent: 'Residential', name: 'appliances', value: +row.residential_appliances, color: getTailwindHexColor(colorMap.value!.get('appliances_res')!) })
                }
                if (+row.residential_lighting > 0) {
                    newData.push({ id: 'Lighting', parent: 'Residential', name: 'lighting', value: +row.residential_lighting, color: getTailwindHexColor(colorMap.value!.get('lighting_res')!) })
                }
                if (+row.residential_cooling > 0) {
                    newData.push({ id: 'Cooling', parent: 'Residential', name: 'cooling', value: +row.residential_cooling, color: getTailwindHexColor(colorMap.value!.get('cooling_res')!) })
                }
                if (+row.residential_heating > 0) {
                    newData.push({ id: 'Heating', parent: 'Residential', name: 'heating', value: +row.residential_heating, color: getTailwindHexColor(colorMap.value!.get('heating_res')!) })
                }
                if (+row.services_total > 0) {
                    newData.push({ id: 'Services', parent: '', name: 'services', value: +row.services_total, color: getTailwindHexColor(colorMap.value!.get('services')!) })
                }
                if (+row.services_lighting > 0) {
                    newData.push({ id: 'Lighting', parent: 'Services', name: 'lighting', value: +row.services_lighting, color: getTailwindHexColor(colorMap.value!.get('lighting_ser')!)})
                }
                if (+row.services_cooling > 0) {
                    newData.push({ id: 'Cooling', parent: 'Services', name: 'cooling', value: +row.services_cooling, color: getTailwindHexColor(colorMap.value!.get('cooling_ser')!) })
                }
                if (+row.services_heating > 0) {
                    newData.push({ id: 'Heating', parent: 'Services', name: 'heating', value: +row.services_heating, color: getTailwindHexColor(colorMap.value!.get('heating_ser')!) })
                }
                newData.push({ id: 'Industry', parent: '', name: 'Industry', value: +row.industry_total, color: getTailwindHexColor(colorMap.value!.get('industry')!) })
                if (+row.industry_agriculture > 0) {
                    newData.push({ id: 'Agriculture', parent: 'Industry', name: 'agriculture', value: +row.industry_agriculture, color: getTailwindHexColor(colorMap.value!.get('agriculture')!) })
                }
                if (+row.industry_mining > 0) {
                    newData.push({ id: 'Mining', parent: 'Industry', name: 'mining', value: +row.industry_mining, color: getTailwindHexColor(colorMap.value!.get('mining')!) })
                }
                if (+row.industry_metals > 0) {
                    newData.push({ id: 'Metals', parent: 'Industry', name: 'metal production', value: +row.industry_metals, color: getTailwindHexColor(colorMap.value!.get('metal')!) })
                }
                if (+row.industry_minerals > 0) {
                    newData.push({ id: 'Minerals', parent: 'Industry', name: 'mineral production', value: +row.industry_minerals, color: getTailwindHexColor(colorMap.value!.get('mineral')!) })
                }
                if (+row.industry_chemicals > 0) {
                    newData.push({ id: 'Chemicals', parent: 'Industry', name: 'chemical production', value: +row.industry_chemicals, color: getTailwindHexColor(colorMap.value!.get('chemical')!) })
                }
                if (+row.industry_paper > 0) {
                    newData.push({ id: 'Paper', parent: 'Industry', name: 'paper production', value: +row.industry_paper, color: getTailwindHexColor(colorMap.value!.get('paper')!) })
                }
                if (+row.industry_construction > 0) {
                    newData.push({ id: 'Construction', parent: 'Industry', name: 'construction', value: +row.industry_construction, color: getTailwindHexColor(colorMap.value!.get('construction')!) })
                }
                newData.push({ id: 'Other', parent: '', name: 'other', value: +row.other, color: getTailwindHexColor(colorMap.value!.get('other')!)})
            }
        }
        return newData;
    })
    const sunburstLegendItems = computed<NOTypes.LegendItem[]>(() => {
        let legend:NOTypes.LegendItem[] = [];
        for (let item of filteredSunburstData.value) {
            if (item.parent == '') {
                legend.push({name: fCapital(item.name), color: colorMap.value!.get(item.id.toLowerCase())!});
            }
        }
        return legend;
    })
    const mapOptions = computed <Highcharts.Options>(() => {
        let options: Highcharts.Options = getEnergyMapOptions();
        let colorAxis: Highcharts.ColorAxisOptions = {
            startOnTick: false,
            endOnTick: false,
        };
        // To better centre and distribute colors. Max is always double the average value.
        if (selectedSource.value == "all") {
            colorAxis.tickInterval = 100;
            colorAxis.max = 350;
            colorAxis.min = 50;
            colorAxis.stops = [
                [0, getTailwindHexColor('blue-500')],
                [0.4, getTailwindHexColor('cyan-300')],
                [0.6, getTailwindHexColor('yellow-300')],
                [0.95, getTailwindHexColor('orange-500')]
            ];
        } else if (selectedSource.value == "gas") {
            colorAxis.tickInterval = 20;
            colorAxis.max = 60;
            colorAxis.min = 10;
            colorAxis.stops = [
                [0, getTailwindHexColor('gray-600')],
                [0.95, getTailwindHexColor(colorMap.value!.get("gasmax")!)]
            ];
        } else if (selectedSource.value == "oil") {
            colorAxis.tickInterval = 20;
            colorAxis.max = 60;
            colorAxis.min = 10;
            colorAxis.stops = [
                [0, getTailwindHexColor('gray-600')],
                [0.95, getTailwindHexColor(colorMap.value!.get("oilmax")!)]
                ];
        } else if (selectedSource.value == "coal") {
            colorAxis.tickInterval = 20;
            colorAxis.max = 50;
            colorAxis.min = 0;
            colorAxis.stops = [
                [0, getTailwindHexColor('gray-600')],
                [0.95, getTailwindHexColor(colorMap.value!.get("coalmax")!)]
                ];
        } else if (selectedSource.value == "nuclear") {
            colorAxis.tickInterval = 10;
            colorAxis.max = 25;
            colorAxis.min = 0;
            colorAxis.stops = [
                [0, getTailwindHexColor('gray-600')],
                [0.95, getTailwindHexColor(colorMap.value!.get("nuclearmax")!)]
                ];
        } else if (selectedSource.value == "hydro") {
            colorAxis.tickInterval = 10;
            colorAxis.max = 25;
            colorAxis.min = 0;

            colorAxis.stops = [
                [0, getTailwindHexColor('gray-600')],
                [0.95, getTailwindHexColor(colorMap.value!.get("hydromax")!)]
            ];
        } else if (selectedSource.value == "renewables") {
            colorAxis.tickInterval = 5;
            colorAxis.max = 15;
            colorAxis.min = 0;
            colorAxis.stops = [
                [0, getTailwindHexColor('gray-600')],
                [0.95, getTailwindHexColor(colorMap.value!.get("renewmax")!)]
            ];
        }
        options.colorAxis = colorAxis;

        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
            let title = fCapital(this.key!);
            let value: number = this.point.value!;
            let text = "";
            if (selectedSource.value == "all") {
                text = value + " gigajoules consumed per person";
            } else if (selectedSource.value == "oil") {
                text = numberFormatter(value) + "% of consumed energy comes from <b>oil</b>";
            } else if (selectedSource.value == "gas") {
                text = numberFormatter(value) + "% of consumed energy comes from <b>natural gas</b>";
            } else if (selectedSource.value == "coal") {
                text = numberFormatter(value) + "% of consumed energy comes from <b>coal</b>";
            } else if (selectedSource.value == "nuclear") {
                text = numberFormatter(value) + "% of consumed energy comes from <b>nuclear</b> plants";
            } else if (selectedSource.value == "hydro") {
                text = numberFormatter(value) + "% of consumed energy comes from <b>hydroelectric</b> plants";
            } else if (selectedSource.value == "renewables") {
                text = numberFormatter(value) + "% of consumed energy comes from <b>renewables</b>";
            }
            return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br>' + text + '</text>';
        };
        options.plotOptions!.series!.events = {
            click: function (e:any) {
                if (selectedCountry.value == e.point.name) {
                    selectedCountry.value = "World";
                    deselectCountry();
                } else {
                    selectedCountry.value = getCountryName(e.point.name);
                }
            }
        };
        options.chart = {
            events: { // for when clicking on the background
                click: function (e:any) {
                    selectedCountry.value = "World";
                    // also deselect all points
                    deselectCountry();
                }
            }
        };

        (options.series![0] as Highcharts.SeriesMapOptions).data = filteredMapData.value;

        return options;
    })
    const sunburstOptions = computed<Highcharts.Options>(() => {
        let options: Highcharts.Options = getEnergysunburstOptions();
        (options.series![0] as Highcharts.SeriesSunburstOptions).data = filteredSunburstData.value;
        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject):string {
            // we need to manually calculate total and percentages for slices
            let series:any = this.series;
            let level1Points:Highcharts.Point[] = this.series!.points!.filter(function (point:any){
                return point.parent == "";
            });

            let level1Total = series.__myTotal || (series.__myTotal = level1Points.map(p => p.value || 0).reduce((a, b) => a + b));

            let value = numberFormatter(this.point.value! / level1Total *100);
            let text = "";
            let drillText = "";
            if ((this.point as any).parent == "") {
                text = fCapital(this.key!);
            } else {
                let value2 = numberFormatter(this.point.value! / (this.point as any).node.parentNode.val *100);
                drillText = "<br>and<b> " + value2 + "%</b> of all " + ((this.point as any).parent).toLocaleLowerCase() + " energy use";

                if ((this.point as any).parent == "Transport") {
                    text = "Transport by " + this.key;
                } else if ((this.point as any).parent == "Residential") {
                    text = "Residential " + this.key;
                } else if ((this.point as any).parent == "Industry") {
                    text = "Industrial " + this.key;
                } else if ((this.point as any).parent == "Services") {
                    text = this.key + " for services";
                }
            }
            let tip = "<text><b>"+ text + "</b> takes up <b>" + value + "%</b> of all energy use" + drillText + "</text>";
            return tip;
        };

        return options;
    });
    const areaOptions = computed<Highcharts.Options>(() => {
        let options: Highcharts.Options = getEnergyAreaOptions();
        options.series = filteredAreaData.value;
        (options.xAxis! as Highcharts.XAxisOptions).categories = allYears.value;
        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject):string {
            let value:string = numberFormatter(this.y!);
            let text1: string = '<b>' + value + "</b> petajoules of energy consumed came from <b>" + typeMap.value!.get(this.series!.name) + '</b>';
            let perc:string = numberFormatter(this.y! / this.total! * 100);
            let text2: string = '<b>' + perc + "%</b> of all energy consumed in " + this.x + " came from <b>" + typeMap.value!.get(this.series!.name) + '</b>';

            return '<text><span style="font-size: 1.1em"><strong>' + selectedCountry.value + '</strong></span><br>' + text1 + '<br>' + text2 + '</text>';
        };

        return options;
    });
    const importOptions = computed<Highcharts.Options>(() => {
        let options: Highcharts.Options = getEnergyBarOptions();
        options.xAxis = {
            categories: getTradeXAxis("Import")
        }
        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject):string {
            let text = "";
            if (selectedCountry.value == "World") {
                text = '<text><b>' + getCountryName(this.x as string) + '</b> imported a total of <br><b>' +
                    numberFormatter(this.y!) + '</b> petajoules of <b>' + this.series!.name + '</b></text>';
            } else {
                text =  '<text><b>' + selectedCountry.value + '</b> imported from <b>' + getCountryName(this.x as string) + '<br/>' +
                    numberFormatter(this.y!) + '</b> petajoules of <b>' + this.series!.name + '</b></text>';
            }
            return text;
        };
        options.series = getTradeData("Import");

        return options
    });
    const exportOptions = computed<Highcharts.Options>(() => {
        let options: Highcharts.Options = getEnergyBarOptions();
        options.xAxis = {
            categories: getTradeXAxis("Export")
        }
        options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject):string {
            let text = "";
            if (selectedCountry.value == "World") {
                text = '<text><b>' + getCountryName(this.x as string) + '</b> exported a total of <br><b>' +
                        numberFormatter(this.y!) + '</b> petajoules of <b>' + this.series!.name + '</b></text>';
            } else {
                text =  '<text><b>' + selectedCountry.value + '</b> exported to <b>' + getCountryName(this.x as string) + '<br/>' +
                        numberFormatter(this.y!) + '</b> petajoules of <b>' + this.series!.name + '</b></text>';
            }
            return text;
        };
        options.series = getTradeData("Export");

        return options
    });
    const stats = computed<EnergyStats>(() => {
        let stats: any = {};
        for (let row of mapDataRaw.value) {
            if (selectedCountry.value == getCountryName(row.country)) {
                stats.energy = numberFormatter(+row.energy_share);
                stats.population = numberFormatter(+row.population_share);
                stats.co2 = numberFormatter(+row.co2_share);
                stats.import = numberFormatter(+row.import_share);
                stats.export = numberFormatter(+row.export_share);
                break;
            }
        }
        return stats;
    });

    function getTradeData(type: string): HCTypes.BarSeries[] {
        let oilData: number[] = [];
        let gasData: number[] = [];
        let coalData: number[] = [];
        let elecData: number[] = [];
        // get subset with source country
        // get a list of target countries
        // go through list add to arrays
        let mySubset = tradeDataRaw.value.filter((d: { SourceCountry: string, Type: string }) => { return getCountryName(d.SourceCountry) == selectedCountry.value && d.Type == type; });
        mySubset.sort(function (a: any, b: any) {
            return parseFloat(b.Total) - parseFloat(a.Total)
        });
        let targetCountries: string[] = [...new Set(mySubset.map((d: { TargetCountry: string }) => d.TargetCountry))] as string[];

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
        let oilColor = colorMap.value ? getTailwindHexColor(colorMap.value.get('oil')!) : getTailwindHexColor("gray-400");
        let gasColor = colorMap.value ? getTailwindHexColor(colorMap.value.get('gas')!) : getTailwindHexColor("gray-400");
        let coalColor = colorMap.value ? getTailwindHexColor(colorMap.value.get('coal')!) : getTailwindHexColor("gray-400");
        let elecColor = colorMap.value ? getTailwindHexColor(colorMap.value.get('electricity')!) : getTailwindHexColor("gray-400");
        let series: HCTypes.BarSeries[] = [];
        let oilSlice: HCTypes.BarSeries = {
            name: 'Oil',
            type: 'bar',
            data: oilData,
            color: oilColor
        };

        let gasSlice: HCTypes.BarSeries = {
            name: 'Natural gas',
            type: 'bar',
            data: gasData,
            color: gasColor
        };
        let coalSlice: HCTypes.BarSeries = {
            name: 'Coal',
            type: 'bar',
            data: coalData,
            color: coalColor
        };
        let elecSlice: HCTypes.BarSeries = {
            name: 'Electricity',
            type: 'bar',
            data: elecData,
            color: elecColor
        };
        series.push(oilSlice);
        series.push(gasSlice);
        series.push(coalSlice);
        series.push(elecSlice);

        return series;
    }
    function getTradeXAxis(type: string): string[] {
        let countries: string[] = [];
        let mySubset: any = tradeDataRaw.value.filter((d: { SourceCountry: string, Type: string }) => { return getCountryName(d.SourceCountry) == selectedCountry.value && d.Type == type; });
        mySubset.sort(function (a: any, b: any) {
            return parseFloat(b.Total) - parseFloat(a.Total)
        });
        let Targetcountries: string[] = [...new Set(mySubset.map((d: { TargetCountry: string }) => d.TargetCountry))] as string[];

        for (let coun of Targetcountries) {
            countries.push(getCountryName(coun));
        }

        return countries;
    }
    function deselectCountry():void {
        let selected = document.querySelectorAll('.energy-map .highcharts-point-select');
        selected.forEach((item) => {
            item.classList.remove('highcharts-point-select');
        });
    }
    function resetCountry():void {
        selectedCountry.value = 'World';
    }
    function loadData():void {
        d3Fetch.csv("/csv/data/energy-map.csv").then( (data: any[]): void => {
            mapDataRaw.value = data;
        });
        d3Fetch.csv("/csv/data/energy-area.csv").then( (data: any): void => {
            areaDataRaw.value = data;
            allYears.value = data.columns as string[];
            allYears.value.splice(0, 2);
        });
        d3Fetch.csv("/csv/data/energy-trade.csv").then((data: any[]): void => {
            tradeDataRaw.value = data;
        });
        d3Fetch.csv("/csv/data/energy-consumption-sectors.csv").then((data: any[]): void => {
           sunburstDataRaw.value = data;
        });
    }
    function initialiseMaps(): void {
        let color = new Map<string, string>();
        color.set('oil', 'red-700');
        color.set('oilmax', 'red-400');
        color.set('gas', 'yellow-300');
        color.set('gasmax', 'yellow-200');
        color.set('coal', 'gray-300');
        color.set('coalmax', 'gray-100');
        color.set('nuclear', 'purple-700');
        color.set('nuclearmax', 'purple-300');
        color.set('hydro', 'blue-500');
        color.set('hydromax', 'blue-200');
        color.set('renewables', 'green-400');
        color.set('renewmax', 'green-300');
        color.set('solar', 'blue-100');
        color.set('wind', 'blue-300');
        color.set('geothermal', 'green-700');
        color.set('biofuels', 'green-300');
        color.set('electricity', 'gray-100');
        color.set('transport', 'emerald-500');
        color.set('residential', 'cyan-500');
        color.set('services', 'orange-500');
        color.set('industry', 'violet-600');
        color.set('other', 'gray-200');
        color.set('road', 'emerald-200');
        color.set('train', 'emerald-400');
        color.set('water', 'emerald-600');
        color.set('air', 'emerald-800');
        color.set('appliances_res', 'cyan-200');
        color.set('lighting_res', 'cyan-400');
        color.set('cooling_res', 'cyan-600');
        color.set('heating_res', 'cyan-700');
        color.set('lighting_ser', 'orange-200');
        color.set('cooling_ser', 'orange-400');
        color.set('heating_ser', 'orange-600');
        color.set('agriculture', 'violet-200');
        color.set('mining', 'violet-300');
        color.set('metal', 'violet-400');
        color.set('mineral', 'violet-500');
        color.set('chemical', 'violet-600');
        color.set('paper', 'violet-700');
        color.set('construction', 'violet-800');
        colorMap.value = color;

        let type = new Map<string, string>();
        type.set('oil', 'oil');
        type.set('gas', 'natural gas');
        type.set('coal', 'coal');
        type.set('nuclear', 'nuclear power');
        type.set('hydro', 'hydroelectric power');
        type.set('renewables', 'other renewables');
        type.set('solar', 'solar power');
        type.set('wind', 'wind power');
        type.set('geothermal', 'geothermal power');
        type.set('biofuels', 'biofuels');
        typeMap.value = type;
    }

    watch(selectedSource, resetCountry)

// all variables and functions should be added here
    return {
        mapDataRaw,
        areaDataRaw,
        tradeDataRaw,
        sunburstDataRaw,
        allYears,
        selectedSource,
        selectedCountry,
        colorMap,
        typeMap,
        filteredMapData,
        filteredAreaData,
        filteredImportData,
        filteredExportData,
        filteredSunburstData,
        sunburstLegendItems,
        mapOptions,
        sunburstOptions,
        areaOptions,
        importOptions,
        exportOptions,
        energyRadioItems,
        stats,
        getTradeData,
        getTradeXAxis,
        loadData,
        initialiseMaps
  }
});


