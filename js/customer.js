//客户案例 JS
//初始化客户案例页面的公共方法
function InitCustomerCase()
{
	$('.case_right_box2').delegate('li', 'mouseenter', function(){
		$(".case_right_box2 li").css('opacity', 0.5);
		$(this).css("opacity",1);
		console.log(this);
	});
	
	$('.case_right_box2').bind('mouseleave', function(){
		$(".case_right_box2 li").css("opacity", 1);
	});
}