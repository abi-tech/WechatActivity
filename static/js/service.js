mainModule.service('settingsService', ['$rootScope', function (rootScope) {
	var service = {
		pages : [
			{ name: "首页", url: "index.html"},
			{ name: "活动奖品", url: ""},
			{ name: "我的奖品", url: ""},
			{ name: "奖品详情", url: ""},
			{ name: "中奖页面", url: "result_.html"},
			{ name: "没中奖页", url: "result.html"}
		],
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
				index: 0, //索引号
				active: true, //激活状态
				awardName: "一等奖", //奖项等级
				awardType: "normal", //奖项类型 normal comfort 
				awardDescribe: "价值100元礼品", //奖项名称
				awardAmount: 0, //奖品数量
				cashType: "online", //兑奖方式 线下兑奖 线上兑奖 underline online
				onlineWxCash: "true",
				awardOptInfo: "凭券联系现场工作人员兑奖", //操作提示
				awardCashSite: "请填写您的兑奖地址或者门店地址", //兑奖地址
				useCodeBeginTime: "2016-06-23", //兑奖期限 开始
				useCodeEndTime: "2016-06-30", //兑奖期限 结束
				setWxCard: "generate", //微信卡券 generate close
				setCusCode: "system", //生成卷号 system manual
				cusAwardLink: "close", //联系兑奖 close open
				cusCodeBox: "007", //卷号
				awardSubTile: "副标题", //副标题
				servicePhone: "客服电话", //客服电话
				cashInfoContent: "兑奖须知", //兑奖须知
				cusAwardBtn: "hide", //自定义按钮 hide jump attention 
				awartBtnTitle: "", //按钮名称
				awardBtnLink: "", //按钮链接
				attentionImg: null //二维码链接地址
			},{
				index: 1,
				active: true,
				awardName: "二等奖",
				awardType: "normal",
				awardDescribe: "价值50元礼品",
				awardAmount: 0, 
				cashType: "underline", 
				onlineWxCash: "true",
				awardOptInfo: "凭券联系现场工作人员兑奖",
				awardCashSite: "请填写您的兑奖地址或者门店地址",
				useCodeBeginTime: "2016-06-23",
				useCodeEndTime: "2016-06-30",
				setWxCard: "generate",
				setCusCode: "system",
				cusCodeBox: "",
				awardSubTile: "",
				servicePhone: "",
				cashInfoContent: ""
			},{
				index: 2,
				active: false,
				awardName: "三等奖",
				awardType: "normal", 
				awardDescribe: "价值10元礼品", 
				awardAmount: 0, 
				cashType: "underline",
				onlineWxCash: "true",
				awardOptInfo: "凭券联系现场工作人员兑奖",
				awardCashSite: "请填写您的兑奖地址或者门店地址",
				useCodeBeginTime: "2016-06-23",
				useCodeEndTime: "2016-06-30",
				setWxCard: "generate",
				setCusCode: "system",
				cusCodeBox: "",
				awardSubTile: "",
				servicePhone: "",
				cashInfoContent: ""
			},{
				index: 3,
				active: false,
				awardName: "四等奖",
				awardType: "normal", 
				awardDescribe: "价值10元礼品", 
				awardAmount: 0, 
				cashType: "underline",
				onlineWxCash: "true",
				awardOptInfo: "凭券联系现场工作人员兑奖",
				awardCashSite: "请填写您的兑奖地址或者门店地址",
				useCodeBeginTime: "2016-06-23",
				useCodeEndTime: "2016-06-30",
				setWxCard: "generate",
				setCusCode: "system",
				cusCodeBox: "",
				awardSubTile: "",
				servicePhone: "",
				cashInfoContent: ""
			},{
				index: 4,
				active: false,
				awardName: "五等奖",
				awardType: "normal", 
				awardDescribe: "价值5元礼品", 
				awardAmount: 0, 
				cashType: "underline",
				onlineWxCash: "true",
				awardOptInfo: "凭券联系现场工作人员兑奖",
				awardCashSite: "请填写您的兑奖地址或者门店地址",
				useCodeBeginTime: "2016-06-23",
				useCodeEndTime: "2016-06-30",
				setWxCard: "generate",
				setCusCode: "system",
				cusCodeBox: "",
				awardSubTile: "",
				servicePhone: "",
				cashInfoContent: ""
			},{
				index: 5,
				active: false,
				awardName: "六等奖",
				awardType: "normal", 
				awardDescribe: "价值5元礼品", 
				awardAmount: 0, 
				cashType: "underline",
				onlineWxCash: "true",
				awardOptInfo: "凭券联系现场工作人员兑奖",
				awardCashSite: "请填写您的兑奖地址或者门店地址",
				useCodeBeginTime: "2016-06-23",
				useCodeEndTime: "2016-06-30",
				setWxCard: "generate",
				setCusCode: "system",
				cusCodeBox: "",
				awardSubTile: "",
				servicePhone: "",
				cashInfoContent: ""
			},{
				index: 6,
				active: false,
				awardName: "七等奖",
				awardType: "normal", 
				awardDescribe: "价值5元礼品", 
				awardAmount: 0, 
				cashType: "underline",
				onlineWxCash: "true",
				awardOptInfo: "凭券联系现场工作人员兑奖",
				awardCashSite: "请填写您的兑奖地址或者门店地址",
				useCodeBeginTime: "2016-06-23",
				useCodeEndTime: "2016-06-30",
				setWxCard: "generate",
				setCusCode: "system",
				cusCodeBox: "",
				awardSubTile: "",
				servicePhone: "",
				cashInfoContent: ""
			},{
				index: 7,
				active: false,
				awardName: "八等奖",
				awardType: "normal", 
				awardDescribe: "价值5元礼品", 
				awardAmount: 0, 
				cashType: "underline",
				onlineWxCash: "true",
				awardOptInfo: "凭券联系现场工作人员兑奖",
				awardCashSite: "请填写您的兑奖地址或者门店地址",
				useCodeBeginTime: "2016-06-23",
				useCodeEndTime: "2016-06-30",
				setWxCard: "generate",
				setCusCode: "system",
				cusCodeBox: "",
				awardSubTile: "",
				servicePhone: "",
				cashInfoContent: ""
			},{
				index: 8,
				active: false,
				awardName: "安慰奖",
				awardType: "comfort", 
				awardDescribe: "价值5元小礼品",
				awardAmount: 0, 
				cashType: "underline", 
				onlineWxCash: "true",
				awardOptInfo: "凭券联系现场工作人员兑奖",
				awardCashSite: "请填写您的兑奖地址或者门店地址",
				useCodeBeginTime: "2016-06-23",
				useCodeEndTime: "2016-06-30",
				setWxCard: "generate",
				setCusCode: "system",
				cusCodeBox: "",
				awardSubTile: "",
				servicePhone: "",
				cashInfoContent: ""
			}]
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
			isShowSkillSup: "true", //页脚广告
			showSlide: "false", //轮播获奖信息
			wxShare: "default", //分享设置 微信分享 default custom
			wxShareImage: null, //分享设置 微信分享图片
			wxShareText: "default", // default custom
			wxShareContent: { success: "​轻轻松松就能抽到大奖，积攒多年的人品终于有用了，你也赶紧来抽奖吧！！ " , failure: "​我已经在活动中抽到了奖品，你也快来抽大奖吧！ " } // 自定义分享内容
		}
	};

	return service;
}]);