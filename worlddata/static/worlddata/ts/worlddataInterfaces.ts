// Generall
export interface TooltipFormatterContextObject {
    key?: string;
    name?: string;
    percentage?: number;
    point: PointOptions;
    points?: PointOptions[];
    series?: TooltipSeries;
    total?: number;
    value?: number;
    x?: number | string;
    y?: number;
}

// Chart options
export interface ColorAxisOptions {
    endOnTick?: boolean;
    max?: number;
    maxColor?: string;
    min?: number;
    minColor?: string;
    startOnTick?: boolean;
    stops?: Array<[number, string]>;
    tickInterval?: number;
    visible?: boolean;
}
export interface XAxisOptions {
    categories?: string[];
    labels?:LabelOptions;
    tickInterval?: number;
    title?: TitleOptions;
}

// Events
export interface ClickEvent {
    hoverPoint?: PointOptions;
    point?: PointOptions;
}
export interface RootNodeEvent {
    newRootId?: string;
    previousRootId?: string;
    redraw?: boolean;
    trigger?: string;
    type?: string;
}

// Points
export interface PointOptions {
    category?: string;
    name?: string;
    point?: PointOptions;
    series?: TreeSeriesOptions;
    shapeArgs?: ShapeArgsOptions;
    total?: number;
    totalValue?: number;
    value?: number;
    y?: number;
}
export interface TreemapPoint extends PointOptions {
    node?: TreemapNode;
}
export interface TreePointOptions extends PointOptions {
    val?: number;
}

// Series
export interface Series {
    colorIndex?: number;
    id?: string;
    name?: string;
    showInLegend?: boolean;
}
export interface AreaSeries extends Series{
    data: number[];
    type: 'area';
}
export interface BarSeries extends Series {
    data: BarData[] | number[];
    type: 'bar';
}
export interface Mapseries extends Series {
    data: MapData[]; 
    type: "map";
}
export interface TreemapSeries extends Series {
    setRootNode?: Function;
    tree?: TreemapTree;
}

// Data
export interface BarData {
    totalValue?: number;
    y: number; 
}
export interface BubblesData {
    absolute?:number;
    colorIndex: number;
    id: string;
    name: string;
    value: number;
}
export interface MapData {
    absolute?: number;
    country:string; // ISO-3 code
    id?: string;
    note?: string;
    originalName?: string;
    value:number;
}
export interface PieData {
    colorIndex: number;
    id: string;
    name: string;
    y:number;
}

export interface SankeyData {
    colorIndex?: number;
    from: string;
    to: string;
    weight: number;
}

export interface ScatterData {
    colorIndex: number;
    name: string; 
    x:number; 
    y: number; 
}

export interface SunburstData {
    className?: string;
    colorIndex?: number; 
    id: string, 
    name: string; 
    parent: string; 
    value: number; 
}

export interface TreemapData {
    colorIndex?: number;
    id?: string; 
    name: string; 
    parent?: string; 
    value: number;
}


// Secondary
export interface LabelOptions {
    enabled?: boolean;
}
export interface ShapeArgsOptions {
    height?: number;
    width?: number;
}
export interface TitleOptions {
    text?: string | undefined;
}
export interface TooltipSeries {
    name?: string;
    points?: PointOptions[];
}
export interface TreemapTree {
    val?: number;
}
export interface TreemapNode {
    level?: number;
}
export interface TreeSeriesOptions {
    tree?:TreePointOptions;
}
