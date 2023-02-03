var count = 10;

//根据 id 获取新闻详细信息
function ShowNews()
{
	id = getURLParameter('id');
	$.get('OfficialWebsiteServlet', {func:'getNews', id:id},
	function(result)
	{
		var data =  result.data;
		var html = "";
		html += "<h2>"+data.CN_Title+"</h2>";
		html += data.CN_Content;
		$(".right").html(html);
	},'json');
}
//根据 id 获取招聘详细信息
function ShowPosition(id)
{
	$.get('OfficialWebsiteServlet', {func:'getRecruit', id:id},
	function(result)
	{
		var data =  result.data;
		var html = "";
		html += "<h2>"+data.RI_Position+"</h2>";
		html += data.RI_Desc;
		$(".right").html(html);
	},'json');
}
function InitNews()
{
	//初始化页面新闻
	$.get('OfficialWebsiteServlet', {func:'getCurrentNews', count:count},
	function(result)
	{
		var data =  result.data;
		var html = "";
		for(var i = 0; i < data.length; i++)
		{
			if(data[i].CN_catId==0){
		        html += "<div class=\"newsinfo\"><span>" + DateFormat.format(data[i].CN_AddTime, 'MM-dd') + "</span><span><a target=\"_blank\" href=\"about_shownews.html?id="+data[i].CN_Id+"\">" + data[i].CN_Title + "</a></span></div>"       	  
			}
		}
		$(".newslist").html(html);
	},'json');
}
function InitTrends()
{
	//初始化行业动态
	$.get('OfficialWebsiteServlet', {func:'getCurrentNews', count:count},
	function(result)
	{
		var data =  result.data;
		var html = "";
		for(var i = 0; i < data.length; i++)
		{
			if(data[i].CN_catId==1)
			{
				html += "<div class=\"newsinfo\"><span>" + DateFormat.format(data[i].CN_AddTime, 'MM-dd') + "</span><span><a target=\"_blank\" href=\"about_shownews.html?id="+data[i].CN_Id+"\">" + data[i].CN_Title + "</a></span></div>"       	  
			}
		}
		$(".trendslist").html(html);
	},'json');
}
function InitPosition()
{
	//初始化页面新闻
	$.get('OfficialWebsiteServlet', {func:'getPosition', count:count},
	function(result)
	{
		if(result.status==0)
		{
			var data = result.data;
			if(data==null)	return;
			var html = "<h2>加入我们</h2>"
			for(var department in data){
				html += "<div class=\"recruit_box\"><div class=\"recruit_content\">";
				html += "<div class=\"recruit_seperation\"></div><div class=\"recruit_title\">"+department+"</div>";
				for(var position in data[department]){
					html += "<div class=\"recruit_info\"><span class=\"recruit_job\">"+data[department][position].RI_Position+"</span>";
					html += "<span class=\"recruit_check\"><a href=\"javascript:ShowPosition("+data[department][position].RI_Id+")\">点击查看</a></span></div>";
				}
				html += "</div></div>"
			}
			$(".right").html(html);
		}
	},'json');
}



























