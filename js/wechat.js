//下载 APP 的页面

$(function(){
	browserVersion();
});

//根据浏览器判断执行的动作
function browserVersion() {
	var u = navigator.userAgent, app = navigator.appVersion;
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

	//判断是在微信中打开
	var regex = /MicroMessenger/i;
	//在手机端，并且在微信中打开
	if (regex.test(ua) && isiOS==true) {
		$('#prompt').show();
		return;
	}else if(regex.test(ua) && isAndroid==true){
		$('#weixin').show();
		return;
	}

	//在手机端，但是不在微信中打开
	if (isiOS == true) {
		window.location.href = 'https://itunes.apple.com/cn/app/qing-lang-yu-qing-jian-ce/id1070824095?mt=8&ign-mpt=uo%3D4';
		return;
	}
	if (isAndroid == true) {
		window.location.href = 'download/app.apk';
		return;
	}
}
