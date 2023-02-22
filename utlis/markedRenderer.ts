import {marked} from "marked";

export const MarkedRenderer = (string: string) => {
    let renderer = new marked.Renderer()
    let tableOfContents = [] as any[]

    renderer.heading = function (text, level, raw, slugger) {
        // @ts-ignore
        let anchor = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-');
        tableOfContents.push({
            anchor: anchor,
            level: level,
            text: text
        });
        return `<h${level} id="${anchor}">${text}</h${level}>`
    }

    marked.setOptions({
        renderer: renderer
    })
    return {
        rendered: marked(string),
        toc: tableOfContents
    }
}
