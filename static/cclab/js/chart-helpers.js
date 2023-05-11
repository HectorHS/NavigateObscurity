function fCapital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function fLower(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}
function numberFormatter(number) {
    let numberFormated;
    if (number > 1000000) {
        let value = number / 1000000;
        numberFormated = value.toLocaleString(undefined, { maximumFractionDigits: 0 });
        return numberFormated + "m";
    } else if (number > 1000) {
        numberFormated = number.toLocaleString(undefined, { maximumFractionDigits: 0 });
    } else {
        numberFormated = number.toLocaleString(undefined, { maximumFractionDigits: 2 });
    } 
    return numberFormated;
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
        "Bonaire Sint Eustatius and Saba": "BES",
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
        "Macao": "MAC",
        "China, Hong Kong SAR": "HKG",
        "China Hong Kong SAR": "HKG",
        "Hong Kong": "HKG",
        "Hong Kong SAR, China":"HKG",
        "Colombia": "COL",
        "Comoros": "COM",
        "Congo": "COG",
        "Congo (Brazzaville)": "COG",
        "Congo, Rep.":"COG",
        "Congo, Democratic Republic of": "COD",
        "Congo, Dem. Rep.":"COD",
        "Democratic Republic of Congo": "COD",
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
        "Egypt, Arab Rep.":"EGY",
        "El Salvador": "SLV",
        "Equatorial Guinea": "GNQ",
        "Eritrea": "ERI",
        "Estonia": "EST",
        "Ethiopia": "ETH",
        "Faeroe Islands": "FRO",
        "Faroe Islands": "FRO",
        "Falkland Islands (Malvinas)": "FLK",
        "Falkland Islands": "FLK",
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
        "Vatican": "VAT",
        "Honduras": "HND",
        "Hungary": "HUN",
        "Iceland": "ISL",
        "India": "IND",
        "Indonesia": "IDN",
        "Iran": "IRN",
        "Iran, Islamic Republic of": "IRN",
        "Iran (Islamic Republic of)": "IRN",
        "Iran, Islamic Rep.":"IRN",
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
        "Democratic People's Republic of Korea": "PRK",
        "Korea, Dem. People's Rep.":"PRK",
        "Korea, Republic of": "KOR",
        "Republic of Korea": "KOR",
        "Korea, South": "KOR",
        "Korea, Rep.":"KOR",
        "Kosovo": "RKS",
        "Kuwait": "KWT",
        "Kyrgyzstan": "KGZ",
        "Kyrgyz Republic":"KGZ",
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
        "Micronesia (Federated States of)": "FSM",
        "Micronesia (country)": "FSM",
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
        "Slovak Republic":"SVK",
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
        "Taiwan": "TTWN",
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
        "Timor": "TLS",
        "Togo": "TGO",
        "Tokelau": "TKL",
        "Tonga": "TON",
        "Trinidad and Tobago": "TTO",
        "Trinidad & Tobago":"TTO",
        "Tunisia": "TUN",
        "Turkey": "TUR",
        "Turkiye":"TUR",
        "Turkmenistan": "TKM",
        "Turks and Caicos Islands": "TCA",
        "Tuvalu": "TUV",
        "Uganda": "UGA",
        "Ukraine": "UKR",
        "United Arab Emirates": "ARE",
        "United Kingdom": "GBR",
        "United States": "USA",
        "USA": "USA",
        "United States of America": "USA",
        "United States Virgin Islands": "VIR",
        "Uruguay": "URY",
        "Uzbekistan": "UZB",
        "Vanuatu": "VUT",
        "Venezuela": "VEN",
        "Venezuela, RB":"VEN",
        "Venezuela, Bolivarian Republic of": "VEN",
        "Venezuela (Bolivarian Republic of)": "VEN",
        "Vietnam": "VNM",
        "Viet Nam": "VNM",
        "Virgin Islands, U.S.": "VIR",
        "Wallis and Futuna Islands": "WLF",
        "Wallis and Futuna": "WLF",
        "Western Sahara": "ESH",
        "Yemen": "YEM",
        "Zambia": "ZMB",
        "Zimbabwe": "ZWE",
        "World": "GLO"
    };

    var code = countryCode[country];
    if (!code) {
        console.log("Code not found for " + country)
    }
    return code;
}
function getCountryName(country) {
    var countryName = {
        "AFG":"Afghanistan",
        "ALB":"Albania",
        "DZA":"Algeria",
        "ASM":"American Samoa",
        "AND":"Andorra",
        "AGO":"Angola",
        "AIA":"Anguilla",
        "ATG":"Antigua and Barbuda",
        "ARG":"Argentina",
        "ARM":"Armenia" ,
        "ABW":"Aruba",
        "AUS":"Australia",
        "AUT":"Austria",
        "AZE":"Azerbaijan",
        "BHS":"Bahamas",
        "BHR":"Bahrain",
        "BGD":"Bangladesh",
        "BRB":"Barbados",
        "BLR":"Belarus",
        "BEL":"Belgium",
        "BLZ":"Belize",
        "BEN":"Benin",
        "BMU":"Bermuda",
        "BTN":"Bhutan",
        "BOL":"Bolivia",
        "BES":"Bonaire Sint Eustatius and Saba",
        "BIH":"Bosnia and Herzegovina",
        "BWA":"Botswana",
        "BRA":"Brazil",
        "VSB":"British Virgin Islands",
        "BRN":"Brunei",
        "BGR":"Bulgaria",
        "BFA":"Burkina Faso",
        "BDI":"Burundi",
        "KHM":"Cambodia",
        "CMR":"Cameroon",
        "CAN":"Canada",
        "CPV":"Cape Verde",
        "CYM":"Cayman Islands",
        "CAF":"Central African Republic",
        "TCD":"Chad",
        "JEY":"Channel Islands",
        "CHL":"Chile",
        "CHN":"China",
        "MAC":"Macao",
        "HKG":"Hong Kong",
        "COL":"Colombia",
        "COM":"Comoros",
        "COG":"Congo (Brazzaville)",
        "COD":"Congo (Kinshasa)",
        "COK":"Cook Islands",
        "CRI":"Costa Rica",
        "CIV":"Cote d'Ivoire",
        "HRV":"Croatia",
        "CUB":"Cuba",
        "CUW":"Curacao",
        "CYP":"Cyprus",
        "CZE":"Czech Republic",
        "DNK":"Denmark",
        "DJI":"Djibouti",
        "DMA":"Dominica",
        "DOM":"Dominican Republic",
        "ECU":"Ecuador",
        "EGY":"Egypt",
        "SLV":"El Salvador",
        "GNQ":"Equatorial Guinea",
        "ERI":"Eritrea",
        "EST":"Estonia",
        "ETH":"Ethiopia",
        "FRO":"Faroe Islands",
        "FLK":"Falkland Islands",
        "FJI":"Fiji",
        "FIN":"Finland",
        "FRA":"France",
        "GUF":"French Guiana",
        "PYF":"French Polynesia",
        "GAB":"Gabon",
        "GMB":"Gambia",
        "GEO":"Georgia",
        "DEU":"Germany",
        "GHA":"Ghana",
        "GIB":"Gibraltar",
        "GRC":"Greece",
        "GRL":"Greenland",
        "GRD":"Grenada",
        "GUM":"Guam",
        "GLP":"Guadeloupe",
        "GTM":"Guatemala",
        "GIN":"Guinea",
        "GNB":"Guinea-Bissau",
        "GUY":"Guyana",
        "HTI":"Haiti",
        "VAT":"Vatican",
        "HND":"Honduras",
        "HUN":"Hungary",
        "ISL":"Iceland",
        "IND":"India",
        "IDN":"Indonesia",
        "IRN":"Iran",
        "IRQ":"Iraq",
        "IRL":"Ireland",
        "IMN":"Isle of Man",
        "ISR":"Israel",
        "ITA":"Italy",
        "JAM":"Jamaica",
        "JPN":"Japan",
        "JOR":"Jordan",
        "KAZ":"Kazakhstan",
        "KEN":"Kenya",
        "KIR":"Kiribati",
        "PRK":"North Korea",
        "KOR":"South Korea",
        "RKS":"Kosovo",
        "KWT":"Kuwait",
        "KGZ":"Kyrgyzstan",
        "LAO":"Laos",
        "LVA":"Latvia",
        "LBN":"Lebanon",
        "LSO":"Lesotho",
        "LBR":"Liberia",
        "LBY":"Libya",
        "LIE":"Liechtenstein",
        "LTU":"Lithuania",
        "LUX":"Luxembourg",
        "MKD":"North Macedonia",
        "MDG":"Madagascar",
        "MWI":"Malawi",
        "MYS":"Malaysia",
        "MDV":"Maldives",
        "MLI":"Mali",
        "MLT":"Malta",
        "MHL":"Marshall Islands",
        "MTQ":"Martinique",
        "MRT":"Mauritania",
        "MUS":"Mauritius",
        "MYT":"Mayotte",
        "MEX":"Mexico",
        "FSM":"Federated States of Micronesia",
        "MDA":"Moldova",
        "MCO":"Monaco",
        "MNG":"Mongolia",
        "MNE":"Montenegro",
        "MSR":"Montserrat",
        "MAR":"Morocco",
        "MOZ":"Mozambique",
        "MMR":"Myanmar",
        "NAM":"Namibia",
        "NRU":"Nauru",
        "NPL":"Nepal",
        "NLD":"Netherlands",
        "ANT":"Caribbean Netherlands",
        "NCL":"New Caledonia",
        "NZL":"New Zealand",
        "NIC":"Nicaragua",
        "NER":"Niger",
        "NGA":"Nigeria",
        "MNP":"Northern Mariana Islands",
        "NOR":"Norway",
        "NIU":"Niue",
        "OMN":"Oman",
        "PAK":"Pakistan",
        "PLW":"Palau",
        "PSE":"Palestine",
        "PAN":"Panama",
        "PNG":"Papua New Guinea",
        "PRY":"Paraguay",
        "PER":"Peru",
        "PHL":"Philippines",
        "POL":"Poland",
        "PRT":"Portugal",
        "PRI":"Puerto Rico",
        "QAT":"Qatar",
        "REU":"Reunion",
        "ROU":"Romania",
        "RUS":"Russia",
        "RWA":"Rwanda",
        "BLM":"Saint Barthelemy",
        "SHN":"Saint Helena",
        "KNA":"Saint Kitts and Nevis",
        "LCA":"Saint Lucia",
        "SXM":"Sint Maarten (Dutch part)",
        "MAF":"Saint Martin (French part)",
        "SPM":"Saint Pierre and Miquelon",
        "VCT":"Saint Vincent and the Grenadines",
        "WSM":"Samoa",
        "SMR":"San Marino",
        "STP":"Sao Tome and Principe",
        "SAU":"Saudi Arabia",
        "SEN":"Senegal",
        "SRB":"Republic of Serbia",
        "SYC":"Seychelles",
        "SLE":"Sierra Leone",
        "SGP":"Singapore",
        "SVK":"Slovakia",
        "SVN":"Slovenia",
        "SLB":"Solomon Islands",
        "SOM":"Somalia",
        "ZAF":"South Africa",
        "SSD":"South Sudan",
        "ESP":"Spain",
        "LKA":"Sri Lanka",
        "SDN":"Sudan",
        "SUR":"Suriname",
        "SWZ":"Eswatini",
        "SWE":"Sweden",
        "CHE":"Switzerland",
        "SYR":"Syria",
        "TWN":"Taiwan",
        "TJK":"Tajikistan",
        "TZA":"Tanzania",
        "THA":"Thailand",
        "TLS":"Timor-Leste",
        "TGO":"Togo",
        "TKL":"Tokelau",
        "TON":"Tonga",
        "TTO":"Trinidad and Tobago",
        "TUN":"Tunisia",
        "TUR":"Turkey",
        "TKM":"Turkmenistan",
        "TCA":"Turks and Caicos Islands",
        "TUV":"Tuvalu",
        "UGA":"Uganda",
        "UKR":"Ukraine",
        "ARE":"United Arab Emirates",
        "GBR":"United Kingdom",
        "USA":"USA",
        "VIR":"US Virgin Islands",
        "URY":"Uruguay",
        "UZB":"Uzbekistan",
        "VUT":"Vanuatu",
        "VEN":"Venezuela",
        "VNM":"Vietnam",
        "WLF":"Wallis and Futuna Islands",
        "ESH":"Western Sahara",
        "YEM":"Yemen",
        "ZMB":"Zambia",
        "ZWE": "Zimbabwe",
        "ATA":"Antarctica",
        "ATF":"French Southern Territories",
        "BVT":"Bouvet Island",
        "CCK":"Cocos Islands",
        "CXR":"Christmas Island",
        "HMD":"Heard and McDonald Islands",
        "IOT":"British Indian Ocean Territory",
        "KSV":"Kosovo",
        "NFK":"Norfolk Island",
        "PCN":"Pitcairn",
        "SGS":"South Georgia and South Sandwich Islands",
        "UMI":"United States Minor Outlying Islands",
        "VGB":"British Virgin Islands",
        "GLO":"World",
        "Albania":"Albania",
        "Algeria":"Algeria",
        "Angola":"Angola",
        "Argentina":"Argentina",
        "Armenia":"Armenia",
        "Australia":"Australia",
        "Austria":"Austria",
        "Azerbaijan":"Azerbaijan",
        "Bahrain":"Bahrain",
        "Bangladesh": "Bangladesh",
        "Benin":"Benin",
        "Belarus": "Belarus",
        "Belgium": "Belgium",
        "Bolivia":"Bolivia",
        "Bosnia and Herzegovina": "Bosnia and Herzegovina",
        "Botswana":"Botswana",
        "Brazil":"Brazil",
        "Brunei Darussalam":"Brunei",
        "Bulgaria": "Bulgaria",
        "Cambodia":"Cambodia",
        "Cameroon":"Cameroon",
        "Canada": "Canada",
        "Chile": "Chile",
        "China": "China",
        "China Hong Kong SAR": "Hong Kong",
        "Colombia": "Colombia",
        "Congo, Dem. Rep.": "Congo (Kinshasa)",
        "Democratic Republic of the Congo": "Congo (Kinshasa)",
        "Congo, Rep.":"Congo (Brazzaville)",
        "Republic of Congo": "Congo (Brazzaville)",
        "Costa Rica":"Costa Rica",
        "Cote d'Ivoire":"Cote d'Ivoire",
        "Ivory Coast":"Cote d'Ivoire",
        "Croatia": "Croatia",
        "Cuba":"Cuba",
        "Curacao":"Curacao",
        "Cyprus": "Cyprus",
        "Czech Republic": "Czech Republic",
        "Denmark": "Denmark",
        "Dominican Republic":"Dominican Republic",
        "Ecuador": "Ecuador",
        "Egypt": "Egypt",
        "Egypt, Arab Rep.":"Egypt",
        "El Salvador":"El Salvador",
        "Eritrea":"Eritrea",
        "Estonia": "Estonia",
        "Ethiopia":"Ethiopia",
        "Finland": "Finland",
        "France": "France",
        "Gabon":"Gabon",
        "Ghana":"Ghana",
        "Georgia": "Georgia",
        "Germany": "Germany",
        "Gibraltar":"Gibraltar",
        "Greece": "Greece",
        "Guatemala":"Guatemala",
        "Haiti":"Haiti",
        "Honduras":"Honduras",
        "Hong Kong SAR, China":"Hong Kong",
        "Hong Kong":"Hong Kong",
        "Hungary": "Hungary",
        "Iceland": "Iceland",
        "India": "India",
        "Indonesia": "Indonesia",
        "Iran": "Iran",
        "Iran, Islamic Rep.":"Iran",
        "Iraq": "Iraq",
        "Ireland": "Ireland",
        "Israel": "Israel",
        "Italy": "Italy",
        "Japan": "Japan",
        "Jamaica":"Jamaica",
        "Jordan":"Jordan",
        "Kazakhstan": "Kazakhstan",
        "Kenya":"Kenya",
        "Korea, Dem. People's Rep.": "North Korea",
        "Korea, Rep.":"South Korea",
        "Korea": "South Korea",
        "Kosovo": "Kosovo",
        "Kuwait": "Kuwait",
        "Kyrgyz Republic":"Kyrgyzstan",
        "Kyrgyzstan": "Kyrgyzstan",
        "Latvia": "Latvia",
        "Lebanon":"Lebanon",
        "Libya":"Libya",
        "Lithuania": "Lithuania",
        "Luxembourg": "Luxembourg",
        "Malaysia": "Malaysia",
        "Malta": "Malta",
        "Mauritius":"Mauritius",
        "Mexico": "Mexico",
        "Moldova":"Moldova",
        "Mongolia":"Mongolia",
        "Montenegro":"Montenegro",
        "Morocco": "Morocco",
        "Mozambique":"Mozambique",
        "Myanmar":"Myanmar",
        "Namibia":"Namibia",
        "Nepal":"Nepal",
        "Netherlands": "Netherlands",
        "New Zealand": "New Zealand",
        "Nicaragua":"Nicaragua",
        "Niger":"Niger",
        "Nigeria":"Nigeria",
        "North Korea":"North Korea",
        "North Macedonia": "North Macedonia",
        "Norway": "Norway",
        "Oman": "Oman",
        "Panama":"Panama",
        "Paraguay":"Paraguay",
        "Pakistan": "Pakistan",
        "People's Republic of China": "China",
        "Peru": "Peru",
        "Philippines": "Philippines",
        "Poland": "Poland",
        "Portugal": "Portugal",
        "Qatar": "Qatar",
        "Republic of Moldova": "Moldova",
        "Republic of North Macedonia": "North Macedonia",
        "Romania": "Romania",
        "Russian Federation": "Russia",
        "Russia": "Russia",
        "Saudi Arabia": "Saudi Arabia",
        "Senegal":"Senegal",
        "Serbia": "Republic of Serbia",
        "Republic of Serbia": "Serbia",
        "Singapore": "Singapore",
        "Slovak Republic": "Slovakia",
        "Slovakia": "Slovakia",
        "Slovenia": "Slovenia",
        "South Africa": "South Africa",
        "South Korea": "South Korea",
        "South Sudan":"South Sudan",
        "Spain": "Spain",
        "Sri Lanka": "Sri Lanka",
        "Sudan":"Sudan",
        "Suriname":"Suriname",
        "Sweden": "Sweden",
        "Switzerland": "Switzerland",
        "Syria":"Syria",
        "Syrian Arab Republic":"Syria",
        "Taiwan": "Taiwan",
        "Tajikistan":"Tajikistan",
        "Tanzania":"Tanzania",
        "United Republic of Tanzania": "Tanzania",
        "Thailand": "Thailand",
        "Togo":"Togo",
        "Trinidad & Tobago": "Trinidad and Tobago",
        "Tunisia":"Tunisia",
        "Turkey": "Turkey",
        "Turkiye":"Turkey",
        "Turkmenistan": "Turkmenistan",
        "Ukraine": "Ukraine",
        "United Arab Emirates": "United Arab Emirates",
        "United Kingdom": "United Kingdom",
        "United States": "USA",
        "Uruguay": "Uruguay",
        "USA": "USA",
        "United States of America": "USA",
        "US": "USA",
        "Uzbekistan": "Uzbekistan",
        "Venezuela": "Venezuela",
        "Venezuela, RB":"Venezuela",
        "Vietnam": "Vietnam",
        "World": "World",
        "Trinidad and Tobago": "Trinidad and Tobago",
        "Macedonia": "North Macedonia",
        "World":"World"
    };

    var name = countryName[country];
    if (!name) {
        console.log("Name not found for " + country)
    }
    return name;
}

