'use strict';

/* Controllers */

var dqmControllers = angular.module('dqmControllers', []);

dqmControllers.controller('menuCtrl',
		[
				'$scope',
				'$location',
				function($scope, $location) {

					$scope.isActive = function(viewLocation) {
						// console.log("$location.path()=" + $location.path());
						// console.log("viewLocation=" + viewLocation);

						var active = ($location.path().lastIndexOf(
								viewLocation, 0) == 0);
						// console.log("active=" + active);
						return active;
					};

					$scope.routeIs = function(routeName) {
						return $location.path() === routeName;
					};
				} ]);

dqmControllers.controller('CheckListCtrl', [
		'$scope',
		'$http',
		'$filter',
		'Restangular',
		'ngTableParams',
		function($scope, $http, $filter, Restangular, ngTableParams) {

			$scope.orderProp = 'checkNumber';

			var promise = Restangular.all('checks').getList();

			promise.then(function(checks) {
				console.log('received checks: ' + checks.length);
				$scope.checks = checks;
				$scope.tableParams = new ngTableParams({
					page : 1, // show first page
					count : 10, // count per page
					sorting : {
						checkNumber : 'asc' // initial sorting
					}
				}, {
					total : 0, // length of data
					counts : [ 10, 50, 100 ],
					getData : function($defer, params) {
						var orderedData = params.filter() ? $filter('filter')(
								checks, params.filter()) : checks;
						orderedData = params.sorting() ? $filter('orderBy')(
								orderedData, params.orderBy()) : orderedData;
						params.total(orderedData.length);
						$defer.resolve(orderedData.slice((params.page() - 1)
								* params.count(), params.page()
								* params.count()));

					}
				});
			}, function(reason) {
				alert('Failed: ' + reason);
			}, function(update) {
				alert('Got notification: ' + update);
			});

			$scope.checkboxes = {
				'checked' : false,
				items : {}
			};
			// watch for check all checkbox
			$scope.$watch('checkboxes.checked', function(value) {
				angular.forEach($scope.checks, function(item) {
					if (angular.isDefined(item.id)) {
						$scope.checkboxes.items[item.id] = value;
					}
				});
			});
			// watch for data checkboxes
			$scope.$watch('checkboxes.items', function(values) {
				if (!$scope.checks) {
					return;
				}
				var checked = 0, unchecked = 0, total = $scope.checks.length;
				angular.forEach($scope.checks, function(item) {
					checked += ($scope.checkboxes.items[item.id]) || 0;
					unchecked += (!$scope.checkboxes.items[item.id]) || 0;
				});
				if ((unchecked == 0) || (checked == 0)) {
					$scope.checkboxes.checked = (checked == total);
				}
				// grayed checkbox
				angular.element(document.getElementById("select_all")).prop(
						"indeterminate", (checked != 0 && unchecked != 0));
			}, true);
		}

]);

dqmControllers.controller('AboCtrl', [
		'$scope',
		'$http',
		'$filter',
		'Restangular',
		'ngTableParams',
		function($scope, $http, $filter, Restangular, ngTableParams) {

			$scope.orderProp = 'name';

			var promise = Restangular.all('abos').getList();

			promise.then(function(abos) {
				console.log('received abos ' + abos.length);
				$scope.abos = abos;
				$scope.tableParams = new ngTableParams({
					page : 1, // show first page
					count : 5, // count per page
					sorting : {
						name : 'asc' // initial sorting
					}
				}, {
					total : 0, // length of data
					counts : [ 3, 5, 10 ],
					getData : function($defer, params) {
						var orderedData = params.filter() ? $filter('filter')(
								abos, params.filter()) : abos;
						orderedData = params.sorting() ? $filter('orderBy')(
								orderedData, params.orderBy()) : orderedData;
						params.total(orderedData.length);
						$defer.resolve(orderedData.slice((params.page() - 1)
								* params.count(), params.page()
								* params.count()));

					}
				});
			}, function(reason) {
				alert('Failed: ' + reason);
			}, function(update) {
				alert('Got notification: ' + update);
			});

			$scope.checkboxes = {
				'checked' : false,
				items : {}
			};
			// watch for check all checkbox
			$scope.$watch('checkboxes.checked', function(value) {
				angular.forEach($scope.abos, function(item) {
					if (angular.isDefined(item.id)) {
						$scope.checkboxes.items[item.id] = value;
					}
				});
			});
			// watch for data checkboxes
			$scope.$watch('checkboxes.items', function(values) {
				if (!$scope.abos) {
					return;
				}
				var checked = 0, unchecked = 0, total = $scope.abos.length;
				angular.forEach($scope.abos, function(item) {
					checked += ($scope.checkboxes.items[item.id]) || 0;
					unchecked += (!$scope.checkboxes.items[item.id]) || 0;
				});
				if ((unchecked == 0) || (checked == 0)) {
					$scope.abos.checked = (checked == total);
				}
				// grayed checkbox
				angular.element(document.getElementById("select_all")).prop(
						"indeterminate", (checked != 0 && unchecked != 0));
			}, true);
		}

]);

