

function fCapital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function fLower(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}
function numberFormatterInteger(number) {
    var value = number.toLocaleString(undefined, { maximumFractionDigits: 0 });
    return value;
}
function numberFormatterPercentage(number) {
    var value = number.toLocaleString(undefined, { maximumFractionDigits: 2 });
    return value;
}
function numberFormatterSeparator(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function addLineBreaks(input, lineSize) {
    var returnText = [];
    var workingText = input;
    if (input.length <= lineSize) {
        returnText.push(input);
    } else {
        while (workingText.length > lineSize) {
            var line = workingText.substring(0, lineSize)

            // Find the latest white space and try to break there
            var lastSpaceRgx = /\s(?!.*\s)/;
            var idx = line.search(lastSpaceRgx);
            if (idx > 0) {
                line = line.substring(0, idx);
                workingText = workingText.substring(idx);
            }
            returnText.push(line);
        }
        returnText.push(workingText);
    }
    return returnText;
}
function getCountryCode(country) {
    var countryCode = {
        "Afghanistan": "AFG",
        "Albania": "ALB",
        "Algeria": "DZA",
        "American Samoa": "ASM",
        "Andorra": "AND",
        "Angola": "AGO",
        "Anguilla": "AIA",
        "Antigua and Barbuda": "ATG",
        "Argentina": "ARG",
        "Armenia": "ARM",
        "Aruba": "ABW",
        "Australia": "AUS",
        "Austria": "AUT",
        "Azerbaijan": "AZE",
        "Bahamas": "BHS",
        "Bahrain": "BHR",
        "Bangladesh": "BGD",
        "Barbados": "BRB",
        "Belarus": "BLR",
        "Belgium": "BEL",
        "Belize": "BLZ",
        "Benin": "BEN",
        "Bermuda": "BMU",
        "Bhutan": "BTN",
        "Bolivia": "BOL",
        "Bolivia (Plurinational State of)": "BOL",
        "Bonaire, Sint Eustatius and Saba": "BES",
        "Bosnia and Herzegovina": "BIH",
        "Botswana": "BWA",
        "Brazil": "BRA",
        "British Virgin Islands": "VSB",
        "Brunei": "BRN",
        "Brunei Darussalam": "BRN",
        "Bulgaria": "BGR",
        "Burkina Faso": "BFA",
        "Burundi": "BDI",
        "Cabo Verde": "CPV",
        "Cambodia": "KHM",
        "Cameroon": "CMR",
        "Canada": "CAN",
        "Cape Verde": "CPV",
        "Cayman Islands": "CYM",
        "Central African Republic": "CAF",
        "Chad": "TCD",
        "Channel Islands": "JEY",
        "Chile": "CHL",
        "China": "CHN",
        "China, Macao SAR": "MAC",
        "China, Hong Kong SAR": "HKG",
        "Colombia": "COL",
        "Comoros": "COM",
        "Congo": "COG",
        "Congo (Brazzaville)": "COG",
        "Congo, Democratic Republic of": "COD",
        "Congo (Kinshasa)": "COD",
        "Cook Islands": "COK",
        "Costa Rica": "CRI",
        "Cote d'Ivoire": "CIV",
        "Croatia": "HRV",
        "Cuba": "CUB",
        "Curacao": "CUW",
        "Cyprus": "CYP",
        "Czech Republic": "CZE",
        "Czechia": "CZE",
        "Democratic Republic of the Congo": "COD",
        "Denmark": "DNK",
        "Djibouti": "DJI",
        "Dominica": "DMA",
        "Dominican Republic": "DOM",
        "Ecuador": "ECU",
        "Egypt": "EGY",
        "El Salvador": "SLV",
        "Equatorial Guinea": "GNQ",
        "Eritrea": "ERI",
        "Estonia": "EST",
        "Ethiopia": "ETH",
        "Faeroe Islands": "FRO",
        "Faroe Islands": "FRO",
        "Falkland Islands (Malvinas)": "FLK",
        "Fiji": "FJI",
        'Finland': 'FIN',
        "France": "FRA",
        "French Guiana": "GUF",
        "French Polynesia": "PYF",
        "Gabon": "GAB",
        "Gambia": "GMB",
        "Georgia": "GEO",
        "Germany": "DEU",
        "Ghana": "GHA",
        "Gibraltar": "GIB",
        "Greece": "GRC",
        "Greenland": "GRL",
        "Grenada": "GRD",
        "Guam": "GUM",
        "Guadeloupe": "GLP",
        "Guatemala": "GTM",
        "Guinea": "GIN",
        "Guinea-Bissau": "GNB",
        "Guyana": "GUY",
        "Haiti": "HTI",
        "Holy See": "VAT",
        "Honduras": "HND",
        "Hungary": "HUN",
        "Iceland": "ISL",
        "India": "IND",
        "Indonesia": "IDN",
        "Iran": "IRN",
        "Iran, Islamic Republic of": "IRN",
        "Iran (Islamic Republic of)": "IRN",
        "Iraq": "IRQ",
        "Ireland": "IRL",
        "Isle of Man": "IMN",
        "Israel": "ISR",
        "Italy": "ITA",
        "Jamaica": "JAM",
        "Japan": "JPN",
        "Jordan": "JOR",
        "Kazakhstan": "KAZ",
        "Kenya": "KEN",
        "Kiribati": "KIR",
        "Korea, Democratic People's Republic of": "PRK",
        "Dem. People's Republic of Korea": "PRK",
        "Korea, Republic of": "KOR",
        "Republic of Korea": "KOR",
        "Korea, South": "KOR",
        "Kosovo": "RKS",
        "Kuwait": "KWT",
        "Kyrgyzstan": "KGZ",
        "Laos": "LAO",
        "Lao People's Democratic Republic": "LAO",
        "Latvia": "LVA",
        "Lebanon": "LBN",
        "Lesotho": "LSO",
        "Liberia": "LBR",
        "Libya": "LBY",
        "Libyan Arab Jamahiriya": "LBY",
        "Liechtenstein": "LIE",
        "Lithuania": "LTU",
        "Luxembourg": "LUX",
        "Macedonia": "MKD",
        "Macedonia TFYR": "MKD",
        "TFYR Macedonia": "MKD",
        "North Macedonia": "MKD",
        "Madagascar": "MDG",
        "Malawi": "MWI",
        "Malaysia": "MYS",
        "Maldives": "MDV",
        "Mali": "MLI",
        "Malta": "MLT",
        "Marshall Islands": "MHL",
        "Martinique": "MTQ",
        "Mauritania": "MRT",
        "Mauritius": "MUS",
        "Mayotte": "MYT",
        "Mexico": "MEX",
        "Micronesia, Federated States of": "FSM",
        "Micronesia (Fed. States of)": "FSM",
        "Federated States of Micronesia": "FSM",
        "Moldova": "MDA",
        "Republic of Moldova": "MDA",
        "Monaco": "MCO",
        "Mongolia": "MNG",
        "Montenegro": "MNE",
        "Montserrat": "MSR",
        "Morocco": "MAR",
        "Mozambique": "MOZ",
        "Myanmar": "MMR",
        "Burma": "MMR",
        "Namibia": "NAM",
        "Nauru": "NRU",
        "Nepal": "NPL",
        "Netherlands": "NLD",
        "Caribbean Netherlands": "ANT",
        "New Caledonia": "NCL",
        "New Zealand": "NZL",
        "New Zealand*": "NZL",
        "Nicaragua": "NIC",
        "Niger": "NER",
        "Nigeria": "NGA",
        "North Korea": "PRK",
        "Northern Mariana Islands": "MNP",
        "Norway": "NOR",
        "Niue": "NIU",
        "Oman": "OMN",
        "Pakistan": "PAK",
        "Palau": "PLW",
        "Palestine": "PSE",
        "State of Palestine": "PSE",
        "West Bank and Gaza": "PSE",
        "Panama": "PAN",
        "Papua New Guinea": "PNG",
        "Paraguay": "PRY",
        "Peru": "PER",
        "Philippines": "PHL",
        "Poland": "POL",
        "Portugal": "PRT",
        "Puerto Rico": "PRI",
        "Qatar": "QAT",
        "Reunion": "REU",
        "Romania": "ROU",
        "Russian Federation": "RUS",
        "Russia": "RUS",
        "Rwanda": "RWA",
        "Saint Barthelemy": "BLM",
        "Saint Helena": "SHN",
        "Saint Kitts and Nevis": "KNA",
        "Saint Lucia": "LCA",
        "Sint Maarten (Dutch part)": "SXM",
        "Sint Maarten": "SXM",
        "Saint Martin (French part)": "MAF",
        "St Martin": "MAF",
        "Saint Pierre and Miquelon": "SPM",
        "Saint Vincent and the Grenadines": "VCT",
        "Samoa": "WSM",
        "San Marino": "SMR",
        "Sao Tome and Principe": "STP",
        "Saudi Arabia": "SAU",
        "Senegal": "SEN",
        "Serbia": "SRB",
        "Seychelles": "SYC",
        "Sierra Leone": "SLE",
        "Singapore": "SGP",
        "Slovakia": "SVK",
        "Slovenia": "SVN",
        "Solomon Islands": "SLB",
        "Somalia": "SOM",
        "South Africa": "ZAF",
        "South Korea": "KOR",
        "South Sudan": "SSD",
        "Spain": "ESP",
        "Sri Lanka": "LKA",
        "Sudan": "SDN",
        "Suriname": "SUR",
        "Swaziland": "SWZ",
        "Eswatini": "SWZ",
        "Sweden": "SWE",
        "Switzerland": "CHE",
        "Syria": "SYR",
        "Syrian Arab Republic": "SYR",
        "Taiwan (Province of China)": "TWN",
        "China, Taiwan Province of China": "TWN",
        "Taiwan*": "TWN",
        "Tajikistan": "TJK",
        "Tanzania": "TZA",
        "Tanzania, United Republic of": "TZA",
        "United Republic of Tanzania": "TZA",
        "Thailand": "THA",
        "The Bahamas": "BHS",
        "The Gambia": "GMB",
        "Timor-Leste": "TLS",
        "Togo": "TGO",
        "Tokelau": "TKL",
        "Tonga": "TON",
        "Trinidad and Tobago": "TTO",
        "Tunisia": "TUN",
        "Turkey": "TUR",
        "Turkmenistan": "TKM",
        "Turks and Caicos Islands": "TCA",
        "Tuvalu": "TUV",
        "Uganda": "UGA",
        "Ukraine": "UKR",
        "United Arab Emirates": "ARE",
        "United Kingdom": "GBR",
        "United States": "USA",
        "USA": "USA",
        "United States Virgin Islands": "VIR",
        "United States of America": "USA",
        "Uruguay": "URY",
        "Uzbekistan": "UZB",
        "Vanuatu": "VUT",
        "Venezuela": "VEN",
        "Venezuela, Bolivarian Republic of": "VEN",
        "Venezuela (Bolivarian Republic of)": "VEN",
        "Vietnam": "VNM",
        "Viet Nam": "VNM",
        "Virgin Islands, U.S.": "VIR",
        "Wallis and Futuna Islands": "WLF",
        "Western Sahara": "ESH",
        "Yemen": "YEM",
        "Zambia": "ZMB",
        "Zimbabwe": "ZWE"
    };

    var code = countryCode[country];
    if (!code) {
        console.log("Code not found for " + country)
    }
    return code;
}

// Create legend
function createLegend(chart_points, data, parentContainer) {
    // Chart points and data will difer in cases where we only want to show a subset on the legend

    // Remove old legend items if they exist
    document.querySelectorAll(parentContainer + ' .legend-item').forEach(function (a) {
        a.remove()
    })

    $legend = $(parentContainer + ' .chart-legend');
    // Append legend items
    for (let point of data) {
        $legend.append('<div class="legend-item"><div class="dot legend-color-' + point.colorIndex + '" ></div><div class="serieName" id="">' + fCapital(point.name) + '</div></div>');
    }

    // Click effect for legend
    $(parentContainer + ' .legend-item').click(function () {
        var name = this.textContent;
        for (let point of chart_points) {
            if (point.name === name || point.from === name) {
                point.select(true, false);
            }
        }
    });

    // Hover effect for legend
    $(parentContainer + ' .legend-item').mouseenter(function () {
        var name = this.textContent;

        for (let point of chart_points) {
            if (point.name === name || point.from === name) { // from is for dependency wheel
                point.setState('hover');
            } else {
                point.setState('inactive');
            }
        }
    });

    // Remove all states on mouse out
    $(parentContainer + ' .legend-item').mouseout(function (event) {
        var e = event.toElement || event.relatedTarget,
            i = 0;
        if (e.parentNode == this || e == this) {
            return;
        }

        for (let point of chart_points) {
            point.setState('');
        }
    })
}

// Create legend for multiple charts
function createMultiLegend(chart1_points, chart2_points, parentContainer) {

    // Remove old legend items if they exist
    document.querySelectorAll(parentContainer + ' .legend-item').forEach(function (a) {
        a.remove()
    })

    pointNames = [];

    for (point of chart1_points) {
        var nam = point.userOptions.name;
        var po = { name: nam, color: point.userOptions.colorIndex };
        pointNames.push(po);
    }

    for (point of chart2_points) {
        var nam = point.userOptions.name;
        if (pointNames.filter(pointNames => pointNames.name === nam).length == 0) {
            var po = { name: nam, color: point.userOptions.colorIndex };
            pointNames.unshift(po);
        }
    }

    $legend = $(parentContainer + ' .chart-legend');
    // Append legend items
    for (let point of pointNames) {
        $legend.append('<div class="legend-item"><div class="dot legend-color-' + point.color + '" ></div><div class="serieName" id="">' + fCapital(point.name) + '</div></div>');
    }

    // Click effect for legend
    $(parentContainer + ' .legend-item').click(function () {
        var name = this.textContent;
        for (let point of chart1_points) {
            if (point.name === name || point.from === name) {
                point.select(true, false);
            }
        }
        for (let point of chart2_points) {
            if (point.name === name || point.from === name) {
                point.select(true, false);
            }
        }
    });

    // Hover effect for legend
    $(parentContainer + ' .legend-item').mouseenter(function () {
        var name = this.textContent;

        for (let point of chart1_points) {
            if (point.name === name || point.from === name) { // from is for dependency wheel
                point.setState('hover');
            } else {
                point.setState('inactive');
            }
        }
        for (let point of chart2_points) {
            if (point.name === name || point.from === name) { // from is for dependency wheel
                point.setState('hover');
            } else {
                point.setState('inactive');
            }
        }
    });

    // Remove all states on mouse out
    $(parentContainer + ' .legend-item').mouseout(function (event) {
        var e = event.toElement || event.relatedTarget,
            i = 0;
        if (e.parentNode == this || e == this) {
            return;
        }

        for (let point of chart1_points) {
            point.setState('');
        }
        for (let point of chart2_points) {
            point.setState('');
        }
    })
}

function addDropdown(parent, name, width, taxonChange, options, selected) {
    var selectContainer = document.createElement("div");
    selectContainer.classList.add("dropdown-container");
    selectContainer.style.width = width;
    parent.appendChild(selectContainer);

    // Create and append list
    var select = document.createElement("select");
    select.id = name + "-select";
    select.onchange = taxonChange;
    selectContainer.appendChild(select);

    for (let op of options) {
        select.add(new Option(op));
    }
    select.value = selected;

}

function addSlider(parent, name, min, max, value, containerWidth, width, onChange) {
    var sliderContainer = document.createElement("div");
    sliderContainer.classList.add("slider-container");
    sliderContainer.style.width = containerWidth + "px";
    parent.appendChild(sliderContainer);

    var slider = document.createElement("input");
    slider.id = name + "-slider";
    slider.type = "range";
    slider.min = min;
    slider.max = max;
    slider.value = value;
    slider.style.width = (containerWidth - width - 40) + "px";
    slider.classList.add("slider");
    slider.onchange = onChange;
    sliderContainer.appendChild(slider);

    // Add a span to show the slider's value
    var sliderOutput = document.createElement("span");
    sliderOutput.id = name + "-slider-output";
    //percentageSliderOutput.for = "mapPercentageSlider";
    sliderOutput.classList.add("slider-output");
    sliderOutput.innerHTML = value;
    sliderOutput.style.width = width + "px";
    sliderContainer.appendChild(sliderOutput);
}
function getIndexColor(indx) {
    let indexColor = {
        "0": "#B3DBFF",
        "1": "#66B8FF",
        "2": "#1A94FF",
        "3": "#0070D1",
        "4": "#005299",
        "5": "#003666",
        "6": "#001B33",
        "7": "#FFFF99",
        "8": "#FFFF4D",
        "9": "#FFFF1A",
        "10": "#C7C705",
        "11": "#919108",
        "12": "#5E5E08",
        "13": "#2E2E05",
        "14": "#FAD1EC",
        "15": "#F48BCF",
        "16": "#ED45B2",
        "17": "#D1158F",
        "18": "#970F67",
        "19": "#5D0940",
        "20": "#2E0520",
        "21": "#7DE87D",
        "22": "#52E052",
        "23": "#23CA23",
        "24": "#1B981B",
        "25": "#136C13",
        "26": "#0B410B",
        "27": "#041604",
        "28": "#F18E8E",
        "29": "#EB6060",
        "30": "#E63333",
        "31": "#CC1919",
        "32": "#881111",
        "33": "#440808",
        "34": "#170303",
        "35": "#e7d7f4",
        "36": "#C29CE2",
        "37": "#9D61D1",
        "38": "#772EB8",
        "39": "#501980",
        "40": "#360D59",
        "41": "#1B042F",
        "42": "#FFDBB3",
        "43": "#FFB866",
        "44": "#FFA033",
        "45": "#FF8800",
        "46": "#CC6D00",
        "47": "#804400",
        "48": "#4D2900",
        "49": "#ddc3c3",
        "50": "#8B9595",
        "51": "#101414",
        "52": "#DDDDDD",
    };

    let color = indexColor[indx];
    if (!color) {
        console.log("Color not found for index " + indx)
    }
    return color;
}

// highcharts global oprions
Highcharts.setOptions({
    chart: {
        styledMode: true,
    },
    defs: {
        gradient0: {
            tagName: 'linearGradient',
            id: 'gradient-0',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient1: {
            tagName: 'linearGradient',
            id: 'gradient-1',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient2: {
            tagName: 'linearGradient',
            id: 'gradient-2',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient3: {
            tagName: 'linearGradient',
            id: 'gradient-3',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient4: {
            tagName: 'linearGradient',
            id: 'gradient-4',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient5: {
            tagName: 'linearGradient',
            id: 'gradient-5',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient6: {
            tagName: 'linearGradient',
            id: 'gradient-6',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient7: {
            tagName: 'linearGradient',
            id: 'gradient-7',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient8: {
            tagName: 'linearGradient',
            id: 'gradient-8',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },

        gradient9: {
            tagName: 'linearGradient',
            id: 'gradient-9',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient10: {
            tagName: 'linearGradient',
            id: 'gradient-10',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient11: {
            tagName: 'linearGradient',
            id: 'gradient-11',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient12: {
            tagName: 'linearGradient',
            id: 'gradient-12',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient13: {
            tagName: 'linearGradient',
            id: 'gradient-13',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient14: {
            tagName: 'linearGradient',
            id: 'gradient-14',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient15: {
            tagName: 'linearGradient',
            id: 'gradient-15',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient16: {
            tagName: 'linearGradient',
            id: 'gradient-16',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient17: {
            tagName: 'linearGradient',
            id: 'gradient-17',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient18: {
            tagName: 'linearGradient',
            id: 'gradient-18',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient19: {
            tagName: 'linearGradient',
            id: 'gradient-19',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient20: {
            tagName: 'linearGradient',
            id: 'gradient-20',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient21: {
            tagName: 'linearGradient',
            id: 'gradient-21',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient22: {
            tagName: 'linearGradient',
            id: 'gradient-22',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient23: {
            tagName: 'linearGradient',
            id: 'gradient-23',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient24: {
            tagName: 'linearGradient',
            id: 'gradient-24',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient25: {
            tagName: 'linearGradient',
            id: 'gradient-25',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient26: {
            tagName: 'linearGradient',
            id: 'gradient-26',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient27: {
            tagName: 'linearGradient',
            id: 'gradient-27',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient28: {
            tagName: 'linearGradient',
            id: 'gradient-28',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient29: {
            tagName: 'linearGradient',
            id: 'gradient-29',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient30: {
            tagName: 'linearGradient',
            id: 'gradient-30',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient31: {
            tagName: 'linearGradient',
            id: 'gradient-31',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient32: {
            tagName: 'linearGradient',
            id: 'gradient-32',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient33: {
            tagName: 'linearGradient',
            id: 'gradient-33',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient34: {
            tagName: 'linearGradient',
            id: 'gradient-34',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient35: {
            tagName: 'linearGradient',
            id: 'gradient-35',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient36: {
            tagName: 'linearGradient',
            id: 'gradient-36',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient37: {
            tagName: 'linearGradient',
            id: 'gradient-37',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient38: {
            tagName: 'linearGradient',
            id: 'gradient-38',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient39: {
            tagName: 'linearGradient',
            id: 'gradient-39',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient40: {
            tagName: 'linearGradient',
            id: 'gradient-40',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient41: {
            tagName: 'linearGradient',
            id: 'gradient-41',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient42: {
            tagName: 'linearGradient',
            id: 'gradient-42',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient43: {
            tagName: 'linearGradient',
            id: 'gradient-43',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient44: {
            tagName: 'linearGradient',
            id: 'gradient-44',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient45: {
            tagName: 'linearGradient',
            id: 'gradient-45',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient46: {
            tagName: 'linearGradient',
            id: 'gradient-46',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient47: {
            tagName: 'linearGradient',
            id: 'gradient-47',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient48: {
            tagName: 'linearGradient',
            id: 'gradient-48',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient49: {
            tagName: 'linearGradient',
            id: 'gradient-49',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient50: {
            tagName: 'linearGradient',
            id: 'gradient-50',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient51: {
            tagName: 'linearGradient',
            id: 'gradient-51',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient52: {
            tagName: 'linearGradient',
            id: 'gradient-52',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient0area: {
            tagName: 'linearGradient',
            id: 'gradient-area-0',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient1area: {
            tagName: 'linearGradient',
            id: 'gradient-area-1',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient2area: {
            tagName: 'linearGradient',
            id: 'gradient-area-2',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient3area: {
            tagName: 'linearGradient',
            id: 'gradient-area-3',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient4area: {
            tagName: 'linearGradient',
            id: 'gradient-area-4',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient5area: {
            tagName: 'linearGradient',
            id: 'gradient-area-5',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient6area: {
            tagName: 'linearGradient',
            id: 'gradient-area-6',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient7area: {
            tagName: 'linearGradient',
            id: 'gradient-area-7',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient8area: {
            tagName: 'linearGradient',
            id: 'gradient-area-8',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },

        gradient9area: {
            tagName: 'linearGradient',
            id: 'gradient-area-9',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient10area: {
            tagName: 'linearGradient',
            id: 'gradient-area-10',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient11area: {
            tagName: 'linearGradient',
            id: 'gradient-area-11',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient12area: {
            tagName: 'linearGradient',
            id: 'gradient-area-12',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient13area: {
            tagName: 'linearGradient',
            id: 'gradient-area-13',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient14area: {
            tagName: 'linearGradient',
            id: 'gradient-area-14',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient15area: {
            tagName: 'linearGradient',
            id: 'gradient-area-15',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient16area: {
            tagName: 'linearGradient',
            id: 'gradient-area-16',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient17area: {
            tagName: 'linearGradient',
            id: 'gradient-area-17',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient18area: {
            tagName: 'linearGradient',
            id: 'gradient-area-18',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient19area: {
            tagName: 'linearGradient',
            id: 'gradient-area-19',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient20area: {
            tagName: 'linearGradient',
            id: 'gradient-area-20',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient21area: {
            tagName: 'linearGradient',
            id: 'gradient-area-21',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient22area: {
            tagName: 'linearGradient',
            id: 'gradient-area-22',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient23area: {
            tagName: 'linearGradient',
            id: 'gradient-area-23',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient24area: {
            tagName: 'linearGradient',
            id: 'gradient-area-24',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient25area: {
            tagName: 'linearGradient',
            id: 'gradient-area-25',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient26area: {
            tagName: 'linearGradient',
            id: 'gradient-area-26',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient27area: {
            tagName: 'linearGradient',
            id: 'gradient-area-27',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient28area: {
            tagName: 'linearGradient',
            id: 'gradient-area-28',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient29area: {
            tagName: 'linearGradient',
            id: 'gradient-area-29',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient30area: {
            tagName: 'linearGradient',
            id: 'gradient-area-30',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient31area: {
            tagName: 'linearGradient',
            id: 'gradient-area-31',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient32area: {
            tagName: 'linearGradient',
            id: 'gradient-area-32',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient33area: {
            tagName: 'linearGradient',
            id: 'gradient-area-33',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient34area: {
            tagName: 'linearGradient',
            id: 'gradient-area-34',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient35area: {
            tagName: 'linearGradient',
            id: 'gradient-area-35',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient36area: {
            tagName: 'linearGradient',
            id: 'gradient-area-36',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient37area: {
            tagName: 'linearGradient',
            id: 'gradient-area-37',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient38area: {
            tagName: 'linearGradient',
            id: 'gradient-area-38',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient39area: {
            tagName: 'linearGradient',
            id: 'gradient-area-39',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient40area: {
            tagName: 'linearGradient',
            id: 'gradient-area-40',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient41area: {
            tagName: 'linearGradient',
            id: 'gradient-area-41',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient42area: {
            tagName: 'linearGradient',
            id: 'gradient-area-42',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient43area: {
            tagName: 'linearGradient',
            id: 'gradient-area-43',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient44area: {
            tagName: 'linearGradient',
            id: 'gradient-area-44',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient45area: {
            tagName: 'linearGradient',
            id: 'gradient-area-45',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient46area: {
            tagName: 'linearGradient',
            id: 'gradient-area-46',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient47area: {
            tagName: 'linearGradient',
            id: 'gradient-area-47',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient48area: {
            tagName: 'linearGradient',
            id: 'gradient-area-48',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient49area: {
            tagName: 'linearGradient',
            id: 'gradient-area-49',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient50area: {
            tagName: 'linearGradient',
            id: 'gradient-area-50',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient51area: {
            tagName: 'linearGradient',
            id: 'gradient-area-51',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
        gradient52area: {
            tagName: 'linearGradient',
            id: 'gradient-area-52',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [{
                tagName: 'stop',
                offset: 0
            }, {
                tagName: 'stop',
                offset: 1
            }]
        },
    },
    credits: {
        enabled: false
    },
});

