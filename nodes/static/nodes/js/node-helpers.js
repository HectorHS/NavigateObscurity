// Show all selected nodes next to the notes for quick reference
function showSelectedNodes(selected) {
    // Remove old selecteed nodes
    document.querySelectorAll('.selected-node').forEach(function (a) {
        a.remove()
    });

    if (Object.keys(selected).length > 0) {
        var selected_container = document.getElementById('selected-nodes');
        Object.keys(selected).forEach(function (key) {
            var selected_item = document.createElement("div");
            selected_item.classList.add('selected-node');
            selected_item.innerHTML = selected[key].label;
            selected_container.appendChild(selected_item);
        });
    }
}

// Only show notes relevant to selected nodes, or all notes if no nodes are selected
function updateContextText(contexts, context_links, selected, percent) {
    let contextsToKeep,
        linksToKeep;

    // Remove old wrapper
    document.querySelectorAll('#context-wrapper').forEach(function (a) {
        a.remove()
    });

    // Initialise new wrapper
    let context_container = document.getElementById('context-container');
    let context_wrapper = document.createElement("div");
    context_wrapper.id = "context-wrapper";
    context_container.appendChild(context_wrapper);

    // Show only relevant contexts, or all contexts if none is selected
    if (Object.keys(selected).length > 0) {
        let i = 0;

        Object.keys(selected).forEach(function (key) {
            if (i == 0) {
                linksToKeep = context_links.filter(l => l.Node == selected[key].id).map(l => l.Context);
            } else {
                let tempLinks = context_links.filter(l => l.Node == selected[key].id).map(l => l.Context);
                linksToKeep = returnMatchingArrayItems(linksToKeep, tempLinks);
            }
            i++;
        });

        contextsToKeep = contexts.filter(c => linksToKeep.includes(c.Id));
    } else {
        contextsToKeep = contexts;
    }

    // if a percentage is provided, use it as filter
    if (Number.isInteger(percent)) {
        contextsToKeep = contextsToKeep.filter(c => +c.Percent <= percent);
    }

    // Append a header
    let context_header = document.createElement("h4");
    context_header.innerHTML = "Notes:";
    context_wrapper.appendChild(context_header);

    // Append a p element for each context
    for (let context of contextsToKeep) {
        let context_text = document.createElement("p");
        context_text.innerHTML = context.Context;
        context_wrapper.appendChild(context_text);
    }

    // wrap the container on a simplebar for customised scroll bars
    new SimpleBar(context_wrapper, {
        autoHide: false,
    });
}

// Toggle select a node
function nodeSelect(s, selected, contexts, context_links, percent) {
    // Making sure we have at least one node selected
    if (Object.keys(selected).length > 0) {
        var toKeep = nodesToKeep(s, selected);

        setSelectedColor(s, selected, toKeep);
        // Grey out irrelevant edges 
        setEdgesToInactive(s, toKeep);
    } else { // If no nodes are selected after click we just reset the graph
        resetStates(s);
    }
    showSelectedNodes(selected);
    updateContextText(contexts, context_links, selected, percent);
    s.refresh();
}

// Highlight hovered node and relevant nodes by greying out all else
function nodeHover(s, node, selected) {
    var selectedAndHovered = [];
    // Make a copy of selected and add the hovered node
    Object.assign(selectedAndHovered, selected);
    selectedAndHovered[node.id] = node;
    var toKeep = nodesToKeep(s, selectedAndHovered);

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
function nodeHoverOut() {
    // Start clean, and then figure out what needs to be greyed out according to selected nodes
    resetStates(s);

    if (Object.keys(selected).length > 0) {
        var toKeep = nodesToKeep(s, selected);

        setSelectedColor(s, selected, toKeep);
        setEdgesToInactive(s, toKeep);
    }
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

// Return all relevant nodes to be kept
function nodesToKeep(s, selected) {
    // Make sure selected is not empty when calling this
    var toKeep,
        i = 0;

    Object.keys(selected).forEach(function (key) {
        if (i == 0) {
            toKeep = s.graph.neighbors(key);
            toKeep[key] = selected[key];
        } else {
            var keep = s.graph.neighbors(key);
            keep[key] = selected[key];
            toKeep = returnMatchingNodes(toKeep, keep);
        }
        i++;
    });
    return toKeep;
}

// Set the color of all selected nodes
function setSelectedColor(s, selected, toKeep) {
    s.graph.nodes().forEach(function (n) {

        if (selected[n.id]) {
            n.color = n.selectedColor;
        }
        else if (!toKeep[n.id]) {
            n.color = n.inactiveColor;
        }
    });
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