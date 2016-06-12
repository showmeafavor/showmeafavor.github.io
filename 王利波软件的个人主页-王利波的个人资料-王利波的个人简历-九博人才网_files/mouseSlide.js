  /*
  *   此文件用于写页面公共JS，如头部底部JS效果
  */
$(function() {
    $('input, textarea').placeholder({customClass:'ie-placeholder'});

    // 头部浮动
    var header = $('#globalheader');
    var headerHeight = header.outerHeight();
    $(window).scroll(function() {
      if($(this).scrollTop() >= headerHeight) {
        header.addClass('fixed').css('left', '0').parent().css('padding-top', headerHeight +'px');
      } else {
        header.removeClass('fixed').parent().css('padding-top', '0');
      }
    });
});


(function() {
  // 顶部导航菜单鼠标滑动效果
  $('#nav-menu .menu > li,#my-photo,#gh-message, .gh-r-menu li').hover(function(){
    var _this = $(this);
    _this.attr('isHover', 'true');
    setTimeout(function(){
      _this.attr('isHover') == 'true' && _this.find('.children').stop(true, true).slideDown(200);
    }, 300);
    _this.find('.drop-down').addClass('navhover');
  },function(){
    var _this = $(this);
    _this.attr('isHover', 'false');
    _this.find('.children').stop(true, true).slideUp();
    _this.find('.drop-down').removeClass('navhover');
  });

  // 底部微信
  $('body').on('mouseover', '[data-cmd="showQrcode"]', function() {
    $(this).siblings('.gf-weixin-img').addClass('active');
  }).on('mouseout', '[data-cmd="showQrcode"]', function() {
    $(this).siblings('.gf-weixin-img').removeClass('active');
  });
})();

// $(select).tabs();
(function($){
  $.fn.tabs = function(){
    var changeTabs = function () {
        $(this).addClass("active").siblings().removeClass("active"); 
        var activeTab = $(this).find("a").attr("href"); 
        $(activeTab).fadeIn().siblings(".tab-content").hide(); 
        return false;
    }
    var t = $(this);
    t.find(".tab-content").hide().first().show(); 
    t.find("ul li").click(changeTabs);
  }
    
})(jQuery);

// 通知声音
(function(){
    if($('.hasMessage').length > 0) {
        $('body').append('<embed src="http://static.jjoobb.cn/audio/sms.mp3" loop="false" class="job-sms-sound" autostart="true" />');
    }   
})();

//全局登陆
var globalLogin = (function(){
    var context = $('body'), elment, lay;

    var close = function(){
        elment.remove();
        lay.remove();
        globalLogin.callBack = undefined;
    };

    var show = function(source) {
        $.get('/LoginBoxNew.aspx',{source: source}, function(data) {
            context.append(data);
            elment = $('#gl-login-dal');
            lay = $('#gl-login-lay');

            lay.one('click', close);
			$("#gl-login-tip").hide();
        });
    };
	
	var updateLoginHtml=function(){
		$.getJSON('/pub/MainSite.ashx?jsoncallback=?&action=getLoginResumeInfo',
		            function (msg) {
		                if (msg) {
							$(".gh-login").html();
		                    var topHtml;
							topHtml="<a class=\"gh-login-ok\" target=\"_blank\" href=\"http://my.jjoobb.cn/index.aspx\">";
							topHtml+="    <img class=\"gh-face\" src=\"" + msg.PhotoUrl + "\">";
							topHtml+="    <span class=\"nick\">" + msg .MyName+ "</span>";
							topHtml+="</a>";
							topHtml+="<a href=\"/pub/MainSite.ashx?jsoncallback=?&action=personLoginOut\">退出</a>";
							$(".gh-login").html(topHtml);
		                };
		            });		
	};

    context.on('click', '#gl-login-off', close);

    return {
        show: show,
        close: close,
		updateLoginHtml:updateLoginHtml
    };

})();


try{  
    console.log('%cjob','font-size:40px;font-weight:bold;color:#fff;border-radius:50%;background:#F5694B;padding: 20px 10px;line-height:100px;margin-left:40%');
    console.log('哇，不得了啊，你有道灵光从天灵盖喷出来，年纪轻轻就有一身的IT技能，如果有一天让你加入九博，升华各项能力，你还不飞龙上天。\n加入九博，体验社交招聘的魅力！')
    console.log('%c请将简历发送到 shenmiweiyi@163.com（邮件标题请以“姓名-应聘XX职位-来自console”命名）。','color:#F5694B;');
}catch(e){}


var Push = (function(){
    var _this = $('#pushLay');

    var expand = function(){
        _this.toggleClass('exp');
    }

    var bind = function(){
        _this.on('click', '.icon', expand);
    }

    return {
        show: function(){
            bind();
            _this.addClass('show exp');
        }
    }
})();

