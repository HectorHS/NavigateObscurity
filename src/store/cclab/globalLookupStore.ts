// This store should manage all data for cclab
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import * as d3Fetch from "d3-fetch";
import { getLookupGlobalIntOptions, getColor, getLookupStringOptions } from '@/helpers/cclabChartOptions.js';
import Highcharts from 'highcharts';

export const useGlobalLookupStore = defineStore('globalLookupStore', () => {
  const lookupDataRaw = ref<any[]>([]);
  const descriptionsDataRaw = ref<any[]>([]);
  const intLookupDataRaw = ref<any[]>([]);
  const stringLookupDataRaw = ref<any[]>([]);
  const checkItems = ref<any[]>( [{date:'06 Mar 2020 (t1)', timepoint: 't1', checked: true },
    { date:'14 Mar 2020 (t2)', timepoint: 't2', checked: true },
    { date:'24 Mar 2020 (t3)', timepoint: 't3', checked: true },
    {date:'03 Apr 2020 (t4)', timepoint: 't4', checked: true },
    { date:'17 Apr 2020 (t5)', timepoint: 't5', checked: true },
    {date:'02 May 2020 (t6)', timepoint: 't6', checked: true },
    { date:'16 May 2020 (t7)', timepoint: 't7', checked: true },
    { date:'30 May 2020 (t8)', timepoint: 't8', checked: true },
    {date:'13 Jun 2020 (t9)', timepoint: 't9', checked: true },
    { date:'27 Jun 2020 (t10)', timepoint: 't10', checked: true },
    {date:'11 Jul 2020 (t11)', timepoint: 't11', checked: true },
    { date:'25 Jul 2020 (t12)', timepoint: 't12', checked: true },
    {date:'08 Aug 2020 (t13)', timepoint: 't13', checked: true },
    { date:'22 Aug 2020 (t14)', timepoint: 't14', checked: true },
    ]);
  const all_variables = ref<string[]>([]);
  const descriptions_lookup = ref<any[]>([]);
  const excluded = ref<string[]>(["the", "The", "on", "of", "and", "was", "is", "my", "it", "from", "to", "in", "about", "I", "that", "be", "for", "would", "were", "me", "have", "at", "so", "not", "My", "as", "more", "i", "what", "we", "had", "with", "by", "how", "did", "do", "a", "it", "that", "then", "this", "there", "than", "get", "but", "don't", "i'm", "am", "she", "he", "or", "an", "you", "if", "its", "it's"]);
  const selected_variable = ref<string>("Stress");
  const selected_variableInt = ref<string>("Stress");
  const selected_variableStr = ref<string>("Cause");
  const search_variable = ref<string>('');
  const selected_variableType = ref<string>('number');
  const intDataFiltered = computed<any[]>(() => {
    let new_data:any[] = [];
    for (let row of intLookupDataRaw.value) {
      if (row.Measure == selected_variableInt.value) {
        new_data = [[Date.UTC(2020, 2, 6, 0, 0, 0), +row.t1],
        [Date.UTC(2020, 2, 14, 0, 0, 0), +row.t2],
        [Date.UTC(2020, 2, 24, 0, 0, 0), +row.t3],
        [Date.UTC(2020, 3, 3, 0, 0, 0), +row.t4],
        [Date.UTC(2020, 3, 17, 0, 0, 0), +row.t5],
        [Date.UTC(2020, 4, 2, 0, 0, 0), +row.t6],
        [Date.UTC(2020, 4, 16, 0, 0, 0), +row.t7],
        [Date.UTC(2020, 4,30, 0, 0, 0), +row.t8],
        [Date.UTC(2020, 5, 13, 0, 0, 0), +row.t9],
        [Date.UTC(2020, 5, 27, 0, 0, 0), +row.t10],
        [Date.UTC(2020, 6, 11, 0, 0, 0), +row.t11],
        [Date.UTC(2020, 6, 25, 0, 0, 0), +row.t12],
        [Date.UTC(2020, 7, 8, 0, 0, 0), +row.t13],
        [Date.UTC(2020, 7, 22, 0, 0, 0), +row.t14]]
      }
    }

    // to hide 0's
    new_data.forEach(function (element, index) {
        if (element[1] === 0) {
            new_data[index][1] = null;
        }
    });

    return new_data;
  });
  const stringDataFiltered = computed<any[]>(() => {
    let text = "";
    let colors = ['yellow-3','red-4','green-3', 'blue-2', 'neutral-3', 'yellow-5','red-2','green-5', 'blue-5'];
    let j =0;

    for (let row of stringLookupDataRaw.value) {
        if (row.Measure == selected_variableStr.value) {
            text = row.t1.toLowerCase() + " " + row.t2.toLowerCase() + " " + row.t3.toLowerCase() + " " + row.t4.toLowerCase() + " " + row.t5.toLowerCase() + " " + row.t6.toLowerCase() + " " + row.t7.toLowerCase() + " " + row.t8.toLowerCase() + " " + row.t9.toLowerCase() + " " + row.t10.toLowerCase() + " " + row.t11.toLowerCase() + " " + row.t12.toLowerCase() + " " + row.t13.toLowerCase() + " " + row.t14.toLowerCase();
        }
    }
    let lines = text.split(/[,\. ]+/g);
    let allData:any[] = lines.reduce((arr, word) => {
      let obj = Highcharts.find(arr, obj => obj.name === word);
      if (obj) {
          obj.weight += 1;
      } else {
          obj = {
              name: word,
              weight: 1,
              color: getColor(colors[j])
          };
          arr.push(obj);
          if (j == 7) {
              j = 0;
          } else {
              j++;
          }
      }
      return arr;
    }, []);

    let new_data:any[] = [];
    allData.forEach(function (arrayItem) {
        if (arrayItem.weight > 1 && !excluded.value.includes(arrayItem.name)) {
            new_data.push(arrayItem);
        }
    });
    new_data.sort(function (a, b) {
        return parseFloat(b.weight) - parseFloat(a.weight);
    });
    let new_data_reduced = new_data.slice(0, 100);

    return new_data_reduced;
  });
  const intOptions = computed<Highcharts.Options>(() => {
    let options = getLookupGlobalIntOptions();
    (options.series![0] as Highcharts.SeriesOptions).data = intDataFiltered.value;
    return options;
  });
  const stringOptions = computed<Highcharts.Options>(() => {
    let options = getLookupStringOptions();
    (options.series![0] as Highcharts.SeriesOptions).data = stringDataFiltered.value;
    return options;
  });
  function loadData(): void {
    d3Fetch.csv("/csv/cclab/CCLAB-lookup-glo-lookup.csv").then((data: any[]): void => {
      lookupDataRaw.value = data;
    });
    d3Fetch.csv("/csv/cclab/CCLAB-lookup-glo-descriptions.csv").then((data: any[]): void => {
      descriptionsDataRaw.value = data;
      all_variables.value = [...new Set(data.map(d => d.key))];
      for (let row of data) {
        descriptions_lookup.value[row.key] = row.description + '(' + row.response + ")";
      }
    });
    d3Fetch.csv("/csv/cclab/CCLAB-lookup-glo-int.csv").then((data: any[]): void => {
      intLookupDataRaw.value = data;
    });
    d3Fetch.csv("/csv/cclab/CCLAB-lookup-glo-string.csv").then((data: any[]): void => {
      stringLookupDataRaw.value = data;
    });
  }

function setChecks() {
  let look = [];
  for (let row of lookupDataRaw.value) {
    if (row.Name == selected_variable.value) {
      look.push(row.t1);
      look.push(row.t2);
      look.push(row.t3);
      look.push(row.t4);
      look.push(row.t5);
      look.push(row.t6);
      look.push(row.t7);
      look.push(row.t8);
      look.push(row.t9);
      look.push(row.t10);
      look.push(row.t11);
      look.push(row.t12);
      look.push(row.t13);
      look.push(row.t14);
    }
  }

  for (let i = 0; i < checkItems.value.length; i++) {
    if (look[i] == 1) {
      checkItems.value[i].checked = true;;
    } else {
      checkItems.value[i].checked = false;
    }
  }
}
function measureUpdated() {
  let type = 'number';
  for (let row of descriptionsDataRaw.value) {
    if (row.key == selected_variable.value && row.type == "int") {
      type = "number";
    } else if (row.key == selected_variable.value && row.type == "string") {
      type = "text";
    }
  }
  selected_variableType.value = type;

  if (type == "text") {
    selected_variableStr.value = selected_variable.value;
  } else {
    selected_variableInt.value = selected_variable.value;
  }
}

watch(selected_variable, setChecks)
watch(selected_variable, measureUpdated)

// all variables and functions should be added here
  return {
    lookupDataRaw,
    descriptionsDataRaw,
    intLookupDataRaw,
    stringLookupDataRaw,
    checkItems,
    all_variables,
    descriptions_lookup,
    excluded,
    selected_variable,
    selected_variableInt,
    selected_variableStr,
    selected_variableType,
    stringDataFiltered,
    search_variable,
    intDataFiltered,
    intOptions,
    stringOptions,
    loadData,
    setChecks,
    measureUpdated,
  }
});

