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
    vm.closeModal = closeModal;
    vm.showAnswer = showAnswer;
    vm.closeResults = closeResults;
    vm.saveResult = saveResult;

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

    function _infoType(url) {
      if (url.indexOf('planets') > -1) return 'planet';
      else if (url.indexOf('films') > -1) return 'films';
      else if (url.indexOf('species') > -1) return 'species';
      else if (url.indexOf('vehicles') > -1) return 'vehicles';
    }

    function _getCharDetails(urlDetails, index) {
      GameService.getDetails(urlDetails).then(function(data) {
        vm.details = {};
        _.forEach(data,function(item) {
          switch (_infoType(item.url)){
            case 'planet' : {
              vm.details.planet = item.name;
              break;
            }
            case 'films' : {
              vm.details.films = vm.details.films || [];
              vm.details.films.push(item.title);
              break;
            }
            case 'species' : {
              vm.details.species = vm.details.species || [];
              vm.details.species.push(item.name);
              break;
            }
            case 'vehicles' : {
              vm.details.vehicles = vm.details.vehicles || [];
              vm.details.vehicles.push(item.name);
              break;
            }
            default: {
              break;
            }
          }
        });
        _showModal(index);
      });
    }

    function _showModal(index) {
      $('#item-'+index+' .modal').show();
    }

    function _showRanking() {
      vm.ranking = GameService.getRanking();
      $('#modal-ranking .modal').show();
    }

    function _formValidate() {
      if(vm.saveForm.$invalid) {
        toastr.error('Preencha os campos obrigatórios!', 'Erro!', {
          closeButton: true
        });
        return false;
      }
      return true;
    }

    function saveResult(total) {
      if (_formValidate()) {
        GameService.save({
          total: total,
          player: vm.player
        });
        _showRanking();
      }
    }

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

    function closeModal(index) {
      $('#item-'+index+' .modal').hide();
    }

    function closeResults() {
      $('#modal-results .modal').hide();
      _showRanking();
    }

    function tryName(name, realName, index) {
      var result = GameService.answerItem(name, realName);
      _showInputResult(result, index);
    }

    function showDetails(char, index) {
      GameService.detailItem(char.name);
      _getCharDetails([
        char.homeworld,
        char.films,
        char.species,
        char.vehicles
      ], index);
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
