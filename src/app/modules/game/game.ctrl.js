(function() {
  'use strict';

  var GameCtrl = function($scope, $interval, $timeout, GameService, $cookies, $stateParams, Spin, toastr) {
    var vm = this;

    vm.currentPage = $stateParams.page;

    // A API não informa a quantidade de personagens | workaround para paginar
    vm.next = vm.currentPage < 11 ? parseInt(vm.currentPage) + 1 : vm.currentPage;
    vm.previous = vm.currentPage > 1 ? parseInt(vm.currentPage) - 1 : vm.currentPage;
    vm.chars = [];

    vm.getUrlId     = getUrlId;
    vm.showInput    = showInput;
    vm.hideInput    = hideInput;
    vm.tryName      = tryName;
    vm.showDetails  = showDetails;
    vm.closeModal   = closeModal;
    vm.showAnswer   = showAnswer;
    vm.closeResults = closeResults;
    vm.saveResult   = saveResult;

    /*
     * Função privada para exibir o campo de entrada do nome do personagem.
     */
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

    /*
     * Função privada verificar o tipo de url.
     */
    function _infoType(url) {
      if (url.indexOf('planets') > -1) return 'planet';
      else if (url.indexOf('films') > -1) return 'films';
      else if (url.indexOf('species') > -1) return 'species';
      else if (url.indexOf('vehicles') > -1) return 'vehicles';
    }

    /*
     * Função privada retornar o resultado das requisições de detalhes.
     */
    function _getCharDetails(urlDetails, index) {
      Spin.start($('.chars'));
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
        Spin.stop($('.chars'));
        _showModal(index);
      });
    }

    /*
     * Função privada para exibir o modal de detalhes.
     */
    function _showModal(index) {
      $('#item-'+index+' .modal').show();
    }

    /*
     * Função privada para exibir a pontuação de todos os jogadores.
     */
    function _showRanking() {
      vm.ranking = GameService.getRanking();
      $('#modal-ranking .modal').show();
    }

    /*
     * Função privada para validar o formulário do jogador ao salvar seu resultado.
     */
    function _formValidate() {
      if(vm.saveForm.$invalid) {
        toastr.error('Preencha os campos obrigatórios!', 'Erro!', {
          closeButton: true
        });
        return false;
      }
      return true;
    }

    /*
     * Função pública chamar o calculo e exibir a pontuação.
     */
    function saveResult(total) {
      if (_formValidate()) {
        GameService.save({
          total: total,
          player: vm.player
        });
        _showRanking();
      }
    }

    /*
     * Função pública capturar o Id do personagem.
     */
    function getUrlId(url) {
      return url.replace('https://swapi.co/api/people/', '').replace('/','');
    }

    /*
     * Função pública para exibir os campos de preenchimento do jogo.
     */
    function showInput(index) {
      vm.name = '';
      $('.chars-options .options').show();
      $('.chars-options .inputs').hide();
      $('#item-'+index+' .options').hide();
      $('#item-'+index+' .inputs').show();
      $('#item-'+index+' .inputs input').focus();
    }

    /*
     * Função pública para esconder os campos de preenchimento do jogo.
     */
    function hideInput(index) {
      $('#item-'+index+' .inputs').hide();
      $('#item-'+index+' .options').show();
    }

    /*
     * Função pública para fechar o modal de detalhes.
     */
    function closeModal(index) {
      $('#item-'+index+' .modal').hide();
    }

    /*
     * Função pública para fechar o modal de fim de jogo.
     */
    function closeResults() {
      $('#modal-results .modal').hide();
      _showRanking();
    }

    /*
     * Função pública para verificar cada tentativa.
     */
    function tryName(name, realName, index) {
      var result = GameService.answerItem(name, realName);
      _showInputResult(result, index);
    }

    /*
     * Função pública para exibir os detalhes.
     */
    function showDetails(char, index) {
      GameService.detailItem(char.name);
      _getCharDetails([
        char.homeworld,
        char.films,
        char.species,
        char.vehicles
      ], index);
    }

    /*
     * Função pública para exibir a resposta em cada iteração.
     */
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
      Spin.start($('.chars'));
      GameService.getChars(vm.currentPage).then(function(data) {
        vm.chars = data;
        Spin.stop($('.chars'));
      });
    }
  };

  GameCtrl.$inject = ['$scope', '$interval', '$timeout', 'GameService', '$cookies', '$stateParams', 'Spin', 'toastr'];

  angular
    .module('StarQuizApp.game')
    .controller('GameCtrl', GameCtrl);
})();
