class StaticData {


    static getDepartmentList(id=false)
    {
        const data={
            1:"Scientific",
            2:"Non-Scientific", 
        }; 

        if(id){
            return data[id];
        }
        return data;
    }


static getCurrentPositionList(id=false)
    {
        const data={
            1:"Professor",
            2:"Asst-Professor",
            3:"Lab-Assistant",
            4:"Others",
        }; 

        if(id){
            return data[id];
        }
        return data;

    }

static getInterestList(id=false)
    {
        const data={
            1:"Group discussion", 
            2:"Publishing",
            3:"Traveling",
            4: "Reading",
            5: "Traveling",
            6: "Photography",
            7: "Cooking",
            8: "Hiking",
            9: "Painting",


        }; 

        if(id){
            return data[id];
        }
        return data;

    }

static getHobbies(id=false)
    {
        const data = {
            1: "Reading",
            2: "Traveling",
            3: "Photography",
            4: "Cooking",
            5: "Hiking",
            6: "Painting",
            7: "Playing a musical instrument",
            8: "Gardening",
            9: "Fitness and exercise",
            10: "Astronomy",
            11: "Writing",
            12: "Meditation",
            13: "Film and cinema",
            14: "Gaming",
            15: "Birdwatching",
            16: "Fashion design",
            17: "History exploration",
            18: "DIY projects",
            19: "Technology exploration",
            20: "Volunteering",
            21: "Fishing",
            22: "Cycling",
            23: "Collecting stamps",
            24: "Sculpting",
            25: "Surfing",
            26: "Skateboarding",
            27: "Archery",
            28: "Knitting",
            29: "Yoga",
            30: "Playing chess",
            31: "Model building",
            32: "Calligraphy",
            33: "Cooking international cuisines",
            34: "Pottery",
            35: "Origami",
            36: "Woodworking",
            37: "Bird photography",
            38: "Model railroading",
            39: "Rock climbing",
            40: "Sailing",
            41: "Graphic design",
            42: "Baking",
            43: "Interior decorating",
            44: "Beekeeping",
            45: "Wine tasting",
            46: "Stand-up comedy",
            47: "Acting",
            48: "Magic tricks",
            49: "Geocaching",
            50: "Scuba diving",
        };
        
        
        if(id){
            return data[id];
        }
        return data;
    }

