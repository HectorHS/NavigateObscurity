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

