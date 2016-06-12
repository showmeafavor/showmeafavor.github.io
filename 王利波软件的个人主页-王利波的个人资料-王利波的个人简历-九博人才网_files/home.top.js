//top模版关注操作
function AttenOpt(btn) {
	var isLogin = $('#isLogin').val() - 0;
	if(isLogin == -1){
		var url = $('#hid_url').val();
		location.href=url;
	}else{
		var obj = $(btn);
		var a = obj.children(".add").attr("a");
		$.getJSON("/Home/AttentionFans.ashx", { a: a, act: "attend", stype: "1" }, function (data) {
			if (data.status == "1") {
				obj.addClass("c1");
				obj.html('<i class=\"icon mrsmall\">&#xe6d0;</i>已关注');
			}
		});
	}
}
/***************************************私信操作开始********************************************************/
action.add({
  'showLetter':showLetter
});
var letterContentHtml;
//弹出私信对话窗口   
function showLetter(){
	var isLogin = $('#isLogin').val() - 0;
	if(isLogin == -1){
		var url = $('#hid_url').val();
		location.href=url;
	}else{
		var letterDAL = $('#letterDAL');
		letterContentHtml = letterContentHtml || letterDAL.html();
		//页面隐藏域赋值
		var $this = $(this);
		var toId = $this.attr('data-ortherId');
		var toName = $this.attr('data-name');
		var fromName = $this.attr('data-MyName');
		$('#hid_toId').val(toId);
		$('#hid_toName').val(toName);
		$('#hid_fromName').val(fromName);
		var letterContent = letterContentHtml.replace('{name}',toName);
		//alert(letterContent);
		//弹出私信窗口
		letterDAL.dialogBox({
			hasClose: true,
			effect: 'fade',
			hasMask: true,
			title: '发送私信',
			content: letterContent
		});
	}
};	
//发送私信
function sendLetter()
{
	var toId = $('#hid_toId').val();
    var toName = $('#hid_toName').val();
    var fromName = $('#hid_fromName').val();
    var letterContent = $('#letterContent').val();
	if(letterContent == ""){
		$('#letterDAL .dialog-box-close').click();
		showMsg('发送内容不能为空！');
	}else if(letterContent.length >= 200){
		showMsg('您输入的内容过长！');
	}else{
		//alert("toId:"+toId + "   toName:"+toName+"   fromName:"+fromName+"  letterContent:"+letterContent);
		$.post('/pub/PrivateLetter.ashx?jsoncallback=?&action=addLetter',
			{ toId: toId, fromName: fromName, toName: toName, letterContent: letterContent }, 
			function (msg) {
				var data = eval(msg);
				var result = data.result;
                if (result) {
					if(result>0){
						$('#letterDAL .dialog-box-close').click();
						showMsg('发送私信成功！');
					}else if(result==-3){
						var hid_countDay = $('#hid_countDay').val();
						$('#letterDAL .dialog-box-close').click();
						showMsg( '您每天最多可发送私信'+ hid_countDay +'条，请明天再来发送！');
					}else if(result == -4){
						var hid_countPerson = $('#hid_countPerson').val();
						$('#letterDAL .dialog-box-close').click();
						showMsg("您每天只能发送"+ hid_countPerson+ "人");
					}else if(result == -5){
						$('#letterDAL .dialog-box-close').click();
						showMsg( '对方有回复，请查看私信列表后再回复！');
					}else if(result == -6){
						$('#letterDAL .dialog-box-close').click();
						showMsg( '您已被屏蔽，禁止发言！');
					}else if(result == -7){
						$('#letterDAL .dialog-box-close').click();
						showMsg( '发送成功，但接收人已被屏蔽发言，将无法回复您的私信！');
					}else{
						showMsg('发送失败！');
					}
			}
		});
	}
}
//弹出框设置
function showMsg(msg) {
    $('#dialog').dialogBox({
        hasClose: false,
        time: 2000,
        effect: 'fade',
        hasBtn: true,
        type: 'correct',
        confirmValue: '我知道了',
        content: msg
    })
}
	/***************************************私信操作结束********************************************************/
