'use strict';

(function() {

  var GameCtrl = function($scope, $interval, $timeout, GameService, $cookies, Spin, $window) {
    var vm = this;

    vm.ct = [0,1,2,3,4,5,6,7];
  	// ID respectivos => Nuuk, Urubici, Nairobi
    var citiesIDs = ['3421319','3445709','184745'];

    vm.weather = [];

    // Verifica se as dimensões da tela são mobile ou desktop
    vm.thisIsMobileScreen = $window.innerWidth <= 640;

    // Recall de 10 em 10 minutos
    $interval(function() {
      init();
    }, 601000);

    // Para testes
    vm.colorWeather = colorWeather;
    vm.init = init;
    vm.hasCache = false;

    // Define as cores de acordo com a temperatura
    function colorWeather(temp) {
      var color = '';
      if (temp <= 5) color = 'weather-cold';
      else if (temp <= 25) color = 'weather-normal';
      else color = 'weather-hot';
      return color;
    }

  	// INIT
    init();

    function init() {
      vm.weather = [];
      var weatherFromCache = $cookies.getObject('weather'); // Verifica o cache
      if (weatherFromCache) {
        vm.hasCache = true;
        vm.weather = weatherFromCache;
      } else {
        vm.hasCache = false;
        _.forEach(citiesIDs, function(ID, key) {
          GameService.getWeather(ID).then(function(response) {
            if (response.data) {
              var location = response.data;
              vm.weather.push({
                locale    : location.name+', '+location.sys.country,
                temp      : Math.ceil(location.main.temp)+'º',
                humidity  : Math.ceil(location.main.humidity),
                pressure  : Math.ceil(location.main.pressure),
                updatedAt : moment(new Date()).format('HH:mm:ss A'),
                tempColor : colorWeather(location.main.temp)
              });
            }
            Spin.stop($('.card-'+key+' .card-content'), true);
            var expireDate = new Date(Date.now() + 600000);
            $cookies.putObject('weather', vm.weather, {'expires': expireDate}); // Armazena dados no cache
          });
        });
      }
    }
  };

  GameCtrl.$inject = ['$scope', '$interval', '$timeout', 'GameService', '$cookies', 'Spin', '$window'];

  angular
    .module('StarQuizApp.game')
    .controller('GameCtrl', GameCtrl);
})();
