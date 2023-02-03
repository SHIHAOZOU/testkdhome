//当前处理图片自动转换的定时器 id，用于在鼠标悬停于图片或链接上时阻止此事件
var changePicTimeoutId;
//官方新闻条数
var count = 8;

$(document).ready(function() {
	InitHead();
    InitPage();
	InitMap();
    changContent(0);
    changHover();
});

//注释的部分取消了图片轮播效果
function InitPage(){
	//绑定事件，让鼠标经过链接时切换图片
//	$('#nav li').hover(function(){
//		//在鼠标悬停时清除自动转换图片事件
//		clearTimeout(changePicTimeoutId);
//		$('#nav li').each(function(index, element) {
//            $(element).removeClass('current');
//        });
//		ChangePic(this.id);
//		$(this).addClass('current');
//	}, function(){
//		//在鼠标离开时注册自动转换图片事件
//		changePicTimeoutId = setTimeout(ChangePicRegularly, 6000);
//	});

	//当鼠标进入 maincontent 时取消事件，离开 maincontent 时注册事件
//	$('.maincontent').hover(function(){
//		clearTimeout(changePicTimeoutId);
//	},function(){
//		changePicTimeoutId = setTimeout(ChangePicRegularly, 6000);
//	});
//	changePicTimeoutId = setTimeout(ChangePicRegularly, 6000);

	//初始化页面新闻
	$.get('OfficialWebsiteServlet', {func:'getCurrentNews', count:count},
		function(result)
		{
			var data =  result.data;
            var html = "";
            for(var i = 0; i < data.length; i++)
            {
                html += "<div onmouseover=\"javascript:ChangeColorGreen(this);\" onmouseout=\"javascript:ChangeColorCommon(this);\" class='list_title'><span style=\"font-size: 19px;font-weight: bold;font-family:BebasNeue;\">" + DateFormat.format(data[i].CN_AddTime, 'yy-MM-dd') + "</span><br><p><a target=\"_blank\" href=\"about_shownews.html?id="+data[i].CN_Id+"\">" + data[i].CN_Title + "</a></p></div>"
            }
            html += "<div style=\"color:rgb(96,96,101);\" class='more'><a href=\"about_shownews.html\">"+"More <span>&gt;&gt;</span></a></div>";
            $(".newslist").html(html);
		},'json');
}
function ChangeColorGreen(obj){
	$(obj).css('color', '#009b74');
	$(obj).find('a').css('color', '#009b74');
}
function ChangeColorCommon(obj){
	$(obj).css('color', '#3a3a3b');
	$(obj).find('a').css('color', '#3a3a3b');
}

//切换首页图片程序
function ChangePic(id){
	if(id == 'banner01'){
		$("#show_image").removeClass();
		$("#show_image").addClass('imageview banner01');
		$('#btn_pos').removeClass();
		$('#btn_pos').addClass('btn_pos01');
		$(".acquaint_button_normal").parent().attr("href", "internet_analyse_intro.html");
		$(".download_button_normal").parent().attr("href", "download/setup_udun.exe");
	}else if(id == 'banner02'){
		$("#show_image").removeClass();
		$("#show_image").addClass('imageview banner02');
		$('#btn_pos').removeClass();
		$('#btn_pos').addClass('btn_pos02');
		$(".acquaint_button_normal").parent().attr("href", "mobile_analyse_intro.html");
		$(".download_button_normal").parent().attr("href", "javascript:void(0)");
	}
}

function ChangePicToNext(){
	var currentLi = $("#nav li.current");
	var currentId = parseInt($('#nav li.current').attr('id').slice(6));
	var nextId = currentId==2 ? 1 : currentId + 1;

	$('.maincontent').fadeTo(1000,0,function(){
		$('#show_image').removeClass('banner0' + currentId);
		$("#btn_pos").removeClass();
		$('#show_image').addClass('banner0' + nextId);
		$("#btn_pos").addClass('btn_pos0' + nextId);
		$('.maincontent').fadeTo(1000, 1);
		$("#nav li.current").removeClass('current');
		$($('#nav li')[nextId-1]).addClass('current');
		switch(nextId){
			//case 1:
			//	$(".acquaint_button_normal").parent().attr("href", "qinglang_analyse_intro.html");
			//	$(".download_button_normal").parent().attr("href", "download/company.exe");
			//	break;
			//case 2:
			//	$(".acquaint_button_normal").parent().attr("href", "outside_analyse_intro.html");
			//	$(".download_button_normal").parent().attr("href", "download/oversea.exe");
			//	break;
			case 1:
				$(".acquaint_button_normal").parent().attr("href", "internet_analyse_intro.html");
				$(".download_button_normal").parent().attr("href", "download/setup_udun.exe");
				break;
			case 2:
				$(".acquaint_button_normal").parent().attr("href", "mobile_analyse_intro.html");
				$(".download_button_normal").parent().attr("href", "javascript:void(0)");
				break;
		}
	});
}

//定时切换图片程序
function ChangePicRegularly(){
	ChangePicToNext();
	changePicTimeoutId = setTimeout(ChangePicRegularly, 6000);
}

function changContent() {
	var  num = 0
	var  time = null;

	function timeChange(){
        time = setInterval(function(){
            $(".list_title li").each(function(index,el){
                if(index==num){
                    $('.list_title li').removeClass("active");
                    $(el).addClass("active");
                    var div = $(el).parent().next().children();
                    div.each( function(item, element) {
                        $(element).removeClass('list_show');
                        $(element).addClass('list_hidden');
                        if(num==item){
                            $(element).removeClass('list_hidden');
                            $(element).addClass('list_show');
                        }
                    });
                }
            });
            num++;
            if(num==4){
                num = 0;
            }
        },5000);
	}

    timeChange();

    $(".list_title li").each(function(index,el){
        $(this).on('mouseover',function(){//鼠标过境切换显示
            window.clearInterval(time);//去掉定时器
            $('.list_title li').removeClass("active");
            $(this).addClass("active");
            var div = $(this).parent().next().children();
            div.each( function(item, element) {
                $(element).removeClass('list_show');
                $(element).addClass('list_hidden');
                if(index==item){
                    $(element).removeClass('list_hidden');
                    $(element).addClass('list_show');
                }
            });
        });
        $(this).on('mouseout',function(){
            timeChange()
		})
    });
    $('.list').on('mouseover',function(){
        window.clearInterval(time);//去掉定时器
    })
    $('.list').on('mouseout',function(){
        timeChange()
    })

}

function changHover() {
    $(".list_title li").each(function(index,el){
        $(this).hover(function(){//鼠标过境切换显示
            $('.list_title li').removeClass("active");
            $(this).addClass("active");
            var div = $(this).parent().next().children();
            div.each( function(item, element) {
                $(element).removeClass('list_show');
                $(element).addClass('list_hidden');
                if(index==item){
                    $(element).removeClass('list_hidden');
                    $(element).addClass('list_show');
                }
            }); 
        });
    });
}



































