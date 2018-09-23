// var mock = require('./main.mock.js');
var mock = function(key) {
   var Nuuk = {
      "coord":{
         "lon":-51.72,
         "lat":64.18
      },
      "weather":[
         {
            "id":803,
            "main":"Clouds",
            "description":"broken clouds",
            "icon":"04d"
         }
      ],
      "base":"stations",
      "main":{
         "temp":2,
         "pressure":994,
         "humidity":59,
         "temp_min":2,
         "temp_max":2
      },
      "visibility":10000,
      "wind":{
         "speed":1.5,
         "deg":350
      },
      "clouds":{
         "all":75
      },
      "dt":1527000600,
      "sys":{
         "type":1,
         "id":4801,
         "message":0.0274,
         "country":"GL",
         "sunrise":1526968062,
         "sunset":1527037321
      },
      "id":3421319,
      "name":"Nuuk",
      "cod":200
   };
   var Urubici = {
      "coord":{
         "lon":-49.59,
         "lat":-28.02
      },
      "weather":[
         {
            "id":800,
            "main":"Clear",
            "description":"clear sky",
            "icon":"01d"
         }
      ],
      "base":"stations",
      "main":{
         "temp":13.53,
         "pressure":889.06,
         "humidity":67,
         "temp_min":13.53,
         "temp_max":13.53,
         "sea_level":1032.15,
         "grnd_level":889.06
      },
      "wind":{
         "speed":0.96,
         "deg":285.006
      },
      "clouds":{
         "all":0
      },
      "dt":1527005186,
      "sys":{
         "message":0.0027,
         "country":"BR",
         "sunrise":1526983019,
         "sunset":1527021180
      },
      "id":3445709,
      "name":"Urubici",
      "cod":200
   };
   var Nairobi = {
      "coord":{
         "lon":36.82,
         "lat":-1.28
      },
      "weather":[
         {
            "id":803,
            "main":"Clouds",
            "description":"broken clouds",
            "icon":"04d"
         }
      ],
      "base":"stations",
      "main":{
         "temp":18,
         "pressure":1022,
         "humidity":88,
         "temp_min":18,
         "temp_max":18
      },
      "visibility":10000,
      "wind":{
         "speed":2.1
      },
      "clouds":{
         "all":75
      },
      "dt":1527003000,
      "sys":{
         "type":1,
         "id":6409,
         "message":0.003,
         "country":"KE",
         "sunrise":1526959666,
         "sunset":1527003065
      },
      "id":184745,
      "name":"Nairobi",
      "cod":200
   };
   var city = [Nuuk, Urubici, Nairobi]
   return city[key];
}

describe("Dashboard Controller -> ", function() {
  var vm, $httpBackend;

  beforeEach(function(){
    angular.mock.module("StarQuizApp");
         
    angular.mock.inject(function($controller, $rootScope, $injector) {
        $scope = $rootScope.$new();

        $httpBackend = $injector.get('$httpBackend');
             
        vm = $controller("DashboardCtrl", {
            $scope : $scope
        });

        $httpBackend.when('GET', 'app/translate/messages-en-US.json')
          .respond(200, {});
        $httpBackend.when('GET', 'https://api.openweathermap.org/data/2.5/weather?id=3421319&APPID=8f2a9859cbabe29d7885e49eb2398e6b&units=metric')
          .respond(200, mock(0));
        $httpBackend.when('GET', 'https://api.openweathermap.org/data/2.5/weather?id=3445709&APPID=8f2a9859cbabe29d7885e49eb2398e6b&units=metric')
          .respond(200, mock(1));
        $httpBackend.when('GET', 'https://api.openweathermap.org/data/2.5/weather?id=184745&APPID=8f2a9859cbabe29d7885e49eb2398e6b&units=metric')
          .respond(200, mock(2));
    });
	});

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

	it("should start weathers empty", function() {
    expect(vm.weather.length).toEqual(0);
    $httpBackend.flush();
  });

  it("color weather should give correct color", function() {
  	var cold = vm.colorWeather(0);
		var normal = vm.colorWeather(12);
		var hot = vm.colorWeather(38);
    expect(cold).toEqual('weather-cold');
    expect(normal).toEqual('weather-normal');
    expect(hot).toEqual('weather-hot');
    $httpBackend.flush();
  });

  it("should if it does not have cached data it makes requests to the time API", function() {
    vm.init();
    console.log(vm.weather);
    expect(vm.weather.length).not.toEqual(0);
    $httpBackend.flush();
  });

  it("should if you have cached data it displays", function() {
    vm.init();
    console.log(vm.weather);
    expect(vm.weather.length).not.toEqual(0);
    $httpBackend.flush();
  });

  it("should update the data every 10 minutes", function() {
    //TODO
    $httpBackend.flush();
  });
});