    static getLanguageList(id=false)
    {
        const data={
            1:"Deutsche",
            2:"English",
            3:"French",
            3:"Spanish",
            4:"Italian",
            5:"China",
            6:"Polish",
            7:"Bangladesh",
            8:"Turkish",
            9:"Hindi",
            10:"Saudi Arabia",
        }; 

        if(id){
            return data[id];
        }
        return data;

}


static getStateList(id=false)
    {
            const data = {
                "DE": {
                "1": {
                    "name":"baden-württemberg",
                    "cities": ["stuttgart", "karlsruhe", "heidelberg"]
                },
                "2": {
                    "name":"bavaria (bayern)",
                    "cities": ["munich","nuremberg", "augsburg", "forchheim",
                    "erlangen", "bamberg","regensburg", "ingolstadt", "würzburg",
                    "passau",  "landshut", "schweinfurt","rosenheim",
                    "aschaffenburg", "kempten", "straubing", "dachau", "memmingen",
                    "ansbach",  "neu-ulm", "hof",  "freising", "weiden",
                    "coburg",  "bogen", "kitzingen","germering", "schwabach",
                    "olching", "lauf an der pegnitz", "fürth",
                    "ingolstadt", "sulzbach-rosenberg","geretsried",
                    "amberg",  "landau an der isar","neumarkt in der oberpfalz",
                    "neustadt an der waldnaab","zirndorf", "schwandorf","forchheim"]
                },
                "3": {
                    "name":"berlin",
                    "cities": ["berlin city", "potsdam"]
                },
                "4": {
                    "name":"brandenburg",
                    "cities": ["potsdam", "cottbus", "brandenburg an der havel"]
                },
                "5": {
                    "name":"bremen",
                    "cities": ["bremen", "bremerhaven"]
                },
                "6": {
                    "name":"hamburg",
                    "cities": ["hamburg"]
                },
                "7": {
                    "name":"frankfurt",
                    "cities": ["frankfurt", "Altstadt", "Bahnhofsviertel","Innenstadt (City Center)"]
                },
                "8": {
                    "name":"lower saxony (niedersachsen)",
                    "cities": ["hanover", "braunschweig", "osnabrück"]
                },
                "9": {
                    "name":"mecklenburg-vorpommern",
                    "cities": ["schwerin", "rostock", "stralsund"]
                },
                "10": {
                    "name":"saxony (sachsen)",
                    "cities": ["dresden", "leipzig", "chemnitz"]
                }, 
                "11": {
                    "name":"thüringen",
                    "cities": ["erfurt", "jena", "weimar"]
                },
                "12": {
                    "name":"Hesse (Hessen)",
                    "cities": ["Frankfurt am Main","Wiesbaden","Kassel","Darmstadt","Hanau"]
                },
                "13": {
                    "name":"bremen",
                    "cities": ["bremen", "bremerhaven"]
                },
                "14": {
                    "name":"berlin",
                    "cities": ["berlin city", "potsdam"]
                },
                
                }
            };
    
        
        
        if(id){
            
                if(data.hasOwnProperty(id))
                {
                    return data[id];
                }else{
                    return data;
                }
            
        }
        return data;
    }
    static getCountryList(id=false)
    {
        const data ={
            "TC": {
                "name": "Turks and Caicos Islands",
                "code": "TC",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/tc.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1649"
            },
            "NG": {
                "name": "Nigeria",
                "code": "NG",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/ng.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "NGN": {
                        "name": "Nigerian naira",
                        "symbol": "₦"
                    }
                },
                "calling_code": "+234"
            },
            "EH": {
                "name": "Western Sahara",
                "code": "EH",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/eh.png",
                "timezone": [
                    "UTC+00:00"
                ],
                "currency": {
                    "DZD": {
                        "name": "Algerian dinar",
                        "symbol": "دج"
                    },
                    "MAD": {
                        "name": "Moroccan dirham",
                        "symbol": "DH"
                    },
                    "MRU": {
                        "name": "Mauritanian ouguiya",
                        "symbol": "UM"
                    }
                },
                "calling_code": "+2125288,125289"
            },
            "TW": {
                "name": "Taiwan",
                "code": "TW",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/tw.png",
                "timezone": [
                    "UTC+08:00"
                ],
                "currency": {
                    "TWD": {
                        "name": "New Taiwan dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+886"
            },
            "CR": {
                "name": "Costa Rica",
                "code": "CR",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/cr.png",
                "timezone": [
                    "UTC-06:00"
                ],
                "currency": {
                    "CRC": {
                        "name": "Costa Rican colón",
                        "symbol": "₡"
                    }
                },
                "calling_code": "+506"
            },
            "BJ": {
                "name": "Benin",
                "code": "BJ",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/bj.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "XOF": {
                        "name": "West African CFA franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+229"
            },
            "HN": {
                "name": "Honduras",
                "code": "HN",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/hn.png",
                "timezone": [
                    "UTC-06:00"
                ],
                "currency": {
                    "HNL": {
                        "name": "Honduran lempira",
                        "symbol": "L"
                    }
                },
                "calling_code": "+504"
            },
            "PW": {
                "name": "Palau",
                "code": "PW",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/pw.png",
                "timezone": [
                    "UTC+09:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+680"
            },
            "AU": {
                "name": "Australia",
                "code": "AU",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/au.png",
                "timezone": [
                    "UTC+05:00",
                    "UTC+06:30",
                    "UTC+07:00",
                    "UTC+08:00",
                    "UTC+09:30",
                    "UTC+10:00",
                    "UTC+10:30",
                    "UTC+11:30"
                ],
                "currency": {
                    "AUD": {
                        "name": "Australian dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+61"
            },
            "DE": {
                "name": "Germany",
                "code": "DE",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/de.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+49"
            },
            "UZ": {
                "name": "Uzbekistan",
                "code": "UZ",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/uz.png",
                "timezone": [
                    "UTC+05:00"
                ],
                "currency": {
                    "UZS": {
                        "name": "Uzbekistani soʻm",
                        "symbol": "so'm"
                    }
                },
                "calling_code": "+998"
            },
            "BO": {
                "name": "Bolivia",
                "code": "BO",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/bo.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "BOB": {
                        "name": "Bolivian boliviano",
                        "symbol": "Bs."
                    }
                },
                "calling_code": "+591"
            },
            "CI": {
                "name": "Ivory Coast",
                "code": "CI",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/ci.png",
                "timezone": [
                    "UTC"
                ],
                "currency": {
                    "XOF": {
                        "name": "West African CFA franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+225"
            },
            "MN": {
                "name": "Mongolia",
                "code": "MN",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/mn.png",
                "timezone": [
                    "UTC+07:00",
                    "UTC+08:00"
                ],
                "currency": {
                    "MNT": {
                        "name": "Mongolian tögrög",
                        "symbol": "₮"
                    }
                },
                "calling_code": "+976"
            },
            "SG": {
                "name": "Singapore",
                "code": "SG",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/sg.png",
                "timezone": [
                    "UTC+08:00"
                ],
                "currency": {
                    "SGD": {
                        "name": "Singapore dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+65"
            },
            "SC": {
                "name": "Seychelles",
                "code": "SC",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/sc.png",
                "timezone": [
                    "UTC+04:00"
                ],
                "currency": {
                    "SCR": {
                        "name": "Seychellois rupee",
                        "symbol": "₨"
                    }
                },
                "calling_code": "+248"
            },
            "SJ": {
                "name": "Svalbard and Jan Mayen",
                "code": "SJ",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/sj.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "NOK": {
                        "name": "krone",
                        "symbol": "kr"
                    }
                },
                "calling_code": "+4779"
            },
            "BV": {
                "name": "Bouvet Island",
                "code": "BV",
                "region": "Antarctic",
                "flags": "https://flagcdn.com/w320/bv.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "calling_code": "+47"
            },
            "HT": {
                "name": "Haiti",
                "code": "HT",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/ht.png",
                "timezone": [
                    "UTC-05:00"
                ],
                "currency": {
                    "HTG": {
                        "name": "Haitian gourde",
                        "symbol": "G"
                    }
                },
                "calling_code": "+509"
            },
            "NR": {
                "name": "Nauru",
                "code": "NR",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/nr.png",
                "timezone": [
                    "UTC+12:00"
                ],
                "currency": {
                    "AUD": {
                        "name": "Australian dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+674"
            },
            "PG": {
                "name": "Papua New Guinea",
                "code": "PG",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/pg.png",
                "timezone": [
                    "UTC+10:00"
                ],
                "currency": {
                    "PGK": {
                        "name": "Papua New Guinean kina",
                        "symbol": "K"
                    }
                },
                "calling_code": "+675"
            },
            "MZ": {
                "name": "Mozambique",
                "code": "MZ",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/mz.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "MZN": {
                        "name": "Mozambican metical",
                        "symbol": "MT"
                    }
                },
                "calling_code": "+258"
            },
            "PK": {
                "name": "Pakistan",
                "code": "PK",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/pk.png",
                "timezone": [
                    "UTC+05:00"
                ],
                "currency": {
                    "PKR": {
                        "name": "Pakistani rupee",
                        "symbol": "₨"
                    }
                },
                "calling_code": "+92"
            },
            "UG": {
                "name": "Uganda",
                "code": "UG",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/ug.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "UGX": {
                        "name": "Ugandan shilling",
                        "symbol": "Sh"
                    }
                },
                "calling_code": "+256"
            },
            "AQ": {
                "name": "Antarctica",
                "code": "AQ",
                "region": "Antarctic",
                "flags": "https://flagcdn.com/w320/aq.png",
                "timezone": [
                    "UTC-03:00",
                    "UTC+03:00",
                    "UTC+05:00",
                    "UTC+06:00",
                    "UTC+07:00",
                    "UTC+08:00",
                    "UTC+10:00",
                    "UTC+12:00"
                ],
                "calling_code": null
            },
            "BW": {
                "name": "Botswana",
                "code": "BW",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/bw.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "BWP": {
                        "name": "Botswana pula",
                        "symbol": "P"
                    }
                },
                "calling_code": "+267"
            },
            "IT": {
                "name": "Italy",
                "code": "IT",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/it.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+39"
            },
            "MS": {
                "name": "Montserrat",
                "code": "MS",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/ms.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "XCD": {
                        "name": "Eastern Caribbean dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1664"
            },
            "SA": {
                "name": "Saudi Arabia",
                "code": "SA",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/sa.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "SAR": {
                        "name": "Saudi riyal",
                        "symbol": "ر.س"
                    }
                },
                "calling_code": "+966"
            },
            "GB": {
                "name": "United Kingdom",
                "code": "GB",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/gb.png",
                "timezone": [
                    "UTC-08:00",
                    "UTC-05:00",
                    "UTC-04:00",
                    "UTC-03:00",
                    "UTC-02:00",
                    "UTC",
                    "UTC+01:00",
                    "UTC+02:00",
                    "UTC+06:00"
                ],
                "currency": {
                    "GBP": {
                        "name": "British pound",
                        "symbol": "£"
                    }
                },
                "calling_code": "+44"
            },
            "GT": {
                "name": "Guatemala",
                "code": "GT",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/gt.png",
                "timezone": [
                    "UTC-06:00"
                ],
                "currency": {
                    "GTQ": {
                        "name": "Guatemalan quetzal",
                        "symbol": "Q"
                    }
                },
                "calling_code": "+502"
            },
            "GU": {
                "name": "Guam",
                "code": "GU",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/gu.png",
                "timezone": [
                    "UTC+10:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1671"
            },
            "AO": {
                "name": "Angola",
                "code": "AO",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/ao.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "AOA": {
                        "name": "Angolan kwanza",
                        "symbol": "Kz"
                    }
                },
                "calling_code": "+244"
            },
            "BY": {
                "name": "Belarus",
                "code": "BY",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/by.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "BYN": {
                        "name": "Belarusian ruble",
                        "symbol": "Br"
                    }
                },
                "calling_code": "+375"
            },
            "IS": {
                "name": "Iceland",
                "code": "IS",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/is.png",
                "timezone": [
                    "UTC"
                ],
                "currency": {
                    "ISK": {
                        "name": "Icelandic króna",
                        "symbol": "kr"
                    }
                },
                "calling_code": "+354"
            },
            "BL": {
                "name": "Saint Barthélemy",
                "code": "BL",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/bl.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+590"
            },
            "IL": {
                "name": "Israel",
                "code": "IL",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/il.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "ILS": {
                        "name": "Israeli new shekel",
                        "symbol": "₪"
                    }
                },
                "calling_code": "+972"
            },
            "LC": {
                "name": "Saint Lucia",
                "code": "LC",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/lc.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "XCD": {
                        "name": "Eastern Caribbean dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1758"
            },
            "MT": {
                "name": "Malta",
                "code": "MT",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/mt.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+356"
            },
            "OM": {
                "name": "Oman",
                "code": "OM",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/om.png",
                "timezone": [
                    "UTC+04:00"
                ],
                "currency": {
                    "OMR": {
                        "name": "Omani rial",
                        "symbol": "ر.ع."
                    }
                },
                "calling_code": "+968"
            },
            "MA": {
                "name": "Morocco",
                "code": "MA",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/ma.png",
                "timezone": [
                    "UTC"
                ],
                "currency": {
                    "MAD": {
                        "name": "Moroccan dirham",
                        "symbol": "د.م."
                    }
                },
                "calling_code": "+212"
            },
            "CK": {
                "name": "Cook Islands",
                "code": "CK",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/ck.png",
                "timezone": [
                    "UTC-10:00"
                ],
                "currency": {
                    "CKD": {
                        "name": "Cook Islands dollar",
                        "symbol": "$"
                    },
                    "NZD": {
                        "name": "New Zealand dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+682"
            },
            "MK": {
                "name": "North Macedonia",
                "code": "MK",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/mk.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "MKD": {
                        "name": "denar",
                        "symbol": "den"
                    }
                },
                "calling_code": "+389"
            },
            "CD": {
                "name": "DR Congo",
                "code": "CD",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/cd.png",
                "timezone": [
                    "UTC+01:00",
                    "UTC+02:00"
                ],
                "currency": {
                    "CDF": {
                        "name": "Congolese franc",
                        "symbol": "FC"
                    }
                },
                "calling_code": "+243"
            },
            "LB": {
                "name": "Lebanon",
                "code": "LB",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/lb.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "LBP": {
                        "name": "Lebanese pound",
                        "symbol": "ل.ل"
                    }
                },
                "calling_code": "+961"
            },
            "LR": {
                "name": "Liberia",
                "code": "LR",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/lr.png",
                "timezone": [
                    "UTC"
                ],
                "currency": {
                    "LRD": {
                        "name": "Liberian dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+231"
            },
            "KI": {
                "name": "Kiribati",
                "code": "KI",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/ki.png",
                "timezone": [
                    "UTC+12:00",
                    "UTC+13:00",
                    "UTC+14:00"
                ],
                "currency": {
                    "AUD": {
                        "name": "Australian dollar",
                        "symbol": "$"
                    },
                    "KID": {
                        "name": "Kiribati dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+686"
            },
            "SZ": {
                "name": "Eswatini",
                "code": "SZ",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/sz.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "SZL": {
                        "name": "Swazi lilangeni",
                        "symbol": "L"
                    },
                    "ZAR": {
                        "name": "South African rand",
                        "symbol": "R"
                    }
                },
                "calling_code": "+268"
            },
            "CY": {
                "name": "Cyprus",
                "code": "CY",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/cy.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+357"
            },
            "BT": {
                "name": "Bhutan",
                "code": "BT",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/bt.png",
                "timezone": [
                    "UTC+06:00"
                ],
                "currency": {
                    "BTN": {
                        "name": "Bhutanese ngultrum",
                        "symbol": "Nu."
                    },
                    "INR": {
                        "name": "Indian rupee",
                        "symbol": "₹"
                    }
                },
                "calling_code": "+975"
            },
            "ID": {
                "name": "Indonesia",
                "code": "ID",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/id.png",
                "timezone": [
                    "UTC+07:00",
                    "UTC+08:00",
                    "UTC+09:00"
                ],
                "currency": {
                    "IDR": {
                        "name": "Indonesian rupiah",
                        "symbol": "Rp"
                    }
                },
                "calling_code": "+62"
            },
            "PS": {
                "name": "Palestine",
                "code": "PS",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/ps.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "EGP": {
                        "name": "Egyptian pound",
                        "symbol": "E£"
                    },
                    "ILS": {
                        "name": "Israeli new shekel",
                        "symbol": "₪"
                    },
                    "JOD": {
                        "name": "Jordanian dinar",
                        "symbol": "JD"
                    }
                },
                "calling_code": "+970"
            },
            "EG": {
                "name": "Egypt",
                "code": "EG",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/eg.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "EGP": {
                        "name": "Egyptian pound",
                        "symbol": "£"
                    }
                },
                "calling_code": "+20"
            },
            "XK": {
                "name": "Kosovo",
                "code": "XK",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/xk.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+383"
            },
            "KP": {
                "name": "North Korea",
                "code": "KP",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/kp.png",
                "timezone": [
                    "UTC+09:00"
                ],
                "currency": {
                    "KPW": {
                        "name": "North Korean won",
                        "symbol": "₩"
                    }
                },
                "calling_code": "+850"
            },
            "IQ": {
                "name": "Iraq",
                "code": "IQ",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/iq.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "IQD": {
                        "name": "Iraqi dinar",
                        "symbol": "ع.د"
                    }
                },
                "calling_code": "+964"
            },
            "TH": {
                "name": "Thailand",
                "code": "TH",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/th.png",
                "timezone": [
                    "UTC+07:00"
                ],
                "currency": {
                    "THB": {
                        "name": "Thai baht",
                        "symbol": "฿"
                    }
                },
                "calling_code": "+66"
            },
            "ZW": {
                "name": "Zimbabwe",
                "code": "ZW",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/zw.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "ZWL": {
                        "name": "Zimbabwean dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+263"
            },
            "WS": {
                "name": "Samoa",
                "code": "WS",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/ws.png",
                "timezone": [
                    "UTC+13:00"
                ],
                "currency": {
                    "WST": {
                        "name": "Samoan tālā",
                        "symbol": "T"
                    }
                },
                "calling_code": "+685"
            },
            "AT": {
                "name": "Austria",
                "code": "AT",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/at.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+43"
            },
            "TT": {
                "name": "Trinidad and Tobago",
                "code": "TT",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/tt.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "TTD": {
                        "name": "Trinidad and Tobago dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1868"
            },
            "DO": {
                "name": "Dominican Republic",
                "code": "DO",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/do.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "DOP": {
                        "name": "Dominican peso",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1809,829,849"
            },
            "IO": {
                "name": "British Indian Ocean Territory",
                "code": "IO",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/io.png",
                "timezone": [
                    "UTC+06:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+246"
            },
            "TZ": {
                "name": "Tanzania",
                "code": "TZ",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/tz.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "TZS": {
                        "name": "Tanzanian shilling",
                        "symbol": "Sh"
                    }
                },
                "calling_code": "+255"
            },
            "BG": {
                "name": "Bulgaria",
                "code": "BG",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/bg.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "BGN": {
                        "name": "Bulgarian lev",
                        "symbol": "лв"
                    }
                },
                "calling_code": "+359"
            },
            "ET": {
                "name": "Ethiopia",
                "code": "ET",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/et.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "ETB": {
                        "name": "Ethiopian birr",
                        "symbol": "Br"
                    }
                },
                "calling_code": "+251"
            },
            "RO": {
                "name": "Romania",
                "code": "RO",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/ro.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "RON": {
                        "name": "Romanian leu",
                        "symbol": "lei"
                    }
                },
                "calling_code": "+40"
            },
            "MG": {
                "name": "Madagascar",
                "code": "MG",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/mg.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "MGA": {
                        "name": "Malagasy ariary",
                        "symbol": "Ar"
                    }
                },
                "calling_code": "+261"
            },
            "VU": {
                "name": "Vanuatu",
                "code": "VU",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/vu.png",
                "timezone": [
                    "UTC+11:00"
                ],
                "currency": {
                    "VUV": {
                        "name": "Vanuatu vatu",
                        "symbol": "Vt"
                    }
                },
                "calling_code": "+678"
            },
            "DM": {
                "name": "Dominica",
                "code": "DM",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/dm.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "XCD": {
                        "name": "Eastern Caribbean dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1767"
            },
            "CG": {
                "name": "Republic of the Congo",
                "code": "CG",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/cg.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "XAF": {
                        "name": "Central African CFA franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+242"
            },
            "CW": {
                "name": "Curaçao",
                "code": "CW",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/cw.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "ANG": {
                        "name": "Netherlands Antillean guilder",
                        "symbol": "ƒ"
                    }
                },
                "calling_code": "+599"
            },
            "TR": {
                "name": "Turkey",
                "code": "TR",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/tr.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "TRY": {
                        "name": "Turkish lira",
                        "symbol": "₺"
                    }
                },
                "calling_code": "+90"
            },
            "MQ": {
                "name": "Martinique",
                "code": "MQ",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/mq.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+596"
            },
            "BF": {
                "name": "Burkina Faso",
                "code": "BF",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/bf.png",
                "timezone": [
                    "UTC"
                ],
                "currency": {
                    "XOF": {
                        "name": "West African CFA franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+226"
            },
            "NZ": {
                "name": "New Zealand",
                "code": "NZ",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/nz.png",
                "timezone": [
                    "UTC-11:00",
                    "UTC-10:00",
                    "UTC+12:00",
                    "UTC+12:45",
                    "UTC+13:00"
                ],
                "currency": {
                    "NZD": {
                        "name": "New Zealand dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+64"
            },
            "WF": {
                "name": "Wallis and Futuna",
                "code": "WF",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/wf.png",
                "timezone": [
                    "UTC+12:00"
                ],
                "currency": {
                    "XPF": {
                        "name": "CFP franc",
                        "symbol": "₣"
                    }
                },
                "calling_code": "+681"
            },
            "YE": {
                "name": "Yemen",
                "code": "YE",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/ye.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "YER": {
                        "name": "Yemeni rial",
                        "symbol": "﷼"
                    }
                },
                "calling_code": "+967"
            },
            "EC": {
                "name": "Ecuador",
                "code": "EC",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/ec.png",
                "timezone": [
                    "UTC-06:00",
                    "UTC-05:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+593"
            },
            "NP": {
                "name": "Nepal",
                "code": "NP",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/np.png",
                "timezone": [
                    "UTC+05:45"
                ],
                "currency": {
                    "NPR": {
                        "name": "Nepalese rupee",
                        "symbol": "₨"
                    }
                },
                "calling_code": "+977"
            },
            "AX": {
                "name": "Åland Islands",
                "code": "AX",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/ax.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+35818"
            },
            "MP": {
                "name": "Northern Mariana Islands",
                "code": "MP",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/mp.png",
                "timezone": [
                    "UTC+10:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1670"
            },
            "FO": {
                "name": "Faroe Islands",
                "code": "FO",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/fo.png",
                "timezone": [
                    "UTC+00:00"
                ],
                "currency": {
                    "DKK": {
                        "name": "Danish krone",
                        "symbol": "kr"
                    },
                    "FOK": {
                        "name": "Faroese króna",
                        "symbol": "kr"
                    }
                },
                "calling_code": "+298"
            },
            "PH": {
                "name": "Philippines",
                "code": "PH",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/ph.png",
                "timezone": [
                    "UTC+08:00"
                ],
                "currency": {
                    "PHP": {
                        "name": "Philippine peso",
                        "symbol": "₱"
                    }
                },
                "calling_code": "+63"
            },
            "CX": {
                "name": "Christmas Island",
                "code": "CX",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/cx.png",
                "timezone": [
                    "UTC+07:00"
                ],
                "currency": {
                    "AUD": {
                        "name": "Australian dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+61"
            },
            "VC": {
                "name": "Saint Vincent and the Grenadines",
                "code": "VC",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/vc.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "XCD": {
                        "name": "Eastern Caribbean dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1784"
            },
            "PF": {
                "name": "French Polynesia",
                "code": "PF",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/pf.png",
                "timezone": [
                    "UTC-10:00",
                    "UTC-09:30",
                    "UTC-09:00"
                ],
                "currency": {
                    "XPF": {
                        "name": "CFP franc",
                        "symbol": "₣"
                    }
                },
                "calling_code": "+689"
            },
            "IR": {
                "name": "Iran",
                "code": "IR",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/ir.png",
                "timezone": [
                    "UTC+03:30"
                ],
                "currency": {
                    "IRR": {
                        "name": "Iranian rial",
                        "symbol": "﷼"
                    }
                },
                "calling_code": "+98"
            },
            "MV": {
                "name": "Maldives",
                "code": "MV",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/mv.png",
                "timezone": [
                    "UTC+05:00"
                ],
                "currency": {
                    "MVR": {
                        "name": "Maldivian rufiyaa",
                        "symbol": ".ރ"
                    }
                },
                "calling_code": "+960"
            },
            "NF": {
                "name": "Norfolk Island",
                "code": "NF",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/nf.png",
                "timezone": [
                    "UTC+11:30"
                ],
                "currency": {
                    "AUD": {
                        "name": "Australian dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+672"
            },
            "CU": {
                "name": "Cuba",
                "code": "CU",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/cu.png",
                "timezone": [
                    "UTC-05:00"
                ],
                "currency": {
                    "CUC": {
                        "name": "Cuban convertible peso",
                        "symbol": "$"
                    },
                    "CUP": {
                        "name": "Cuban peso",
                        "symbol": "$"
                    }
                },
                "calling_code": "+53"
            },
            "EE": {
                "name": "Estonia",
                "code": "EE",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/ee.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+372"
            },
            "TF": {
                "name": "French Southern and Antarctic Lands",
                "code": "TF",
                "region": "Antarctic",
                "flags": "https://flagcdn.com/w320/tf.png",
                "timezone": [
                    "UTC+05:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+262"
            },
            "LY": {
                "name": "Libya",
                "code": "LY",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/ly.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "LYD": {
                        "name": "Libyan dinar",
                        "symbol": "ل.د"
                    }
                },
                "calling_code": "+218"
            },
            "DZ": {
                "name": "Algeria",
                "code": "DZ",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/dz.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "DZD": {
                        "name": "Algerian dinar",
                        "symbol": "د.ج"
                    }
                },
                "calling_code": "+213"
            },
            "MX": {
                "name": "Mexico",
                "code": "MX",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/mx.png",
                "timezone": [
                    "UTC-08:00",
                    "UTC-07:00",
                    "UTC-06:00"
                ],
                "currency": {
                    "MXN": {
                        "name": "Mexican peso",
                        "symbol": "$"
                    }
                },
                "calling_code": "+52"
            },
            "TM": {
                "name": "Turkmenistan",
                "code": "TM",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/tm.png",
                "timezone": [
                    "UTC+05:00"
                ],
                "currency": {
                    "TMT": {
                        "name": "Turkmenistan manat",
                        "symbol": "m"
                    }
                },
                "calling_code": "+993"
            },
            "NE": {
                "name": "Niger",
                "code": "NE",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/ne.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "XOF": {
                        "name": "West African CFA franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+227"
            },
            "PR": {
                "name": "Puerto Rico",
                "code": "PR",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/pr.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1787,939"
            },
            "MM": {
                "name": "Myanmar",
                "code": "MM",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/mm.png",
                "timezone": [
                    "UTC+06:30"
                ],
                "currency": {
                    "MMK": {
                        "name": "Burmese kyat",
                        "symbol": "Ks"
                    }
                },
                "calling_code": "+95"
            },
            "SX": {
                "name": "Sint Maarten",
                "code": "SX",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/sx.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "ANG": {
                        "name": "Netherlands Antillean guilder",
                        "symbol": "ƒ"
                    }
                },
                "calling_code": "+1721"
            },
            "LV": {
                "name": "Latvia",
                "code": "LV",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/lv.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+371"
            },
            "LI": {
                "name": "Liechtenstein",
                "code": "LI",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/li.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "CHF": {
                        "name": "Swiss franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+423"
            },
            "RU": {
                "name": "Russia",
                "code": "RU",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/ru.png",
                "timezone": [
                    "UTC+03:00",
                    "UTC+04:00",
                    "UTC+06:00",
                    "UTC+07:00",
                    "UTC+08:00",
                    "UTC+09:00",
                    "UTC+10:00",
                    "UTC+11:00",
                    "UTC+12:00"
                ],
                "currency": {
                    "RUB": {
                        "name": "Russian ruble",
                        "symbol": "₽"
                    }
                },
                "calling_code": "+73,4,5,8,9"
            },
            "BA": {
                "name": "Bosnia and Herzegovina",
                "code": "BA",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/ba.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "BAM": {
                        "name": "Bosnia and Herzegovina convertible mark"
                    }
                },
                "calling_code": "+387"
            },
            "HM": {
                "name": "Heard Island and McDonald Islands",
                "code": "HM",
                "region": "Antarctic",
                "flags": "https://flagcdn.com/w320/hm.png",
                "timezone": [
                    "UTC+05:00"
                ],
                "calling_code": null
            },
            "MR": {
                "name": "Mauritania",
                "code": "MR",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/mr.png",
                "timezone": [
                    "UTC"
                ],
                "currency": {
                    "MRU": {
                        "name": "Mauritanian ouguiya",
                        "symbol": "UM"
                    }
                },
                "calling_code": "+222"
            },
            "KW": {
                "name": "Kuwait",
                "code": "KW",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/kw.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "KWD": {
                        "name": "Kuwaiti dinar",
                        "symbol": "د.ك"
                    }
                },
                "calling_code": "+965"
            },
            "IM": {
                "name": "Isle of Man",
                "code": "IM",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/im.png",
                "timezone": [
                    "UTC+00:00"
                ],
                "currency": {
                    "GBP": {
                        "name": "British pound",
                        "symbol": "£"
                    },
                    "IMP": {
                        "name": "Manx pound",
                        "symbol": "£"
                    }
                },
                "calling_code": "+44"
            },
            "CM": {
                "name": "Cameroon",
                "code": "CM",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/cm.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "XAF": {
                        "name": "Central African CFA franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+237"
            },
            "IE": {
                "name": "Ireland",
                "code": "IE",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/ie.png",
                "timezone": [
                    "UTC"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+353"
            },
            "KG": {
                "name": "Kyrgyzstan",
                "code": "KG",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/kg.png",
                "timezone": [
                    "UTC+06:00"
                ],
                "currency": {
                    "KGS": {
                        "name": "Kyrgyzstani som",
                        "symbol": "с"
                    }
                },
                "calling_code": "+996"
            },
            "LS": {
                "name": "Lesotho",
                "code": "LS",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/ls.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "LSL": {
                        "name": "Lesotho loti",
                        "symbol": "L"
                    },
                    "ZAR": {
                        "name": "South African rand",
                        "symbol": "R"
                    }
                },
                "calling_code": "+266"
            },
            "HR": {
                "name": "Croatia",
                "code": "HR",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/hr.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+385"
            },
            "RW": {
                "name": "Rwanda",
                "code": "RW",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/rw.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "RWF": {
                        "name": "Rwandan franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+250"
            },
            "SL": {
                "name": "Sierra Leone",
                "code": "SL",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/sl.png",
                "timezone": [
                    "UTC"
                ],
                "currency": {
                    "SLL": {
                        "name": "Sierra Leonean leone",
                        "symbol": "Le"
                    }
                },
                "calling_code": "+232"
            },
            "GH": {
                "name": "Ghana",
                "code": "GH",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/gh.png",
                "timezone": [
                    "UTC"
                ],
                "currency": {
                    "GHS": {
                        "name": "Ghanaian cedi",
                        "symbol": "₵"
                    }
                },
                "calling_code": "+233"
            },
            "KY": {
                "name": "Cayman Islands",
                "code": "KY",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/ky.png",
                "timezone": [
                    "UTC-05:00"
                ],
                "currency": {
                    "KYD": {
                        "name": "Cayman Islands dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1345"
            },
            "TN": {
                "name": "Tunisia",
                "code": "TN",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/tn.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "TND": {
                        "name": "Tunisian dinar",
                        "symbol": "د.ت"
                    }
                },
                "calling_code": "+216"
            },
            "PM": {
                "name": "Saint Pierre and Miquelon",
                "code": "PM",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/pm.png",
                "timezone": [
                    "UTC-03:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+508"
            },
            "TJ": {
                "name": "Tajikistan",
                "code": "TJ",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/tj.png",
                "timezone": [
                    "UTC+05:00"
                ],
                "currency": {
                    "TJS": {
                        "name": "Tajikistani somoni",
                        "symbol": "ЅМ"
                    }
                },
                "calling_code": "+992"
            },
            "CL": {
                "name": "Chile",
                "code": "CL",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/cl.png",
                "timezone": [
                    "UTC-06:00",
                    "UTC-04:00"
                ],
                "currency": {
                    "CLP": {
                        "name": "Chilean peso",
                        "symbol": "$"
                    }
                },
                "calling_code": "+56"
            },
            "SR": {
                "name": "Suriname",
                "code": "SR",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/sr.png",
                "timezone": [
                    "UTC-03:00"
                ],
                "currency": {
                    "SRD": {
                        "name": "Surinamese dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+597"
            },
            "AR": {
                "name": "Argentina",
                "code": "AR",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/ar.png",
                "timezone": [
                    "UTC-03:00"
                ],
                "currency": {
                    "ARS": {
                        "name": "Argentine peso",
                        "symbol": "$"
                    }
                },
                "calling_code": "+54"
            },
            "NU": {
                "name": "Niue",
                "code": "NU",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/nu.png",
                "timezone": [
                    "UTC-11:00"
                ],
                "currency": {
                    "NZD": {
                        "name": "New Zealand dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+683"
            },
            "PT": {
                "name": "Portugal",
                "code": "PT",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/pt.png",
                "timezone": [
                    "UTC-01:00",
                    "UTC"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+351"
            },
            "ES": {
                "name": "Spain",
                "code": "ES",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/es.png",
                "timezone": [
                    "UTC",
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+34"
            },
            "SD": {
                "name": "Sudan",
                "code": "SD",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/sd.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "SDG": {
                        "name": "Sudanese pound"
                    }
                },
                "calling_code": "+249"
            },
            "UM": {
                "name": "United States Minor Outlying Islands",
                "code": "UM",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/um.png",
                "timezone": [
                    "UTC-11:00",
                    "UTC-10:00",
                    "UTC+12:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+268"
            },
            "AZ": {
                "name": "Azerbaijan",
                "code": "AZ",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/az.png",
                "timezone": [
                    "UTC+04:00"
                ],
                "currency": {
                    "AZN": {
                        "name": "Azerbaijani manat",
                        "symbol": "₼"
                    }
                },
                "calling_code": "+994"
            },
            "UA": {
                "name": "Ukraine",
                "code": "UA",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/ua.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "UAH": {
                        "name": "Ukrainian hryvnia",
                        "symbol": "₴"
                    }
                },
                "calling_code": "+380"
            },
            "TL": {
                "name": "Timor-Leste",
                "code": "TL",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/tl.png",
                "timezone": [
                    "UTC+09:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+670"
            },
            "FK": {
                "name": "Falkland Islands",
                "code": "FK",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/fk.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "FKP": {
                        "name": "Falkland Islands pound",
                        "symbol": "£"
                    }
                },
                "calling_code": "+500"
            },
            "BZ": {
                "name": "Belize",
                "code": "BZ",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/bz.png",
                "timezone": [
                    "UTC-06:00"
                ],
                "currency": {
                    "BZD": {
                        "name": "Belize dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+501"
            },
            "LA": {
                "name": "Laos",
                "code": "LA",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/la.png",
                "timezone": [
                    "UTC+07:00"
                ],
                "currency": {
                    "LAK": {
                        "name": "Lao kip",
                        "symbol": "₭"
                    }
                },
                "calling_code": "+856"
            },
            "PE": {
                "name": "Peru",
                "code": "PE",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/pe.png",
                "timezone": [
                    "UTC-05:00"
                ],
                "currency": {
                    "PEN": {
                        "name": "Peruvian sol",
                        "symbol": "S/ "
                    }
                },
                "calling_code": "+51"
            },
            "AM": {
                "name": "Armenia",
                "code": "AM",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/am.png",
                "timezone": [
                    "UTC+04:00"
                ],
                "currency": {
                    "AMD": {
                        "name": "Armenian dram",
                        "symbol": "֏"
                    }
                },
                "calling_code": "+374"
            },
            "GA": {
                "name": "Gabon",
                "code": "GA",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/ga.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "XAF": {
                        "name": "Central African CFA franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+241"
            },
            "JP": {
                "name": "Japan",
                "code": "JP",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/jp.png",
                "timezone": [
                    "UTC+09:00"
                ],
                "currency": {
                    "JPY": {
                        "name": "Japanese yen",
                        "symbol": "¥"
                    }
                },
                "calling_code": "+81"
            },
            "AF": {
                "name": "Afghanistan",
                "code": "AF",
                "region": "Asia",
                "flags": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png",
                "timezone": [
                    "UTC+04:30"
                ],
                "currency": {
                    "AFN": {
                        "name": "Afghan afghani",
                        "symbol": "؋"
                    }
                },
                "calling_code": "+93"
            },
            "QA": {
                "name": "Qatar",
                "code": "QA",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/qa.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "QAR": {
                        "name": "Qatari riyal",
                        "symbol": "ر.ق"
                    }
                },
                "calling_code": "+974"
            },
            "BD": {
                "name": "Bangladesh",
                "code": "BD",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/bd.png",
                "timezone": [
                    "UTC+06:00"
                ],
                "currency": {
                    "BDT": {
                        "name": "Bangladeshi taka",
                        "symbol": "৳"
                    }
                },
                "calling_code": "+880"
            },
            "BM": {
                "name": "Bermuda",
                "code": "BM",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/bm.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "BMD": {
                        "name": "Bermudian dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1441"
            },
            "CA": {
                "name": "Canada",
                "code": "CA",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/ca.png",
                "timezone": [
                    "UTC-08:00",
                    "UTC-07:00",
                    "UTC-06:00",
                    "UTC-05:00",
                    "UTC-04:00",
                    "UTC-03:30"
                ],
                "currency": {
                    "CAD": {
                        "name": "Canadian dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1"
            },
            "BS": {
                "name": "Bahamas",
                "code": "BS",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/bs.png",
                "timezone": [
                    "UTC-05:00"
                ],
                "currency": {
                    "BSD": {
                        "name": "Bahamian dollar",
                        "symbol": "$"
                    },
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1242"
            },
            "SV": {
                "name": "El Salvador",
                "code": "SV",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/sv.png",
                "timezone": [
                    "UTC-06:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+503"
            },
            "VN": {
                "name": "Vietnam",
                "code": "VN",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/vn.png",
                "timezone": [
                    "UTC+07:00"
                ],
                "currency": {
                    "VND": {
                        "name": "Vietnamese đồng",
                        "symbol": "₫"
                    }
                },
                "calling_code": "+84"
            },
            "MO": {
                "name": "Macau",
                "code": "MO",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/mo.png",
                "timezone": [
                    "UTC+08:00"
                ],
                "currency": {
                    "MOP": {
                        "name": "Macanese pataca",
                        "symbol": "P"
                    }
                },
                "calling_code": "+853"
            },
            "MH": {
                "name": "Marshall Islands",
                "code": "MH",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/mh.png",
                "timezone": [
                    "UTC+12:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+692"
            },
            "SB": {
                "name": "Solomon Islands",
                "code": "SB",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/sb.png",
                "timezone": [
                    "UTC+11:00"
                ],
                "currency": {
                    "SBD": {
                        "name": "Solomon Islands dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+677"
            },
            "ZM": {
                "name": "Zambia",
                "code": "ZM",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/zm.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "ZMW": {
                        "name": "Zambian kwacha",
                        "symbol": "ZK"
                    }
                },
                "calling_code": "+260"
            },
            "ER": {
                "name": "Eritrea",
                "code": "ER",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/er.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "ERN": {
                        "name": "Eritrean nakfa",
                        "symbol": "Nfk"
                    }
                },
                "calling_code": "+291"
            },
            "KH": {
                "name": "Cambodia",
                "code": "KH",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/kh.png",
                "timezone": [
                    "UTC+07:00"
                ],
                "currency": {
                    "KHR": {
                        "name": "Cambodian riel",
                        "symbol": "៛"
                    },
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+855"
            },
            "BE": {
                "name": "Belgium",
                "code": "BE",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/be.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+32"
            },
            "BR": {
                "name": "Brazil",
                "code": "BR",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/br.png",
                "timezone": [
                    "UTC-05:00",
                    "UTC-04:00",
                    "UTC-03:00",
                    "UTC-02:00"
                ],
                "currency": {
                    "BRL": {
                        "name": "Brazilian real",
                        "symbol": "R$"
                    }
                },
                "calling_code": "+55"
            },
            "GW": {
                "name": "Guinea-Bissau",
                "code": "GW",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/gw.png",
                "timezone": [
                    "UTC"
                ],
                "currency": {
                    "XOF": {
                        "name": "West African CFA franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+245"
            },
            "DK": {
                "name": "Denmark",
                "code": "DK",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/dk.png",
                "timezone": [
                    "UTC-04:00",
                    "UTC-03:00",
                    "UTC-01:00",
                    "UTC",
                    "UTC+01:00"
                ],
                "currency": {
                    "DKK": {
                        "name": "Danish krone",
                        "symbol": "kr"
                    }
                },
                "calling_code": "+45"
            },
            "ML": {
                "name": "Mali",
                "code": "ML",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/ml.png",
                "timezone": [
                    "UTC"
                ],
                "currency": {
                    "XOF": {
                        "name": "West African CFA franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+223"
            },
            "SS": {
                "name": "South Sudan",
                "code": "SS",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/ss.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "SSP": {
                        "name": "South Sudanese pound",
                        "symbol": "£"
                    }
                },
                "calling_code": "+211"
            },
            "BQ": {
                "name": "Caribbean Netherlands",
                "code": "BQ",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/bq.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+599"
            },
            "TD": {
                "name": "Chad",
                "code": "TD",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/td.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "XAF": {
                        "name": "Central African CFA franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+235"
            },
            "GL": {
                "name": "Greenland",
                "code": "GL",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/gl.png",
                "timezone": [
                    "UTC-04:00",
                    "UTC-03:00",
                    "UTC-01:00",
                    "UTC+00:00"
                ],
                "currency": {
                    "DKK": {
                        "name": "krone",
                        "symbol": "kr."
                    }
                },
                "calling_code": "+299"
            },
            "NO": {
                "name": "Norway",
                "code": "NO",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/no.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "NOK": {
                        "name": "Norwegian krone",
                        "symbol": "kr"
                    }
                },
                "calling_code": "+47"
            },
            "KZ": {
                "name": "Kazakhstan",
                "code": "KZ",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/kz.png",
                "timezone": [
                    "UTC+05:00",
                    "UTC+06:00"
                ],
                "currency": {
                    "KZT": {
                        "name": "Kazakhstani tenge",
                        "symbol": "₸"
                    }
                },
                "calling_code": "+76,7"
            },
            "PY": {
                "name": "Paraguay",
                "code": "PY",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/py.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "PYG": {
                        "name": "Paraguayan guaraní",
                        "symbol": "₲"
                    }
                },
                "calling_code": "+595"
            },
            "TK": {
                "name": "Tokelau",
                "code": "TK",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/tk.png",
                "timezone": [
                    "UTC+13:00"
                ],
                "currency": {
                    "NZD": {
                        "name": "New Zealand dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+690"
            },
            "MU": {
                "name": "Mauritius",
                "code": "MU",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/mu.png",
                "timezone": [
                    "UTC+04:00"
                ],
                "currency": {
                    "MUR": {
                        "name": "Mauritian rupee",
                        "symbol": "₨"
                    }
                },
                "calling_code": "+230"
            },
            "PL": {
                "name": "Poland",
                "code": "PL",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/pl.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "PLN": {
                        "name": "Polish złoty",
                        "symbol": "zł"
                    }
                },
                "calling_code": "+48"
            },
            "MD": {
                "name": "Moldova",
                "code": "MD",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/md.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "MDL": {
                        "name": "Moldovan leu",
                        "symbol": "L"
                    }
                },
                "calling_code": "+373"
            },
            "CN": {
                "name": "China",
                "code": "CN",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/cn.png",
                "timezone": [
                    "UTC+08:00"
                ],
                "currency": {
                    "CNY": {
                        "name": "Chinese yuan",
                        "symbol": "¥"
                    }
                },
                "calling_code": "+86"
            },
            "FJ": {
                "name": "Fiji",
                "code": "FJ",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/fj.png",
                "timezone": [
                    "UTC+12:00"
                ],
                "currency": {
                    "FJD": {
                        "name": "Fijian dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+679"
            },
            "GF": {
                "name": "French Guiana",
                "code": "GF",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/gf.png",
                "timezone": [
                    "UTC-03:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+594"
            },
            "ST": {
                "name": "São Tomé and Príncipe",
                "code": "ST",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/st.png",
                "timezone": [
                    "UTC"
                ],
                "currency": {
                    "STN": {
                        "name": "São Tomé and Príncipe dobra",
                        "symbol": "Db"
                    }
                },
                "calling_code": "+239"
            },
            "GS": {
                "name": "South Georgia",
                "code": "GS",
                "region": "Antarctic",
                "flags": "https://flagcdn.com/w320/gs.png",
                "timezone": [
                    "UTC-02:00"
                ],
                "currency": {
                    "SHP": {
                        "name": "Saint Helena pound",
                        "symbol": "£"
                    }
                },
                "calling_code": "+500"
            },
            "GY": {
                "name": "Guyana",
                "code": "GY",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/gy.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "GYD": {
                        "name": "Guyanese dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+592"
            },
            "SK": {
                "name": "Slovakia",
                "code": "SK",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/sk.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+421"
            },
            "RE": {
                "name": "Réunion",
                "code": "RE",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/re.png",
                "timezone": [
                    "UTC+04:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+262"
            },
            "BB": {
                "name": "Barbados",
                "code": "BB",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/bb.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "BBD": {
                        "name": "Barbadian dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1246"
            },
            "SE": {
                "name": "Sweden",
                "code": "SE",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/se.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "SEK": {
                        "name": "Swedish krona",
                        "symbol": "kr"
                    }
                },
                "calling_code": "+46"
            },
            "PN": {
                "name": "Pitcairn Islands",
                "code": "PN",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/pn.png",
                "timezone": [
                    "UTC-08:00"
                ],
                "currency": {
                    "NZD": {
                        "name": "New Zealand dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+64"
            },
            "SN": {
                "name": "Senegal",
                "code": "SN",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/sn.png",
                "timezone": [
                    "UTC"
                ],
                "currency": {
                    "XOF": {
                        "name": "West African CFA franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+221"
            },
            "SI": {
                "name": "Slovenia",
                "code": "SI",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/si.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+386"
            },
            "BH": {
                "name": "Bahrain",
                "code": "BH",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/bh.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "BHD": {
                        "name": "Bahraini dinar",
                        "symbol": ".د.ب"
                    }
                },
                "calling_code": "+973"
            },
            "SO": {
                "name": "Somalia",
                "code": "SO",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/so.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "SOS": {
                        "name": "Somali shilling",
                        "symbol": "Sh"
                    }
                },
                "calling_code": "+252"
            },
            "TO": {
                "name": "Tonga",
                "code": "TO",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/to.png",
                "timezone": [
                    "UTC+13:00"
                ],
                "currency": {
                    "TOP": {
                        "name": "Tongan paʻanga",
                        "symbol": "T$"
                    }
                },
                "calling_code": "+676"
            },
            "HK": {
                "name": "Hong Kong",
                "code": "HK",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/hk.png",
                "timezone": [
                    "UTC+08:00"
                ],
                "currency": {
                    "HKD": {
                        "name": "Hong Kong dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+852"
            },
            "BN": {
                "name": "Brunei",
                "code": "BN",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/bn.png",
                "timezone": [
                    "UTC+08:00"
                ],
                "currency": {
                    "BND": {
                        "name": "Brunei dollar",
                        "symbol": "$"
                    },
                    "SGD": {
                        "name": "Singapore dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+673"
            },
            "KN": {
                "name": "Saint Kitts and Nevis",
                "code": "KN",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/kn.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "XCD": {
                        "name": "Eastern Caribbean dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1869"
            },
            "MC": {
                "name": "Monaco",
                "code": "MC",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/mc.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+377"
            },
            "AL": {
                "name": "Albania",
                "code": "AL",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/al.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "ALL": {
                        "name": "Albanian lek",
                        "symbol": "L"
                    }
                },
                "calling_code": "+355"
            },
            "MW": {
                "name": "Malawi",
                "code": "MW",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/mw.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "MWK": {
                        "name": "Malawian kwacha",
                        "symbol": "MK"
                    }
                },
                "calling_code": "+265"
            },
            "YT": {
                "name": "Mayotte",
                "code": "YT",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/yt.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+262"
            },
            "FI": {
                "name": "Finland",
                "code": "FI",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/fi.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+358"
            },
            "AW": {
                "name": "Aruba",
                "code": "AW",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/aw.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "AWG": {
                        "name": "Aruban florin",
                        "symbol": "ƒ"
                    }
                },
                "calling_code": "+297"
            },
            "GR": {
                "name": "Greece",
                "code": "GR",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/gr.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+30"
            },
            "CF": {
                "name": "Central African Republic",
                "code": "CF",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/cf.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "XAF": {
                        "name": "Central African CFA franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+236"
            },
            "KE": {
                "name": "Kenya",
                "code": "KE",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/ke.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "KES": {
                        "name": "Kenyan shilling",
                        "symbol": "Sh"
                    }
                },
                "calling_code": "+254"
            },
            "NL": {
                "name": "Netherlands",
                "code": "NL",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/nl.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+31"
            },
            "TV": {
                "name": "Tuvalu",
                "code": "TV",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/tv.png",
                "timezone": [
                    "UTC+12:00"
                ],
                "currency": {
                    "AUD": {
                        "name": "Australian dollar",
                        "symbol": "$"
                    },
                    "TVD": {
                        "name": "Tuvaluan dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+688"
            },
            "CC": {
                "name": "Cocos (Keeling) Islands",
                "code": "CC",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/cc.png",
                "timezone": [
                    "UTC+06:30"
                ],
                "currency": {
                    "AUD": {
                        "name": "Australian dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+61"
            },
            "VE": {
                "name": "Venezuela",
                "code": "VE",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/ve.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "VES": {
                        "name": "Venezuelan bolívar soberano",
                        "symbol": "Bs.S."
                    }
                },
                "calling_code": "+58"
            },
            "AG": {
                "name": "Antigua and Barbuda",
                "code": "AG",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/ag.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "XCD": {
                        "name": "Eastern Caribbean dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1268"
            },
            "TG": {
                "name": "Togo",
                "code": "TG",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/tg.png",
                "timezone": [
                    "UTC"
                ],
                "currency": {
                    "XOF": {
                        "name": "West African CFA franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+228"
            },
            "GP": {
                "name": "Guadeloupe",
                "code": "GP",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/gp.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+590"
            },
            "NC": {
                "name": "New Caledonia",
                "code": "NC",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/nc.png",
                "timezone": [
                    "UTC+11:00"
                ],
                "currency": {
                    "XPF": {
                        "name": "CFP franc",
                        "symbol": "₣"
                    }
                },
                "calling_code": "+687"
            },
            "GI": {
                "name": "Gibraltar",
                "code": "GI",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/gi.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "GIP": {
                        "name": "Gibraltar pound",
                        "symbol": "£"
                    }
                },
                "calling_code": "+350"
            },
            "GD": {
                "name": "Grenada",
                "code": "GD",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/gd.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "XCD": {
                        "name": "Eastern Caribbean dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1473"
            },
            "VI": {
                "name": "United States Virgin Islands",
                "code": "VI",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/vi.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1340"
            },
            "US": {
                "name": "United States",
                "code": "US",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/us.png",
                "timezone": [
                    "UTC-12:00",
                    "UTC-11:00",
                    "UTC-10:00",
                    "UTC-09:00",
                    "UTC-08:00",
                    "UTC-07:00",
                    "UTC-06:00",
                    "UTC-05:00",
                    "UTC-04:00",
                    "UTC+10:00",
                    "UTC+12:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1201,202,203,205,206,207,208,209,210,212,213,214,215,216,217,218,219,220,224,225,227,228,229,231,234,239,240,248,251,252,253,254,256,260,262,267,269,270,272,274,276,281,283,301,302,303,304,305,307,308,309,310,312,313,314,315,316,317,318,319,320,321,323,325,327,330,331,334,336,337,339,346,347,351,352,360,361,364,380,385,386,401,402,404,405,406,407,408,409,410,412,413,414,415,417,419,423,424,425,430,432,434,435,440,442,443,447,458,463,464,469,470,475,478,479,480,484,501,502,503,504,505,507,508,509,510,512,513,515,516,517,518,520,530,531,534,539,540,541,551,559,561,562,563,564,567,570,571,573,574,575,580,585,586,601,602,603,605,606,607,608,609,610,612,614,615,616,617,618,619,620,623,626,628,629,630,631,636,641,646,650,651,657,660,661,662,667,669,678,681,682,701,702,703,704,706,707,708,712,713,714,715,716,717,718,719,720,724,725,727,730,731,732,734,737,740,743,747,754,757,760,762,763,765,769,770,772,773,774,775,779,781,785,786,801,802,803,804,805,806,808,810,812,813,814,815,816,817,818,828,830,831,832,843,845,847,848,850,854,856,857,858,859,860,862,863,864,865,870,872,878,901,903,904,906,907,908,909,910,912,913,914,915,916,917,918,919,920,925,928,929,930,931,934,936,937,938,940,941,947,949,951,952,954,956,959,970,971,972,973,975,978,979,980,984,985,989"
            },
            "BI": {
                "name": "Burundi",
                "code": "BI",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/bi.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "BIF": {
                        "name": "Burundian franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+257"
            },
            "MY": {
                "name": "Malaysia",
                "code": "MY",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/my.png",
                "timezone": [
                    "UTC+08:00"
                ],
                "currency": {
                    "MYR": {
                        "name": "Malaysian ringgit",
                        "symbol": "RM"
                    }
                },
                "calling_code": "+60"
            },
            "GM": {
                "name": "Gambia",
                "code": "GM",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/gm.png",
                "timezone": [
                    "UTC+00:00"
                ],
                "currency": {
                    "GMD": {
                        "name": "dalasi",
                        "symbol": "D"
                    }
                },
                "calling_code": "+220"
            },
            "GN": {
                "name": "Guinea",
                "code": "GN",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/gn.png",
                "timezone": [
                    "UTC"
                ],
                "currency": {
                    "GNF": {
                        "name": "Guinean franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+224"
            },
            "JM": {
                "name": "Jamaica",
                "code": "JM",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/jm.png",
                "timezone": [
                    "UTC-05:00"
                ],
                "currency": {
                    "JMD": {
                        "name": "Jamaican dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1876"
            },
            "AE": {
                "name": "United Arab Emirates",
                "code": "AE",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/ae.png",
                "timezone": [
                    "UTC+04:00"
                ],
                "currency": {
                    "AED": {
                        "name": "United Arab Emirates dirham",
                        "symbol": "د.إ"
                    }
                },
                "calling_code": "+971"
            },
            "JE": {
                "name": "Jersey",
                "code": "JE",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/je.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "GBP": {
                        "name": "British pound",
                        "symbol": "£"
                    },
                    "JEP": {
                        "name": "Jersey pound",
                        "symbol": "£"
                    }
                },
                "calling_code": "+44"
            },
            "GG": {
                "name": "Guernsey",
                "code": "GG",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/gg.png",
                "timezone": [
                    "UTC+00:00"
                ],
                "currency": {
                    "GBP": {
                        "name": "British pound",
                        "symbol": "£"
                    },
                    "GGP": {
                        "name": "Guernsey pound",
                        "symbol": "£"
                    }
                },
                "calling_code": "+44"
            },
            "VA": {
                "name": "Vatican City",
                "code": "VA",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/va.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+3906698,79"
            },
            "FR": {
                "name": "France",
                "code": "FR",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/fr.png",
                "timezone": [
                    "UTC-10:00",
                    "UTC-09:30",
                    "UTC-09:00",
                    "UTC-08:00",
                    "UTC-04:00",
                    "UTC-03:00",
                    "UTC+01:00",
                    "UTC+02:00",
                    "UTC+03:00",
                    "UTC+04:00",
                    "UTC+05:00",
                    "UTC+10:00",
                    "UTC+11:00",
                    "UTC+12:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+33"
            },
            "VG": {
                "name": "British Virgin Islands",
                "code": "VG",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/vg.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1284"
            },
            "CV": {
                "name": "Cape Verde",
                "code": "CV",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/cv.png",
                "timezone": [
                    "UTC-01:00"
                ],
                "currency": {
                    "CVE": {
                        "name": "Cape Verdean escudo",
                        "symbol": "Esc"
                    }
                },
                "calling_code": "+238"
            },
            "LT": {
                "name": "Lithuania",
                "code": "LT",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/lt.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+370"
            },
            "SY": {
                "name": "Syria",
                "code": "SY",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/sy.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "SYP": {
                        "name": "Syrian pound",
                        "symbol": "£"
                    }
                },
                "calling_code": "+963"
            },
            "MF": {
                "name": "Saint Martin",
                "code": "MF",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/mf.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+590"
            },
            "IN": {
                "name": "India",
                "code": "IN",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/in.png",
                "timezone": [
                    "UTC+05:30"
                ],
                "currency": {
                    "INR": {
                        "name": "Indian rupee",
                        "symbol": "₹"
                    }
                },
                "calling_code": "+91"
            },
            "CH": {
                "name": "Switzerland",
                "code": "CH",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/ch.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "CHF": {
                        "name": "Swiss franc",
                        "symbol": "Fr."
                    }
                },
                "calling_code": "+41"
            },
            "DJ": {
                "name": "Djibouti",
                "code": "DJ",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/dj.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "DJF": {
                        "name": "Djiboutian franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+253"
            },
            "AD": {
                "name": "Andorra",
                "code": "AD",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/ad.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+376"
            },
            "RS": {
                "name": "Serbia",
                "code": "RS",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/rs.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "RSD": {
                        "name": "Serbian dinar",
                        "symbol": "дин."
                    }
                },
                "calling_code": "+381"
            },
            "NA": {
                "name": "Namibia",
                "code": "NA",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/na.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "NAD": {
                        "name": "Namibian dollar",
                        "symbol": "$"
                    },
                    "ZAR": {
                        "name": "South African rand",
                        "symbol": "R"
                    }
                },
                "calling_code": "+264"
            },
            "JO": {
                "name": "Jordan",
                "code": "JO",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/jo.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "JOD": {
                        "name": "Jordanian dinar",
                        "symbol": "د.ا"
                    }
                },
                "calling_code": "+962"
            },
            "LU": {
                "name": "Luxembourg",
                "code": "LU",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/lu.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+352"
            },
            "SH": {
                "name": "Saint Helena, Ascension and Tristan da Cunha",
                "code": "SH",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/sh.png",
                "timezone": [
                    "UTC+00:00"
                ],
                "currency": {
                    "GBP": {
                        "name": "Pound sterling",
                        "symbol": "£"
                    },
                    "SHP": {
                        "name": "Saint Helena pound",
                        "symbol": "£"
                    }
                },
                "calling_code": "+290,47"
            },
            "KM": {
                "name": "Comoros",
                "code": "KM",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/km.png",
                "timezone": [
                    "UTC+03:00"
                ],
                "currency": {
                    "KMF": {
                        "name": "Comorian franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+269"
            },
            "PA": {
                "name": "Panama",
                "code": "PA",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/pa.png",
                "timezone": [
                    "UTC-05:00"
                ],
                "currency": {
                    "PAB": {
                        "name": "Panamanian balboa",
                        "symbol": "B/."
                    },
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+507"
            },
            "GQ": {
                "name": "Equatorial Guinea",
                "code": "GQ",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/gq.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "XAF": {
                        "name": "Central African CFA franc",
                        "symbol": "Fr"
                    }
                },
                "calling_code": "+240"
            },
            "GE": {
                "name": "Georgia",
                "code": "GE",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/ge.png",
                "timezone": [
                    "UTC+04:00"
                ],
                "currency": {
                    "GEL": {
                        "name": "lari",
                        "symbol": "₾"
                    }
                },
                "calling_code": "+995"
            },
            "HU": {
                "name": "Hungary",
                "code": "HU",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/hu.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "HUF": {
                        "name": "Hungarian forint",
                        "symbol": "Ft"
                    }
                },
                "calling_code": "+36"
            },
            "CZ": {
                "name": "Czechia",
                "code": "CZ",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/cz.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "CZK": {
                        "name": "Czech koruna",
                        "symbol": "Kč"
                    }
                },
                "calling_code": "+420"
            },
            "ME": {
                "name": "Montenegro",
                "code": "ME",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/me.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+382"
            },
            "SM": {
                "name": "San Marino",
                "code": "SM",
                "region": "Europe",
                "flags": "https://flagcdn.com/w320/sm.png",
                "timezone": [
                    "UTC+01:00"
                ],
                "currency": {
                    "EUR": {
                        "name": "Euro",
                        "symbol": "€"
                    }
                },
                "calling_code": "+378"
            },
            "KR": {
                "name": "South Korea",
                "code": "KR",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/kr.png",
                "timezone": [
                    "UTC+09:00"
                ],
                "currency": {
                    "KRW": {
                        "name": "South Korean won",
                        "symbol": "₩"
                    }
                },
                "calling_code": "+82"
            },
            "UY": {
                "name": "Uruguay",
                "code": "UY",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/uy.png",
                "timezone": [
                    "UTC-03:00"
                ],
                "currency": {
                    "UYU": {
                        "name": "Uruguayan peso",
                        "symbol": "$"
                    }
                },
                "calling_code": "+598"
            },
            "CO": {
                "name": "Colombia",
                "code": "CO",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/co.png",
                "timezone": [
                    "UTC-05:00"
                ],
                "currency": {
                    "COP": {
                        "name": "Colombian peso",
                        "symbol": "$"
                    }
                },
                "calling_code": "+57"
            },
            "AI": {
                "name": "Anguilla",
                "code": "AI",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/ai.png",
                "timezone": [
                    "UTC-04:00"
                ],
                "currency": {
                    "XCD": {
                        "name": "Eastern Caribbean dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1264"
            },
            "AS": {
                "name": "American Samoa",
                "code": "AS",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/as.png",
                "timezone": [
                    "UTC-11:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+1684"
            },
            "FM": {
                "name": "Micronesia",
                "code": "FM",
                "region": "Oceania",
                "flags": "https://flagcdn.com/w320/fm.png",
                "timezone": [
                    "UTC+10:00",
                    "UTC+11:00"
                ],
                "currency": {
                    "USD": {
                        "name": "United States dollar",
                        "symbol": "$"
                    }
                },
                "calling_code": "+691"
            },
            "LK": {
                "name": "Sri Lanka",
                "code": "LK",
                "region": "Asia",
                "flags": "https://flagcdn.com/w320/lk.png",
                "timezone": [
                    "UTC+05:30"
                ],
                "currency": {
                    "LKR": {
                        "name": "Sri Lankan rupee",
                        "symbol": "Rs  රු"
                    }
                },
                "calling_code": "+94"
            },
            "ZA": {
                "name": "South Africa",
                "code": "ZA",
                "region": "Africa",
                "flags": "https://flagcdn.com/w320/za.png",
                "timezone": [
                    "UTC+02:00"
                ],
                "currency": {
                    "ZAR": {
                        "name": "South African rand",
                        "symbol": "R"
                    }
                },
                "calling_code": "+27"
            },
            "NI": {
                "name": "Nicaragua",
                "code": "NI",
                "region": "Americas",
                "flags": "https://flagcdn.com/w320/ni.png",
                "timezone": [
                    "UTC-06:00"
                ],
                "currency": {
                    "NIO": {
                        "name": "Nicaraguan córdoba",
                        "symbol": "C$"
                    }
                },
                "calling_code": "+505"
            }
        }
            

        if(id){
            return data[id];
        }
        return data;
    }
}    



module.exports = StaticData;