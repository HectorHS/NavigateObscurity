<template>
    <figure>
      <highcharts :options="options" class="h-full"></highcharts>
    </figure>
  </template>
  
  <script lang="ts">
    import { defineComponent, type PropType } from 'vue';
    import * as d3Fetch from "d3-fetch";
    import { getMalazanBubbleOptions } from '@/helpers/chartOptions';
    import {getTailwindHexColor,getRadialGradient,getLinearGradient} from '@/helpers/commonFunctions';
  
  
    // https://github.com/highcharts/highcharts-vue#importing-highcharts-modules
    import Highcharts from 'highcharts';
    import highchartsMore from 'highcharts/highcharts-more'
    highchartsMore(Highcharts)
    import '@/styles/highcharts.scss';

    interface MalazanBubbles {
        id: string, 
        name: string, 
        value: number, 
        color: string | Highcharts.GradientColorObject, 
        customFlag: number, 
        customProperty: string
    }
  
    export default defineComponent ({
      components: {
      },
      setup() {
      },
      props: {
        filePrefix: { 
            type: String,
            required: true
        },
        colors: { 
            type:Object as PropType<Map<number,string>>,
            required: true
        },
        },
      data: () => ({
        bubblesData: [] as MalazanBubbles[],
        colorsMap: new Map<number, Highcharts.GradientColorObject>([]),
      }),
      computed: {
        options():Highcharts.Options {
            let options = this.getMalazanBubbleOptions();
            options.tooltip!.pointFormatter = function (this: any): string {
                let text:string;
                if (this.customFlag! == 1) {
                    text = this.value + " mentions for " + this.customProperty;
                } else {
                    text = this.value + " mentions";
                }
                return '<text><span style="font-size:1.1em"><strong>' + this.name + '</strong></span><br>' + text + '</text>';
            };
            options.series = [{
                type: 'packedbubble',
                name: 'Mentions by name',
                data: this.bubblesData,
                allowPointSelect: false
            }];
            return options;
        },
      },
      methods: {
        loadData(): void {
            d3Fetch.csv('/csv/malazan/' + this.filePrefix + "bubbles.csv").then( (data: any[]): void => {
                let d: MalazanBubbles[] = [];
                for (let row of data) {
                    let alias:string = '';
                    if (+row.aliasflag > 0) {
                        alias = row.alias;
                    }
                    d.push({id: row.id, name: row.name, value: +row.weight, color: this.colorsMap.get(+row.category)!, customFlag: +row.aliasflag, customProperty: alias})
                }
                this.bubblesData = d;
            });
        },
        initColormap():void {
            let map: Map<number, Highcharts.GradientColorObject> = new Map();
            this.colors.forEach((value, key) => {
                map.set(key, this.getLinearGradient(value)!);
            })
            this.colorsMap = map;
        },
        getMalazanBubbleOptions,
        getTailwindHexColor,
        getRadialGradient,
        getLinearGradient
      },
      mounted() {
            this.loadData();
            this.initColormap();
        }
    })
    </script>