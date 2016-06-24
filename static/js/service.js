mainModule.service('settingsService', ['$rootScope', function (rootScope) {
	var service = {
		baseSetting : {
			activeName: "玩游戏赢大奖",
			beginTime: "2016-06-21 15:38",
			endTime: "2016-06-21 15:38",
			virtualJoinNum: 0,
			theLimitNum: 100,
			activeExplain: "获奖后凭兑奖码联系活动主办单位即可兑奖。",
			isShowJoinNum: "true",
			isLimitNum: "true"
		},
		gametypeSetting : {
			isLimitDrawTimes: "false", //总抽奖机会 限制或不限
			drawTotalTimes: 6, //总抽奖机会
			drawTimesLimit: 3, //每日抽奖机会
			awardTimesLimit: 1, //每人中奖次数
			winningRate: 30.0 //中奖概率
		},
		awardsSetting : {
			awards: [{
				index: 0,
				active: true,
				awardName: "一等奖", //奖项等级
				awardType: "normal", //奖项类型 normal comfort 
				awardDescribe: "价值100元礼品", //奖项名称
				awardAmount: 0, //奖品数量
				cashType: "online", // 线下兑奖 线上兑奖 underline online
				awardOptInfo: "凭券联系现场工作人员兑奖", //操作提示
				awardCashSite: "请填写您的兑奖地址或者门店地址", //兑奖地址
				useCodeBeginTime: "2016-06-23", //兑奖期限 开始
				useCodeEndTime: "2016-06-30" //兑奖期限 结束
			},{
				index: 1,
				active: false,
				awardName: "二等奖",
				awardType: "normal",
				awardDescribe: "价值50元礼品",
				awardAmount: 0, 
				cashType: "underline", 
				awardOptInfo: "凭券联系现场工作人员兑奖",
				awardCashSite: "请填写您的兑奖地址或者门店地址",
				useCodeBeginTime: "2016-06-23",
				useCodeEndTime: "2016-06-30"
			},{
				index: 2,
				active: false,
				awardName: "三等奖",
				awardType: "normal", 
				awardDescribe: "价值10元礼品", 
				awardAmount: 0, 
				cashType: "underline",
				awardOptInfo: "凭券联系现场工作人员兑奖",
				awardCashSite: "请填写您的兑奖地址或者门店地址",
				useCodeBeginTime: "2016-06-23",
				useCodeEndTime: "2016-06-30"
			},{
				index: 8,
				active: false,
				awardName: "安慰奖",
				awardType: "comfort", 
				awardDescribe: "价值5元小礼品",
				awardAmount: 0, 
				cashType: "underline", 
				awardOptInfo: "凭券联系现场工作人员兑奖",
				awardCashSite: "请填写您的兑奖地址或者门店地址",
				useCodeBeginTime: "2016-06-23",
				useCodeEndTime: "2016-06-30"
			}],
			addComfortAward: function () {
				var index = service.awardsSetting.awards.length - 1;
				var currDate = new Date();
				var beginTime = currDate.format("yyyy-MM-dd");
				var endTime = currDate.format("yyyy-MM-dd");
				var award = {
					index: 8,
					active: false,
					awardName: "安慰奖",
					awardType: "comfort",
					awardDescribe: "价值5元小礼品",
					awardAmount: 0, 
					cashType: "underline", 
					awardOptInfo: "凭券联系现场工作人员兑奖",
					awardCashSite: "请填写您的兑奖地址或者门店地址",
					useCodeBeginTime: beginTime,
					useCodeEndTime: endTime
				};
				service.awardsSetting.awards.splice(index, 0, award);
			},
			removeComfortAward: function () {
				var index = service.awardsSetting.awards.length - 1;
				if (true) {

				}
				service.awardsSetting.awards.splice(index, 1);
			},
			addNormalAward: function () {
				
				service.awardsSetting.awards.splice(index, 0, award);
			},
			removeNormalAward: function (index) {
				if(service.awardsSetting.awards == 0){

				}
				service.awardsSetting.awards.splice(index, 1);
			},
		},
		moreSetting : {
			hostName: null, //主办单位
			hostLink: null, //链接地址
			isShowLogo: "true", //是否显示企业Logo
			hostLogo: null, //是否显示企业Logo 链接地址
			loadingStyle: "default", //页面加载图片 default custom
			loadingImage: null, //页面加载图片
			menuStyle: "hide", //功能按钮 hide jump attention
			menuName: "", //按钮名称
			menuLink: "", //按钮链接
			qrcodeImage: null, //二维码链接地址
			wxShare: "custom", //微信分享 default custom
			wxShareImage: null //微信分享图片 default custom
		},
		pages: {
			gameHome: {},
			gamePrize: {},
			gameAwardDetail: {},
			gameAwardInfo: {},
			gameDrawnPrize: {},
			gameDrawnNoPrize: {}
		}
	};

	return service;
}]);