mainModule.directive('topbar', function () {
    return {
        restrict : 'A',
        replace : true,
        templateUrl : 'tpls/topbar.html'
    };
});

mainModule.directive('baseSetting', ["settingsService", function (settingsService) {
    return {
        restrict : 'A',
        replace : true,
        templateUrl : 'tpls/base_setting.html',
        link : function (scope, element, attrs) {
            //scope.settings = settingsService;
            //scope.$watch("settings.baseSetting.beginTime", function (newValue, oldValue) {
                // body...
                //alert(newValue);
            //});

            var start = {
                elem: "#beginTime",
                format: 'YYYY-MM-DD hh:mm',
                istime: true,
                choose: function(datas){
                     scope.settings.baseSetting.beginTime = datas;
                     scope.$apply();
                }
            };

            var end = {
                elem: "#endTime",
                format: 'YYYY-MM-DD hh:mm',
                istime: true,
                choose: function(datas){
                     scope.settings.baseSetting.endTime = datas;
                     scope.$apply();
                }
            };
            
            laydate(start);
            laydate(end);
        }
    };
}]);

mainModule.directive('gametypeSetting', ["settingsService", function (settingsService) {
    return {
        restrict : 'A',
        replace : true,
        templateUrl : 'tpls/gametype_setting.html',
        link : function (scope, element, attrs) {

        }
    };
}]);

mainModule.directive('awardsSetting', ["$compile", "settingsService", function ($compile, settingsService) {
    return {
        restrict : 'A',
        replace : true,
        templateUrl : 'tpls/awards_setting.html',
        link : function (scope, element, attrs) {
            var awardLevelBox = $(".awardLevelBox", element);
            var awardDetail = $("#awardDetail", element);
            var comfortSetting = $("#comfortSetting", element);
            var delAwardNum = $("#delAwardNum", element);
            var addAwardNum = $("#delAwardNum", element);
            var addAwardNum = $("#copyAward", element);
            var newAward = $("#newAward", element);

            var awardLevelItemDirective = '<div award="award" award-levelitem></div>';
            var awardSettingboxDirective = '<div award="award" award-settingbox></div>';
            var scopes = [];

            function init() {
                var awards = scope.settings.awardsSetting.awards;
                angular.forEach(awards, function (data, index, array) {
                    var newScope = scope.$new();
                    newScope.award = data;

                    scopes.push(newScope);
                    var awardLevelItem = $compile(awardLevelItemDirective)(newScope);
                    var awardSettingbox = $compile(awardSettingboxDirective)(newScope);
                    awardLevelBox.append(awardLevelItem);
                    awardSettingbox.addClass("hide");
                    //alert(awardSettingbox.html());
                    if (index == 0) {
                        awardLevelItem.addClass("checked");
                        //awardSettingbox.removeClass("hide");
                    }

                    awardDetail.append(awardSettingbox);

                    comfortSetting.prop("checked", data.awardType == "comfort"? true : false);
                }); 
                 
                var items = $(".awardLevelBox .awardLevelItem", element);
                $(".awardLevelBox .awardLevelItem", element).on("click", function (e) {
                    var index = items.index(this);
                    items.removeClass("checked");
                    $(this).addClass("checked");
                    $("#awardDetail .awardSettingBox", element).addClass("hide");
                    $("#awardDetail .awardSettingBox:eq(" + index + ")", element).removeClass("hide");
                });

                comfortSetting.on("click", function (e) {
                    var checked = $(this).prop("checked"); 
                    console.log(scope.settings.awardsSetting);
                    scope.settings.awardsSetting.removeComfortAward();
                    if(checked){
                        //.splice(index, 0, page);
                    }else{

                    }
                })
            }
            init();
        }
    };
}]);

mainModule.directive('moreSetting', ["settingsService", function (settingsService) {
    return {
        restrict : 'A',
        replace : true,
        templateUrl : 'tpls/more_setting.html',
        link : function (scope, element, attrs) {
            var boxes = $("#companySetBox, #gameSetBox, #shareSetBox", element);
            var companySetBox = $("#companySetBox", element);
            var gameSetBox = $("#gameSetBox", element);
            var shareSetBox = $("#shareSetBox", element);
            var columns = $("#activeTabSubMenu .column", element);
            var slideBar = $(".slideBar", element);
            $("#activeTabSubMenu .column", element).on('click', function (e) {
                var index = columns.index($(this));
                columns.removeClass("checked");
                $(this).addClass("checked");
                boxes.hide(); 
                switch(index){
                    case 0: companySetBox.show(); slideBar.css("left", "0px"); break;
                    case 1: gameSetBox.show(); slideBar.css("left", "107px"); break;
                    case 2: shareSetBox.show(); slideBar.css("left", "215px"); break;
                }
                slideBar.css("transition", "left .5s cubic-bezier(0.175,0.885,0.320,1.325)");

            });
        }
    };
}]);

//widget inputUploader <div input-uploader></div>
var tpl_input_uploader = [
'<div>',
    '<div class="comUploadImg">',
        '<img style="width:100%;height:auto; vertical-align:bottom">',
    '</div>',
    '<div class="comUploadBox chooseImg">',
        '<span id="picker">选择图片</span>',
        '<div class="comUploadExplain"></div>',
    '</div>',
'</div>'
].join('');
mainModule.directive('inputUploader', function () {
    return {
        restrict : 'A',
        replace : true,
        require : "ngModel",
        template : tpl_input_uploader,
        link : function (scope, element, attrs, ngModelController) {
            var noneimageurl = attrs.noneimageurl;
            var explain = attrs.explain;
            var comUploadImg = $(".comUploadImg img", element);
            var comUploadExplain = $(".comUploadExplain", element);
            ngModelController.$render = function () { console.log(attrs);
                comUploadImg.attr("src", noneimageurl);
                comUploadExplain.text(explain);
            }

            var uploader = WebUploader.create({
                auto: true,
                swf: 'static/plugins/webuploader/Uploader.swf',
                server: ctx.uploadUrl,
                pick: $("#picker", element),
                resize: false,
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
            });

            uploader.on( 'uploadSuccess', function(file , response) {
                alert("success");
            });

            uploader.on( 'uploadError', function(file, response) {
                alert("error");
            });

            uploader.on( 'uploadComplete', function(file, response) {
                alert("complete");
            });
        }
    };
});

mainModule.directive('awardLevelitem', function () {
    return {
        restrict : 'A',
        replace : true,
        template : '<div class="awardLevelItem norLevelItem">{{ award.awardName }}</div>',
        scope: {
            award: '='
        },
        link : function (scope, element, attrs) {
            //alert(element.html());
            console.log(scope);
        }
    };
});

mainModule.directive('awardSettingbox', function () {
    return {
        restrict : 'A',
        replace : true,
        templateUrl : 'tpls/awards_setting_settingbox.html',
        scope: {
            award: '='
        },
        link : function (scope, element, attrs) {
            // var start = {
            //     elem: "input.useCodeBeginTime",
            //     format: 'YYYY-MM-DD',
            //     istime: true,
            //     choose: function(datas){
            //          scope.useCodeBeginTime = datas;
            //          scope.$apply();
            //     }
            // };

            // var end = {
            //     elem: "input.useCodeEndTime",
            //     format: 'YYYY-MM-DD',
            //     istime: true,
            //     choose: function(datas){
            //          scope.useCodeEndTime = datas;
            //          scope.$apply();
            //     }
            // };
            
            // laydate(start);
            // laydate(end);
        }
    };
});


