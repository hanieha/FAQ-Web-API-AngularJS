

var App = angular.module('App', []);


App.controller("QAController", function ($scope, $http) {

  var url = '/api/QA/';


  //  for å gjøre unit test på hentAllQuestions()
  $scope.allQuestions = function () {
    hentAllQuestions();
  }

  function hentAllQuestions() {

    console.log("Inne i hentAllQuestions");
    $http.get(url).
      success(function (allQuestions) {
        $scope.Questions = allQuestions;
        //$scope.visQuestions = true;
        $scope.laster = false;

      }).
        error(function (data, status) {
          console.log(status + data);
        });
  };



  $scope.enQuestion = function () {
    hentQuestion();
  }

  


  function hentQuestion() {

    console.log("Inne i hentQuestion");
    $http.get(url, $scope.Qid).success(function (enQuestion) {
      $scope.question = enQuestion;
      $scope.visQuestion = false;
      $scope.laster = false;
      $scope.visSkjema = false;
      $scope.regKnapp = false;
      $scope.visQuestions = false;
      $scope.register = false;
      $scope.oppdatering = false;

    }).
        error(function (data, status) {
          console.log(status + data);
        });
  };


  $scope.visQuestions = true;
  $scope.regKnapp = true;
  $scope.laster = true;
  $scope.oppdatering = false;
  hentAllQuestions();


  $scope.visRegSkjema = function () {
    $scope.Qtext = "";

    // for å unngå at noen av feltene gir "falske" feilmeldinger 
    $scope.skjema.$setPristine();
    $scope.regKnapp = false; // dette er knappen fra listen av questions til reg-skjema
    $scope.visSkjema = true;
    $scope.visQuestions = false;
    $scope.register = true; // dette er knappen for å registrere i form´en.
    $scope.oppdatering = false;

  };

  $scope.lagreQuestion = function () {
    // lag et object for overføring til server via post
    console.log("Inne i registerQuestion");
    var question = {
      Qtext: $scope.Qtext
    };

    $http.post(url, question).success(function (data) {

      hentAllQuestions(); // må gjøre dette inne i post ellers vil hentAllQuestions kjøre før den er ferdig
      $scope.visQuestions = true;
      $scope.visSkjema = false;
      $scope.regKnapp = true;
      $scope.oppdatering = false;

    }).
      error(function (data, status) {
        console.log(status + data);
      });
  };

  $scope.slettQuestion = function (Qid) {

    $http.delete(url + Qid).
    success(function (data) {
      hentAllQuestions();
    }).
      error(function (data, status) {
        console.log(status + data);
      });
  };

  $scope.endreQuestion = function (Qid) {
    // ta vekk registreringsknapp 
    $scope.register = false;
    $scope.visQuestions = false;
    $scope.kundequestion = true;
    $scope.oppdatering = true;
    // hent question
    $http.get(url + Qid).
        success(function (question) {
          $scope.Qid = question.Qid;
          $scope.Qtext = question.Qtext;
          // vis skjema med data
          $scope.visSkjema = true;
        }).
        error(function (data, status) {
          console.log(status + data);
        });
  };

  $scope.oppdaterQuestion = function () {

    console.log("Inne i oppdaterQuestion");
    // lag question
    var kundequestion = {
      Qtext: $scope.Qtext,
    };

    $scope.visSkjema = false;
    $scope.visQuestions = true;
    $scope.oppdatering = false;

    $http.put(url + $scope.Qid, kundequestion).success(function (data) {

      $scope.visQuestions = true;
      hentAllQuestions();
    }).
        error(function (data, status) {
          console.log(status + data);
        });
  };

});
/**
App.directive('AppCollapse', function () {
    return {
        restrict: 'A',
        template: test ,
        link: function (scope, el, attrs) {
            scope.panelBaseId = attrs.collapsePanelBodyId;
            scope.panelId = attrs.collapsePanelId;
        }
    };
});

angular.module('AppComponents', ['App']); **/