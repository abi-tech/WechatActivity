; (function ($, window, document, undefined) {
	$.random = function (n, m) {
		var random = Math.floor(Math.random() * (m - n + 1) + n);
		return random;
	}

	var tpl = [
		'<div class="banner">',
			'<div class="turnplate" style="background-size:100% 100%;">',
				'<canvas class="item"></canvas>',
				'<img class="pointer"/>',
			'</div>',
		'</div>'
	].join('');


	var Turnplate = function (element, options) {
        this.$element = element,
        this.defaults = {
        	alternate: false,
        	txtColor: [],
        	bgColor: [],
        	plateImage: "",             //转盘背景图片
        	pointerImage: "",           //转盘指针图片
        	columns: [],				//大转盘奖品 { "text": "", "icon": "", txtColor": "", bgColor: "" }
        	lineBreak: "",              //文字换行参照字符
        	width: 422,                 //转盘宽度
        	height: 422,                //转盘高度
			outsideRadius: 192,			//大转盘外圆的半径
			textRadius: 155,			//大转盘奖品位置距离圆心的距离
			insideRadius: 68,			//大转盘内圆的半径
			startAngle: 0,				//开始角度
			bRotate: false,				//false:停止;ture:旋转
			duration: 8000,             //旋转持续时间,
			iconXY: { x: -35, y: 20 },  //图片位置坐标
			onSetAward: function (options) { return $.random(1, options.columns.length); },  //抽奖开始事件
			onDrawnEnd: function (item) {}  //抽奖完成回调
        },
        this.options = $.extend({}, this.defaults, options);
    }

    Turnplate.prototype = {
    	init: function () {
    		var that = this;
    		var options = that.options;
    		var $context = that.$context = $(tpl);
    		var $canvas = that.$canvas = $("canvas", $context);
    		var $pointer = that.$pointer = $(".pointer", $context);
    		$(".turnplate", $context).css("background-image", "url(" + options.plateImage + ")");
    		$canvas.attr("width", options.width);
    		$canvas.attr("height", options.height);
    		$pointer.attr("src", options.pointerImage);
    		that.$element.replaceWith($context);
    		var icons = [];
    		for (var i = 0; i < options.columns.length; i++) {
    			var $icon = $('<img src="' + options.columns[i].icon + '" style="display:none;" />');
    			$context.append($icon);
    			icons.push($icon[0]);
    		}
    		drawRouletteWheel($canvas[0], icons, options);

    		$pointer.on('click', function (e) {
    			if(options.bRotate) return;
				options.bRotate = !options.bRotate;

				var idx = options.onSetAward(options);
				that.drawn(idx);
    		});
    	},
    	drawn: function (idx) {
    		var options = this.options;
    		var $canvas = this.$canvas;

    		var angles = idx * (360 / options.columns.length) - (360 / (options.columns.length * 2));
    		if(angles < 270){
				angles = 270 - angles; 
			}else{
				angles = 360 - angles + 270;
			}
			$canvas.rotate({
		        angle: 0, 
		        animateTo: angles + 1800, 
		        duration: options.duration,
		        callback: function () {
		        	options.bRotate = !options.bRotate;
		        	options.onDrawnEnd(options.columns[idx]);
		        }
		    });
    	}
    }

    function drawRouletteWheel(canvas, icons, options) {
    	function translate(ctx, angle, arc) {
    		//translate方法重新映射画布上的 (0,0) 位置
            ctx.translate(211 + Math.cos(angle + arc / 2) * options.textRadius, 211 + Math.sin(angle + arc / 2) * options.textRadius);

            //rotate方法旋转当前的绘图
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
    	}

	    if (canvas.getContext) {
	        //根据奖品个数计算圆周角度
	        var arc = Math.PI / (options.columns.length / 2);
	        var ctx = canvas.getContext("2d");
	        //在给定矩形内清空一个矩形
	        ctx.clearRect(0, 0, options.width, options.height);
	        //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
	        ctx.strokeStyle = "#FFBE04";
	        //font 属性设置或返回画布上文本内容的当前字体属性
	        ctx.font = 'bold 18px Microsoft YaHei';
	        for (var i = 0; i < options.columns.length; i++) {
	            var angle = options.startAngle + i * arc;
	            ctx.fillStyle = options.alternate ? (options.bgColor[i % 2]) : options.columns[i].bgColor;
	            ctx.beginPath();
	            //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
	            ctx.arc(211, 211, options.outsideRadius, angle, angle + arc, false);
	            ctx.arc(211, 211, options.insideRadius, angle + arc, angle, true);
	            ctx.stroke();
	            ctx.fill();
	            //锁画布(为了保存之前的画布状态)
	            ctx.save();

	            //改变画布文字颜色
	            // var b = i + 2;
	            // if (b % 2) {
	            //     ctx.fillStyle = "#FFFFFF";
	            // } else {
	            //     ctx.fillStyle = "#E5302F";
	            // };
	            ctx.fillStyle = options.alternate ? (options.txtColor[i % 2]) : options.columns[i].txtColor;
	            //----绘制奖品开始----
	            var text = options.columns[i].text;
	            var line_height = 17;
	            translate(ctx, angle, arc);

	            /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
	            if (text.indexOf(options.lineBreak) > 0) { //判断字符进行换行
	                var texts = text.split(options.lineBreak);
	                for (var j = 0; j < texts.length; j++) {
	                    ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : 'bold 18px Microsoft YaHei';
	                    if (j == 0) {
	                        ctx.fillText(texts[j] + options.lineBreak, -ctx.measureText(texts[j] + options.lineBreak).width / 2, j * line_height);
	                    } else {
	                        ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height * 1.2); //调整行间距
	                    }
	                }
	            } else if (text.indexOf(options.lineBreak) == -1 && text.length > 8) { //奖品名称长度超过一定范围
	                text = text.substring(0, 8) + "||" + text.substring(8);
	                var texts = text.split("||");
	                for (var j = 0; j < texts.length; j++) {
	                    ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
	                }
	            } else {
	                //在画布上绘制填色的文本。文本的默认颜色是黑色
	                //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
	                ctx.fillText(text, - ctx.measureText(text).width / 2, 0);
	            }

	            //添加对应图标
	            (function (ctx, icon, angle, arc) {
	            	icon.onload = function () {
	            		ctx.save();
	            		translate(ctx, angle, arc);
	                    ctx.drawImage(icon, options.iconXY.x, options.iconXY.y);
	                    ctx.restore();
	                };
	                ctx.drawImage(icon, options.iconXY.x, options.iconXY.y);
	            })(ctx, icons[i], angle, arc);

	            //把当前画布返回（调整）到上一个save()状态之前
	            ctx.restore();
	            //----绘制奖品结束----
	        }
	    }
	};


    $.fn.turnplate = function (options) {
        var turnplate = new Turnplate(this, options);
        turnplate.init();
        return turnplate;
    }

})(jQuery, window, document);