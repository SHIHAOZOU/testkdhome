function CheckLogin(){
	$.get("../UserManageServlet", { func:"GetName",rd:new Date()},
	   function(data){
		 var status = data.status;
		 if(status==-1){
			 alert("请重新登录");
			 window.location='login.html';
		 }else if(status==0){
			 var user = data.data;
			 var values = user.split("###");
			 var name = values[0];
			 var adminId = values[1];
			 $("#name").html("欢迎回来,"+name+"<a href=\"../AdminLoginServlet?func=logout\" class=\"ml10 blue1\">退出</a>");
		 }
	   },"json");
}

/**
 *  将一个 Date 格式化为日期/时间字符串。
 *	alert(  DateFormat.format(new Date(),'yyyy年MM月dd日')  );
 *   var datelong = 12312319123;
 *	alert(  DateFormat.format(datelong,'yyyy年MM月dd日')  );
 *
 *	从给定字符串的开始分析文本，以生成一个日期。
 *	alert(  DateFormat.parse('2010-03-17','yyyy-MM-dd')  );
 */
DateFormat = (function(){
 var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
 var DEFAULT_PATTERN = 'yyyy-MM-dd';
 function padding(s,len){
  var len =len - (s+'').length;
  for(var i=0;i<len;i++){s = '0'+ s;}
  return s;
 };
 return({
  format: function(date,pattern){
   if (typeof date =='number'){
		date = new Date(date);
   }

   pattern = pattern||DEFAULT_PATTERN;
   return pattern.replace(SIGN_REGEXP,function($0){
    switch($0.charAt(0)){
     case 'y' : return padding(date.getFullYear(),$0.length);
     case 'M' : return padding(date.getMonth()+1,$0.length);
     case 'd' : return padding(date.getDate(),$0.length);
     case 'w' : return date.getDay()+1;
     case 'h' : return padding(date.getHours(),$0.length);
     case 'm' : return padding(date.getMinutes(),$0.length);
     case 's' : return padding(date.getSeconds(),$0.length);
    }
   });
  },
  parse: function(dateString,pattern){
   var matchs1=pattern.match(SIGN_REGEXP);
   var matchs2=dateString.match(/(\d)+/g);
   if(matchs1.length==matchs2.length){
    var _date = new Date(1970,0,1);
    for(var i=0;i<matchs1.length;i++){
     var _int = parseInt(matchs2[i],10);
     var sign = matchs1[i];
    switch(sign.charAt(0)){
     case 'y' : _date.setFullYear(_int);break;
     case 'M' : _date.setMonth(_int-1);break;
     case 'd' : _date.setDate(_int);break;
     case 'h' : _date.setHours(_int);break;
     case 'm' : _date.setMinutes(_int);break;
     case 's' : _date.setSeconds(_int);break;
    }
    }
    return _date;
   }
   return null;
  }
 });
})();

function trimstr(obj){
	   var newstr="";
	   newstr=obj.replace(/(^\s*)|(\s*$)/g,"");
	   return newstr;
}

function GetPageHtml(CallBackFunc,sum,pageSize,curPage){
	var html="";
	var sumPage = Math.floor((sum+pageSize-1)/pageSize);
	if(curPage>1){
		html+="<span class=\"pagebt pageln\"><a class=\"pnum\" onclick=\""+CallBackFunc+"("+(curPage-1)+")\">上一页</a></span>";
	}
	var start = curPage-5;
	if(start<1){
		start=1;
	}
	var end = start+10;
	if(end>sumPage){
		end=sumPage;
		start=end-10;
		if(start<1){
			start=1;
		}
	}
	for(var i=start;i<=end;i++){
		if(i==curPage){
			html+="<span class=\"pagebt pagebtcur\">"+i+"</span>";
		}else{
			html+=" <span class=\"pagebt\"><a class=\"pnum\" onclick=\""+CallBackFunc+"("+i+")\">"+i+"</a></span>";
		}
	}

	if(curPage<sumPage){
		html+="<span class=\"pagebt pageln\"><a class=\"pnum\" onclick=\""+CallBackFunc+"("+(curPage+1)+")\">下一页</a></span>";
	}
	return html;
}

/**
 * 从当前页面的url中获取参数
 * @param param 参数名
 * @returns 参数值
 */
function getURLParameter(param)
{
	var url=window.location.href;
	for ( ; ; ) {
		if (url.endWith('#')){
			url = url.substring(0, url.length-1);
		}else{
			break;
		}
	}

	var params=(url.substr(url.indexOf("?") + 1)).split("&");
	if (params != null)
	{
		for(var i=0;i<params.length;i++)
		{
			var strsName=params[i].substr(0,params[i].indexOf("="));
			var strsValue=params[i].substr(params[i].indexOf("=")+1);
			if(strsName==param)
			{
				return strsValue;
			}
		}
	}
	return "";
}

String.prototype.endWith = function(oString) {
	var reg = new RegExp(oString + "$");
	return reg.test(this);
};

String.prototype.startWith = function(str) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length)
		return false;
	if (this.substr(0, str.length) == str)
		return true;
	else
		return false;
	return true;
};

function interceptString(str,len)
{
//length属性读出来的汉字长度为1
if(str.length*2 <= len)
{
   return str;
}
var strlen = 0;
var s = "";
for(var i = 0;i < str.length; i++)
{
   if(str.charCodeAt(i) > 128)
   {
    strlen = strlen + 2;
    if(strlen > len)
    {
     return s.substring(0,s.length-1) + "...";
    }
   }
   else
   {
    strlen = strlen + 1;
    if(strlen > len)
    {
     return s.substring(0,s.length-2) + "...";
    }
   }

   s = s + str.charAt(i);

}
return s;
}

function removeTag(str){
	if(str.length!=0){
		str = str.replace(/<[^>].*?>/g,""); 
	}
	return str;
}