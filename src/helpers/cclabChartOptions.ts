import Highcharts from 'highcharts';
import * as HCTypes from '@/interfaces/HCTypes.ts';
import {fCapital, numberFormatter, getTailwindHexColor, get10ColorsDark} from '@/helpers/commonFunctions';
import usMap from '@highcharts/map-collection/countries/us/us-all.geo.json';
let style = {
    color: '#0d0d0d',
    fontFamily: 'Quantico',
    fontWeight: 'normal'
};

export function getMapOptions():Highcharts.Options {
    let options:Highcharts.Options = {
        tooltip: {
            useHTML: true
        },
        colorAxis: {
            minColor: '#fdce68',
            maxColor: '#483E1E',
            max: 103, // otherwise 100 gets tranctuated on the legend
            tickInterval: 25,
            endOnTick: false,
            gridLineColor: null,
            tickLength: 1,
            labels: {
                style: style
            }
        },
        legend: {
            enabled: true,
            symbolRadius: 5,
            symbolHeight: 15,
            symbolWidth: 200,
            title: {
                text: '<div style="width: 200px; text-align: center;"># of people</div>',
                style: style
            },
            useHTML: true, // otherwise we cannot center the title
        },
        plotOptions: {
            map: {
                nullColor: getColor('neutral-1'),
                allowPointSelect: true,
                states: {
                    select: {
                        color: undefined, // otherwise default gray color appears on deselect
                    }
                }
            }
        },
        mapNavigation: {
            enableButtons: false,
        },
        series: [{
            type: 'map',
            joinBy: ['iso-a3', 'country'], // first var: type of geographical data, second: data column name
        }]
    };
    return options;
}
export function getSplineOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        xAxis: {
            type: 'datetime',
            minPadding: 0.05,
            maxPadding: 0.05,
            tickPositions: [1583452800000, 1590796800000, 1598054400000],
            gridLineColor: '#0d0d0d',
            endOnTick: false,
            startOnTick: false,
            lineWidth: 0,
            tickLength: 0,
            labels: {
                style: style
            }
        },
        yAxis: {
            gridLineColor: '#0d0d0d',
            endOnTick: false,
            startOnTick: false,
            title: {
                text: 'Average score',
                style: style
            },
            labels: {
                style: style
            }
        },
        tooltip: {
            useHTML: true,
            shared: true
        },
        title: {
            align: "left",
            style: style
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                label: {
                    enabled: false
                },
                marker: {
                    enabled: true,
                    radius: 2,
                    symbol: 'circle'
                },
            },
            series: {
                groupPadding: 0.1,
            }
        },
        legend: {
            enabled: true,
            itemStyle: style
        },
    }
    return options;
}
export function getGloSumSplineOptions():Highcharts.Options {
    let options: Highcharts.Options = getSplineOptions();
    (options.xAxis as Highcharts.XAxisOptions).tickPositions = [1583452800000, 1590796800000, 1598054400000];

    return options;
}
export function getUsSumSplineOptions():Highcharts.Options {
    let options: Highcharts.Options = getSplineOptions();
    (options.xAxis as Highcharts.XAxisOptions).tickPositions = [1601078400000, 1629849600000, 1661731200000];

    return options;
}
export function getSumPieOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        chart: {
            type: 'pie',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            margin: 0
        },
        title: {
            text: null,
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                enableMouseTracking: false,
                dataLabels: {
                    enabled: true,
                    distance: -32,
                    y: 4,
                    format: "{y}%",
                    defer: false,
                    style: {
                        textOutline: 'none',
                        fontSize: '1.1rem'
                    },
                    filter: {
                        property: 'name',
                        operator: '===',
                        value: 'female',
                    },
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Sex',
            innerSize: '60%',
        }]
    }
    return options;
}
export function getSumCovidSplineOptions(): Highcharts.Options {
    let options: Highcharts.Options = {
        chart: {
            type: 'spline',
        },
        title: {
            align: "left",
        },
        xAxis: {
            type: 'datetime',
            minPadding: 0.05,
            maxPadding: 0.05,
            tickPositions: [1583452800000, 1590796800000, 1598054400000],
            gridLineColor: '#0d0d0d',
            endOnTick: false,
            startOnTick: false,
            lineWidth: 0,
            tickLength: 0,
            labels: {
                style: style
            }
        },
        yAxis: [{
            gridLineColor: '#0d0d0d',
            endOnTick: false,
            startOnTick: false,
            title: {
                text: 'COVID-19 prevalence',
                style: style
            },
            labels: {
                style: style
            }
        }, {
            gridLineColor: '#0d0d0d',
            endOnTick: false,
            startOnTick: false,
            title: {
                text: 'Average score',
                style: style,
                rotation: 270
            },
            labels: {
                style: style
            },
            opposite: true,
        }],
        plotOptions: {
            spline: {
                lineWidth: 4,
                label: {
                    enabled: false
                },
                marker: {
                    enabled: true,
                    radius: 2,
                    symbol: 'circle'
                },
            },
            area: {
                marker: {
                    enabled: false
                },
            },
            series: {
                groupPadding: 0.1,
                color: '#FF0000'
            }
        },
        tooltip: {
            useHTML: true,
            shared: true
        },
        series: [
            {
                id: "covid_cases",
                type: 'area',
                name: "COVID-19 cases",
                label: {
                    enabled: false,
                    format: ''
                }
            },
            {
                id: "covid_deaths",
                type: 'area',
                name: "COVID-19 deaths",
                label: {
                    enabled: false,
                    format: ''
                }
            },
            {
                id: "covid_question",
                type: 'spline',
                name: "Average score",
                yAxis: 1,
                label: {
                    enabled: false,
                    format: ''
                }
            },
        ],
        legend: {
            enabled: true,
            itemStyle: style
        },

    }
    return options;
}
export function getColor(color:string) {
    let map = new Map<string, string>();
    map.set('red-1', '#fad2d1');
    map.set('red-2', '#f28f8d');
    map.set('red-3', '#ec625f');
    map.set('red-4', '#c83739');
    map.set('red-5', '#a02c2e');
    map.set('red-6', '#641b1d');
    map.set('red-7', '#280b0c');
    map.set('green-1', '#b7e1d9');
    map.set('green-2', '#81cabd');
    map.set('green-3', '#4bb4a1');
    map.set('green-4', '#3c9080');
    map.set('green-5', '#2d6c60');
    map.set('green-6', '#1e4840');
    map.set('green-7', '#0f2420');
    map.set('yellow-1', '#ffdf99');
    map.set('yellow-2', '#fbcd6a');
    map.set('yellow-3', '#f5bb3d');
    map.set('yellow-4', '#e6a519');
    map.set('yellow-5', '#a77a25');
    map.set('yellow-6', '#776222');
    map.set('yellow-7', '#483e1e');
    map.set('blue-1', '#dbe6f0');
    map.set('blue-2', '#b8cce0');
    map.set('blue-3', '#94b3d1');
    map.set('blue-4', '#5e8cba');
    map.set('blue-5', '#3d668f');
    map.set('blue-6', '#264059');
    map.set('blue-7', '#0f1a24');
    map.set('neutral-1', '#f2f2f2');
    map.set('neutral-2', '#b5afb2');
    map.set('neutral-3', '#91888c');
    map.set('neutral-4', 'rgba(181, 175, 178, 0.3)');
    map.set('green-flat', '#709072');

    return map.get(color) || '';
}
export function getUsMapOptions():Highcharts.Options {
    let options:Highcharts.Options = getMapOptions();
    options.chart = {
        map: usMap
    };
    options.series = [{
        type: 'map',
        joinBy: ['postal-code', 'code'], // first var: type of geographical data, second: data column name
    }];
    return options;
}
export function getLookupIntOptions():Highcharts.Options {
    let options: Highcharts.Options = getSplineOptions();


    options.tooltip!.valueDecimals = 2;
    options.legend = {enabled: false};
    options.plotOptions!.spline!.lineWidth = 7;
    options.plotOptions!.spline!.marker!.radius = 7;
    options.series = [{
            id: "average",
            type: 'spline',
            name: "Average score",
            color: getColor('green-7'),
            label: {
                enabled: false,
                format: ''
            },
        }];
    return options;
}
export function getLookupStringOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        series: [{
            type: 'wordcloud',
            name: 'Occurrences',
        }],
        title: {
            text: undefined
        }
    }
    return options;
}
export function getLookupUsIntOptions():Highcharts.Options {
    let options = getLookupIntOptions();
    (options.xAxis as Highcharts.XAxisOptions).tickPositions = [1601078400000, 1614297600000, 1629849600000, 1645660800000, 1661731200000];
    return options;
}
export function getLookupGlobalIntOptions(): Highcharts.Options {
    let options = getLookupIntOptions();
    (options.xAxis as Highcharts.XAxisOptions).tickPositions = [1583452800000, 1585872000000, 1588377600000, 1590796800000, 1593216000000, 1595635200000, 1598054400000];
    return options;
}
export function getComparisonPieOptions(): Highcharts.Options {
    let options: Highcharts.Options = {
        chart: {
            plotShadow: false,
            type: 'pie',
        },
        title: {
            align: "left",
            margin: 0,
            style: style,
        },
        tooltip: {
            useHTML: true
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    connectorWidth: 1,
                    distance: 10,
                    connectorShape: 'straight',
                    color: 'black'
                }
            }
        },
        annotations: [{
            labels: [{
                point: '0'
            }]
        }, {
            visible: false,
        }],
        series: [{
            type: 'pie',
            innerSize: '40%',
        }]
    }
    return options;
}
export function getComparisonLineOptions(): Highcharts.Options {
    let options: Highcharts.Options = {
        chart: {
            type: 'spline',
        },
        title: {
            text: 'Average response scores for all available time points',
            align: "left",
            style: style
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                label: {
                    enabled: false
                },
                marker: {
                    enabled: false
                },
            },
        },
        tooltip: {
            useHTML: true,
            shared: true
        },
        yAxis: {
            title: {
                text: "Average score",
            },

        },
        xAxis: {
            gridLineColor: '#0d0d0d',
            lineWidth: 0,
            tickLength: 0,
            labels: {
                style: style
            }
        },
        legend: {
            enabled: true,
            itemStyle: style,
        }
    };
    return options;
}
export function getComparisonHeatmapOptions(): Highcharts.Options {
    let options: Highcharts.Options = {
        chart: {
            type: 'heatmap',
            marginBottom: 80,
        },
        title: {
            align: "left",
            style: style,
        },
        legend: {
            align: 'right',
            enabled: true,
            symbolRadius: 0,
            symbolHeight: 15,
            symbolWidth: 200,
            floating: true
        },
        plotOptions: {
            heatmap: {
                dataLabels: {
                    enabled: false,
                }
            }
        },
        colorAxis: {
            gridLineColor: null,
            tickLength: 1,
            labels: {
                style: style
            },
            min: 0,
            minColor: '#ffffff',
            maxColor: '#1e4840',
            stops: [
                [0, 'rgba(255,255,255,0)'],
                [0.125, '#fad2d1'],
                [0.25, '#f28f8d'],
                [0.375, '#ec625f'],
                [0.5, '#c83739'],
                [0.625, '#a02c2e'],
                [0.75, '#641b1d'],
                [0.875, '#280b0c'],
                [1, '#000000']
            ]
        },
        xAxis: {
            lineWidth: 0,
            tickLength: 0,
            labels: {
                style: style
            },
            title: {
                style: style
            }
        },
        yAxis: {
            lineWidth: 0,
            tickLength: 0,
            labels: {
                style: style
            },
            title: {
                style: style
            }
        },
        tooltip: {
            useHTML: true
        },

    }
    return options;
}
export function getComparisonBarOptions(): Highcharts.Options {
    let options: Highcharts.Options = {
        chart: {
            type: 'column',
        },
        title: {
            align: "left",
        },
        yAxis: {
            min: 0,
            title: {
                text: '# of individuals',
                style: style
            },
            lineWidth: 0,
            tickLength: 0,
            labels: {
                style: style,
                enabled: true,
            },
            gridLineColor: '#000000',
            gridLineWidth: 0.1,
        },
        plotOptions: {
            column: {
                borderRadius: 3,
                groupPadding: 0.05,
                stacking: undefined
            }
        },
        tooltip: {
            useHTML: true
        },
        legend: {
            enabled: true,
            itemStyle: style,
            symbolHeight: 18,
            symbolRadius: 18,
        }
    }
    return options;
}
export function getComparisonUsLineOptions(): Highcharts.Options {
    let options = getComparisonLineOptions();
    options.plotOptions!.area = { marker: { enabled: false } };
    options.yAxis = [{
        title: {
            text: 'COVID-19 prevalence',
            style: style
        },
        labels: {
            style: style,
            enabled: true,
        },
        tickAmount: 3,
        gridLineWidth:1
    }, {
        title: {
            text: 'Average score',
            rotation: 270,
            style: style
        },
        labels: {
            style: style,
            enabled: true,
        },
        tickAmount: 3,
        opposite: true,
    }];

    return options;
}

