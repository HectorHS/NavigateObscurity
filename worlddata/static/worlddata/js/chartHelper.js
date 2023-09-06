export function fCapital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export function fLower(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}
export function numberFormatter(number) {
    let numberFormated;
    if (number > 1000000) {
        let value = number / 1000000;
        numberFormated = value.toLocaleString(undefined, { maximumFractionDigits: 0 });
        return numberFormated + "m";
    }
    else if (number > 1000) {
        numberFormated = number.toLocaleString(undefined, { maximumFractionDigits: 0 });
    }
    else {
        numberFormated = number.toLocaleString(undefined, { maximumFractionDigits: 2 });
    }
    return numberFormated;
}
export function addLineBreaks(input, lineSize) {
    var returnText = [];
    var workingText = input;
    if (input.length <= lineSize) {
        returnText.push(input);
    }
    else {
        while (workingText.length > lineSize) {
            var line = workingText.substring(0, lineSize);
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
export function getCountryCode(country) {
    let countryCode = new Map();
    countryCode.set("Afghanistan", "AFG");
    countryCode.set("Albania", "ALB");
    countryCode.set("Algeria", "DZA");
    countryCode.set("American Samoa", "ASM");
    countryCode.set("Andorra", "AND");
    countryCode.set("Angola", "AGO");
    countryCode.set("Anguilla", "AIA");
    countryCode.set("Antigua and Barbuda", "ATG");
    countryCode.set("Argentina", "ARG");
    countryCode.set("Armenia", "ARM");
    countryCode.set("Aruba", "ABW");
    countryCode.set("Australia", "AUS");
    countryCode.set("Austria", "AUT");
    countryCode.set("Azerbaijan", "AZE");
    countryCode.set("Bahamas", "BHS");
    countryCode.set("Bahrain", "BHR");
    countryCode.set("Bangladesh", "BGD");
    countryCode.set("Barbados", "BRB");
    countryCode.set("Belarus", "BLR");
    countryCode.set("Belgium", "BEL");
    countryCode.set("Belize", "BLZ");
    countryCode.set("Benin", "BEN");
    countryCode.set("Bermuda", "BMU");
    countryCode.set("Bhutan", "BTN");
    countryCode.set("Bolivia", "BOL");
    countryCode.set("Bolivia (Plurinational State of)", "BOL");
    countryCode.set("Bonaire, Sint Eustatius and Saba", "BES");
    countryCode.set("Bonaire Sint Eustatius and Saba", "BES");
    countryCode.set("Bosnia and Herzegovina", "BIH");
    countryCode.set("Botswana", "BWA");
    countryCode.set("Brazil", "BRA");
    countryCode.set("British Virgin Islands", "VSB");
    countryCode.set("Brunei", "BRN");
    countryCode.set("Brunei Darussalam", "BRN");
    countryCode.set("Bulgaria", "BGR");
    countryCode.set("Burkina Faso", "BFA");
    countryCode.set("Burundi", "BDI");
    countryCode.set("Cabo Verde", "CPV");
    countryCode.set("Cambodia", "KHM");
    countryCode.set("Cameroon", "CMR");
    countryCode.set("Canada", "CAN");
    countryCode.set("Cape Verde", "CPV");
    countryCode.set("Cayman Islands", "CYM");
    countryCode.set("Central African Republic", "CAF");
    countryCode.set("Chad", "TCD");
    countryCode.set("Channel Islands", "JEY");
    countryCode.set("Chile", "CHL");
    countryCode.set("China", "CHN");
    countryCode.set("China, Macao SAR", "MAC");
    countryCode.set("Macao", "MAC");
    countryCode.set("China, Hong Kong SAR", "HKG");
    countryCode.set("China Hong Kong SAR", "HKG");
    countryCode.set("Hong Kong", "HKG");
    countryCode.set("Hong Kong SAR, China", "HKG");
    countryCode.set("Colombia", "COL");
    countryCode.set("Comoros", "COM");
    countryCode.set("Congo", "COG");
    countryCode.set("Congo (Brazzaville)", "COG");
    countryCode.set("Congo, Rep.", "COG");
    countryCode.set("Congo, Democratic Republic of", "COD");
    countryCode.set("Congo, Dem. Rep.", "COD");
    countryCode.set("Democratic Republic of Congo", "COD");
    countryCode.set("Congo (Kinshasa)", "COD");
    countryCode.set("Cook Islands", "COK");
    countryCode.set("Costa Rica", "CRI");
    countryCode.set("Cote d'Ivoire", "CIV");
    countryCode.set("Croatia", "HRV");
    countryCode.set("Cuba", "CUB");
    countryCode.set("Curacao", "CUW");
    countryCode.set("Cyprus", "CYP");
    countryCode.set("Czech Republic", "CZE");
    countryCode.set("Czechia", "CZE");
    countryCode.set("Democratic Republic of the Congo", "COD");
    countryCode.set("Denmark", "DNK");
    countryCode.set("Djibouti", "DJI");
    countryCode.set("Dominica", "DMA");
    countryCode.set("Dominican Republic", "DOM");
    countryCode.set("Ecuador", "ECU");
    countryCode.set("Egypt", "EGY");
    countryCode.set("Egypt, Arab Rep.", "EGY");
    countryCode.set("El Salvador", "SLV");
    countryCode.set("Equatorial Guinea", "GNQ");
    countryCode.set("Eritrea", "ERI");
    countryCode.set("Estonia", "EST");
    countryCode.set("Ethiopia", "ETH");
    countryCode.set("Faeroe Islands", "FRO");
    countryCode.set("Faroe Islands", "FRO");
    countryCode.set("Falkland Islands (Malvinas)", "FLK");
    countryCode.set("Falkland Islands", "FLK");
    countryCode.set("Fiji", "FJI");
    countryCode.set("Finland", "FIN"),
        countryCode.set("France", "FRA");
    countryCode.set("French Guiana", "GUF");
    countryCode.set("French Polynesia", "PYF");
    countryCode.set("Gabon", "GAB");
    countryCode.set("Gambia", "GMB");
    countryCode.set("Georgia", "GEO");
    countryCode.set("Germany", "DEU");
    countryCode.set("Ghana", "GHA");
    countryCode.set("Gibraltar", "GIB");
    countryCode.set("Greece", "GRC");
    countryCode.set("Greenland", "GRL");
    countryCode.set("Grenada", "GRD");
    countryCode.set("Guam", "GUM");
    countryCode.set("Guadeloupe", "GLP");
    countryCode.set("Guatemala", "GTM");
    countryCode.set("Guinea", "GIN");
    countryCode.set("Guinea-Bissau", "GNB");
    countryCode.set("Guyana", "GUY");
    countryCode.set("Haiti", "HTI");
    countryCode.set("Holy See", "VAT");
    countryCode.set("Vatican", "VAT");
    countryCode.set("Honduras", "HND");
    countryCode.set("Hungary", "HUN");
    countryCode.set("Iceland", "ISL");
    countryCode.set("India", "IND");
    countryCode.set("Indonesia", "IDN");
    countryCode.set("Iran", "IRN");
    countryCode.set("Iran, Islamic Republic of", "IRN");
    countryCode.set("Iran (Islamic Republic of)", "IRN");
    countryCode.set("Iran, Islamic Rep.", "IRN");
    countryCode.set("Iraq", "IRQ");
    countryCode.set("Ireland", "IRL");
    countryCode.set("Isle of Man", "IMN");
    countryCode.set("Israel", "ISR");
    countryCode.set("Italy", "ITA");
    countryCode.set("Jamaica", "JAM");
    countryCode.set("Japan", "JPN");
    countryCode.set("Jordan", "JOR");
    countryCode.set("Kazakhstan", "KAZ");
    countryCode.set("Kenya", "KEN");
    countryCode.set("Kiribati", "KIR");
    countryCode.set("Korea, Democratic People's Republic of", "PRK");
    countryCode.set("Dem. People's Republic of Korea", "PRK");
    countryCode.set("Democratic People's Republic of Korea", "PRK");
    countryCode.set("Korea, Dem. People's Rep.", "PRK");
    countryCode.set("Korea, North", "PRK");
    countryCode.set("Korea, Republic of", "KOR");
    countryCode.set("Republic of Korea", "KOR");
    countryCode.set("Korea, South", "KOR");
    countryCode.set("Korea, Rep.", "KOR");
    countryCode.set("Kosovo", "RKS");
    countryCode.set("Kuwait", "KWT");
    countryCode.set("Kyrgyzstan", "KGZ");
    countryCode.set("Kyrgyz Republic", "KGZ");
    countryCode.set("Laos", "LAO");
    countryCode.set("Lao People's Democratic Republic", "LAO");
    countryCode.set("Latvia", "LVA");
    countryCode.set("Lebanon", "LBN");
    countryCode.set("Lesotho", "LSO");
    countryCode.set("Liberia", "LBR");
    countryCode.set("Libya", "LBY");
    countryCode.set("Libyan Arab Jamahiriya", "LBY");
    countryCode.set("Liechtenstein", "LIE");
    countryCode.set("Lithuania", "LTU");
    countryCode.set("Luxembourg", "LUX");
    countryCode.set("Macedonia", "MKD");
    countryCode.set("Macedonia TFYR", "MKD");
    countryCode.set("TFYR Macedonia", "MKD");
    countryCode.set("North Macedonia", "MKD");
    countryCode.set("Madagascar", "MDG");
    countryCode.set("Malawi", "MWI");
    countryCode.set("Malaysia", "MYS");
    countryCode.set("Maldives", "MDV");
    countryCode.set("Mali", "MLI");
    countryCode.set("Malta", "MLT");
    countryCode.set("Marshall Islands", "MHL");
    countryCode.set("Martinique", "MTQ");
    countryCode.set("Mauritania", "MRT");
    countryCode.set("Mauritius", "MUS");
    countryCode.set("Mayotte", "MYT");
    countryCode.set("Mexico", "MEX");
    countryCode.set("Micronesia, Federated States of", "FSM");
    countryCode.set("Micronesia (Fed. States of)", "FSM");
    countryCode.set("Federated States of Micronesia", "FSM");
    countryCode.set("Micronesia (Federated States of)", "FSM");
    countryCode.set("Micronesia (country)", "FSM");
    countryCode.set("Micronesia", "FSM");
    countryCode.set("Moldova", "MDA");
    countryCode.set("Republic of Moldova", "MDA");
    countryCode.set("Monaco", "MCO");
    countryCode.set("Mongolia", "MNG");
    countryCode.set("Montenegro", "MNE");
    countryCode.set("Montserrat", "MSR");
    countryCode.set("Morocco", "MAR");
    countryCode.set("Mozambique", "MOZ");
    countryCode.set("Myanmar", "MMR");
    countryCode.set("Burma", "MMR");
    countryCode.set("Namibia", "NAM");
    countryCode.set("Nauru", "NRU");
    countryCode.set("Nepal", "NPL");
    countryCode.set("Netherlands", "NLD");
    countryCode.set("Caribbean Netherlands", "ANT");
    countryCode.set("New Caledonia", "NCL");
    countryCode.set("New Zealand", "NZL");
    countryCode.set("New Zealand*", "NZL");
    countryCode.set("Nicaragua", "NIC");
    countryCode.set("Niger", "NER");
    countryCode.set("Nigeria", "NGA");
    countryCode.set("North Korea", "PRK");
    countryCode.set("Northern Mariana Islands", "MNP");
    countryCode.set("Norway", "NOR");
    countryCode.set("Niue", "NIU");
    countryCode.set("Oman", "OMN");
    countryCode.set("Pakistan", "PAK");
    countryCode.set("Palau", "PLW");
    countryCode.set("Palestine", "PSE");
    countryCode.set("State of Palestine", "PSE");
    countryCode.set("West Bank and Gaza", "PSE");
    countryCode.set("Panama", "PAN");
    countryCode.set("Papua New Guinea", "PNG");
    countryCode.set("Paraguay", "PRY");
    countryCode.set("Peru", "PER");
    countryCode.set("Philippines", "PHL");
    countryCode.set("Poland", "POL");
    countryCode.set("Portugal", "PRT");
    countryCode.set("Puerto Rico", "PRI");
    countryCode.set("Qatar", "QAT");
    countryCode.set("Reunion", "REU");
    countryCode.set("Romania", "ROU");
    countryCode.set("Russian Federation", "RUS");
    countryCode.set("Russia", "RUS");
    countryCode.set("Rwanda", "RWA");
    countryCode.set("Saint Barthelemy", "BLM");
    countryCode.set("Saint Barthélemy", "BLM");
    countryCode.set("Saint Helena", "SHN");
    countryCode.set("Saint Kitts and Nevis", "KNA");
    countryCode.set("Saint Lucia", "LCA");
    countryCode.set("Sint Maarten (Dutch part)", "SXM");
    countryCode.set("Sint Maarten", "SXM");
    countryCode.set("Saint Martin (French part)", "MAF");
    countryCode.set("St Martin", "MAF");
    countryCode.set("Saint Pierre and Miquelon", "SPM");
    countryCode.set("Saint Vincent and the Grenadines", "VCT");
    countryCode.set("Samoa", "WSM");
    countryCode.set("San Marino", "SMR");
    countryCode.set("Sao Tome and Principe", "STP");
    countryCode.set("Saudi Arabia", "SAU");
    countryCode.set("Senegal", "SEN");
    countryCode.set("Serbia", "SRB");
    countryCode.set("Seychelles", "SYC");
    countryCode.set("Sierra Leone", "SLE");
    countryCode.set("Singapore", "SGP");
    countryCode.set("Slovakia", "SVK");
    countryCode.set("Slovak Republic", "SVK");
    countryCode.set("Slovenia", "SVN");
    countryCode.set("Solomon Islands", "SLB");
    countryCode.set("Somalia", "SOM");
    countryCode.set("South Africa", "ZAF");
    countryCode.set("South Korea", "KOR");
    countryCode.set("South Sudan", "SSD");
    countryCode.set("Spain", "ESP");
    countryCode.set("Sri Lanka", "LKA");
    countryCode.set("Sudan", "SDN");
    countryCode.set("Suriname", "SUR");
    countryCode.set("Swaziland", "SWZ");
    countryCode.set("Eswatini", "SWZ");
    countryCode.set("Sweden", "SWE");
    countryCode.set("Switzerland", "CHE");
    countryCode.set("Syria", "SYR");
    countryCode.set("Syrian Arab Republic", "SYR");
    countryCode.set("Taiwan (Province of China)", "TWN");
    countryCode.set("Taiwan", "TTWN");
    countryCode.set("China, Taiwan Province of China", "TWN");
    countryCode.set("Taiwan*", "TWN");
    countryCode.set("Tajikistan", "TJK");
    countryCode.set("Tanzania", "TZA");
    countryCode.set("Tanzania, United Republic of", "TZA");
    countryCode.set("United Republic of Tanzania", "TZA");
    countryCode.set("Thailand", "THA");
    countryCode.set("The Bahamas", "BHS");
    countryCode.set("The Gambia", "GMB");
    countryCode.set("Timor-Leste", "TLS");
    countryCode.set("Timor", "TLS");
    countryCode.set("Togo", "TGO");
    countryCode.set("Tokelau", "TKL");
    countryCode.set("Tonga", "TON");
    countryCode.set("Trinidad and Tobago", "TTO");
    countryCode.set("Trinidad & Tobago", "TTO");
    countryCode.set("Tunisia", "TUN");
    countryCode.set("Turkey", "TUR");
    countryCode.set("Turkiye", "TUR");
    countryCode.set("Turkmenistan", "TKM");
    countryCode.set("Turks and Caicos Islands", "TCA");
    countryCode.set("Tuvalu", "TUV");
    countryCode.set("Uganda", "UGA");
    countryCode.set("Ukraine", "UKR");
    countryCode.set("United Arab Emirates", "ARE");
    countryCode.set("United Kingdom", "GBR");
    countryCode.set("United States", "USA");
    countryCode.set("USA", "USA");
    countryCode.set("United States of America", "USA");
    countryCode.set("United States Virgin Islands", "VIR");
    countryCode.set("Uruguay", "URY");
    countryCode.set("Uzbekistan", "UZB");
    countryCode.set("Vanuatu", "VUT");
    countryCode.set("Venezuela", "VEN");
    countryCode.set("Venezuela, RB", "VEN");
    countryCode.set("Venezuela, Bolivarian Republic of", "VEN");
    countryCode.set("Venezuela (Bolivarian Republic of)", "VEN");
    countryCode.set("Vietnam", "VNM");
    countryCode.set("Viet Nam", "VNM");
    countryCode.set("Virgin Islands, U.S.", "VIR");
    countryCode.set("Wallis and Futuna Islands", "WLF");
    countryCode.set("Wallis and Futuna", "WLF");
    countryCode.set("Western Sahara", "ESH");
    countryCode.set("Yemen", "YEM");
    countryCode.set("Zambia", "ZMB");
    countryCode.set("Zimbabwe", "ZWE");
    countryCode.set("World", "GLO");
    countryCode.set("Global", "GLO");
    let code = countryCode.get(country);
    if (!code) {
        console.log("Code not found for " + country);
    }
    return code;
}
export function getCountryName(country) {
    let countryName = new Map();
    countryName.set("AFG", "Afghanistan");
    countryName.set("ALB", "Albania");
    countryName.set("DZA", "Algeria");
    countryName.set("ASM", "American Samoa");
    countryName.set("AND", "Andorra");
    countryName.set("AGO", "Angola");
    countryName.set("AIA", "Anguilla");
    countryName.set("ATG", "Antigua and Barbuda");
    countryName.set("ARG", "Argentina");
    countryName.set("ARM", "Armenia");
    countryName.set("ABW", "Aruba");
    countryName.set("AUS", "Australia");
    countryName.set("AUT", "Austria");
    countryName.set("AZE", "Azerbaijan");
    countryName.set("BHS", "Bahamas");
    countryName.set("BHR", "Bahrain");
    countryName.set("BGD", "Bangladesh");
    countryName.set("BRB", "Barbados");
    countryName.set("BLR", "Belarus");
    countryName.set("BEL", "Belgium");
    countryName.set("BLZ", "Belize");
    countryName.set("BEN", "Benin");
    countryName.set("BMU", "Bermuda");
    countryName.set("BTN", "Bhutan");
    countryName.set("BOL", "Bolivia");
    countryName.set("BES", "Bonaire Sint Eustatius and Saba");
    countryName.set("BIH", "Bosnia and Herzegovina");
    countryName.set("BWA", "Botswana");
    countryName.set("BRA", "Brazil");
    countryName.set("VSB", "British Virgin Islands");
    countryName.set("BRN", "Brunei");
    countryName.set("BGR", "Bulgaria");
    countryName.set("BFA", "Burkina Faso");
    countryName.set("BDI", "Burundi");
    countryName.set("KHM", "Cambodia");
    countryName.set("CMR", "Cameroon");
    countryName.set("CAN", "Canada");
    countryName.set("CPV", "Cape Verde");
    countryName.set("CYM", "Cayman Islands");
    countryName.set("CAF", "Central African Republic");
    countryName.set("TCD", "Chad");
    countryName.set("JEY", "Channel Islands");
    countryName.set("CHL", "Chile");
    countryName.set("CHN", "China");
    countryName.set("MAC", "Macao");
    countryName.set("HKG", "Hong Kong");
    countryName.set("COL", "Colombia");
    countryName.set("COM", "Comoros");
    countryName.set("COG", "Congo (Brazzaville)");
    countryName.set("COD", "Congo (Kinshasa)");
    countryName.set("COK", "Cook Islands");
    countryName.set("CRI", "Costa Rica");
    countryName.set("CIV", "Cote d'Ivoire");
    countryName.set("HRV", "Croatia");
    countryName.set("CUB", "Cuba");
    countryName.set("CUW", "Curacao");
    countryName.set("CYP", "Cyprus");
    countryName.set("CZE", "Czech Republic");
    countryName.set("DNK", "Denmark");
    countryName.set("DJI", "Djibouti");
    countryName.set("DMA", "Dominica");
    countryName.set("DOM", "Dominican Republic");
    countryName.set("ECU", "Ecuador");
    countryName.set("EGY", "Egypt");
    countryName.set("SLV", "El Salvador");
    countryName.set("GNQ", "Equatorial Guinea");
    countryName.set("ERI", "Eritrea");
    countryName.set("EST", "Estonia");
    countryName.set("ETH", "Ethiopia");
    countryName.set("FRO", "Faroe Islands");
    countryName.set("FLK", "Falkland Islands");
    countryName.set("FJI", "Fiji");
    countryName.set("FIN", "Finland");
    countryName.set("FRA", "France");
    countryName.set("GUF", "French Guiana");
    countryName.set("PYF", "French Polynesia");
    countryName.set("GAB", "Gabon");
    countryName.set("GMB", "Gambia");
    countryName.set("GEO", "Georgia");
    countryName.set("DEU", "Germany");
    countryName.set("GHA", "Ghana");
    countryName.set("GIB", "Gibraltar");
    countryName.set("GRC", "Greece");
    countryName.set("GRL", "Greenland");
    countryName.set("GRD", "Grenada");
    countryName.set("GUM", "Guam");
    countryName.set("GLP", "Guadeloupe");
    countryName.set("GTM", "Guatemala");
    countryName.set("GIN", "Guinea");
    countryName.set("GNB", "Guinea-Bissau");
    countryName.set("GUY", "Guyana");
    countryName.set("HTI", "Haiti");
    countryName.set("VAT", "Vatican");
    countryName.set("HND", "Honduras");
    countryName.set("HUN", "Hungary");
    countryName.set("ISL", "Iceland");
    countryName.set("IND", "India");
    countryName.set("IDN", "Indonesia");
    countryName.set("IRN", "Iran");
    countryName.set("IRQ", "Iraq");
    countryName.set("IRL", "Ireland");
    countryName.set("IMN", "Isle of Man");
    countryName.set("ISR", "Israel");
    countryName.set("ITA", "Italy");
    countryName.set("JAM", "Jamaica");
    countryName.set("JPN", "Japan");
    countryName.set("JOR", "Jordan");
    countryName.set("KAZ", "Kazakhstan");
    countryName.set("KEN", "Kenya");
    countryName.set("KIR", "Kiribati");
    countryName.set("PRK", "North Korea");
    countryName.set("KOR", "South Korea");
    countryName.set("RKS", "Kosovo");
    countryName.set("KWT", "Kuwait");
    countryName.set("KGZ", "Kyrgyzstan");
    countryName.set("LAO", "Laos");
    countryName.set("LVA", "Latvia");
    countryName.set("LBN", "Lebanon");
    countryName.set("LSO", "Lesotho");
    countryName.set("LBR", "Liberia");
    countryName.set("LBY", "Libya");
    countryName.set("LIE", "Liechtenstein");
    countryName.set("LTU", "Lithuania");
    countryName.set("LUX", "Luxembourg");
    countryName.set("MKD", "North Macedonia");
    countryName.set("MDG", "Madagascar");
    countryName.set("MWI", "Malawi");
    countryName.set("MYS", "Malaysia");
    countryName.set("MDV", "Maldives");
    countryName.set("MLI", "Mali");
    countryName.set("MLT", "Malta");
    countryName.set("MHL", "Marshall Islands");
    countryName.set("MTQ", "Martinique");
    countryName.set("MRT", "Mauritania");
    countryName.set("MUS", "Mauritius");
    countryName.set("MYT", "Mayotte");
    countryName.set("MEX", "Mexico");
    countryName.set("FSM", "Federated States of Micronesia");
    countryName.set("MDA", "Moldova");
    countryName.set("MCO", "Monaco");
    countryName.set("MNG", "Mongolia");
    countryName.set("MNE", "Montenegro");
    countryName.set("MSR", "Montserrat");
    countryName.set("MAR", "Morocco");
    countryName.set("MOZ", "Mozambique");
    countryName.set("MMR", "Myanmar");
    countryName.set("NAM", "Namibia");
    countryName.set("NRU", "Nauru");
    countryName.set("NPL", "Nepal");
    countryName.set("NLD", "Netherlands");
    countryName.set("ANT", "Caribbean Netherlands");
    countryName.set("NCL", "New Caledonia");
    countryName.set("NZL", "New Zealand");
    countryName.set("NIC", "Nicaragua");
    countryName.set("NER", "Niger");
    countryName.set("NGA", "Nigeria");
    countryName.set("MNP", "Northern Mariana Islands");
    countryName.set("NOR", "Norway");
    countryName.set("NIU", "Niue");
    countryName.set("OMN", "Oman");
    countryName.set("PAK", "Pakistan");
    countryName.set("PLW", "Palau");
    countryName.set("PSE", "Palestine");
    countryName.set("PAN", "Panama");
    countryName.set("PNG", "Papua New Guinea");
    countryName.set("PRY", "Paraguay");
    countryName.set("PER", "Peru");
    countryName.set("PHL", "Philippines");
    countryName.set("POL", "Poland");
    countryName.set("PRT", "Portugal");
    countryName.set("PRI", "Puerto Rico");
    countryName.set("QAT", "Qatar");
    countryName.set("REU", "Reunion");
    countryName.set("ROU", "Romania");
    countryName.set("RUS", "Russia");
    countryName.set("RWA", "Rwanda");
    countryName.set("BLM", "Saint Barthelemy");
    countryName.set("SHN", "Saint Helena");
    countryName.set("KNA", "Saint Kitts and Nevis");
    countryName.set("LCA", "Saint Lucia");
    countryName.set("SXM", "Sint Maarten (Dutch part)");
    countryName.set("MAF", "Saint Martin (French part)");
    countryName.set("SPM", "Saint Pierre and Miquelon");
    countryName.set("VCT", "Saint Vincent and the Grenadines");
    countryName.set("WSM", "Samoa");
    countryName.set("SMR", "San Marino");
    countryName.set("STP", "Sao Tome and Principe");
    countryName.set("SAU", "Saudi Arabia");
    countryName.set("SEN", "Senegal");
    countryName.set("SRB", "Republic of Serbia");
    countryName.set("SYC", "Seychelles");
    countryName.set("SLE", "Sierra Leone");
    countryName.set("SGP", "Singapore");
    countryName.set("SVK", "Slovakia");
    countryName.set("SVN", "Slovenia");
    countryName.set("SLB", "Solomon Islands");
    countryName.set("SOM", "Somalia");
    countryName.set("ZAF", "South Africa");
    countryName.set("SSD", "South Sudan");
    countryName.set("ESP", "Spain");
    countryName.set("LKA", "Sri Lanka");
    countryName.set("SDN", "Sudan");
    countryName.set("SUR", "Suriname");
    countryName.set("SWZ", "Eswatini");
    countryName.set("SWE", "Sweden");
    countryName.set("CHE", "Switzerland");
    countryName.set("SYR", "Syria");
    countryName.set("TWN", "Taiwan");
    countryName.set("TJK", "Tajikistan");
    countryName.set("TZA", "Tanzania");
    countryName.set("THA", "Thailand");
    countryName.set("TLS", "Timor-Leste");
    countryName.set("TGO", "Togo");
    countryName.set("TKL", "Tokelau");
    countryName.set("TON", "Tonga");
    countryName.set("TTO", "Trinidad and Tobago");
    countryName.set("TUN", "Tunisia");
    countryName.set("TUR", "Turkey");
    countryName.set("TKM", "Turkmenistan");
    countryName.set("TCA", "Turks and Caicos Islands");
    countryName.set("TUV", "Tuvalu");
    countryName.set("UGA", "Uganda");
    countryName.set("UKR", "Ukraine");
    countryName.set("ARE", "United Arab Emirates");
    countryName.set("GBR", "United Kingdom");
    countryName.set("USA", "USA");
    countryName.set("VIR", "US Virgin Islands");
    countryName.set("URY", "Uruguay");
    countryName.set("UZB", "Uzbekistan");
    countryName.set("VUT", "Vanuatu");
    countryName.set("VEN", "Venezuela");
    countryName.set("VNM", "Vietnam");
    countryName.set("WLF", "Wallis and Futuna Islands");
    countryName.set("ESH", "Western Sahara");
    countryName.set("YEM", "Yemen");
    countryName.set("ZMB", "Zambia");
    countryName.set("ZWE", "Zimbabwe");
    countryName.set("ATA", "Antarctica");
    countryName.set("ATF", "French Southern Territories");
    countryName.set("BVT", "Bouvet Island");
    countryName.set("CCK", "Cocos Islands");
    countryName.set("CXR", "Christmas Island");
    countryName.set("HMD", "Heard and McDonald Islands");
    countryName.set("IOT", "British Indian Ocean Territory");
    countryName.set("KSV", "Kosovo");
    countryName.set("NFK", "Norfolk Island");
    countryName.set("PCN", "Pitcairn");
    countryName.set("SGS", "South Georgia and South Sandwich Islands");
    countryName.set("UMI", "United States Minor Outlying Islands");
    countryName.set("VGB", "British Virgin Islands");
    countryName.set("GLO", "World");
    countryName.set("Afghanistan", "Afghanistan");
    countryName.set("Albania", "Albania");
    countryName.set("Algeria", "Algeria");
    countryName.set("Andorra", "Andorra");
    countryName.set("Antigua and Barbuda", "Antigua and Barbuda");
    countryName.set("Angola", "Angola");
    countryName.set("Argentina", "Argentina");
    countryName.set("Armenia", "Armenia");
    countryName.set("Aruba", "Aruba");
    countryName.set("Australia", "Australia");
    countryName.set("Austria", "Austria");
    countryName.set("Azerbaijan", "Azerbaijan");
    countryName.set("Bahamas", "Bahamas");
    countryName.set("Bahrain", "Bahrain");
    countryName.set("Barbados", "Barbados");
    countryName.set("Bangladesh", "Bangladesh");
    countryName.set("Benin", "Benin");
    countryName.set("Belarus", "Belarus");
    countryName.set("Belgium", "Belgium");
    countryName.set("Bhutan", "Bhutan");
    countryName.set("Bolivia", "Bolivia");
    countryName.set("Belize", "Belize");
    countryName.set("Bosnia and Herzegovina", "Bosnia and Herzegovina");
    countryName.set("Botswana", "Botswana");
    countryName.set("Brazil", "Brazil");
    countryName.set("Brunei Darussalam", "Brunei");
    countryName.set("Brunei", "Brunei");
    countryName.set("Bulgaria", "Bulgaria");
    countryName.set("Burkina Faso", "Burkina Faso");
    countryName.set("Burundi", "Burundi");
    countryName.set("Cabo Verde", "Cape Verde");
    countryName.set("Cambodia", "Cambodia");
    countryName.set("Cameroon", "Cameroon");
    countryName.set("Canada", "Canada");
    countryName.set("Central African Republic", "Central African Republic");
    countryName.set("Chad", "Chad");
    countryName.set("Chile", "Chile");
    countryName.set("China", "China");
    countryName.set("China Hong Kong SAR", "Hong Kong");
    countryName.set("Colombia", "Colombia");
    countryName.set("Comoros", "Comoros");
    countryName.set("Congo, Dem. Rep.", "Congo (Kinshasa)");
    countryName.set("Congo (Kinshasa)", "Congo (Kinshasa)");
    countryName.set("Democratic Republic of the Congo", "Congo (Kinshasa)");
    countryName.set("Congo, Rep.", "Congo (Brazzaville)");
    countryName.set("Congo (Brazzaville)", "Congo (Brazzaville)");
    countryName.set("Republic of Congo", "Congo (Brazzaville)");
    countryName.set("Cook Islands", "Cook Islands");
    countryName.set("Costa Rica", "Costa Rica");
    countryName.set("Cote d'Ivoire", "Cote d'Ivoire");
    countryName.set("Ivory Coast", "Cote d'Ivoire");
    countryName.set("Croatia", "Croatia");
    countryName.set("Cuba", "Cuba");
    countryName.set("Curacao", "Curacao");
    countryName.set("Cyprus", "Cyprus");
    countryName.set("Czech Republic", "Czech Republic");
    countryName.set("Czechia", "Czech Republic");
    countryName.set("Denmark", "Denmark");
    countryName.set("Djibouti", "Djibouti");
    countryName.set("Dominica", "Dominica");
    countryName.set("Dominican Republic", "Dominican Republic");
    countryName.set("Ecuador", "Ecuador");
    countryName.set("Egypt", "Egypt");
    countryName.set("Egypt, Arab Rep.", "Egypt");
    countryName.set("El Salvador", "El Salvador");
    countryName.set("Equatorial Guinea", "Equatorial Guinea");
    countryName.set("Eritrea", "Eritrea");
    countryName.set("Estonia", "Estonia");
    countryName.set("Eswatini", "Eswatini");
    countryName.set("Ethiopia", "Ethiopia");
    countryName.set("Faroe Islands", "Faroe Islands");
    countryName.set("Federated States of Micronesia", "Federated States of Micronesia");
    countryName.set("Micronesia", "Federated States of Micronesia");
    countryName.set("Fiji", "Fiji");
    countryName.set("Finland", "Finland");
    countryName.set("France", "France");
    countryName.set("Gabon", "Gabon");
    countryName.set("Gambia", "Gambia");
    countryName.set("Ghana", "Ghana");
    countryName.set("Georgia", "Georgia");
    countryName.set("Germany", "Germany");
    countryName.set("Gibraltar", "Gibraltar");
    countryName.set("Greece", "Greece");
    countryName.set("Greenland", "Greenland");
    countryName.set("Grenada", "Grenada");
    countryName.set("Guatemala", "Guatemala");
    countryName.set("Guinea", "Guinea");
    countryName.set("Guinea-Bissau", "Guinea-Bissau");
    countryName.set("Guyana", "Guyana");
    countryName.set("Haiti", "Haiti");
    countryName.set("Honduras", "Honduras");
    countryName.set("Hong Kong SAR, China", "Hong Kong");
    countryName.set("Hong Kong", "Hong Kong");
    countryName.set("Hungary", "Hungary");
    countryName.set("Iceland", "Iceland");
    countryName.set("India", "India");
    countryName.set("Indonesia", "Indonesia");
    countryName.set("Iran", "Iran");
    countryName.set("Iran, Islamic Rep.", "Iran");
    countryName.set("Iraq", "Iraq");
    countryName.set("Ireland", "Ireland");
    countryName.set("Israel", "Israel");
    countryName.set("Italy", "Italy");
    countryName.set("Japan", "Japan");
    countryName.set("Jamaica", "Jamaica");
    countryName.set("Jordan", "Jordan");
    countryName.set("Kazakhstan", "Kazakhstan");
    countryName.set("Kenya", "Kenya");
    countryName.set("Korea, Dem. People's Rep.", "North Korea");
    countryName.set("Korea, Rep.", "South Korea");
    countryName.set("Korea", "South Korea");
    countryName.set("Kosovo", "Kosovo");
    countryName.set("Kiribati", "Kiribati");
    countryName.set("Kuwait", "Kuwait");
    countryName.set("Kyrgyz Republic", "Kyrgyzstan");
    countryName.set("Kyrgyzstan", "Kyrgyzstan");
    countryName.set("Laos", "Laos");
    countryName.set("Latvia", "Latvia");
    countryName.set("Lebanon", "Lebanon");
    countryName.set("Lesotho", "Lesotho");
    countryName.set("Liberia", "Liberia");
    countryName.set("Libya", "Libya");
    countryName.set("Liechtenstein", "Liechtenstein");
    countryName.set("Lithuania", "Lithuania");
    countryName.set("Luxembourg", "Luxembourg");
    countryName.set("Madagascar", "Madagascar");
    countryName.set("Malaysia", "Malaysia");
    countryName.set("Malawi", "Malawi");
    countryName.set("Malta", "Malta");
    countryName.set("Maldives", "Maldives");
    countryName.set("Mali", "Mali");
    countryName.set("Marshall Islands", "Marshall Islands");
    countryName.set("Mauritania", "Mauritania");
    countryName.set("Mauritius", "Mauritius");
    countryName.set("Mexico", "Mexico");
    countryName.set("Moldova", "Moldova");
    countryName.set("Monaco", "Monaco");
    countryName.set("Mongolia", "Mongolia");
    countryName.set("Montenegro", "Montenegro");
    countryName.set("Morocco", "Morocco");
    countryName.set("Mozambique", "Mozambique");
    countryName.set("Myanmar", "Myanmar");
    countryName.set("Burma", "Myanmar");
    countryName.set("Namibia", "Namibia");
    countryName.set("Nauru", "Nauru");
    countryName.set("Nepal", "Nepal");
    countryName.set("Netherlands", "Netherlands");
    countryName.set("New Zealand", "New Zealand");
    countryName.set("Nicaragua", "Nicaragua");
    countryName.set("Niger", "Niger");
    countryName.set("Nigeria", "Nigeria");
    countryName.set("Niue", "Niue");
    countryName.set("North Korea", "North Korea");
    countryName.set("Korea, North", "North Korea");
    countryName.set("North Macedonia", "North Macedonia");
    countryName.set("Macedonia", "North Macedonia");
    countryName.set("Norway", "Norway");
    countryName.set("Oman", "Oman");
    countryName.set("Palestine", "Palestine");
    countryName.set("West Bank and Gaza", "Palestine");
    countryName.set("Panama", "Panama");
    countryName.set("Paraguay", "Paraguay");
    countryName.set("Pakistan", "Pakistan");
    countryName.set("Palau", "Palau");
    countryName.set("Papua New Guinea", "Papua New Guinea");
    countryName.set("People's Republic of China", "China");
    countryName.set("Peru", "Peru");
    countryName.set("Philippines", "Philippines");
    countryName.set("Poland", "Poland");
    countryName.set("Portugal", "Portugal");
    countryName.set("Qatar", "Qatar");
    countryName.set("Republic of Moldova", "Moldova");
    countryName.set("Republic of North Macedonia", "North Macedonia");
    countryName.set("Romania", "Romania");
    countryName.set("Russian Federation", "Russia");
    countryName.set("Russia", "Russia");
    countryName.set("Rwanda", "Rwanda");
    countryName.set("Saint Barthelemy", "Saint Barthelemy");
    countryName.set("Saint Kitts and Nevis", "Saint Kitts and Nevis");
    countryName.set("Saint Lucia", "Saint Lucia");
    countryName.set("Saint Vincent and the Grenadines", "Saint Vincent and the Grenadines");
    countryName.set("Samoa", "Samoa");
    countryName.set("San Marino", "San Marino");
    countryName.set("Sao Tome and Principe", "Sao Tome and Principe");
    countryName.set("Saudi Arabia", "Saudi Arabia");
    countryName.set("Senegal", "Senegal");
    countryName.set("Serbia", "Republic of Serbia");
    countryName.set("Republic of Serbia", "Serbia");
    countryName.set("Seychelles", "Seychelles");
    countryName.set("Sierra Leone", "Sierra Leone");
    countryName.set("Singapore", "Singapore");
    countryName.set("Slovak Republic", "Slovakia");
    countryName.set("Slovakia", "Slovakia");
    countryName.set("Slovenia", "Slovenia");
    countryName.set("Solomon Islands", "Solomon Islands");
    countryName.set("Somalia", "Somalia");
    countryName.set("South Africa", "South Africa");
    countryName.set("South Korea", "South Korea");
    countryName.set("Korea, South", "South Korea");
    countryName.set("South Sudan", "South Sudan");
    countryName.set("Spain", "Spain");
    countryName.set("Sri Lanka", "Sri Lanka");
    countryName.set("Sudan", "Sudan");
    countryName.set("Suriname", "Suriname");
    countryName.set("Sweden", "Sweden");
    countryName.set("Switzerland", "Switzerland");
    countryName.set("Syria", "Syria");
    countryName.set("Syrian Arab Republic", "Syria");
    countryName.set("Taiwan", "Taiwan");
    countryName.set("Tajikistan", "Tajikistan");
    countryName.set("Tanzania", "Tanzania");
    countryName.set("United Republic of Tanzania", "Tanzania");
    countryName.set("Thailand", "Thailand");
    countryName.set("Timor-Leste", "Timor-Leste");
    countryName.set("Togo", "Togo");
    countryName.set("Tonga", "Tonga");
    countryName.set("Trinidad & Tobago", "Trinidad and Tobago");
    countryName.set("Trinidad and Tobago", "Trinidad and Tobago");
    countryName.set("Tunisia", "Tunisia");
    countryName.set("Turkey", "Turkey");
    countryName.set("Turkiye", "Turkey");
    countryName.set("Turkmenistan", "Turkmenistan");
    countryName.set("Tuvalu", "Tuvalu");
    countryName.set("Uganda", "Uganda");
    countryName.set("Ukraine", "Ukraine");
    countryName.set("United Arab Emirates", "United Arab Emirates");
    countryName.set("United Kingdom", "United Kingdom");
    countryName.set("United States", "USA");
    countryName.set("Uruguay", "Uruguay");
    countryName.set("USA", "USA");
    countryName.set("United States of America", "USA");
    countryName.set("US", "USA");
    countryName.set("Uzbekistan", "Uzbekistan");
    countryName.set("Vanuatu", "Vanuatu");
    countryName.set("Venezuela", "Venezuela");
    countryName.set("Venezuela, RB", "Venezuela");
    countryName.set("Vietnam", "Vietnam");
    countryName.set("World", "World");
    countryName.set("Yemen", "Yemen");
    countryName.set("Zambia", "Zambia");
    countryName.set("Zimbabwe", "Zimbabwe");
    let name = countryName.get(country);
    if (!name) {
        console.log("Name not found for " + country);
        name = country;
    }
    return name;
}
export function getHighchartsMapCSSName(country) {
    let css;
    if (country == "USA" || country == "United States" || country == "United States of Americawenm") {
        css = 'highcharts-name-united-states-of-america';
    }
    else if (country == "Serbia") {
        css = 'highcharts-name-republic-of-serbia';
    }
    else if (country == "North Macedonia") {
        css = 'highcharts-name-macedonia';
    }
    else if (country == "Tanzania") {
        css = 'highcharts-name-united-republic-of-tanzania';
    }
    else if (country == "Congo (Kinshasa)") {
        css = 'highcharts-name-democratic-republic-of-the-congo';
    }
    else if (country == "Congo (Brazzaville)") {
        css = 'highcharts-name-republic-of-congo';
    }
    else if (country == "Cote d'Ivoire") {
        css = 'highcharts-name-ivory-coast';
    }
    else {
        css = 'highcharts-name-' + country.toLowerCase().split(' ').join('-');
    }
    return css;
}
// Create legend
// TODO write this better
// chart_options and data should be Highcharts.Point arrays, but there seems to be an issue with the from property that is used for sankey type charts like the dependency wheel
export function createLegend(chart_points, data, parentContainer) {
    // Chart points and data will difer in cases where we only want to show a subset on the legend
    // Remove old legend items if they exist
    document.querySelectorAll(parentContainer + ' .legend-item').forEach(function (a) {
        a.remove();
    });
    let legends = Array.from(document.querySelectorAll(parentContainer + ' .chart-legend'));
    // sometimes we have multiple legends, eg one for mobile, one for desktop
    for (let legend of legends) {
        // Append legend items
        for (let point of data) {
            legend.innerHTML += '<div class="legend-item"><div class="dot legend-color-' + point.colorIndex + '" ></div><div class="serieName" id="">' + fCapital(point.name) + '</div></div>';
        }
    }
    // Click effect for legend
    document.querySelectorAll(parentContainer + ' .legend-item').forEach(function (a) {
        a.addEventListener("click", function () {
            var name = this.textContent;
            for (let point of chart_points) {
                let nam = '';
                if (point.name) {
                    nam = fCapital(point.name);
                }
                else if (point.from) {
                    nam = fCapital(point.from);
                }
                if (nam === name) {
                    point.select(true, false);
                }
            }
        });
    });
    // Hover effect for legend
    document.querySelectorAll(parentContainer + ' .legend-item').forEach(function (a) {
        a.addEventListener("mouseover", function () {
            var name = this.textContent;
            for (let point of chart_points) {
                let nam = '';
                // from is for dependency wheel
                if (point.name) {
                    nam = fCapital(point.name);
                }
                else if (point.from) {
                    nam = fCapital(point.from);
                }
                if (nam === name) {
                    point.setState('hover');
                }
                else {
                    point.setState('inactive');
                }
            }
        });
    });
    // Remove all states on mouse out
    document.querySelectorAll(parentContainer + ' .legend-item').forEach(function (a) {
        a.addEventListener("mouseout", function () {
            for (let point of chart_points) {
                point.setState('');
            }
        });
    });
}
export function addDropdown(parent, name, width, taxonChange, options, selected) {
    let selectContainer = document.createElement("div");
    selectContainer.classList.add("dropdown-container");
    if (width != "") {
        selectContainer.style.width = width;
    }
    parent.appendChild(selectContainer);
    // Create and append list
    let select = document.createElement("select");
    select.id = name + "-select";
    select.onchange = taxonChange;
    selectContainer.appendChild(select);
    for (let op of options) {
        select.add(new Option(op));
    }
    select.value = selected;
}
export function addSlider(parent, name, min, max, value, width, onChange) {
    let sliderContainer = document.createElement("div");
    sliderContainer.classList.add("slider-container");
    parent.appendChild(sliderContainer);
    let slider = document.createElement("input");
    slider.id = name + "-slider";
    slider.type = "range";
    slider.min = min.toString();
    slider.max = max.toString();
    slider.value = value.toString();
    slider.classList.add("slider");
    slider.onchange = onChange;
    sliderContainer.appendChild(slider);
    // Add a span to show the slider's value
    let sliderOutput = document.createElement("span");
    sliderOutput.id = name + "-slider-output";
    sliderOutput.classList.add("slider-output");
    sliderOutput.innerHTML = value.toString();
    sliderOutput.style.width = width + "px";
    sliderContainer.appendChild(sliderOutput);
}
export function getIndexColor(indx) {
    let indexColor = new Map();
    indexColor.set(0, "#B3DBFF");
    indexColor.set(0, "#B3DBFF");
    indexColor.set(1, "#66B8FF");
    indexColor.set(2, "#1A94FF");
    indexColor.set(3, "#0070D1");
    indexColor.set(4, "#005299");
    indexColor.set(5, "#003666");
    indexColor.set(6, "#001B33");
    indexColor.set(7, "#FFFF99");
    indexColor.set(8, "#FFFF4D");
    indexColor.set(9, "#FFFF1A");
    indexColor.set(10, "#C7C705");
    indexColor.set(11, "#919108");
    indexColor.set(12, "#5E5E08");
    indexColor.set(13, "#2E2E05");
    indexColor.set(14, "#FAD1EC");
    indexColor.set(15, "#F48BCF");
    indexColor.set(16, "#ED45B2");
    indexColor.set(17, "#D1158F");
    indexColor.set(18, "#970F67");
    indexColor.set(19, "#5D0940");
    indexColor.set(20, "#2E0520");
    indexColor.set(21, "#7DE87D");
    indexColor.set(22, "#52E052");
    indexColor.set(23, "#23CA23");
    indexColor.set(24, "#1B981B");
    indexColor.set(25, "#136C13");
    indexColor.set(26, "#0B410B");
    indexColor.set(27, "#041604");
    indexColor.set(28, "#F18E8E");
    indexColor.set(29, "#EB6060");
    indexColor.set(30, "#E63333");
    indexColor.set(31, "#CC1919");
    indexColor.set(32, "#881111");
    indexColor.set(33, "#440808");
    indexColor.set(34, "#170303");
    indexColor.set(35, "#e7d7f4");
    indexColor.set(36, "#C29CE2");
    indexColor.set(37, "#9D61D1");
    indexColor.set(38, "#772EB8");
    indexColor.set(39, "#501980");
    indexColor.set(40, "#360D59");
    indexColor.set(41, "#1B042F");
    indexColor.set(42, "#FFDBB3");
    indexColor.set(43, "#FFB866");
    indexColor.set(44, "#FFA033");
    indexColor.set(45, "#FF8800");
    indexColor.set(46, "#CC6D00");
    indexColor.set(47, "#804400");
    indexColor.set(48, "#4D2900");
    indexColor.set(49, "#ddc3c3");
    indexColor.set(50, "#8B9595");
    indexColor.set(51, "#101414");
    indexColor.set(52, "#DDDDDD");
    indexColor.set(53, "#394646");
    let color = indexColor.get(indx);
    if (!color) {
        console.log("Color not found for index " + indx);
    }
    return color;
}
function tabClickHandler(parent, element) {
    if (!(element.classList.contains("tab-active"))) {
        // hide all tab buttons
        let parentNod = element.parentNode;
        for (let i in parentNod.childNodes) {
            let el = parentNod.childNodes[i];
            if (el.nodeName == "DIV") {
                el.classList.remove("tab-active");
            }
        }
        //activate this button
        element.classList.add("tab-active");
        // hide other texts and activate this text
        let questionsText = parent.getElementsByClassName("dash-questions")[0];
        let obscurityText = parent.getElementsByClassName("dash-obscurity")[0];
        let navigationText = parent.getElementsByClassName("dash-navigation")[0];
        if (element.innerHTML == "Questions") {
            obscurityText.classList.add("hide");
            navigationText.classList.add("hide");
            questionsText.classList.remove("hide");
        }
        else if (element.innerHTML == "Obscurity") {
            questionsText.classList.add("hide");
            navigationText.classList.add("hide");
            obscurityText.classList.remove("hide");
        }
        else if (element.innerHTML == "Navigation") {
            questionsText.classList.add("hide");
            obscurityText.classList.add("hide");
            navigationText.classList.remove("hide");
        }
    }
}
export function addTabClickEvents(css) {
    let parentElement = document.getElementById(css);
    let tabElements = parentElement.getElementsByClassName('tab-button');
    for (let i = tabElements.length - 1; i >= 0; i--) {
        // using anonymous function to pass parameters (apart from default this and event)
        tabElements[i].addEventListener('click', () => {
            tabClickHandler(parentElement, tabElements[i]);
        });
    }
}
