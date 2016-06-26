var mainModule = angular.module("mainModule", []);

angular.element(document).ready(function() {
	angular.bootstrap(document, ["mainModule"]);
});

mainModule.controller('mainController',['$scope', '$http', function ($scope, $http) {  

}]);  