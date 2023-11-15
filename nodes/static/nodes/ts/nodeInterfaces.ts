export interface Context {
    Context: string;
    Id: number;
    Time?: string;
    Video?: string;
    Percent?: number;
}
export interface ContextLinks {
    Context: number;
    Node1: string;
    Node2?: string;
    Node3?: string;
    Node4?: string;
    Node5?: string;
    Node6?: string;
    Node7?: string;
    Node8?: string;
    Node9?: string;
    Node10?: string;
    Node11?: string;
    Node12?: string;
}

export interface SigmaNode {
    label: string;
    id: string;
    color: string;
    originalColor: string;
    inactiveColor: string;
    selectedColor: string;
    attributes: NodeAttributes;
}
export interface SigmaEdge {
    color: string;
    originalColor?: string;
    inactiveColor?: string;
}

export interface SigmaNodeColelction {
    [key: string]: SigmaNode;
}

export interface SigmaConstructor {
    renderers: SigmaRenderer[];
    settings: SigmaSettings;
}

// internal
export interface SigmaRenderer {
    type: 'canvas';
    container: HTMLElement;
    freeStyle: true;
}

export interface SigmaSettings {
    minNodeSize: number;
    maxNodeSize: number;
    minEdgeSize: number;
    maxEdgeSize: number;
    defaultEdgeType: "curve"; // only works on canvas renderer
    defaultLabelColor: string;
    labelColor: string;
    defaultHoverLabelBGColor: string;
    defaultLabelHoverColor: string;
    font: "Poppins";
    drawLabels: true;
    mouseWheelEnabled: false;
    doubleClickEnabled: false;
    touchEnabled: false;
}

export interface NodeAttributes {
    'modularity class': number;
}

export interface LegendItem {
    class: number;
    name: string;
}

// Highcharts
export interface BubbleData {
    absolute?:number;
    colorIndex: number;
    id: string;
    name: string;
    value: number;
    customFlag?: number;
    customProperty?: string;
}
export interface CloudData {
    name: string;
    weight: number;
    colorIndex?: number;
}
export interface TooltipFormatterContextObject {
    key?: string;
    name?: string;
    value?: number;
    customFlag?: number;
    customProperty?: string;
}
