'use strict';

(function() {

  var GameService = function($http, $log, ENV) {

    /*
     * Faz a requisição para a API do tempo traz informações climáticas de determinada cidade (by ID).
     */
    this.getWeather = function(IDs) {
      return $http({
        method: 'GET',
        url: ENV.API.URL + ENV.API.VERSION + 'weather?id='+IDs+'&APPID='+ENV.API.KEY+'&units=metric',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    };
  };

  GameService.$inject = ['$http', '$log', 'ENV'];

  angular
    .module('StarQuizApp.game')
    .service('GameService', GameService);
})();
