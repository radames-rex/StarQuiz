(function() {
  'use strict';

  var GameService = function($http, ENV, $q, swapi, $cookies) {

    /*
     * Função privada para normalizar o nome e facilitar o jogo.
     */
    function _normalizeName(name) {
      return name
        .toString()
        .trim()
        .toUpperCase()
        .replace('-',' ')
        .replace(' ','');
    }

    /*
     * Função privada para persistir temporareamente as ações do jogador.
     */
    function _saveAction(action, name, result) {
      var personages = $cookies.getObject('currentGame') || [],
        char = _.find(personages, function(personage) {
          return personage.name === name;
        });
      if (action === 'DETAILS') {
        if (char) {
          char.viewed = true;
        } else {
          personages.push({
            name : name,
            viewed : true
          });
        }
      } else if (action === 'ANSWER') {
        if (char) {
          if (result) {
            if (!char.viewed) char.points = 10;
            else char.points = 5;
          } else {
            char.points = 0;
          }
        } else {
          var points = 0;
          if (result) points = 10;
          personages.push({
            name : name,
            points : points
          });
        }
      }
      var expireDate = new Date(Date.now() + 6000000);
      $cookies.putObject('currentGame', personages, {'expires': expireDate});
    }

    /*
     * Função privada para limpar o jogo ativo.
     */
    function _cleanCookies() {
      $cookies.remove('currentGame');
    }

    /*
     * Faz a requisição para a API SWAPI e pagina os resultados para a rota atual com dados dos personagens.
     */
    this.getChars = function(page) {
      var promises = [];
      for (var i = page*ENV.PAGESIZE-7; i <= page*ENV.PAGESIZE; i++) {
        promises.push(swapi.people.id(i));
      };
      return $q.all(promises);
    };

    /*
     * Faz a requisição para a API SWAPI por mais detalhes dos personagens.
     */
    this.getDetails = function(urlDetails) {
      var promises = [];
      _.forEach(urlDetails, function(url) {
        if (url) {
          if (Array.isArray(url)) {
            _.forEach(url, function(u) {
              promises.push(swapi.get(u));
            });
          } else {
            promises.push(swapi.get(url));
          }
        }
      });
      return $q.all(promises);
    };

    /*
     * Busca fotos dos personagens usando o databank oficial, mas não funciona em development environment (localhost).
     */
    this.getPictures = function(search) {
      return $http({
        url: 'https://www.starwars.com/_sac/'+search+'?s&p=section/search_module&f[search_section]=Databank',
        method: 'GET'
      });
    };

    /*
     * Verifica se o nome do persoangem está correto.
     */
    this.answerItem = function(name, realName) {
      var result = name ? _normalizeName(realName).indexOf(_normalizeName(name)) > -1 : false;
      _saveAction('ANSWER', realName, result);
      return result;
    };

    /*
     * Marca se foram visualizados os detalhes do personagem, para reduzir a pontuação.
     */
    this.detailItem = function(name) {
      _saveAction('DETAILS', name);
    };  

    /*
     * Retorna se já responderam um item e com qual resultado.
     */
    this.getItemStatus = function(name) {
      var personages = $cookies.getObject('currentGame') || [],
        char = _.find(personages, function(personage) {
          return personage.name === name;
        });
      return char && (char.points || char.points === 0) ? char.points : -1;
    };   

    /*
     * Exibe o Resultado final e opções para o jogador.
     */
    this.showResults = function() {
      var currentGame = $cookies.getObject('currentGame') || [],
        total = 0;
      _.forEach(currentGame, function(personage) {
        if(personage.points) total = total + personage.points;
      });
      return total;
    };   

    /*
     * Salva os resultados na localStorage.
     */
    this.save = function(data) {
      var ranking = localStorage.getItem('ranking') || [];
      if ((Array.isArray(ranking) && ranking.length > 0) || ranking) {
        ranking = JSON.parse(ranking);
      }
      ranking.push(data);
      localStorage.setItem('ranking', JSON.stringify(ranking));
      _cleanCookies();
    }; 

    /*
     * Retorna todos os resultados armazenados na localStorage.
     */
    this.getRanking = function(data) {
      var ranking = localStorage.getItem('ranking') || [];
      if ((Array.isArray(ranking) && ranking.length > 0) || ranking) {
        ranking = JSON.parse(ranking);
      }
      return ranking;
    };    
  };

  GameService.$inject = ['$http', 'ENV', '$q', 'swapi', '$cookies'];

  angular
    .module('StarQuizApp.game')
    .service('GameService', GameService);
})();
