
//<input id="beginTime" class="input input1" type="text" name="beginTime" readonly style="cursor:pointer" 
//       value="2016-06-21 15:38" ng-model="settings.baseSetting.beginTime" />
mainModule.directive('inputTimepicker', ["settingsService", function (settingsService) {
    return {
        restrict : 'A',
        require: 'ngModel',
        link : function (scope, element, attrs, ngModelController) {
        	var format = attrs.format || 'YYYY-MM-DD hh:mm:ss';

        	ngModelController.$render = function () {
        		var viewValue = ngModelController.$viewValue;
        		//console.log(viewValue);
        	}

        	function initView(argument) {
        		var options = {
	                elem: element[0],
	                format: format,
	                istime: true,
	                choose: function(datas){
	                     ngModelController.$setViewValue(datas);
	                }
	            };

	            laydate(options);
        	}

        	initView();
        }
    };
}]);