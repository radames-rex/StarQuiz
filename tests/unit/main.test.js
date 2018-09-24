// var mock = require('./main.mock.js');
var mockAnswers = function(key) {
   var answers = {
      'luke' : 'Luke Skywlaker',
      'rs' : 'R2 D2',
      'Darth Vader' : 'Darth Vader',
      'R3-P0': 'C3-PO'
   }
   var responses = {"name":"R5-D4","height":"97","mass":"32","hair_color":"n/a","skin_color":"white, red","eye_color":"red","birth_year":"unknown","gender":"n/a","homeworld":"https://swapi.co/api/planets/1/","films":["https://swapi.co/api/films/1/"],"species":["https://swapi.co/api/species/2/"],"vehicles":[],"starships":[],"created":"2014-12-10T15:57:50.959000Z","edited":"2014-12-20T21:17:50.321000Z","url":"https://swapi.co/api/people/8/"}
}

describe("Game Controller -> ", function() {
  var vm, $httpBackend;

  beforeEach(function(){
    angular.mock.module("StarQuizApp");
         
    angular.mock.inject(function($controller, $rootScope, $injector) {
        $scope = $rootScope.$new();

        $httpBackend = $injector.get('$httpBackend');
             
        vm = $controller("GameCtrl", {
            $scope : $scope
        });

        $httpBackend.when('GET', 'app/translate/messages-en-US.json')
          .respond(200, {});
        $httpBackend.when('GET', 'https://swapi.co/api/people/8/')
          .respond(200, mock(responses));
    });
	});

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should ...", function() {
    //TODO
    $httpBackend.flush();
  });
});
