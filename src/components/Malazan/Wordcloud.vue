<template>
    <figure>
        <highcharts :options="options" class="h-full"></highcharts>
    </figure>
</template>
  
  <script lang="ts">
    import { defineComponent, type PropType } from 'vue';
    import * as d3Fetch from "d3-fetch";
    import { getMalazanWordcloudOptions } from '@/helpers/chartOptions';
    import {getTailwindHexColor} from '@/helpers/commonFunctions';
  
    // https://github.com/highcharts/highcharts-vue#importing-highcharts-modules
    import Highcharts from 'highcharts';
    import Wordcloud from 'highcharts/modules/wordcloud';
    Wordcloud(Highcharts);
    import '@/styles/highcharts.scss';

    interface MalazanWordcloud {
        name: string, 
        weight: number, 
        color: string | Highcharts.GradientColorObject, 
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
    },
      data: () => ({
        wordcloudData: [] as MalazanWordcloud[],
        colorsMap: new Map<number, Highcharts.GradientColorObject>([]),
        colors: ['blue-600', 'purple-600', 'violet-600','red-600','orange-600', 'yellow-600','green-600', 'emerald-600','cyan-600','blue-300', 'purple-300', 'violet-300','red-300','orange-300', 'yellow-300','green-300', 'emerald-300','cyan-300'],
        colorsCalc: [] as any[],
      }),
      computed: {
        options():Highcharts.Options {
            let options = this.getMalazanWordcloudOptions();
            options.series![0].data = this.wordcloudData; 
            return options;
        },
        colorsCalc(): any[] {
            let c = [];
            for (let col of this.colors) {
                c.push(this.getTailwindHexColor(col));
            }
            return c;
        },
      },
      methods: {
        loadData(): void {
            d3Fetch.csv('/csv/malazan/' + this.filePrefix + "wordcloud.csv").then( (data: any[]): void => {
                let d: MalazanWordcloud[] = [];
                let i = 0;
                for (let row of data) {
                    d.push({name: row.label, weight:row.weight, color: this.colorsCalc[i]})
                    i++;
                    if (i == this.colorsCalc.length) {
                        i = 0;
                    }
                }
                this.wordcloudData = d;
            });
        },
        getMalazanWordcloudOptions,
        getTailwindHexColor,
      },
      mounted() {
            this.loadData();
        }
    })
    </script>

