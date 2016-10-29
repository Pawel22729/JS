var app1 = angular.module('app1', []);

app1.controller('cntrl1', function($scope, $http) {

	$http.get('http://localhost:5000/products/').then(function(response) {

		$scope.data = response.data;

	});	
 
});

