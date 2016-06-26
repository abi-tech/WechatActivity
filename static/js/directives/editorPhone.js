mainModule.directive('editorPhone', function () {
    return {
        restrict : 'A',
        replace : true,
        templateUrl : 'tpls/editor_phone.html',
        link : function (scope, element, attrs) {
        	$("#gamePreviewPage")[0].contentWindow.onload = function () {
        		console.log(scope.settings);
        		console.log($("#gamePreviewPage")[0].contentWindow.viewModel);
        		$("#gamePreviewPage")[0].contentWindow.viewModel = scope.settings;
        	}
        }
    };
});