'use strict';

(function() {

  var GameService = function($http, $log, ENV, $q, swapi) {

    /*
     * Faz a requisição para a API do tempo traz informações climáticas de determinada cidade (by ID).
     */
    this.getChars = function(page) {
      var promises = [];

      for (var i = 1; i <= ENV.PAGESIZE; i++) {
        promises.push(swapi.people.id(i));
      };

      return $q.all(promises);
    };

    /*
     * Faz a requisição para a API do tempo traz informações climáticas de determinada cidade (by ID).
     */
    this.getPictures = function() {
      // var promises = [];

      // for (var i = 1; i <= ENV.PAGESIZE; i++) {
      //   promises.push(swapi.people.id(i));
      // };

      // return $q.all(promises);
      return $http({
        url: 'https://www.google.com.br/search?q=luke+skywalker&source=lnms&sa=X&ved=0ahUKEwj50b6Jw9LdAhVFDJAKHW-pAHEQ_AUICSgA&biw=1366&bih=689&dpr=1',
        method: 'GET',
        headers: {
          'Content-Type': 'text/html'
        }
      });
    };
  };

  GameService.$inject = ['$http', '$log', 'ENV', '$q', 'swapi'];

  angular
    .module('StarQuizApp.game')
    .service('GameService', GameService);
})();
