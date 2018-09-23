(function() {
  'use strict';

  angular
    .module('StarQuizApp')
    .constant('ENV', {
      API: {
        URL : 'https://api.openweathermap.org/',
        VERSION: 'data/2.5/',
        KEY : '8f2a9859cbabe29d7885e49eb2398e6b'
      }
    });
})();