dqmControllers.controller('AboDetailCtrl',
		[
				'$scope',
				'$routeParams',
				'Restangular',
				function($scope, $routeParams, Restangular) {

					$scope.master = {};

					var route = $routeParams.name;
					var checkBaseUrl;

					if (route.lastIndexOf('create', 0) == 0) {
						checkBaseUrl = Restangular.one("abos", "create");
					} else {
						checkBaseUrl = Restangular.one("abos",
								$routeParams.name);
					}

					var promise = checkBaseUrl.get();

					promise.then(function(abo) {
						console.log('received abo: ' + abo.name);
						$scope.master = abo;
					}, function(reason) {
						alert('Failed: ' + reason);
					});

					$scope.update = function(abo) {
						$scope.master = angular.copy(abo);

						function getMethod() {
							if (!abo.id) {
								return Restangular.all('abos').post(abo);
							} else {
								return Restangular.one("abos", "update")
										.customPUT(abo);
								// return checkBase.customPUT(check);
							}

						}

						var promise = getMethod();
						promise.then(function(abo) {
							console.log('received abo in update: ' + abo.name);
							$scope.name = $routeParams.name;
							$scope.master = angular.copy(abo);
							$scope.reset();
						}, function(reason) {
							alert('Failed: ' + reason);
						});
					};

					$scope.reset = function() {
						console.log('restting: ' + $scope.master);
						$scope.abo = angular.copy($scope.master);
					};

					$scope.isUnchanged = function() {
						$scope.abo = $scope.master;
					};

					$scope.reset();
				} ]);

dqmControllers.controller('CheckDetailCtrl', [
		'$scope',
		'$routeParams',
		'Restangular',
		'$compile',
		function($scope, $routeParams, Restangular) {

			$scope.master = {};
			$scope.check = {};

			var route = $routeParams.checkNumber;
			var checkBaseUrl;

			if (route.lastIndexOf('create', 0) == 0) {
				checkBaseUrl = Restangular.one("checks", "create");
			} else {
				checkBaseUrl = Restangular.one("checks",
						$routeParams.checkNumber);
			}

			var promise = checkBaseUrl.get();

			promise.then(function(check) {
				console.log('received check: ' + check.checkName);
				$scope.master = check;
				$scope.reset();
			}, function(reason) {
				alert('Failed: ' + reason);
			});

			$scope.update = function(check) {
				angular.copy(check, $scope.master);

				function getMethod() {
					if (!check.id) {
						return Restangular.all('checks').post(check);
					} else {
						return Restangular.one("checks", "update").customPUT(
								check);
						// return checkBase.customPUT(check);
					}

				}

				var promise = getMethod();
				promise.then(function(check) {
					console.log('received checks: ' + check.checkName);
					$scope.checkNumber = $routeParams.checkNumber;
					$scope.master = check;
					$scope.reset();
				}, function(reason) {
					alert('Failed: ' + reason);
				});
			};

			$scope.reset = function() {
				angular.copy($scope.master, $scope.check);
			};

			$scope.isUnchanged = function() {
				return ($scope.check == $scope.master);
			};

			$scope.customer = {
                  name: 'Naomi',
                  address: '1600 Amphitheatre'
                };

			$scope.treedata =
            [
                { "label" : "User", "id" : "role1", "chosen" : false, "children" : [
                    { "label" : "subUser1", "id" : "role11", "chosen" : false, "parent" :  "role1", "children" : [] },
                    { "label" : "subUser2", "id" : "role12", "chosen" : false, "parent" :  "role1", "children" : [
                        { "label" : "subUser2-1", "id" : "role121", "chosen" : false, "parent" :  "role12", "children" : [
                            { "label" : "subUser2-1-1", "id" : "role1211", "chosen" : false, "parent" :  "role21", "children" : [] },
                            { "label" : "subUser2-1-2", "id" : "role1212", "chosen" : false, "parent" :  "role21", "children" : [] }
                        ]}
                    ]}
                ]},
                { "label" : "Admin", "id" : "role2", "chosen" : false, "children" : [] },
                { "label" : "Guest", "id" : "role3", "chosen" : false, "children" : [] }
            ];

			$scope.reset();
		} ]);
