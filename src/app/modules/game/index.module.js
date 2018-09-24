(function() {
  'use strict';

	angular
	  .module('StarQuizApp.game', [])
	  .config(routes);

	  function routes($stateProvider) {
	    // Configuração dos estados e rotas da aplicação
	  	$stateProvider
		    .state('game', {
		      url: '/game/{page}',
		      templateUrl: 'app/modules/game/game.html',
		      controller: 'GameCtrl',
		      controllerAs: 'vm',
		      permission: 'public'
		    });
	  }

})();