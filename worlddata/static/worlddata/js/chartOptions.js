import Highcharts from "https://code.highcharts.com/es-modules/masters/highcharts.src.js";
import HighMaps from "https://code.highcharts.com/maps/es-modules/masters/highmaps.src.js";
// highcharts global oprions
Highcharts.setOptions({
    chart: {
        styledMode: true,
    },
    defs: {
        gradient0: {
            tagName: 'linearGradient',
            id: 'gradient-0',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient1: {
            tagName: 'linearGradient',
            id: 'gradient-1',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient2: {
            tagName: 'linearGradient',
            id: 'gradient-2',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient3: {
            tagName: 'linearGradient',
            id: 'gradient-3',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient4: {
            tagName: 'linearGradient',
            id: 'gradient-4',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient5: {
            tagName: 'linearGradient',
            id: 'gradient-5',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient6: {
            tagName: 'linearGradient',
            id: 'gradient-6',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient7: {
            tagName: 'linearGradient',
            id: 'gradient-7',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient8: {
            tagName: 'linearGradient',
            id: 'gradient-8',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },

        gradient9: {
            tagName: 'linearGradient',
            id: 'gradient-9',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient10: {
            tagName: 'linearGradient',
            id: 'gradient-10',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient11: {
            tagName: 'linearGradient',
            id: 'gradient-11',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient12: {
            tagName: 'linearGradient',
            id: 'gradient-12',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient13: {
            tagName: 'linearGradient',
            id: 'gradient-13',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient14: {
            tagName: 'linearGradient',
            id: 'gradient-14',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient15: {
            tagName: 'linearGradient',
            id: 'gradient-15',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient16: {
            tagName: 'linearGradient',
            id: 'gradient-16',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient17: {
            tagName: 'linearGradient',
            id: 'gradient-17',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient18: {
            tagName: 'linearGradient',
            id: 'gradient-18',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient19: {
            tagName: 'linearGradient',
            id: 'gradient-19',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient20: {
            tagName: 'linearGradient',
            id: 'gradient-20',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient21: {
            tagName: 'linearGradient',
            id: 'gradient-21',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient22: {
            tagName: 'linearGradient',
            id: 'gradient-22',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient23: {
            tagName: 'linearGradient',
            id: 'gradient-23',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient24: {
            tagName: 'linearGradient',
            id: 'gradient-24',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient25: {
            tagName: 'linearGradient',
            id: 'gradient-25',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient26: {
            tagName: 'linearGradient',
            id: 'gradient-26',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient27: {
            tagName: 'linearGradient',
            id: 'gradient-27',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient28: {
            tagName: 'linearGradient',
            id: 'gradient-28',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient29: {
            tagName: 'linearGradient',
            id: 'gradient-29',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient30: {
            tagName: 'linearGradient',
            id: 'gradient-30',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient31: {
            tagName: 'linearGradient',
            id: 'gradient-31',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient32: {
            tagName: 'linearGradient',
            id: 'gradient-32',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient33: {
            tagName: 'linearGradient',
            id: 'gradient-33',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient34: {
            tagName: 'linearGradient',
            id: 'gradient-34',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient35: {
            tagName: 'linearGradient',
            id: 'gradient-35',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient36: {
            tagName: 'linearGradient',
            id: 'gradient-36',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient37: {
            tagName: 'linearGradient',
            id: 'gradient-37',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient38: {
            tagName: 'linearGradient',
            id: 'gradient-38',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient39: {
            tagName: 'linearGradient',
            id: 'gradient-39',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient40: {
            tagName: 'linearGradient',
            id: 'gradient-40',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient41: {
            tagName: 'linearGradient',
            id: 'gradient-41',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient42: {
            tagName: 'linearGradient',
            id: 'gradient-42',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient43: {
            tagName: 'linearGradient',
            id: 'gradient-43',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient44: {
            tagName: 'linearGradient',
            id: 'gradient-44',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient45: {
            tagName: 'linearGradient',
            id: 'gradient-45',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient46: {
            tagName: 'linearGradient',
            id: 'gradient-46',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient47: {
            tagName: 'linearGradient',
            id: 'gradient-47',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient48: {
            tagName: 'linearGradient',
            id: 'gradient-48',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient49: {
            tagName: 'linearGradient',
            id: 'gradient-49',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient50: {
            tagName: 'linearGradient',
            id: 'gradient-50',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient51: {
            tagName: 'linearGradient',
            id: 'gradient-51',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient52: {
            tagName: 'linearGradient',
            id: 'gradient-52',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient0area: {
            tagName: 'linearGradient',
            id: 'gradient-area-0',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient1area: {
            tagName: 'linearGradient',
            id: 'gradient-area-1',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient2area: {
            tagName: 'linearGradient',
            id: 'gradient-area-2',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient3area: {
            tagName: 'linearGradient',
            id: 'gradient-area-3',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient4area: {
            tagName: 'linearGradient',
            id: 'gradient-area-4',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient5area: {
            tagName: 'linearGradient',
            id: 'gradient-area-5',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient6area: {
            tagName: 'linearGradient',
            id: 'gradient-area-6',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient7area: {
            tagName: 'linearGradient',
            id: 'gradient-area-7',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient8area: {
            tagName: 'linearGradient',
            id: 'gradient-area-8',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },

        gradient9area: {
            tagName: 'linearGradient',
            id: 'gradient-area-9',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient10area: {
            tagName: 'linearGradient',
            id: 'gradient-area-10',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient11area: {
            tagName: 'linearGradient',
            id: 'gradient-area-11',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient12area: {
            tagName: 'linearGradient',
            id: 'gradient-area-12',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient13area: {
            tagName: 'linearGradient',
            id: 'gradient-area-13',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient14area: {
            tagName: 'linearGradient',
            id: 'gradient-area-14',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient15area: {
            tagName: 'linearGradient',
            id: 'gradient-area-15',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient16area: {
            tagName: 'linearGradient',
            id: 'gradient-area-16',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient17area: {
            tagName: 'linearGradient',
            id: 'gradient-area-17',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient18area: {
            tagName: 'linearGradient',
            id: 'gradient-area-18',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient19area: {
            tagName: 'linearGradient',
            id: 'gradient-area-19',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient20area: {
            tagName: 'linearGradient',
            id: 'gradient-area-20',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient21area: {
            tagName: 'linearGradient',
            id: 'gradient-area-21',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient22area: {
            tagName: 'linearGradient',
            id: 'gradient-area-22',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient23area: {
            tagName: 'linearGradient',
            id: 'gradient-area-23',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient24area: {
            tagName: 'linearGradient',
            id: 'gradient-area-24',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient25area: {
            tagName: 'linearGradient',
            id: 'gradient-area-25',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient26area: {
            tagName: 'linearGradient',
            id: 'gradient-area-26',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient27area: {
            tagName: 'linearGradient',
            id: 'gradient-area-27',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient28area: {
            tagName: 'linearGradient',
            id: 'gradient-area-28',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient29area: {
            tagName: 'linearGradient',
            id: 'gradient-area-29',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient30area: {
            tagName: 'linearGradient',
            id: 'gradient-area-30',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient31area: {
            tagName: 'linearGradient',
            id: 'gradient-area-31',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient32area: {
            tagName: 'linearGradient',
            id: 'gradient-area-32',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient33area: {
            tagName: 'linearGradient',
            id: 'gradient-area-33',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient34area: {
            tagName: 'linearGradient',
            id: 'gradient-area-34',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient35area: {
            tagName: 'linearGradient',
            id: 'gradient-area-35',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient36area: {
            tagName: 'linearGradient',
            id: 'gradient-area-36',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient37area: {
            tagName: 'linearGradient',
            id: 'gradient-area-37',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient38area: {
            tagName: 'linearGradient',
            id: 'gradient-area-38',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient39area: {
            tagName: 'linearGradient',
            id: 'gradient-area-39',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient40area: {
            tagName: 'linearGradient',
            id: 'gradient-area-40',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient41area: {
            tagName: 'linearGradient',
            id: 'gradient-area-41',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient42area: {
            tagName: 'linearGradient',
            id: 'gradient-area-42',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient43area: {
            tagName: 'linearGradient',
            id: 'gradient-area-43',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient44area: {
            tagName: 'linearGradient',
            id: 'gradient-area-44',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient45area: {
            tagName: 'linearGradient',
            id: 'gradient-area-45',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient46area: {
            tagName: 'linearGradient',
            id: 'gradient-area-46',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient47area: {
            tagName: 'linearGradient',
            id: 'gradient-area-47',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient48area: {
            tagName: 'linearGradient',
            id: 'gradient-area-48',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient49area: {
            tagName: 'linearGradient',
            id: 'gradient-area-49',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient50area: {
            tagName: 'linearGradient',
            id: 'gradient-area-50',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient51area: {
            tagName: 'linearGradient',
            id: 'gradient-area-51',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient52area: {
            tagName: 'linearGradient',
            id: 'gradient-area-52',
            x1: 0.4,
            y1: 0.4,
            x2: 1,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
    },
    credits: {
        enabled: false
    },
});

HighMaps.setOptions({
    chart: {
        styledMode: true,
    },
    credits: {
        enabled: false
    },
});