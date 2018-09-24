(function() {
  'use strict';

  angular
    .module('StarQuizApp', [
      'ngCookies',
      'ngAria',
      'ui.router',
      'pascalprecht.translate',
      'ne.swapi',

      'StarQuizApp.components',
      'StarQuizApp.filters',
      'StarQuizApp.helpers',

      'StarQuizApp.main',
      'StarQuizApp.game'
    ]);
})();
