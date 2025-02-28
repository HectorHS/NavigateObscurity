import { createApp } from 'vue'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts';
import Maps from "highcharts/modules/map";
import worldMap from '@highcharts/map-collection/custom/world.geo.json';

import App from '@/App.vue'
import router from '@/router'
import store from '@/store/store.ts'
import '@/styles/tailwind.scss'
// to load colors for highcharts config
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'
import { getTailwindColor, getTailwindHexColor, get10Colors } from './helpers/commonFunctions.js';

const app = createApp(App)

app.use(store)
app.use(router)

Maps(Highcharts);
Highcharts.setOptions(getHighchartsTheme());
app.use(HighchartsVue)

app.mount('#app')

// default highcharts options
function getHighchartsTheme():Highcharts.Options {
    const fullTailwindConfig = resolveConfig(tailwindConfig)

    return Highcharts.theme = {
        chart: {
            backgroundColor: fullTailwindConfig.theme.colors.gray,
            map: worldMap,
            spacing: [10, 0, 10, 0]
        },
        colorAxis: {
            gridLineColor: getTailwindColor('gray-700'),
            labels: {
                style: {
                    color: getTailwindColor('textColor'),
                }
            }
        },
        colors: get10Colors(),
        credits: {
            enabled: false
        },
        legend: {
            enabled: false,
            itemStyle: {'color':getTailwindColor('textColor'), 'transform': 'translateY(-5px)', 'font-size':'1rem'},
            itemHoverStyle: {'color':getTailwindColor('blue-500')},
            symbolHeight: 25,
            symbolRadius: 25,
        },
        mapNavigation: {
            enabled: true,
            enableMouseWheelZoom: false,
            enableButtons: true,
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                borderRadius: 3,
                pointPadding: 0,
                groupPadding: 0.1,
                crisp: false
            },
            pie: {
                borderColor: undefined,
            },
            scatter: {
                marker: {
                    radius: 25,

                    states: {
                        hover: {
                            enabled: true,
                            radiusPlus: 5,
                            lineWidthPlus:0
                        },
                        select: {
                            enabled: false,
                        }
                    }
                },
                opacity: 0.8,
                stickyTracking: false,

            },
            map:{
                borderWidth:0.4,
                borderColor: getTailwindColor('gray-700'),
                opacity: 1,
                nullColor: getTailwindColor('gray-800'),
                states:{
                    hover:{
                        borderWidth:2,
                        borderColor: getTailwindColor('gray-300'),
                    }
                }
            },
            area: {
                stacking: 'normal',
                findNearestPointBy: 'xy',
                fillOpacity: 0.8,
                marker: {
                    enabled: false,
                },
                trackByArea: true
            },
            series: {
                borderWidth: 0,
            },
            spline: {
                marker: {
                    enabled: false
                },
                label: {
                    enabled: false
                },
                connectNulls: false
            },
        },
        title: {
            text: undefined
        },

        tooltip: {
            backgroundColor: 'rgba(31, 34, 46, 0.8)',
            borderWidth: 1,
            headerFormat: '',
            style: {
              color: '#fff',
            },
        },
        xAxis: {
            gridLineWidth: 0.1,
            tickAmount: 6,
            startOnTick: true,
            endOnTick: true,
            labels: {
                style: {
                    color: fullTailwindConfig.theme.colors.textColor
                }
            },
            title: {
                text: undefined,
                style: {
                    fontSize: '1rem',
                    color: fullTailwindConfig.theme.colors.textColor
                }
            }
        },
        yAxis: {
            gridLineWidth: 0.1,
            tickAmount: 4,
            endOnTick: false,
            startOnTick: false,
            labels: {
                style: {
                    color: fullTailwindConfig.theme.colors.textColor
                }
            },
            title: {
                style: {
                    fontSize: '1rem',
                    color: fullTailwindConfig.theme.colors.textColor
                },
                text: undefined
            }
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 700
                },
                chartOptions: {
                    plotOptions: {
                        scatter: {
                            marker: {
                                radius: 10,
                            }
                        }
                    }
                }
            }]
        }
    };
}
