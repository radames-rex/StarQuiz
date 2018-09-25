
(function() {
	'use strict';

	/*
   * Controller para inicializar o jogo
   */
  var MainCtrl = function($scope, GameService) {
    GameService.cleanCookies();
  };

  MainCtrl.$inject = ['$scope', 'GameService'];

  angular
    .module('StarQuizApp.main')
    .controller('MainCtrl', MainCtrl);
})();
