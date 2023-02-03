//产品介绍的 JS
var count = 10;//信息数量限制
var logtype;//日志/帮助类型：1 清朗 2 jinwai 3 互联网 4 手机app
var helptype;//日志/帮助类型：1 清朗 2 jinwai 3 互联网 4 手机app

//初始更新日志页面
function InitAnalyseUpdateLog(t)
{
	logtype = t;
	var keyword = '';
	$.get('OfficialWebsiteServlet', {func:'getCurrentUpdateLog', keyword:keyword, count:count, type:logtype},
		function(result){
			if(result.status==0)
			{
				UpdateResultToHtml(result);
			}
		}
		,'json');
}

//将返回的 JSON 格式的更新日志转换为 HTML5
function UpdateResultToHtml(result)
{
	var data = result.data;
	var html = "";
	if(data!=null){
		for(var i = 0; i < data.length; i++)
		{	
			html += "<div class=\"uptcontent\">";
			html += "<h3>" + data[i].s_Title + "<span class=\"fr fc2 fs14\">" + DateFormat.format(data[i].s_AddTime) +"</span></h3>";
			html += "<div class=\"uptdetail\">"
			html += data[i].s_Content;
			html += "</div></div>";
		}
	}else{
			html += "<div class=\"uptcontent\">";
			html += "<h3>没有相关日志<span class=\"fr fc2 fs14\"></span></h3>";
			html += "<div class=\"uptdetail\">"
			html += "没有相关日志！";
			html += "</div></div>";
	}
	$(".uptbox").html(html);	
}

//初始化帮助中心页面
function InitAnalyseHelp(t)
{
	helptype = t;
	count = 10;
	$.get('OfficialWebsiteServlet', {func:'getCurrentHelp', count:count, type:helptype},
	function(result){
		HelpResultToHtml(result);
	}
	,'json');
}
//JSON 格式的帮助中心信息转换为 HTML
function HelpResultToHtml(result)
{
	var data = result.data;
	var listHtml = "";
	var contentHtml = "";

	if(result.data!=null)
	{	
		listHtml += "<li><a class=\"current\" id=\""+data[0].h_Id+"\" href=\"javascript:ShowHelpInfo("+data[0].h_Id+")\">"+data[0].h_Title+"</a></li>";
		contentHtml += "<h3>"+data[0].h_Title+"</h3>"
		contentHtml += "<div class=\"detail\">"+data[0].h_Content+"</div>";
		
		for(var i = 1; i < data.length; i++)
		{
			listHtml += "<li><a id=\""+data[i].h_Id+"\" href=\"javascript:ShowHelpInfo("+data[i].h_Id+")\">"+data[i].h_Title+"</a></li>";
		}
	}else{
		listHtml += "<li><a class=\"current\" href=\"#\">没有相关帮助信息</a></li>";
		contentHtml += "<h3>没有相关帮助信息！</h3>"
	}

	$(".left ul").html(listHtml);
	$(".right").html(contentHtml);
}

function ShowHelpInfo(id)
{
	$.get('OfficialWebsiteServlet', {func:'getHelpById', id:id},
	function(result){
		if(result.status==="0"){
			var data = result.data;
			var html = "";
			html += "<h3>"+data.h_Title+"</h3>"
			html += "<div class=\"detail\">"+data.h_Content+"</div>";
			
			$(".left ul li a.current").removeClass("current");
			$("#"+id).addClass("current");
			$(".right").html(html);
		}
	}
	,'json');
}























