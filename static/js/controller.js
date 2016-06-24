mainModule.controller('mainController',['$scope', '$http', "settingsService", function ($scope, $http, settingsService) {  
    $scope.settings = settingsService;

    $scope.save = function () {
    	console.log($scope.settings);
    }
}]);  