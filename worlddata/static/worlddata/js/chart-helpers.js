

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
function getCountryCode(country) {
    var countryCode = {
        "Afghanistan": "AFG",
        "Albania": "ALB",
        "Algeria": "DZA",
        "American Samoa": "ASM",
        "Andorra": "AND",
        "Angola": "AGO",
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
        "Bosnia and Herzegovina": "BIH",
        "Botswana": "BWA",
        "Brazil": "BRA",
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
        "Chile": "CHL",
        "China": "CHN",
        "Colombia": "COL",
        "Comoros": "COM",
        "Congo": "COG",
        "Congo, Democratic Republic of": "COD",
        "Cook Islands": "COK",
        "Costa Rica": "CRI",
        "Cote d'Ivoire": "CIV",
        "Croatia": "HRV",
        "Cuba": "CUB",
        "Cyprus": "CYP",
        "Czech Republic": "CZE",
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
        "Federated States of Micronesia": "FSM",
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
        "Honduras": "HND",
        "Hungary": "HUN",
        "Iceland": "ISL",
        "India": "IND",
        "Indonesia": "IDN",
        "Iran": "IRN",
        "Iran, Islamic Republic of": "IRN",
        "Iraq": "IRQ",
        "Ireland": "IRL",
        "Israel": "ISR",
        "Italy": "ITA",
        "Jamaica": "JAM",
        "Japan": "JPN",
        "Jordan": "JOR",
        "Kazakhstan": "KAZ",
        "Kenya": "KEN",
        "Kiribati": "KIR",
        "Korea, Democratic People's Republic of": "PRK",
        "Korea, Republic of": "KOR",
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
        "Lithuania": "LTU",
        "Luxembourg": "LUX",
        "Macedonia": "MKD",
        "Macedonia TFYR": "MKD",
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
        "Mexico": "MEX",
        "Micronesia, Federated States of": "FSM",
        "Moldova": "MDA",
        "Mongolia": "MNG",
        "Montenegro": "MNE",
        "Montserrat": "MSR",
        "Morocco": "MAR",
        "Mozambique": "MOZ",
        "Myanmar": "MMR",
        "Namibia": "NAM",
        "Nepal": "NPL",
        "Netherlands": "NLD",
        "New Zealand": "NZL",
        "New Zealand*": "NZL",
        "Nicaragua": "NIC",
        "Niger": "NER",
        "Nigeria": "NGA",
        "North Korea": "PRK",
        "Northern Mariana Islands": "MNP",
        "Norway": "NOR",
        "Oman": "OMN",
        "Pakistan": "PAK",
        "Palestine": "PSE",
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
        "Saint Lucia": "LCA",
        "Saint Vincent and the Grenadines": "VCT",
        "Samoa": "WSM",
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
        "Sweden": "SWE",
        "Switzerland": "CHE",
        "Syria": "SYR",
        "Syrian Arab Republic": "SYR",
        "Taiwan (Province of China)": "TWN",
        "Tajikistan": "TJK",
        "Tanzania": "TZA",
        "Tanzania, United Republic of": "TZA",
        "Thailand": "THA",
        "The Bahamas": "BHS",
        "The Gambia": "GMB",
        "Timor-Leste": "TLS",
        "Togo": "TGO",
        "Tonga": "TON",
        "Trinidad and Tobago": "TTO",
        "Tunisia": "TUN",
        "Turkey": "TUR",
        "Turkmenistan": "TKM",
        "Uganda": "UGA",
        "Ukraine": "UKR",
        "United Arab Emirates": "ARE",
        "United Kingdom": "GBR",
        "United States": "USA",
        "United States of America": "USA",
        "Uruguay": "URY",
        "Uzbekistan": "UZB",
        "Vanuatu": "VUT",
        "Venezuela": "VEN",
        "Venezuela, Bolivarian Republic of": "VEN",
        "Vietnam": "VNM",
        "Viet Nam": "VNM",
        "Virgin Islands, U.S.": "VIR",
        "Yemen": "YEM",
        "Zambia": "ZMB",
        "Zimbabwe": "ZWE"
    };

    var code = countryCode[country];
    if (!code) { console.log("Code not found for " + country) }
    return code;
}

// Create legend
function createLegend(chart, parentContainer, type) {

    // Remove old legend items if they exist
    document.querySelectorAll(parentContainer + ' .legend-item').forEach(function (a) {
        a.remove()
    })

    $legend = $(parentContainer + ' .chart-legend');
    // Append legend items
    if (type == "stacked") {
        $.each(chart.series, function (j, data) {
            $legend.append('<div class="legend-item"><div class="dot legend-color-' + data.colorIndex + '" ></div><div class="serieName" id="">' + fCapital(data.name) + '</div></div>');
        });
    } else {
        $.each(chart.series[0].data, function (j, data) {
            $legend.append('<div class="legend-item"><div class="dot legend-color-' + data.colorIndex + '" ></div><div class="serieName" id="">' + fCapital(data.name) + '</div></div>');
        });
    }


    // Click effect for legend
    $(parentContainer + ' .legend-item').click(function () {
        var inx = $(this).index();
        if (type == "stacked") {
            chart.series[inx].select();
        } else {
            chart.series[0].data[inx].select();
        }
    });

    // Hover effect for legend
    $(parentContainer + ' .legend-item').mouseenter(function () {
        var inx = $(this).index(),
            i = 0;
        if (type == "stacked") {
            var points = chart.series;
        } else {
            var points = chart.series[0].data;
        }

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

        if (type == "stacked") {
            var points = chart.series;
        } else {
            var points = chart.series[0].data;
        }

        var i = 0;

        for (i = 0; i < points.length; i++) {
            points[i].setState('');
        }
    })
}
