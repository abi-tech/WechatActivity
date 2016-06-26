var tpl_nav_gamepage = [
'<div class="topBar" style="min-width: 583px;">',
    '<div class="title">活动页面</div>',
    '{{ each list as item i }}',
    '<div class="column">',
        '<span class="name">{{ item.name }}</span>',
        '<span class="flag"></span>',
    '</div>',
    '{{ /each }}',
    '<div class="slideBar">',
        '<div class="slideBarTip transitionPanel" style="left: 90px;"></div>',
    '</div>',
'</div>'
].join('');

mainModule.directive('navGamepage', ["settingsService", function (settingsService) {
    return {
        restrict : 'A',
        link : function (scope, element, attrs) {
            var $context = $(template.compile(tpl_nav_gamepage)({ list: settingsService.pages }));
            element.replaceWith($context);
            var columns = $(".column", $context);
            var slideBar = $(".slideBar div", $context);
            $(".column", $context).on('click', function (e) { 
                var index = columns.index($(this));
                columns.removeClass("checked");
                $(this).addClass("checked");
                var left = $(this).offset().left - $(this).parent().offset().left + 4;
                slideBar.css("left", left + "px");
            });
            
        }
    };
}]);

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

            // var start = {
            //     elem: "#beginTime",
            //     format: 'YYYY-MM-DD hh:mm',
            //     istime: true,
            //     choose: function(datas){
            //          scope.settings.baseSetting.beginTime = datas;
            //          scope.$apply();
            //     }
            // };

            // var end = {
            //     elem: "#endTime",
            //     format: 'YYYY-MM-DD hh:mm',
            //     istime: true,
            //     choose: function(datas){
            //          scope.settings.baseSetting.endTime = datas;
            //          scope.$apply();
            //     }
            // };
            
            // laydate(start);
            // laydate(end);
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
            var addAwardNum = $("#addAwardNum", element);
            var addAwardDetail = $("#addAwardDetail", element);
            var copyAward = $("#copyAward", element);
            var newAward = $("#newAward", element);

            var awardLevelItemDirective = '<div award="award" award-levelitem></div>';
            var awardSettingboxDirective = '<div award="award" award-settingbox></div>';
            var scopes = [];
            var awardLevelitems = [];
            var awardSettingboxes = [];

            function init() {
                var awards = scope.settings.awardsSetting.awards;
                angular.forEach(awards, function (data, index, array) {
                    var newScope = scope.$new();
                    newScope.award = data;

                    scopes.push(newScope);
                    var awardLevelItem = $compile(awardLevelItemDirective)(newScope);
                    var awardSettingbox = $compile(awardSettingboxDirective)(newScope);
                    awardLevelBox.append(awardLevelItem);
                    if (data.active) {
                        awardLevelItem.removeClass("hide");
                    }else{
                        awardLevelItem.addClass("hide");
                    }
                    
                    if (index == 0) {
                        awardLevelItem.addClass("checked");
                    }

                    awardDetail.append(awardSettingbox);

                    if (data.awardType == "comfort") {
                        comfortSetting.prop("checked", data.active);
                    }
                    awardLevelitems.push(awardLevelItem);
                    awardSettingboxes.push(awardSettingbox);
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
                    console.log(checked);
                    scope.settings.awardsSetting.awards[8].active = checked;
                    scope.$apply();
                    if (checked) {
                        awardLevelitems[8].removeClass("hide");
                        awardSettingboxes[8].removeClass("hide");
                    }else{
                        awardLevelitems[8].addClass("hide");
                        awardSettingboxes[8].addClass("hide");
                        awardLevelitems[8].removeClass("checked");
                    }
                    if (!validChecked()) { 
                        awardLevelitems[0].removeClass("hide");
                        awardLevelitems[0].addClass("checked");
                        awardSettingboxes[0].removeClass("hide");
                    }
                })

                delAwardNum.on("click", function (e) {

                });

                addAwardNum.on("click", function (e) {
                    addAwardDetail.toggle();
                });

                copyAward.on("click", function (e) {
                    addAwardDetail.hide();
                });

                newAward.on("click", function (e) {
                    addAwardDetail.hide();
                });

                function validChecked() {
                    for (var i = 0; i < awardLevelitems.length; i++) {
                        if(awardLevelitems[i].hasClass("checked"))
                            return true;
                    }
                    return false;
                }
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
            var slideBar = $(".slideBar div", element);
            $("#activeTabSubMenu .column", element).on('click', function (e) {
                var index = columns.index($(this));
                columns.removeClass("checked");
                $(this).addClass("checked");
                boxes.hide(); 
                switch(index){
                    case 0: companySetBox.show(); break;
                    case 1: gameSetBox.show(); break;
                    case 2: shareSetBox.show(); break;
                }
                var left = $(this).offset().left - $(this).parent().offset().left + 15;
                slideBar.css("left", left + "px");
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
    '<div class="comUploadBox chooseImg" style="margin-top: -30px;">',
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
            ngModelController.$render = function () { //console.log(attrs);
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
            //console.log(scope);
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
            var award = scope.award;
            if (award.active) {
                element.removeClass("hide");
            }else{
                element.addClass("hide");
            }
        }
    };
});


