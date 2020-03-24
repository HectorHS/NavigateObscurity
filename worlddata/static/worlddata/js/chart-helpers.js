

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
function numberFormatterSeparator(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        "Congo, Democratic Republic of": "COD",
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
        "Panama": "PAN",
        "Papua New Guinea": "PNG",
        "Paraguay": "PRY",
        "Peru": "PRY",
        "Philippines": "PER",
        "Poland": "POL",
        "Portugal": "PRT",
        "Puerto Rico": "PRI",
        "Qatar": "QAT",
        "Reunion": "REU",
        "Romania": "ROU",
        "Russian Federation": "RUS",
        "Rwanda": "RWA",
        "Saint Barthelemy": "BLM",
        "Saint Helena": "SHN",
        "Saint Kitts and Nevis": "KNA",
        "Saint Lucia": "LCA",
        "Sint Maarten (Dutch part)": "SXM",
        "Saint Martin (French part)": "MAF",
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

    // Create and append the options
    var template = '<option value="tempvalue">tempvalue</option>',
        selectedTemplate = '<option selected = "selected" value="tempvalue">tempvalue</option>';
    var placeholder = [];
    for (var i = 0; i < options.length; i++) {
        if (options[i] == selected) {
            placeholder.push(selectedTemplate.replace(/tempvalue/g, options[i]));
        } else {
            placeholder.push(template.replace(/tempvalue/g, options[i]));
        }
    }
    select.innerHTML = placeholder.join('');
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
    //percentageSliderOutput.for = "mapPercentageSlider";
    sliderOutput.classList.add("slider-output");
    sliderOutput.innerHTML = value;
    sliderContainer.appendChild(sliderOutput);
}
