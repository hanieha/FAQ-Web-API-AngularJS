// Referansene under er ikke kommentarer, men reelle referanser.
// Referansene under må skje i riktig rekkefølge.

/// <reference path="../scripts/libjs/angular.js" />
/// <reference path="../scripts/libjs/angular-mocks.js" />
/// <reference path="../scripts/app/kundecontroller.js" />

// Bruk angular.js isteden for angular.min.js over for å få bedre feilmeldinger

describe('QAController', function () {
    // "QAController" over er bare en tekst som kommer ut føtst i testen.

    // start setup
    var httpBackend, scope, createController;

    // under skal module-navnet i QAController inn fra angular.module("api", []);
    beforeEach(module('App'));

    beforeEach(inject(function ($injector) {
        httpBackend = $injector.get('$httpBackend');
        scope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');
        createController = function () {
            // under skal navnet på controlleren som skal testes, atså "QAContoller"
            return $controller('QAController', { '$scope': scope });
        };
    }));
    // end setup

    it("skal returnere 3 sporsmal", function () {

        // arrange
        var Controller = new createController();

        httpBackend.when('GET', '/api/QA/').respond(
        [
            {
                "Qtext": "Hvordan kan jeg opprette en kundekonto?",
    
            },
            {
                "Qtext": "Hvor finner jeg mitt kundenummer?",
            },
            {
                "Qtext": "Får jeg faktura sammen med mine varer?",
            },
        ]
        );

        // act
        scope.allQuestions(); // denne funksjonen er blitt lagt til i QAControlleren, se denne.
        httpBackend.flush();  // "gjør" http-kallet

        // assert
       // expect(scope.questions.length).toBe("");
        //expect(scope.questions[2].Qtext).toBe("Hvordan opprette en kundekonto?");
    });

    it("skal endre en sporsmal", function () {

        // arrange
        var Controller = new createController();

        httpBackend.when('GET', '/api/QA/1').respond(
        {
            "Qid": 1,
            "Qtext": "Koster det noe å velge kreditt/tar dere fakturavgifter?",

        }
        );

        // fordi hentAllQuestions også blir kalt
        // den blir kalt fordi vi tar new på controller hver gang vi kjører testen
        // det betyr at det er hentAllQuestions som står øverst i controlleren som kjøres 
        // endreQuestion har ikke noe eget kall til hentAllQuestions
        httpBackend.when('GET', '/api/QA/').respond(
        [
            {
               "Qtext": "Hvordan opprette en kundekonto?",

            },
            {
                "Qtext": "Hvor finner jeg mitt kundenummer?",
            },
            {
                "Qtext": "Får jeg faktura sammen med mine varer?",
            },
        ]
        );
        // act
        scope.endreQuestion(1);
        httpBackend.flush();

        // assert
        expect(scope.id).toBe(1);
        expect(scope.questions[1].Qtext).toBe("Hvordan opprette en kundekonto?");
    
        expect(scope.questions[2].Qtext).toBe("Hvor finner jeg mitt kundenummer?");
        
    });

    it("skal slette et sporsmal", function () {

        // arrange
        var Controller = new createController();

        httpBackend.when('DELETE', '/api/QA/1').respond(); // returner ingenting

        // fordi hentAllQuestions også blir kalt
        httpBackend.when('GET', '/api/QA/').respond(
        [
             {
                 "Qtext": "Hvordan opprette en kundekonto?",

             },
            {
                "Qtext": "Hvor finner jeg mitt kundenummer?",
            },
        ]
        );
        // act
        scope.sletteQuestion(1);
        httpBackend.flush();
        // assert
        expect(scope.questions.length).toBe(200);
        expect(scope.questions[1].Qtext).toBe("Hvordan opprette en kundekonto?");
    });

    it("skal lagre et eporsmal", function () {
        // arrange
        var Controller = new createController();
       
        httpBackend.when('POST', '/api/QA/').respond(); //returner ingenting

        // fordi hentAlleKunder også blir kalt
        httpBackend.when('GET', '/api/QA/').respond(
        [
             {
                 "Qtext": "Hvordan opprette en kundekonto?",

             },
            {
                "Qtext": "Hvor finner jeg mitt kundenummer?",
            },
            {
                "Qtext": "Får jeg faktura sammen med mine varer?",
            },
        ]
        );
        // act
        scope.lagreQuestion();
        httpBackend.flush();
        // assert
        expect(scope.questions.length).toBe(200);
        expect(scope.questions[3].Qtext).toBe("Får jeg faktura sammen med mine varer?");
    });

    it("skal oppdatere et sporsmal", function () {
        // arrange
        var Controller = new createController();

        scope.Qid = 1;  // denne må settes, det er sporsmal 1 som skal kalles, PUT som svarer

        httpBackend.when('PUT', '/api/QA/1').respond(); // returner ingenting.

        // fordi hentAllQuestions også blir kalt
        httpBackend.when('GET', '/api/QA/').respond(
        [
            {
                "Qtext": "Hvordan opprette en kundekonto?",

            },
            {
                "Qtext": "Hvor finner jeg mitt kundenummer?",
            },
            {
                "Qtext": "Får jeg faktura sammen med mine varer?",
            },
        ]
        );
       
        // act
        scope.oppdaterQuestion();
        httpBackend.flush();
        // assert
        expect(scope.questions.length).toBe(300);
        expect(scope.questions[2].Qtext).toBe("Hvor finner jeg mitt kundenummer?");
    });
});