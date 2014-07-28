'use strict';

/* jasmine specs for controllers go here */

//describe('Controllers', function() {
//	  beforeEach(module('dqmApp'));
//	 
//	  describe('menuCtrl', function(){
//	 
//	    it('should create "phones" model with 3 phones', inject(function($controller) {
//	      var scope = {};
//	      var location = {};
//	      var ctrl = $controller('menutCtrl', { $scope: scope, $location: location });
//	 
//	      expect(scope.routeIs).toBeDefined();
//	    }));
//	  });
//	});
describe('controller', function() {

    // we declare some global vars to be used in the tests
    var scope, location;      // the scope where our directive is inserted

    // load the modules we want to test
    beforeEach(module('dqmControllers'));

    // before each test, creates a new fresh scope
    // the inject function interest is to make use of the angularJS
    // dependency injection to get some other services in our test
    // here we need $rootScope to create a new scope
    beforeEach(inject(function($rootScope, $compile, $location) {
        scope = $rootScope.$new();
        location = $location;
    }));
    
    // a single test example, check the produced DOM
//    inject(function($controller)
    it('menuCtrl should supply routeIs', inject(function($controller) {
    	var myCtrl1 = $controller('menuCtrl', {$scope: scope, $location: location});
    	
    	expect(scope.routeIs('tets')).toEqual(false);
    	
    	location.path=function() {
    		return 'tets';
    	}
    	expect(scope.routeIs('tets')).toEqual(true);
    }));
    
});

//a test suite (group of tests)
describe('sample component test', function() {
    // a single test
    it('ensure addition is correct', function() {
        // sample expectation
        expect(1+1).toEqual(2);
        //                  `--- the expected value (2)
        //             `--- the matcher method (equality)
        //       `-- the actual value (2)
    });
    // another test
    it('ensure substraction is correct', function() {
        expect(1-1).toEqual(0);
    });
});
