(function() {
  'use strict';

  angular
    .module('StarQuizApp')
    .run(mainRunBlock);

  /** @ngInject */
  function mainRunBlock($state, $rootScope) {

    /*
     * Função armazenar o nome da rota.
     */
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        $rootScope.state = toState.name;
        if (toState.name === 'main') $rootScope.lastTime = '';
      });
  }

})();
