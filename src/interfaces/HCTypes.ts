// find types here: https://api.highcharts.com/class-reference/

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
export interface Bands {
    from: number;
    to: number;
    className?: string;
}

// Chart options
export interface ColorAxisOptions {
    endOnTick?: boolean;
    max?: number;
    maxColor?: string;
    min?: number;
    minColor?: string;
    showInLegend?: boolean,
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
    type?: string;
}
export interface PlotOptions {
    colorAxis?: boolean | number;
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
    category?: string | number;
    name?: string;
    point?: PointOptions;
    series?: TreeSeriesOptions;
    shapeArgs?: ShapeArgsOptions;
    total?: number;
    totalValue?: number;
    value?: number;
    y?: number;
    x?: number;
    mass?: number;
    percent?: number;
    parentName?: string;
    id?: string;
}
export interface TreemapPoint extends PointOptions {
    node?: TreemapNode;
}
export interface TreePointOptions extends PointOptions {
    val?: number;
}

// Series
export interface Series {
    id?: string;
    name?: string;
    showInLegend?: boolean;
    color?: string | Highcharts.GradientColorObject;
    legendSymbol?: string;
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
    color?: string;
}
export interface BubblesData {
    color?: string;
    id: string;
    name: string;
    value: number;
}
// export interface MapData {
//     absolute?: number;
//     country:string; // ISO-3 code
//     countryName?:string;
//     id?: string;
//     note?: string;
//     originalName?: string; //to be removed?
//     value:number;
// }
export interface MapData {
    country:string; // ISO-3 code
    value:number;
    name?:string;
    note?: string | number;
}
export interface PieData {
    colorIndex: number;
    id: string;
    name: string;
    y:number;
}

export interface SankeyData {
    color?: number;
    from: string;
    to: string;
    weight: number;
}

export interface ScatterData {
    color: string;
    name: string;
    x:number;
    y: number;
}

export interface SunburstData {
    color?: string;
    id: string,
    name: string;
    parent: string;
    parentName?: string;
    value: number;
    mass?: string;
    percent?: string;
    plants?: string;
}

export interface TreemapData {
    color?: string;
    id?: string;
    name: string;
    parent?: string;
    value: number;
    dataLabels?: LabelOptions
}


// Secondary
export interface LabelOptions {
    enabled?: boolean;
    format?: string;
    color?: string;
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