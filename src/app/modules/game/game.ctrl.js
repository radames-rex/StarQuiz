'use strict';

(function() {

  var GameCtrl = function($scope, $interval, $timeout, GameService, $cookies, $stateParams) {
    var vm = this;

    vm.currentPage = $stateParams.page;

    // A API não informa a quantidade de personagens | workaround para paginar
    vm.next = vm.currentPage < 11 ? parseInt(vm.currentPage) + 1 : vm.currentPage;
    vm.previous = vm.currentPage > 1 ? parseInt(vm.currentPage) - 1 : vm.currentPage;
    vm.chars = [];

    vm.getUrlId = getUrlId;
    vm.showInput = showInput;
    vm.hideInput = hideInput;
    vm.tryName = tryName;
    vm.showDetails = showDetails;
    vm.showAnswer = showAnswer;

    function getUrlId(url) {
      return url.replace('https://swapi.co/api/people/', '').replace('/','');
    }

    function showInput(index) {
      vm.name = '';
      $('.chars-options .options').show();
      $('.chars-options .inputs').hide();
      $('#item-'+index+' .options').hide();
      $('#item-'+index+' .inputs').show();
      $('#item-'+index+' .inputs input').focus();
    }

    function hideInput(index) {
      $('#item-'+index+' .inputs').hide();
      $('#item-'+index+' .options').show();
    }

    function _showInputResult(result, index) {
      if (result) {
        $('#item-'+index+' .inputs').hide();
        $('#item-'+index+' .correct').show();
      } else {
        $('#item-'+index+' figure img').css('filter','grayscale(1)');
        $('#item-'+index+' .inputs').hide();
        $('#item-'+index+' .incorrect').show();
      }
    }

    function tryName(name, realName, index) {
      var result = GameService.answerItem(name, realName);
      _showInputResult(result, index);
    }

    function showDetails(name, index) {
      GameService.detailItem(name);
      // _showModal();
    }

    function showAnswer(name, answer) {
      var status = GameService.getItemStatus(name);
      if (answer === 'correct') return !(status === 10 || status == 5);
      if (answer === 'wrong') return !(status === 0);
      if (!answer) return !(status === -1);
    }

  	// INIT
    init();

    function init() {
      vm.chars = [];
      GameService.getChars(vm.currentPage).then(function(data) {
        vm.chars = data;
      });
    }
  };

  GameCtrl.$inject = ['$scope', '$interval', '$timeout', 'GameService', '$cookies', '$stateParams'];

  angular
    .module('StarQuizApp.game')
    .controller('GameCtrl', GameCtrl);
})();
