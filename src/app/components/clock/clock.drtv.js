(function () {
  'use strict';

  function ClockDrtv($rootScope, GameService) {
    return {
      'restrict'     : 'AE',
      'templateUrl'  : 'app/components/clock/clock.html',
      'replace'      : true,
      'scope'        : {
        'time'  : '@time'
      },
      'controllerAs' : 'vm',
      'controller'   : function ($scope) {
        var vm;

        vm = this;

        vm.progress = 0;
        vm.start = $rootScope.lastTime;
        vm.time = parseInt($scope.time);

        $scope.$on('timer-tick', function (event, args) {
          vm.progress = (vm.time - (args.millis/1000))*100/vm.time;
          $rootScope.lastTime = (args.millis/1000);
        });

        vm.finished = function() {
          $('.clock-time').hide();
          $('.clock-alert').show();
          $rootScope.total = GameService.showResults();
          $('#modal-results .modal').show();
        };
      }
    };
  }

  ClockDrtv.$inject = ['$rootScope', 'GameService'];

  angular
    .module('StarQuizApp.components')
    .directive('clock', ClockDrtv);

})();
