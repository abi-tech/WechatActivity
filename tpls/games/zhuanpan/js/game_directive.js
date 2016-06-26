mainModule.directive('gameResultbox', function () {
    return {
        restrict : 'A',
        replace : true,
        templateUrl : '/tpls/games/zhuanpan/game_resultbox.html',
        link : function (scope, element, attrs) {
        	element.on('click', function (e) {
        		$(this).hide();
        	});
        }
    };
});

mainModule.directive('gamePopinfo', function () {
    return {
        restrict : 'A',
        replace : true,
        templateUrl : '/tpls/games/zhuanpan/game_popinfo.html',
        link : function (scope, element, attrs) {
        	element.on('click', function (e) {
        		$(this).hide();
        	});
        }
    };
});

