(function() {
  'use strict';

  angular
    .module('StarQuizApp')
    .constant('ENV', {
      API: {
        URL : 'https://swapi.co/api/'
      },
      PAGESIZE: 8
    });
})();
