export interface Page {
    title: string,
    image?: string,
    icon?: string,
    path: string,
    abstract: string
    bg?: number,
    type: string
}
export interface RadioItem {
    title: string,
    value: string,
    checked: boolean,
    colors?: string[]
}
export interface LegendItem {
    name: string,
    color: string
}
export interface ContextData {
    id: number,
    text: string
    link?: string,
    percent?: number
}
export interface ContextLinkData {
    contextId: number,
    from: string,
    to: string[]
}
export interface MalazanMapItem {
    title: string,
    color: string,
    id: string
}
