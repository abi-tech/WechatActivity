mainModule.directive('topbar', function () {
    return {
        restrict : 'A',
        replace : true,
        templateUrl : 'tpls/topbar.html'
    };
});

mainModule.directive('baseSetting', function () {
    return {
        restrict : 'A',
        replace : true,
        templateUrl : 'tpls/base_setting.html'
    };
});

mainModule.directive('gametypeSetting', function () {
    return {
        restrict : 'A',
        replace : true,
        templateUrl : 'tpls/gametype_setting.html'
    };
});

mainModule.directive('awardsSetting', function () {
    return {
        restrict : 'A',
        replace : true,
        templateUrl : 'tpls/awards_setting.html'
    };
});

mainModule.directive('moreSetting', function () {
    return {
        restrict : 'A',
        replace : true,
        templateUrl : 'tpls/more_setting.html'
    };
});

