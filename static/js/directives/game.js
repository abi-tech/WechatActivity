mainModule.directive('game', ["settingsService", function (settingsService) {
    return {
        restrict : 'A',
        replace : true,
        templateUrl : 'tpls/gameIndex.html',
        link : function (scope, element, attrs) {

        }
    };
}]);