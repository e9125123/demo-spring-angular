'use strict';

/* App Module */

var dqmApp = angular.module('dqmApp', [
  'ngRoute',
  'restangular',
  'ngTable',
  'dqmControllers',
  'dqmDirectives',
  'angularTreeview'
]);

dqmApp.config(['$routeProvider', 'RestangularProvider',
  function($routeProvider, RestangularProvider) {
	
	RestangularProvider.setBaseUrl('http://localhost:8080/');
	RestangularProvider.setDefaultHttpFields({cache: true});
	//RestangularProvider.setUseCannonicalId(true);

    $routeProvider.
    when('/abo', {
        templateUrl: 'partials/abo.html',
        controller: 'AboCtrl'
      }).
      when('/abo/:name', {
              templateUrl: 'partials/abo-detail.html',
              controller: 'AboDetailCtrl'
            }).
      when('/av', {
          templateUrl: 'partials/av.html',
          controller: 'CheckListCtrl'
        }).
      when('/checks', {
        templateUrl: 'partials/check-list.html',
        controller: 'CheckListCtrl'
      }).
      when('/checks/:checkNumber', {
        templateUrl: 'partials/check-detail.html',
        controller: 'CheckDetailCtrl'
      }).
      otherwise({
        redirectTo: '/checks'
      });
  }]);