function getHighchartsMapCSSName(country) {
    let css;
    if (country == "USA") {
        css = 'highcharts-name-united-states-of-america';
    } else if (country == "Serbia") {
        css = 'highcharts-name-republic-of-serbia';
    } else if (country == "North Macedonia") {
        css = 'highcharts-name-macedonia';
    } else if (country == "Tanzania") {
        css = 'highcharts-name-united-republic-of-tanzania';
    } else if (country == "Congo (Kinshasa)") {
        css = 'highcharts-name-democratic-republic-of-the-congo';
    } else if (country == "Congo (Brazzaville)") {
        css = 'highcharts-name-republic-of-congo';
    } else if (country == "Cote d'Ivoire") {
        css = 'highcharts-name-ivory-coast';
    } else {
        css = 'highcharts-name-' + country.toLowerCase().split(' ').join('-');
    }
    return css;
}
// Create legend
function createLegend(chart_points, data, parentContainer) {
    // Chart points and data will difer in cases where we only want to show a subset on the legend

    // Remove old legend items if they exist
    document.querySelectorAll(parentContainer + ' .legend-item').forEach(function (a) {
        a.remove()
    })

    legend = document.querySelectorAll(parentContainer + ' .chart-legend')[0];
    // Append legend items
    for (let point of data) {
        legend.innerHTML += '<div class="legend-item"><div class="dot legend-color-' + point.colorIndex + '" ></div><div class="serieName" id="">' + fCapital(point.name) + '</div></div>';
    }

    // Click effect for legend
    document.querySelectorAll(parentContainer + ' .legend-item').forEach(function (a) {
        a.addEventListener("click", function() {
            var name = this.textContent;
            for (let point of chart_points) {
                if (point.name === name || point.from === name) {
                    point.select(true, false);
                }
            }
        });

        
    });

    // Hover effect for legend
    document.querySelectorAll(parentContainer + ' .legend-item').forEach(function (a) {
        a.addEventListener("mouseover", function() {
            var name = this.textContent;

            for (let point of chart_points) {
                if (point.name === name || point.from === name) { // from is for dependency wheel
                    point.setState('hover');
                } else {
                    point.setState('inactive');
                }
            }
        });
        
    });

    // Remove all states on mouse out
    document.querySelectorAll(parentContainer + ' .legend-item').forEach(function (a) {
        a.addEventListener("mouseout", function() {
        //     var e = event.toElement || event.relatedTarget,
        //     i = 0;
        // if (e.parentNode == this || e == this) {
        //     return;
        // }

        for (let point of chart_points) {
            point.setState('');
        }

        });
        
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
        "53": "#394646"
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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
            x1: 0.4,
            y1: 0.4,
            x2: 1,
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

