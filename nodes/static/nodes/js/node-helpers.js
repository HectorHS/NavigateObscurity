// Only show notes relevant to selected nodes, or all notes if no nodes are selected
export function updateContextText(s, contexts, context_links, selected, percent, type) {
    let contextsToKeep = [];
    let linksToKeep = []; // array of numbers as strings
    // Remove old wrapper
    document.querySelectorAll('#context_wrapper').forEach(function (a) {
        a.remove();
    });
    // Initialise new wrapper
    let context_container = document.getElementById('context_container');
    let context_wrapper = document.createElement("div");
    context_wrapper.id = "context_wrapper";
    context_container.appendChild(context_wrapper);
    // Show only relevant contexts, or all contexts if none is selected
    if (selected.length > 0) {
        // let keys = Object.keys(selected);
        for (let row of context_links) {
            let nodes = Object.values(row);
            if (selected.length > 1) {
                if (nodes.includes(selected[0]) && nodes.includes(selected[1])) {
                    linksToKeep.push(+row.Context);
                }
            }
            else {
                if (nodes.includes(selected[0])) {
                    linksToKeep.push(+row.Context);
                }
            }
        }
        // keep only unique values
        linksToKeep = [...new Set(linksToKeep)];
        contextsToKeep = contexts.filter(c => linksToKeep.includes(+c.Id));
    }
    else {
        contextsToKeep = contexts;
    }
    // if a percentage is provided, use it as filter
    if (percent > 0) {
        contextsToKeep = contextsToKeep.filter(c => +c.Percent <= percent);
    }
    let selectedLabels = [];
    s.graph.nodes().forEach(function (n) {
        if (selected.includes(n.id)) {
            selectedLabels.push(n.label);
        }
    });
    setContextTitle(selectedLabels, context_wrapper);
    setContextNotes(type, contextsToKeep, context_wrapper);
    // wrap the container on a simplebar for customised scroll bars
    new SimpleBar(context_wrapper, {
        autoHide: false,
    });
}
export function setContextTitle(selectedLabels, context_wrapper) {
    let context_header = document.createElement("div");
    context_header.classList.add("context-title-container");
    let context_title = document.createElement("div");
    context_title.classList.add("context-title");
    let count = 0;
    if (selectedLabels.length > 0) {
        context_title.innerHTML = "Notes for ";
        context_header.appendChild(context_title);
        for (let label of selectedLabels) {
            if (count > 0) {
                let node_plus = document.createElement("div");
                node_plus.classList.add("context-title");
                node_plus.innerHTML = "&";
                context_header.appendChild(node_plus);
            }
            let node_item = document.createElement("div");
            node_item.classList.add("node-item");
            node_item.innerHTML = label;
            context_header.appendChild(node_item);
            count++;
        }
        let node_dot = document.createElement("div");
        node_dot.classList.add("context-title");
        node_dot.innerHTML = ":";
        context_header.appendChild(node_dot);
    }
    else {
        context_title.innerHTML = "All notes:";
        context_header.appendChild(context_title);
    }
    context_wrapper.appendChild(context_header);
}
export function setContextNotes(type, contextsToKeep, context_wrapper) {
    if (type == "reference") {
        // create context elements
        for (let context of contextsToKeep) {
            let note = context.Context;
            let video = "";
            // TODO this should be handled on the individual page
            if (context.Video == "podcast_10") {
                video = "https://www.youtube.com/watch?v=ntfcfJ28eiU";
            }
            else if (context.Video == "podcast_11") {
                video = "https://www.youtube.com/watch?v=XfURDjegrAw";
            }
            else if (context.Video == "podcast_12") {
                video = "https://www.youtube.com/watch?v=vA50EK70whE";
            }
            else if (context.Video == "podcast_13") {
                video = "https://www.youtube.com/watch?v=hcuMLQVAgEg";
            }
            let full_time = context.Time;
            let time_array = full_time.split(".");
            let hours = +time_array[0];
            let mins = +time_array[1];
            let secs = +time_array[2];
            let seconds = hours * 3600 + mins * 60 + secs;
            let link = video + "&t=" + seconds + "s";
            let note_container = document.createElement("div");
            note_container.classList.add("note-container");
            let note_element = document.createElement("div");
            note_element.classList.add("note");
            note_element.innerHTML = note;
            note_container.appendChild(note_element);
            let note_link_container = document.createElement("div");
            note_link_container.classList.add("reference");
            let note_link = document.createElement("a");
            note_link.setAttribute('href', link);
            note_link.setAttribute('target', "_blank");
            note_link.innerHTML = "<i>Link to video</i>";
            note_link_container.appendChild(note_link);
            note_container.appendChild(note_link_container);
            context_wrapper.appendChild(note_container);
        }
    }
    else if (type == "simple") {
        for (let context of contextsToKeep) {
            let context_text = document.createElement("p");
            context_text.innerHTML = context.Context;
            context_wrapper.appendChild(context_text);
        }
    }
}
// Toggle select a node
export function nodeSelect(s, selected, contexts, context_links, percent, type) {
    if (selected.length == 0) { // If no nodes are selected after click we just reset the graph
        resetStates(s);
    }
    else if (selected.length == 1) { // If one is selected, find all relevant nodes
        let toKeep = nodesToKeep(s, selected, contexts, context_links, percent);
        // Grey out irrelevant edges 
        setEdgesToInactive(s, toKeep);
        hideNodes(s, toKeep);
        setSelectedColor(s, selected, toKeep);
    }
    else if (selected.length > 1) { // If two are selected, grey out further options
        setEdgesToInactive(s, selected);
        hideNodes(s, selected);
        setSelectedColor(s, selected, selected);
    }
    updateContextText(s, contexts, context_links, selected, percent, type);
    s.refresh();
}
// Highlight hovered node and relevant nodes by greying out all else
export function nodeHover(s, node, selected, contexts, context_links, percent) {
    var selectedAndHovered = [];
    // Make a copy of selected and add the hovered node
    Object.assign(selectedAndHovered, selected);
    selectedAndHovered.push(node.id);
    var toKeep = nodesToKeep(s, selectedAndHovered, contexts, context_links, percent);
    // the selected is not really an array, it is an object with an arbitary number of keys that kind of behaves like an array because javascript
    // we can either do any, or even better, rationalise it and only pass around what we need
    hideNodes(s, toKeep);
}
export function hideNodes(s, toKeep) {
    s.graph.nodes().forEach(function (n) {
        if (toKeep.includes(n.id)) {
            n.color = n.originalColor;
        }
        else {
            n.color = n.inactiveColor;
        }
    });
    // Grey out irrelevant edges 
    setEdgesToInactive(s, toKeep);
    s.refresh();
}
// Return graph to pre-hover state
export function nodeHoverOut(s, selected, contexts, context_links, percent) {
    // Start clean, and then figure out what needs to be greyed out according to selected nodes and percentage
    resetStates(s);
    var toKeep = nodesToKeep(s, selected, contexts, context_links, percent);
    hideNodes(s, toKeep);
    setSelectedColor(s, selected, toKeep);
    s.refresh();
}
// Reset all selections
export function resetStates(s) {
    s.graph.nodes().forEach(function (n) {
        n.color = n.originalColor;
    });
    s.graph.edges().forEach(function (e) {
        e.color = e.originalColor;
    });
}
// Capitalise first letter
export function fCapital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// Return matching items from two arrays
export function returnMatchingArrayItems(array1, array2) {
    let retain = [];
    for (var i = 0; i < array1.length; i += 1) {
        if (array2.indexOf(array1[i]) > -1) {
            retain.push(array1[i]);
        }
    }
    return retain;
}
// I think we have a bit of an issue, because a context might connect with many nodes, without the nodes conecting between them
// for example (huberman-emotions),for context 17, physiological-sigh connects with heart-rate,lungs, mouth, parasympathetic-system, emotional-regulation
// distress	connects with physiological-sigh, emotional-regulation. 17 connects with all those, but distress does not connect with mouth
// Which means that after selecting distress, mouth is not highlighted, and seems irrelevant.
// there are several ways forward. one is to redo all connections and make sure everything connects with everything. 
// this will make the graph look more busy, and will make some connections we might not want to make, but will have some consistency in user experience
// 2 - not allow more than 2 selections. We make a commitment to only show stuff that are directly connected,
// we rely on the graph for those and connections like distress-mouth will remain hidden.
// 3 - we allow as many connections we want. We look into the contexts and manually find all relevant nodes.
// mouth will be visible after selecting distress, but will be lacking an edge. The question is if edges are not there to help 
// visually on selection, what is their purpose
// I will go with option 2 for now but might need to review this.
// Return all relevant nodes to be kept
export function nodesToKeep(s, selected, contexts, context_links, percent) {
    let toKeep = []; // array of nodes
    if (selected.length == 0) { // if no selected, add them all
        s.graph.nodes().forEach(function (n) {
            toKeep.push(n.id);
        });
    }
    else if (selected.length == 1) { // when one is selected, find all connections
        // add all neighbors
        toKeep = Object.keys(s.graph.neighbors(selected[0]));
        // add itself
        toKeep.push(selected[0]);
    }
    else if (selected.length == 2) { // if two are already selected, just return those two
        toKeep.push(selected[0]);
        toKeep.push(selected[1]);
    }
    // filter on percentage if applicable
    if (percent > 0 && percent < 100) {
        let perNodes = percentNodesToKeep(s, contexts, context_links, percent);
        toKeep = returnMatchingArrayItems(toKeep, perNodes);
    }
    return toKeep;
}
// Set the color of all selected nodes
export function setSelectedColor(s, selected, toKeep) {
    if (selected.length > 0) {
        s.graph.nodes().forEach(function (n) {
            if (selected.includes(n.id)) {
                n.color = n.selectedColor;
            }
            else if (!toKeep.includes(n.id)) {
                n.color = n.inactiveColor;
            }
        });
    }
}
// Grey out all edges that are not bewteen active nodes
export function setEdgesToInactive(s, nodesToKeep) {
    s.graph.edges().forEach(function (e) {
        if (nodesToKeep.includes(e.source) && nodesToKeep.includes(e.target)) {
            e.color = e.originalColor;
        }
        else {
            e.color = e.inactiveColor;
        }
    });
}
export function addSlider(parent, name, min, max, value, onChange) {
    var sliderContainer = document.createElement("div");
    sliderContainer.classList.add("slider-container");
    parent.appendChild(sliderContainer);
    var slider = document.createElement("input");
    slider.id = name + "-slider";
    slider.type = "range";
    slider.min = min;
    slider.max = max;
    slider.value = value;
    slider.classList.add("slider");
    slider.onchange = onChange;
    sliderContainer.appendChild(slider);
    // Add a span to show the slider's value
    var sliderOutput = document.createElement("span");
    sliderOutput.id = name + "-slider-output";
    sliderOutput.classList.add("slider-output");
    sliderOutput.innerHTML = value + "% completed";
    sliderContainer.appendChild(sliderOutput);
}
export function percentNodesToKeep(s, contexts, context_links, percent) {
    // filter nodes by finding max id
    let maxId = 0;
    for (let row of contexts) {
        if (row.Percent <= percent) {
            maxId = +row.Id;
        }
        else {
            break;
        }
    }
    // get corresponding names and remove duplicates
    let nodeNamesToKeep = [];
    for (let row of context_links) {
        if (row.Context <= maxId) {
            let rowNodes = Object.values(row);
            nodeNamesToKeep.push(...rowNodes);
        }
        else {
            break;
        }
    }
    let uniqueNodeNamesToKeep = [...new Set(nodeNamesToKeep)];
    return uniqueNodeNamesToKeep;
}
export function filterByPercent(s, selected, contexts, context_links, percent) {
    let toKeep = nodesToKeep(s, selected, contexts, context_links, percent);
    hideNodes(s, toKeep);
    setSelectedColor(s, selected, toKeep);
}
function zoomIn(s) {
    let c = s.camera;
    c.goTo({
        ratio: c.ratio / c.settings('zoomingRatio')
    });
}
function zoomOut(s) {
    let c = s.camera;
    c.goTo({
        ratio: c.ratio * c.settings('zoomingRatio')
    });
}
export function setupZoomButtons(s) {
    let zoomInButton = document.getElementById('zoom-in-button');
    zoomInButton.addEventListener("click", function () { zoomIn(s); });
    let zoomOutButton = document.getElementById('zoom-out-button');
    zoomOutButton.addEventListener("click", function () { zoomOut(s); });
}
export function createLegend(categories, getColor) {
    let container = document.getElementById('node-legend');
    for (let cat of categories) {
        let legend_item = document.createElement("div");
        legend_item.classList.add('legend-item');
        let legend_dot = document.createElement("div");
        legend_dot.classList.add('legend-dot');
        legend_dot.style.backgroundColor = getColor.get(cat.class);
        legend_item.appendChild(legend_dot);
        let legend_label = document.createElement("div");
        legend_label.classList.add('legend-label');
        legend_label.innerHTML = cat.name;
        legend_item.appendChild(legend_label);
        container.appendChild(legend_item);
    }
}
export function populateSearchList(s) {
    let container = document.getElementById('nodes-datalist');
    s.graph.nodes().forEach(function (n) {
        let item = document.createElement('option');
        item.value = n.label;
        container.appendChild(item);
    });
}
