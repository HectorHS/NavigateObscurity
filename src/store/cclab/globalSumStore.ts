// This store should manage all data for cclab
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import * as d3Fetch from "d3-fetch";
import { fCapital, numberFormatter, getCountryCode } from '@/helpers/commonFunctions.ts';
import { getColor, getMapOptions, getGloSumSplineOptions, getSumPieOptions, getSumCovidSplineOptions } from '@/helpers/cclabChartOptions.js';
import Highcharts from 'highcharts';

export const useGlobalSumStore = defineStore('globalSumStore', () => {
  const mapDataRaw = ref<any[]>([]);
  const varsDataRaw = ref<any[]>([]);
  const detailsDataRaw = ref<any[]>([]);
  const selected_country = ref<string>('World');
  const all_questions = ref<string[]>(["How likely do you think it is that you will contract COVID19?",
    "All of humanity and I rise and fall together",
    "My neighborhood and I rise and fall together",
    "When all of humanity succeeds, I feel good",
    "When my neighborhood succeeds, I feel good",
    "During a winter storm, someone from your neighborhood knocks on your door because their heating is out. How willing would you be to let them sleep in your living room for the night?",
    "During a winter storm, a displaced person who is not a citizen of your own country knocks on your door because their heating is out. How willing would you be to let them sleep in your living room for the night?",
    "Helping someone from my neighborhood when they are in need is the right thing to do",
    "Helping a displaced person who is not a citizen of your own country when they are in need is the right thing to do"]);
  const chart_titles = ref<string[]>(["Average score in relation to COVID-19 prevalence",
    "Breakdown by age",
    "Breakdown by sex",
    "Breakdown by preexisting conditions"]);
  const selected_question = ref<string>("How likely do you think it is that you will contract COVID19?");
  const measureMap = ref<Map<string, string> | undefined>(undefined);
  const scaleMap = ref<Map<string, string> | undefined>(undefined);


  const selected_measure = computed<string>(() => {
    if (measureMap.value && measureMap.value.get(selected_question.value)) {
      return measureMap.value.get(selected_question.value);
    }
    return '';
  })

  const mapDataFiltered = computed<any[]>(() => {
    let new_data:any[] = [];
    for (let row of mapDataRaw.value) {
      let val = 0;
      if (row.Country != "World") {
        val = row.Count;
        new_data.push({ country: getCountryCode(row.Country), value: +val, originalName: row.Country });
      }
    }
    return new_data;
  })
  const inter1_data_hum = computed<any[]>(() => {
    return getMeasureArray("PFIHumanityEmpathy");
  })
  const inter1_data_nei = computed<any[]>(() => {
    return getMeasureArray("PFINeighEmpathy");
  })
  const inter2_data_hum = computed<any[]>(() => {
    return getMeasureArray("PFIHumanitySharedFate");
  })
  const inter2_data_nei = computed<any[]>(() => {
    return getMeasureArray("PFINeighSharedFate");
  })
  const will1_data_hum = computed<any[]>(() => {
    return getMeasureArray("WillingnessHumanity");
  })
  const will1_data_nei = computed<any[]>(() => {
    return getMeasureArray("WillingnessNeigh");
  })
  const will2_data_hum = computed<any[]>(() => {
    return getMeasureArray("NBTHumanity");
  })
  const will2_data_nei = computed<any[]>(() => {
    return getMeasureArray("NBTNeigh");
  })
  const covid_q_data = computed<any[]>(() => {
    return getMeasureArray(selected_measure.value);
  })
  const covid_cases_data = computed<any[]>(() => {
    return getMeasureArray("Covid_cases");
  })
  const covid_deaths_data = computed<any[]>(() => {
    return getMeasureArray("Covid_deaths");
  })
  const age1_data = computed<any[]>(() => {
    return getBreakdownData("Age", "18-21");
  })
  const age2_data = computed<any[]>(() => {
    return getBreakdownData("Age", "22-25");
  })
  const age3_data = computed<any[]>(() => {
    return getBreakdownData("Age", "26-35");
  })
  const age4_data = computed<any[]>(() => {
    return getBreakdownData("Age", "36-50");
  })
  const age5_data = computed<any[]>(() => {
    return getBreakdownData("Age", "51-80");
  })
  const sex1_data = computed<any[]>(() => {
    return getBreakdownData("Sex", "Male");
  })
  const sex2_data = computed<any[]>(() => {
    return getBreakdownData("Sex", "Female");
  })
  const sex3_data = computed<any[]>(() => {
    return getBreakdownData("Sex", "Other");
  })
  const preexisting1_data = computed<any[]>(() => {
    return getBreakdownData("Preexisting", "preexisting_yes");
  })
  const preexisting2_data = computed<any[]>(() => {
    return getBreakdownData("Preexisting", "preexisting_no");
  })
  const sexData = computed<any[]>(() => {
    let new_data = [];
    let val = 0;
    let leftover = 0;
    for (let row of mapDataRaw.value) {
      if (row.Country == selected_country.value) {
        val = +row.Sex;
        leftover = 100 - val;
      }
    }
    new_data.push({ name: 'female', color: getColor('green-7'), y: val });
    new_data.push({ name: 'other', color: getColor('neutral-4'), y: leftover });

    return new_data;
  })
  const statsData = computed<any>(() => {
    let sample = 0;
    let age = 0;
    let preexisting = 0;
    let sex = 0;

    for (let row of mapDataRaw.value) {
      if (row.Country == selected_country.value) {
        age = row.Age;
        sample = row.Count;
        preexisting = row.Preexisting;
        sex = row.Sex;
      }
    }
    return {sample: sample, age: age, preexisting: preexisting, sex:sex}
  })
  const mapOptions = computed<Highcharts.Options>(() => {

    let options: Highcharts.Options = getMapOptions();

    options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
      var title = fCapital(this.key!);
      var value = this.point.value!;
      return '<text><span style="font-size: 1.1em"><strong>' + title + '</strong></span><br># of people: ' + value + '</text>';
    };
    options.plotOptions!.series = {
        events: {
          click: function (e: any) {
            if (selected_country.value == e.point.originalName) {
              selected_country.value = "World";
              deselectCountry();
            } else {
              selected_country.value = e.point.originalName;
            }
          }
        }
    };
    options.chart = {
      events: { // for when clicking on the background
        click: function (e: any) {
          selected_country.value = "World";
          // also deselect all points
          deselectCountry();
        }
      }
    };

    (options.series![0] as Highcharts.SeriesMapOptions).data = mapDataFiltered.value;

    return options;
  })
  const inter1SplineOptions = computed<Highcharts.Options>(() => {
    let options: Highcharts.Options = getGloSumSplineOptions();
    options.title!.text = "When [target] succeeds, I feel good";
    options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
      let [hum, neigh] = ['0', '0'];
      let [humTip, neighTip] = ["", ""]
      let points = this.points!;

      for (let point of points) {
        if (point.series.name == "all of humanity") {
          hum = numberFormatter(point.y!);
        } else if (point.series.name == "my neighborhood") {
          neigh = numberFormatter(point.y!);
        }
      }
      if (hum != '0') {
        humTip = '<br/>Humanity: ' + hum;
      }
      if (neigh != '0') {
        neighTip = '<br/>Neighborhood: ' + neigh;
      }

      let tip = '<text><b>' + Highcharts.dateFormat('%m/%d/%Y', this.x) + '</b>' + humTip + neighTip + '</text>';
      return tip;
    };
    options.series = [{
      type: 'spline',
      data: inter1_data_hum.value,
      id: "humanity",
      name: "all of humanity",
      color: getColor('yellow-4')
    },{
      type: 'spline',
      data: inter1_data_nei.value,
      id: "neighborhood",
      name: "my neighborhood",
      color: getColor('green-7')
    }];

    return options;
  })
  const inter2SplineOptions = computed<Highcharts.Options>(() => {
    let options: Highcharts.Options = getGloSumSplineOptions();
    options.title!.text= "[target] and I rise and fall together";
    options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
      let [hum, neigh] = ['0', '0'];
      let [humTip, neighTip] = ["", ""]
      let points = this.points!;

      for (let point of points) {
        if (point.series.name == "all of humanity") {
          hum = numberFormatter(point.y!);
        } else if (point.series.name == "my neighborhood") {
          neigh = numberFormatter(point.y!);
        }
      }
      if (hum != '0') {
        humTip = '<br/>Humanity: ' + hum;
      }
      if (neigh != '0') {
        neighTip = '<br/>Neighborhood: ' + neigh;
      }

      let tip = '<text><b>' + Highcharts.dateFormat('%m/%d/%Y', this.x) + '</b>' + humTip + neighTip + '</text>';
      return tip;
    };
    options.series = [{
      type: 'spline',
      data: inter2_data_hum.value,
      id: "humanity",
      name: "all of humanity",
      color: getColor('yellow-4')
    }, {
        type: 'spline',
        data: inter2_data_nei.value,
        id: "neighborhood",
        name: "my neighborhood",
      color: getColor('green-7')
      }];

    return options;
  })
  const willSplineOptions = computed<Highcharts.Options>(() => {
    let options: Highcharts.Options = getGloSumSplineOptions();
    options.title!.text = "Someone [target] is having their house fixed, so it isn't livable. How willing would you be to let them move into your house for a week?";
    options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
      let [hum, neigh] = ['0', '0'];
      let [humTip, neighTip] = ["", ""]
      let points = this.points!;

      for (let point of points) {
        if (point.series.name == "who is not a citizen of your own country") {
          hum = numberFormatter(point.y!);
        } else if (point.series.name == "from your neighborhood") {
          neigh = numberFormatter(point.y!);
        }
      }
      if (hum != '0') {
        humTip = '<br/>Who is not a citizen of your own country: ' + hum;
      }
      if (neigh != '0') {
        neighTip = '<br/>From your neighborhood: ' + neigh;
      }

      let tip = '<text><b>' + Highcharts.dateFormat('%m/%d/%Y', this.x) + '</b>' + humTip + neighTip + '</text>';
      return tip;
    };
    options.series = [{
      type: 'spline',
      data: will1_data_hum.value,
      id: "humanity",
      name: "who is not a citizen of your own country",
      color: getColor('yellow-4')
    }, {
      type: 'spline',
      data: will1_data_nei.value,
      id: "neighborhood",
      name: "from your neighborhood",
      color: getColor('green-7')
      }];

    return options;
  })
  const nbtSplineOptions = computed<Highcharts.Options>(() => {
    let options: Highcharts.Options = getGloSumSplineOptions();
    options.title!.text = "Helping [target] when they are in need is the right thing to do";
    options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
      let [hum, neigh] = ['0', '0'];
      let [humTip, neighTip] = ["", ""]
      let points = this.points!;

      for (let point of points) {
        if (point.series.name == "a displaced person who is not a citizen of your own country") {
          hum = numberFormatter(point.y!);
        } else if (point.series.name == "someone from your neighborhood") {
          neigh = numberFormatter(point.y!);
        }
      }
      if (hum != '0') {
        humTip = '<br/>Who is not a citizen of your own country: ' + hum;
      }
      if (neigh != '0') {
        neighTip = '<br/>From your neighborhood: ' + neigh;
      }

      let tip = '<text><b>' + Highcharts.dateFormat('%m/%d/%Y', this.x) + '</b>' + humTip + neighTip + '</text>';
      return tip;
    };

    options.series = [{
      type: 'spline',
      data: will2_data_hum.value,
      id: "humanity",
      name: "a displaced person who is not a citizen of your own country",
      color: getColor('yellow-4')
    }, {
      type: 'spline',
      data: will2_data_nei.value,
      id: "neighborhood",
      name: "someone from your neighborhood",
      color: getColor('green-7')
    }];

    return options;
  })
  const sexPieOptions = computed<Highcharts.Options>(() => {
    let options: Highcharts.Options = getSumPieOptions();
    (options.series![0] as Highcharts.SeriesMapOptions).data = sexData.value;
    return options;
  })
  const covidSplineOptions = computed<Highcharts.Options>(() => {
    let options: Highcharts.Options = getSumCovidSplineOptions();
    options.title!.text = chart_titles.value[0] + " (" + selected_country.value + ")";
    options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
      let cases = numberFormatter(this.points![0].y!);
      let deaths = numberFormatter(this.points![1].y!);
      let questionTip = ""
      let question = '0';
      let points = this.points;

      if (this.points!.length > 2) {
        question = numberFormatter(points![2].y!);
      }

      if (question != '0') {
        questionTip = '<br/>Average score: ' + question;
      }

      let tip = '<text><b>' + Highcharts.dateFormat('%m/%d/%Y', this.x) + '</b>' +
        '</b><br/>COVID-19 cases (7 day average): ' + cases +
        '<br/>COVID-19 deaths (7 day average): ' + deaths +
        questionTip + '</text>'
      return tip;
    };

    (options.series![0] as Highcharts.SeriesMapOptions).data = covid_cases_data.value;
    (options.series![0] as Highcharts.SeriesMapOptions).color = getColor('red-3');
    (options.series![1] as Highcharts.SeriesMapOptions).data = covid_deaths_data.value;
    (options.series![1] as Highcharts.SeriesMapOptions).color = getColor('red-5');
    (options.series![2] as Highcharts.SeriesMapOptions).data = covid_q_data.value;
    (options.series![2] as Highcharts.SeriesMapOptions).color = getColor('green-7');

    return options;
  })
  const ageSplineOptions = computed<Highcharts.Options>(() => {
    let options: Highcharts.Options = getGloSumSplineOptions();
    options.title!.text = chart_titles.value[1] + " (" + selected_country.value + ")";
    options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
      let [age1, age2, age3, age4, age5] = ['0', '0', '0', '0', '0'];
      let [age1tip, age2tip, age3tip, age4tip, age5tip, age6tip] = ["", "", "", "", "", ""]
      let points = this.points;

      for (let point of points!) {
        if (point.series.name == "18-21") {
          age1 = numberFormatter(point.y!);
        } else if (point.series.name == "22-25") {
          age2 = numberFormatter(point.y!);
        } else if (point.series.name == "26-35") {
          age3 = numberFormatter(point.y!);
        } else if (point.series.name == "36-50") {
          age4 = numberFormatter(point.y!);
        } else if (point.series.name == "50-80") {
          age5 = numberFormatter(point.y!);
        }
      }
      if (age1 != '0') {
        age1tip = '<br/>Aged 18-21: ' + age1;
      }
      if (age2 != '0') {
        age2tip = '<br/>Aged 22-25: ' + age2;
      }
      if (age3 != '0') {
        age3tip = '<br/>Aged 26-35: ' + age3;
      }
      if (age4 != '0') {
        age4tip = '<br/>Aged 36-50: ' + age4;
      }
      if (age5 != '0') {
        age5tip = '<br/>Aged 50-80: ' + age5;
      }

      let tip = '<text><b>' + Highcharts.dateFormat('%m/%d/%Y', this.x) + '</b>' +
        age1tip + age2tip + age3tip + age4tip + age5tip + age6tip + '</text>';
      return tip
    }
    options.series = [
      {
        type: 'spline',
        id: "age1",
        name: "18-21",
        color: getColor('green-7'),
        data: age1_data.value,
        label: {
          enabled: false,
          format: ''
        },
      },
      {
        type: 'spline',
        id: "age2",
        name: "22-25",
        color: getColor('green-5'),
        data: age2_data.value,
        label: {
          enabled: false,
          format: ''
        },
      },
      {
        type: 'spline',
        id: "age3",
        name: "26-35",
        color: getColor('green-3'),
        data: age3_data.value,
        label: {
          enabled: false,
          format: ''
        },
      },
      {
        type: 'spline',
        id: "age4",
        name: "36-50",
        color: getColor('yellow-2'),
        data: age4_data.value,
        label: {
          enabled: false,
          format: ''
        },
      },
      {
        type: 'spline',
        id: "age5",
        name: "51-80",
        color: getColor('yellow-4'),
        data: age5_data.value,
        label: {
          enabled: false,
          format: ''
        },
      },
    ]

    return options;
  })
  const sexSplineOptions = computed<Highcharts.Options>(() => {
    let options: Highcharts.Options = getGloSumSplineOptions();
    options.title!.text = chart_titles.value[2] + " (" + selected_country.value + ")";
    options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
      let [sex1, sex2, sex3] = ['0', '0', '0'];
      let [sex1tip, sex2tip, sex3tip] = ["", "", ""]
      let points = this.points!;

      for (let point of points) {
        if (point.series.name == "Male") {
          sex1 = numberFormatter(point.y!);
        } else if (point.series.name == "Female") {
          sex2 = numberFormatter(point.y!);
        } else if (point.series.name == "Other") {
          sex3 = numberFormatter(point.y!);
        }
      }
      if (sex1 != '0') {
        sex1tip = '<br/>Male: ' + sex1;
      }
      if (sex2 != '0') {
        sex2tip = '<br/>Female: ' + sex2;
      }
      if (sex3 != '0') {
        sex3tip = '<br/>Other: ' + sex3;
      }

      let tip = '<text><b>' + Highcharts.dateFormat('%m/%d/%Y', this.x) + '</b>' +
        sex1tip + sex2tip + sex3tip + '</text>';
      return tip;
    }
    options.series = [
      {
        type: 'spline',
        id: "sex1",
        name: "Male",
        color: getColor('green-7'),
        data: sex1_data.value,
        label: {
          enabled: false,
          format: ''
        },
      },
      {
        type: 'spline',
        id: "sex2",
        name: "Female",
        color: getColor('yellow-4'),
        data: sex2_data.value,
        label: {
          enabled: false,
          format: ''
        },
      },
      {
        type: 'spline',
        id: "sex3",
        name: "Other",
        color: getColor('neutral-3'),
        data: sex3_data.value,
        label: {
          enabled: false,
          format: ''
        },
      },
    ]

    return options;
  })
  const preexistingSplineOptions = computed<Highcharts.Options>(() => {
    let options: Highcharts.Options = getGloSumSplineOptions();
    options.title!.text = chart_titles.value[3] + " (" + selected_country.value + ")";
    options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
      let [infected1, infected2] = ['0', '0'];
      let [infected1tip, infected2tip] = ["", ""]
      let points = this.points!;

      for (let point of points) {
        if (point.series.name == "With preexisting condition(s)") {
          infected1 = numberFormatter(point.y!);
        } else if (point.series.name == "No preexisting conditions") {
          infected2 = numberFormatter(point.y!);
        }
      }
      if (infected1 != '0') {
        infected1tip = '<br/>With preexisting condition(s): ' + infected1;
      }
      if (infected2 != '0') {
        infected2tip = '<br/>No preexisting conditions: ' + infected2;
      }


      let tip = '<text><b>' + Highcharts.dateFormat('%m/%d/%Y', this.x) + '</b>' +
        infected1tip + infected2tip + '</text>';
      return tip;
    }
    options.series = [
      {
        type: 'spline',
        id: "preexisting1",
        name: "With preexisting condition(s)",
        color: getColor('green-7'),
        data: preexisting1_data.value,
        label: {
          enabled: false,
          format: ''
        },
      },
      {
        type: 'spline',
        id: "preexisting2",
        name: "No preexisting conditions",
        color: getColor('yellow-4'),
        data: preexisting2_data.value,
        label: {
          enabled: false,
          format: ''
        },
      },
    ]

    return options;
  })

  function loadData(): void {
    d3Fetch.csv("/csv/cclab/CCLAB-old-summary-map.csv").then((data: any[]): void => {
      mapDataRaw.value = data;
    });
    d3Fetch.csv("/csv/cclab/CCLAB-old-summary-vars.csv").then((data: any[]): void => {
      varsDataRaw.value = data;
    });
    d3Fetch.csv("/csv/cclab/CCLAB-old-summary-vars-detail.csv").then((data: any[]): void => {
      detailsDataRaw.value = data;
    });
  }
  function initialiseMaps(): void {
    let measureM = new Map<string, string>();
    measureM.set('How likely do you think it is that you will contract COVID19?', 'PerceptionsRisk');
    measureM.set('All of humanity and I rise and fall together', 'PFIHumanitySharedFate');
    measureM.set('My neighborhood and I rise and fall together', 'PFINeighSharedFate');
    measureM.set('When all of humanity succeeds, I feel good', 'PFIHumanityEmpathy');
    measureM.set('When my neighborhood succeeds, I feel good', 'PFINeighEmpathy');
    measureM.set('During a winter storm, someone from your neighborhood knocks on your door because their heating is out. How willing would you be to let them sleep in your living room for the night?', 'WillingnessNeigh');
    measureM.set('During a winter storm, a displaced person who is not a citizen of your own country knocks on your door because their heating is out. How willing would you be to let them sleep in your living room for the night?', 'WillingnessHumanity');
    measureM.set('Helping someone from my neighborhood when they are in need is the right thing to do', 'NBTNeigh');
    measureM.set('Helping a displaced person who is not a citizen of your own country when they are in need is the right thing to do', 'NBTHumanity');
    measureMap.value = measureM;

    let scaleM = new Map<string, string>();
    scaleM.set("How likely do you think it is that you will contract COVID19?", "(1=Not at all, 7=Extremely)");
    scaleM.set("All of humanity and I rise and fall together", "(1=Do not agree at all, 7=Strongly agree)");
    scaleM.set("My neighborhood and I rise and fall together", "(1=Do not agree at all, 7=Strongly agree)");
    scaleM.set("When all of humanity succeeds, I feel good", "(1=Do not agree at all, 7=Strongly agree)");
    scaleM.set("When my neighborhood succeeds, I feel good", "(1=Do not agree at all, 7=Strongly agree)");
    scaleM.set("During a winter storm, someone from your neighborhood knocks on your door because their heating is out. How willing would you be to let them sleep in your living room for the night?", "(1=Not at all, 7=Very willing)");
    scaleM.set("During a winter storm, a displaced person who is not a citizen of your own country knocks on your door because their heating is out. How willing would you be to let them sleep in your living room for the night?", "(1=Not at all, 7=Very willing)");
    scaleM.set("Helping someone from my neighborhood when they are in need is the right thing to do ", "(1 = Strongly disagree, 7 = Strongly agree)");
    scaleM.set("Helping a displaced person who is not a citizen of your own country when they are in need is the right thing to do", "(1=Strognly disagree, 7= Strongly agree)");
    scaleMap.value = scaleM;
  }
  function getMeasureArray(measure:string):any[] {
    let new_data:any[] = [];
    for (let row of varsDataRaw.value) {
      if (row.Country == selected_country.value && row.Measure == measure) {
        new_data = [[Date.UTC(2020, 2, 6, 0, 0, 0), +row.t1], [Date.UTC(2020, 2, 14, 0, 0, 0), +row.t2], [Date.UTC(2020, 2, 24, 0, 0, 0), +row.t3], [Date.UTC(2020, 3, 3, 0, 0, 0), +row.t4], [Date.UTC(2020, 3, 17, 0, 0, 0), +row.t5], [Date.UTC(2020, 4, 2, 0, 0, 0), +row.t6], [Date.UTC(2020, 4, 16, 0, 0, 0), +row.t7], [Date.UTC(2020, 4, 30, 0, 0, 0), +row.t8], [Date.UTC(2020, 5, 13, 0, 0, 0), +row.t9], [Date.UTC(2020, 5, 27, 0, 0, 0), +row.t10], [Date.UTC(2020, 6, 11, 0, 0, 0), +row.t11], [Date.UTC(2020, 6, 25, 0, 0, 0), +row.t12], [Date.UTC(2020, 7, 8, 0, 0, 0), +row.t13], [Date.UTC(2020, 7, 22, 0, 0, 0), +row.t14]]
      }
    }

    // removing 0's
    new_data.forEach(function (element, index) {
      if (element[1] === 0) {
        new_data[index][1] = null;
      }
    });
    return new_data;
  }
  function getBreakdownData(category:string, subcategory:string) {
    var new_data:any[] = [];
    for (let row of detailsDataRaw.value) {
      if (row.Country == selected_country.value && row.Measure == selected_measure.value && row.Category == category && row.Subcategory == subcategory) {
        new_data = [[Date.UTC(2020, 2, 6, 0, 0, 0), +row.t1], [Date.UTC(2020, 2, 14, 0, 0, 0), +row.t2], [Date.UTC(2020, 2, 24, 0, 0, 0), +row.t3], [Date.UTC(2020, 3, 3, 0, 0, 0), +row.t4], [Date.UTC(2020, 3, 17, 0, 0, 0), +row.t5], [Date.UTC(2020, 4, 2, 0, 0, 0), +row.t6], [Date.UTC(2020, 4, 16, 0, 0, 0), +row.t7], [Date.UTC(2020, 4, 30, 0, 0, 0), +row.t8], [Date.UTC(2020, 5, 13, 0, 0, 0), +row.t9], [Date.UTC(2020, 5, 27, 0, 0, 0), +row.t10], [Date.UTC(2020, 6, 11, 0, 0, 0), +row.t11], [Date.UTC(2020, 6, 25, 0, 0, 0), +row.t12], [Date.UTC(2020, 7, 8, 0, 0, 0), +row.t13], [Date.UTC(2020, 7, 22, 0, 0, 0), +row.t14]]
      }
    }
    // removing 0's
    new_data.forEach(function (element, index) {
      if (element[1] === 0) {
        new_data[index][1] = null;
      }
    });

    return new_data;
  }
  function deselectCountry(): void {
    let selected = document.querySelectorAll('.cclab-old-sum-map .highcharts-point-select');
    selected.forEach((item) => {
      item.classList.remove('highcharts-point-select');
    });
  }

  // all variables and functions should be added here
  return {
    mapDataRaw,
    varsDataRaw,
    detailsDataRaw,
    selected_country,
    all_questions,
    chart_titles,
    selected_question,
    measureMap,
    selected_measure,
    inter1_data_hum,
    inter1_data_nei,
    inter2_data_hum,
    inter2_data_nei,
    will1_data_hum,
    will1_data_nei,
    will2_data_hum,
    will2_data_nei,
    covid_q_data,
    covid_cases_data,
    covid_deaths_data,
    age1_data,
    age2_data,
    age3_data,
    age4_data,
    age5_data,
    sex1_data,
    sex2_data,
    sex3_data,
    preexisting1_data,
    preexisting2_data,
    sexData,
    statsData,
    scaleMap,
    mapOptions,
    inter1SplineOptions,
    inter2SplineOptions,
    willSplineOptions,
    nbtSplineOptions,
    sexPieOptions,
    covidSplineOptions,
    ageSplineOptions,
    sexSplineOptions,
    preexistingSplineOptions,
    loadData,
    initialiseMaps,
    getMeasureArray,
    getBreakdownData
  }
});

