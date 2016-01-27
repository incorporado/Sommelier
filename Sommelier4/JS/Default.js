/*Monedas validas*/
FastInit.addOnLoad(-1000, function () {
    GCurrency = new Currency('ARS', {
        'ARS': {
            code: 'ARS',
            name: 'Argentina Pesos',
            symbol: '$',
            format: '${0}',
            rate: 14.8161
        },
        'EUR': {
            code: 'EUR',
            name: 'Euro',
            symbol: '€',
            format: '€{0}',
            rate: 1
        },
        'USD': {
            code: 'USD',
            name: 'Dólar estadounidense',
            symbol: '$',
            format: '${0}',
            rate: 1.0861
        }
    });
    GCurrency.notify();
});

var ClientIDs = {};
var isUs = 'False';

/* Agrego las ciudades de Origen, para la demo solamente Buenos Aires es válida.*/
FastInit.addOnLoad(function () {
    var model = {
        "Origins": [{
            "Code": "AR",
            "Name": "Argentina",
            "Cities": [{
                "Code": "BUE",
                "Name": "Buenos Aires"
            }, {
                "Code": "COR",
                "Name": "Córdoba"
            }, {
                "Code": "IGR",
                "Name": "Puerto Iguazú"
            }, {
                "Code": "BRC",
                "Name": "Bariloche"
            }]            
        }, {
            "Code": "US",
            "Name": "Estados Unidos",
            "Cities": [{
                "Code": "BOS",
                "Name": "Boston"
            }, {
                "Code": "CHI",
                "Name": "Chicago"
            }, {
                "Code": "LAX",
                "Name": "Los Ángeles"
            }, {
                "Code": "NYC",
                "Name": "Nueva York"
            }, {
                "Code": "SFO",
                "Name": "San Francisco"
            }, {
                "Code": "WAS",
                "Name": "Washington DC"
            }]
        }],
        "Origin": "BUE",
        "View": "interest",
        "DefaultPreferenceValues": {
            "Origin": "BUE",
            "Interest": [],
            "Continent": [],
            "Month": 0,
            "Budget": 0.0,
            "AdultCount": 1,
            "ChildAges": [],
            "Sorting": null
        },
        "DefaultResultSorting": "match"
    };
    var tripFinder = new ControlTripFinder(jQuery('.mui-tf-prefs'), model);
});

var $mm = mm = {
    pathPrefix: '',
    imagePath: 'http://cdn1.momondo.net/i-3',
    nsImagePath: 'http://cdn1.momondo.net/ns-21',
    logoPath: 'http://cdn1.momondo.net/logos',
    isTestServer: false,
    membershipEnabled: true,
    'CDN': {
        assetsBaseUrl: 'http://cdn2.momondo.net/a-8',
        staticBaseUrl: 'http://cdn1.momondo.net/s-1',
        imageBaseUrl: 'http://cdn1.momondo.net/i-3',
        nonStaticBaseUrl: 'http://cdn1.momondo.net/ns-21',
        logoBaseUrl: 'http://cdn1.momondo.net/logos'
    }
};
var whitelabel = false,
    currentLanguage = 'es',
    currentCulture = 'es-ES',
    ipCountry = 'AR',
    isAnonymous = true,
    isAdministrator = false,
    userId = 2101,
    userName = 'monica',
    userUrl = '/members/anonymous/',
    userImageUrl = '/cfs-file.ashx/__key/CommunityServer.Components.Avatars/00.00.00.21.01/4TIIW4XR15XQ.png',
    userFacebookId = '',
    facebookApId = '172438103764',
    showads = true;
