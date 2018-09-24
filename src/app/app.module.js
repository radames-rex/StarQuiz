(function() {
  'use strict';

  angular
    .module('StarQuizApp', [
      'ngCookies',
      'ngAria',
      'ui.router',
      'pascalprecht.translate',
      'ne.swapi',
      'angular-svg-round-progressbar',
      'timer',
      'ngAnimate',
      'toastr',

      'StarQuizApp.components',
      'StarQuizApp.helpers',

      'StarQuizApp.main',
      'StarQuizApp.game'
    ]);
})();
