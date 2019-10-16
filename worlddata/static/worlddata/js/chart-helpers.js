

function fCapital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function numberFormatterInteger(number) {
    var value = number.toLocaleString(undefined, { maximumFractionDigits: 0 });
    return value;
}
function numberFormatterPercentage(number) {
    var value = number.toLocaleString(undefined, { maximumFractionDigits: 2 });
    return value;
}

// Create legend
function createLegend(chart, parentContainer) {

    // Remove old legend items if they exist
    document.querySelectorAll(parentContainer + ' .legend-item').forEach(function (a) {
        a.remove()
    })

    $legend = $(parentContainer + ' .chart-legend');
    // Append legend items
    $.each(chart.series[0].data, function (j, data) {
        $legend.append('<div class="legend-item"><div class="dot legend-color-' + data.colorIndex + '" ></div><div class="serieName" id="">' + fCapital(data.name) + '</div></div>');
    });

    // Click effect for legend
    $(parentContainer + ' .legend-item').click(function () {
        var inx = $(this).index();
        chart.series[0].data[inx].select();
    });

    // Hover effect for legend
    $(parentContainer + ' .legend-item').mouseenter(function () {
        var inx = $(this).index(),
            points = chart.series[0].data,
            i = 0;

        for (i = 0; i < points.length; i++) {
            if (i == inx) {
                points[i].setState('hover');
            } else {
                points[i].setState('inactive');
            }
        }
    });
    $(parentContainer + ' .legend-item').mouseout(function (event) {

        var e = event.toElement || event.relatedTarget;
        if (e.parentNode == this || e == this) {
            return;
        }

        points = chart.series[0].data,
            i = 0;

        for (i = 0; i < points.length; i++) {
            points[i].setState('');
        }
    })
}