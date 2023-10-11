// Only show notes relevant to selected nodes, or all notes if no nodes are selected
function updateContextText(contexts, context_links, selected, percent, type) {
    let contextsToKeep = [];
    let linksToKeep = []; // array of numbers as strings

    // Remove old wrapper
    document.querySelectorAll('#context_wrapper').forEach(function (a) {
        a.remove()
    });

    // Initialise new wrapper
    let context_container = document.getElementById('context_container');
    let context_wrapper = document.createElement("div");
    context_wrapper.id = "context_wrapper";
    context_container.appendChild(context_wrapper);

    // Show only relevant contexts, or all contexts if none is selected
    if (Object.keys(selected).length > 0) {
        let keys = Object.keys(selected);
        for (let row of context_links) {
            let nodes = Object.values(row);
            if (keys.length > 1) {
                if (nodes.includes(keys[0]) && nodes.includes(keys[1])) {
                    linksToKeep.push(row.Context);
                }
            } else {
                if (nodes.includes(keys[0])) {
                    linksToKeep.push(row.Context);
                }
            }
        }
        // keep only unique values
        linksToKeep = [...new Set(linksToKeep)];

        contextsToKeep = contexts.filter(c => linksToKeep.includes(c.Id));
    } else {
        contextsToKeep = contexts;
    }

    // if a percentage is provided, use it as filter
    if (Number.isInteger(percent)) {
        contextsToKeep = contextsToKeep.filter(c => +c.Percent <= percent);
    }
    setContextTitle(selected, context_wrapper);

    setContextNotes(type, contextsToKeep, context_wrapper)  

    // wrap the container on a simplebar for customised scroll bars
    new SimpleBar(context_wrapper, {
        autoHide: false,
    });
}

function setContextTitle(selected, context_wrapper){
    let context_header = document.createElement("div");
    context_header.classList.add("context-title-container");
    let context_title = document.createElement("div");
    context_title.classList.add("context-title");

    let count = 0;
    if (Object.keys(selected).length > 0){
        context_title.innerHTML = "Notes for ";
        context_header.appendChild(context_title);
            Object.keys(selected).forEach(function (key) {

                if (count > 0){
                    let node_plus = document.createElement("div");
                    node_plus.classList.add("context-title");
                    node_plus.innerHTML = "&";
                    context_header.appendChild(node_plus);
                }
                let node_item = document.createElement("div");
                node_item.classList.add("node-item");
                node_item.innerHTML = selected[key].label;
                context_header.appendChild(node_item);
                count++;
            });
        let node_dot = document.createElement("div");
        node_dot.classList.add("context-title");
        node_dot.innerHTML = ":";
        context_header.appendChild(node_dot);
    } else {
        context_title.innerHTML = "All notes:";
        context_header.appendChild(context_title);
    }
    context_wrapper.appendChild(context_header);
}

