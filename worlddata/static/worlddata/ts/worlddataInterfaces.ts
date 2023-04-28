import Highcharts from "https://code.highcharts.com/es-modules/masters/highcharts.src.js";

// These are to bypass incomple Highcharts typescript wiring
export interface TreemapTree {
    val?: number;
}
export interface TreemapSeries extends Highcharts.Series {

    tree?: TreemapTree;

    setRootNode?: Function;
    
}
export interface SankeySeries extends Highcharts.Series {

    nodes?: Highcharts.SankeyNodeObject[];
    
}
export interface TreemapNode {
    level?: number;
}
export interface TreemapPoint extends Highcharts.Point {
    node?: TreemapNode;
}
export interface RootNodeEvent {
    newRootId?: string;
    previousRootId?: string;
    redraw?: boolean;
    trigger?: string;
    type?: string;
}

// The data input we use for each chart type
export interface BarData {
    y: number; 
    
    totalValue?: number;
}

export interface BubblesData {
    id: string;
    name: string;
    value: number;
    colorIndex: number;
    absolute?:number;
}

export interface MapData {
    // ISO-3 code
    country:string; 

    value:number;

    originalName?: string;

    note?: string;

    absolute?: number;
}

export interface Mapseries {
    type: "map";

    data: MapData[]; 
    
    name: string; 
    
    colorIndex?: number; 
    
    showInLegend?: boolean;
}

export interface PieData {
    
    id: string;
    
    name: string;
    
    // value
    y:number;

    // only for styled mode, color indexes found in variables.scss
    colorIndex: number;
}

export interface SankeyData {
    from: string;
    to: string;
    weight: number;
    colorIndex?: number;
}

export interface ScatterData {
    
    name: string; 
    
    y: number; 
    
    x:number; 

    // only for styled mode, color indexes found in variables.scss
    colorIndex: number;
}

export interface TreemapData {
    id?: string; 
    
    name: string; 
      
    value: number;

    // optional as child nodes are expected to inherit their color from their parents
    colorIndex?: number;

    parent?: string; 

    
}