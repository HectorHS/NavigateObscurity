import Highcharts from 'highcharts';
import * as HCTypes from '@/interfaces/HCTypes.ts';
import {fCapital, numberFormatter, getTailwindHexColor, get10ColorsDark} from '@/helpers/commonFunctions';

export function getBioSunburstOptions():Highcharts.Options {
    let options = {
        navigation:{
            breadcrumbs: {
                floating: true,
                position: {
                    align: 'right'
                },
            }
        },
        series: [{
            type: 'sunburst',
            name: 'Earth',
            allowDrillToNode: true,
            borderRadius: 5,
            borderWidth:2,
            borderColor: getTailwindHexColor('gray-700'),
            cursor: 'pointer',
            dataLabels: {
                format: '{point.name}',
                style: {
                color: 'white'
                },
            },
        }],
        tooltip: {
          useHTML: true,
          formatter: function (this: HCTypes.TooltipFormatterContextObject):string {
            let tip:string = 'Biomass: ' + this.point.mass + 'gt';
            if (this.point.id && +this.point.id > 0) {
              tip = tip + '<br>Percent: ' + this.point.percent + '% of ' + this.point.parentName;
            }
            return '<text><span style="font-size: 1.1em"><strong>' + this.point.name + '</strong></span><br>' + tip + '</text>'
          }
        }
      } as Highcharts.Options;
      return options;
}
export function getBioScatterOptions():Highcharts.Options {
    let options:Highcharts.Options = {
        chart: {
            type: 'scatter',
        },
        tooltip: {
            useHTML: true,
            headerFormat: '',
            formatter: function (this: Highcharts.TooltipFormatterContextObject): string {
                let sName = fCapital(this.point!.name!);
                let biomass = this.point!.y;
                let populance = this.point!.x;
                return '<text><span style="font-size:1.1em"><strong>' + sName + '</strong></span><br>Biomass: ' + biomass + 'gt <br> Population: 10<sup>' + populance + '</sup> organisms</text>';
            },
        },
        xAxis: {
            labels: {
                formatter: function (this: any): string {
                    return ('<div class="highcharts-axis-html-labels"><text>10<sup >' + this.value + '</sup></text></div>')
                },
                useHTML: true,
            },
            title: {
                text: 'Population',
            },
        },
        yAxis: {
            title: {
                text: 'Biomass (gt of C)',
            },
        },
        series: [{
            type: 'scatter',
            allowPointSelect: false,
            showInLegend: false
        }],
    }
    return options;
}
export function getSustainabilityMapOptions():Highcharts.Options {
    let options:Highcharts.Options = {
        tooltip: {
            useHTML: true
        },
        legend: {
            enabled: true,
            symbolRadius: 0,
            symbolHeight: 15,
            symbolWidth: 300
        },
        series: [{
            type: 'map',
            joinBy: ['iso-a3', 'country'], // first var: type of geographical data, second: data column name
        }]
    };
    return options;
}
export function getSustainabilityAreaOptions():Highcharts.Options {
    let options:Highcharts.Options = {
        chart: {
            type: 'area'
        },
        tooltip: {
            useHTML: true,
            split: false,
        },
        legend: {
            enabled: true,
        },
        xAxis: {
            type:'category',
            endOnTick: false,
            gridLineWidth: 0,
            labels: {
                step: 10,
            }
        },
        yAxis: {
            title: {
                text: 'Global Hectares (gha)'
            },
            endOnTick:false,
        },
    };
    return options;
}
export function getMigrationMapOptions(): Highcharts.Options {
    let options: Highcharts.Options = {
        colorAxis: {
            stops: [
                [0, getTailwindHexColor('blue-400')],
                [0.4, getTailwindHexColor('cyan-200')],
                [0.6, getTailwindHexColor('yellow-200')],
                [0.95, getTailwindHexColor('orange-400')]
            ],
            min: 0,
            tickAmount: 4
        },
        tooltip: {
            useHTML: true
        },
        chart: {
            animation: false
        },
        legend: {
            enabled:true,
            symbolRadius: 0,
            symbolHeight: 15,
            symbolWidth: 300
        },
        series: [{
            type: 'map',
            joinBy: ['iso-a3', 'country'], // first var: type of geographical data, second: data column name
        }]
    };
    return options;
}
export function getMigrationTreemapOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        chart: {
            type: 'treemap',
        },
        plotOptions: {
            treemap: {
                colorByPoint: true,
                inactiveOtherPoints: true,
                levels: [{
                    borderColor: getTailwindHexColor('gray-700'),
                    borderDashStyle: 'Solid',
                    borderWidth: 3,
                    level: 1,
                }],
            }
        },
        colors: get10ColorsDark(),
        tooltip: {
            useHTML: true,
            headerFormat: '',
        },
        series: [{
            name: 'Migrants',
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            clip: false,
            borderRadius: 5,
            dataLabels: {
                color: getTailwindHexColor('textColor'),
            },
            states: {
                hover: {
                    enabled:true,
                    brightness: 0.2
                }
            }
        }]
    };
    return options;
}
export function getLifeMapOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        colorAxis: {
            stops: [
                [0, getTailwindHexColor('blue-400')],
                [0.4, getTailwindHexColor('cyan-200')],
                [0.6, getTailwindHexColor('yellow-200')],
                [0.95, getTailwindHexColor('orange-400')]
            ],
            min: 30,
            max:80,
            tickAmount: 4
        },
        tooltip: {
            useHTML: true
        },
        chart: {
            animation: false
        },
        legend: {
            enabled: true,
            symbolRadius: 0,
            symbolHeight: 15,
            symbolWidth: 300
        },
        series: [{
            type: 'map',
            joinBy: ['iso-a3', 'country'], // first var: type of geographical data, second: data column name
        }]
    };
    return options;
}
export function getDeathMapOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        plotOptions: {
            map: {
                allAreas: false,
                joinBy: ['iso-a3', 'country'],
                colorAxis: false,
                allowPointSelect: true,
                states: {
                    select: {
                        color: undefined, // otherwise default gray color appears on deselect
                    }
                }
            },
            series: {
                joinBy: ['iso-a3', 'country']
            }
        },
        colorAxis: {
            minColor: '#222a2a',
            visible: false,
            tickAmount: 4
        },
        tooltip: {
            useHTML: true
        },
        chart: {
            animation: false
        },
        legend: {
            enabled: false,
        },
        series: [{
            type: 'map',
            joinBy: ['iso-a3', 'country'], // first var: type of geographical data, second: data column name
        }]
    };
    return options;
}
export function getDeathTreemapOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        chart: {
            type: 'treemap',
        },
        plotOptions: {
            treemap: {
                colorKey: 'colorValue',
                levels: [{
                    borderColor: getTailwindHexColor('gray-600'),
                    borderDashStyle: 'Solid',
                    borderWidth: 3,
                    level: 1,
                },
                {
                    borderColor: getTailwindHexColor('gray-600'),
                    borderDashStyle: 'Solid',
                    borderWidth: 3,
                    level: 2,
                }],
            },
        },
        colors: get10ColorsDark(),
        tooltip: {
            useHTML: true,
        },
        xAxis: {
            visible: false,
        },
        series: [{
            name: 'Causes of death',
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            allowTraversingTree: true,
            levelIsConstant: false,
            clip: false,
            borderRadius: 5,
            dataLabels: {
                enabled: false,
                style: { textOutline: 'none' },
                overflow: 'justify'
            },
            states: {
                hover: {
                    enabled:true,
                    brightness: 0.2
                }
            },
            levels: [{
                level: 1,
                dataLabels: {
                    enabled: true,
                },
                borderColor:getTailwindHexColor('gray-600'),
                borderDashStyle: 'Solid',
                borderWidth: 5,
            },
            {
                level: 2,
                borderColor:getTailwindHexColor('gray-600'),
                borderDashStyle: 'Solid',
                borderWidth: 1,
            }],
        }]
    };
    return options;
}
export function getDeathAgePyramidOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        chart: {
            type: 'bar',
        },
        xAxis: [{
            reversed: true,
            plotBands: [],
            labels: {
                step: 1,
            },
            accessibility: {
                description: 'Age (male)'
            },
             gridLineWidth: 0,
        }, { // mirror axis on right side
            opposite: true,
            reversed: true,
            linkedTo: 0,
            labels: {
                step: 1,
            },
            accessibility: {
                description: 'Age (female)'
            },
            gridLineWidth: 0,
        }],
        yAxis: {
            labels: {
                formatter: function (this: Highcharts.AxisLabelsFormatterContextObject):string {
                    return numberFormatter(Math.abs(+this.value!)) + "%";
                }
            },
            accessibility: {
                description: 'Total number of deaths',
            },
            tickAmount: 5
        },
        plotOptions: {
            series: {
                stacking: 'normal',
            }
        },
        tooltip: {
            shared: true,
        },
        series: [{
            type: 'bar',
            name: "Male",
            color: getTailwindHexColor('gray-900'),
        }, {
            type: 'bar',
            name: "Female",
            color: getTailwindHexColor('gray-100'),
        }]
    };
    return options;
}
export function getDeathRiskOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        chart: {
            type: 'bar',
        },
        xAxis: {
            labels: {
                step: 1,
            },
            accessibility: {
                description: 'Contributing health risks'
            },
            gridLineWidth: 0,
        },
        yAxis: {
            accessibility: {
                description: 'Sum of associated deaths',
            },
        },
        plotOptions: {
            bar: {
                dataSorting: {
                    enabled: true,
                },
                borderWidth: undefined,
                borderColor: 'transparent',
            }
        },
        tooltip: {
            useHTML: true,
        },
        series: [{
            type: 'bar',
            name: "Risks",
        }]
    };
    return options;

}
export function getDeathTreemapOldOptions(): Highcharts.Options {
    let options: Highcharts.Options = {
        chart: {
            type: 'treemap',
        },
        plotOptions: {
            treemap: {
                colorKey: 'colorValue',
                levels: [{
                    borderColor: getTailwindHexColor('gray-700'),
                    borderDashStyle: 'Solid',
                    borderWidth: 3,
                    level: 1,
                }],
            },
        },
        colors: get10ColorsDark(),
        tooltip: {
            useHTML: true,
        },
        xAxis: {
            visible: false,
        },
        series: [{
            name: 'Causes of death',
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            clip: false,
            borderRadius: 5,
            dataLabels: {
                enabled: false,
                style: { textOutline: 'none' },
                overflow: 'justify'
            },
            states: {
                hover: {
                    enabled: true,
                    brightness: 0.2
                }
            },
            levels: [{
                level: 1,
                dataLabels: {
                    enabled: true,
                },
                borderColor: getTailwindHexColor('gray-700'),
                borderDashStyle: 'Solid',
                borderWidth: 5,
            }],
        }]
    };
    return options;
}
export function getEnergyMapOptions(): Highcharts.Options {
    let options: Highcharts.Options = {
        plotOptions: {
            map: {
                allAreas: false,
                joinBy: ['iso-a3', 'country'],
                allowPointSelect: true,
                states: {
                    select: {
                        color: undefined, // otherwise default gray color appears on deselect
                    }
                }
            },
            series: {
                joinBy: ['iso-a3', 'country']
            }
        },
        tooltip: {
            useHTML: true
        },
        chart: {
            animation: false
        },
        legend: {
            enabled: true,
            symbolRadius: 0,
            symbolHeight: 15,
            symbolWidth: 300
        },
        series: [{
            type: 'map',
            joinBy: ['iso-a3', 'country'], // first var: type of geographical data, second: data column name
        }]
    };
    return options;
}
export function getEnergysunburstOptions(): Highcharts.Options {
    let options: Highcharts.Options = {
        tooltip: {
            useHTML: true
        },
        legend: {
            enabled: true,
            symbolHeight: 20,
        },

        series: [{
            type: 'sunburst',
            name: 'Root',
            allowTraversingTree: true,
            allowPointSelect: true,
            innerSize: '30%',
            levelIsConstant: false,
            borderRadius: 5,
            borderWidth:2,
            borderColor: getTailwindHexColor('gray-700'),
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            levels: [{
                level: 1,
            }, {
                level: 2,
                colorByPoint: true
            }]
        }]
    }
    return options;
}
export function getEnergyAreaOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        tooltip: {
            useHTML: true
        },
        legend: {
            enabled: true,
            symbolHeight: 20,
        },
        xAxis: {
            labels: {
                step: 10
            },
            gridLineWidth: 0
        },
        yAxis: {
            title: {
                text: 'Petajoules'
            },
        },
    };
    return options;
}
export function getEnergyBarOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        plotOptions: {
            series: {
                stacking: 'normal',
            }
        },
        tooltip: {
            useHTML: true
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Petajoules'
            }
        },
    };
    return options;
}
export function getCovidBarOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        chart: {
            type: 'column',
        },
        tooltip: {
            useHTML: true,
            shared: true,
            split: false,
        },
        xAxis: {
            labels: {
                enabled: true,
                step: 52,
            },
            gridLineWidth: 0,
        },
        yAxis: [{
            min: 0,
            endOnTick: false,
            showFirstLabel: false,
        }, {
            min: 0,
            endOnTick: false,
            opposite: true,
            showFirstLabel: false,
        }],
    };
    return options;
}
export function getCovidExcessOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        chart: {
            type: 'spline',
        },
        xAxis: {
            gridLineWidth: 0,
            labels: {
                enabled: false
            },

        },
        yAxis: {
            title: {
                text: 'Total deaths (all causes)'
            },
            endOnTick: false,
            showFirstLabel: false
        },
        tooltip: {
            useHTML: true,
            shared: true,
            split: false,
        },
        legend: {
            enabled: true
        },
    }
    return options;
}
export function getCovidMapOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        plotOptions: {
            map: {
                allAreas: false,
                joinBy: ['iso-a3', 'country'],
                allowPointSelect: true,
                states: {
                    select: {
                        color: undefined, // otherwise default gray color appears on deselect
                    }
                }
            },
            series: {
                joinBy: ['iso-a3', 'country']
            }
        },
        tooltip: {
            useHTML: true
        },
        chart: {
            animation: false
        },
        series: [{
            type: 'map',
            joinBy: ['iso-a3', 'country'], // first var: type of geographical data, second: data column name
        }]
    };
    return options;
}
export function getMalazanBubbleOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        chart: {
            type: 'packedbubble',
        },
        tooltip: {
            useHTML: true,
            headerFormat: '',
        },
        plotOptions: {
            packedbubble: {
                crisp: true,
                minSize: "5%", // These two control the min and max size of the bubbles
                maxSize: "400%",
                marker: {
                    fillOpacity: 1,
                },
                states: {
                    hover: {
                        halo: {
                            opacity: 1,
                            size:5
                        }
                    }
                },
                draggable: false,
                animation: false,
                layoutAlgorithm: {
                    enableSimulation: false,
                    maxIterations: 500
                },
                dataLabels:{
                    enabled: true,
                    format: '{point.name}',
                    overflow: 'hidden',
                    style: { 
                        textOutline: 'none',
                        color: '#fff',
                        fontSize: '12px' ,
                        textOverflow: 'ellipsis'
                    },
                    filter: {
                        property: 'value',
                        operator: '>',
                        value: 90
                    }
                }
            }
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 700
                },
                chartOptions: {
                    plotOptions: {
                        packedbubble: {
                            maxSize: "250%",
                        }
                    }
                }
            }]
        }
    };    
    return options;
}
export function getMalazanWordcloudOptions():Highcharts.Options {
    let options: Highcharts.Options = {
        plotOptions: {
            wordcloud: {
                minFontSize: 4,
                states: {
                    hover: {
                        brightness: 0.6
                    }
                }
            }
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<div><b>{point.key}</b></div>',
        },
        series: [{
            type: 'wordcloud',
            name: 'Occurrences',
        }],
    };
    return options;
}

