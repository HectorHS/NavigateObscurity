// This store should manage all data for cclab
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import * as d3Fetch from "d3-fetch";
import { getComparisonPieOptions, getColor, getComparisonLineOptions, getComparisonHeatmapOptions, getComparisonBarOptions } from '@/helpers/cclabChartOptions.js';
import { numberFormatter } from '@/helpers/commonFunctions';
import Highcharts from 'highcharts';

export const useGlobalComparisonStore = defineStore('globalComparionStore', () => {
  const intsDataRaw = ref<any[]>([]);
  const lookupDataRaw = ref<any[]>([]);
  const descriptionsDataRaw = ref<any[]>([]);
  const all_dates = ref<string[]>([]);
  const all_variables = ref<string[]>([]);
  const descriptions_lookup = ref<string[]>([]);
  const timeMap = ref<Map<string, string> | undefined>(undefined);
  const longVariables = ref<string[]>(["Age", "Children", "Under12", "Over12", "SubjectiveSES",
    "LivingSituation", "RiskmanagementavoidComposite", "RiskmanagementreductionComposite",
    "NonfoodHave", "NonfoodWant", "FoodHave", "FoodWant", "PrepTimeCovidnotCOVID",
    "PrepTimeCovidtracking", "PrepTimeCovidtalking", "PrepTimeCovidnewrelationships",
    "PrepTimeCovidmedical", "PrepTimeCovidfood", "PrepTimeCovidwater", "PrepTimeCovidpower",
    "PrepTimeCovidhomedefense", "PrepTimeCovidfinancial", "PrepTimeCovidbarter", "PrepTimeCovidother",
    "PrepCOVIDPoliticalLeaders", "PrepCOVIDLocalGov", "PrepCOVIDNationalHealthcare", "PrepCOVIDLocalHealthcare",
    "PrepCOVIDNationalMedia", "PrepCOVIDLocalMedia", "PrepCOVIDAirline", "PrepCOVIDEmployer",
    "PrepCOVIDExtendedFamily", "PrepCOVIDSigOther", "PrepCOVIDParents", "PrepCOVIDSiblings",
    "Howmuch", "CloseFriendPFIEmpathyComposite", "AcqPFIEmpathyComposite", "NeighborPFIEmpathyComposite",
    "CountryPFIEmpathyComposite", "HumanityPFIEmpathyComposite", "CloseFriendPFISharedFAteComposite",
    "AcqPFISharedFAteComposite", "NeighborPFISharedFAteComposite", "CountryPFISharedFAteComposite",
    "HumanityPFISharedFAteComposite", "PSScomposite", "AnxietyComposite", "WillingnessNeighborComposite",
    "WillingnessCountryComposite", "WillingnessHumanityComposite", "PerceptionRiskComposite", "PerceptionManagementComposite",
    "CFICloseFriendComposite", "CFIAcqComposite", "CFINeighborComposite", "CFICountryComposite",
    "CFIHumanityComposite", "DiseaseAvoidanceComposite", "NBTNeighborComposite", "NBTHumanityComposite", "NBTCountryComposite",
    "Back2Normal", "MateSeekingComposite", "SocialDistanceComposite", "HoursworkedOutside", "HoursWorkHome", "HoursSpentOthers",
    "HoursInContact", "HoursVolunteer", "MoneyDonated", "aidindividuals", "aidsmallbusiness", "aidlargebusiness", "aidbanks",
    "aidgovernment", "RiskManagementcomposite", "WeeksAgoPrepare", "WeeksSinceCovid", "HowManyInfected",
    "MaskAttitudes1", "MaskAttitudes2", "MaskAttitudes3", "MaskAttitudes4", "MaskAttitudes5", "SafetyProtests",
    "MoneyProtests", "Movies", "Job1", "Job2", "Job3", "HowLongSocialDist", "HowLongMask", "Contacts24hrs",
    "Contacts7days", "Streneous", "Moderate", "Mild", "RMETcomposite", "PerspectiveTakingComposite",
    "PartnerEmpathyAcqComposite", "SharedAgencyAcqComposite", "Dggive", "HouseHold", "NewFriends", "LargeGroups",
    "AskingHelpComposite", "LikelyGiveHelpComposite", "RiskManagementProtestComposite",
    "TimesHelpGivenComposite", "HousingInsecurityComposite", "NeedForChaosComposite", "NeedForOrderComposite",
    "FoodInsecurityComposite", "UseGreenSpacesComposite", "ProportionWearMaskComposite", "CFCcomposite",
    "CFCcompositeFuture", "CFCcompositeImmediate", "PFISharedFateAcqComposite", "PFIempathyAcqComposite"
  ]);
  const avg3 = ref<string[]>(["HousingInsecurityComposite", "FoodInsecurityComposite", "UseGreenSpacesComposite"]);
  const avg4 = ref<string[]>(["AnxietyComposite", "SharedAgencyAcqComposite"]);
  const avg5 = ref<string[]>(["PSScomposite", "PerspectiveTakingComposite"]);
  const avg7 = ref<string[]>(["RiskmanagementavoidComposite", "RiskmanagementreductionComposite", "CloseFriendPFIEmpathyComposite",
    "AcqPFIEmpathyComposite", "NeighborPFIEmpathyComposite", "CountryPFIEmpathyComposite", "HumanityPFIEmpathyComposite",
    "CloseFriendPFISharedFAteComposite", "AcqPFISharedFAteComposite", "NeighborPFISharedFAteComposite",
    "CountryPFISharedFAteComposite", "HumanityPFISharedFAteComposite", "WillingnessNeighborComposite", "WillingnessCountryComposite",
    "WillingnessHumanityComposite", "PerceptionRiskComposite", "PerceptionManagementComposite", "DiseaseAvoidanceComposite",
    "NBTNeighborComposite", "NBTHumanityComposite", "NBTCountryComposite", "MateSeekingComposite", "SocialDistanceComposite",
    "RiskManagementcomposite", "PartnerEmpathyAcqComposite", "AskingHelpComposite", "LikelyGiveHelpComposite", "RiskManagementProtestComposite",
    "TimesHelpGivenComposite", "NeedForChaosComposite", "NeedForOrderComposite", "ProportionWearMaskComposite", "PFISharedFateAcqComposite",
    "PFIempathyAcqComposite"]);
  const avg33 = ref<string[]>(["CFICloseFriendComposite", "CFIAcqComposite", "CFINeighborComposite", "CFICountryComposite",
    "CFIHumanityComposite"]);
  const cat8 = ref<string[]>(["MaskAttitudes1", "MaskAttitudes2", "MaskAttitudes3", "MaskAttitudes4", "MaskAttitudes5", "SafetyProtests",
    "Job1", "Job2", "Job3"]);
  const cat9 = ref<string[]>(["SubjectiveSES", "LivingSituation"]);
  const cat10 = ref<string[]>(["PrepCOVIDPoliticalLeaders", "PrepCOVIDLocalGov", "PrepCOVIDNationalHealthcare",
    "PrepCOVIDLocalHealthcare", "PrepCOVIDNationalMedia", "PrepCOVIDLocalMedia", "PrepCOVIDAirline",
    "PrepCOVIDEmployer", "PrepCOVIDExtendedFamily", "PrepCOVIDSigOther", "PrepCOVIDParents", "PrepCOVIDSiblings",
    "RMETcomposite", "NewFriends"]);
  const cat10plus = ref<string[]>(["Streneous", "Moderate", "Mild", "HouseHold"]);
  const cat12 = ref<string[]>(["Back2Normal", "HowLongSocialDist", "HowLongMask"]);
  const cat20plus = ref<string[]>(["WeeksAgoPrepare", "WeeksSinceCovid"]);
  const cat50plus = ref<string[]>(["HoursworkedOutside", "HoursWorkHome",
    "HoursSpentOthers", "HoursInContact", "HoursVolunteer", "HowManyInfected", "MoneyProtests", "Movies",
    "Contacts24hrs", "CFCcompositeFuture", "CFCcompositeImmediate"]);
  const cat100 = ref<string[]>(["PrepTimeCovidnotCOVID", "PrepTimeCovidtracking", "PrepTimeCovidtalking",
    "PrepTimeCovidnewrelationships", "PrepTimeCovidmedical", "PrepTimeCovidfood", "PrepTimeCovidwater",
    "PrepTimeCovidpower", "PrepTimeCovidhomedefense", "PrepTimeCovidfinancial", "PrepTimeCovidbarter",
    "PrepTimeCovidother", "aidindividuals", "aidsmallbusiness", "aidlargebusiness", "aidbanks", "aidgovernment",
    "Dggive", "CFCcomposite"]);
  const cat100plus = ref<string[]>(["NonfoodHave", "NonfoodWant", "FoodHave", "FoodWant", "Contacts7days"]);
  const selectedVar1 = ref<string>('Stress');
  const selectedVar2 = ref<string>('PerceptionsRisk');
  const selectedDate = ref<string>('2020-08-22');

  const availableVar2 = computed<string[]>(() => {
    let data = [];
    if (lookupDataRaw.value.length > 0 && timeMap.value) {
      for (let row of lookupDataRaw.value) {
        if (row[timeMap.value.get(selectedDate.value)!] > 0) {
          data.push(row.Name);
        }
      }
    }
    return data;
  });
  const linesDataFiltered = computed<Highcharts.SeriesOptions[]>(() => {
    let data = [];
    let slice1 = getLinesDataSlice("one");
    let slice2 = getLinesDataSlice("two");

    data.push(slice1);
    data.push(slice2);
    return data;
  });
  const availableDates = computed<string[]>(() => {
    let dates = [];
    if (timeMap.value && lookupDataRaw.value.length > 0) {
      let slice = lookupDataRaw.value.filter(r => r.Name == selectedVar1.value);
      for (let d of all_dates.value) {
        if (slice[0][timeMap.value.get(d)!] > 0) {
          dates.push(d);
        }
      }
    }
    return dates;
  });
  const xCategories = computed<any[]>(() => {
    let cats = [];
    // Deal with variables with a lot of unique values
    if (longVariables.value.includes(selectedVar1.value)) {
      cats = getArrayForNewVariable(selectedVar1.value);
    } else {
      // fancy sorting to deal with numerical values
      cats = [...new Set(intsDataRaw.value.map(d => +d[selectedVar1.value]))];
      cats = removeEmpty(cats);
      cats = cats.sort((a, b) => +a - +b);
    }

    return cats;
  });
  const yCategories = computed<any[]>(() => {
    let cats = [];
    // Deal with variables with a lot of unique values
    if (longVariables.value.includes(selectedVar2.value)) {
      cats = getArrayForNewVariable(selectedVar2.value);
    } else {
      // fancy sorting to deal with numerical values
      cats = [...new Set(intsDataRaw.value.map(d => d[selectedVar2.value]))];
      cats = removeEmpty(cats);
      cats = cats.sort((a, b) => +a - +b);
    }

    return cats;
  });
  const heatmapDataFiltered = computed<any[]>(() => {
    let xaxis = xCategories.value;
    let yaxis = yCategories.value;
    let xLoops;
    let yLoops;
    let data: any[] = [];

    // define loops - we will be skipping last one for long variables
    if (longVariables.value.includes(selectedVar1.value)) {
      xLoops = xaxis.length - 1;
    } else {
      xLoops = xaxis.length;
    }
    if (longVariables.value.includes(selectedVar2.value)) {
      yLoops = yaxis.length - 1;
    } else {
      yLoops = yaxis.length;
    }
    let slice = intsDataRaw.value.filter(r => r.Date == selectedDate.value);

    for (let x = 0; x < xLoops; x++) {
      for (let y = 0; y < yLoops; y++) {
        let slice2;
        if (longVariables.value.includes(selectedVar1.value) && longVariables.value.includes(selectedVar2.value)) {
          slice2 = slice.filter(row => +row[selectedVar1.value] >= xaxis[x] && +row[selectedVar1.value] < xaxis[x + 1] && +row[selectedVar2.value] >= yaxis[y] && +row[selectedVar2.value] < yaxis[y + 1]);
        } else if (longVariables.value.includes(selectedVar1.value)) {
          slice2 = slice.filter(row => +row[selectedVar1.value] >= xaxis[x] && +row[selectedVar1.value] < xaxis[x + 1] && row[selectedVar2.value] == yaxis[y]);
        } else if (longVariables.value.includes(selectedVar2.value)) {
          slice2 = slice.filter(row => row[selectedVar1.value] == xaxis[x] && +row[selectedVar2.value] >= yaxis[y] && +row[selectedVar2.value] < yaxis[y + 1]);
        } else {
          slice2 = slice.filter(r => r[selectedVar1.value] == xaxis[x] && r[selectedVar2.value] == yaxis[y]);
        }
        data.push([x, y, slice2.length]);
      }
    }
    return data;
  });
  const barsDataFiltered = computed<any[]>(() => {
    let yaxis;
    let all_data:any[] = [];
    if (longVariables.value.includes(selectedVar2.value)) {
      yaxis = getCategoriesForNewVariable(selectedVar2.value);
    } else {
      yaxis = yCategories.value;
    }

    for (let i = 0; i < yaxis.length; i++) {
      let name = selectedVar2.value + ": " + yaxis[i];
      let data = [];
      for (let d of heatmapDataFiltered.value) {
        if (d[1] == i) {
          data.push(d[2]);
        }
      }
      let slice;
      let colorIndex = i + 1;
      slice = { name: name, data: data, color: getColor('green-' + colorIndex) };

      all_data.push(slice);
    }
    return all_data;
  });
  const barXAxis = computed<any>(() => {
    let bands = [];
    let style = {
      color: '#0d0d0d',
      fontFamily: 'Quantico',
      fontWeight: 'normal'
    };

    if (xCategories.value.length < 8) {
      for (let i = 0; i < xCategories.value.length; i++) {
        let from = i - 0.5;
        let to = i + 0.5;
        let colorIndex = i + 1;
        let band = { from: from, to: to, color: getColor('yellow-' + colorIndex), className: 'bar-band'};
        bands.push(band);
      }
    }
    let axis = {
      categories: xCategories.value,
      title: {
        text: selectedVar1.value,
        style: style
      },
      plotBands: bands,
      lineWidth: 0,
      tickLength: 0,
      gridLineColor: '#000000',
      gridLineWidth: 0.1,
      labels: {
        style: style,
        enabled: true,
      },
    }
    return axis;
  });
  const pie1Options = computed<Highcharts.Options>(() => {
    let options = getComparisonPieOptions();
    options.title!.text = "<strong>" + selectedVar1.value + "</strong> - breakdown of responses";
    options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
      return '<text><strong>' + selectedVar1.value + "[" + this.key + "] </strong><br># of respondents: " + this.y + "<br>% of respondents: " + numberFormatter(this.percentage) + '%</text>';
    }

    options.series = [{
      type: 'pie',
      name: "Variable1",
      innerSize: '40%',
      data: getPieData("one")
    }]

    return options;
  });
  const pie2Options = computed<Highcharts.Options>(() => {
    let options = getComparisonPieOptions();
    options.title!.text = "<strong>" + selectedVar2.value + "</strong> - breakdown of responses";
    options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
      return '<text><strong>' + selectedVar2.value + "[" + this.key + "] </strong><br># of respondents: " + this.y + "<br>% of respondents: " + numberFormatter(this.percentage) + '%</text>';
    }

    options.series = [{
      type: 'pie',
      name: "Variable2",
      innerSize: '40%',
      data: getPieData("two")
    }]

    return options;
  });
  const lineOptions = computed<Highcharts.Options>(() => {
    let options = getComparisonLineOptions();
    options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
      let [var1, var2] = ["", ""];
      let [var1Tip, var2Tip] = ["", ""]
      let points = this.points;

      for (let point of points!) {
        if (point.series.name == selectedVar1.value) {
          var1 = numberFormatter(point.y);
        } else if (point.series.name == selectedVar2.value) {
          var2 = numberFormatter(point.y);
        }
      }
      if (+var1 > 0) {
        var1Tip = '<br/>' + selectedVar1.value + ': ' + var1;
      }
      if (+var2 > 0) {
        var2Tip = '<br/>' + selectedVar2.value + ': ' + var2;
      }

      let tip = '<text><b>' + this.x + '</b>' +
        var1Tip + var2Tip + '</text>';
      return tip;
    };

    (options.xAxis as Highcharts.XAxisOptions).categories = all_dates.value;
    options.series = linesDataFiltered.value;
    return options;
  });
  const heatmapOptions = computed<Highcharts.Options>(() => {
    let options = getComparisonHeatmapOptions();
    let max = 0;

    options.title!.text = 'Frequency of <strong>' + selectedVar1.value + "</strong> and <strong>" + selectedVar2.value + "</strong> response combinations";
    (options.xAxis as Highcharts.XAxisOptions).categories = xCategories.value;
    (options.xAxis as Highcharts.XAxisOptions).title!.text = selectedVar1.value;
    (options.yAxis as Highcharts.YAxisOptions).categories = yCategories.value;
    (options.yAxis as Highcharts.YAxisOptions).title!.text = selectedVar2.value;
    options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
      return '<text>' + selectedVar1.value + ": " + xCategories.value[this.point.x] + "<br>" + selectedVar2.value + ": " + yCategories.value[this.point.y] + "<br>" + "# of individuals: " + this.point.value + '</text>';
    }
    options.series = [{
      type: 'heatmap',
      data: heatmapDataFiltered.value
    }];

    if (heatmapDataFiltered.value.length > 0) {
      for (let d of heatmapDataFiltered.value) {
        if (d[2] > max) {
          max = d[2];
        }
      }
    }
    (options.colorAxis as Highcharts.ColorAxisOptions).max = max;

    return options;
  });
  const barOptions = computed<Highcharts.Options>(() => {
    let options = getComparisonBarOptions();
    options.title!.text = 'Frequency of <strong>' + selectedVar2.value + "</strong> responses, for each <strong>" + selectedVar1.value + "</strong> response";
    options.xAxis = barXAxis.value;
    options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
      return '<text>' + selectedVar1.value + ": " + xCategories.value[this.point.x] + "<br>" + this.series.name + "<br>" + "# of individuals: " + this.point.y + '</text>';
    }
    options.series = barsDataFiltered.value;

    return options;
  });
  const stats = computed<any>(() => {
    let stats:any = {};
    let sample = 0;
    let contacts = 0;
    let covid = 0;
    let pre = 0;

    for (let row of intsDataRaw.value) {
      if (row.Date == selectedDate.value && row[selectedVar1.value] && row[selectedVar2.value]) {
        sample++;
        if (row.Preexisting == 1) {
          pre++;
        }
        if (row.WeeksSinceCovid > 0) {
          covid++;
        }
        if (row.KnowSomeoneInfected == 3 || row.HowManyInfected > 0) {
          contacts++;
        }
      }
    }
    stats.sample = sample;
    stats.contacts = contacts;
    stats.covid = covid;
    stats.pre = pre;
    return stats;
  });
  const validCombo = computed<boolean>(() => {
    let valid = false;
    if (lookupDataRaw.value.length > 0 && selectedVar2.value && timeMap.value)
    for (let row of lookupDataRaw.value) {
      if (row.Name == selectedVar2.value) {
        if (row[timeMap.value.get(selectedDate.value)!] > 0) {
          valid = true;
        }
      }
    }

    return valid;
  });
  function loadData(): void {
    d3Fetch.csv("/csv/cclab/CCLAB-old-ints.csv").then((data: any[]): void => {
      intsDataRaw.value = data;
      all_dates.value = [...new Set(data.map(d => d.Date))];
      all_variables.value = data.columns;
      all_variables.value.splice(0, 2);
    });
    d3Fetch.csv("/csv/cclab/CCLAB-lookup-glo-lookup.csv").then((data: any[]): void => {
      lookupDataRaw.value = data;
    });
    d3Fetch.csv("/csv/cclab/CCLAB-lookup-glo-descriptions.csv").then((data: any[]): void => {
      descriptionsDataRaw.value = data;
      for (let row of data) {
        descriptions_lookup.value[row.key] = row.description + " (" + row.response + ")";
      }
    });
  }
  function initialiseMaps(): void {
    let map = new Map<string, string>();
    map.set("2020-03-06", "t1");
    map.set("2020-03-14", "t2");
    map.set("2020-03-24", "t3");
    map.set("2020-04-03", "t4");
    map.set("2020-04-17", "t5");
    map.set("2020-05-02", "t6");
    map.set("2020-05-16", "t7");
    map.set("2020-05-30", "t8");
    map.set("2020-06-13", "t9");
    map.set("2020-06-27", "t10");
    map.set("2020-07-11", "t11");
    map.set("2020-07-25", "t12");
    map.set("2020-08-08", "t13");
    map.set("2020-08-22", "t4",);
    timeMap.value = map;

  }
  function getLinesDataSlice(number:string):Highcharts.SeriesOptions {
    let d1v = 0;
    let d1c = 0;
    let d2v = 0;
    let d2c = 0;
    let d3v = 0;
    let d3c = 0;
    let d4v = 0;
    let d4c = 0;
    let d5v = 0;
    let d5c = 0;
    let d6v = 0;
    let d6c = 0;
    let d7v = 0;
    let d7c = 0;
    let d8v = 0;
    let d8c = 0;
    let d9v = 0;
    let d9c = 0;
    let d10v = 0;
    let d10c = 0;
    let d11v = 0;
    let d11c = 0;
    let d12v = 0;
    let d12c = 0;
    let d13v = 0;
    let d13c = 0;
    let d14v = 0;
    let d14c = 0;
    let data = [];
    let variable;
    let color;
    if (number == "one") {
      variable = selectedVar1.value;
      color = getColor('yellow-4');
    } else {
      variable = selectedVar2.value;
      color = getColor('green-5');
    }

    for (let row of intsDataRaw.value) {
      let val = +row[variable];
      if (row.Date == "2020-03-06" && val > 0) {
        d1v += val;
        d1c++;
      }
      else if (row.Date == "2020-03-14" && val > 0) {
        d2v += val;
        d2c++;
      }
      else if (row.Date == "2020-03-24" && val > 0) {
        d3v += val;
        d3c++;
      }
      else if (row.Date == "2020-04-03" && val > 0) {
        d4v += val;
        d4c++;
      }
      else if (row.Date == "2020-04-17" && val > 0) {
        d5v += val;
        d5c++;
      }
      else if (row.Date == "2020-05-02" && val > 0) {
        d6v += val;
        d6c++;
      }
      else if (row.Date == "2020-05-16" && val > 0) {
        d7v += val;
        d7c++;
      }
      else if (row.Date == "2020-05-30" && val > 0) {
        d8v += val;
        d8c++;
      }
      else if (row.Date == "2020-06-13" && val > 0) {
        d9v += val;
        d9c++;
      }
      else if (row.Date == "2020-06-27" && val > 0) {
        d10v += val;
        d10c++;
      }
      else if (row.Date == "2020-07-11" && val > 0) {
        d11v += val;
        d11c++;
      }
      else if (row.Date == "2020-07-25" && val > 0) {
        d12v += val;
        d12c++;
      }
      else if (row.Date == "2020-08-08" && val > 0) {
        d13v += val;
        d13c++;
      }
      else if (row.Date == "2020-08-22" && val > 0) {
        d14v += val;
        d14c++;
      }
    }

    data.push((d1v > 0) ? +numberFormatter(d1v / d1c) : 0);
    data.push((d2v > 0) ? +numberFormatter(d2v / d2c) : 0);
    data.push((d3v > 0) ? +numberFormatter(d3v / d3c) : 0);
    data.push((d4v > 0) ? +numberFormatter(d4v / d4c) : 0);
    data.push((d5v > 0) ? +numberFormatter(d5v / d5c) : 0);
    data.push((d6v > 0) ? +numberFormatter(d6v / d6c) : 0);
    data.push((d7v > 0) ? +numberFormatter(d7v / d7c) : 0);
    data.push((d8v > 0) ? +numberFormatter(d8v / d8c) : 0);
    data.push((d9v > 0) ? +numberFormatter(d9v / d9c) : 0);
    data.push((d10v > 0) ? +numberFormatter(d10v / d10c) : 0);
    data.push((d11v > 0) ? +numberFormatter(d11v / d11c) : 0);
    data.push((d12v > 0) ? +numberFormatter(d12v / d12c) : 0);
    data.push((d13v > 0) ? +numberFormatter(d13v / d13c) : 0);
    data.push((d14v > 0) ? +numberFormatter(d14v / d14c) : 0);

    // to hide 0's
    data.forEach(function (element, index) {
      if (element === 0) {
        data[index] = null;
      }
    });

    let slice = { name: variable, data: data, color: color, type: 'spline' };
    return slice;
  }
  function removeEmpty(array: any[]): any[] {
    for (let i = 0; i < array.length; i++) {
      if (array[i] == "" || array[i] == " ") {
        array.splice(i, 1);
        removeEmpty(array);
      }
    }
    return array;
  }
  function getArrayForNewVariable(variable:string):number[] {
    let array: number[] = [];
    if (variable == "Age") {
      array = [18, 21, 26, 31, 41, 51, 100];
    } else if (cat8.value.includes(variable)) {
      array = [1, 3, 5, 7, 9];
    } else if (cat10.value.includes(variable) || cat9.value.includes(variable)) {
      array = [1, 3, 5, 7, 9, 11];
    } else if (cat10plus.value.includes(variable)) {
      array = [0, 1, 3, 5, 7, 9, 11, 1000];
    } else if (cat12.value.includes(variable)) {
      array = [1, 3, 5, 7, 9, 11, 13];
    } else if (cat20plus.value.includes(variable)) {
      array = [0, 1, 6, 11, 16, 21, 1000];
    } else if (cat50plus.value.includes(variable)) {
      array = [0, 1, 11, 21, 31, 41, 51, 1000];
    } else if (cat100.value.includes(variable)) {
      array = [0, 21, 41, 61, 81, 101];
    } else if (cat100plus.value.includes(variable)) {
      array = [0, 1, 11, 31, 51, 71, 101, 1000];
    } else if (avg3.value.includes(variable)) {
      array = [1, 1, 2, 3, 4];
    } else if (avg4.value.includes(variable)) {
      array = [1, 2, 3, 4, 5];
    } else if (avg5.value.includes(variable)) {
      array = [1, 2, 3, 4, 5, 6];
    } else if (avg7.value.includes(variable)) {
      array = [1, 2, 3, 4, 5, 6, 7, 8];
    } else if (avg33.value.includes(variable)) {
      array = [-3, -2, -1, 0, 1, 2, 4];
    } else if (variable == "Children") {
      array = [0, 1, 2, 3, 4, 5, 50];
    } else if (variable == "Under12") {
      array = [0, 1, 2, 3, 4, 5];
    } else if (variable == "Over12") {
      array = [0, 1, 2, 3, 4, 5, 6];
    } else if (variable == "Howmuch") {
      array = [0, 1, 26, 51, 101, 201, 501, 10000];
    } else if (variable == "MoneyDonated") {
      array = [0, 1, 26, 51, 101, 201, 501, 10000];
    } else if (variable == "LargeGroups") {
      array = [0, 1, 6, 11, 21, 51, 10000];
    }
    return array;
  }
  function getCategoriesForNewVariable(parameter:string):string[] {
    let cats:string[] = [];
    if (parameter == "Age") {
      cats = ["18-20", "21-25", "26-30", "31-40", "41-50", "51+"];
    } else if (cat8.value.includes(parameter)) {
      cats = ["1-2", "3-4", "5-6", "7-8"];
    } else if (cat9.value.includes(parameter)) {
      cats = ["1-2", "3-4", "5-6", "7-8", "9"];
    } else if (cat10.value.includes(parameter)) {
      cats = ["1-2", "3-4", "5-6", "7-8", "9-10"];
    } else if (cat10plus.value.includes(parameter)) {
      cats = ["0", "1-2", "3-4", "5-6", "7-8", "9-10", "11+"];
    } else if (cat12.value.includes(parameter)) {
      cats = ["1-2", "3-4", "5-6", "7-8", "9-10", "11-12"];
    } else if (cat20plus.value.includes(parameter)) {
      cats = ["0", "1-5", "6-10", "11-15", "16-20", "20+"];
    } else if (cat50plus.value.includes(parameter)) {
      cats = ["0", "1-10", "11-20", "21-30", "31-40", "40-50", "51+"];
    } else if (cat100.value.includes(parameter)) {
      cats = ["0-20", "21-40", "41-60", "61-80", "81-100"];
    } else if (cat100plus.value.includes(parameter)) {
      cats = ["0", "1-10", "11-30", "31-50", "51-70", "71-100", "100+"];
    } else if (avg4.value.includes(parameter)) {
      cats = ["1-2", "2-3", "3-4", "4"];
    } else if (avg3.value.includes(parameter)) {
      cats = ["1", "1-2", "2-3", "3"];
    } else if (avg5.value.includes(parameter)) {
      cats = ["1-2", "2-3", "3-4", "4-5", "5"];
    } else if (avg7.value.includes(parameter)) {
      cats = ["1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7"];
    } else if (avg33.value.includes(parameter)) {
      cats = ["-3 to -2", "-2 to -1", "-1 to 0", "0 to 1", "1 to 2", "2 to 3"];
    } else if (parameter == "Children") {
      cats = ["0", "1", "2", "3", "4", "5+"];
    } else if (parameter == "Under12") {
      cats = ["0", "1", "2", "3", "4"];
    } else if (parameter == "Over12") {
      cats = ["0", "1", "2", "3", "4", "5"];
    } else if (parameter == "Howmuch") {
      cats = ["0", "1-25", "26-50", "51-100", "101-200", "201-500", "500+"];
    } else if (parameter == "MoneyDonated") {
      cats = ["0", "1-25", "26-50", "51-100", "101-200", "201-500", "500+"];
    } else if (parameter == "LargeGroups") {
      cats = ["0", "1-5", "6-10", "11-20", "21-50", "51+"];
    }
    return cats;
  }
  function getPieData(number:string):any[] {
    let data = [];
    let series = [];
    let variable;
    let color;
    let cats:number[] = [];

    if (number == "one") {
      variable = selectedVar1.value;
      color = 'yellow-';
      cats = xCategories.value;
    } else  {
      variable = selectedVar2.value;
      color = 'green-';
      cats = yCategories.value;
    }

    if (longVariables.value.includes(variable)) {
      for (let i = 0; i < cats.length - 1; i++) {
        let counter = 0

        // In case our categories start from 0, otherwise empty values are counted as zeroes
        if (cats[i] == 0) {
          for (let row of intsDataRaw.value) {
            if (row.Date == selectedDate.value && row[variable] == "0") {
              counter++;
            } else if (row.Date == selectedDate.value && +row[variable] > cats[i] && +row[variable] < cats[i + 1]) {
              counter++;
            }
          }
        } else {
          for (let row of intsDataRaw.value) {
            if (row.Date == selectedDate.value && +row[variable] >= cats[i] && +row[variable] < cats[i + 1]) {
              counter++;
            }
          }
        }
        data.push(counter);
      }
    } else {
      for (let val of cats) {
        let counter = 0
        for (let row of intsDataRaw.value) {
          if (row.Date == selectedDate.value && +row[variable] == val) {
            counter++;
          }
        }
        data.push(counter);
      }
    }

    if (longVariables.value.includes(variable)) {
      let varCats = getCategoriesForNewVariable(variable);
      for (let i = 0; i < cats.length - 1; i++) {

        let slice = { name: varCats[i], y: data[i], color: getColor(color + i) };
        series.push(slice);
      }
    } else {
      for (let i = 0; i < cats.length; i++) {

        let slice = { name: cats[i], y: data[i], color: getColor(color + i) };
        series.push(slice);
      }
    }

    return series;
  }

// all variables and functions should be added here
  return {
    intsDataRaw,
    lookupDataRaw,
    descriptionsDataRaw,
    timeMap,
    all_variables,
    all_dates,
    descriptions_lookup,
    longVariables,
    avg3,
    avg4,
    avg5,
    avg7,
    avg33,
    cat8,
    cat9,
    cat10,
    cat12,
    cat100,
    cat10plus,
    cat20plus,
    cat50plus,
    cat100plus,
    selectedVar1,
    selectedVar2,
    selectedDate,
    availableDates,
    availableVar2,
    validCombo,
    linesDataFiltered,
    heatmapDataFiltered,
    barsDataFiltered,
    barXAxis,
    pie1Options,
    pie2Options,
    lineOptions,
    heatmapOptions,
    barOptions,
    stats,
    xCategories,
    yCategories,
    loadData,
    initialiseMaps,
    getLinesDataSlice,
    removeEmpty,
    getArrayForNewVariable,
    getPieData,
  }
});

