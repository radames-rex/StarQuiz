(function () {
  'use strict';

  function ClockDrtv($rootScope) {
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
        vm.time = parseInt($scope.time);

        $scope.$on('timer-tick', function (event, args) {
          vm.progress = (vm.time - (args.millis/1000))*100/vm.time;
        });

        vm.finished = function() {
          $('.clock-time').hide();
          $('.clock-alert').show();
        };
      }
    };
  }

  ClockDrtv.$inject = ['$rootScope'];

  angular
    .module('StarQuizApp.components')
    .directive('clock', ClockDrtv);

})();
