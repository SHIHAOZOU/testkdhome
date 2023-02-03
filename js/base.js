//头部初始化类
function InitHead(){
    return;
	//为头部绑定事件计算其相对屏幕的距离
	$("#navhead > li").each(function(index, element) {
		$(this).hover(function(){
			var left = $(this).offset().left;
			var width = $(window).width();
			if((left + 480) / width > 0.85)
			{
				var right = width - (left + $(this).width());
				$(this).find("div").first().attr('style', 'right:' + right + "px;");
			}
		},function(){
			$(this).find("div").first().removeAttr('style');
		})
    });	
}

//设为首页
function setHomepage(){
    if (document.all){
        document.body.style.behavior='url(#default#homepage)';
          document.body.setHomePage(window.location.href);
    }else if (window.sidebar){
        if(window.netscape){
            try{
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }catch (e){
                alert( "该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true" );
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage',window.location.href);
    }else{
        alert('您的浏览器不支持自动自动设置首页, 请使用浏览器菜单手动设置!');
    }
}

function addBookmark(){
    var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd': 'CTRL';
    try{
        if (document.all) { //IE类浏览器
            try {
                window.external.toString(); //360浏览器不支持window.external，无法收藏
                window.alert("国内开发的360浏览器等不支持主动加入收藏。\n您可以尝试通过浏览器菜单栏 或快捷键 ctrl+D 试试。");
            }
            catch (e){
                try{
                    window.external.addFavorite(window.location, document.title);
                }
                catch (e){
                    window.external.addToFavoritesBar(window.location, document.title);  //IE8
                }
            }
        }
        else if (window.sidebar) { //firfox等浏览器
            window.sidebar.addPanel(document.title, window.location, "");
        }
        else {
            alert('您可以尝试通过快捷键' + ctrl + ' + D 加入到收藏夹~');
        }
    }
    catch (e){
        window.alert("因为IE浏览器存在bug，添加收藏失败！\n解决办法：在注册表中查找\n HKEY_CLASSES_ROOT\\TypeLib\\{EAB22AC0-30C1-11CF-A7EB-0000C05BAE0B}\\1.1\\0\\win32 \n将 C:\\WINDOWS\\system32\\shdocvw.dll 改为 C:\\WINDOWS\\system32\\ieframe.dll ");
    }
}

 //创建和初始化地图函数：
       function InitMap(){
            createMap();//创建地图
            setMapEvent();//设置地图事件
            addMapControl();//向地图添加控件
            addMarker();//向地图中添加marker
        }
        
        //创建地图函数：
        function createMap(){
            var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
            var point = new BMap.Point(114.064224,22.517838);//定义一个中心点坐标
            map.centerAndZoom(point,17);//设定地图的中心点和坐标并将地图显示在地图容器中
            window.map = map;//将map变量存储在全局
        }
        
        //地图事件设置函数：
        function setMapEvent(){
            map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
            map.enableScrollWheelZoom();//启用地图滚轮放大缩小
            map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
            map.enableKeyboard();//启用键盘上下左右键移动地图
        }
        
        //地图控件添加函数：
        function addMapControl(){
            //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
        map.addControl(ctrl_nav);
            //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:0});
        map.addControl(ctrl_ove);
            }
        
        //标注点数组
        var markerArr = [{title:"我们在这里",content:"深圳市益田南路1006号益田创新科技园20栋13F",point:"114.064224|22.517838",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
             ];
        //创建marker
        function addMarker(){
            for(var i=0;i<markerArr.length;i++){
                var json = markerArr[i];
                var p0 = json.point.split("|")[0];
                var p1 = json.point.split("|")[1];
                var point = new BMap.Point(p0,p1);
                var iconImg = createIcon(json.icon);
                var marker = new BMap.Marker(point,{icon:iconImg});
                var iw = createInfoWindow(i);
                var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
                marker.setLabel(label);
                map.addOverlay(marker);
                label.setStyle({
                            borderColor:"#808080",
                            color:"#333",
                            cursor:"pointer"
                });
                
                (function(){
                    var index = i;
                    var _iw = createInfoWindow(i);
                    var _marker = marker;
                    _marker.addEventListener("click",function(){
                        this.openInfoWindow(_iw);
                    });
                    _iw.addEventListener("open",function(){
                        _marker.getLabel().hide();
                    })
                    _iw.addEventListener("close",function(){
                        _marker.getLabel().show();
                    })
                    label.addEventListener("click",function(){
                        _marker.openInfoWindow(_iw);
                    })
                    if(!!json.isOpen){
                        label.hide();
                        _marker.openInfoWindow(_iw);
                    }
                })()
            }
        }
        //创建InfoWindow
        function createInfoWindow(i){
            var json = markerArr[i];
            var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
            return iw;
        }
        //创建一个Icon
        function createIcon(json){
            var icon = new BMap.Icon("https://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
            return icon;
		}

        function CloseMsg(){
            $("html").css("overflow","auto");
            $("body").css("overflow","auto");
        	$("#downfloor").fadeTo(400, 0);
        	$("#downfloor").css("display", "none");
            $("#cover").css("display", "none");//隐藏遮罩层
        }
        function downUdunClose() {
            $("#downUdun").fadeTo(400, 0);
            $("#downUdun").css("display", "none");
        }
        function SubmitMsg(){
            var manName = $('#manName').val();
            var phone = $('#phone').val();
            var companyName = $('#companyName').val();
            var city = $('#city').val();
            var time = $('#time').val();
            var system = $('#system').val();//web管理端：S05SU01 巡查端：S04SU02
            var data = {
                proposer:manName,
                contact:phone,
                company:companyName,
                city:city,
                contactTime:time,
                system:system
            }
            if(manName==''){
                $('#manName').css('borderColor','red');
                return ;
            }else{
                $('#manName').css('borderColor','#f5f5f5');
            }
            if(phone==''){
                $('#phone').css('borderColor','red');
                return ;
            }else{
                $('#phone').css('borderColor','#f5f5f5');
            }
            if(companyName==''){
                $('#companyName').css('borderColor','red');
                return ;
            }else{
                $('#companyName').css('borderColor','#f5f5f5');
            }
            // jq请求组
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                dataType: "json",
                async: true,
                url: 'https://msvc.szkedun.cn/mgrservice/trial/application',
                contentType: 'application/json;charset=utf-8',
                success: function (object) {
                    $("#downfloor").fadeTo(400, 0);
                    $("#downfloor").css("display", "none");
                    $("#cover").css("display", "none");//隐藏遮罩层
                    $("html").css("overflow","auto");
                    $("body").css("overflow","auto");
                },
                error: function (object) {
                    alert("试用申请失败,请重试");
                }
            });
        }

        function ShowMsg(data){
            $("html").css("overflow","hidden");
            $("body").css("overflow","hidden");
            $('#manName').val('');
            $('#phone').val('');
            $('#companyName').val('');
            $('#city').val('');
            $('#time').val('');
            $('#system').val(data);
            $('#manName').css('borderColor','#f5f5f5');
            $('#phone').css('borderColor','#f5f5f5');
            $('#companyName').css('borderColor','#f5f5f5');
        	$("#downfloor").fadeTo(400, 1);
        	$("#downfloor").css("display", "block");
        	$("#cover").css("display", "block");//显示遮罩层
        }
        function ShowMsgUdun(){
        	$("#downUdun").fadeTo(400, 1);
        	$("#downUdun").css("display", "block");
        }