(function() {
  'use strict';

  angular
    .module('StarQuizApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    // Configuração dos estados e rotas da aplicação
    $stateProvider
      .state('main', {
        url: '/start',
        templateUrl: 'app/modules/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm',
        permission: 'public'
      })
      .state('game', {
        url: '/game/{page}',
        templateUrl: 'app/modules/game/game.html',
        controller: 'GameCtrl',
        controllerAs: 'vm',
        permission: 'public'
      });

    $urlRouterProvider.otherwise('/start');
  }

})();
