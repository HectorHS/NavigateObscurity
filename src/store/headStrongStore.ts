// This store should manage app-wide data like login / user information
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import * as NOTypes from '@/interfaces/NOTypes.ts';
import * as d3Fetch from "d3-fetch";

export const useHeadStrongStore = defineStore('headStrongStore', () =>{
    const contextDataRaw = ref<NOTypes.ContextData[]>([]);
    const contextLinkDataRaw = ref<NOTypes.ContextLinkData[]>([]);

    function loadData():void {
        d3Fetch.csv("/csv/notes/hs-context.csv").then( (data: any[]): void => {
            let d:NOTypes.ContextData[] = [];
            for (let row of data) {
                d.push({id: row.Id, text: row.Context});
            }
            contextDataRaw.value = d;
        });
        d3Fetch.csv("/csv/notes/hs-context-link.csv").then( (data: any): void => {
            let d: NOTypes.ContextLinkData[] = [];
            let toColumns = data.columns;
            toColumns.splice(0, 2);
            for (let row of data) {
                let to: string[] = [];
                for (let col of toColumns) {
                    to.push(row[col]);
                }
                d.push({ contextId: row.Context, from: row.node1, to: to });
            }
            contextLinkDataRaw.value = d;
        });
    }

// all variables and functions should be added here
    return {
        contextDataRaw,
        contextLinkDataRaw,
        loadData,
    }
});
