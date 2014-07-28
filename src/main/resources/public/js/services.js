'use strict';

/* Services */
var dqmServices = angular.module('dqmServices', [ 'restangular' ]);

dqmServices.factory('CheckService', [ 'Restangular', function(Restangular) {
	return Restangular.one("checks", 7).get();
} ]);
