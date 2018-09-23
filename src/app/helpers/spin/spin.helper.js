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

    function _validate(length) {
      if (length === 1) {
        return true;
      } else if (length > 1) {
        $log.error('SpinService takes only one element as parameter.');
      }
    }

    function _setContainerRelative(container) {
      container.css('position', 'relative');
    }

    function start(element, loader, opt) {
      var spinner;
      var length = element.length;
      var bgSpin = $('<div>').addClass('bg_spin');

      if (loader) {
        element.addClass('loader');
      } else {      
        if (opt) {
          spinner = new Spinner(opt).spin();
        } else {
          spinner = new Spinner().spin();
        }

        if (_validate(length)) {
          if (element.jquery) {

            if (opt) {
              _setContainerRelative(element);
            }

            element.prepend(bgSpin).prepend(spinner.el);
          } else {

            if (opt) {
              _setContainerRelative(element);
            }

            $(element).prepend(spinner.el);
          }
        }
      }
    }

    function stop(element, loader) {
      var length = element.length;

      if (_validate(length)) {
        if (loader) {
          element.removeClass('loader');
          element.find('.bg_spin').remove();
        } else {
          if (element.jquery) {
            element.removeAttr('us-spinner');
            element.find('.spinner').remove();
            element.find('.bg_spin').remove();
          } else {
            $(element).removeAttr('us-spinner');
            $(element).find('.spinner').remove();
            $(element).find('.bg_spin').remove();
          }
        }
      }
    }
  }
})();
