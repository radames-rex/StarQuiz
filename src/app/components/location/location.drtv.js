'use strict';

(function () {

  function LocationDrtv($rootScope, $timeout, Spin) {
    return {
      'restrict'     : 'AE',
      'templateUrl'  : 'app/components/location/location.html',
      'transclude'   : true,
      'scope'        : {
        'order'  : '@order',
        'data'   : '=data',
        'mobile' : '=mobile',
        'cache'  : '=cache'
      },
      'controllerAs' : 'vm',
      'controller'   : function ($scope) {
        var vm;

        vm = this;

        $timeout(function() {
          if (!$scope.cache) Spin.start($('.card-'+$scope.order+' .card-content'), true);
        });
      }
    };
  }

  LocationDrtv.$inject = ['$rootScope', '$timeout', 'Spin'];

  angular
    .module('StarQuizApp.components')
    .directive('location', LocationDrtv);

})();