var MomondoInfo = {
    'CultureInfo': {
        'CurrentCulture': {
            'Code': 'es-ES',
            'CoverCountry': true,
            'numberFormat': {
                'decimalSeparator': ",",
                'groupSeparator': "."
            },
            'dateTimeFormat': {
                'FirstDayOfWeek': 1,
                'DayNames': ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
                'ShortestDayNames': ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
                'MonthNames': ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre", ""],
                'MonthNamesGenitive': ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre", ""],
                'AbbreviatedMonthNames': ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic", ""]
            },
            LongDatePattern: "dddd, dd\u0027 de \u0027MMMM\u0027 de \u0027yyyy",
            ShortDatePattern: "dd/MM/yyyy"
        }
    },
    'SpeedFaresKey': '',
    'PageUrls': {
        'Membership': '/-vNext-/Modules/Momondo.Membership/Membership.aspx/'
    }
};
var MomondoStyles = ['global.font.1252.less', 'global.cms.less', 'global.body.v8.less', 'global.button.less', 'global.flags.less', 'global.inputs.v8.less', 'global.momicons.less', 'global.popup.less', 'global.blobshow.less', 'jquery.nanoscroller.css', 'global.header.less', 'control.tripfinder.less', 'control.goexplore.resultbox.less', 'control.goexplore.otherdestinations.less', 'section.front.tripfinder.teaser.less', 'global.footer.less', 'tod_email_signup.css', 'global.popup.newsletter.less'];
var MomondoScripts = ['fastinit.js', 'common.js', 'Cookies.js', 'controls/dialog.js', '/LoaderWS.asmx/js', 'controls/currency.js', '/MomondoTrackingWS.asmx/js', 'FixWS.js', 'CommonBottom.js'];
if (typeof Language != 'object') Language = {};
Language['AlertDialog_Alert'] = 'Alerta';
Language['AlertDialog_Confirm'] = 'Confirmar';
Language['AlertDialog_Okay'] = 'OK';
Language['AlertDialog_Cancel'] = 'Cancelar';
Language['AlertDialog_Information'] = 'Información';
Language['CityGuide_Category_sleep'] = 'Dormir';
Language['CityGuide_Category_eat'] = 'Comer & beber';
Language['CityGuide_Category_see'] = 'Ver & hacer';
Language['CityGuide_Category_shop'] = 'Comprar';
Language['CityGuide_Category_night'] = 'Por la noche';
Language['CityGuide_Category_coffee'] = 'Café';
Language['CityGuide_Category_transport'] = 'Información';
Language['CityGuide_Category_culture'] = 'Cultura';
Language['Tod_MapItems_Stars'] = '{0} estrellas';
Language['MapItem_Loading'] = 'Cargando información - por favor espere...';
Language['RelativeDate_DaysAgo'] = 'hace{0} días';
Language['RelativeDate_DayAgo'] = 'hace 1 día';
Language['RelativeDate_HoursAgo'] = 'hace {0} horas';
Language['RelativeDate_HourAgo'] = 'hace 1 hora';
Language['RelativeDate_MinutesAgo'] = 'hace {0} minutos';
Language['RelativeDate_MinuteAgo'] = 'hace 1 minuto';
Language['RelativeDate_MomentsAgo'] = 'hace unos segundos';
Language['general_close'] = 'cerrar';
Language['General.Location.Country'] = 'País';
Language['toolbar_language'] = 'Idioma';
Language['toolbar_currency'] = 'Moneda';
Language['toolbar_login'] = 'Conectarse';
Language['User_JS_Cancel'] = 'Cancelar';
Language['General.Cancel'] = 'Cancelar';
Language['General.OK'] = 'OK';
Language['General.Adults'] = 'Adultos';
Language['General.Children'] = 'Niños';
Language['General.Pax.ChildAge'] = 'Niño {0} edad';
Language['General.Flight.ChildrenInputLabel'] = 'Niños';
Language['General.Pax.AgeOfChild'] = 'Edad del niño {0}';
Language['General.Pax.Passenger.zero'] = '{0} Pasajeros';
Language['General.Pax.Passenger.one'] = '{0} Pasajero';
Language['General.Pax.Passenger.two'] = '{0} Pasajeros';
Language['General.Pax.Passenger.few'] = '{0} Pasajeros';
Language['General.Pax.Passenger.many'] = '{0} Pasajeros';
Language['General.Pax.Passenger.other'] = '{0} Pasajeros';
Language['general_inspirational'] = 'Trip Finder';
Language['Inspirational.Header.Tagline'] = 'Discover new and exciting destinations';
Language['Inspirational.Results.FlightsTo'] = 'Vuelos baratos a';
Language['Inspirational.Results.PriceFrom'] = 'Desde';
Language['Inspirational.Results.Perfect.Title'] = 'Destinations that match your search';
Language['Inspirational.Results.NoPerfect.Title'] = 'You seem to be looking for a place we haven’t discovered yet...';
Language['Inspirational.Results.NoPerfect.SubTitle'] = 'Try tweaking your search criteria.';
Language['Inspirational.Results.Suggested.Title'] = 'Hey! Look at these other great destinations we’ve found...';
Language['Inspirational.Results.Suggested.SubTitle'] = 'They don’t match all your criteria, but they’re pretty cool';
Language['Inspirational.Results.Summary.1'] = 'Awesome <br> destination';
Language['Inspirational.Results.Summary.X'] = 'Awesome <br> destinations';
Language['Inspirational.Results.Summary.NoMatches.Title'] = 'No matching results';
Language['Inspirational.Results.Summary.NoMatches.SubTitle'] = 'View everything?';
Language['Inspirational.Results.Sorting.ShowMore'] = 'Show more suggestions';
Language['Inspirational.Result.WeatherTag.Wet.1'] = '{0} can be soaking wet';
Language['Inspirational.Result.WeatherTag.Wet.2'] = '{0} and {1} can be soaking wet ';
Language['Inspirational.Result.WeatherTag.Wet.3'] = '{0}, {1} & {2} can be soaking wet';
Language['Inspirational.Result.WeatherTag.Hot.1'] = '{0} can be scorching hot ';
Language['Inspirational.Result.WeatherTag.Hot.2'] = '{0} and {1} can be scorching hot ';
Language['Inspirational.Result.WeatherTag.Hot.3'] = '{0}, {1} & {2} can be scorching hot ';
Language['Inspirational.Result.WeatherTag.Snow.1'] = 'Usually loads of snow in {0}';
Language['Inspirational.Result.WeatherTag.Snow.2'] = 'Usually loads of snow in {0} & {1}';
Language['Inspirational.Result.WeatherTag.Snow.3'] = 'Usually loads of snow in {0}, {1} & {2}';
Language['Inspirational.Result.WeatherTag.Cold.1'] = '{0} is usually freezing cold';
Language['Inspirational.Result.WeatherTag.Cold.2'] = '{0} & {1} are usually freezing cold';
Language['Inspirational.Result.WeatherTag.Cold.3'] = '{0}, {1} & {2} are usually freezing cold';
Language['Inspirational.Result.WeatherTag.Fog.1'] = '{0} tends to be quite foggy';
Language['Inspirational.Result.WeatherTag.Fog.2'] = '{0} & {1} tend to be quite foggy';
Language['Inspirational.Result.WeatherTag.Fog.3'] = '{0}, {1} & {2} tend to be quite foggy';
Language['Inspirational.Result.WeatherTag.Month.Warmest'] = 'Warmest in {0} (up to {1}°C)';
Language['Inspirational.Result.WeatherTag.Average'] = 'Average {0}°C - {1}°C';
Language['Inspirational.Result.WeatherTag.Possibly.Rain'] = 'Chance of heavy rain in {0}';
Language['Inspirational.Result.WeatherTag.Possibly.Hot'] = '{0} can be scorching hot';
Language['Inspirational.Result.WeatherTag.Possibly.Snow'] = 'Usually loads of snow in {0}';
Language['Inspirational.Result.WeatherTag.Possibly.Cold'] = '{0} can get really cold';
Language['Inspirational.Result.WeatherTag.Possibly.Fog'] = '{0} can get really foggy';
Language['Inspirational.Header.Children'] = 'niños';
Language['Inspirational.Header.Child'] = 'niño';
Language['Inspirational.Header.Aldults'] = 'adultos';
Language['Inspirational.Header.Aldult'] = 'adulto';
Language['Inspirational.Header.PricePerPerson'] = 'por persona';
Language['Inspirational.Results.Price.InMonth'] = 'in {0}';
Language['Inspirational.Result.WeatherTag.Average.fahrenheit'] = 'Average {0}°F - {1}°F';
Language['Inspirational.Result.WeatherTag.Month.Warmest.fahrenheit'] = 'Warmest in {0} (up to {1}°F)';
Language['General.Month.1'] = 'Enero';
Language['General.Month.2'] = 'Febrero';
Language['General.Month.3'] = 'Marzo';
Language['General.Month.4'] = 'Abril';
Language['General.Month.5'] = 'Mayo';
Language['General.Month.6'] = 'Junio';
Language['General.Month.7'] = 'Julio';
Language['General.Month.8'] = 'Agosto';
Language['General.Month.9'] = 'Septiembre';
Language['General.Month.10'] = 'Octubre';
Language['General.Month.11'] = 'Noviembre';
Language['General.Month.12'] = 'Diciembre';
Language['Inspirational.Result.WeatherTag.Snow.Ski.MostSnow'] = 'Most snow in {0}';
Language['Inspirational.Result.WeatherTag.Snow.Ski.MostSnow.InMonth'] = '{0} snowdays in {1}';
Language['Inspirational.Result.Season'] = 'Temporada: {0} - {1}';
addScriptToDOM.defer('//cdn2.momondo.net/js-5/c/js/js_65c37468_min_11.3.0.129.js');