function setContextNotes(type, contextsToKeep, context_wrapper) {
    if (type == "reference") {
        // create context elements
        for (let context of contextsToKeep) {
            let note = context.Context;
            let video = "";

            // TODO this should be handled on the individual page
            if (context.Video == "podcast_10") {
                video = "https://www.youtube.com/watch?v=ntfcfJ28eiU";
            } else if (context.Video == "podcast_11") {
                video = "https://www.youtube.com/watch?v=XfURDjegrAw";
            } else if (context.Video == "podcast_12") {
                video = "https://www.youtube.com/watch?v=vA50EK70whE";
            } else if (context.Video == "podcast_13") {
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
    } else if (type == "simple") {
        for (let context of contextsToKeep) {
            let context_text = document.createElement("p");
            context_text.innerHTML = context.Context;
            context_wrapper.appendChild(context_text);
        }
    }
}

// Toggle select a node
function nodeSelect(s, selected, contexts, context_links, file1, file2, percent, type) {
    if (Object.keys(selected).length == 0) { // If no nodes are selected after click we just reset the graph
        resetStates(s);
    } else if (Object.keys(selected).length == 1) { // If one is selected, find all relevant nodes
        let toKeep = nodesToKeep(s, selected, file1, file2, percent);
        
        // Grey out irrelevant edges 
        setEdgesToInactive(s, toKeep);
        hideNodes(s, toKeep);
        setSelectedColor(s, selected, toKeep);
    } else if (Object.keys(selected).length > 1) { // If two are selected, grey out further options
        setEdgesToInactive(s, selected);
        hideNodes(s, selected);
        setSelectedColor(s, selected, selected);
    }

    updateContextText(contexts, context_links, selected, percent, type);
    s.refresh();
}

// Highlight hovered node and relevant nodes by greying out all else
function nodeHover(s, node, selected, file1, file2, percent) {
    var selectedAndHovered = [];
    // Make a copy of selected and add the hovered node
    Object.assign(selectedAndHovered, selected);
    selectedAndHovered[node.id] = node;
    var toKeep = nodesToKeep(s, selectedAndHovered, file1, file2, percent);

    hideNodes(s, toKeep);
}

function hideNodes(s, toKeep) {
    s.graph.nodes().forEach(function (n) {
        if (toKeep[n.id]) {
            n.color = n.originalColor;
        } else {
            n.color = n.inactiveColor;
        }
    });
    // Grey out irrelevant edges 
    setEdgesToInactive(s, toKeep);
    s.refresh();
}

// Return graph to pre-hover state
function nodeHoverOut(s, selected, file1, file2, percent) {
    // Start clean, and then figure out what needs to be greyed out according to selected nodes and percentage
    resetStates(s);

    var toKeep = nodesToKeep(s, selected, file1, file2, percent);

    hideNodes(s, toKeep);
    setSelectedColor(s, selected, toKeep);
    s.refresh();

}

// Reset all selections
function resetStates(s) {
    s.graph.nodes().forEach(function (n) {
        n.color = n.originalColor;
    });
    s.graph.edges().forEach(function (e) {
        e.color = e.originalColor;
    });
}

// Capitalise first letter
function fCapital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Return matching items from two arrays
function returnMatchingArrayItems(array1, array2) {
    retain = [];

    for (var i = 0; i < array1.length; i += 1) {
        if (array2.indexOf(array1[i]) > -1) {
            retain.push(array1[i]);
        }
    }
    return retain;
}

// Return matching nodes from two arrays - 
// for instance when two nodes are selected only common neighbors should be shown
function returnMatchingNodes(array1, array2) {
    var retainKeys = returnMatchingArrayItems(Object.keys(array1), Object.keys(array2)),
        retainNodes = [];

    for (let id of retainKeys) {
        retainNodes[id] = array1[id];
    }
    return retainNodes;
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
function nodesToKeep(s, selected, file1, file2, percent) {
    let toKeep = []; // array of nodes

    if (Object.keys(selected).length == 0) { // if no selected, add them all
        let all_nodes = s.graph.nodes();
        for (let node of all_nodes) {
            toKeep[node.id] = node;
        }
    } else if (Object.keys(selected).length == 1) { // when one is selected, find all connections
        let key = Object.keys(selected)[0];
        // add all neighbors
        toKeep = s.graph.neighbors(key);
        // add itself
        toKeep[key] = selected[key];
    } else if (Object.keys(selected).length == 2) { // if two are already selected, just return those two
        toKeep = selected;
    }

    // filter on percentage if applicable
    if (percent != null && percent < 100) {
        let perNodes = percentNodesToKeep(s, file1, file2, percent);
        toKeep = returnMatchingNodes(toKeep, perNodes);
    }

    return toKeep;
}

// Set the color of all selected nodes
function setSelectedColor(s, selected, toKeep) {
    if (Object.keys(selected).length > 0) {
        s.graph.nodes().forEach(function (n) {

            if (selected[n.id]) {
                n.color = n.selectedColor;
            } else if (!toKeep[n.id]) {
                n.color = n.inactiveColor;
            }
        });
    }
}

// Grey out all edges that are not bewteen active nodes
function setEdgesToInactive(s, nodesToKeep) {
    s.graph.edges().forEach(function (e) {
        if (nodesToKeep[e.source] && nodesToKeep[e.target]) {
            e.color = e.originalColor;
        } else {
            e.color = e.inactiveColor;
        }
    });
}

function addSlider(parent, name, min, max, value, onChange) {
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

function percentNodesToKeep(s, file1, file2, percent) {
    // filter nodes by finding max id
    let maxId = 0;
    for (let row of file1) {
        if (row.Percent <= percent) {
            maxId = +row.Id;
        } else {
            break;
        }
    }

    // get corresponding names and remove duplicates
    let nodeNamesToKeep = [];
    for (let row of file2) {
        if (row.Context <= maxId) {
            for (let k of Object.keys(row)) {
                nodeNamesToKeep.push(row[k])
            }
        } else {
            break;
        }
    }
    let uniqueNodeNamesToKeep = [...new Set(nodeNamesToKeep)];

    // now get the actual nodes from the graph
    let nodesToKeep = [];
    for (let name of uniqueNodeNamesToKeep) {
        nodesToKeep[name] = s.graph.nodes(name);
    }

    return nodesToKeep;
}

function filterByPercent(s, selected, file1, file2, percent) {
    let toKeep = nodesToKeep(s, selected, file1, file2, percent);

    hideNodes(s, toKeep);
    setSelectedColor(s, selected, toKeep);
}