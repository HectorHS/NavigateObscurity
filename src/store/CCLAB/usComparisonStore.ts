// This store should manage all data for cclab
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import * as d3Fetch from "d3-fetch";
import { getComparisonPieOptions, getColor, getComparisonUsLineOptions, getComparisonHeatmapOptions, getComparisonBarOptions } from '@/helpers/cclabChartOptions.js';
import { numberFormatter, fCapital } from '@/helpers/commonFunctions';
import Highcharts from 'highcharts';

export const useUsComparisonStore = defineStore('usComparionStore', () => {
  const intsDataRaw = ref<any[]>([]);
  const lookupDataRaw = ref<any[]>([]);
  const descriptionsDataRaw = ref<any[]>([]);
  const covidDataRaw = ref<any[]>([]);
  const all_dates = ref<string[]>([]);
  const all_variables = ref<string[]>([]);
  const descriptions_lookup = ref<string[]>([]);
  const longVariables = ref<string[]>(["Age", "SSES", "Children", "ChildrenUnder18",
    "MoveChildhood", "Move", "NumberInHouse", "WeekSinceCovid", "ContactsInfected",
    "Contacts24hrs", "Contacts7days", "TimeSinceHelpOlder", "TimeSpentOthers", "MoneyDonated",
    "Back2Normal", "OthersVaccine", "TimeToVaccine", "Income", "Savings",
    "Assests", "PFIaffectNeigh", "PFIaffectCountry", "PFIsharedfateNeigh", "PFIsharedfateCountry",
    "CovidSymptoms", "HelpGiven", "HelpReceived", "MutualAid", "EmpatheticConcern",
    "EmpatheticDistress", "Predictability", "Repayment", "Challenges", "Wealth",
    "TraitEmpathicConcern", "TraitEmpathicdistress", "BeliefInConspiracy", "PoliticalOrientation",
    "DiscountingRate", "SmallSooner", "LargerSooner", "@00025.1", "@00039.1", "@00098.1",
    "@0021.1", "@0034.1", "@0055.1", "@0087.1", "@013.1", "@02.1", "@025.1", "RiskReduction",
    "RiskAvoidance", "RiskRetention", "RiskTransfer", "HowManyTG", "NotHouseHoldTG", "ReasonHelp",
    "RiskBehaviorComposite", "CFC.Future", "CFC.Immediate", "CFC.Composite", "HourSleep",
    "TimeTilNewPandemic", "CausesExtinction1", "CausesExtinction2", "CausesExtinction3",
    "CausesExtinction4", "CausesExtinction5", "CausesExtinction6", "CausesExtinction8",
    "CausesExtinction9", "CausesExtinction10", "ReactanceComposite", "EntitlementComposite",
    "VaccineTV", "VaccinePeers", "VaccineRightThing", "TimeToVaccine", "Optimistic1", "Optimistic2",
    "Optimistic3", "Optimistic4", "Optimistic5", "Optimistic6", "Optimistic7", "Optimistic8",
    "Optimistic9", "AloneTime", "b5_extroversion", "b5_agreeable", "b5_conscientious", "b5_negemotion",
    "b5_openness", "Inches", "Weight", "PostVaccineActivity1", "PostVaccineActivity2", "PostVaccineActivity3", "PostVaccineActivity4",
    "PostVaccineActivity5", "PostVaccineActivity6", "PostVaccineActivity7", "PostVaccineActivity8", "PostVaccineActivity9",
    "PostVaccineActivity10", "PostVaccineActivity11", "PostVaccineActivity12", "PostVaccineActivity13", "PostVaccineActivity14",
    "PostVaccineActivity15", "PostVaccineActivity16", "EffortLive", "NoEffortLive", "LifeExpectancy",
    "QAnon1", "QAnon2", "QAnon3", "FeetToInches", "InchesTotal", "Height", "Mortality1", "Mortality2",
    "Mortality3", "Mortality4", "Mortality5", "Mortality6", "Mortality7", "Mortality8", "PositiveRightNow1",
    "PositiveRightNow2", "PositiveLife1", "PositiveLife2", "PositiveLife3", "PositiveLife4", "PositiveLife5",
    "PositiveLife6", "PositiveWorld1", "PositiveWorld2", "PositiveWorld3", "PositiveWorld4", "PositiveWorld5",
    "PositiveWorld6", "PositiveWorld7", "PositiveWorld8", "PositiveWorld9", "SoPA", "SoNA", "NoMaskOutVacc",
    "MaskOutPoliOri", "MaskOutVacc", "NoMaskInPoliOri", "NoMaskInVacc", "MaskInPoliOri", "MaskInVacc",
    "OthersJudgeMask", "JudgeWearMask", "PositiveLifePast1", "PositiveLifePast2", "PositiveLifePast3", "PositiveLifePast4",
    "PositiveLifePast5", "PositiveWorldPast1", "PositiveWorldPast2", "PositiveWorldPast3", "PositiveWorldPast4",
    "PositiveWorldPast5", "PositiveWorldPast6", "PositiveWorldPast7", "PositiveWorldPast8", "FriendsRisks1",
    "FriendsRisks2", "FriendsRisks3", "FriendsRisks4", "FriendsRisks5", "FriendsRisks6", "FriendsRisks7",
    "LifeOrientation", "Loneliness", "OptimisticEvent", "TimeToEventYears", "TimeToEventWeeks", "TimeToEventDays",
    "Closure", "MonthRelStatus", "MonthChangeJob", "TechVSconsume", "SelfEnhancement", "AnticipatedFoodScarcity",
    "FoodInsecurity", "VaccineUSRightThing", "VaccineLocalRightThing", "Booster", "BoosterLocalArea", "Identities1",
    "Identities2", "Identities3", "Identities4", "Identities5", "EffortHealth", "PositiveNegative1", "PositiveNegative2",
    "Certain1", "Certain2", "CertainFutureLife1", "CertainFutureLife4", "CertainFutureLife5", "CertainFutureLife6",
    "CertainFutureWorld1", "CertainFutureWorld2", "CertainFutureWorld4", "CertainFutureWorld5", "CertainFutureWorld6",
    "CertainFutureWorld7", "CertainFutureWorld8", "Promotion", "Prevention", "tot_t13", "tot_t9", "tot_t11", "tot_t12",
    "PFINeighAffectTimeFirstClick", "PFINeighAffectTimeLastClick", "PFINeighAffectTimePageSubmit", "PFINeighAffectTimeClickCount",
    "PFINeighFateTimeFirstClick", "HelpNeighTimeFirstClick", "PFIcountryAffectTimeFirstClick", "PFIcountryFateTimeFirstClick",
    "PFINeighFateTimeLastClick", "HelpNeighTimeLastClick", "PFIcountryAffectTimeLastClick", "PFIcountryFateTimeLastClick",
    "PFINeighFateTimePageSubmit", "HelpNeighTimePageSubmit", "PFIcountryAffectTimePageSubmit", "PFIcountryFateTimePageSubmit",
    "PFINeighFateTimeClickCount", "HelpNeighTimeClickCount", "PFIcountryAffectTimeClickCount", "PFIcountryFateTimeClickCount",
    "HelpCountryTimeFirstClick", "HelpCountryTimeLastClick", "HelpCountryTimePageSubmit", "HelpCountryTimeClickCount",
    "FarXmas1", "PrepXmas1", "FamilyXmas1", "ShareResponsibility1", "HowManyXmas", "NotHouseHoldXmas", "tot_t14",
    "PositivePast3", "tot_t15", "MoralCircles1", "MoralCircles2", "MoralCircles3", "MoralCircles4", "MoralCircles5",
    "MoralCircles6", "MoralCircles7", "MoralCircles8", "MoralCircles9", "MoralCircles10", "MoralCircles11", "MoralCircles12",
    "MoralCircles13", "MoralCircles14", "MoralCircles15", "MoralCircles16", "SpeedTime1", "SpeedTime2", "SpeedTime3", "SpeedTime4",
    "SpeedTime5", "LengthTime1", "LengthTime2", "TimePassed1", "TimePassed2", "Hope1", "Hope2", "Hope3", "Hope4", "Hope5", "Hope6",
    "Flourishing1", "Flourishing2", "Flourishing3", "Flourishing4", "Flourishing6", "Flourishing7", "Flourishing8", "Flourishing9",
    "Flourishing10", "Flourishing11", "Flourishing12", "Dominance", "Prestige", "AgenticGoal", "CommunalGoal", "PastFocus",
    "PresentFocus", "FutureFocus", "HopeAgency", "HopePathways", "StateHopeTotal", "tot_t16", "RecentContactsInfect",
    "Efficacy1", "Efficacy2", "Efficacy3", "Efficacy4", "Efficacy5", "Efficacy6", "Efficacy7", "Efficacy8", "Efficacy9",
    "Efficacy10", "Efficacy11", "Efficacy12", "Efficacy13", "Efficacy14", "Efficacy15", "Efficacy16", "Efficacy17", "Efficacy18",
    "Efficacy19", "Efficacy20", "Efficacy22", "Efficacy23", "Efficacy24", "Efficacy25", "Efficacy26", "Efficacy27", "Efficacy28",
    "Efficacy29", "Efficacy30", "Efficacy32", "HelpYou", "HelpChild", "HelpDog", "HelpPig", "NewPandemic1", "Asteroid6",
    "UncontrollableRisk1", "UncontrollableRisk2", "UncontrollableRisk3", "EffortSurvival"
  ]);
  const avg4 = ref<string[]>(["Repayment"]);
  const avg5 = ref<string[]>(["HelpGiven", "HelpReceived", "MutualAid", "Predictability", "TraitEmpathicConcern",
    "TraitEmpathicdistress", "BeliefInConspiracy", "ReactanceComposite", "b5_extroversion",
    "b5_agreeable", "b5_conscientious", "b5_negemotion", "b5_openness", "Promotion", "Prevention"]);
  const avg6 = ref<string[]>(["Challenges"]);
  const avg7 = ref<string[]>(["PFIaffectNeigh", "PFIaffectCountry", "PFIsharedfateNeigh", "PFIsharedfateCountry",
    "EmpatheticConcern", "EmpatheticDistress", "PoliticalOrientation", "RiskReduction", "RiskAvoidance",
    "RiskRetention", "RiskTransfer", "RiskBehaviorComposite", "EntitlementComposite", "SoPA", "SoNA", "SelfEnhancement",
    "AnticipatedFoodScarcity", "Dominance", "Prestige", "AgenticGoal", "CommunalGoal"]);
  const cat8 = ref<string[]>(["ReasonHelp", "TimeTilNewPandemic", "VaccineTV", "VaccinePeers", "FriendsRisks1",
    "FriendsRisks2", "FriendsRisks3", "FriendsRisks4", "FriendsRisks5", "FriendsRisks6", "FriendsRisks7", "FoodInsecurity",
    "SpeedTime1", "SpeedTime2", "SpeedTime3", "SpeedTime4", "SpeedTime5", "LengthTime1", "LengthTime2", "TimePassed1", "TimePassed2",
    "Hope1", "Hope2", "Hope3", "Hope4", "Hope5", "Hope6"]);
  const cat9 = ref<string[]>(["Income", "Savings", "Assests", "Wealth", "QAnon1", "QAnon2", "QAnon3"]);
  const cat10 = ref<string[]>(["SSES", "OthersVaccine", "VaccineRightThing", "AloneTime", "PostVaccineActivity1",
    "PostVaccineActivity2", "PostVaccineActivity3", "PostVaccineActivity4", "PostVaccineActivity5",
    "PostVaccineActivity6", "PostVaccineActivity7", "PostVaccineActivity8", "PostVaccineActivity9",
    "PostVaccineActivity10", "PostVaccineActivity11", "PostVaccineActivity12", "PostVaccineActivity13",
    "PostVaccineActivity14", "PostVaccineActivity15", "PostVaccineActivity16", "VaccineUSRightThing", "Booster",
    "BoosterLocalArea", "Identities1", "Identities2", "Identities3", "Identities4", "Identities5", "tot_t9",
    "HelpNeighTimeClickCount", "Efficacy1", "Efficacy2", "Efficacy3", "Efficacy4", "Efficacy5", "Efficacy6", "Efficacy7", "Efficacy8", "Efficacy9",
    "Efficacy10", "Efficacy11", "Efficacy12", "Efficacy13", "Efficacy14", "Efficacy15", "Efficacy16", "Efficacy17", "Efficacy18",
    "Efficacy19", "Efficacy20", "Efficacy22", "Efficacy23", "Efficacy24", "Efficacy25", "Efficacy26", "Efficacy27", "Efficacy28",
    "Efficacy29", "Efficacy30", "Efficacy32"]);
  const cat12 = ref<string[]>(["Back2Normal", "TimeToVaccine", "TimeToVaccine", "NoMaskOutVacc",
    "MaskOutPoliOri", "MaskOutVacc", "NoMaskInPoliOri", "NoMaskInVacc", "MaskInPoliOri", "MaskInVacc",
    "OthersJudgeMask", "JudgeWearMask", "MonthRelStatus", "MonthChangeJob", "tot_t11", "tot_t12", "PFINeighAffectTimeClickCount",
    "PFINeighFateTimeClickCount", "HelpCountryTimeClickCount", "Flourishing1", "Flourishing2", "Flourishing3", "Flourishing4",
    "Flourishing6", "Flourishing7", "Flourishing8", "Flourishing9", "Flourishing10", "Flourishing11", "Flourishing12"]);
  const cat17 = ref<string[]>(["PFIcountryAffectTimeClickCount", "PFIcountryFateTimeClickCount"]);
  const cat30 = ref<string[]>(["SmallSooner", "LargerSooner", "@00025.1", "@00039.1", "@00098.1", "@0021.1", "@0034.1", "@0055.1", "@0087.1",
    "@013.1", "@02.1", "@025.1", "PastFocus", "PresentFocus", "FutureFocus", "HopeAgency", "HopePathways"]);
  const cat100 = ref<string[]>(["CausesExtinction1", "CausesExtinction2", "CausesExtinction3",
    "CausesExtinction4", "CausesExtinction5", "CausesExtinction6", "CausesExtinction8",
    "CausesExtinction9", "CausesExtinction10", "Optimistic1", "Optimistic2",
    "Optimistic3", "Optimistic4", "Optimistic5", "Optimistic6", "Optimistic7", "Optimistic8",
    "Optimistic9", "EffortLive", "NoEffortLive", "LifeExpectancy", "Mortality1", "Mortality2",
    "Mortality3", "Mortality4", "Mortality5", "Mortality6", "Mortality7", "Mortality8", "PositiveRightNow1",
    "PositiveRightNow2", "PositiveLife1", "PositiveLife2", "PositiveLife3", "PositiveLife4", "PositiveLife5",
    "PositiveLife6", "PositiveWorld1", "PositiveWorld2", "PositiveWorld3", "PositiveWorld4", "PositiveWorld5",
    "PositiveWorld6", "PositiveWorld7", "PositiveWorld8", "PositiveWorld9", "PositiveLifePast1", "PositiveLifePast2",
    "PositiveLifePast3", "PositiveLifePast4", "PositiveLifePast5", "PositiveWorldPast1", "PositiveWorldPast2",
    "PositiveWorldPast3", "PositiveWorldPast4", "PositiveWorldPast5", "PositiveWorldPast6", "PositiveWorldPast7",
    "PositiveWorldPast8", "Loneliness", "OptimisticEvent", "Closure", "TechVSconsume", "VaccineLocalRightThing",
    "EffortHealth", "PositiveNegative1", "PositiveNegative2", "Certain1", "Certain2", "CertainFutureLife1",
    "CertainFutureLife4", "CertainFutureLife5", "CertainFutureLife6", "CertainFutureWorld1", "CertainFutureWorld2",
    "CertainFutureWorld4", "CertainFutureWorld5", "CertainFutureWorld6", "CertainFutureWorld7", "CertainFutureWorld8",
    "FarXmas1", "PrepXmas1", "FamilyXmas1", "ShareResponsibility1", "PositivePast3", "MoralCircles1", "MoralCircles2",
    "MoralCircles3", "MoralCircles4", "MoralCircles5", "MoralCircles6", "MoralCircles7", "MoralCircles8",
    "MoralCircles9", "MoralCircles10", "MoralCircles11", "MoralCircles12", "MoralCircles13", "MoralCircles14",
    "MoralCircles15", "MoralCircles16", "HelpYou", "HelpChild", "HelpDog", "HelpPig", "NewPandemic1", "Asteroid6",
    "UncontrollableRisk1", "UncontrollableRisk2", "UncontrollableRisk3", "EffortSurvival"]);
  const firstClick = ref<string[]>(["PFINeighAffectTimeFirstClick", "PFINeighFateTimeFirstClick", "HelpNeighTimeFirstClick",
    "PFIcountryAffectTimeFirstClick", "PFIcountryFateTimeFirstClick", "HelpCountryTimeFirstClick"]);
  const lastClick = ref<string[]>(["PFINeighAffectTimeLastClick", "PFINeighFateTimeLastClick", "HelpNeighTimeLastClick",
    "PFIcountryAffectTimeLastClick", "PFIcountryFateTimeLastClick", "HelpCountryTimeLastClick"]);
  const pageSubmit = ref<string[]>(["PFINeighFateTimePageSubmit", "HelpNeighTimePageSubmit", "PFIcountryAffectTimePageSubmit",
    "PFIcountryFateTimePageSubmit", "PFINeighAffectTimePageSubmit", "HelpCountryTimePageSubmit"]);
  const selectedVar1 = ref<string>('Stress');
  const selectedVar2 = ref<string>('PerceptionRisk');
  const selectedDate = ref<string>('09/26/2020');

  const availableVar2 = computed<string[]>(() => {
    let data = [];
    if (lookupDataRaw.value.length > 0) {
      for (let row of lookupDataRaw.value) {
        if (row[selectedDate.value] > 0) {
          data.push(row.Name);
        }
      }
    }
    return data;
  });
  const linesDataFiltered = computed<Highcharts.SeriesOptions[]>(() => {
    let data = [];
    let slice1 = getCovidData('cases');
    let slice2 = getCovidData('deaths');
    let slice3 = getLinesDataSlice("one");
    let slice4 = getLinesDataSlice("two");

    data.push(slice1);
    data.push(slice2);
    data.push(slice3);
    data.push(slice4);
    return data;
  });
  const availableDates = computed<string[]>(() => {
    let dates = [];
    if (lookupDataRaw.value.length > 0) {
      let slice = lookupDataRaw.value.filter(r => r.Name == selectedVar1.value);
      for (let d of all_dates.value) {
        if (slice[0][d] > 0) {
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
    let options = getComparisonUsLineOptions();
    options.tooltip!.formatter = function (this: Highcharts.TooltipFormatterContextObject): string {
      let [var1, var2] = ['', ''];
      let [var1Tip, var2Tip] = ["", ""]
      let points = this.points!;
      let cas = numberFormatter(points[0].y!);
      let dea = numberFormatter(points[1].y!);

      let tipCovid = '<b>' + this.x +
        '</b><br/>' + points[0].series.name + ': ' + cas +
        '<br/>' + points[1].series.name + ': ' + dea;

      for (let point of points) {
        if (point.series.name == selectedVar1.value) {
          var1 = numberFormatter(point.y!);
        } else if (point.series.name == selectedVar2.value) {
          var2 = numberFormatter(point.y!);
        }
      }
      if (+var1 > 0) {
        var1Tip = '<br/>' + selectedVar1.value + ': ' + var1;
      }
      if (+var2 > 0) {
        var2Tip = '<br/>' + selectedVar2.value + ': ' + var2;
      }

      let tip = '<text>' + tipCovid + var1Tip + var2Tip + '</text>';
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
    let risk = 0;

    for (let row of intsDataRaw.value) {
      if (row.Date == selectedDate.value && row[selectedVar1.value] && row[selectedVar2.value]) {
        sample++;
        contacts += +row.ContactsInfected;
        if (row.InfectedCovid == 3) {
          covid++;
        }
        if (["09/26/2020", "10/27/2020", "11/28/2020", "12/28/2020", "01/27/2021", "02/26/2021",
          "03/28/2021", "04/27/2021", "05/27/2021", "06/26/2021", "07/26/2021", "08/25/2021",
          "10/25/2021", "12/16/2021", "02/24/2022", "04/25/2022", "06/24/2022", "08/29/2022"].includes(row.Date)) {
          if (row.OccupationRisk == 3) {
            risk++;
          }
        } else {
          if (row.JobRiskCovid > 3) {
            risk++;
          }
        }
      }
    }
    stats.sample = sample;
    stats.contacts = numberFormatter(contacts / sample);
    stats.covid = covid;
    stats.risk = risk;
    return stats;
  });
  const validCombo = computed<boolean>(() => {
    let valid = false;
    if (lookupDataRaw.value.length > 0 && selectedVar2.value)
    for (let row of lookupDataRaw.value) {
      if (row.Name == selectedVar2.value) {
        if (row[selectedDate.value] > 0) {
          valid = true;
        }
      }
    }

    return valid;
  });
  function loadData(): void {
    d3Fetch.csv("/csv/cclab/CCLAB-new-ints.csv").then((data: any[]): void => {
      intsDataRaw.value = data;
      all_dates.value = [...new Set(data.map(d => d.Date))];
      all_variables.value = data.columns;
      all_variables.value.splice(0, 4);
    });
    d3Fetch.csv("/csv/cclab/CCLAB-new-variableLookup.csv").then((data: any[]): void => {
      lookupDataRaw.value = data;
    });
    d3Fetch.csv("/csv/cclab/CCLAB-new-descriptions.csv").then((data: any[]): void => {
      descriptionsDataRaw.value = data;
      for (let row of data) {
        descriptions_lookup.value[row.key] = row.description;
      }
    });
    d3Fetch.csv("/csv/cclab/CCLAB-covid.csv").then((data: any[]): void => {
      covidDataRaw.value = data;
    });

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
    let d15c = 0;
    let d15v = 0;
    let d16c = 0;
    let d16v = 0;
    let d17c = 0;
    let d17v = 0;
    let d18c = 0;
    let d18v = 0;
    let data = [];
    let variable;
    let color;
    if (number == "one") {
      variable = selectedVar1.value;
      color = getColor('yellow-5');
    } else {
      variable = selectedVar2.value;
      color = getColor('green-4');
    }

    for (let row of intsDataRaw.value) {
      let val = +row[variable];
      if (row.Date == "09/26/2020" && val > 0) {
        d1v += val;
        d1c++;
      }
      else if (row.Date == "10/27/2020" && val > 0) {
        d2v += val;
        d2c++;
      }
      else if (row.Date == "11/28/2020" && val > 0) {
        d3v += val;
        d3c++;
      }
      else if (row.Date == "12/28/2020" && val > 0) {
        d4v += val;
        d4c++;
      }
      else if (row.Date == "01/27/2021" && val > 0) {
        d5v += val;
        d5c++;
      }
      else if (row.Date == "02/26/2021" && val > 0) {
        d6v += val;
        d6c++;
      }
      else if (row.Date == "03/28/2021" && val > 0) {
        d7v += val;
        d7c++;
      }
      else if (row.Date == "04/27/2021" && val > 0) {
        d8v += val;
        d8c++;
      }
      else if (row.Date == "05/27/2021" && val > 0) {
        d9v += val;
        d9c++;
      }
      else if (row.Date == "06/26/2021" && val > 0) {
        d10v += val;
        d10c++;
      }
      else if (row.Date == "07/26/2021" && val > 0) {
        d11v += val;
        d11c++;
      } else if (row.Date == "08/25/2021" && val > 0) {
        d12v += val;
        d12c++;
      } else if (row.Date == "10/25/2021" && val > 0) {
        d13v += val;
        d13c++;
      } else if (row.Date == "12/16/2021" && val > 0) {
        d14v += val;
        d14c++;
      } else if (row.Date == "02/24/2022" && val > 0) {
        d15v += val;
        d15c++;
      } else if (row.Date == "04/25/2022" && val > 0) {
        d16v += val;
        d16c++;
      } else if (row.Date == "06/24/2022" && val > 0) {
        d17v += val;
        d17c++;
      } else if (row.Date == "08/29/2022" && val > 0) {
        d18v += val;
        d18c++;
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
    data.push((d15v > 0) ? +numberFormatter(d15v / d15c) : 0);
    data.push((d16v > 0) ? +numberFormatter(d16v / d16c) : 0);
    data.push((d17v > 0) ? +numberFormatter(d17v / d17c) : 0);
    data.push((d18v > 0) ? +numberFormatter(d18v / d18c) : 0);

    // to hide 0's
    data.forEach(function (element, index) {
      if (element === 0) {
        data[index] = null;
      }
    });

    let slice = { name: variable, data: data, color: color, type: 'spline', yAxis: 1 };
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
      array = [18, 26, 36, 46, 56, 66, 76, 100];
    } else if (cat8.value.includes(variable)) {
      array = [1, 3, 5, 7, 9];
    } else if (cat10.value.includes(variable) || cat9.value.includes(variable)) {
      array = [1, 3, 5, 7, 9, 11];
    } else if (cat12.value.includes(variable)) {
      array = [1, 3, 5, 7, 9, 11, 13];
    } else if (cat17.value.includes(variable)) {
      array = [0, 3, 6, 9, 12, 15, 18];
    } else if (cat30.value.includes(variable)) {
      array = [0, 5, 10, 15, 20, 25, 30];
    } else if (cat100.value.includes(variable)) {
      array = [0, 21, 41, 61, 81, 101];
    } else if (avg4.value.includes(variable)) {
      array = [1, 2, 3, 4, 5];
    } else if (avg5.value.includes(variable)) {
      array = [1, 2, 3, 4, 5, 6];
    } else if (avg6.value.includes(variable)) {
      array = [1, 2, 3, 4, 5, 6, 7];
    } else if (avg7.value.includes(variable)) {
      array = [1, 2, 3, 4, 5, 6, 7, 8];
    } else if (firstClick.value.includes(variable)) {
      array = [0, 3, 4, 5, 6, 7, 8, 1000000];
    } else if (lastClick.value.includes(variable)) {
      array = [0, 5, 8, 11, 14, 17, 20, 1000000];
    } else if (pageSubmit.value.includes(variable)) {
      array = [0, 6, 9, 12, 15, 18, 21, 1000000];
    } else if (variable == "Children") {
      array = [0, 1, 2, 3, 4, 5, 50];
    } else if (variable == "ChildrenUnder18") {
      array = [0, 1, 2, 3, 4, 5, 50];
    } else if (variable == "MoveChildhood") {
      array = [0, 1, 2, 3, 4, 5, 10, 100];
    } else if (variable == "Move") {
      array = [0, 1, 2, 3, 4, 5, 10, 100];
    } else if (variable == "NumberInHouse") {
      array = [1, 2, 3, 4, 5, 6, 20];
    } else if (variable == "WeekSinceCovid") {
      array = [0, 1, 5, 10, 15, 20, 25, 100];
    } else if (variable == "ContactsInfected") {
      array = [0, 1, 3, 5, 7, 9, 11, 200];
    } else if (variable == "Contacts24hrs") {
      array = [0, 1, 2, 3, 4, 5, 11, 1000];
    } else if (variable == "Contacts7days") {
      array = [0, 1, 3, 5, 7, 11, 21, 1000];
    } else if (variable == "TimeSinceHelpOlder") {
      array = [1, 5, 10, 20, 50, 100, 10000];
    } else if (variable == "TimeSpentOthers") {
      array = [0, 1, 3, 5, 7, 10, 20, 1000];
    } else if (variable == "MoneyDonated") {
      array = [0, 1, 10, 50, 100, 500, 50000];
    } else if (variable == "CovidSymptoms") {
      array = [0, 1, 6, 11, 16, 21, 30];
    } else if (variable == "DiscountingRate") {
      array = [0, 0.005, 0.01, 0.05, 0.1, 0.2, 0.3];
    } else if (variable == "HowManyTG") {
      array = [0, 1, 3, 5, 7, 9, 11, 100];
    } else if (variable == "NotHouseHoldTG") {
      array = [0, 1, 3, 5, 7, 9, 11, 100];
    } else if (variable == "CFC.Future") {
      array = [0, 10, 20, 30, 40, 50];
    } else if (variable == "CFC.Immediate") {
      array = [0, 10, 20, 30, 40, 50];
    } else if (variable == "CFC.Composite") {
      array = [0, 20, 40, 60, 80, 100];
    } else if (variable == "HourSleep") {
      array = [0, 2, 4, 6, 8, 10, 20];
    } else if (variable == "Inches") {
      array = [1, 3, 5, 7, 9, 11, 100];
    } else if (variable == "Weight") {
      array = [1, 120, 150, 180, 210, 240, 270, 500];
    } else if (variable == "FeetToInches") {
      array = [1, 52, 56, 60, 64, 68, 80];
    } else if (variable == "InchesTotal") {
      array = [1, 61, 71, 81, 91, 101, 111, 150];
    } else if (variable == "Height") {
      array = [1, 5.1, 5.4, 5.7, 6, 6.3, 12];
    } else if (variable == "LifeOrientation") {
      array = [1, 4, 6, 8, 10, 12, 14, 20];
    } else if (variable == "TimeToEventYears") {
      array = [0, 1, 3, 5, 7, 10, 20, 1000];
    } else if (variable == "TimeToEventDays") {
      array = [0, 1, 3, 6, 10, 1000];
    } else if (variable == "tot_t13") {
      array = [0, 2, 4, 6, 8, 10, 12, 100];
    } else if (variable == "HowManyXmas") {
      array = [0, 0, 3, 5, 7, 10, 13, 100];
    } else if (variable == "NotHouseHoldXmas") {
      array = [0, 0, 3, 5, 7, 10, 13, 100];
    } else if (variable == "tot_t14") {
      array = [0, 2, 4, 6, 8, 10, 12, 100];
    } else if (variable == "tot_t15") {
      array = [0, 3, 6, 9, 12, 100];
    } else if (variable == "StateHopeTotal") {
      array = [0, 10, 20, 30, 40, 60];
    } else if (variable == "tot_t16") {
      array = [0, 3, 6, 9, 12, 15, 100];
    } else if (variable == "RecentContactsInfect") {
      array = [0, 0, 2, 5, 10, 20, 100];
    }
    return array;
  }
  function getCategoriesForNewVariable(parameter:string):string[] {
    let cats:string[] = [];
    if (parameter == "Age") {
      cats = ["18-25", "26-35", "36-45", "46-55", "56-65", "66-75", "76+"];
    } else if (cat8.value.includes(parameter)) {
      cats = ["1-2", "3-4", "5-6", "7-8"];
    } else if (cat9.value.includes(parameter)) {
      cats = ["1-2", "3-4", "5-6", "7-8", "9"];
    } else if (cat10.value.includes(parameter)) {
      cats = ["1-2", "3-4", "5-6", "7-8", "9-10"];
    } else if (cat12.value.includes(parameter)) {
      cats = ["1-2", "3-4", "5-6", "7-8", "9-10", "11-12"];
    } else if (cat17.value.includes(parameter)) {
      cats = ["0-2", "3-5", "6-8", "9-11", "12-14", "15-17"];
    } else if (cat30.value.includes(parameter)) {
      cats = ["0-4", "5-9", "10-14", "15-19", "20-24", "25-30"];
    } else if (cat100.value.includes(parameter)) {
      cats = ["0-20", "21-40", "41-60", "61-80", "81-100"];
    } else if (avg4.value.includes(parameter)) {
      cats = ["1-2", "2-3", "3-4", "4"];
    } else if (avg5.value.includes(parameter)) {
      cats = ["1-2", "2-3", "3-4", "4-5", "5"];
    } else if (avg6.value.includes(parameter)) {
      cats = ["1-2", "2-3", "3-4", "4-5", "5-6", "6"];
    } else if (avg7.value.includes(parameter)) {
      cats = ["1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7"];
    } else if (firstClick.value.includes(parameter)) {
      cats = ["< 3", "3-4", "4-5", "5-6", "6-7", "7-8", "8 <"];
    } else if (lastClick.value.includes(parameter)) {
      cats = ["< 5", "5-8", "8-11", "11-14", "14-17", "17-20", "20 <"];
    } else if (pageSubmit.value.includes(parameter)) {
      cats = ["< 6", "6-9", "9-12", "12-15", "15-18", "18-21", "21 <"];
    } else if (parameter == "Children") {
      cats = ["0", "1", "2", "3", "4", "5+"];
    } else if (parameter == "ChildrenUnder18") {
      cats = ["0", "1", "2", "3", "4", "5+"];
    } else if (parameter == "MoveChildhood") {
      cats = ["0", "1", "2", "3", "4", "5-9", "10+"];
    } else if (parameter == "Move") {
      cats = ["0", "1", "2", "3", "4", "5-9", "10+"];
    } else if (parameter == "NumberInHouse") {
      cats = ["1", "2", "3", "4", "5", "6+"];
    } else if (parameter == "WeekSinceCovid") {
      cats = ["0", "1-4", "5-9", "10-14", "15-19", "20-24", "25+"];
    } else if (parameter == "ContactsInfected") {
      cats = ["0", "1-2", "3-4", "5-6", "7-8", "9-10", "11+"];
    } else if (parameter == "Contacts24hrs") {
      cats = ["0", "1", "2", "3", "4", "5-10", "11+"];
    } else if (parameter == "Contacts7days") {
      cats = ["0", "1-2", "3-4", "5-6", "7-10", "11-20", "21+"];
    } else if (parameter == "TimeSinceHelpOlder") {
      cats = ["1-4", "5-9", "10-19", "20-49", "50-99", "100+"];
    } else if (parameter == "TimeSpentOthers") {
      cats = ["0", "1-2", "3-4", "5-6", "7-9", "10-19", "20+"];
    } else if (parameter == "MoneyDonated") {
      cats = ["0", "1-9", "10-49", "50-99", "100-499", "500+"];
    } else if (parameter == "CovidSymptoms") {
      cats = ["0", "1-5", "6-10", "11-15", "16-20", "21-26"];
    } else if (parameter == "DiscountingRate") {
      cats = ["0-0.005", "0.005-0.01", "0.01-0.05", "0.05-0.1", "0.1-0.2", "0.2-0.25"];
    } else if (parameter == "HowManyTG") {
      cats = ["0", "1-2", "3-4", "5-6", "7-8", "9-10", "11+"];
    } else if (parameter == "NotHouseHoldTG") {
      cats = ["0", "1-2", "3-4", "5-6", "7-8", "9-10", "11+"];
    } else if (parameter == "CFC.Future") {
      cats = ["0-9", "10-19", "20-29", "30-39", "40-49"];
    } else if (parameter == "CFC.Immediate") {
      cats = ["0-9", "10-19", "20-29", "30-39", "40-49"];
    } else if (parameter == "CFC.Composite") {
      cats = ["0-19", "20-39", "40-59", "60-79", "80-99"];
    } else if (parameter == "HourSleep") {
      cats = ["0-2", "2-4", "4-6", "6-8", "8-10", "10+"];
    } else if (parameter == "Inches") {
      cats = ["1-2", "3-4", "5-6", "7-8", "9-10", "11+"];
    } else if (parameter == "Weight") {
      cats = ["<120", "120-149", "150-179", "180-209", "210-239", "240-269", "270+"];
    } else if (parameter == "FeetToInches") {
      cats = ["48-51", "52-55", "56-59", "60-63", "64-67", "68+"];
    } else if (parameter == "InchesTotal") {
      cats = ["<60", "61-70", "71-80", "81-90", "91-100", "101-110", "110+"];
    } else if (parameter == "Height") {
      cats = ["<5.1", "5.1 - 5.4", "5.4-5.7", "5.7-6", "6-6.3", "6.6+"];
    } else if (parameter == "LifeOrientation") {
      cats = ["<4", "4-6", "6-8", "8-10", "10-12", "12-14", "14+"];
    } else if (parameter == "TimeToEventYears") {
      cats = ["0", "1-2", "3-4", "5-6", "7-9", "10-19", "20+"];
    } else if (parameter == "TimeToEventMonths") {
      cats = ["0", "1-2", "3-4", "5-6", "7-8", "9-10", "10+"];
    } else if (parameter == "TimeToEventDays") {
      cats = ["0", "1-2", "3-5", "6-10", "10+"];
    } else if (parameter == "tot_t13") {
      cats = ["1-2", "3-4", "5-6", "7-8", "9-10", "11-12", "13"];
    } else if (parameter == "HowManyXmas") {
      cats = ["0", "1-2", "3-4", "5-6", "7-9", "10-12", "13 <"];
    } else if (parameter == "NotHouseHoldXmas") {
      cats = ["0", "1-2", "3-4", "5-6", "7-9", "10-12", "13 <"];
    } else if (parameter == "tot_t14") {
      cats = ["1-2", "3-4", "5-6", "7-8", "9-10", "11-12", "13-14"];
    } else if (parameter == "tot_t15") {
      cats = ["1-3", "4-6", "7-9", "10-12", "13-15"];
    } else if (parameter == "StateHopeTotal") {
      cats = ["1-10", "11-20", "21-30", "31-40", "41-50"];
    } else if (parameter == "tot_t16") {
      cats = ["1-3", "4-6", "7-9", "10-12", "13-15", "16-17"];
    } else if (parameter == "RecentContactsInfect") {
      cats = ["0", "1-2", "3-5", "6-10", "10-20", "20+"];
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

        let slice = { name: varCats[i], y: data[i], color: getColor(color + (i + 1)) };
        series.push(slice);
      }
    } else {
      for (let i = 0; i < cats.length; i++) {

        let slice = { name: cats[i], y: data[i], color: getColor(color + (i + 1)) };
        series.push(slice);
      }
    }

    return series;
  }
  function getCovidData(parameter:string) {
    let data = [];
    let color = getColor('red-3');

    if (parameter == "deaths") {
      color = getColor('red-5');
    }

    for (let row of covidDataRaw.value) {
      if (row.measure == parameter) {
        for (let date of all_dates.value)
          data.push(+row[date])
      }
    }

    let slice = { name: fCapital(parameter), data: data, color: color, type: 'area' };
    return slice;
  }

// all variables and functions should be added here
  return {
    all_variables,
    all_dates,
    descriptions_lookup,
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
    getLinesDataSlice,
    removeEmpty,
    getArrayForNewVariable,
    getPieData,
  }
});

