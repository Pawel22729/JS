var app1 = angular.module('app1', []);

app1.controller('cntrl1', function($scope, $http) {

	$http.get('http://localhost:5000/products/').then(function(response) {

		$scope.data = response.data;

	});

 
});

app1.controller('cntrl2', function($scope, $http) {

	$scope.test = 'Pawel';
<!--
	$scope.add_product = function(product) {
	    var data = {"product": product.name, "ammount": product.ammount};
	    $http.post("http://localhost:5000/products/", data);
	};
-->
});

