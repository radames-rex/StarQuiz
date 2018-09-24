(function() {
  'use strict';

  angular
    .module('StarQuizApp.helpers')
    .factory('Spin', Spin);

  /** @ngInject */
  function Spin($log) {
    var factory = {
      start: start,
      stop: stop
    };
    return factory;

    /*
     * Inicia o loader.
     */
    function start(element, loader, opt) {
      var spinner;
      var bgSpin = $('<div>').addClass('bg_spin');

      spinner = new Spinner().spin();
      element.prepend(bgSpin).prepend(spinner.el);
    }

    /*
     * Para o loader.
     */
    function stop(element) {
      element.removeAttr('us-spinner');
      element.find('.spinner').remove();
    }
  }
})();
